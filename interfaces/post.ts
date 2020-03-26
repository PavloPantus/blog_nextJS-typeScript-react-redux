export interface Ipost {
  title: string,
  body: string,
  id: number,
}

interface headers {
  'Content-Type': string,
}

interface data {
  title: string,
  body: string
}

export interface IpostWithHeaders {
  headers: headers,
  data: data,
  id: number,
}

