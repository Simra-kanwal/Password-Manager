import React from 'react'

const Passwords = ({ passwords, data, setData, setWebName, setUserName, setPassword }) => {

    const { id, webName, userName, password } = passwords;

    const handleRemoveItems = async() => {
        const con = confirm('Do you want to delete this password?');
        if (con) {
            let req = await fetch('http://localhost:3000/', {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, webName, userName, password })
            });
            let res = await req.json();
            let update = data.filter((currElem) => currElem.id !== id)
            setData(update)
        }
    }

    // function for copy password
    const handleCopy = (text, e) => {
        navigator.clipboard.writeText(text)
        e.target.src = 'tick.svg';
        setTimeout(() => {
            e.target.src = 'copy.svg'
        }, 1000);
    }

    //function for edit password
    const handleEdit = async() => {
        const updatedData = data.filter(item => item.id === id);
        setWebName(updatedData[0].webName)
        setUserName(updatedData[0].userName)
        setPassword(updatedData[0].password)
        let req = await fetch('http://localhost:3000/', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, webName, userName, password })
        });
        let res = await req.json();
        let remove = data.filter((currElem) => currElem.id !== id)
        setData(remove)
    }

    return (

        <>
            <div id="content" className="text-lg font-bold bg-green-100 flex justify-between items-center px-4 py-4 rounded min-w-[600px] md:min-w-full">
                <div className='w-[40%] flex justify-center items-center gap-2'>
                    <h1><a href={`https://www.${webName}.com`} target='_blank'>{webName}</a></h1>
                    <img src="copy.svg" alt="copy-icon" style={{ width: '23px', height: '20px', cursor: 'pointer', marginLeft:"8px" }} onClick={(e) => handleCopy(webName, e)} />
                </div>

                <div className='w-[20%] flex justify-center items-center gap-2'>
                    <h1>{userName}</h1>
                    <img src="copy.svg" alt="copy-icon" style={{ width: '23px', height: '20px', cursor: 'pointer', marginLeft:"8px"}} onClick={(e) => handleCopy(userName, e)} />
                </div>

                <div className='w-[20%] flex justify-center items-center gap-2'>
                    <h1>{'*'.repeat(password.length)}</h1>
                    <img src="copy.svg" alt="copy-icon" style={{ width: '23px', height: '20px', cursor: 'pointer', marginLeft:"8px" }} onClick={(e) => handleCopy(password, e)} />
                </div>

                <div className='w-[20%] flex justify-center gap-3' >
                    <div onClick={handleEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" style={{ cursor: 'pointer' }} viewBox="0 -960 960 960" width="24px" fill="#46152F"><path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" /></svg>
                    </div>
                    <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                        onClick={handleRemoveItems}>
                    </lord-icon>
                </div>
            </div>
            <hr />
        </>
    )
}

export default Passwords
