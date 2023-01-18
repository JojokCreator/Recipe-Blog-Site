import { act, fireEvent, render, screen } from '@testing-library/react'
import Home from '../app/page'
import { getPosts } from '../services'
import { PostCard, Header } from '../components'

describe('Home', () => {
  it('renders a heading', async () => {
    render(<Header categories={[]} />)
    const heading = screen.getByText('Barefoot Chef Blog')
    expect(heading).toBeInTheDocument()
  })

  it('snapshot matches previous', async () => {
    const jsx = await Home()
    const { container } = render(jsx)

    expect(container).toMatchSnapshot()
  })

  it('renders initial 6 posts', async () => {
    const jsx = await Home()
    render(jsx)
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
    const jsx = await Home()
    render(jsx)
    const heading = screen.getAllByRole('link')
    expect(heading.length).toBe(12)
  })
})
