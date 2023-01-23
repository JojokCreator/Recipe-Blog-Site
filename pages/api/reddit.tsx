import { NextApiRequest, NextApiResponse } from 'next'
import youtube from '../../lib/youtube'
import snoowrap from 'snoowrap'
import { get } from '@vercel/edge-config'
import incrementPost from './postCount'

const r = new snoowrap({
  userAgent: 'put your user-agent string here',
  clientId: process.env.REDDIT_APP_ID,
  clientSecret: process.env.REDDIT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASSWORD,
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const videos = await youtube()
  const postNumber = parseInt((await get('reddit_number')) as string)

  //FoodVideos
  r.getSubreddit('cookingvideos')
    .submitLink({
      subredditName: 'cookingvideos',
      title: videos.items[postNumber].snippet.title,
      url: `https://www.youtube.com/watch?v=${videos.items[postNumber].snippet.resourceId.videoId}`,
      sendReplies: true,
    })
    .then(console.log)
  await incrementPost(postNumber, 'reddit_number')

  res
    .status(200)
    .json(videos.items[postNumber].snippet.title + ' posted successfully')
}
export default handler
