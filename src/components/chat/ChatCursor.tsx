import { useState, FormEvent, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Message } from "../../interfaces";
import { askTasks, askDocx, uploadDocx } from "../../utils/api";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import FileUploader from "./FileUploader";

export default function ChatCursor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [hasUploadedDocs, setHasUploadedDocs] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    // Validate file types
    const invalidFiles = Array.from(files).filter(
      (file) => !file.name.endsWith(".docx")
    );
    if (invalidFiles.length > 0) {
      toast.error("Only .docx files are allowed");
      return;
    }

    setIsUploading(true);
    try {
      await uploadDocx(Array.from(files));
      setHasUploadedDocs(true);
      toast.success("Documents uploaded successfully!");
    } catch (error) {
      console.error("Error uploading documents:", error);
      setHasUploadedDocs(false); // Reset state on error
    } finally {
      setIsUploading(false);
    }
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isSending) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    try {
      let response;
      if (hasUploadedDocs) {
        response = await askDocx({ question: inputValue });
      } else {
        response = await askTasks({ user_input: inputValue });
      }

      // Validate response
      const responseText = response.data.answer || response.data.reply;
      if (!responseText) {
        throw new Error("Invalid response format from server");
      }

      const aiMessage: Message = {
        text: responseText,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        text: "Sorry, a connection error occurred",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
      setInputValue("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader />

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <ChatMessages
            messages={messages}
            isSending={isSending}
            hasUploadedDocs={hasUploadedDocs}
          />
          <div ref={messagesEndRef} />

          <div className="border-t p-4">
            <div className="flex gap-2">
              <ChatInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSubmit={sendMessage}
                isSending={isSending}
                isUploading={isUploading}
                hasUploadedDocs={hasUploadedDocs}
              />
              <FileUploader
                onFileUpload={handleFileUpload}
                isUploading={isUploading}
                hasUploadedDocs={hasUploadedDocs}
                isSending={isSending}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
