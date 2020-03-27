import * as React from 'react';
import Link from 'next/link';
import { NextPage} from 'next';
import Layout from '../components/Layout';
import {Ipost} from "../interfaces/post";
import {useSelector} from "react-redux";
import {postsSelector, loadPosts} from "../store/PostsReducer";

const IndexPage: NextPage = () => {

  let posts: Array<Ipost> = useSelector(postsSelector);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      {posts.map(
        (post)=>(
          <>
            <p>{post.title}</p>
            body{post.id}
            <Link href={`/posts/${post.id}`}>
              <a>{post.body}</a>
            </Link>
          </>
        )
      )}
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

IndexPage.getInitialProps = async ({store}) => {

  await store.dispatch<any>(loadPosts());

}

export default IndexPage;
