import Link from 'next/link'
import { FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa/'

interface Categories {
  categories: {
    name: string
    slug: string
  }[]
}

const Header = ({ categories }: Categories) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Link href={`/privacy`}>
        <p className="hover:cursor-pointer float-left text-sm p-2 font-semibold underline">
          Privacy Policy
        </p>
      </Link>
      <div className="border-b w-full flex justify-between border-blue-400 py-8 ">
        <div className="md:float-left flex">
          <Link href="/">
            <span className="flex cursor-pointer font-bold text-4xl text-white">
              Barefoot Chef Blog{' '}
            </span>
          </Link>
        </div>
        <div className="flex text-4xl text-white ml-4">
          <Link href="https://www.youtube.com/channel/UCsPGY5C60Rj0-rEdZlR9HsQ">
            <div className="hover:cursor-pointer hover:opacity-80 ml-2">
              <FaYoutube />
            </div>
          </Link>
          <Link href="https://www.instagram.com/_barefootchef/">
            <div className="hover:cursor-pointer hover:opacity-80 ml-2">
              <FaInstagram />
            </div>
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=100088855823587">
            <div className="hover:cursor-pointer hover:opacity-80 ml-2">
              <FaFacebookF />
            </div>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
          <Link href={`/travels`}>
            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
              Travels
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
