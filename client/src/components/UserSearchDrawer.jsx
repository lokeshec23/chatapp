// client/src/components/UserSearchDrawer.jsx
import React, { useState } from "react";
import axios from "axios";

const UserSearchDrawer = ({ onSelectUser, onClose }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleSearch = async () => {
    if (!search) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users?search=${search}`, config);
      setSearchResult(data);
    } catch (error) {
      console.error("Failed to search users", error);
    } finally {
      setLoading(false);
    }
  };

  // This needs to be implemented on the backend as well
  const handleUserClick = (user) => {
    onSelectUser(user);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={onClose}
    >
      <div
        className="absolute left-0 top-0 h-full w-80 bg-gray-800 p-4 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Search Users</h2>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded-l-lg bg-gray-700 border border-gray-600 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 px-4 rounded-r-lg"
          >
            Go
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchResult?.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user)}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded-lg"
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
          ))
        )}
      </div>
    </div>
  );
};

export default UserSearchDrawer;
