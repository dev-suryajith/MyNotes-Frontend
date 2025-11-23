import LetterPad from "./components/LetterPad"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NoteList from "./components/NoteList";
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import LoginRegister from "./components/LoginRegister";

function App() {
  const [editData, setEditData] = useState({
    title: "",
    data: ""
  })
  const [gotoNotepad, setGoToNotePad] = useState(false)

  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path='/' element={<Home setGoToNotePad={setGoToNotePad} />} />
        <Route path='/about' element={<About />} />
        <Route path='/notepad' element={<LetterPad editData={editData} gotoNotepad={gotoNotepad} />} />
        <Route path='/notes' element={<NoteList setEditData={setEditData} />} />
        <Route path='/login' element={<LoginRegister login />} />
        <Route path='/register' element={<LoginRegister />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  )
}

export default App
