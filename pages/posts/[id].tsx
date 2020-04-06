import * as React from 'react';
import { NextPage} from 'next';
import {PostWithComments} from "../../interfaces/post";
import Layout from "../../components/Layout";
import axios from 'axios';
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {newCommentValueSelector, setNewCommentValue, postNewComment} from "../../store/newCommentReducer";
import {newCommentFromServerSelector, setNewCommentFromServer} from "../../store/newCommentFromServerReducer";
import {useEffect, useState} from "react";

import {PostComment} from "../../interfaces/post";

const StyledPost = styled.main`
  padding-top: 30px;
  
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
      margin-top: 30px;
    }
  }
  
  .comments {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
   
    &__heading {
      font-size: 17px;
    }
    
    &__comment-body {
      width: 100%;
      margin-top: 15px;
      padding: 10px;
      border: 1px solid black;
    }
    
    &__add-comment {
      margin-top: 20px;
    }
  }
  
  .add-comment {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    
    &__new-comment-textarea {
      width: 100%;
      height: 100px;
      resize: none;
      padding: 5px;
    }
   
    &__add-comment-button {
      cursor: pointer;
      margin-top: 15px;
    }
  }
`



interface PostProps{
  post: PostWithComments
}

const Post: NextPage< PostProps > = ({post}) => {

  const dispatch = useDispatch();

  const newCommentValue = useSelector(newCommentValueSelector);

  const newCommentFromServer = useSelector(newCommentFromServerSelector)

  const { title, body, comments, id } = post;

  const [updatetedComments, setUpdatetedComments] = useState<Array<PostComment>>(comments);

  useEffect(()=>{
    if(!!newCommentFromServer){
      setUpdatetedComments((comments)=>{
        return [...comments, newCommentFromServer]
      });
      dispatch(setNewCommentFromServer(null));
    }
  },[newCommentFromServer])

  const newCommentHandler = (event: React.SyntheticEvent):void => {
    let target = event.target as HTMLInputElement;
    dispatch(setNewCommentValue(target.value))
  }

  return (
    <Layout>
      <StyledPost>
        <article className={'post'}>
          <h1 className={'post__heading'}>{title} {post.id}</h1>
          <p className={'post__body'}>
            {body}
          </p>
          <section className={'post__comments comments'}>
            <span className={'comments__heading'}>comments</span>
            {
              updatetedComments.map(comment=><p key={comment.id} className={'comments__comment-body'}>{comment.body}</p>)
            }
            <div className="comments__add-comment add-comment">

              <textarea
                value={newCommentValue}
                onChange={newCommentHandler}
                className={'add-comment__new-comment-textarea'}
              />

              <button
                onClick={()=>{dispatch(postNewComment(newCommentValue,id))}}
                className={'add-comment__add-comment-button'}
              >
                Add new comment
              </button>
            </div>
          </section>
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
