'use client'
import Link from 'next/link'
import { FaYoutube, FaInstagram, FaFacebookF } from 'react-icons/fa/'

const Footer = () => {
  return (
    <div className="w-screen mx-auto px-10 mb-8 bg-black/50">
      <div className="mt-2 border-t w-screen flex justify-between py-8 ">
        <div className="flex w-screen justify-between mr-20">
          <Link href="/">
            <span className="flex cursor-pointer font-bold text-4xl text-white">
              Barefoot Recipe{' '}
            </span>
          </Link>
          <div className="flex text-4xl text-white mr-4">
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
          </div>
          <Link href="https://barefootrecipe.com/privacy">
            <span className="mt-2 align-middle text-white font-semibold cursor-pointer">
              Privacy Policy
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
