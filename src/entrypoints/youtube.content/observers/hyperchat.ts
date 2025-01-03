import type { YouTubeBulletChatMessage } from "@/lib/youtube/types";
import { type InternalMessage, ORIGIN } from "./base";
import type { Actions, AddChatItem, AddChatItemAction, YouTubeMessageDetail } from "./types";

export class YouTubeHyperChatObserver implements MessageObserver<YouTubeBulletChatMessage> {
  private observer: MutationObserver | null = null;

  async observe(listener: MessageListener<YouTubeBulletChatMessage>): Promise<void> {
    const topFrame = window.top!;
    const liveChatFrame = window.parent;

    liveChatFrame.addEventListener("messageReceive", (e) => {
      console.log(`liveChatFrame.messageReceive: ${liveChatFrame.location.pathname}`);

      const detailJson = (e as CustomEvent<string>).detail;
      const detail = JSON.parse(detailJson) as YouTubeMessageDetail;

      const actions = detail.continuationContents.liveChatContinuation.actions ?? [];
      this.processActions(topFrame, actions);
    });
  }

  private processActions(topFrame: Window, actions: Actions[]) {
    for (const action of actions) {
      if (action.addChatItemAction != null) {
        this.processAddChatItemAction(topFrame, action.addChatItemAction);
      }
      if (action.replayChatItemAction != null) {
        this.processActions(topFrame, action.replayChatItemAction.actions);
      }
    }
  }

  private processAddChatItemAction(topFrame: Window, action: AddChatItemAction) {
    const item = action.item;

    try {
      const message = this.toBulletChatMessage(item);
      const internalMessage: InternalMessage = {
        type: "YouTubeLiveChatObserverMessage",
        message,
      };
      topFrame.postMessage(internalMessage, ORIGIN);
    } catch (ex) {
      console.error(ex);
    }
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  private toBulletChatMessage(item: AddChatItem): YouTubeBulletChatMessage {
    const name = item.liveChatTextMessageRenderer?.authorName?.simpleText;
    const text =
      item.liveChatTextMessageRenderer?.message?.runs?.map((run) => {
        if (run.text != null) {
          return { type: "text", text: run.text };
        }
        if (run.emoji != null) {
          return { type: "emoji", url: run.emoji.image.thumbnails[0].url };
        }
      }) ?? [];

    if (name == null) {
      console.log(item);
    }

    return {
      name,
      text,
    };
  }
}
