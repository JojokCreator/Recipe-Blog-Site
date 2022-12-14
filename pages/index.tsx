import type { NextPage } from "next";
import Head from "next/head";
import { PostCard, Categories, PostWidget, Footer } from "../components";
import { getPosts } from "../services";
import { GetStaticProps } from "next";
import FeaturedPosts from "../sections/FeaturedPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

export interface Posts {
  posts: {
    node: {
      title: string;
      excerpt: string;
      featuredImage: { url: string };
      slug: string;
      createdAt: string;
      author: { name: string; photo: { url: string } };
    };
  }[];
}

const Home: NextPage<Posts> = ({ posts }) => {
  const [data, setData] = useState(posts.slice(0, 4));
  const [hasMore, setHasMore] = useState(true)
  
  const getMorePosts = () => {
    setData(data => [...data, ...posts.slice(data.length,data.length+3)])
  }

  useEffect(() => {
    setHasMore(posts.length > data.length ? true : false)
  }, [data, posts.length])

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>Barefoot Recipes</title>
        <meta
          name="description"
          content="Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home"
        />
        <link rel="canonical" href="https://www.barefootrecipe.com/" />
        <meta name="keywords" content="Asian Food, Cooking, Blog, Brewing" />
        {/* twitter meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Barefoot Chef Recipes Site" />
        <meta
          name="twitter:description"
          content="Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home"
        />
        <meta
          name="twitter:image:src"
          content="https://www.barefootrecipe.com/blog.jpg"
        />
        {/* open graph tags */}
        <meta
          property="og:title"
          content="Barefoot Chef Recipes Site"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home"
          key="ogdesc"
        />
        <meta
          property="og:image"
          content="https://www.barefootrecipe.com/blog.jpg"
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="Barefoot Chef Recipes Site"
          key="Barefoot Recipes"
        />
        <meta
          property="og:url"
          content="https://barefootrecipe.com/"
          key="ogurl"
        />
        <meta property="og:type" content="article" key="ogtype" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          <InfiniteScroll
            dataLength={data.length} //This is important field to render the next data
            next={getMorePosts}
            hasMore={hasMore}
            loader={<h4 className="text-white">Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b className="text-white">Yay! You have seen it all</b>
              </p>
            }
          >
            {data.map((data, index) => (
            <PostCard post={data.node} key={index} />
          ))}
          </InfiniteScroll>
          
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
