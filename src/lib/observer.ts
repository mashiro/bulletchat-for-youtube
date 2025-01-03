type MessageListener<T> = (message: T) => void;

interface MessageObserver<T> {
  observe(listener: MessageListener<T>): Promise<void>;
  disconnect(): void;
}
