import { useState } from 'react'

const Person = ({dude}) => <div>{dude.name}</div>

function App() {
  const testStr = "Hello World"
  const [persons, setPersons] = useState([
    {name: "Jello Gray"}
  ])
  const [newname, setNewname] = useState("")
  const printName = (ppl) => {
    //console.log(ppl)
    const names = (ppl.map(dude => {
      return dude.name
    })
    )
    //console.log(names)
    console.log("3")
    return names
  }

  const addName = (event) => {
    event.preventDefault()
    console.log("Adding name")
    const newMonkey = {
      name: newname
    }
    console.log("1")
    setPersons(persons.concat(newMonkey))
    console.log("2")
  }

  const handleNewMonkey = (event) => {
    console.log(event.target.value)
    setNewname(event.target.value)
  }

  //console.log(persons.map(dude => dude.name))
  return(
    <div>
      <h2>Monkey Directory App</h2>
      <form onSubmit={addName}>
        <div>
          ur monkey name:<input value={newname} onChange={handleNewMonkey}/>
        </div>
        <div>
          <button type='submit'>add ape name</button>
        </div>
      </form>
      <h2>phone numbers of monkeys</h2>
      {persons.map((dude) => 
        <Person dude={dude}/>
      )}
    </div>
  )
}

export default App
