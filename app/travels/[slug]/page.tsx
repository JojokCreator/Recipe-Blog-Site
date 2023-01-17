import {
  Categories,
  Loader,
} from '../../../components'
import { getBlogs, getBlogsDetails } from '../../../services'
import Head from 'next/head'
import BlogDetail from '../../../components/BlogDetail'


type Params = {
  params: {
    slug: string
  }
}

const BlogDetails = async ({ params }: Params) => {
  const blog = await getBlogsDetails(params.slug)

  if (!blog) {
    return <Loader />
  }

  const steps = [];
  const ingredients = [];
  const array = blog.content.raw.children

  const startIndex = array.findIndex((obj: { children: { text: string }[] }) => obj.children[0].text.toLowerCase() === 'ingredients');
  const endIndex = array.findIndex((obj: { type: string }) => obj.type === 'image')
  const ingredArray = array.slice(startIndex+1, endIndex-1)
  for (let i = 0; i<ingredArray.length; i++){
    if(ingredArray[i].children[0].text != "" && !ingredArray[i].children[0].underline){
      ingredients.push(ingredArray[i].children[0].text)
    }
  }
  
  const index = array.findIndex((obj: { type: string }) => obj.type === 'image');
  const newArray = array.slice(index)
  for (let i = 0; i<newArray.length; i++){
    if(newArray[i].children[0].text != ""){
      steps.push({"@type": "HowToStep", "text": newArray[i].children[0].text})
    }
  }

  const videoUrl = blog.content.raw.children[blog.content.raw.children.length-2].url

  // const structuredData = {
  //   "@context": "https://schema.org/",
  //   "@type": "Recipe",
  //   "name": blog.title,
  //   "image": [ blog.featuredImage.url ],
  //   "author": {
  //     "@type": "Person",
  //     "name": blog.author.name
  //   },
  //   "datePublished": blog.createdAt,
  //   "description": blog.excerpt,
  //   "recipeCuisine": blog.categories[0].name,
  //   "prepTime": "PT1M",
  //   "cookTime": "PT2M",
  //   "totalTime": "PT3M",
  //   "keywords": blog.categories[0].name,
  //   "recipeYield": "1 serving",
  //   "recipeCategory": blog.categories[0].name,
  //   // "nutrition": {
  //   //   "@type": "NutritionInformation",
  //   //   "calories": "120 calories"
  //   // },
  //   // "aggregateRating": {
  //   //   "@type": "AggregateRating",
  //   //   "ratingValue": "5",
  //   //   "ratingCount": "18"
  //   // },
  //   "recipeIngredient": ingredients,
  //   "recipeInstructions": steps,
  //   "video": {
  //     "@type": "VideoObject",
  //     "name": blog.title,
  //     "description": blog.excerpt,
  //     "thumbnailUrl": [ blog.featuredImage.url ],
  //     "contentUrl": videoUrl,
  //     "embedUrl": videoUrl,
  //     "uploadDate": blog.createdAt,
  //     // "duration": "PT1M33S",
  //     // "interactionStatistic": {
  //     //   "@type": "InteractionCounter",
  //     //   "interactionType": { "@type": "WatchAction" },
  //     //   "userInteractionCount": 2347
  //     // },
  //     // "expires": "2019-02-05T08:00:00+08:00"
  //    }
  // }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <Head>
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

          <meta name="og:url" content={""} />
          <meta name="og:description" content={blog.excerpt} />
          {/* <meta name="og:image" content={blog.featuredImage.url} /> */}
          {/* twitter tags */}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={blog.title} />
          <meta name="twitter:description" content={blog.excerpt} />
          {/* <meta name="twitter:image" content={blog.featuredImage.url} /> */}

          {/* <script
            key="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          /> */}
        </Head>
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

