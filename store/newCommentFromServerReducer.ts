import {PostComment} from "../interfaces/post";
import {IRootState} from "./index";

const SET_NEW_COMMENT_FROM_SERVER = 'SET_NEW_COMMENT_FROM_SERVER';

type ISetNewCommentFromServer = {
  type: typeof SET_NEW_COMMENT_FROM_SERVER,
  payload: PostComment | null;
}

export const setNewCommentFromServer = (payload: PostComment | null) =>({
  type: SET_NEW_COMMENT_FROM_SERVER,
  payload
})

export const newCommentFromServerSelector = (state: IRootState): PostComment | null => state.newCommentFromServer;

type newCommentFromServerActions = ISetNewCommentFromServer;

export default function (initialState = null, action: newCommentFromServerActions): PostComment | null {
  switch (action.type) {

    case SET_NEW_COMMENT_FROM_SERVER: return action.payload;

    default: return initialState;
  }
}
