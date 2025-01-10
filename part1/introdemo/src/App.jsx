import { useState } from "react"

const Display = ({counter}) => <div>{counter}</div>


const Button = ({onSmash,text}) => {
  console.log(onSmash,text)
  return(
    <button onClick={onSmash}>{text}</button>
  )
}

const History = (props) => {
  
  if(props.allClicks.length === 0){
    return(
      <div>
        the app is used by pressing buttons
      </div>
    )
  }
  return(
    <div>
      button press history: {props.allClicks.join("-")}
    </div>
  )
}


const App = () => {
  const [value, setValue] = useState(10)

  const handleClick = (text, eatshit) => () => {
    console.log(text)
    setValue(eatshit)
  }

  const handleClick2 = () => {
    
    setValue(value+35)
  }

  return (
    <div>
      
      <Button onSmash={() => setValue(1000)} text={"bababooey"}
      />
      <button onClick = {handleClick2}>jump back to zero buddy</button>
      <Display counter={value}/>
    </div>
  )
}

export default App
