import React, { useState } from "react";

const Nav = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Trigger search on change
  };

  return (
    <div className="flex p-2 justify-between items-center border-b border-gray-300 flex-wrap">
      <div className="flex items-center">
        <img
          src="/logo.PNG"
          className="w-10 h-10"
          alt="Logo"
        />
        <h2 className="font-bold text-2xl text-red-600">Sierra</h2>
      </div>
      <div className="relative items-center md:inline-flex">
        <input
          type="text"
          placeholder="Search by name, brand, model"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-red-600 w-96 rounded-md py-1 px-2"
        />
        <svg
          className="absolute right-2 h-6 w-6 text-gray-400 hover:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="flex items-center gap-2">
        <button className="border px-2 py-1 rounded-md bg-red-600 text-white hover:bg-purple-700">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Nav;
