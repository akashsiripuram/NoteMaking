import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
      <Link to={"/"} className="text-xl font-semibold text-blue-400 hover:text-blue-300 transition">
        Note Making
      </Link>
      <div className="flex space-x-6">
        <Link to={"/allnotes"} className="hover:text-blue-400 transition">All Notes</Link>
        <Link to={"/add"} className="hover:text-blue-400 transition">Add Note</Link>
        <Link to={"/login"} className="hover:text-blue-400 transition">Login</Link>
        <Link to={"/signup"} className="hover:text-blue-400 transition">Signup</Link>
      </div>
    </div>
  );
}
