import type { BulletChatMessageOptions } from "@/types/bulletchat";
import type { Eventmitter } from "eventmit";
import { BulletChatProvider } from "./BulletChatProvider";

interface BulletChatRootProps {
  messageEvent: Eventmitter<BulletChatMessageOptions>;
}

export function BulletChatRoot({ messageEvent }: BulletChatRootProps) {
  return (
    <BulletChatProvider>
      <BulletChatContainer messageEvent={messageEvent} />
    </BulletChatProvider>
  );
}
