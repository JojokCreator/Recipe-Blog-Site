import { NextApiRequest, NextApiResponse } from 'next'
import facebook from '../../lib/facebook'
import instagram from '../../lib/instagram'
import twitter from '../../lib/twitter'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const facebookPost = await facebook()
  const instaPost = await instagram()
  const tweet = await twitter()
  res
    .status(200)
    .json({ facebook: facebookPost, instagram: instaPost, twitter: tweet })
}
export default handler
