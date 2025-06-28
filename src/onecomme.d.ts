export type CommentData = {
  autoModerated: boolean;
  badges: string[];
  comment: string;
  displayName: string;
  hasGift: boolean;
  id: string;
  isFirstTime: boolean;
  isMember: boolean;
  isModerator: boolean;
  isOwner: boolean;
  isRepeater: boolean;
  liveId: string;
  name: string;
  originalProfileImage: string;
  profileImage: string;
  speechText: string;
  timestamp: string;
  userId: string;
};

export type Comment = {
  color: { r: number; g: number; b: number };
  data: CommentData;
  meta: { [key in string]: number };
  name: string;
  service: string;
  url: string;
};

export type ConnectedEvent = {
  type: 'connected';
  data: { comments: Comment[] };
};

export type CommentsEvent = {
  type: 'comments';
  data: {
    comments: Comment[];
    options: { skipSpeech: boolean; init: boolean };
    userNameMap: { [key in string]: string };
  };
};

export type OneCommeEvent = ConnectedEvent | CommentsEvent;
