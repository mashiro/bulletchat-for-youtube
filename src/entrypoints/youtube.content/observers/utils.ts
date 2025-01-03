import type { YouTubeBulletChatMessage } from "@/lib/youtube/types";
import { YouTubeHyperChatObserver } from "./hyperchat";
import { YouTubeLiveChatObserver } from "./live-chat";
import { YouTubeTopFrameObserver } from "./top-frame";

type YouTubeObserverType = "top" | "live_chat" | "hyperchat";

export function createYouTubeObserver(): MessageObserver<YouTubeBulletChatMessage> | undefined {
  const type = getObserverType();
  switch (type) {
    case "top":
      return new YouTubeTopFrameObserver();
    case "live_chat":
      return new YouTubeLiveChatObserver();
    case "hyperchat":
      return new YouTubeHyperChatObserver();
  }

  return undefined;
}

function getObserverType(): YouTubeObserverType | undefined {
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
