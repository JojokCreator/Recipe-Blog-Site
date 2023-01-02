import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

type AdjacentPostCardProps = {
    post: {
      title: string
      excerpt: string
      featuredImage: {url: string}
      slug: string
      createdAt: string
      author: {name: string; photo: {url: string}; bio: string}
      categories: {name: string; slug:string}[]
      content: {raw: {children: {type: string, children: any}[]} }
      }
      position:any
  }

const AdjacentPostCard = ({ post, position }: AdjacentPostCardProps) => (
  <>
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-72"> 
    <Image 
    src={post.featuredImage.url} 
    layout="fill"
    objectFit='cover'
    />
    </div>
    {/* style={{ backgroundImage: `url('${post.featuredImage.url}')` }} /> */}
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white text-shadow font-semibold text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
      <p className="text-white text-shadow font-semibold text-2xl text-center">{post.title}</p>
    </div>
    <Link href={`/post/${post.slug}`}><span className="z-10 cursor-pointer absolute w-full h-full" /></Link>
    {position === 'LEFT' && (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer rounded-full">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white float-right" width="10.605" height="15.555"><path fill="#ffff"d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z"/></svg>
  </div>
    )}
    {position === 'RIGHT' && (
    <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" width="10.605" height="15.555"><path fill="#ffff" d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"/></svg>
    </div>
    )}
  </>
);

export default AdjacentPostCard;