import React from 'react'
import fileService from '../appwrite/file'
import { Link } from 'react-router-dom'


// this component is a card of our post we see on our home screen when we log in clicking on which we can see the whole post
function PostCard({
    $id, title, featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {/* getFilePreview returns the image url to use after passing the image id */}
                <img src={fileService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'>{title}</h2>

        </div>
    </Link>
  )
}

export default PostCard
