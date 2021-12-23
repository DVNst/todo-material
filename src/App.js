import { useEffect, useReducer, useState } from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  if (action.type === 'ADD_TASK') {
    const id = state.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    return [...state, { ...action.payload, id: id }];
  }

  if (action.type === 'REMOVE_TASK') {
    return state.filter((task) => task.id !== action.payload);
  }

  if (action.type === 'TOOGLE_COMPLETED') {
    return state.map((task) => task.id === action.payload ? { ...task, copmlete: !task.copmlete } : task);
  }

  if (action.type === 'TOOGLE_COMPLETED_ALL') {
    return state.map((task) => ({ ...task, copmlete: !action.payload }));
  }

  if (action.type === 'REMOVE_ALL') {
    return [];
  }

  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, [{ text: 'test1', id: 1, copmlete: true }, { text: 'test2', id: 2, copmlete: false }, { text: 'test3', id: 3, copmlete: false }]);
  const [completedAll, setCompletedAll] = useState(state.every((task) => task.copmlete === true));

  useEffect(() => {
    //проверка completedAll, чтобы лишний раз не менять
    if (state.every((task) => task.copmlete === true) && !completedAll) {
      setCompletedAll(true);
    } else if (completedAll) {
      setCompletedAll(false);
    }
  }, [state]);

  const addTask = (newTask) => {
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const removeTask = (task) => {
    if (window.confirm(`Удалить задачу ${task.text}?`)) {
      dispatch({ type: 'REMOVE_TASK', payload: task.id });
    }
  };

  const toogleCompleted = (id) => {
    dispatch({ type: 'TOOGLE_COMPLETED', payload: id });
  };

  const onToogleCompletedAll = () => {
    dispatch({ type: 'TOOGLE_COMPLETED_ALL', payload: completedAll });
  };

  const onRemoveAll = () => {
    if (window.confirm(`Удалить все задачи?`)) {
      dispatch({ type: 'REMOVE_ALL' });
    }
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField addTask={addTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((task) =>
            <Item
              key={task.id}
              task={task}
              onRemoveTask={removeTask}
              onClickCheckbox={toogleCompleted}
            />)
          }
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={onToogleCompletedAll}>{completedAll ? 'Снять отметки' : 'Отметить всё'}</Button>
          <Button onClick={onRemoveAll}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
