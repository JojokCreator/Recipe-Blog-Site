import { Home } from '../components'
import { getPosts } from '../services'
import { post } from '../types'

const HomePage = async () => {
  const posts: post[] = await getPosts()

  return <Home posts={posts} />
}

export default HomePage
