import {ActionType} from '../actions/actions';

const initialState = [
  { text: "test1", id: 1, complete: true },
  { text: "test2", id: 2, complete: false },
  { text: "test3", id: 3, complete: false },
  ];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TASK:
      const id = state.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
      return [...state, { ...action.payload, id: id }];

    case ActionType.REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);

    case ActionType.REMOVE_ALL:
      return [];

    case ActionType.TOOGLE_COMPLETED:
      return state.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              complete: !task.complete,
            }
          : task
        );

    case ActionType.TOOGLE_COMPLETED_ALL:
      return state.map((task) => ({
        ...task,
        complete: action.payload,
      }));

    default:
      return state;
  }
};

export { reducer, ActionType };
