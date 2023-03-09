import Link from 'next/link'

export default function Terms() {
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <div className=" bg-black bg-opacity-80 rounded-lg text-white p-4">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
          <p className="mb-4 text-xl">
            By accessing or using the Barefoot Chef website, you agree to be
            bound by these terms and conditions. If you do not agree to these
            terms and conditions, you should not access or use the website.
          </p>
          <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
          <p className="mb-4 text-xl">
            The content on the Barefoot Chef website, including but not limited
            to text, graphics, images, and logos, is the property of Barefoot
            Chef and is protected by intellectual property laws. You may not
            reproduce, modify, distribute, or display any content from the
            website without the prior written consent of Barefoot Chef.
          </p>
          <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
          <p className="mb-4 text-xl">
            The Barefoot Chef website and its content are provided on an "as is"
            basis without any warranties, express or implied. Barefoot Chef does
            not warrant that the website will be error-free or uninterrupted, or
            that the content on the website will be accurate or complete.
            Barefoot Chef is not liable for any damages arising from the use of
            the website.
          </p>
          <h2 className="text-2xl font-bold mb-4">
            Changes to Terms and Conditions
          </h2>
          <p className="mb-4 text-xl">
            Barefoot Chef reserves the right to modify these terms and
            conditions at any time. Your continued use of the website after any
            such modifications constitutes your acceptance of the new terms and
            conditions.
          </p>
          <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
          <p className="mb-4 text-xl">
            These terms and conditions shall be governed by and construed in
            accordance with the laws of the jurisdiction in which Barefoot Chef
            is located.
          </p>
          <h2 className="font-bold text-2xl text-white py-4">Contact Us</h2>
          <p className="mb-4 text-xl">
            If you have any questions about our privacy policy, please contact
            us at{' '}
            <a className="text-blue-500" href="mailto: ask@barefootrecipe.com.">
              ask@barefootrecipe.com.
            </a>
          </p>
          <Link
            href="/"
            className="font-bold text-xl md:text-2xl text-white hover:opacity-80"
          >
            Click Here to go back to the home page
          </Link>
        </div>
      </div>
    </>
  )
}
