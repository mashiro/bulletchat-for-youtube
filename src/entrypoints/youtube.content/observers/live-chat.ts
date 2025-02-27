import { findElement } from "@/lib/dom";
import { tryParseColor } from "@/lib/utils";
import type { YouTubeBulletChatMessage, YouTubeBulletChatMessageEvent } from "@/lib/youtube/types";
import { ORIGIN } from "./common";

export class YouTubeLiveChatObserver implements MessageObserver<YouTubeBulletChatMessage> {
  private observer: MutationObserver | null = null;

  async observe() {
    const topFrame = window.top!;
    const chatRoot = await findElement(document, "#items");

    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (this.isChatMessage(node)) {
            this.processChatNode(topFrame, node);
          }
        }
      }
    });

    this.observer.observe(chatRoot, { childList: true });
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  private processChatNode(topFrame: Window, node: Node) {
    try {
      const message = this.toBulletChatMessage(node);
      const event: YouTubeBulletChatMessageEvent = {
        type: "YouTubeBulletChatMessage",
        message,
      };
      topFrame.postMessage(event, ORIGIN);
    } catch (ex) {
      console.error(ex);
    }
  }

  private isChatMessage(node: Node): boolean {
    const nodeName = node.nodeName.toLowerCase();
    return (
      nodeName === "yt-live-chat-text-message-renderer" ||
      nodeName === "yt-live-chat-paid-message-renderer"
    );
  }

  private toBulletChatMessage(node: Node): YouTubeBulletChatMessage {
    const el = node as HTMLElement;

    const name = el.querySelector("#author-name")!.textContent!;
    const text = el.querySelector("#message")!.textContent!;
    const textHtml = el.querySelector("#message")!.innerHTML;
    const iconUrl = el.querySelector("#img")!.attributes.getNamedItem("src")!.value;
    const paid = node.nodeName.toLowerCase().includes("paid");
    const paidColorString = el.style.getPropertyValue("--yt-live-chat-paid-message-primary-color");
    const paidColor = tryParseColor(paidColorString);
    const member = el.querySelector("#author-name.member") != null;
    const moderator = el.querySelector("#author-name.moderator") != null;
    const owner = el.querySelector("#author-name.owner") != null;

    return {
      name,
      text,
      iconUrl,
      paid,
      paidColor,
      member,
      moderator,
      owner,
    };
  }
}
