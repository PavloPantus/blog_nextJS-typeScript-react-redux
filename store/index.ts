import {combineReducers, createStore, applyMiddleware} from 'redux';
import {MakeStore} from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from './PostsReducer';
import newCommentReducer from "./newCommentReducer";
import newCommentFromServerReducer from "./newCommentFromServerReducer";

import {INewPost, Ipost, PostComment} from "../interfaces/post";
import newPostReducer from "./newPostReducer";

export interface IRootState {
  posts: Array<Ipost> | [],
  newCommentValue: string,
  newCommentFromServer: PostComment | null,
  newPost: INewPost,
}

export const reducers = combineReducers({
  posts: postsReducer,
  newCommentValue: newCommentReducer,
  newCommentFromServer: newCommentFromServerReducer,
  newPost: newPostReducer,
});

const makeStore: MakeStore = (initialState: any) => {
  return createStore(reducers, initialState ,composeWithDevTools(applyMiddleware( thunk )));
};

export default makeStore;
