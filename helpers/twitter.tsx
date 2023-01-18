import { NextApiRequest, NextApiResponse } from 'next'
import TwitterApi from 'twitter-api-v2'
import { TwitterApiTokens } from 'twitter-api-v2/dist/esm/types'
import { getPosts } from '../services'

const tokens: TwitterApiTokens = {
  appKey: process.env.TWITTER_API_KEY as string,
  appSecret: process.env.TWITTER_API_KEY_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

const client = new TwitterApi(tokens)

const rwClient = client.readWrite

const twitter = async () => {
  //get the data
  const data = await getPosts()

  //get the total number of tweets
  const result = await client.v2.get('users/1607016952588865543/tweets')
  const totalTweets = result.data.length - 10

  const post = data[totalTweets].node.excerpt.split('.')[0]
  const url = `https://barefootrecipe.com/post/${data[totalTweets].node.slug}`
  const hashTags = data[totalTweets].node.slug.split('-').join(' #')

  await rwClient.v2.tweet(`${post}. #${hashTags} ${url}`)
  return `${data[totalTweets].node.slug} created successfully`
  //res.status(200).json(data[totalTweets].node.slug);
}

export default twitter