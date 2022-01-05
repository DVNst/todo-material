import { combineReducers } from 'redux';

import { reducer as TasksReducer } from './reducers/Tasks';
import { reducer as FilterTabReducer } from './reducers/FilterTab'; 
import { reducer as CompletedAllReducer } from './reducers/CompletedAll'; 
import { reducer as LoadingReducer } from './reducers/loading'; 

const reducer = combineReducers({
  tasks: TasksReducer,
  completedAll: CompletedAllReducer,
  filterBy: FilterTabReducer,
  isLoading: LoadingReducer,
});

export default reducer;
