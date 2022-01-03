import { createStore } from 'redux';


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

const store = createStore(
  reducer,
  {
    filterBy: 'all',
    completedAll: false,
    tasks: [{ text: 'test1', id: 1, complete: true }, { text: 'test2', id: 2, complete: false }, { text: 'test3', id: 3, complete: false }],
  }
);

export default store;