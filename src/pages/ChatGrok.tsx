import React, { useState, FormEvent } from "react";
import axios from "axios";

interface Message {
  text: string;
  isUser: boolean;
}

interface QuestionPayload {
  user_input: string;
}

interface ApiResponse {
  answer: string;
}

// الـ Chat Component
const ChatGrok: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  // دالة إرسال السؤال للـ API
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // إرسال الـ request للـ API
      const payload: QuestionPayload = { user_input: input };
      const response = await axios.post<ApiResponse>(
        "http://10.100.102.6:8000/asktasks",
        payload
      );

      // إضافة رد الـ AI للقايمة
      const aiMessage: Message = { text: response.data.answer, isUser: false };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        text: "Error: Could not get response",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "auto",
          marginBottom: "20px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.isUser ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <span
              style={{
                background: message.isUser ? "#007bff" : "#e9ecef",
                color: message.isUser ? "white" : "black",
                padding: "8px 12px",
                borderRadius: "10px",
                display: "inline-block",
              }}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>

      {/* الـ Input وزر الـ Send */}
      <form onSubmit={sendMessage} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatGrok;
