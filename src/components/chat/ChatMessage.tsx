interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div
      className={`max-w-[70%] p-3 rounded-lg ${
        isUser
          ? "bg-green-200 self-end text-right"
          : "bg-gray-300 self-start text-left"
      }`}
    >
      {message}
    </div>
  );
};

export default ChatMessage;
