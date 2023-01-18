import { NextApiRequest, NextApiResponse } from 'next'
import youtube from '../../helpers/youtube'
import snoowrap from 'snoowrap'

const r = new snoowrap({
  userAgent: 'put your user-agent string here',
  clientId: process.env.REDDIT_APP_ID,
  clientSecret: process.env.REDDIT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASSWORD
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
  const videos = await youtube()
  console.log(videos.items.length)

  const postNumber = await r.getUser(process.env.REDDIT_USER as string).getSubmissions()
  const post = (postNumber.length-13);

  r.getSubreddit("cookingvideos").submitLink({
    subredditName: "cookingvideos",
    title: videos.items[post].snippet.title,
    url: `https://www.youtube.com/watch?v=${videos.items[post].id.videoId}`,
    sendReplies: true,
  })

  res.status(200).json([])
}
export default handler