// client/src/pages/ChatPage.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar onSelectUser={setSelectedUser} />
      <ChatContainer selectedUser={selectedUser} />
    </div>
  );
};

export default ChatPage;
