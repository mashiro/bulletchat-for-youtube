import { isTopFrame } from "@/lib/utils";
import ReactDOM from "react-dom/client";
import { createYouTubeObserver } from "./observers/utils";

export default defineContentScript({
  matches: ["https://*.youtube.com/*"],
  allFrames: true,
  async main(ctx) {
    const observer = createYouTubeObserver();
    if (observer != null) {
      await observer.observe((message) => {
        console.log(message);
      });
    }

    if (isTopFrame()) {
      const ui = await createShadowRootUi(ctx, {
        name: "youtube-bullet-chat-renderer",
        position: "inline",
        anchor: "#movie_player",
        onMount: (container) => {
          console.log("onMount");
          const app = document.createElement("div");
          container.append(app);

          const root = ReactDOM.createRoot(app);

          return root;
        },
        onRemove: (root) => {
          root?.unmount();
        },
      });
      ui.autoMount();
    }
  },
});
