export interface Source {
  id: string | null
  name: string
}

export interface News {
  source: Source
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
}