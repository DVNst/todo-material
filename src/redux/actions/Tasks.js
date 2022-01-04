const ActionType = {
  ADD_TASK: `ADD_TASK`,
  REMOVE_TASK: `REMOVE_TASK`,
  REMOVE_ALL: `REMOVE_ALL`,
  TOOGLE_COMPLETED: `TOOGLE_COMPLETED`,
  TOOGLE_COMPLETED_ALL: `TOOGLE_COMPLETED_ALL`,
  SET_COMPLETED_ALL: `SET_COMPLETED_ALL`,
};

const ActionCreator = {
  addTask: (newTask) => ({
    type: ActionType.ADD_TASK,
    payload: newTask,
  }),

  removeTask: (id) => ({
    type: ActionType.REMOVE_TASK,
    payload: id,
  }),

  removeAll: () => ({
    type: ActionType.REMOVE_ALL,
  }),

  toogleCompleted: (id) => ({
    type: ActionType.TOOGLE_COMPLETED,
    payload: id,
  }),

  toogleCompletedAll: (completedAll) => ({
    type: ActionType.TOOGLE_COMPLETED_ALL,
    payload: completedAll,
  }),
};

export { ActionType, ActionCreator };
