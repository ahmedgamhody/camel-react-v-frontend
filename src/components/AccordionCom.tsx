import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  num: number;
}

export default function AccordionItem({
  title,
  children,
  num,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white text-primary rounded-2xl mt-6 max-w-7xl w-full shadow-md overflow-hidden p-1">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-start justify-between"
      >
        <div className="bg-primary text-white font-bold text-xl px-6 py-4 rounded-l-2xl rounded-br-[80px]">
          Test Question {`${num}`}
        </div>
        <div className="flex-1 px-6 py-4 text-left font-bold text-lg md:text-xl">
          {title}
        </div>
        <div className="px-6 py-4">
          {isOpen ? (
            <ChevronUp size={24} className="text-primary" />
          ) : (
            <ChevronDown size={24} className="text-primary" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="py-4 px-6 text-md md:text-lg font-semibold text-start">
          {children}
        </div>
      )}
    </div>
  );
}
