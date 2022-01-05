const ActionType = {
  IS_LOADING: `IS_LOADING`,
};

const ActionCreator = {
  setIsLoading: (isLoading) => ({
    type: ActionType.IS_LOADING,
    payload: isLoading,
  }),
};

export { ActionType, ActionCreator };
