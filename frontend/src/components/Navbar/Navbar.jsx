import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      setUser(response.data.user);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
      <Link
        to={"/"}
        className="text-xl font-semibold text-blue-400 hover:text-blue-300 transition">
        Note Making
      </Link>
      <div className="flex space-x-6">
        <Link to={"/allnotes"} className="hover:text-blue-400 transition">
          All Notes
        </Link>
        <Link to={"/add"} className="hover:text-blue-400 transition">
          Add Note
        </Link>
        {user && user ? (
          <div className="flex items-center space-x-10">
            <span className="text-sm font-semibold">
               {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to={"/login"} className="hover:text-blue-400 transition">
              Login
            </Link>
            <Link to={"/signup"} className="hover:text-blue-400 transition">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
