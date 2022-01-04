import { combineReducers } from 'redux';

import { reducer as TasksReducer } from './reducers/Tasks';
import { reducer as FilterTabReducer } from './reducers/FilterTab'; 
import { reducer as CompletedAllReducer } from './reducers/CompletedAll'; 

const reducer = combineReducers({
  tasks: TasksReducer,
  completedAll: CompletedAllReducer,
  filterBy: FilterTabReducer,
});

export default reducer;
