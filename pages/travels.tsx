import Link from 'next/link'
import { getBlogs } from '../services'
import { GetStaticProps, NextPage } from 'next'

export interface Blogs {
  blogs: {
    node: {
      title: string
      excerpt: string
      slug: string
      createdAt: string
    }
  }[]
}

const Travels: NextPage<Blogs> = ({ blogs }) => {
  return (
    <div className="flex items-center justify-center h-80 flex-col">
      <div className=" bg-black p-6 bg-opacity-50 rounded-lg flex flex-col">
        <h1 className="font-bold text-4xl text-white p-4">Travels</h1>
        {blogs.map((blog, index) => (
          <Link key={index} href={`/travels/${blog.node.slug}`}>
            <a className="font-bold text-xl text-white hover:opacity-80 p-4">
              {blog.node.title}
            </a>
          </Link>
        ))}
        <Link href="/">
          <a className="font-bold text-xl text-white hover:opacity-80 p-4">
            Click Here to go back to the home page
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Travels

export const getStaticProps: GetStaticProps = async () => {
  const blogs = (await getBlogs()) || []
  return {
    props: { blogs },
  }
}
