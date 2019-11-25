import { createStore, combineReducers } from 'redux';
import { reducer } from './reducer/task.reducer';
  
let store = createStore(combineReducers({
     reducer
    })
);

export default store;