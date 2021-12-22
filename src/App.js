import { useReducer } from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  if (action.type ==='ADD_TASK') {
    const id = state.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    return [...state, {...action.payload, id: id}];
  }
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, []);

  const addTask = (newTask) => {
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  return (
    <div className="App">
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
          {state.map((task) => <Item key={task.id} task={task}/>)}
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
