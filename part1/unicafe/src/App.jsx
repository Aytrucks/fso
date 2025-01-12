import { useState } from 'react'

const Button = ({click,text}) => {
  return(
  <button onClick={click}>
    {text}
  </button>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [good, setGood] = useState(0)
  const [mid, setMid] = useState(0)
  const [ass, setAss] = useState(0)

  const handleGood = () => {
    setCount(count+1)
    return setGood(good+1)
  }
  const handleMid = () => {
    setCount(count+1)
    return setMid(mid+1)
  }
  const handleAss = () => {
    setCount(count+1)
    return setAss(ass+1)
  }

  return (
    <div >
      <h1>What's the rating fellers</h1>
      <Button click={handleGood} text={"Good +1"}/>
      <Button click={handleMid} text={"Mid +1"}/>
      <Button click={handleAss} text={"Ass +1"}/>
      <Button click={() => {setGood(0);setAss(0);setMid(0);setCount(0)}} text={"RESET"}/>
    <h2>We got:</h2>
    <ul style={{color:"red"}}>
      <li>Good: {good}</li>
      <li>Mid: {mid}</li>
      <li>Ass: {ass}</li>
      <li>Total: {count}</li>
    </ul>
    <h2>The Percentages</h2>
    <ul style={{color:"blueviolet"}}>
      <li>Good: {good/count}%</li>
      <li>Mid: {mid/count}%</li>
      <li>Ass: {ass/count}%</li>

      <li>Average: {((good*1) + (mid*0) + (ass*(-1))) / count}</li>
    </ul>
    </div>
  )
}

export default App
