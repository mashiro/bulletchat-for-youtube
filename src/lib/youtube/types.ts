import type Color from "color";

export type YouTubeBulletChatMessage = {
  name: string;
  text: string;
  textHtml: string;
  iconUrl: string;
  paid: boolean;
  paidColor?: Color;
  member: boolean;
  moderator: boolean;
  owner: boolean;
};
