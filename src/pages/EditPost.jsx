import React, { useContext, useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im';
import axios from 'axios'
import {URL} from '../url'
import { useNavigate, useParams } from 'react-router-dom'
import { Usercontext } from '../context/Usercontext';
const EditPost = () => {

  const postId = useParams().id
  const [title , setTitle] = useState('');
  const {user} = useContext(Usercontext)
  const navigate = useNavigate()
  const [desc , setDesc] = useState('');
  const [file , setFile] = useState(null);
  const [cat, setCat] = useState('');
  const [cats, setCats] = useState([]);

  const fetchPost = async() =>{
    try{
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setCats(res.data.categories)
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchPost()
  },[postId])
  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat('');
    setCats(updatedCats);
  };

  const handleUpdate= async(e)=> {
    e.preventDefault()
    const post={
      title , desc , username:user.username, userId:user._id, categories:cats
    }
    if(file){
      const data = new FormData()
      const filename = Date.now()+file.name
      data.append("img",filename)
      data.append("file",file)
      post.photo = filename 

      try{
        const imgUpload = await axios.post(URL+"/api/upload",data)
        console.log(imgUpload.data)
    }
    catch(err){
      console.log(err);
    }

    }
    try{
      const res = await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
      // console.log(res.data)
      navigate("/posts/post/"+res.data._id)
    }
    catch(err){
      console.log(err)
    }
    
  }
  return (
    <div>
    <div className='px-6 md:px-[200px] mt-8'>
      <h1 className='font-bold md:text-2xl text-xl '>Update Post</h1>
      <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
        <input type='text' onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Enter post title' className='px-4 py-2 outline-none border rounded-md' />
        <input type='file' onChange={(e)=>setFile(e.target.files[0])} className='px-4' />
        <div className='flex flex-col'>
          <div className='flex items-center space-x-4 md:space-x-8'>
            <input value={cat} onChange={(e) => setCat(e.target.value)} className='px-4 py-2 outline-none border rounded-md' placeholder='Enter post category' type='text' />
            <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer'>
              Add
            </div>
          </div>

          {/* categories */}
          <div className='flex px-4 mt-3'>
            {cats?.map((c, i) => (
              <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                <p>{c}</p>
                <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'>
                  <ImCross />
                </p>
              </div>
            ))}
          </div>
        </div>
        <textarea  onChange={(e)=>setDesc(e.target.value)} value={desc}  rows={15} cols={30} className='px-4 py-2 outline-none border rounded-md' placeholder='Enter post description' />
        <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg'>Update</button>
      </form>
    </div>
  </div>
  )
}

export default EditPost
