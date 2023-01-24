import Link from 'next/link'
import { getBlogs } from '../../services'
import { blog } from '../../types'

const Travels = async () => {
  const blogs: blog[] = await getBlogs()
  return (
    <div className="flex items-center justify-center h-80 flex-col mb-60">
      <div className=" bg-black p-6 bg-opacity-70 rounded-lg w-1/2 flex flex-col">
        <h1 className="font-bold text-4xl text-white p-4">Travels</h1>
        {blogs.map((blog, index) => (
          <Link
            className="font-bold text-xl text-white hover:opacity-80 p-4"
            key={index}
            href={`/travels/${blog.node.slug}`}
          >
            {blog.node.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Travels
