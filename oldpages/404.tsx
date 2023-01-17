import Link from 'next/link'

export default function FourOhFour() {
  return (
    <div className="flex items-center justify-center h-80 flex-col">
      <div className=" bg-black p-6 bg-opacity-50 rounded-lg">
        <h1 className="font-bold text-4xl text-white p-4">
          404 - Page Not Found
        </h1>
        <p className="font-bold text-xl text-white p-4">
          Looks like this page doesn`&apos;`t exist yet!
        </p>
        <Link href="/">
          <a className="font-bold text-2xl text-white hover:opacity-80 p-4">
            Click Here to go back to the home page
          </a>
        </Link>
      </div>
    </div>
  )
}
