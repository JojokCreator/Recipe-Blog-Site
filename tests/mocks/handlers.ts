import { graphql, rest } from "msw";
import mocks from './mock.json'
const endpoint: any = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const handlers = [
  graphql.query("getPosts", (req: any, res: any, ctx: any) => {
    console.log(mocks)
    return res(
      ctx.data(
        mocks)
    );
  }),
  graphql.query("GetCategories", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),
  graphql.query("getRecentPosts", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data(
        mocks)
    );
  }),
  graphql.query("getSimilarPosts", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),
  graphql.query("getFeaturedPosts", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),
  graphql.query("getAdjacentPosts", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),
  graphql.query("getCategoryPost", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),
  graphql.query("getPostsDetails", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),
  graphql.query("getBlogs", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),
  graphql.query("getBlogsDetails", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),
  graphql.query("getComments", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),
  graphql.mutation("CreateComment", (req: any, res: any, ctx: any) => {
    return res(
      ctx.data({
        categories: []
      ,
      })
    );
  }),

];