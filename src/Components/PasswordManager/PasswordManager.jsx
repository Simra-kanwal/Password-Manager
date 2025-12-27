import React, { useId, useState, useEffect, useRef } from 'react'
import Passwords from './Passwords'
import { ToastContainer, toast } from 'react-toastify';

const PasswordManager = () => {

    const [webName, setWebName] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [search, setsearch] = useState('')


    //Stores all data
    const [data, setData] = useState([])

    // generate a unique id for each password entry
    const id = useId() + Math.random().toFixed(4);

    // function to handle the password submission
    const handlePasswords = async () => {

        if (!webName || !userName || !password) {
            toast('Please fill all the Fields', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else {
            let req = await fetch('http://localhost:3000/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id ,webName, userName, password })
            });
            let res = await req.json();

            setData((pre) => ([...pre, { id, webName, userName, password }]))
            setWebName("")
            setUserName("")
            setPassword("")

            toast('Password saved!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    
    //fectch passwords from backend
    const getData = async () => {
        let req = await fetch('http://localhost:3000/')
        let res = await req.json()
        setData(res)
    }

    useEffect(() => {
        getData();
    },[])


    //Show password
    const [passwordType, setpasswordType] = useState('password')
    const ref = useRef();
    const showPassword = () => {
        if(ref.current.src.includes('eye.png')){
            ref.current.src = 'hidden.png'
            setpasswordType('text');
        }
        else {
            setpasswordType('password')
            ref.current.src = 'eye.png'
        }
    }

    // searching for passwords
    const displayed = search.trim() === '' ? data
        : data.filter((item) => {
            return (
                item.webName.toLowerCase().includes(search.toLowerCase()) ||
                item.userName.toLowerCase().includes(search.toLowerCase())
            );
        });

    return (
        <>
            {/* React tostify */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className='bg-green-50 pb-9  min-h-[92vh] dark:bg-[#243B55] dark:text-white'>

                <div className='text-center pt-9 w-[80vw] mx-auto'>
                    <div id="heading">
                        <h1 className='text-4xl font-bold'>
                            <span className='text-green-500'>&lt;</span>
                            Pass
                            <span className='text-green-500'>OP/&gt;</span>
                        </h1>
                        <p className='text-xl font-semibold mt-3'>Securely store and manage your passwords with ease.</p>
                    </div>

                    <div className="inputs mt-12">
                        <input
                            type="text"
                            value={webName}
                            onChange={(e) => setWebName(e.target.value)}
                            placeholder='Enter Website Name'
                            className='w-full px-3 py-2 rounded-2xl outline-none font-semibold border-2 border-green-500'
                        />
                        <div className="relative sm:flex items-center justify-between mt-7">
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder='Enter UserName'
                                className='w-full sm:w-[60%] px-3 py-2 rounded-2xl outline-none font-semibold border-2 border-green-500'
                            />
                            <input
                                type={passwordType}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter Password'
                                className='mt-7 w-full sm:mt-0 sm:w-[37%] px-3 py-2 rounded-2xl outline-none font-semibold border-2 border-green-500'
                            />
                            <img src="eye.png"  ref={ref} alt="eye-icon" className='absolute right-2 bottom-2.5 cursor-pointer dark:invert' width={23} onClick={showPassword} />
                        </div>
                    </div>

                    <button
                        type='button'
                        onClick={handlePasswords}
                        className="flex justify-center items-center gap-2 mt-7 bg-green-500 border-2 border-white dark:border-none text-white w-28 mx-auto cursor-pointer py-2 rounded-full hover:bg-green-400"
                    >
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            style={{ width: '25px', height: '25px' }}>
                        </lord-icon>
                        <span className='text-lg font-semibold'>Save</span>
                    </button>

                    {/* Passwords Section */}
                    <div className="lists text-start mt-5">
                        <div className="flex justify-between items-center flex-col gap-2 md:flex-row">
                            <h1 className='text-2xl font-bold'> Your Passwords </h1>
                            <input 
                            value={search} 
                            className='border-2 border-green-500 outline-none px-2 py-0.5 rounded' type="text" 
                            placeholder="Search"
                            onChange={(e) => setsearch(e.target.value)}
                            />
                        </div>
                        <div className={`${displayed.length === 0 ? 'block' : 'hidden'} mt-5`}>No Passwords</div>
                    </div>

                    <div className={`${displayed.length === 0 ? "hidden" : "block"}  mt-7`}>
                        <div className="overflow-x-auto max-w-full">
                            <div className="header bg-green-700 text-white font-bold flex justify-between items-center px-4 py-2 rounded min-w-[600px] md:min-w-full">
                                <h1 className="w-[40%]">Site</h1>
                                <h1 className="w-[20%]">Username</h1>
                                <h1 className="w-[20%]">Password</h1>
                                <h1 className="w-[20%]">Actions</h1>
                            </div>
                        </div>

                    </div>

                    <div className='overflow-x-auto min-w-full'>
                        {displayed.map((currElem) => {
                            if (!currElem || !currElem.id) return null;
                            return <ul key={currElem.id}>
                                <li>
                                    <Passwords passwords={currElem} data={data} setData={setData} setWebName={setWebName} setUserName={setUserName} setPassword={setPassword} />
                                </li>
                            </ul>
                        })}
                    </div>

                </div>
            </div>
        </>
    )
}

export default PasswordManager
