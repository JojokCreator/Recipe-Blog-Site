import { NextApiRequest, NextApiResponse } from 'next'
import TwitterApi from 'twitter-api-v2'
import { TwitterApiTokens } from 'twitter-api-v2/dist/esm/types'
import { getPosts } from '../services'
import json from '../data.json'

const tokens: TwitterApiTokens = {
  appKey: process.env.TWITTER_API_KEY as string,
  appSecret: process.env.TWITTER_API_KEY_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

const client = new TwitterApi(tokens)

const rwClient = client.readWrite

const twitter = async (mode: 'blog' | 'json') => {
  //get the total number of tweets
  const result = await client.v2.userTimeline('1607016952588865543', {
    max_results: 100,
  })

  const totalTweets = result.meta.result_count - 16
  console.log(totalTweets)
  if (mode === 'blog') {
    //get the data
    const data = await getPosts()

    const post = data[totalTweets].node.excerpt.split('.')[0]
    const url = `https://barefootrecipe.com/post/${data[totalTweets].node.slug}`
    const hashTags = data[totalTweets].node.slug.split('-').join(' #')

    await rwClient.v2.tweet(`${post}. #${hashTags} ${url}`)

    return `${data[totalTweets].node.slug} created successfully`
  } else {
    const post = json[totalTweets].title + ' - ' + json[totalTweets].content
    const url = json[totalTweets].imageURl
    const hashTags = json[totalTweets].tags

    // //First, post all your image to Twitter
    const mediaId = await client.v1.uploadMedia('./public/seafood.jpg')

    const response = await rwClient.v2.tweetThread([
      { text: `${post}. #${hashTags}`, media: { media_ids: [mediaId] } },
    ])
    console.log(response)
    return json[totalTweets].title + ' created successfully'
  }
}

export default twitter
