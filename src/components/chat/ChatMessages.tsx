import { Message } from "../../interfaces";
import { Spinner } from "../ui/Spinner";

interface ChatMessagesProps {
  messages: Message[];
  isSending: boolean;
  hasUploadedDocs: boolean;
}

export default function ChatMessages({
  messages,
  isSending,
  hasUploadedDocs,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
          <p className="text-xl">Hi! How can i assist today?</p>
          {!hasUploadedDocs && (
            <p className="text-sm">
              Upload documents to enable document-based questions
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {messages?.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.isUser
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message?.text}
              </div>
            </div>
          ))}
          {isSending && (
            <div className="flex justify-end">
              <div className="bg-gray-100 rounded-lg px-4 py-3">
                <Spinner />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
