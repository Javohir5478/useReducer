
import { useReducer } from 'react'
import './App.css'
import TaskApp from './context/Tasks';

function App() {
 
 

 const reducer = (state,action) => {

  switch(action.type){
    case "-" : return state - 1;
    case "+" : return state + 1;
    default:  return state;

  }

 }
  const [count , dispatch] = useReducer(reducer, 0);




  return (
    <>
      <div>
        <TaskApp/>
       
       <button onClick={()=> dispatch({type:"-"})}>-</button>
       <h1>{count}</h1>
       <button onClick={()=> dispatch({type:"+"})}>+</button>
        
      </div>
     
    </>
  )
}

export default App
