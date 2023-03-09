import Link from 'next/link'

export default function Privacy() {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className=" bg-black bg-opacity-80 rounded-lg">
        <h1 className="font-bold text-4xl text-white p-4 ">Privacy Policy</h1>
        <p className="text-xl text-white p-4">
          <p>
            At Barefoot Chef, we are committed to protecting your privacy. This
            privacy policy explains how we collect, use, and share your personal
            information when you visit our website.
          </p>
          <h2 className="font-bold text-2xl text-white py-4">
            Information We Collect
          </h2>
          We may collect the following types of information when you visit our
          website: Personal information: We may collect your name, email
          address, and other personal information when you sign up for our
          newsletter, leave a comment, or contact us through our website.
          Analytics data: We use Google Analytics to track visitors to our
          website. This includes information about your location, device, and
          browsing habits. We use this information to understand how our website
          is being used and to improve the user experience. Advertising data: We
          use Google AdWords to display ads on our website. AdWords uses cookies
          to track the effectiveness of our ads and to show you relevant ads
          based on your interests. for more info visit{' '}
          <a
            className="text-blue-500"
            href="http://www.google.com/policies/privacy/partners/"
          >
            {' '}
            How Google uses data when you use our partners’ sites or apps
          </a>
          <h2 className="font-bold text-2xl text-white py-4">
            How We Use Your Information
          </h2>
          We may use your personal information for the following purposes: To
          send you newsletters and other promotional materials. To respond to
          your comments and inquiries. To improve our website and marketing
          efforts. We will not sell or share your personal information with
          third parties for their marketing purposes without your consent.
          {/* <h2 className="font-bold text-2xl text-white py-4">
            You have the following choices regarding your personal information:
          </h2>
          You can opt out of receiving newsletters and other promotional
          materials by following the unsubscribe instructions in the emails we
          send you. You can opt out of personalized advertising by visiting the
          Google Ads Settings page. You can request to access, update, or delete
          your personal information by contacting us at info@barefootrecipe.com. */}
          <h2 className="font-bold text-2xl text-white py-4">
            Changes to Our Privacy Policy
          </h2>
          We may update our privacy policy from time to time. We will post any
          changes on this page, so please review it regularly.
          <h2 className="font-bold text-2xl text-white py-4">Contact Us</h2>
          If you have any questions about our privacy policy, please contact us
          at{' '}
          <a className="text-blue-500" href="mailto: ask@barefootrecipe.com.">
            ask@barefootrecipe.com.
          </a>
        </p>
        <Link
          href="/"
          className="font-bold text-xl md:text-2xl text-white hover:opacity-80 p-4"
        >
          Click Here to go back to the home page
        </Link>
      </div>
    </div>
  )
}
