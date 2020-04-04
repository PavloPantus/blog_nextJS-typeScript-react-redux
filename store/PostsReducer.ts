import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios';
import {Ipost, IpostWithHeaders} from "../interfaces/post";
import {IRootState} from "./index";

const SET_POSTS = 'SET_POSTS';

 type ISetPosts = {
  type: typeof SET_POSTS,
  payload: Array<Ipost>;
}

const setPosts = (payload: Array<Ipost>): ISetPosts =>({
  type: SET_POSTS,
  payload
})

export const postsSelector = (state: IRootState): [] | Array<Ipost> => state.posts;

export const loadPosts = (

): ThunkAction<void, IRootState, unknown, Action<string>> => async (
  dispatch) => {
  const response = await axios.get('https://simple-blog-api.crew.red/posts');

  const posts: Array< Ipost > = response.data.map((post: Ipost | IpostWithHeaders) => {

      if ((post as IpostWithHeaders).headers) {
        return {
          id: post.id,
          ...(post as IpostWithHeaders).data,
        }
      }

      return post
    }
  )

  dispatch(setPosts(posts));

}

type PostActions = ISetPosts

export default function (initialState = [], action: PostActions): [] | Array<Ipost> {
  switch (action.type) {

    case SET_POSTS: return action.payload;

    default: return initialState;
  }
}
