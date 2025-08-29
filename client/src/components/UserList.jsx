// client/src/components/UserList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get("/api/users", config);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div>
      {users.map((user) => (
        <div
          key={user._id}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-lg"
          onClick={() => onSelectUser(user)}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.phoneNumber}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
