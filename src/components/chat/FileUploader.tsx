import { useRef } from "react";
import { Upload } from "lucide-react";
import { CircularSpinner } from "../ui/CircularSpinner";

interface FileUploaderProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  hasUploadedDocs: boolean;
  isSending: boolean;
}

export default function FileUploader({
  onFileUpload,
  isUploading,
  hasUploadedDocs,
  isSending,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileUpload}
        multiple
        accept=".docx"
        className="hidden"
        id="file-upload"
        disabled={isSending}
      />
      <label
        htmlFor="file-upload"
        className={`flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer ${
          hasUploadedDocs
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-600 hover:bg-gray-700"
        } text-white transition-colors ${isUploading ? "opacity-75" : ""}`}
        title={hasUploadedDocs ? "Documents uploaded" : "Upload documents"}
      >
        {isUploading ? <CircularSpinner /> : <Upload className="w-5 h-5" />}
      </label>
    </div>
  );
}
