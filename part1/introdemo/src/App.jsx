import { useState } from "react"

const Display = ({counter}) => <div>{counter}</div>


const Button = ({onSmash,text}) => <button onClick={onSmash}>{text}</button>


const App = (props) => {
  const [counter, setCounter ] = useState(-1)
  console.log('rendering with counter value', counter)
  const increaseBy1 = () => {
    console.log('up counter val', counter)
    setCounter(counter+1)
  }
  const decreaseBy1 = () => {
    console.log('down counter val', counter)
    setCounter(counter-1)
  }
  const set0 = () => {
    console.log('zeroing', counter)
    setCounter(0)
  }

  return(
    <div>
      <Display counter={counter}/>
      <Button onSmash={increaseBy1} text='ploos'/>
      <Button onSmash={decreaseBy1} text='minoos'/>
      <Button onSmash={set0} text='zeroo'/>
    </div>
  )
}

export default App
