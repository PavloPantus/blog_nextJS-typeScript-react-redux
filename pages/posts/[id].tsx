import * as React from 'react';
import { NextPage, GetServerSideProps} from 'next';
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

/*export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('https://simple-blog-api.crew.red/posts');

  const paths = response.data.map((post: Ipost) =>`/posts/${post.id}`);

  return {paths, fallback: false}
}*/

export const getServerSideProps: GetServerSideProps = async ({params})=>{

  const response = await axios.get(`https://simple-blog-api.crew.red/posts/${params!.id}?_embed=comments`);

  return {
    props: {
      post: response.data,
    }
  }
}

export default Post
