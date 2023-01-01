import { NextApiRequest, NextApiResponse } from "next";
import TwitterApi from 'twitter-api-v2';
import { TwitterApiTokens } from "twitter-api-v2/dist/esm/types";
import { data } from '../../data'

const tokens: TwitterApiTokens = {
  appKey: process.env.TWITTER_API_KEY as string,
  appSecret: process.env.TWITTER_API_KEY_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

const client = new TwitterApi(tokens)

const rwClient = client.readWrite

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

      await rwClient.v2.tweet(`The savory and slightly sweet flavor is a game changer. If you haven't tried them yet, add them to your list of must-try cured meats. #chinesesausage" https://barefootrecipe.com/post/${data.data.postsConnection.edges[0].node.slug} `);
      res.status(200).json(data.data.postsConnection.edges[0].node.slug);
    };
    
    export default handler;