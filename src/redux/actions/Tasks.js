import axios from "axios";

const URL = "https://61b60621c95dd70017d40df3.mockapi.io/tasks";

const ActionType = {
  GET_TASKS: `GET_TASKS`,
  ADD_TASK: `ADD_TASK`,
  REMOVE_TASK: `REMOVE_TASK`,
  REMOVE_ALL: `REMOVE_ALL`,
  TOOGLE_COMPLETED: `TOOGLE_COMPLETED`,
  TOOGLE_COMPLETED_ALL: `TOOGLE_COMPLETED_ALL`,
  SET_COMPLETED_ALL: `SET_COMPLETED_ALL`,
};

const ActionCreator = {
  getTasks: () => (dispatch) => {
    axios
      .get(URL)
      .then((res) => {
        // console.log('Request getTasks processed successfully', res.data);
        dispatch({
          type: ActionType.GET_TASKS,
          payload: res.data,
        });
      })
      .then(() => {
        dispatch({
          type: `IS_LOADING`,
          payload: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  addTask: (newTask) => (dispatch) => {
    axios
      .post(URL, newTask)
      .then((res) => {
        // console.log('Request addTask processed successfully', res.data);
        dispatch({
          type: ActionType.ADD_TASK,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
        // dispatch({
        //   type: ActionType.ADD_TASK,
        //   payload: newTask,
        // });
      });
  },

  removeTask: (id) => (dispatch) => {
    axios
      .delete(URL + `/${id}`)
      .then((res) => {
        // console.log('Request removeTask processed successfully', res.data);
        dispatch({
          type: ActionType.REMOVE_TASK,
          payload: id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  removeAll: (tasks) => async (dispatch) => {
    tasks.forEach(({ id }) =>
      axios
        .delete(URL + `/${id}`)
        .then((res) => {
          dispatch({
            type: ActionType.REMOVE_TASK,
            // type: ActionType.REMOVE_TASK_ALL,
            payload: id,
          });
        })
        .catch((error) => {
          console.log(error);
        })
    );
  },

  toogleCompleted: (task) => async (dispatch) => {
    await axios
      .put(URL + `/${task.id}`, { ...task, complete: !task.complete })
      .then((res) => {
        // console.log("Request toogleCompleted processed successfully", res.data);
        dispatch({
          type: ActionType.TOOGLE_COMPLETED,
          payload: task.id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  toogleCompletedAll: (tasks, completedAll) => async (dispatch) => {
    tasks.forEach((task) => {
      if (task.complete !== completedAll) {
        // promises.push()
        axios
          .put(URL + `/${task.id}`, { ...task, complete: completedAll })
          .then((res) => {
            console.log(
              "Request toogleCompleted processed successfully",
              res.data
            );
            dispatch({
              type: ActionType.TOOGLE_COMPLETED,
              // type: ActionType.TOOGLE_COMPLETED_ALL,
              // payload: completedAll,
              payload: task.id,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    // Promise.all(promises).then(async (r) => {
    //   console.log(r);
    // });
  },
};

export { ActionType, ActionCreator };
