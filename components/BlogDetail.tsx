import React from 'react'
import moment from 'moment'
import Image from 'next/legacy/image'

interface Props {
  blog: {
    title: string
    excerpt: string
    slug: string
    createdAt: string
    content: { raw: { children: { type: string; children: any }[] } }
  }
}

const BlogDetail = ({ blog }: Props) => {
  const getContentFragment = (index: any, text: any, obj: any, type: any) => {
    let modifiedText = text

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>
      }
    }

    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        )
      case 'heading-four':
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item: any, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        )
      case 'iframe':
        return (
          <iframe
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
          {/* <Image
            src={blog.featuredImage.url}
            height="400"
            width="640"
            priority={true}
            alt=""
            className="shadow-lg rounded-t-lg lg:rounded-lg"
          /> */}
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              {/* <Image
                alt={blog.author.name}
                height="30"
                width="30"
                className="align-middle rounded-full"
                src={blog.author.photo.url}
              /> */}
              {/* <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                {blog.author.name}
              </p> */}
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
                {moment(blog.createdAt).format('MMM DD, YYYY')}
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{blog.title}</h1>
          {blog.content.raw.children.map((typeObj, index) => {
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

export default BlogDetail
