import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    setIsLoading(true);
    console.log("Hello Jii")
    e.preventDefault();
    console.log(title);
    console.log(content);
    let token;
    if (typeof window!=="undefined") {
      token = localStorage.getItem("token");
    }

    const response = await axios.post(
      "http://localhost:5000/api/note/create-note",
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Helo from noteform",response);

    if (response.data.success) {
      toast.success("note created successfully.");
    } else {
      toast.error("something went wrong!");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-[80%] max-w-lg text-white">
        <h2 className="text-2xl font-bold text-gray-100 mb-4">NoteForm</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-gray-300 mb-1">
              Content
            </label>
            <input
              type="text"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              placeholder="Enter content"
            />
          </div>
          {isLoading ? (
            <>
              <button
                disabled={true}
                type="submit"
                className="w-full bg-gray-600 text-white p-3 rounded-md font-semibold hover:bg-gray-700 transition duration-300"
              >
                Add Note
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
              >
                Add Note
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
