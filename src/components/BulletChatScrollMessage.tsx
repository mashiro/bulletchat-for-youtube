import { useEventListener, useTimeoutEffect } from "@react-hookz/web";
import { useLayoutEffect } from "react";
import type { BulletChatMessageProps } from "./BulletChatMessage";
import { useBulletChat } from "./BulletChatProvider";

interface BulletChatScrollProps extends BulletChatMessageProps {}

export function BulletChatScrollMessage({ id, duration, content, onDone }: BulletChatScrollProps) {
  const { containerSize } = useBulletChat();
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: "0px", top: "0px" });

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const size = ref.current.getBoundingClientRect();
    const toX = -(size.width + containerSize.width);
    const top = 0;
    setPosition({ x: `${toX}px`, top: `${top}px` });
  }, [containerSize, ref, setPosition]);

  const done = useCallback(() => {
    onDone(id);
  }, [id, onDone]);

  useEventListener(ref.current, "transitionend", done);
  useTimeoutEffect(done, duration * 1.1); // Insurance against transitionend leaks

  return (
    <div
      ref={ref}
      className="absolute will-change-transform transition-transform"
      style={{
        transform: `translateX(${position.x})`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "linear",
        left: "100%",
        top: position.top,
      }}
    >
      {content}
    </div>
  );
}
