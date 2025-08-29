// client/src/components/ChatContainer.jsx
import React from "react";

const ChatContainer = ({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className="w-2/3 p-4 flex items-center justify-center bg-gray-900">
        <p className="text-xl">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 flex flex-col bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <h2 className="text-xl font-bold">{selectedUser.name}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Messages will go here */}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
        />
      </div>
    </div>
  );
};

export default ChatContainer;
