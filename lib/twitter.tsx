import TwitterApi from 'twitter-api-v2'
import { TwitterApiTokens } from 'twitter-api-v2/dist/esm/types'
import { getPosts } from '../services'
import { json } from '../types'

const tokens: TwitterApiTokens = {
  appKey: process.env.TWITTER_API_KEY as string,
  appSecret: process.env.TWITTER_API_KEY_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

const client = new TwitterApi(tokens)

const rwClient = client.readWrite

const twitter = async (
  mode: 'blog' | 'json',
  postNumber: number,
  json: json[]
) => {
  let title = ''

  if (mode === 'blog') {
    //get the data
    const data = await getPosts()
    title = data[postNumber].title
    const post = data[postNumber].node.excerpt.split('.')[0]
    const url = `https://barefootrecipe.com/post/${data[postNumber].node.slug}`
    const hashTags = data[postNumber].node.slug.split('-').join(' #')

    await rwClient.v2.tweet(`${post}. #${hashTags} ${url}`)

    return `${data[postNumber].node.slug} created successfully`
  } else {
    title = json[postNumber].title
    const post = title + ' - ' + json[postNumber].content
    const id = json[postNumber].twitterId
    const hashTags = json[postNumber].tags

    // //First, post all your image to Twitter
    // const mediaId = await client.v1.uploadMedia(
    //   `./public/${json[postNumber].title}.jpg`
    // )

    const response = await rwClient.v2.tweetThread([
      { text: `${post}. #${hashTags}`, media: { media_ids: [id] } },
    ])
    console.log(response)
    return title + ' created successfully'
  }
}

export default twitter
