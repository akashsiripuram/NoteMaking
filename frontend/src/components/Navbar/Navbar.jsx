import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-purple-300 p-2 flex flex-row justify-around w-[100vw] px-4">
      <Link to={"/"} className="flex flex-row w-1/2">
        <div className="cursor-pointer">Note Making</div>
      </Link>
      <div className="flex flex-row w-1/2 justify-between">
        <Link to={"/allnotes"}>
          <div className="cursor-pointer">All notes</div>
        </Link>
        <Link to={"/add"}>
          <div className="cursor-pointer">Add note</div>
        </Link>
        <Link to={"/login"}>
          <div className="cursor-pointer">Login</div>
        </Link>
        <Link to={"/signup"}>
          <div className="cursor-pointer">Signup</div>
        </Link>
       
      </div>
    </div>
  );
}
