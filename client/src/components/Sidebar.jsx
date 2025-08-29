// client/src/components/Sidebar.jsx
import React, { useState } from "react";
import MyChats from "./MyChats";
import UserSearchDrawer from "./UserSearchDrawer";

const Sidebar = ({ onSelectChat, onSelectUser }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectUser = (user) => {
    onSelectUser(user);
    setIsDrawerOpen(false);
  };

  return (
    <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-700 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Chats</h2>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
        >
          New Chat
        </button>
      </div>
      <MyChats onSelectChat={onSelectChat} />
      {isDrawerOpen && (
        <UserSearchDrawer
          onSelectUser={handleSelectUser}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
