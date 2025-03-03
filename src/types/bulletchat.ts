export type BulletChatMode = "scroll";

export type BulletChatMessageOptions = {
  mode: BulletChatMode;
  id: string;
  duration: number;
  content: React.ReactNode;
};
