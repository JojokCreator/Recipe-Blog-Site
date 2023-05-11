import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentForm,
  Loader,
} from '../../../components'
import { getPosts, getPostsDetails } from '../../../services'
import AdjacentPosts from '../../../sections/AdjacentPosts'
import { Params, post } from '../../../types'

export async function generateMetadata({ params }: Params) {
  const post: post['node'] = await getPostsDetails(params.slug)
  return {
    alternates: { canonical: `https://barefootrecipe.com/post/${post.slug}` },
    title: `${post.title} - Barefoot Chef`,
    description: post.excerpt,
    // twitter meta tags
    twitter: {
      card: 'summary_large_image',
      images: {
        url: post.featuredImage.url,
        alt: post.title,
      },
    },
    //  open graph tags
    openGraph: {
      locale: 'en_US',
      url: `https://barefootrecipe.com/post/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featuredImage.url,
          alt: post.title,
        },
      ],
      type: 'article',
    },
  }
}

const PostDetails = async ({ params }: Params) => {
  const post: post['node'] = await getPostsDetails(params.slug)

  const steps = []
  const ingredients = []
  const array = post.content.raw.children

  const startIndex = array.findIndex(
    (obj) => obj.children[0].text.toLowerCase() === 'ingredients'
  )
  const endIndex = array.findIndex((obj) => obj.type === 'image')
  const ingredArray = array.slice(startIndex + 1, endIndex - 1)
  for (let i = 0; i < ingredArray.length; i++) {
    if (
      ingredArray[i].children[0].text != '' &&
      !ingredArray[i].children[0].underline
    ) {
      ingredients.push(ingredArray[i].children[0].text)
    }
  }

  const index = array.findIndex((obj) => obj.type === 'image')
  const newArray = array.slice(index)
  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i].children[0].text != '') {
      steps.push({ '@type': 'HowToStep', text: newArray[i].children[0].text })
    }
  }

  const videoUrl =
    post.content.raw.children[post.content.raw.children.length - 2].url

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Recipe',
    name: post.title,
    image: [post.featuredImage.url],
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    datePublished: post.createdAt,
    description: post.excerpt,
    recipeCuisine: post.categories[0].name,
    prepTime: 'PT1M',
    cookTime: 'PT2M',
    totalTime: 'PT3M',
    keywords: post.categories[0].name,
    recipeYield: '1 serving',
    recipeCategory: post.categories[0].name,
    // "nutrition": {
    //   "@type": "NutritionInformation",
    //   "calories": "120 calories"
    // },
    // "aggregateRating": {
    //   "@type": "AggregateRating",
    //   "ratingValue": "5",
    //   "ratingCount": "18"
    // },
    recipeIngredient: ingredients,
    recipeInstructions: steps,
    video: {
      '@type': 'VideoObject',
      name: post.title,
      description: post.excerpt,
      thumbnailUrl: [post.featuredImage.url],
      contentUrl: videoUrl,
      embedUrl: videoUrl,
      uploadDate: post.createdAt,
      // "duration": "PT1M33S",
      // "interactionStatistic": {
      //   "@type": "InteractionCounter",
      //   "interactionType": { "@type": "WatchAction" },
      //   "userInteractionCount": 2347
      // },
      // "expires": "2019-02-05T08:00:00+08:00"
    },
  }

  if (!post) {
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
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
            <CommentForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PostDetails

export const dynamicParams = true

export async function generateStaticParams() {
  const posts: post[] = await getPosts()
  return posts.map(({ node: { slug } }) => ({ slug }))
}
