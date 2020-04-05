import * as React from 'react';
import { NextPage} from 'next';
import {Ipost} from "../../interfaces/post";
import Layout from "../../components/Layout";
import axios from 'axios';
import styled from "styled-components";

const StyledPost = styled.main`
  .post {
    width: 700px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid black;
    border-radius: 30px;
    
    &__heading {
      text-align: center;
      font-size: 20px;
    }
    
    &__body {
      margin-top: 20px;
      font-size: 15px;
    }
    
    &__comments {
      border: 1px solid blanchedalmond;
      margin-top: 30px;
    }
  }
`

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

  const { title, body, comments } = post;

  return (
    <Layout>
      <StyledPost>
        <article className={'post'}>
          <h1 className={'post__heading'}>{title} {post.id}</h1>
          <p className={'post__body'}>
            {body}
          </p>
          <section className={'post__comments'}>
            {
              comments.map(comment=><p>{comment.body}</p>)
            }
          </section>
          <input type="text"/>
        </article>
      </StyledPost>
    </Layout>
  )
}

Post.getInitialProps = async ({query})=>{

  const response = await axios.get(`https://simple-blog-api.crew.red/posts/${query.id}?_embed=comments`);

  return {
    post: response.data,
  }
}

export default Post
