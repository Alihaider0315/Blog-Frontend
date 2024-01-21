import React, { useContext, useEffect, useState } from 'react'
import HomePosts from '../components/HomePosts'
import axios from 'axios'
import {URL} from "../url"
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { Usercontext } from '../context/Usercontext'

const Home = () => {
  const {search} = useLocation()
  const [posts,setPosts] = useState([])
  const [noResults , setNoResults] = useState(false)
  const [loader , setloader] = useState(false)
  const {user} = useContext(Usercontext)
  // console.log(user);
  const fetchPosts = async()=>{
    setloader(true)
    try{
      const res = await axios.get(URL+"/api/posts/"+search)
      setPosts(res.data)
      if(res.data.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setloader(false)
    }
    catch(err){
      console.log(err);
      setloader(true)
    }
  }
  useEffect(()=>{
    fetchPosts();
  },[search])
  return (
    <div className='px-8 md:px-[200px] min-h-[80vh]'>
    {loader ? (
      <div className='h-[100vh] flex justify-center items-center'>
        <Loader />
      </div>
    ) : !noResults ? (
      posts.map((post) =>(
        <>
        <Link to={user?`/posts/post/${post._id}`:"/login"}>
        <HomePosts key={post._id} post={post} />
        </Link>
        </>
      ) )
    ) : (
      <h3 className='text-center font-bold mt-16'>Sorry, No Post Found</h3>
    )}
  </div>
);
};

export default Home
