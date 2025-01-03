import { findElement } from "@/lib/dom";
import { isTopFrame, tryParseColor } from "@/lib/utils";
import type { YouTubeBulletChatMessage } from "@/lib/youtube/types";

const ORIGIN = `${window.location.protocol}//${window.location.hostname}`;

type InternalMessage = {
  type: "YouTubeLiveChatObserverMessage";
  message: YouTubeBulletChatMessage;
};

type YouTubeObserverType = "top" | "live_chat" | "hyperchat";

export class YouTubeObserver implements MessageObserver<YouTubeBulletChatMessage> {
  private observer: MessageObserver<YouTubeBulletChatMessage> | null = null;

  async observe(listener: MessageListener<YouTubeBulletChatMessage>): Promise<void> {
    switch (this.getObserverType()) {
      case "top":
        this.observer = new YouTubeTopFrameObserver();
        break;
      case "live_chat":
        this.observer = new YouTubeLiveChatObserver();
        break;
      case "hyperchat":
        this.observer = new YouTubeHyperChatObserver();
        break;
    }

    if (this.observer != null) {
      this.observer.observe(listener);
    }
  }

  disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  private getObserverType(): YouTubeObserverType | undefined {
    if (window === window.top) {
      return "top";
    }

    const pathname = window.location.pathname;
    if (pathname.match(/\/live_chat/)) {
      return "live_chat";
    }
    if (pathname.match(/\/embed\/hyperchat_embed/)) {
      return "hyperchat";
    }

    return undefined;
  }
}

class YouTubeTopFrameObserver implements MessageObserver<YouTubeBulletChatMessage> {
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

class YouTubeLiveChatObserver implements MessageObserver<YouTubeBulletChatMessage> {
  private observer: MutationObserver | null = null;

  async observe(listener: MessageListener<YouTubeBulletChatMessage>): Promise<void> {
    const chatRoot = await findElement(document, "#items");

    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (this.isChatMessage(node)) {
            try {
              const message = this.toBulletChatMessage(node);
              const internalMessage: InternalMessage = {
                type: "YouTubeLiveChatObserverMessage",
                message,
              };
              window.parent.postMessage(internalMessage, ORIGIN);
            } catch (ex) {
              console.error(ex);
            }
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
      textHtml,
      iconUrl,
      paid,
      paidColor,
      member,
      moderator,
      owner,
    };
  }
}

class YouTubeHyperChatObserver implements MessageObserver<YouTubeBulletChatMessage> {
  private observer: MutationObserver | null = null;

  async observe(listener: MessageListener<YouTubeBulletChatMessage>): Promise<void> {
    const chatRoot = await findElement(document, ".hyperchat-root .content");

    this.observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (this.isChatMessage(node)) {
            console.log(node);
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

  private isChatMessage(node: Node): boolean {
    const el = node as HTMLElement;
    return el.querySelector(":scope > .overflow-visible") != null;
  }
}
