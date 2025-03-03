import type { BulletChatMessageOptions } from "@/types/bulletchat";
import { useMeasure } from "@react-hookz/web";
import type React from "react";
import { createContext, useEffect, useState } from "react";

type Size = {
  width: number;
  height: number;
};

type BulletChatContextType = {
  containerSize: Size;
  messages: BulletChatMessageOptions[];
  addMessage: (message: BulletChatMessageOptions) => void;
  removeMessage: (id: string) => void;
  clearMessages: () => void;
};

export const BulletChatContext = createContext<BulletChatContextType>({
  messages: [],
  addMessage: () => {},
  removeMessage: () => {},
  clearMessages: () => {},
  containerSize: { width: 0, height: 0 },
});

interface BulletChatProviderProps {
  children: React.ReactNode;
}

export function BulletChatProvider({ children }: BulletChatProviderProps) {
  const [messages, setMessages] = useState<BulletChatMessageOptions[]>([]);
  const [containerSize, setContainerSize] = useState<Size>({ width: 0, height: 0 });
  const [measures, ref] = useMeasure<HTMLDivElement>();

  const addMessage = useCallback((message: BulletChatMessageOptions) => {
    setMessages((messages) => [...messages, message]);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((messages) => messages.filter((message) => message.id !== id));
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    console.log(measures);
    if (measures != null) {
      setContainerSize({ width: measures.width, height: measures.height });
      clearMessages();
    }
  }, [measures, clearMessages]);

  return (
    <BulletChatContext.Provider
      value={{ messages, addMessage, removeMessage, clearMessages, containerSize }}
    >
      <div ref={ref} className="size-full">
        {children}
      </div>
    </BulletChatContext.Provider>
  );
}

export const useBulletChat = () => {
  const context = useContext(BulletChatContext);
  if (context == null) {
    throw new Error("useBulletChat must be used within a BulletChatProvider");
  }
  return context;
};
