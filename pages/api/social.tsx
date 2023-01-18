import { NextApiRequest, NextApiResponse } from 'next'
import facebook from './facebook'
import instagram from './instagram'
import twitter from './twitter'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const facebookPost = await facebook()
  const instaPost = await instagram()
  const tweet = await twitter()
  res
    .status(200)
    .json({ facebook: facebookPost, instagram: instaPost, twitter: tweet })
}
export default handler
