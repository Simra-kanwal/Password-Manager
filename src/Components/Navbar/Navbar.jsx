import { useState } from 'react'
import { FaGithub } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


const Navbar = () => {

  const [lightmode, setmode] = useState(true);

  const handleToggle = () => {
    const htmlElement = document.documentElement;
    const newMode = !lightmode;
    setmode(newMode);
    if (newMode) {
      htmlElement.classList.remove('dark');
    } else {
      htmlElement.classList.add('dark');
    }
  }

  return (
    <nav className='flex justify-between px-20 items-center bg-indigo-950'>
      <div className="logo px-4 py-3 font-bold cursor-pointer text-2xl text-white">
        <span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span>
      </div>
      <div className="flex justify-center items-center gap-7">
        <div className='bg-green-500 px-1 py-1 text-white rounded-2xl font-bold border-2 border-white cursor-pointer flex gap-5'>
          <FaGithub className='text-3xl' />
          <a href='https://github.com/Simra-kanwal/Password-Manager' target='_blanck'><button>Github</button></a>
        </div>
        <div className="button text-white" onClick={handleToggle}>
          {lightmode ?  <MdDarkMode style={{fontSize:"30px",cursor:"pointer"}}/>:
          <MdLightMode style={{fontSize:"30px",cursor:"pointer"}}/>
          }
         
        </div>
      </div>
    </nav>
  )
}

export default Navbar
