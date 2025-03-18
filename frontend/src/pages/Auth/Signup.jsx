import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createAccount(e) {
    e.preventDefault();
    try {
      const data = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        username,
        email,
        password,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 text-white">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Create an Account</h2>
        <form onSubmit={createAccount} className="space-y-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            type="email"
            placeholder="Email"
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
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account? <a href="#" className="text-blue-400 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
