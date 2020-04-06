import * as React from 'react';
import {NextPage} from "next";
import Layout from "../../components/Layout";
/*import {postNewComment} from "../../store/newCommentReducer";*/
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {
  newPostBodySelector,
  newPostTitleSelector,
  postNewPost,
  setNewPostBody,
  setNewPostTitle
} from "../../store/newPostReducer";
import {MyThunkDispatch} from "../../interfaces";
import {useState} from "react";

const NewStyledPost = styled.div`
  padding-top: 30px;
  overflow: hidden;
  width: 100%;
  
  .new-post {
    width: 700px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid black;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    @keyframes postSent {
      30% {
        transform: translatey(-10%);
      }
      
      100% {
        transform: translateX(150%) scaleY(0.1);
        
      }
    }
    
    &_sent {
      animation: postSent 3s ease-out forwards;
    }
    
    &_not-sent {
      border: 3px solid red;
    }
    
    &__title {
      text-align: center;
      font-size: 20px;
    }
    
    &__title-textarea {
      margin-top: 10px;
      font-size: 20px;
      width: 100%;
      padding: 5px;
      resize: none;
    }
    
    &__body {
      margin-top: 20px;
      font-size: 15px;
    }
    
    &__body-textarea {
      height: 250px;
      margin-top: 10px;
      font-size: 15px;
      width: 100%;
      padding: 5px;
      resize: none;
    }
    
    &__create-post {
      padding: 5px;
      margin-top: 10px;
      cursor: pointer;
      align-self: flex-end;
    }
  }
  
  @keyframes resultOfSendingPost {
      0% {
        transform: translateX(-50%) translateY(-300px);
      }
      
      100% {
        transform: translateX(-50%) translateY(0);
      }
    }
  
  .result-of-sending-post {
      animation: resultOfSendingPost 3s forwards ease-out;
      word-break: break-word;
      border: 1px solid black;
      padding: 20px;
      width: 300px;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      background-color: #eaf1f4;
      z-index: 1;
    }
`

const NewPost: NextPage = () => {
  const [showResultOfSendingPost, setShowResultOfSendingPost] = useState<boolean>(false);
  const [resultOfSendingPost, setResultOfSendingPost] = useState<{sent: boolean, message: string}>({sent: false, message: ''});

  const dispatch: MyThunkDispatch = useDispatch();

  const newPostTitle = useSelector(newPostTitleSelector);

  const newPostBody = useSelector(newPostBodySelector);

  const postTitleHandler = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    dispatch(setNewPostTitle(target.value));
  }

  const postBodyHandler = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    dispatch(setNewPostBody(target.value));
  }

  const createPostHandler = () => {
    dispatch(postNewPost(newPostTitle, newPostBody))
      .then(result=>{
        if(result.id){
          setResultOfSendingPost({
            sent: true,
            message: `Post id ${result.id} was created`})

            setTimeout(()=>{
              setShowResultOfSendingPost(false);
              dispatch(setNewPostTitle(''));
              dispatch(setNewPostBody(''));
            }, 3000)
        }
        else{
          setResultOfSendingPost({
            sent: false,
            message: `something went wrong, the error message: ${result}, try again`
          })

          setTimeout(()=>{
            setShowResultOfSendingPost(false);
          }, 6000)
        }

        setShowResultOfSendingPost(true);


      })
  }

  return (
    <Layout title={'create new post'}>
      <NewStyledPost>
        {
          showResultOfSendingPost && (
            <div className={'result-of-sending-post'}>
              {resultOfSendingPost.message}
            </div>
          )
        }
        <div className={`new-post ${
          (showResultOfSendingPost)?
            resultOfSendingPost.sent? 
          'new-post_sent' : 'new-post_not-sent'
          : 
          ''  
        }`}
        >
          <span className={'new-post__title'}>Post title</span>
          <textarea
            value={newPostTitle}
            className={'new-post__title-textarea'}
            placeholder={'I am Title of a new post'}
            onChange={postTitleHandler}
          />

          <span className={'new-post__body'}>
            Post Body
          </span>
          <textarea
            value={newPostBody}
            className={'new-post__body-textarea'}
            placeholder={'I am Body of a new post'}
            onChange={postBodyHandler}
          />

          <button
            className={'new-post__create-post'}
            onClick={createPostHandler}
          >
            create post
          </button>
        </div>
      </NewStyledPost>
    </Layout>
  )
}

export default NewPost
