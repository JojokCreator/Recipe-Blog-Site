import Image from 'next/image'

export const metadata = {
  alternates: { canonical: 'https://barefootrecipe.com/about' },
  title: 'About - Barefoot Recipes Site',
}

export default function About() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className=" bg-black bg-opacity-80 rounded-lg text-white p-4">
          <h1 className="text-4xl font-bold mb-8">About Barefoot Chef</h1>
          <Image
            src="/logo.png"
            width={150}
            height={150}
            alt="Barefoot Chef"
            className="rounded-lg mb-8 mx-auto"
          />

          <p className="mb-4 text-xl">
            Barefoot Chef is a YouTuber, homebrewer, and chef specializing in
            Asian cooking and fermentation. Barefoot Chef brings authentic
            flavors and techniques to your kitchen with his easy-to-follow
            recipes and informative videos.
          </p>

          <p className="mb-4 text-xl">
            Whether you&apos;re an experienced cook or just starting out,
            Barefoot Chef&apos;s recipes are designed to be approachable and
            achievable. From classic dishes like fried noodles and sushi, to
            lesser-known specialties like kimchi and rice wine, Barefoot
            Chef&apos;s videos will take you on a culinary journey through Asia
            and beyond.
          </p>

          <p className="mb-4 text-xl">
            Follow Barefoot Chef on YouTube, Instagram, and Twitter for new
            recipes, tips, and updates.
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Meet the Barefoot Chef</h2>
            <p className="mb-4 text-xl">
              Born and raised in the UK, but then spending the last 15 years
              living in Asia, where he developed a love for cooking and
              fermentation. After studying culinary school, Barefoot Chef wants
              to share his passion with the world.
            </p>

            <p className="mb-4 text-xl">
              When he&apos;s not cooking or brewing, Barefoot Chef can be found
              exploring the great outdoors, travelling, practicing guitar, and
              spending time with his family and friends.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
