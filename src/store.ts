import { atom } from 'jotai';

export const topicAtom = atom<string>('ここにお題が出るぜぇ？');

export type Member = {
  memberId: string;
  name: string;
  handChatId: string;
  answer: string;
};

export const membersAtom = atom<Member[]>([]);

export type Vote = {
  memberId: string;
  voteNumber: number;
  targetMemberId: string;
};

export const votesAtom = atom<Vote[]>([]);
