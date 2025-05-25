//simply renders name, number, and ID. 
const Person = ({dude}) => {
  
  if(dude.number === ""){
    dude.number = "NUMBER NOT AVAILABLE"
  }
  return <div><strong>Name: </strong> {dude.name} 📞 <strong>Numero: </strong>{dude.number} <strong>ID: </strong>{dude.id}</div>
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

//adds a monkey to the directory, taking in the name and number. We pass in 2 different callbacks to handle inputs
const MakeMonkey = (props) => {
  return <form onSubmit={props.addName}>
  <div>ur monkey name:<input value={props.newname} onChange={props.handleNewMonkey}/></div>
  <div>ur monkeys number: <input value={props.newNum} onChange={props.handleNewNumber}/></div>
  
  <div><button type='submit'>add ape name</button></div>
</form>
}

export { Person, FilterPeople, FilterUI, MakeMonkey}