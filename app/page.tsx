import { Home } from '../components'
import { getPosts } from '../services'
import { post } from '../types'

export const metadata = {
  alternates: { canonical: 'https://barefootrecipe.com/' },
  title: 'Barefoot Recipes Site',
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
    title: 'Barefoot Recipes Site',
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

const HomePage = async () => {
  const posts: post[] = await getPosts()

  return <Home posts={posts} />
}

export default HomePage
