import { atom } from 'jotai';

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
