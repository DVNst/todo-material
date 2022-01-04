const ActionType = {
  SET_FILTER: `SET_FILTER`,
};

const ActionCreator = {
  setFilter: (filter) => ({
    type: ActionType.SET_FILTER,
    payload: filter,
  }),
};

export { ActionType, ActionCreator };
