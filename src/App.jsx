import LetterPad from "./components/LetterPad"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NoteList from "./components/NoteList";
import { Route, Routes } from 'react-router-dom';
import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [editData, setEditData] = useState({
    title: "",
    data: ""
  })
  const [gotoNotepad, setGoToNotePad] = useState(false)
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home setGoToNotePad={setGoToNotePad} />} />
        <Route path='/about' element={<About/>} />
        <Route path='/notepad' element={<LetterPad editData={editData} gotoNotepad={gotoNotepad} />} />
        <Route path='/notes' element={<NoteList setEditData={setEditData} />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
