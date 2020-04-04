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

