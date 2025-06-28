import { useEffect } from 'react';
import type { OneCommeEvent } from '../onecomme';
import { useAtom, useSetAtom } from 'jotai';
import { membersAtom, topicAtom, votesAtom, type Member, type Vote } from '../store';

export const useWebSocket = () => {
  const setTopic = useSetAtom(topicAtom);
  const [members, setMembers] = useAtom(membersAtom);
  const [votes, setVotes] = useAtom(votesAtom);

  useEffect(() => {
    const ws = new WebSocket('ws://127.0.0.1:11180/sub?p=comments,deleted,clear');

    ws.onmessage = (event) => {
      const { data, type } = JSON.parse(event.data) as OneCommeEvent;
      switch (type) {
        case 'comments':
          // eslint-disable-next-line complexity
          data.comments.forEach(({ data }) => {
            if (data.isOwner && data.comment.startsWith('お題：')) {
              setTopic(data.comment.replace('お題：', ''));
              setMembers([]);
              setVotes([]);
              return;
            }
            if (
              ['ノ', 'ﾉ'].includes(data.comment) &&
              !members.some(({ memberId }) => memberId === data.userId) &&
              members.every(({ answer }) => answer === '')
            ) {
              const member: Member = {
                memberId: data.userId,
                name: data.displayName,
                answer: '',
                handChatId: data.id,
              };
              setMembers([member, ...members]);
              return;
            }
            const noAnswerMembers = members.filter(({ answer }) => answer === '');
            if (noAnswerMembers.length > 0 && noAnswerMembers[0].memberId === data.userId) {
              const memberIndex = members.findIndex(({ memberId }) => memberId === data.userId);
              const updatedMembers = clone(members);
              updatedMembers[memberIndex].answer = data.comment;
              setMembers(updatedMembers);
              return;
            }
            const voteNumber = Number(data.comment);
            if (
              !members.some(({ memberId }) => memberId === data.userId) ||
              noAnswerMembers.length > 0 ||
              Number.isNaN(voteNumber) ||
              voteNumber < 1 ||
              voteNumber > members.length
            ) {
              return;
            }
            if (votes.some(({ memberId }) => memberId === data.userId)) {
              const voteIndex = votes.findIndex(({ memberId }) => memberId === data.userId);
              const updatedVotes = clone(votes);
              updatedVotes[voteIndex].voteNumber = voteNumber;
              updatedVotes[voteIndex].targetMemberId = members[voteNumber - 1].memberId;
              setVotes(updatedVotes);
              return;
            }
            const targetMemberId = members[voteNumber - 1].memberId;
            const vote: Vote = { memberId: data.userId, voteNumber, targetMemberId };
            setVotes([...votes, vote]);
          });
          break;
        case 'deleted':
          const deletedChatIds = data.map(({ id }) => id);
          setMembers(members.filter(({ handChatId }) => !deletedChatIds.includes(handChatId)));
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, [members, votes]);
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
