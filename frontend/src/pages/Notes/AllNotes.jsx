import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AllNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    id:""
  });
  let token;
  if (typeof window!=="undefined") {
    token = localStorage.getItem("token");
  }

  const fetchNotes = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/note/get-notes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.success) {
      setNotes(response.data.notes);
    } else {
      navigate("/");
    }
    setIsLoading(false);
  };

 
  const getUser = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-user`, {
      headers: {
        
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.success) {
      setUser(response.data.user);
    }
  };

  useEffect(() => {
    getUser();
    fetchNotes();
  }, []);

  const handleOpenModal = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      id: note._id,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNote(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const respose=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/note/update/`+formData.id,formData,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        if(respose.data.success){
            toast.success("Note updated successfully");
            handleCloseModal();
            fetchNotes();
        }
        fetchNotes();
      
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the note");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/note/delete-note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the note");
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Notes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note._id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{note.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
              {user && user._id === note.createdBy && (
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleOpenModal(note)} 
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(note._id)} 
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for editing notes */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit Note</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Empty state when no notes are present */}
      {notes.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600 text-lg mb-2">No notes yet</p>
          <p className="text-gray-500 text-center">Create your first note to get started</p>
        </div>
      )}
    </div>
  );
}