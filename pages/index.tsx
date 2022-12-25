import type { NextPage } from "next";
import Head from "next/head";
import { PostCard, Categories, PostWidget, Footer } from "../components";
import { getPosts } from "../services";
import { GetStaticProps } from "next";
import FeaturedPosts from "../sections/FeaturedPosts";

export interface Posts {
  posts: {
    node: {
      title: string;
      exerpt: string;
      featuredImage: { url: string };
      slug: string;
      createdAt: string;
      author: { name: string; photo: { url: string } };
    };
  }[];
}

const Home: NextPage<Posts> = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Barefoot Recipes</title>
        <meta
          name="description"
          content="Barefoot Chef Recipes and Homebrew from Asia and beyond"
        />
        <link rel="canonical" href="https://www.barefootrecipe.com/" />
        <meta name="keywords" content="Asian Food, Cooking, Blog, Brewing" />
        {/* twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Barefoot Recipes" />
        <meta
          name="twitter:description"
          content="Barefoot Chef Recipes and Homebrew from Asia and beyond"
        />
        <meta name="twitter:image" content="/blog.jpg" />
        {/* open graph tags */}
        <meta property="og:title" content="Barefoot Recipes" key="ogtitle" />
        <meta property="og:description" content="Asian Food, Cooking, Blog, Brewing" key="ogdesc" />
        <meta property="og:image" content="/favicon.ico" key="ogimage" />
        <meta
          property="og:site_name"
          content="Barefoot Recipes"
          key="Barefoot Recipes"
        />
        <meta property="og:url" content="https://barefootrecipe.com/" key="ogurl" />
        <meta property="og:type" content="article" key="ogtype" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>
        <div className="lg:col-span-4 cols-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget categories={[]} slug={""} />
            <Categories />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
};
