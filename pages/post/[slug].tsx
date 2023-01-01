import React from "react";
import { useRouter } from "next/router";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentForm,
  Loader,
} from "../../components";
import { getPosts, getPostsDetails } from "../../services";
import AdjacentPosts from "../../sections/AdjacentPosts";
import Head from "next/head";
import StructuredData from "../../components/StructuredData";

type SlugProps = {
  post: {
    title: string;
    exerpt: string;
    featuredImage: { url: string };
    slug: string;
    createdAt: string;
    author: { name: string; photo: { url: string }; bio: string };
    categories: { name: string; slug: string }[];
    content: { raw: { children: { type: string; children: any }[] } };
  };
};

type Params = {
  params: {
    slug: string;
  };
};

const PostDetails = ({ post }: SlugProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.exerpt,
    author: [
      {
        '@type': 'Person',
        name: post.author.name,
      },
    ],
    image: post.featuredImage.url,
    datePublished: post.createdAt,
  };

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <Head>
          <meta charSet="utf-8" />
          <title>{post.title}</title>
          <link rel="canonical" href={"https://www.barefootrecipe.com/post/"+ post.slug}   />
          <meta name="description" content={post.exerpt} />

          <meta name="theme-color" content="#000000" />
          {/* open graph tags */}
          <meta name="og:type" content="article" />
          <meta name="og:title" content={post.title} />

          <meta name="og:url" content={router.pathname} />
          <meta name="og:description" content={post.exerpt} />
          <meta name="og:image" content={post.featuredImage.url} />
          {/* twitter tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={post.title} />
          <meta
            name="twitter:description"
            content={post.exerpt}
          />
          <meta name="twitter:image" content={post.featuredImage.url} />

          <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

        </Head>
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
};

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts: [] = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
