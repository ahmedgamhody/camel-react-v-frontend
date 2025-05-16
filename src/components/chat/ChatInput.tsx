import { FormEvent } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isSending: boolean;
  isUploading: boolean;
  hasUploadedDocs: boolean;
}

export default function ChatInput({
  inputValue,
  setInputValue,
  onSubmit,
  isSending,
  isUploading,
  hasUploadedDocs,
}: ChatInputProps) {
  const handleKeyPress = useKeyPress();

  return (
    <form onSubmit={onSubmit} className="flex gap-2 flex-1">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={
          hasUploadedDocs
            ? "Ask about the uploaded documents..."
            : "Enter your question here..."
        }
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSending || isUploading}
      />
      <button
        type="submit"
        disabled={isSending || !inputValue.trim() || isUploading}
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed duration-300"
      >
        Submit
      </button>
    </form>
  );
}
