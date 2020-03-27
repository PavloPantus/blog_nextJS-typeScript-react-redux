import {combineReducers, createStore, applyMiddleware} from 'redux';
import {MakeStore} from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from './PostsReducer';

import {Ipost} from "../interfaces/post";

export interface IRootState {
  posts: Array<Ipost> | [],
}

export const reducers = combineReducers({
  posts: postsReducer,
});

const makeStore: MakeStore = (initialState: any) => {
  return createStore(reducers, initialState ,composeWithDevTools(applyMiddleware( thunk )));
};

export default makeStore;
