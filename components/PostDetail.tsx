import React from 'react'
import moment from 'moment'
import Image from 'next/image'

interface Props {
  post: {
    title: string
    excerpt: string
    featuredImage: { url: string }
    slug: string
    createdAt: string
    author: { name: string; photo: { url: string } }
    categories: { name: string; slug: string }[]
    content: { raw: { children: { type: string; children: any }[] } }
  }
}

const PostDetail = ({ post }: Props) => {
  const getContentFragment = (index: any, text: any, obj: any, type: any) => {
    let modifiedText = text
    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>
      }
      if (obj.href) {
        modifiedText = (
          <a href={obj.href} key={index}>
            {obj.children[0].text}
          </a>
        )
      }
      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>
      }
      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>
      }
    }

    switch (type) {
      case 'heading-two':
        return (
          <h2 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h2>
        )
      case 'heading-two':
        return (
          <h2 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h2>
        )
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        )
      case 'heading-three':
        return (
          <h3 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )
      case 'iframe':
        return (
          <iframe
            className="w-[100%] h-[100%] aspect-video"
            key={index}
            src={obj.url}
            width={obj.width}
            height={obj.height}
          ></iframe>
        )
      case 'image':
        return (
          <Image
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
            className="p-2"
          />
        )
      default:
        return modifiedText
    }
  }
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative flex justify-center overflow-hidden shadow-md">
          <Image
            src={post.featuredImage.url}
            height="400"
            width="640"
            priority={true}
            alt={post.title}
            className="shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <Image
                alt={post.author.name}
                height="30"
                width="30"
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                {post.author.name}
              </p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map(
              (item: any, itemindex: number) =>
                getContentFragment(itemindex, item.text, item, null)
            )

            return getContentFragment(index, children, typeObj, typeObj.type)
          })}
        </div>
      </div>
    </>
  )
}

export default PostDetail
