import { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from '../services'
import { json } from '../types'
//https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOKS_APP_ID}&client_secret=${process.env.FACEBOOKS_APP_SECRET}&grant_type=client_credentials

const instagram = async (
  mode: 'blog' | 'json',
  postNumber: number,
  json: json[]
) => {
  let text = ''
  let imageUrl = ''
  let title = ''

  if (mode === 'blog') {
    const data = await getPosts()
    title = data[postNumber].node.title
    text = `${title} - https://barefootrecipe.com/post/${data[postNumber].node.slug}`
    imageUrl = data[postNumber].node.featuredImage.url
  } else {
    title = json[postNumber].title
    text = title + ' - ' + json[postNumber].content
    imageUrl = json[postNumber].imageURl
  }
  const response = await fetch(
    `https://graph.facebook.com/v15.0/17841457516696875/media?image_url=${imageUrl}&caption=${text}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB-oxendict,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    }
  )
  const { id } = await response.json()
  console.log(response)
  // if (response.status != 200) {
  //   return response
  // }

  const result = await fetch(
    `https://graph.facebook.com/v15.0/17841457516696875/media_publish?creation_id=${id}&access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB-oxendict,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    }
  )
  const data = await result.json()
  if (data.status != 200) {
    return data
  }
  return title + ' was posted successfully'
}

export default instagram
