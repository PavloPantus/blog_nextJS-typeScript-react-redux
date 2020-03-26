import axios from 'axios';
import {Ipost, IpostWithHeaders} from "../interfaces/post";

const SET_POSTS = 'SET_POSTS';

const setPosts = (payload: Array<Ipost>)=>({
  type: SET_POSTS,
  payload
})

export const postsSelector = (state: any)=>state.posts;

export const loadPosts =  ()=> async (dispatch: any)=>{
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

  return 'dispatched'
}

export default function (initialState = [], action: any) {
  switch (action.type) {

    case SET_POSTS: return action.payload;

    default: return initialState;
  }
}
