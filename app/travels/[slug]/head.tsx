import Script from 'next/script'
import { getBlogsDetails } from '../../../services'
import { Params, blog } from '../../../types'

const Head = async ({ params }: Params) => {
  const blog: blog['node'] = await getBlogsDetails(params.slug)

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

  return (
    <>
      <Script
        id="seo"
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <title>{blog.title}</title>
      <link
        rel="canonical"
        href={'https://www.barefootrecipe.com/blog/' + blog.slug}
      />
      <meta name="description" content={blog.excerpt} />
      <meta name="theme-color" content="#000000" />
      {/* open graph tags */}
      <meta name="og:type" content="article" />
      <meta name="og:title" content={blog.title} />
      <meta
        name="og:url"
        content={'https://www.barefootrecipe.com/blog/' + blog.slug}
      />
      <meta name="og:description" content={blog.excerpt} />
      {/* <meta name="og:image" content={blog.featuredImage.url} /> */}
      {/* twitter tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={blog.title} />
      <meta name="twitter:description" content={blog.excerpt} />
      {/* <meta name="twitter:image" content={blog.featuredImage.url} /> */}
    </>
  )
}

export default Head
