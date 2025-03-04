import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeLayout from './components/layout/HomeLayout'
import Login from './pages/Auth/Login'
import AllNotes from './pages/Notes/AllNotes'
import NoteForm from './pages/Notes/NoteForm'
import Signup from './pages/Auth/Signup'
import toast, { Toaster } from 'react-hot-toast';
function App() {
  

  return (
    <>
    <Toaster />
      <Routes>
        <Route path="/" element={<HomeLayout/>}>
          <Route path='allnotes' element={<AllNotes/>}/>
          <Route path='add' element={<NoteForm/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<Signup/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
