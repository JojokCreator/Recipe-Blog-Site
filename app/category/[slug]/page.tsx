import { getCategories, getCategoryPost } from '../../../services'
import { PostCard, Categories, Loader } from '../../../components'
import { post, Params, Slug, category } from '../../../types'

export async function generateMetadata({ params }: Params) {
  return {
    alternates: {
      canonical: `https://barefootrecipe.com/category/${params.slug}`,
    },
    title: `${params.slug} recipes - Barefoot Recipes Site`,
    description:
      'Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home',
    keywords: ['Asian Food', 'Cooking', 'Blog', 'Brewing'],
    // twitter meta tags
    twitter: {
      card: 'summary_large_image',
      images: {
        url: 'https://barefootrecipe.com/blog.jpg',
        alt: 'website image',
      },
    },
    //  open graph tags
    openGraph: {
      locale: 'en_US',
      url: 'https://barefootrecipe.com/',
      title: `${params.slug} recipes - Barefoot Recipes Site`,
      description:
        'Get inspired in the kitchen with recipes from Asia and beyond, learn how to brew your own beer, wine, and other drinks at home',
      images: [
        {
          url: 'https://barefootrecipe.com/blog.jpg',
          alt: 'website image',
        },
      ],
      type: 'website',
    },
  }
}

const CategoryPost = async ({ params }: Params) => {
  const posts: post[] = await getCategoryPost(params.slug)

  if (!posts) {
    return <Loader />
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <ul className="lg:col-span-8 col-span-1 list-none">
          {posts.map((post: post, index: number) => (
            <PostCard key={index} post={post.node} />
          ))}
        </ul>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
export default CategoryPost

export const dynamicParams = true

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map(({ slug }: Slug) => ({ slug }))
}
