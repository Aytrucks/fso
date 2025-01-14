import { useState } from 'react'

const Button = ({func,text}) => {
  return(
    <div>
      <button onClick={func}>
        {text}
      </button>
    </div>
  )
}

const BestAnecdote = (props) =>{
  let max = -1;
  let maxIndex = -1;
  for(let i=0;i<props.anecdotes.length;i++){
    if(max < props.votes[i]){
      max = props.votes[i]
      maxIndex = i;
    }
  }
  console.log(max)
  return(
    <div>
      <h2>
      This is the most popular anecdote with {max} votes:
      </h2>
      {props.anecdotes[maxIndex]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const[votes,setVotes] = useState({0:0, 1:0., 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})

  const upvote = () =>{
    const copyVotes = {...votes}
    console.log("Hi")
    copyVotes[selected] += 1
    console.log(copyVotes)
    setVotes(copyVotes)
  }

  const storyChange = (max) => {
    const num = Math.floor(Math.random()*max)
    console.log(num)
    setSelected(num)
  }

  return (
    <div>
      {anecdotes[selected]}
      
      <Button func={() => storyChange(anecdotes.length)} text={"Butt"}/>
      {votes[selected]}
      <Button func={upvote} text={"upvote"}/>
      <BestAnecdote votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
