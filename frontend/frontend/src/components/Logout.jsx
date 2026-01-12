import React from "react";
import { useAuth } from "../context/authprovider";

function Logout() {
  const [authUser, setAuthUser] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthUser(null);
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}

export default Logout;
