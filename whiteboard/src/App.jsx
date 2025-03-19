import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  
  //setX is a function that you pass the value of what you want X to be.
  const [notes,setNotes] = useState([])
  const [newNote, setNewNote] = useState("...hey bb,")
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
    .get("http://localhost:3001/notes")
    .then(response => {
      console.log('promise achieved')
      setNotes(response.data)
    })
  }
  useEffect(hook, [])
  console.log('render', notes.length, 'many notes')

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
