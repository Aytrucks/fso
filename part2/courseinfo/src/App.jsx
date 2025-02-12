const Course = (props) => {
  const sum = props.course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return(
  <div>  
    <h1>
      {props.course.name}
    </h1>
    Course id is: {props.course.id}
    <ul>
      {
        props.course.parts.map((part) => {
          
          return <li key={part.id}>{part.name}</li>
        })
        
      }
    </ul>
    Sum is {sum}
   </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App

