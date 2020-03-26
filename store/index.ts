import {combineReducers, createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from './PostsReducer';

export const reducers = combineReducers({
  posts: postsReducer,
});

const makeStore = (initialState: any) => {
  return createStore(reducers, initialState ,composeWithDevTools(applyMiddleware(thunk)));
};

export default makeStore;
