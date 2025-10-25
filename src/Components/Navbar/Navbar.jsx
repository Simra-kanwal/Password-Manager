import React from 'react'
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
    
  return (
    <nav  className='flex justify-around items-center bg-indigo-950'>
        <div className="logo px-4 py-3 font-bold cursor-pointer text-2xl text-white">
            <span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span>
        </div>
        <div className='bg-green-500 px-1 py-1 text-white rounded-2xl font-bold border-2 border-white cursor-pointer flex gap-5'>
            <FaGithub className='text-3xl'/>  
            <button>Github</button>
        </div>
    </nav>
  )
}

export default Navbar
