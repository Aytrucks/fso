import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  console.log(props.notes)
  //setX is a function that you pass the value of what you want X to be.
  const [notes,setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("...hey bb,")
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    //prevents page from reloading
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length+1),
    }
    setNotes(notes.concat(noteObject))
    setNewNote("sweaty ballsacks")
  }

  const handleNoteChange = (event) => {
    console.log("current change:",event.target.value)
    setNewNote(event.target.value + "d")
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => 
        <Note note={note} key={note.id}/>
        )}
      </ul>

      <form onSubmit = {addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>

    </div>
  )
}

export default App
