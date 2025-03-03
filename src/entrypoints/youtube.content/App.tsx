import { BulletChatRoot } from "@/components/BulletChatRoot";
import { genId } from "@/lib/utils";
import type { YouTubeBulletChatEvent, YouTubeBulletChatMessage } from "@/lib/youtube/types";
import type { BulletChatMessageOptions } from "@/types/bulletchat";
import { eventmit } from "eventmit";

function buildMessageOptions(data: YouTubeBulletChatMessage): BulletChatMessageOptions {
  return {
    mode: "scroll" as const,
    id: genId(),
    duration: 5000,
    content: (
      <div className="flex items-center whitespace-nowrap bullet-chat-text">{data.text}</div>
    ),
  };
}

interface AppProps {
  port: MessagePort;
}

export function App({ port }: AppProps) {
  const messageEventRef = useRef(eventmit<BulletChatMessageOptions>());

  useEffect(() => {
    port.onmessage = (e) => {
      const event = e.data as YouTubeBulletChatEvent;
      if (event.type === "message") {
        messageEventRef.current.emit(buildMessageOptions(event.data));
      }
    };

    return () => {
      port.onmessage = null;
      port.close();
    };
  }, [port, messageEventRef]);

  return (
    <div className="absolute inset-0 z-[1000] pointer-events-none">
      <BulletChatRoot messageEvent={messageEventRef.current} />
    </div>
  );
}
