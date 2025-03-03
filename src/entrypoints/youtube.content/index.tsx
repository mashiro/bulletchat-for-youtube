import { isTopFrame } from "@/lib/utils";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ORIGIN } from "./observers/common";
import { createYouTubeObserver } from "./observers/utils";
import "@/assets/tailwind.css";

export default defineContentScript({
  matches: ["https://*.youtube.com/*"],
  cssInjectionMode: "ui",
  allFrames: true,
  async main(ctx) {
    if (isTopFrame()) {
      const channel = new MessageChannel();

      const ui = await createShadowRootUi(ctx, {
        name: "youtube-bullet-chat-renderer",
        position: "inline",
        anchor: "#movie_player",
        onMount: (container) => {
          window.addEventListener("message", (e) => {
            if (e.origin !== ORIGIN) {
              return;
            }
            channel.port1.postMessage(e.data);
          });

          const root = ReactDOM.createRoot(container);
          root.render(<App port={channel.port2} />);

          return root;
        },
        onRemove: (root) => {
          channel.port1.close();
          root?.unmount();
        },
      });

      ui.autoMount();
    } else {
      // Run observer in iframe
      const observer = createYouTubeObserver();
      observer?.observe();
    }
  },
});
