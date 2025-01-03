import type Color from "color";

export type YouTubeBulletChatMessage = {
  name: string;
  text: TextPart[];
  iconUrl?: string;
  paid: boolean;
  paidColor?: Color;
  member: boolean;
  moderator: boolean;
  owner: boolean;
};

type TextPart = Text | Emoji;

type Text = {
  type: "text";
  text: string;
};

type Emoji = {
  type: "emoji";
  url: string;
};
