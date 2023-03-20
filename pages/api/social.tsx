import { NextApiRequest, NextApiResponse } from 'next'
import facebook from '../../lib/facebook'
import instagram from '../../lib/instagram'
import twitter from '../../lib/twitter'
import { get } from '@vercel/edge-config'
import incrementPost from './postCount'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const postNumber = parseInt((await get('post_number')) as string)
  const data: any = await get('data')
  const mode: any = await get('mode')

  const facebookPost = await facebook(mode, postNumber, data)
  const instaPost = await instagram(mode, postNumber, data)
  const tweet = await twitter(mode, postNumber, data)
  await incrementPost(postNumber, 'post_number')
  res
    .status(200)
    .json({ facebook: facebookPost, twitter: tweet, instagram: instaPost })
}
export default handler
