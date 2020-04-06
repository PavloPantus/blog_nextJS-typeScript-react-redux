import * as React from 'react';
import Link from 'next/link';
import { NextPage} from 'next';
import Layout from '../components/Layout';
import {Ipost} from "../interfaces/post";
import {useSelector} from "react-redux";
import {postsSelector, loadPosts} from "../store/PostsReducer";
import styled from 'styled-components';
import {PostCard} from "../components/PostCard/PostCard";

const StyledIndexPage = styled.main`
  .index-page {
  
    &__main-heading {
      margin-top: 20px;
      text-align: center;
      font-size: 20px;
    };
  };
  
  .posts-container {
    margin-top: 20px;
    justify-content: center;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(3, 300px);
  };
`

const IndexPage: NextPage = () => {

  let posts: Array<Ipost> = useSelector(postsSelector);

  return (
    <Layout title="all posts">
      <StyledIndexPage className={'index-page'}>
        <h1 className={'index-page__main-heading'}>All posts</h1>
        <div className="posts-container">
          {posts.map(
            (post)=>(
              <Link key={post.id} href={`/posts/${post.id}`}>
                <a>
                  <PostCard {...post} />
                </a>
              </Link>
            )
          )}
        </div>
      </StyledIndexPage>
    </Layout>
  )
}

IndexPage.getInitialProps = async ({store}) => {

  await store.dispatch<any>(loadPosts());

}

export default IndexPage;
