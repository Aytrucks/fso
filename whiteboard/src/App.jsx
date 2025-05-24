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
    .get("http://localhost:3002/notes")
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
      
    }
    axios
    .post('http://localhost:3002/notes', noteObject)
    .then(response => {
      console.log("response is", response)
      setNotes(notes.concat(response.data))
      setNewNote("sweaty ballsacks")
    })
    
  }

  const handleNoteChange = (event) => {
    console.log("current change:",event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = (id) =>{
    console.log('importance of ' + id + ' needs to be tog') 
    const dbnote_url = `http://localhost:3002/notes/${id}`
    const initial_note = notes.find((note) => note.id === id)
    const toggled_note = {
      ...initial_note, 
      important: !initial_note.important
    }
    axios
    .put(dbnote_url, toggled_note)
    .then(response => {
      setNotes(notes.map(note => note.id === id ? response.data : note))
    })
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note => 
        <Note note={note} 
        key={note.id}
        toggleImportance={()=>toggleImportanceOf(note.id)}
        />
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
