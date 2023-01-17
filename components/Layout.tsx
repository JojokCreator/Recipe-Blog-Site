import Link from 'next/link'
import { ReactNode } from 'react'
import Header from './Header'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="container">
      <Link href={`/privacy`}>
        <p className="hover:cursor-pointer float-left text-sm p-2 font-semibold underline">
          Privacy Policy
        </p>
      </Link>
      <Header />
      {children}
    </div>
  )
}
export default Layout
