import { useState } from 'react'

const Person = ({dude}) => {

  return <div><strong>Name:</strong> {dude.name}  <strong>Numero:</strong>{dude.number} {dude.id}</div>
}

const MonkeyList = ({dudes}) => {
  return (
    dudes.map((dude) => {
      <Person dude={dude} key={dude.id}/>
    })
  )
}

const FilterPerson = ({people, filter}) => {
  //console.log(people)
  //console.log(filter)
  const fPersons = people.filter((dude) =>{
    return (dude.name.toLowerCase()).includes(filter.toLowerCase())
  })
  //console.log(fPersons)
  return <div>
    {fPersons.map((dude) => <Person dude={dude}/>)}
  </div>
  
}

const FilterUI = ({filtName, onChange, people}) => {

  return (
    <div>
      Who's your favorite monkey
      <input value = {filtName} onChange={onChange}/>
      <FilterPerson people={people} filter={filtName}/>
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
  const [persons, setPersons] = useState([
    {name: "Jello Gray", number:"480-999-9999", id:0},
    {name: "The Rock", number:"123-019-fukc", id:1},
  ])
  const [newname, setNewname] = useState("")
  const [newNum, setNewNum] = useState("")
  const [idMonk, setId] = useState(2)
  const [filtName, setFiltName] = useState("")

  const filteredPpl = persons.filter((dude) => dude.name === "Jello Gray")

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
      console.log("1")
      setPersons(persons.concat(newMonkey))
      console.log("2")
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
      {/* <form onSubmit={addName}>
        <div>ur monkey name:<input value={newname} onChange={handleNewMonkey}/></div>
        <div>ur monkeys number: <input value={newNum} onChange={handleNewNumber}/></div>
        
        <div><button type='submit'>add ape name</button></div>
      </form> */}
      <MakeMonkey addName={addName} newname={newname} handleNewMonkey={handleNewMonkey} newNum={newNum} handleNewNumber={handleNewNumber}/>
      <h2>phone numbers of monkeys</h2>
      <MonkeyList dudes={persons}/>
    </div>
  )
}

export default App
