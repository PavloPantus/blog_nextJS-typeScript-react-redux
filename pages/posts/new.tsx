import * as React from 'react';
import {NextPage} from "next";
import Layout from "../../components/Layout";

const NewPost: NextPage = (props) => {
  console.log(props, 'props')

  return (
    <Layout>
      asdf
    </Layout>
  )
}

NewPost.getInitialProps = (data) => {
  console.log(data)
  return {}
}

export default NewPost
