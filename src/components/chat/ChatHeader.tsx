import camelLogo from "../../assets/Camel-Logo-2.png";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-center p-4 border-b">
      <div className="flex items-center justify-center flex-1">
        <img
          src={camelLogo}
          alt="Camel Logo"
          className="h-12 w-auto object-contain"
        />
      </div>
    </div>
  );
}
