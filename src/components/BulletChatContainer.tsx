import type { BulletChatMessageOptions } from "@/types/bulletchat";
import type { Eventmitter } from "eventmit";
import { BulletChatMessageList } from "./BulletChatMessageList";
import { BulletChatProvider, useBulletChat } from "./BulletChatProvider";

interface BulletChatContainerProps {
  messageEvent: Eventmitter<BulletChatMessageOptions>;
}

export function BulletChatContainer({ messageEvent }: BulletChatContainerProps) {
  const bulletChat = useBulletChat();

  const onDone = useCallback(
    (id: string) => {
      console.log("done", id);
      bulletChat.removeMessage(id);
    },
    [bulletChat],
  );

  useEffect(() => {
    const onMessage = (message: BulletChatMessageOptions) => {
      console.log(message);
      bulletChat.addMessage(message);
    };
    messageEvent.on(onMessage);

    return () => {
      messageEvent.off(onMessage);
    };
  }, [bulletChat, messageEvent]);

  return (
    <BulletChatProvider>
      <BulletChatMessageList messages={bulletChat.messages} onDone={onDone} />
    </BulletChatProvider>
  );
}
