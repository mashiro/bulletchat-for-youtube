export type YouTubeMessageDetail = {
  continuationContents: ContinuationContents;
};

type ContinuationContents = {
  liveChatContinuation: LiveChatContinuation;
};

type LiveChatContinuation = {
  actions?: Actions[];
};

export type Actions = {
  addChatItemAction?: AddChatItemAction;
  replayChatItemAction?: ReplayChatItemAction;
};

export type AddChatItemAction = {
  clientId: string;
  item: AddChatItem;
};

export type ReplayChatItemAction = {
  actions: Actions[];
};

export type AddChatItem = {
  liveChatTextMessageRenderer?: LiveChatTextMessageRenderer;
};

type LiveChatTextMessageRenderer = {
  message: Message;
  authorName: SimpleText;
  authorPhoto: Thumbnail[];
};

type Message = {
  runs: MessageRun[];
};

type MessageRun = {
  text?: string;
  emoji?: Emoji;
};

type Emoji = {
  image: {
    thumbnails: Thumbnail[];
  };
};

type SimpleText = {
  simpleText: string;
};

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};
