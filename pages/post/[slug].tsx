import { useRouter } from 'next/router'
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentForm,
  Loader,
} from '../../components'
import { getPosts, getPostsDetails } from '../../services'
import AdjacentPosts from '../../sections/AdjacentPosts'
import Head from 'next/head'

type SlugProps = {
  post: {
    title: string
    exerpt: string
    featuredImage: { url: string }
    slug: string
    createdAt: string
    author: { name: string; photo: { url: string }; bio: string }
    categories: { name: string; slug: string }[]
    content: { raw: { children: { type: string; children: any }[] } }
  }
}

type Params = {
  params: {
    slug: string
  }
}

const PostDetails = ({ post }: SlugProps) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loader />
  }

  const steps = [];
  const ingredients = [];
  const array = post.content.raw.children

  const startIndex = array.findIndex(obj => obj.children[0].text.toLowerCase() === 'ingredients');
  const endIndex = array.findIndex(obj => obj.type === 'image')
  const ingredArray = array.slice(startIndex+1, endIndex-1)
  for (let i = 0; i<ingredArray.length; i++){
    if(ingredArray[i].children[0].text != "" && !ingredArray[i].children[0].underline){
      ingredients.push(ingredArray[i].children[0].text)
    }
  }
  
  const index = array.findIndex(obj => obj.type === 'image');
  const newArray = array.slice(index)
  for (let i = 0; i<newArray.length; i++){
    if(newArray[i].children[0].text != ""){
      steps.push({"@type": "HowToStep", "text": newArray[i].children[0].text})
    }
  }

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": post.title,
    "image": [ post.featuredImage.url ],
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    "datePublished": post.createdAt,
    "description": post.exerpt,
    "recipeCuisine": post.categories[0].name,
    "prepTime": "PT1M",
    "cookTime": "PT2M",
    "totalTime": "PT3M",
    //"keywords": "non-alcoholic",
    "recipeYield": "1 serving",
    "recipeCategory": post.categories[0].name,
    // "nutrition": {
    //   "@type": "NutritionInformation",
    //   "calories": "120 calories"
    // },
    // "aggregateRating": {
    //   "@type": "AggregateRating",
    //   "ratingValue": "5",
    //   "ratingCount": "18"
    // },
    "recipeIngredient": ingredients,
    "recipeInstructions": steps,
    // "video": {
    //   "@type": "VideoObject",
    //   "name": "How to make a Party Coffee Cake",
    //   "description": "This is how you make a Party Coffee Cake.",
    //   "thumbnailUrl": [
    //     "https://example.com/photos/1x1/photo.jpg",
    //     "https://example.com/photos/4x3/photo.jpg",
    //     "https://example.com/photos/16x9/photo.jpg"
    //    ],
    //   "contentUrl": "https://www.example.com/video123.mp4",
    //   "embedUrl": "https://www.example.com/videoplayer?video=123",
    //   "uploadDate": "2018-02-05T08:00:00+08:00",
    //   "duration": "PT1M33S",
    //   "interactionStatistic": {
    //     "@type": "InteractionCounter",
    //     "interactionType": { "@type": "WatchAction" },
    //     "userInteractionCount": 2347
    //   },
    //   "expires": "2019-02-05T08:00:00+08:00"
    //  }
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <Head>
          <meta charSet="utf-8" />
          <title>{post.title}</title>
          <link
            rel="canonical"
            href={'https://www.barefootrecipe.com/post/' + post.slug}
          />
          <meta name="description" content={post.exerpt} />

          <meta name="theme-color" content="#000000" />
          {/* open graph tags */}
          <meta name="og:type" content="article" />
          <meta name="og:title" content={post.title} />

          <meta name="og:url" content={router.pathname} />
          <meta name="og:description" content={post.exerpt} />
          <meta name="og:image" content={post.featuredImage.url} />
          {/* twitter tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={post.title} />
          <meta name="twitter:description" content={post.exerpt} />
          <meta name="twitter:image" content={post.featuredImage.url} />

          <script
            key="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>
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

export const getStaticProps = async ({ params }: Params) => {
  const data = await getPostsDetails(params.slug)
  return {
    props: {
      post: data,
    },
  }
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts: [] = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  }
}
