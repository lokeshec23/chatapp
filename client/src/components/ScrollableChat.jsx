// client/src/components/ScrollableChat.jsx
import React, { useEffect, useRef } from "react";

const ScrollableChat = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages &&
        messages.map((m, i) => (
          <div
            key={m._id}
            className={`flex ${
              m.sender._id === userInfo._id ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                m.sender._id === userInfo._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              <p>{m.content}</p>
            </div>
          </div>
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ScrollableChat;
