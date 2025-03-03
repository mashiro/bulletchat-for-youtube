import type { BulletChatMessageOptions } from "@/types/bulletchat";
import { BulletChatMessage } from "./BulletChatMessage";

type BulletChatMessageListProps = {
  messages: BulletChatMessageOptions[];
  onDone(id: string): void;
};

export function BulletChatMessageList({ messages, onDone }: BulletChatMessageListProps) {
  return (
    <div>
      {messages.map((message) => (
        <BulletChatMessage key={message.id} {...message} onDone={onDone} />
      ))}
    </div>
  );
}
