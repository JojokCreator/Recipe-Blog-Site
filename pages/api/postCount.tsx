import { get } from '@vercel/edge-config'

export const config = { matcher: '/welcome' }

const incrementPost = async (post: number) => {
  try {
    const updateEdgeConfig = await fetch(
      'https://api.vercel.com/v1/edge-config/ecfg_hafktjch0nmhdyc0buwhnfsueq8r/items',
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.EDGE_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              operation: 'update',
              key: 'post_number',
              value: post + 1,
            },
          ],
        }),
      }
    )
    const result = await updateEdgeConfig.json()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
export default incrementPost
