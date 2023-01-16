import { PostCard, Categories, PostWidget, Footer } from "../components";
import { getPosts } from "../services";
import FeaturedPosts from "../sections/FeaturedPosts";

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

const Home = async () => {
  
  const posts = await getPosts();
  console.log(posts)
  
  return (
    <div className="container mx-auto px-10 mb-8">
      
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
            {posts.map((posts, index) => (
            <PostCard post={posts.node} key={index} />
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
