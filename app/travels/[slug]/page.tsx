import { Categories, Loader } from '../../../components'
import { getBlogs, getBlogsDetails } from '../../../services'
import BlogDetail from '../../../components/BlogDetail'
import { Params, blog } from '../../../types'

// type Params = {
//   params: {
//     slug: string
//   }
// }

export async function generateMetadata({ params }: Params) {
  const blog: blog['node'] = await getBlogsDetails(params.slug)
  return {
    alternates: {
      canonical: `https://barefootrecipe.com/travels/${blog.slug}`,
    },
    title: blog.title,
    description: blog.excerpt,
    // twitter meta tags
    twitter: {
      card: 'summary_large_image',
      images: {
        url: 'https://barefootrecipe.com/blog.jpg',
        alt: blog.title,
      },
    },
    //  open graph tags
    openGraph: {
      locale: 'en_US',
      url: `https://barefootrecipe.com/${blog.slug}`,
      title: blog.title,
      description: blog.excerpt,
      images: [
        {
          url: 'https://barefootrecipe.com/blog.jpg',
          alt: blog.title,
        },
      ],
      type: 'article',
    },
  }
}

const BlogDetails = async ({ params }: Params) => {
  const blog = await getBlogsDetails(params.slug)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    author: [
      {
        '@type': 'Person',
        name: 'Barefoot Chef',
      },
    ],
    datePublished: blog.createdAt,
  }

  if (!blog) {
    return <Loader />
  }

  return (
    <>
      <section>
        {/* Add JSON-LD to your page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* ... */}
      </section>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <BlogDetail blog={blog} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              {/* <blogWidget
                slug={blog.slug}
                categories={blog.categories.map((category) => category.slug)}
              /> */}
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default BlogDetails

// export const getStaticProps = async ({ params }: Params) => {
//   const data = await getBlogsDetails(params.slug)
//   return {
//     props: {
//       blog: data,
//     },
//   }
// }

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function generateStaticParams() {
  const blogs: [] = await getBlogs()
  return blogs.map(({ node: { slug } }) => ({ slug }))
}
