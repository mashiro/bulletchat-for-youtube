import type { BulletChatMessageOptions } from "@/types/bulletchat";
import { BulletChatScrollMessage } from "./BulletChatScrollMessage";

export interface BulletChatMessageProps extends BulletChatMessageOptions {
  onDone(id: string): void;
}

export function BulletChatMessage(props: BulletChatMessageProps) {
  switch (props.mode) {
    case "scroll":
      return <BulletChatScrollMessage {...props} />;
    // case "bottom":
    //   return <BulletChatBottom {...props} />;
    default:
      return <div />;
  }
}
