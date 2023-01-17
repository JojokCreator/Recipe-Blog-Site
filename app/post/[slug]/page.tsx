import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentForm,
  Loader,
} from '../../../components'
import { getPosts, getPostsDetails } from '../../../services'
import AdjacentPosts from '../../../sections/AdjacentPosts'
import { Params, post } from '../../../types'

const PostDetails = async ({ params }: Params) => {
  const post: post['node'] = await getPostsDetails(params.slug)

  if (!post) {
    return <Loader />
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
            <CommentForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PostDetails

export const dynamicParams = true

export async function generateStaticParams() {
  const posts: post[] = await getPosts()
  return posts.map(({ node: { slug } }) => ({ slug }))
}
