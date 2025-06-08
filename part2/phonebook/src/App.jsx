import { useState, useEffect } from 'react'
import telecom from './services/phonebook'
import { FilterUI, MakeMonkey} from './components/Persons'
import Notification from './components/Notification'


function App() {
  const testStr = "Hello World"
  const [persons, setPersons] = useState(null)
  const [newname, setNewname] = useState("")
  const [newNum, setNewNum] = useState("")
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('login')

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

    const newMonkey = () =>{
      const monkey = {
        name: newname,
        number: newNum,
      }
      return monkey
    }

    const preexisting = persons.find(dude => dude.name === newname)
    if(preexisting){
      if(window.confirm(`"${newname}" is already on the list. Do you want to change the phone number?`)){
        console.log(preexisting.id)
        telecom.updateNumber(newMonkey(), preexisting.id).then(newMonkey => {
          setPersons(persons.map((person) => {
            return person.id === newMonkey.id ? newMonkey : person
          }))
        }).catch((error) => {
          setMessage(`Turns out "${preexisting.name}" isn't here anymore`)
          setType('error')
          setPersons(persons.filter((monkey) => {
            return monkey.id !== preexisting.id
          }))
          setTimeout(() => {
          setMessage(null)
        }, 5000)
        })
      }
    }
    else{
      console.log("Adding name")
      //window.alert("LMAO")
      telecom.addPerson(newMonkey()).then((monkey) => {
        setPersons(persons.concat(monkey))
        setMessage(`Successfully added ${monkey.name} to the directory!`)
        setType('login')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
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
  if(!Array.isArray(persons)){
    return <div>None here</div>
  }
  return(
    <div>
      <h2>Monkey Directory App</h2>
      <Notification message = {message} type = {type} />
      <FilterUI people={persons} filtName={filtName} onChange={handleFilter} onDelete={deleteMonkey}/>
      <h2>gmo monkey creation</h2>

      <MakeMonkey addName={addName} newname={newname} handleNewMonkey={handleNewMonkey} newNum={newNum} handleNewNumber={handleNewNumber}/>
      
      
    </div>
  )
}

export default App
