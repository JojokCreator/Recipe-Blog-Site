import { fireEvent, render, screen } from '@testing-library/react'
import Home from '../pages/index'
import { getPosts } from '../services'
import { PostCard } from '../components'

describe('Home', () => {
  it('renders a heading', async () => {
    const posts = await getPosts()

    render(<Home posts={posts} />)

    const heading = screen.getByText('Barefoot Chef Blog')

    expect(heading).toBeInTheDocument()
  })

  it('snapshot matches previous', async () => {
    const posts = await getPosts()
    const { container } = render(<Home posts={posts} />)

    expect(container).toMatchSnapshot()
  })

  it('renders initial 4 posts', async () => {
    const posts = await getPosts()
    render(<Home posts={posts} />)
    const heading = screen.getAllByRole('link')
    expect(heading.length).toBe(4)
  })
})

describe('PostCard', () => {
  it('renders a heading', async () => {
    const posts = await getPosts()

    render(<PostCard post={posts[0].node} />)

    const heading = screen.getByText('Pork Adobo')

    expect(heading).toBeInTheDocument()
  })

  it('snapshot matches previous', async () => {
    const posts = await getPosts()
    const { container } = render(<PostCard post={posts[0].node} />)

    expect(container).toMatchSnapshot()
  })

  // it('renders initial 4 posts', async () => {
  //   const posts = await getPosts()
  //   render(<Home posts={posts} />)
  //   const heading = screen.getAllByRole('link')
  //   expect(heading.length).toBe(4)
  // })
})
