export interface Ipost {
  title: string,
  body: string,
  id: number,
}

interface headers {
  'Content-Type': string,
}


export interface IpostWithHeaders {
  headers: headers,
  data: {
    title: string,
    body: string
  },
  id: number,
}

export interface PostComment {
  postId: number,
  body: string,
  id: number,
}

export interface PostWithComments extends Ipost {
  comments: Array<PostComment>,
}

export interface INewPost {
  title: string,
  body: string,
}
