import type { YouTubeBulletChatMessageEvent } from "@/lib/youtube/types";

interface AppProps {
  port: MessagePort;
}

export function App({ port }: AppProps) {
  useEffect(() => {
    port.onmessage = (e) => {
      const event = e.data as YouTubeBulletChatMessageEvent;
      console.log(e.data);
    };

    return () => {
      port.onmessage = null;
      port.close();
    };
  }, [port]);

  return (
    <div className="absolute inset-0 z-[1000] pointer-events-none">
      <h1>App</h1>
    </div>
  );
}
