import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './data/login-slice'

export const NavBar = () => {

    const auth = useSelector((state) => state.user)
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickLogOut = () => {
        dispatch(logout());
        navigate(`/login`);
    }

    return (
        <>
        {auth.token && (
            <>
                <header className="bg-custom-black text-white shadow-lg w-full text-custom-white">
                    <nav className="container mx-auto px-6 py-3">
                        <div className="flex items-center justify-between">
                            <a href='/home' className='flex items-center'>
                                <img src="roadmap.png" className="w-10 h-10 rounded" />
                                <span className='text-2xl ml-3'>RoadmApp</span>
                            </a>
                            <div className="flex items-center space-x-6  ">
                                <Link className="hidden xs:block text-white hover:text-blue-300" to="/home">Home</Link>
                                <Link className="hidden xs:block text-white hover:text-blue-300" to="/config">Config</Link>
                                <button onClick={() => setIsOpen(!isOpen)} className="xs:hidden" id="menuBtn">
                                    <img src="white-menu.png" className="w-6 h-6 rounded" />
                                </button>
                                <button className="hidden xs:block bg-gray-800 text-white font-bold py-2 px-4 rounded" onClick={onClickLogOut}>
                                    <img src="logout.png" className="w-6 h-6 rounded" />
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className={`w-100 h-100 bg-custom-black text-custom-white ${isOpen ? 'block' : 'hidden'} block xs:hidden`} id="menu">
                    <a className="text-xl flex justify-end p-4 pr-10 border-t border-rose-500">
                        <span>Home</span>
                        <img src="home.png" className="w-6 h-6 rounded self-center ml-4" />
                    </a>
                    <a className="text-xl flex justify-end p-4 pr-10 border-t border-gray-300">
                        Config
                        <img src="config.png" className="w-6 h-6 rounded self-center ml-4" />
                    </a>
                    <a className="text-xl flex justify-end p-4 pr-10 border-t border-gray-300">
                        <span>Logout</span>
                        <img src="logout.png" className="w-6 h-6 rounded self-center ml-4" />
                    </a>
                </div>
            </>
        )}
        </>
    );

}