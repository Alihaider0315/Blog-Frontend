import React from 'react'
import { IF } from '../url'

const HomePosts = ({post}) => {
  return (
    <div className='w-full flex mt-8 space-x-2'>
     <div className='w-[35%] aspect-w-4 aspect-h-3'>
    <img src={IF+post.photo} alt="" className='w-full h-full object-cover rounded-lg' />
  </div>
    <div className="flex flex-col w-[65%]">
    <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
    {post.title}
    </h1>
    <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
    <p>@ {post.username}</p>
    <div className="flex space-x-2 text-sm">
    <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
    <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
    </div>
    </div>
    <p>{post.desc.slice(0.200)+ "...Read More"}</p>
    </div>
    
    </div>
  )
}

export default HomePosts
