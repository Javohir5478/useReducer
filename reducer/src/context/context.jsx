/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */



import { useReducer } from "react";
import { createContext, useContext } from "react";




const AppContext =createContext();

const AppProvider =( {children}) =>{

  function handleSubmit(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function editItem(task) {
  dispatch({
    type: 'changed',
    task: task,
  });
}

function removeItem(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId,
  });
}
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [
      ...tasks,
      {
        id: action.id,
        text: action.text,
        done: false,
      },
    ];
  } else if (action.type === 'changed') {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error('Unknown action: ' + action.type);
  }
}
    const [tasks, dispatch] = useReducer(tasksReducer,initialTasks);



    let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];




return(

    
        <AppContext.Provider  value={{
           handleSubmit,
           editItem,
           removeItem,
          

        }} >
        
            {children}
        </AppContext.Provider>)
}



export const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext,AppProvider};