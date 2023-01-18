import { NextApiRequest, NextApiResponse } from 'next'
import { getPosts } from '../services'
import json from '../data.jdson'
//https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOKS_APP_ID}&client_secret=${process.env.FACEBOOKS_APP_SECRET}&grant_type=client_credentials

const facebook = async () => {
  const countPosts = async () => {
    const response = await fetch(
      `https://graph.facebook.com/v15.0/108454552132944/feed?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`
    )

    const data = await response.json()

    let postNumber = data.data.length - 20
    return postNumber
  }
  const postNumber = await countPosts()

  //used to post from json
  // const post = json[postNumber].title + json[postNumber].content
  // const url = json[postNumber].imageURl
  // console.log(url+post)

  //used to post a new post
  const data = await getPosts()
  console.log(postNumber)
  const post = data[data.length - 1].node.excerpt
  const url = `https://barefootrecipe.com/post/${data[postNumber].node.slug}`

  await fetch(
    `https://graph.facebook.com/v15.0/108454552132944/feed?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-GB-oxendict,en;q=0.8',
        'content-type': 'application/x-www-form-urlencoded',
        // 'sec-fetch-dest': 'empty',
        // 'sec-fetch-mode': 'cors',
        // 'sec-fetch-site': 'same-site',
        // 'sec-gpc': '1',
      },
      // referrer: 'https://developers.facebook.com/',
      // referrerPolicy: 'origin-when-cross-origin',
      body: `debug=all&format=json&message=${post}&link=${url}&method=post&pretty=0&suppress_http_code=1&transport=cors`,
      method: 'POST',
      // mode: 'cors',
      // credentials: 'omit',
    }
  )

  //res.status(200).json(json[postNumber].title + ' was posted successfully')
  return data[postNumber].node.slug + ' was posted successfully'
}

export default facebook
