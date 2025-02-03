//up to 1.5
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
      <Part partie={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part partie={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part partie={props.parts[2].name} exercise={props.parts[2].exercises}/>
      
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return(
  <p>
    Number of exercises is {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
  </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack app development',
    parts: [
      {
        name: 'Fundamentals of react',
        exercises: 10
      }, 
      {
        name: 'Using props to pass data',
        exercises: 7
      }, 
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  }


  
  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      
      <Total parts={course.parts}/>
    </div>
    
  )
}

export default App
