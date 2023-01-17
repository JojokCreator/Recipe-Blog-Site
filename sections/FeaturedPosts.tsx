'use client'

import { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { ArrowProps } from 'react-multi-carousel/lib/types'
import { FeaturedPostCard } from '../components'
import { getFeaturedPosts } from '../services'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
}

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result!)
      setDataLoaded(true)
    })
  }, [])

  const CustomLeftArrow = ({ onClick }: ArrowProps) => {
    return (
      <button onClick={onClick}>
        <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white float-right"
            width="10.605"
            height="15.555"
          >
            <path
              fill="#ffff"
              d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z"
            />
          </svg>
        </div>
      </button>
    )
  }

  const CustomRightArrow = ({ onClick }: ArrowProps) => {
    return (
      <button onClick={onClick}>
        <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            width="10.605"
            height="15.555"
          >
            <path
              fill="#ffff"
              d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"
            />
          </svg>
        </div>
      </button>
    )
  }

  return (
    <div className="mb-8">
      <Carousel
        infinite
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded &&
          featuredPosts.map((post, index) => (
            <FeaturedPostCard key={index} post={post} />
          ))}
      </Carousel>
    </div>
  )
}

export default FeaturedPosts
