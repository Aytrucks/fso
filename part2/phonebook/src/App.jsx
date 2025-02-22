import { useState } from 'react'

function App() {
  const [persons, setPersons] = useState([
    {name: "Jello Gray"}
  ])
  const [newname, setNewname] = useState("")
  const printName = (ppl) => {
    console.log(ppl)
    const names = (ppl.map(dude => {
      console.log(dude.name)
      dude.name
    })
    
  )
  }
  return(
    <div>
      <h2>Monkey Directory App</h2>
      <form>
        <div>
          ur monkey name:<input/>
        </div>
        <div>
          <button type='submit'>add ape name</button>
        </div>
      </form>
      <h2>phone numbers of monkeys</h2>
      {printName(persons)}
    </div>
  )
}

export default App
