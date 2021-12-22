import { useReducer } from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  if (action.type ==='ADD_TASK') {
    const id = state.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    return [...state, {...action.payload, id: id}];
  }
  if (action.type ==='DELETE_TASK') {
    return [...state.filter((task) => task.id !== action.payload)];
  }
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, [{id:0, text:'test0', copmlete: false}, {id:1, text:'test1', copmlete: true}, {id:2, text:'test2', copmlete: false}]);

  const addTask = (newTask) => {
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const deleteTask = (idTask) => {
    dispatch({ type: 'DELETE_TASK', payload: idTask });
  };

  return (
    <div className="App">
      {console.log(state)}
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField addTask={addTask}/>
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((task) => <Item key={task.id} task={task} deleteTask={deleteTask}/>)}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
