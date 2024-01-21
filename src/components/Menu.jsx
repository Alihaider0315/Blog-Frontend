import React, { useContext } from 'react'
import { Usercontext } from '../context/Usercontext'
import axios from 'axios';
import { URL } from '../url';
import { Link } from 'react-router-dom';

const Menu = () => {
    const {user} = useContext(Usercontext);
    const {setUser} = useContext(Usercontext);
    
    const handleLogout = async()=>{
      try{
        const res = await axios.get(URL+"/api/auth/logout",{withCredentials:true})
        console.log(res);
        setUser(null)
      }
      catch(err){
        console.log(err);
      }
    }
  return (
    <div className='bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4'>
        {!user && <h3 className='text-white text-sm hover:text-grey-500 cursor-pointer'><Link to="/">Login</Link></h3>}
        {!user && <h3 className='text-white text-sm hover:text-grey-500 cursor-pointer'><Link to="/register">Register</Link></h3> }
        {user && <h3 className='text-white text-sm hover:text-grey-500 cursor-pointer'><Link to={"/profile/"+user._id}>Profile</Link></h3>}
        {user && <h3 className='text-white text-sm hover:text-grey-500 cursor-pointer'><Link to="/write">Write</Link></h3> }
        {user && <h3 className='text-white text-sm hover:text-grey-500 cursor-pointer'><Link to={"/myblogs/"+user._id}>My Blogs</Link></h3>}
        {user && <h3 onClick={handleLogout} className='text-white text-sm hover:text-grey-500 cursor-pointer'><Link to="">Logout</Link></h3> }
    </div>
    
  )
}

export default Menu