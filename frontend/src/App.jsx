import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeLayout from './components/layout/HomeLayout'
import Login from './pages/Auth/Login'
import AllNotes from './pages/Notes/AllNotes'
import NoteForm from './pages/Notes/NoteForm'
import Signup from './pages/Auth/Signup'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react'
import axios from 'axios'
function App() {
  const PrivateRoute = ({ children}) => {
    // const isAuthenticated = localStorage.getItem("token");
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [loading,setIsLoading] = useState(true);
    const fetchUser = async () => {
      setIsLoading(true);
      console.log("before call")
      const response = await axios.get("http://localhost:5000/api/get-user",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response)
      if(response.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }
    useEffect(()=>{
      fetchUser();
    },[])
    if(loading) {
      return <p>Loading</p>
    }
    return isAuthenticated ? children : <Navigate to="/login" />;

    // if (isAuthenticated ) {
    //   return children
    // }
      
    // return <Navigate to="/" />
  }

  return (
    <>
    <Toaster />
      <Routes>
        <Route path="/" element={<HomeLayout/>}>
          <Route path='allnotes' element={
          <PrivateRoute>
            <AllNotes/>
          </PrivateRoute>}/>
          <Route path='add' element={
            <PrivateRoute>
              <NoteForm />
            </PrivateRoute>
          }/>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
