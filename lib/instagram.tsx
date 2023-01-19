import { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from '../services'
import json from '../data.json'
//https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOKS_APP_ID}&client_secret=${process.env.FACEBOOKS_APP_SECRET}&grant_type=client_credentials

const instagram = async (mode: 'blog' | 'json') => {
  const countPosts = async () => {
    const response = await fetch(
      `https://graph.facebook.com/v15.0/17841457516696875/media?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
    )
    const data = await response.json()
    let postNumber = data.data.length
    return postNumber
  }
  const postNumber = (await countPosts()) - 19

  const data = await getPosts()
  let text = ''
  let imageUrl = ''

  if (mode === 'blog') {
    text = `${data[postNumber].node.title} - https://barefootrecipe.com/post/${data[postNumber].node.slug}`
    imageUrl = data[postNumber].node.featuredImage.url
  } else {
    text = json[postNumber].title + ' - ' + json[postNumber].content
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
  console.log(result)
  return json[postNumber].title + ' was posted successfully'
}

export default instagram
