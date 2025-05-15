import { useState } from "react";
import ChatMessage from "./ChatMessage";
import axios from "axios";
import MessageInput from "./MessageInput";

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (userText: string) => {
    const newUserMsg: Message = { text: userText, isUser: true };
    setMessages((prev) => [...prev, newUserMsg]);

    try {
      const res = await axios.post<{ reply: string }>(
        "https://your-api.com/chat",
        {
          message: userText,
        }
      );

      const aiText = res.data.reply;
      const newAiMsg: Message = { text: aiText, isUser: false };
      setMessages((prev) => [...prev, newAiMsg]);
    } catch (err) {
      console.error("Error fetching AI response", err);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatBox;
