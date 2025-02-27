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

          const wrapper = document.createElement("div");
          container.append(wrapper);

          const root = ReactDOM.createRoot(wrapper);
          root.render(<App port={channel.port2} />);

          return { root, wrapper };
        },
        onRemove: (elements) => {
          channel.port1.close();
          elements?.root?.unmount();
          elements?.wrapper?.remove();
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
