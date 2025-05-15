import { Link } from "react-router-dom";
import camelLogo from "../assets/Camel-logo-transparent.png";
import { Routes } from "../constants/enums";

export default function HomePage() {
  const links = [
    { name: "Procedure AI Assistant", path: Routes.CHAT },
    { name: "RPA", path: Routes.ERP },
    { name: "Help Desk Assistant", path: Routes.HELP_DESK },
    { name: "About Us", path: Routes.ABOUT },
  ];

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-between py-10">
      <div className="flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Hello, I'm Camel
        </h1>
        <p className="text-lg md:text-xl mb-6">
          The first customizable LLM Chatbot.
        </p>

        <img
          src={camelLogo}
          alt="Camel Bot"
          className="w-60 h-58 object-contain mb-6"
        />

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="bg-white text-primary py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 font-bold text-xl"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-start mt-8 px-4">
        <p className="text-sm text-white/70">Powered by Corelia®</p>
      </div>
    </div>
  );
}
