import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios';
import {IRootState} from "./index";
import {INewPost} from "../interfaces/post";

const SET_NEW_POST_TITLE = 'SET_NEW_POST_TITLE';

type ISetNewPostTitle = {
  type: typeof SET_NEW_POST_TITLE,
  payload: string;
}

export const setNewPostTitle = (payload: string): ISetNewPostTitle =>({
  type: SET_NEW_POST_TITLE,
  payload
})

export const newPostTitleSelector = (state: IRootState): string => state.newPost.title;

//post body

const SET_NEW_POST_BODY = 'SET_NEW_POST_BODY';

type ISetNewPostBody = {
  type: typeof SET_NEW_POST_BODY,
  payload: string;
}

export const setNewPostBody = (payload: string): ISetNewPostBody =>({
  type: SET_NEW_POST_BODY,
  payload
})

export const newPostBodySelector = (state: IRootState): string => state.newPost.body;


export const postNewPost = (postTitle: string, postBody: string

): ThunkAction<Promise<any>, IRootState, unknown, Action<string>> => async (
  ) => {
  return await axios( {
    url: 'https://simple-blog-api.crew.red/posts',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: {
      "title": postTitle,
      "body": postBody
    }
  })
    .then(function (response) {

      return response.data;
    })
    .catch(function (error) {

      return error
    });
}

type newPostActions = ISetNewPostTitle | ISetNewPostBody;

export default function (initialState = {title: '', body: ''}, action: newPostActions): INewPost {
  switch (action.type) {

    case SET_NEW_POST_TITLE: return {...initialState, title: action.payload};

    case SET_NEW_POST_BODY: return {...initialState, body: action.payload};

    default: return initialState;
  }
}
