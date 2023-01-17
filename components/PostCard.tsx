import moment from "moment";
import Link from "next/link";
import Image from "next/legacy/image";

interface Props {
  post: {
    title: string;
    excerpt: string;
    featuredImage: { url: string };
    slug: string;
    createdAt: string;
    author: { name: string; photo: { url: string } };
  };
}

const PostCard = ({ post }: Props) => {
  return (
    <li className="bg-white shadow-lg rounded-lg p-2 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <Image
          src={post.featuredImage.url}
          alt={post.title}
          layout="fill"
          className="object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <h1
        className="transition duration-700 text-center mb-8 cursor-pointer hover:text-indigo-600 text-3xl font-semibold
        "
      >
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-cent justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
          <Image
            alt={post.author.name}
            height="30"
            width="30"
            className="align-middle rounded-full"
            src={post.author.photo.url}
          />
          <p className="inline align-middle text-grey-700 ml-2 text-lg">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          {/* Image or icon */}
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
        </div>
      </div>
      <p className="text-center text-lg text-grey-700 font-normal px-4 lg:px-20 mb-8">
        {post.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 transform hover:-translate-y-1 inline-block bg-indigo-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
            Continue Reading
          </span>
        </Link>
      </div>
    </li>
  );
};

export default PostCard;
