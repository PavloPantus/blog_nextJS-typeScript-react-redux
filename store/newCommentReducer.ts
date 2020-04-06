import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios';
/*import {PostComment} from "../interfaces/post";*/
import {IRootState} from "./index";
import {setNewCommentFromServer} from "./newCommentFromServerReducer";

const SET_NEW_COMMENT_VALUE = 'SET_NEW_COMMENT_VALUE';

type ISetNewCommentValue = {
  type: typeof SET_NEW_COMMENT_VALUE,
  payload: string;
}

export const setNewCommentValue = (payload: string): ISetNewCommentValue =>({
  type: SET_NEW_COMMENT_VALUE,
  payload
})

export const newCommentValueSelector = (state: IRootState): string => state.newCommentValue;

export const postNewComment = (newCommentValue: string, postId: number

): ThunkAction<Promise<any>, IRootState, unknown, Action<string>> => async (
  dispatch) => {
  return await axios( {
    url: 'https://simple-blog-api.crew.red/comments',
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    data: {
      "postId": postId,
      "body": newCommentValue
    }
  })
    .then(function (response) {
      console.log(response, 'response here');
      dispatch(setNewCommentFromServer(response.data))
      dispatch(setNewCommentValue(''))
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}

type newCommentActions = ISetNewCommentValue;

export default function (initialState = '', action: newCommentActions): string {
  switch (action.type) {

    case SET_NEW_COMMENT_VALUE: return action.payload;

    default: return initialState;
  }
}
