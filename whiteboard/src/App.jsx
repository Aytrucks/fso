import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes,setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("...hey bb,")

  const addNote = (event) => {
    event.preventDefault();
    console.log('button touched sensually',event.target)
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
        <Note note={note} key={note.id}/>
        )}
      </ul>
      <form onSubmit = {addNote}>
        <input value={newNote}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
