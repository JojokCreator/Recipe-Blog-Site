import React from 'react';
import { useRouter } from 'next/router';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentForm, Loader } from '../../components';
import { getPosts, getPostsDetails } from '../../services';
import { NextPage, GetStaticProps } from 'next';
import AdjacentPosts from '../../sections/AdjacentPosts';

type SlugProps = {
  post: {
    title: string
    exerpt: string
    featuredImage: {url: string}
    slug: string
    createdAt: string
    author: {name: string; photo: {url: string}; bio: string}
    categories: {name: string; slug:string}[]
    content: {raw: {children: {type: string, children: any}[]} }
    }
}

type Params = {
	params: {
		slug: string
	}
}

const PostDetails = ( { post }: SlugProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post}/>
            <Author author={post.author} /> 
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} /> 
            <CommentForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

export const getStaticProps = async ({ params }: Params) => {
  const data = await getPostsDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts: [] = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}