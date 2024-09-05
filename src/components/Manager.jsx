import React from 'react';
import { useRef, useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        else{
            toast('Error: Password not saved!');
        }
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.jpeg")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.jpeg";
            passwordRef.current.type = "text"
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right, #8080800a_1px, transparent_1px, linear-gradient(to_bottom, #8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]">
                </div>
            </div>
            <div className="p-3 md:mycontainer min-h-[84.5vh]">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-700 text-lg text-center'>Your own Password Manager</p>
                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' type="text" name="site" id="site" className='rounded-full border border-green-500 w-full p-4 py-1' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' type="text" name="username" id="username" className='rounded-full border border-green-500 w-full p-4 py-1' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' type="password" name="password" id="password" className='rounded-full border border-green-500 w-full p-4 py-1' />
                            <span className='absolute right-[3px]  top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 gap-2 border-2 border-green-900'>
                        {/* <lord-icon src="https://cdn.lordicon.com/zrkkrrpl.json" trigger="hover"></lord-icon> */}
                        <lord-icon
                            src="https://cdn.lordicon.com/zrkkrrpl.json"
                            trigger="hover"
                            colors="primary:#000000,secondary:#000000"
                            style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex justify-center items-center '>
                                            <a href="item.site" target='_blank'>{item.site}</a>
                                            <img className='w-7 cursor-pointer p-1' src="icons/copy.png" alt="" srcset="" onClick={() => { copyText(item.site) }} />
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            {item.username}
                                            <img className='w-7 cursor-pointer p-1' src="icons/copy.png" alt="" srcset="" onClick={() => { copyText(item.username) }} />
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            {item.password}
                                            <img className='w-7 cursor-pointer p-1' src="icons/copy.png" alt="" srcset="" onClick={() => { copyText(item.password) }} />
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <span className='cursor-pointer mx-2' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover"
                                                colors="primary:#121331,secondary:#000000"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-2' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/drxwpfop.json"
                                                trigger="hover"
                                                colors="primary:#121331,secondary:#000000"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>

            </div>

        </>
    )
}

export default Manager
