import { act, fireEvent, render, screen } from '@testing-library/react'
import { getCategories, getPosts } from '../services'
import { PostCard, Home, Header } from '../components'

describe('Home', () => {
  it('renders a heading', async () => {
    const categories = await getCategories()
    render(<Header categories={categories} />)
    const heading = screen.getByText('Barefoot Chef Blog')
    expect(heading).toBeInTheDocument()
  })

  it('snapshot matches previous', async () => {
    const posts = await getPosts()
    const { container } = render(<Home posts={posts} />)
    expect(container).toMatchSnapshot()
  })

  it('renders initial 6 posts', async () => {
    const posts = await getPosts()
    render(<Home posts={posts} />)
    const heading = screen.getAllByRole('listitem')
    expect(heading.length).toBe(6)
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

  it('renders initial 6 posts', async () => {
    const posts = await getPosts()
    render(<Home posts={posts} />)
    const heading = screen.getAllByRole('link')
    expect(heading.length).toBe(12)
  })

  describe('Search Bar', () => {
    it('shows no posts found if search is xxx445', async () => {
      const posts = await getPosts()
      render(<Home posts={posts} />)
      const input = screen.getByPlaceholderText('Search Here...')
      const button = screen.getByText('Search')
      fireEvent.change(input, { target: { value: 'xxx445' } })
      fireEvent.click(button)

      const heading = screen.getByText('No posts found')
      expect(heading).toBeInTheDocument()
    })
    it('shows one posts found if search is pork', async () => {
      const posts = await getPosts()
      render(<Home posts={posts} />)
      const input = screen.getByPlaceholderText('Search Here...')
      const button = screen.getByText('Search')
      fireEvent.change(input, { target: { value: 'pork' } })
      fireEvent.click(button)

      const heading = screen.getAllByRole('listitem')
      expect(heading.length).toBe(1)
      screen.debug(heading)
    })
  })
})
