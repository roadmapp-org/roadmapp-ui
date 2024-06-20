import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './data/login-slice';
import { toogleShowBurgerMenu } from './data/layout-slice';
import { projectSelected } from './data/levels-slice'

export const NavBar = () => {
    
    const auth = useSelector((state) => state.user)
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showBurgerMenu = useSelector((state) => state.layout.showBurgerMenu);

    const onClickLogOut = () => {
        dispatch(toogleShowBurgerMenu(false));
        dispatch(logout());
        navigate(`/login`);
    }

    const onClickHome = () => {
        dispatch(toogleShowBurgerMenu(false));
        dispatch(projectSelected(0));
        navigate(`/home`);
    }

    return (
        <>
        {auth.token && (
            <>
                <header className="bg-custom-black shadow-lg w-full text-custom-white">
                    <nav className="container mx-auto px-6 py-3">
                        <div className="flex items-center justify-between">
                            <a href='/home' className='flex items-center'>
                                <img src="roadmap.png" className="w-10 h-10 rounded" />
                                <span className='text-2xl ml-3'>RoadmApp</span>
                            </a>
                            <div className="flex items-center space-x-6  ">
                                <Link className="hidden xs:block text-white hover:text-blue-300" to="/home">Home</Link>
                                <Link className="hidden xs:block text-white hover:text-blue-300" to="/config">Config</Link>
                                <button onClick={() => dispatch(toogleShowBurgerMenu())} className="xs:hidden" id="menuBtn">
                                    <img src="white-menu.png" className="w-6 h-6 rounded" />
                                </button>
                                <button className="hidden xs:block bg-gray-800 text-white font-bold py-2 px-4 rounded" onClick={onClickLogOut}>
                                    <img src="logout.png" className="w-6 h-6 rounded" />
                                </button>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className={`w-100 h-100 bg-custom-black text-custom-white ${showBurgerMenu ? 'block' : 'hidden'}`} id="menu">
                    <Link to="/home" onClick={() => dispatch(toogleShowBurgerMenu(false))}>
                        <div className="text-xl flex justify-end p-4 pr-10 border-t border-gray-300">
                            <span>Home</span>
                            <img src="home.png" className="w-6 h-6 rounded self-center ml-4" />
                        </div>
                    </Link>
                    <Link to="/config" onClick={() => dispatch(toogleShowBurgerMenu(false))}>
                        <div className="text-xl flex justify-end p-4 pr-10 border-t border-gray-300">
                            <span>Config</span>
                            <img src="config.png" className="w-6 h-6 rounded self-center ml-4" />
                        </div>
                    </Link>
                    <a className="text-xl flex justify-end p-4 pr-10 border-t border-gray-300" onClick={onClickLogOut}>
                        <span>Logout</span>
                        <img src="logout.png" className="w-6 h-6 rounded self-center ml-4" />
                    </a>
                </div>
            </>
        )}
        </>
    );

}