import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Chat from "./pages/Chat";
import Erp from "./pages/Erp";
import About from "./pages/About";
import HelpDesk from "./pages/HelpDesk";
import { Routes as ERoutes } from "./constants/enums";
import ChatCursor from "./components/chat/ChatCursor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ERoutes.ROOT} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ERoutes.CHAT} element={<Chat />} />
          <Route path={"chat-cursor"} element={<ChatCursor />} />
          <Route path={ERoutes.ERP} element={<Erp />} />
          <Route path={ERoutes.ABOUT} element={<About />} />
          <Route path={ERoutes.HELP_DESK} element={<HelpDesk />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
