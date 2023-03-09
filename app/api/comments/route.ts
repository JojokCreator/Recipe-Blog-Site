import { NextResponse, NextRequest } from 'next/server'
import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export async function POST(req: Request) {
  const body = await req.json()
  const graphQLClient = new GraphQLClient(graphqlAPI!, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  })

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `

  const result = await graphQLClient.request(query, {
    ...body,
  })
  console.log(result)

  return NextResponse.json({ result })
}
