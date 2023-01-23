'use client'
import { useState } from 'react'
import { PostCard, Categories, PostWidget } from '.'
import FeaturedPosts from '../sections/FeaturedPosts'
import { post } from '../types'

type HomeProps = {
  posts: post[]
}

const Home = ({ posts }: HomeProps) => {
  const [input, setInput] = useState<any>('')
  const [filteredPosts, setFilteredPosts] = useState<post[]>(posts)

  const onInputChange = (e: any) => {
    setInput(e.target.value)
  }

  const handleSearchSubmission = () => {
    setFilteredPosts(
      posts.filter((post) =>
        post.node.title.toLowerCase().includes(input.toLowerCase())
      )
    )
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts />
      <div className="flex p-4 flex-col md:flex-row">
        <input
          type="text"
          value={input}
          onChange={onInputChange}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-10 text-center mb-4"
          placeholder="Search Here..."
          name="search"
        />
        <button
          aria-label="Click to search the posts"
          type="button"
          onClick={handleSearchSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-indigo-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer ml-2"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {filteredPosts.length === 0 ? (
          <div className="text-center font-bold text-4xl text-white p-4 lg:col-span-8 col-span-1">
            No posts found
          </div>
        ) : (
          <ul className="lg:col-span-8 col-span-1 list-none">
            {filteredPosts.slice(0, 6).map((posts: post, index: number) => (
              <PostCard post={posts.node} key={index} />
            ))}
          </ul>
        )}
        <div className="lg:col-span-4 cols-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget categories={[]} slug={''} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
