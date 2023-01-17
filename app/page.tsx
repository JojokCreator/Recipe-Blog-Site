import { PostCard, Categories, PostWidget, Footer } from "../components";
import { getPosts } from "../services";
import FeaturedPosts from "../sections/FeaturedPosts";
import { post } from "../types";

const Home = async () => {
  
  const posts: post[] = await getPosts();
  
  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <ul className="lg:col-span-8 col-span-1 list-none">
            {posts.map((posts: post, index: number) => (
            <PostCard post={posts.node} key={index} />
          ))}
        </ul>
        <div className="lg:col-span-4 cols-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget categories={[]} slug={""} />
            <Categories />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
