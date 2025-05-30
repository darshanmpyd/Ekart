import { useState } from "react";
import profilePic from "/src/assets/profile.png";

export default function AvatarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogOut = () => {
    sessionStorage.removeItem("token");
  };
  return (
    <div className="relative inline-block text-left">
      {/* Avatar Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <img
          src={profilePic}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
          <a
            href="/"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={handleLogOut}
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
}
