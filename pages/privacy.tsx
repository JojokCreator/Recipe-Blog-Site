import Link from 'next/link'

export default function FourOhFour() {
  return <div className="flex items-center justify-center h-80 flex-col mt-60">
    <div className=" bg-black p-6 bg-opacity-50 rounded-lg">
    <h1 className="font-bold text-4xl text-white p-4">Privacy Policy</h1>
    <p className="font-bold text-xl text-white p-4">
    Privacy Policy

At Barefoot Chef, we are committed to protecting your privacy. This privacy policy explains how we collect, use, and share your personal information when you visit our website, www.barefootrecipe.com.

Information We Collect

We may collect the following types of information when you visit our website:

Personal information: We may collect your name, email address, and other personal information when you sign up for our newsletter, leave a comment, or contact us through our website.

Analytics data: We use Google Analytics to track visitors to our website. This includes information about your location, device, and browsing habits. We use this information to understand how our website is being used and to improve the user experience.

Advertising data: We use Google AdWords to display ads on our website. AdWords uses cookies to track the effectiveness of our ads and to show you relevant ads based on your interests. You can opt out of personalized advertising by visiting the Google Ads Settings page.

How We Use Your Information

We may use your personal information for the following purposes:

To send you newsletters and other promotional materials.
To respond to your comments and inquiries.
To improve our website and marketing efforts.
We will not sell or share your personal information with third parties for their marketing purposes without your consent.

Your Choices

You have the following choices regarding your personal information:

You can opt out of receiving newsletters and other promotional materials by following the unsubscribe instructions in the emails we send you.
You can opt out of personalized advertising by visiting the Google Ads Settings page.
You can request to access, update, or delete your personal information by contacting us at info@barefootrecipe.com.
Changes to Our Privacy Policy

We may update our privacy policy from time to time. We will post any changes on this page, so please review it regularly.

Contact Us

If you have any questions about our privacy policy, please contact us at info@barefootrecipe.com.

This privacy policy was last updated on December 1, 2022.
    </p>
    <Link href="/">
      <a className="font-bold text-2xl text-white hover:opacity-80 p-4">
        Click Here to go back to the home page
      </a>
    </Link>
    </div>
  </div>
}