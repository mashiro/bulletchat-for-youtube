import type { YouTubeBulletChatMessage } from "@/lib/youtube/types";
import { type InternalMessage, ORIGIN } from "./base";

export class YouTubeTopFrameObserver implements MessageObserver<YouTubeBulletChatMessage> {
  async observe(listener: MessageListener<YouTubeBulletChatMessage>): Promise<void> {
    window.addEventListener("message", (event) => {
      if (event.origin !== ORIGIN) {
        return;
      }

      const internalMessage = event.data as InternalMessage;
      if (internalMessage.type !== "YouTubeLiveChatObserverMessage") {
        return;
      }

      listener(internalMessage.message);
    });
  }

  disconnect(): void {}
}
