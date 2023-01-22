export type post = {
  node: {
    title: string
    excerpt: string
    featuredImage: { url: string }
    slug: string
    createdAt: string
    author: { name: string; photo: { url: string }; bio: string }
    categories: { name: string; slug: string }[]
    content: {
      raw: {
        children: {
          url: any; type: string; children: any
        }[]
      }
    }
  }
}

export type category = {
  name: string
  slug: string
}

export type Params = {
  params: {
    slug: string
  }
}
export type Slug = {
  slug: string
}

export type blog = {
  node: {
    title: string
    excerpt: string
    slug: string
    createdAt: string
    content: { raw: { children: { type: string; children: any; url: string }[] } }
  }
}

export type json = {
  imageURl: string
  title: string
  content: string
  tags: string
  twitterId: string
}