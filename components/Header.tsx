import Link from 'next/link'
import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
} from 'react-icons/fa/'

interface Categories {
  categories: {
    name: string
    slug: string
  }[]
}

const Header = ({ categories }: Categories) => {
  return (
    <div className="w-screen mb-4 px-0 md:px-4 bg-black/50 border-b">
      {/* <Link href={`/privacy`}>
        <p className="hover:cursor-pointer float-left text-sm p-2 font-semibold underline">
          Privacy Policy
        </p>
      </Link> */}
      <div className=" flex justify-between p-4">
        <div className="flex px-2 md:px-8">
          <Link className="self-center" href="/" aria-label="Link to home page">
            <span className="flex cursor-pointer font-bold text-2xl md:text-4xl text-white">
              Barefoot Chef{' '}
            </span>
          </Link>
        </div>
        <div className="flex text-4xl text-white ml-2">
          <Link
            href="https://www.youtube.com/channel/UCsPGY5C60Rj0-rEdZlR9HsQ"
            aria-label="Link to youtube channel"
          >
            <div className="hover:cursor-pointer hover:opacity-80 ml-2">
              <FaYoutube />
            </div>
          </Link>
          <Link
            href="https://www.instagram.com/_barefootchef/"
            aria-label="Link to instagram page"
          >
            <div className="hover:cursor-pointer hover:opacity-80 ml-2">
              <FaInstagram />
            </div>
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=100088855823587"
            aria-label="Link to facebook page"
          >
            <div className="hover:cursor-pointer hover:opacity-80 ml-2">
              <FaFacebookF />
            </div>
          </Link>
          <Link href="/contact" aria-label="Contact me link">
            <div className="hover:cursor-pointer hover:opacity-80 ml-2">
              <FaEnvelope />
            </div>
          </Link>
        </div>
        <div className="hidden lg:contents">
          {categories.map((category) => (
            <Link
              className="self-center"
              key={category.slug}
              href={`/category/${category.slug}`}
            >
              <span className="hover:opacity-80 text-white font-semibold cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        <Link className="hidden md:flex self-center" href={`/travels`}>
          <span className="hover:opacity-80 text-white font-semibold cursor-pointer mr-4">
            Travels
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Header
