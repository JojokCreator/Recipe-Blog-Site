import { request, gql } from 'graphql-request'

const graphqlAPI: any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
    query getPosts {
      postsConnection(first: 20, orderBy: createdAt_DESC) {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result: any = await request(graphqlAPI, query)
  return result.postsConnection.edges
}

export const getRecentPosts = async () => {
  const query = gql`
    query getRecentPosts {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result: any = await request(graphqlAPI, query)

  return result.posts
}

export const getSimilarPosts = async (categories: string[], slug: string) => {
  const query = gql`
    query getSimilarPosts($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result: any = await request(graphqlAPI, query, { categories, slug })

  return result.posts
}

export const getPostsDetails = async (slug: string | undefined) => {
  const query = gql`
    query getPostsDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `

  const result: any = await request(graphqlAPI, query, { slug })
  return result.post
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const result: any = await request(graphqlAPI, query)

  return result.categories
}

export const submitComment = async (obj: any) => {
  const result: any = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return await result.json()
}

export const getComments = async (slug: string) => {
  const query = gql`
    query getComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `
  const result: any = await request(graphqlAPI, query, { slug })

  return result.comments
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query getFeaturedPosts {
      posts(where: { featuredPost: true }) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `
  const result: any = await request(graphqlAPI, query)

  return result.posts
}

export const getAdjacentPosts = async (createdAt: string, slug: string) => {
  const query = gql`
    query getAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result: any = await request(graphqlAPI, query, { slug, createdAt })

  return { next: result.next[0], previous: result.previous[0] }
}

export const getCategoryPost = async (slug: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(first: 20, where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result: any = await request(graphqlAPI, query, { slug })

  return result.postsConnection.edges
}

export const getBlogs = async () => {
  const query = gql`
    query getBlogs {
      blogsConnection(first: 20, orderBy: createdAt_DESC) {
        edges {
          node {
            createdAt
            slug
            title
            excerpt
          }
        }
      }
    }
  `

  const result: any = await request(graphqlAPI, query)

  return result.blogsConnection.edges
}

export const getBlogsDetails = async (slug: string | undefined) => {
  const query = gql`
    query getBlogsDetails($slug: String!) {
      blog(where: { slug: $slug }) {
        title
        excerpt
        createdAt
        slug
        content {
          raw
        }
      }
    }
  `

  const result: any = await request(graphqlAPI, query, { slug })

  return result.blog
}
