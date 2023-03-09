import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="bg-black bg-opacity-80 rounded-lg text-white p-4 h-[50vh]">
          <h1 className="text-4xl font-bold mb-8">Contact</h1>
          <p className="mb-4 text-xl">
            If you have any questions or comments, feel free to send me an email
            at{' '}
            <a
              href="mailto:ask@barefootrecipe.com"
              className="text-blue-500 hover:underline"
            >
              ask@barefootrecipe.com
            </a>
            .
          </p>
        </div>
      </div>
    </>
  )
}
