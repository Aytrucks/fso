import { useState, useEffect } from 'react'
import telecom from './services/phonebook'
import { Person, FilterPeople, FilterUI, MakeMonkey} from './components/Persons'


function App() {
  const testStr = "Hello World"
  const [persons, setPersons] = useState([])
  const [newname, setNewname] = useState("")
  const [newNum, setNewNum] = useState("")

  const [filtName, setFiltName] = useState("")

  const hook = () =>{
    console.log("begin effecto")
    telecom.getAll()
    .then(db_persons => {
      console.log("Promise Fulfilled?")
      setPersons((db_persons))
    })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'people')


  //use axios to update 
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
        number: newNum,

      }
      telecom.addPerson(newMonkey).then((monkey) => {
        setPersons(persons.concat(monkey))
      })
      
      

    }
  }

  //set the name
  const handleNewMonkey = (event) => {
    setNewname(event.target.value)
  }

  //set the phone number
  const handleNewNumber = (event) =>{
    setNewNum(event.target.value)
  }

  //set the filter
  const handleFilter = (event) =>{
    setFiltName(event.target.value)
  }

  

  //console.log(persons.map(dude => dude.name))
  return(
    <div>
      <h2>Monkey Directory App</h2>

      <FilterUI people={persons} filtName={filtName} onChange={handleFilter}/>
      <h2>gmo monkey creation</h2>

      <MakeMonkey addName={addName} newname={newname} handleNewMonkey={handleNewMonkey} newNum={newNum} handleNewNumber={handleNewNumber}/>
      
      
    </div>
  )
}

export default App
