type MessageListener<T> = (message: T) => void;

interface MessageObserver<T> {
  observe(): void;
  disconnect(): void;
}
