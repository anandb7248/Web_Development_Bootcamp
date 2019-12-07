import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import starterNotes from "../notes.js"

function App() {
  const [notes, updateNotes] = useState(starterNotes);

  function addNote(noteObj) {
    updateNotes(prevNotes => [...prevNotes, {key : prevNotes.length, ...noteObj }]);
  }

  function deleteNote(id){
    updateNotes(prevNotes => {
      return prevNotes.filter((note, index) => {return index !== id});
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addClicked={addNote}/>
      {notes.map((note, index) => {
        return <Note key={index} id={index} title={note.title} content={note.content} deleteClicked={deleteNote} />
      })}
      <Footer />
    </div>
  );
}

export default App;
