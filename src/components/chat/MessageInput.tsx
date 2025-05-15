import { useState } from "react";

const MessageInput = ({ onSend }: { onSend: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex p-4 border-t bg-white">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-4 py-2 mr-2"
        placeholder="Write a message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
