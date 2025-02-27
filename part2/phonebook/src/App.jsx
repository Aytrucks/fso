import { useState } from 'react'

const Person = ({dude}) => <div><strong>Name:</strong> {dude.name}  <strong>Numero:</strong>{dude.number}</div>

function App() {
  const testStr = "Hello World"
  const [persons, setPersons] = useState([
    {name: "Jello Gray", number:"480-999-9999"}
  ])
  const [newname, setNewname] = useState("")
  const [newNum, setNewNum] = useState("")

  const addName = (event) => {
    event.preventDefault()

    if(persons.some(dude => dude.name === newname)){
      console.log("Fuck you")
      window.alert(`"${newname}" is already on the list bruh cant you read??`)
    }
    else{
      console.log("Adding name")
      //window.alert("LMAO")
      const newMonkey = {
        name: newname,
        number: newNum
      }
      console.log("1")
      setPersons(persons.concat(newMonkey))
      console.log("2")
    }
  }

  const handleNewMonkey = (event) => {
    console.log(event.target.value)
    setNewname(event.target.value)
  }

  const handleNewNumber = (event) =>{
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  //console.log(persons.map(dude => dude.name))
  return(
    <div>
      <h2>Monkey Directory App</h2>
      <form onSubmit={addName}>
        <div>ur monkey name:<input value={newname} onChange={handleNewMonkey}/></div>
        <div>ur monkeys number: <input value={newNum} onChange={handleNewNumber}/></div>
        
        <div><button type='submit'>add ape name</button></div>
      </form>
      <h2>phone numbers of monkeys</h2>
      {persons.map((dude) => 
        <Person dude={dude}/>
      )}
    </div>
  )
}

export default App
