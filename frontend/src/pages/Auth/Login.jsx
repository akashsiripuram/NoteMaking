import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  async function LoginUser(e){
    e.preventDefault();
    const res=await axios.post("http://localhost:5000/api/login",{
        username,password
    });
    if(res.data.success){
        localStorage.setItem("token",res.data.token);
        toast.success(res.data.message);
        navigate("/");
    }
    else{
        toast.error(res.data.message);
        
    }

  }
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-white">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Login</h2>
        <form onSubmit={LoginUser} className="space-y-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            type="text"
            placeholder="Username"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            type="password"
            placeholder="Password"
          />
          <button
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            type="submit"
          >
           Login
          </button>
        </form>
        
      </div>
    </div>
  );
}
