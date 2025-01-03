import type { YouTubeBulletChatMessage } from "@/lib/youtube/types";

export const ORIGIN = `${window.location.protocol}//${window.location.hostname}`;

export type InternalMessage = {
  type: "YouTubeLiveChatObserverMessage";
  message: YouTubeBulletChatMessage;
};
