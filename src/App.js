// import { useEffect, useReducer } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Paper, Divider, Button, List } from '@mui/material';

import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { FilterTab } from './components/FilterTab';

function App() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    //проверка completedAll, чтобы лишний раз не менять
    if (state.tasks.every((task) => task.complete === true) && !state.completedAll) {
      dispatch({ type: 'SET_COMPLETED_ALL', payload: true});
    } else if (state.tasks.some((task) => task.complete === false) && state.completedAll) {
      dispatch({ type: 'SET_COMPLETED_ALL', payload: false});
    }
  }, [state, dispatch]);

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
    dispatch({ type: 'TOOGLE_COMPLETED_ALL', payload: !state.completedAll });
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
        <FilterTab />
        <Divider />
        <List>
          {state.tasks
            .filter((task) => {
              if (state.filterBy === 'completed') {
                return task.complete;
              } else if (state.filterBy === 'active') {
                return !task.complete;
              } else {
                return true;
              }
            })
            .map((task) =>
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
          <Button onClick={onToogleCompletedAll} disabled={!state.tasks.length}>{state.completedAll ? 'Снять отметки' : 'Отметить всё'}</Button>
          <Button onClick={onRemoveAll} disabled={!state.tasks.length}>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
