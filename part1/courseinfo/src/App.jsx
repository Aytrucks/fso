//It looks gross since I didn't know what I could and couldn't change. I believe this format answers all questions 
//Otherwise I would've rearranged the parts and exercises into their own array 
const Header = (props) => {
  return(
    <h1>
      This Course is {props.course}
    </h1>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <p>
      {props.partie} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part partie={props.part1} exercise={props.exercise1}/>
      <Part partie={props.part2} exercise={props.exercise2}/>
      <Part partie={props.part3} exercise={props.exercise3}/>
    </div>
  )
}

const Total = (props) => {
  return(
  <p>
    Number of exercises is {props.total}
  </p>
  )
}

const App = () => {
  const course = 'Half Stack app development'
  const part1 = {
    name: 'Fundamentals of react',
    exercises: 10
  } 
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  } 
  const part3 = {
    name: 'State of a component',
    exercises: 14
  } 


  return(
    <div>
      <Header course={course}/>
      <Content part1 = {part1.name} part2 = {part2.name} part3 = {part3.name} exercise1 = {part1.exercises} exercise2 = {part2.exercises} exercise3={part3.exercises}/>
      
      <Total total={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
    
  )
}

export default App
