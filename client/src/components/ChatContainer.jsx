// client/src/components/ChatContainer.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import ScrollableChat from "./ScrollableChat";

const ENDPOINT = "http://localhost:8000";
let socket;

const ChatContainer = ({ selectedUser, selectedChat: initialSelectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(initialSelectedChat);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Effect for setting up socket
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("message received", (newMessageReceived) => {
      // If the message is for the currently selected chat, update the messages state
      if (selectedChat && selectedChat._id === newMessageReceived.chat._id) {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [selectedChat]);

  const fetchMessages = async (chat) => {
    if (!chat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/messages/${chat._id}`, config);
      setMessages(data);
      socket.emit("join chat", chat._id);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoading(false);
    }
  };

  // Effect for fetching chat and messages when a user is selected
  useEffect(() => {
    const accessAndFetch = async () => {
      if (!selectedUser) return;

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/chat",
          { userId: selectedUser._id },
          config
        );
        setSelectedChat(data);
        fetchMessages(data);
      } catch (error) {
        console.error("Could not access or create chat", error);
      }
    };

    accessAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        setNewMessage(""); // Clear input immediately
        const { data } = await axios.post(
          "/api/messages",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  if (!selectedUser) {
    return (
      <div className="w-2/3 p-4 flex items-center justify-center bg-gray-900">
        <p className="text-xl">Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 flex flex-col bg-gray-900 h-screen">
      {/* Chat Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center">
        <img
          src={selectedUser.avatar}
          alt={selectedUser.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <h2 className="text-xl font-bold">{selectedUser.name}</h2>
      </div>

      {/* Messages */}
      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <p>Loading messages...</p>
        </div>
      ) : (
        <ScrollableChat messages={messages} />
      )}

      {/* Message Input */}
      <form
        onSubmit={sendMessage}
        className="p-4 bg-gray-800 border-t border-gray-700 flex"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 rounded-l-lg bg-gray-700 border border-gray-600 text-white focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
