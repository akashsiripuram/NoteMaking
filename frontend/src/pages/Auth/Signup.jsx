import { useState } from "react";
import axios from "axios";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function createAccount(e) {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:5000/api/signup", {
        username: username,
        email: email,
        password: password,
      });
      console.log(data);    
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={createAccount}>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="border-2 border-black"
          type="text"
          placeholder="username"
        />
        <br />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="border-2 border-black"
          type="email"
          placeholder="email"
        />
        <br />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="border-2 border-black"
          type="password"
          placeholder="password"
        />
        <br />
        <button className="bg-green-400 p-2 rounded-sm" type="submit">
          create account
        </button>
      </form>
    </div>
  );
}
