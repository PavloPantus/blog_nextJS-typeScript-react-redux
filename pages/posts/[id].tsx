import * as React from 'react';
import { NextPage} from 'next';
import {Ipost} from "../../interfaces/post";
import axios from 'axios';

interface PostComment {
  postId: number,
  body: string,
  id: number,
}

interface PostWithComments extends Ipost {
  comments: Array<PostComment>,
}

interface PostProps{
  post: PostWithComments
}

const Post: NextPage< PostProps > = ({post}) => {


  return (
    <>
      <p>{post.title}</p>
      {
        post.comments.map(comment=><p>{comment.body}</p>)
      }
    </>
  )
}

Post.getInitialProps = async ({query})=>{

  const response = await axios.get(`https://simple-blog-api.crew.red/posts/${query.id}?_embed=comments`);

  return {
    post: response.data,
  }
}

export default Post
