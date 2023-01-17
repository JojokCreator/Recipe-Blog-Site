'use client'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { getComments } from './../services/index'

type CommentsProps = {
  slug: string
}

type comment = {
  name: string
  createdAt: string
  comment: string
}

const Comments = ({ slug }: CommentsProps) => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    getComments(slug).then((result) => setComments(result))
  }, [slug])

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
          <h3 className="text-xl mb-8 font-semibold border-b pb-4">
            {comments.length} Comments
          </h3>
          {comments.map((comment: comment) => (
            <div
              key={comment.createdAt}
              className="border-b border-gray-100 mb-4 pb-4"
            >
              <p className="mb-4">
                <span className="font-semibold">{comment.name}</span> on{' '}
                {moment(comment.createdAt).format('MMM DD, YYYY')}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Comments
