import * as React from 'react';
import Link from 'next/link';
import { NextPage} from 'next';
import Layout from '../components/Layout';
//import axios from 'axios';
import {Ipost} from "../interfaces/post";
import {useSelector} from "react-redux";
import {postsSelector, loadPosts} from "../store/PostsReducer";

/*interface IndexPageProps {
  posts: Array<Ipost>,
}*/

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

IndexPage.getInitialProps = async (ctx: any) => {
  console.log(ctx)
  await ctx.store.dispatch(loadPosts());
  /*const response = await axios.get('https://simple-blog-api.crew.red/posts');

  console.log(ctx)

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


  return {
    props: {
      posts,
    }
  }*/

  return {
    props: {}
  }
}

export default IndexPage;
