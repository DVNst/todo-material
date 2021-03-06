// import { useEffect, useReducer } from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Paper, Divider, Button, List } from "@mui/material";

import { AddField } from "./components/AddField";
import { Item } from "./components/Item";
import { FilterTab } from "./components/FilterTab";
import { Spinner } from "./components/spinner/spinner";

import { ActionCreator } from "./redux/actions";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ActionCreator.setIsLoading(true));
    dispatch(ActionCreator.getTasks());
  }, []);

  useEffect(() => {
    //проверка completedAll
    if (
      state.tasks.every((task) => task.complete === true) &&
      !state.completedAll
    ) {
      dispatch(ActionCreator.setCompletedAll(true));
    } else if (
      state.tasks.some((task) => task.complete === false) &&
      state.completedAll
    ) {
      dispatch(ActionCreator.setCompletedAll(false));
    }
  }, [state.tasks, dispatch]);

  const onAddTask = (newTask) => {
    dispatch(ActionCreator.addTask(newTask));
  };

  const onRemoveTask = (task) => {
    if (window.confirm(`Удалить задачу ${task.text}?`)) {
      dispatch(ActionCreator.removeTask(task.id));
    }
  };

  const onRemoveAll = () => {
    if (window.confirm(`Удалить все задачи?`)) {
      dispatch(ActionCreator.removeAll(state.tasks));
    }
  };

  const onToogleCompleted = (task) => {
    dispatch(ActionCreator.toogleCompleted(task));
  };

  const onToogleCompletedAll = () => {
    dispatch(ActionCreator.toogleCompletedAll(state.tasks, !state.completedAll));
  };

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField addTask={onAddTask} />
        <Divider />
        <FilterTab />
        <Divider />
        <List>
          {state.isLoading && <Spinner />}
          {!state.isLoading && !state.tasks.length && <p>нет задач</p>}
          {state.tasks
            .filter((task) => {
              if (state.filterBy === "completed") {
                return task.complete;
              } else if (state.filterBy === "active") {
                return !task.complete;
              } else {
                return true;
              }
            })
            .map((task) => (
              <Item
                key={task.id}
                task={task}
                onRemoveTask={onRemoveTask}
                onClickCheckbox={onToogleCompleted}
              />
            ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={onToogleCompletedAll} disabled={!state.tasks.length}>
            {state.completedAll ? "Снять отметки" : "Отметить всё"}
          </Button>
          <Button onClick={onRemoveAll} disabled={!state.tasks.length}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
