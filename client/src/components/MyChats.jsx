// client/src/components/MyChats.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const MyChats = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get("/api/chat", config);
        setChats(data);
      } catch (error) {
        console.error("Failed to fetch chats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [userInfo.token]);

  const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1] : users[0];
  };

  if (loading) {
    return <p>Loading chats...</p>;
  }

  return (
    <div className="flex flex-col space-y-2">
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => onSelectChat(chat)}
          className="cursor-pointer bg-gray-700 p-3 rounded-lg flex items-center hover:bg-gray-600"
        >
          <img
            src={getSender(userInfo, chat.users).avatar}
            alt="user avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">
              {!chat.isGroupChat
                ? getSender(userInfo, chat.users).name
                : chat.chatName}
            </p>
            {chat.latestMessage && (
              <p className="text-sm text-gray-400">
                <b>{chat.latestMessage.sender.name} : </b>
                {chat.latestMessage.content.length > 50
                  ? chat.latestMessage.content.substring(0, 51) + "..."
                  : chat.latestMessage.content}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyChats;
