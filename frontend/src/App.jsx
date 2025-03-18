import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeLayout from "./components/layout/HomeLayout";
import Login from "./pages/Auth/Login";
import AllNotes from "./pages/Notes/AllNotes";
import NoteForm from "./pages/Notes/NoteForm";
import Signup from "./pages/Auth/Signup";
import  { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  // eslint-disable-next-line react/prop-types
  const PrivateRoute = ({ children }) => {
    // const isAuthenticated = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setIsLoading] = useState(true);
    let token;
    if (typeof window!=="undefined") {
      token = localStorage.getItem("token");
    }
    const fetchUser = async () => {
      setIsLoading(true);
      console.log("before call");
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        if (response.data.success) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (er) {
       console.log(er);
        setIsAuthenticated(false);
      }
      finally{

        setIsLoading(false);
      }
    };
    useEffect(() => {
      fetchUser();
    }, []);
    if (loading) {
      return <p>Loading</p>;
    }
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route
            path="allnotes"
            element={
              <PrivateRoute>
                <AllNotes />
              </PrivateRoute>
            }
          />
          <Route
            path="add"
            element={
              <PrivateRoute>
                <NoteForm />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
