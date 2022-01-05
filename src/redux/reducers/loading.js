import {ActionType} from '../actions';

const initialState = false;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.IS_LOADING:
      return action.payload;

    default:
      return state;
  }
};

export { reducer, ActionType };
