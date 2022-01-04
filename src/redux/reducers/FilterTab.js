import {ActionType} from '../actions/actions';

const initialState = 'all';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER:
      return action.payload;

    default:
      return state;
  }
};

export { reducer, ActionType };
