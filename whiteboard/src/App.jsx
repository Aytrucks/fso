import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteHelp from './services/notes'

const App = () => {
  
  //setX is a function that you pass the value of what you want X to be.
  const [notes,setNotes] = useState([])
  const [newNote, setNewNote] = useState("...hey bb,")
  const [showAll, setShowAll] = useState(true)

  //useEffect is important if you want to interact with databases and content outside of the React aspect of the code
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

  //add a new note. PreventDefault in our case prevents reloading. We use post requests to update the database with the new note, and we use the state hooks to update the front end
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

  //callback function to handle the new note as it is being typed character by character
  const handleNoteChange = (event) => {
    console.log("current change:",event.target.value)
    setNewNote(event.target.value)
  }

  //callback function to toggle presenting non-important notes
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  //callback function that toggles the value of a note's importance. We reference the specific db url of the note using its id and create a copy of the note by passing in its reference (with ...initial_note), but specifically change its importance
  //We then use the put request to change the pre-existing note to the new note. We also chain .then to use the state hook and update the front end similarly
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

  // Proof of rendering
  console.log("teehee")

  //return the HTML and components
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
        <input value={newNote} onChange={(thing) => handleNoteChange(thing)}/>
        <button type="submit">save</button>
      </form>

    </div>
  )
}

export default App
