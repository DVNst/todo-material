const ActionType = {
  SET_COMPLETED_ALL: `SET_COMPLETED_ALL`,
};

const ActionCreator = {
  setCompletedAll: (completedAll) => ({
    type: ActionType.SET_COMPLETED_ALL,
    payload: completedAll,
  }),
};

export { ActionType, ActionCreator };
