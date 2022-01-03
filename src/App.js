import { useEffect, useReducer } from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

const reducer = (state, action) => {
  if (action.type === 'ADD_TASK') {
    const id = state.tasks.reduce((max, item) => item.id > max ? item.id : max, 0) + 1;
    return {
      ...state,
      tasks: [...state.tasks, { ...action.payload, id: id }]
    };
  }

  if (action.type === 'REMOVE_TASK') {
    return {
      ...state,
      tasks: state.tasks.filter((task) => task.id !== action.payload)
    };
  }

  if (action.type === 'TOOGLE_COMPLETED') {
    return {
      ...state,
      tasks: state.tasks.map((task) => (
        task.id === action.payload 
          ? {
              ...task,
              complete: !task.complete
            } 
          : task
      ))
    };
  }

  if (action.type === 'TOOGLE_COMPLETED_ALL') {
    return {
      ...state,
      tasks: state.tasks.map((task) => (
        {
          ...task,
          complete: action.payload
        }
      ))
    };
  }

  if (action.type === 'REMOVE_ALL') {
    return {
      ...state,
      tasks: []
    };
  }

  if (action.type === 'SET_FILTER') {
    return {
      ...state,
      filterBy: action.payload
    };
  }

  if (action.type === 'SET_COMPLETED_ALL') {
    return {
      ...state,
      completedAll: action.payload
    };
  }

  return state;
}

const FILTER_INDEX = ['all', 'active', 'completed'];

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    {
      filterBy: 'all',
      completedAll: false,
      tasks: [{ text: 'test1', id: 1, complete: true }, { text: 'test2', id: 2, complete: false }, { text: 'test3', id: 3, complete: false }],
    }
  );

  useEffect(() => {
    //проверка completedAll, чтобы лишний раз не менять
    if (state.tasks.every((task) => task.complete === true) && !state.completedAll) {
      dispatch({ type: 'SET_COMPLETED_ALL', payload: true});
    } else if (state.tasks.some((task) => task.complete === false) && state.completedAll) {
      dispatch({ type: 'SET_COMPLETED_ALL', payload: false});
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
    dispatch({ type: 'TOOGLE_COMPLETED_ALL', payload: !state.completedAll });
  };

  const onRemoveAll = () => {
    if (window.confirm(`Удалить все задачи?`)) {
      dispatch({ type: 'REMOVE_ALL' });
    }
  }

  const setFilter = (e, index) => {
    dispatch({ type: 'SET_FILTER', payload: FILTER_INDEX[index] });
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField addTask={addTask} />
        <Divider />
        <Tabs onChange={setFilter} value={FILTER_INDEX.indexOf(state.filterBy)}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
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
