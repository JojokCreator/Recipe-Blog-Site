import { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from '../../services'

//https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOKS_APP_ID}&client_secret=${process.env.FACEBOOKS_APP_SECRET}&grant_type=client_credentials

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const countPosts = async () => {
    const response = await fetch(
      `https://graph.facebook.com/v15.0/17841457516696875/media?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
    )

    const data = await response.json()

    let postNumber = data.data.length
    return postNumber
  }
  const postNumber = await countPosts()
  console.log(postNumber)
  const data = await getPosts()
  const text = `${data[postNumber].node.title} - https://barefootrecipe.com/post/${data[postNumber].node.slug}`
  const imageUrl = data[postNumber].node.featuredImage.url

  const response = await fetch(
    `https://graph.facebook.com/v15.0/17841457516696875/media?image_url=${imageUrl}&caption=${text}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB-oxendict,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
      },
      referrer: 'https://developers.facebook.com/',
      referrerPolicy: 'origin-when-cross-origin',
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    }
  )
  const { id } = await response.json()
  console.log(id)

  const result = await fetch(
    `https://graph.facebook.com/v15.0/17841457516696875/media_publish?creation_id=${id}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB-oxendict,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sec-gpc': '1',
      },
      referrer: 'https://developers.facebook.com/',
      referrerPolicy: 'origin-when-cross-origin',
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
    }
  )
  //console.log(result)
  res.status(200).json(data[postNumber].node.slug + ' was posted successfully')
}

export default handler
