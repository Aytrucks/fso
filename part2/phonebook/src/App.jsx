import { useState, useEffect } from 'react'
import telecom from './services/phonebook'
import { FilterUI, MakeMonkey} from './components/Persons'


function App() {
  const testStr = "Hello World"
  const [persons, setPersons] = useState([])
  const [newname, setNewname] = useState("")
  const [newNum, setNewNum] = useState("")

  const [filtName, setFiltName] = useState("")

  //load in data from server
  const hook = () =>{
    //console.log("begin effecto")
    telecom.getAll()
    .then(db_persons => {
      console.log("Promise Fulfilled?")
      setPersons((db_persons))
    })
  }
  useEffect(hook, [])
  //console.log('render', persons.length, 'people')


  //use axios to update the new monkeys to the server
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

  //Delete name from server + frontend
  const deleteMonkey = (name, id) => {
    console.log(id)
    if(confirm(`Delete ${name}?`, id)){
      console.log("Deleted")
      telecom.deletePerson(id).then(() => {
        telecom.getAll().then(remainingMonkeys => {
          setPersons(remainingMonkeys)
        })
      })
      
    }
    else{
      console.log("Not deleted")
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

      <FilterUI people={persons} filtName={filtName} onChange={handleFilter} onDelete={deleteMonkey}/>
      <h2>gmo monkey creation</h2>

      <MakeMonkey addName={addName} newname={newname} handleNewMonkey={handleNewMonkey} newNum={newNum} handleNewNumber={handleNewNumber}/>
      
      
    </div>
  )
}

export default App
