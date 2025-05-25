import { useState, useEffect } from 'react'
import axios from 'axios'

//simply renders name, number, and ID. 
const Person = ({dude}) => {
  
  if(dude.number === ""){
    dude.number = "NUMBER NOT AVAILABLE"
  }
  return <div><strong>Name:</strong> {dude.name}  <strong>Numero:</strong>{dude.number} <strong>ID: </strong>{dude.id}</div>
}

//Filters directory of people based on lowercasing the entire name and observing if the typed substring is within the name
const FilterPeople = ({people, filter}) => {
  //console.log(people)
  //console.log(filter)
  const fPersons = people.filter((dude) =>{
    return (dude.name.toLowerCase()).includes(filter.toLowerCase())
  })
  //console.log(fPersons)
  return <div>
    {fPersons.map((dude) => <Person dude={dude} key={dude.id}/>)}
  </div>
  
}

//UI to handle filtering. Contains the input box for typing filter and displays filtered names
const FilterUI = ({filtName, onChange, people}) => {

  return (
    <div>
      Who's your favorite monkey
      <input value = {filtName} onChange={onChange}/>
      <FilterPeople people={people} filter={filtName}/>
    </div>
  )
}

const MakeMonkey = (props) => {
  return <form onSubmit={props.addName}>
  <div>ur monkey name:<input value={props.newname} onChange={props.handleNewMonkey}/></div>
  <div>ur monkeys number: <input value={props.newNum} onChange={props.handleNewNumber}/></div>
  
  <div><button type='submit'>add ape name</button></div>
</form>
}

function App() {
  const testStr = "Hello World"
  const [persons, setPersons] = useState([])
  const [newname, setNewname] = useState("")
  const [newNum, setNewNum] = useState("")
  const [idMonk, setId] = useState(5)
  const [filtName, setFiltName] = useState("")

  const hook = () =>{
    console.log("begin effecto")
    axios.get("http://localhost:3001/persons")
    .then(response => {
      console.log("Promise Fulfilled?")
      setPersons((response.data))
    })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'people')


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
        id: idMonk
      }
      
      setPersons(persons.concat(newMonkey))
      
      setId(idMonk + 1)
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
