import { useEffect, useReducer, useState } from 'react';


const getLocalStorage = () => {
  let list = localStorage.getItem('salom');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('salom')));
  } else {
    return [];
  }
};


export default function TaskApp() {
    const [name,setName] = useState('');
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [list , setList] = useState(getLocalStorage());

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    }
    
    );
    setList([...list,tasks]);
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

   useEffect(() => {
    localStorage.setItem('salom', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <h1>Prague itinerary</h1>
       <form action="" >

        <input 
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
         />
         <button onSubmit={handleAddTask} >Add</button>
       </form>
       <div className='list'>
           {/* <h1>{name}</h1>
           <button onClick={handleDeleteTask}>delete</button>
           <button onClick={handleChangeTask}>edit</button> */}
           {list.map((items) => {
            return <div key={items.id}>
           
           <h1>{items.title}</h1>
            <button onClick={handleDeleteTask}>delete</button>
           <button onClick={handleChangeTask}>edit</button>


            </div>
           })}

       </div>


            {/* <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      /> */}
    </>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
