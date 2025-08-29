// client/src/components/Sidebar.jsx
import React from "react";
import UserList from "./UserList";

const Sidebar = ({ onSelectUser }) => {
  return (
    <div className="w-1/3 bg-gray-800 p-4">
      <h2 className="text-2xl font-bold mb-4">Chats</h2>
      <UserList onSelectUser={onSelectUser} />
    </div>
  );
};

export default Sidebar;
