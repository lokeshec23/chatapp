// client/src/pages/ChatPage.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectChat = (chat) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const sender = chat.users.find((u) => u._id !== userInfo._id);
    setSelectedUser(sender);
    setSelectedChat(chat);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedChat(null); // Clear previous chat
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        onSelectChat={handleSelectChat}
        onSelectUser={handleSelectUser}
      />
      <ChatContainer selectedUser={selectedUser} selectedChat={selectedChat} />
    </div>
  );
};

export default ChatPage;
