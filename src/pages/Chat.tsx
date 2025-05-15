import ChatBox from "../components/chat/ChatBox";

const ChatPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-[250px] bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul className="space-y-2">
          <li>Chat 1</li>
          <li>Chat 2</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* Chat Box */}
      <main className="flex-1 bg-gray-100">
        <ChatBox />
      </main>
    </div>
  );
};

export default ChatPage;
