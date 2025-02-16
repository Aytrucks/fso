const Course = (props) => {
    const sum = 
    props.course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises,0);
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
      <div style={{ fontWeight: 'bold' }}>Sum is {sum}</div>
     </div>
    )
  }

export default Course