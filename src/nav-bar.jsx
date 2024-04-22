import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './data/login-slice'

export const NavBar = () => {

    const auth = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickLogOut = () => {
        dispatch(logout());
        navigate(`/login`);
    }

    return (
        <>
        {auth.token && (
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
                        </div>
                        <div>
                            <a href='/home' className="xs:hidden">
                                <img src="white-menu.png" className="w-6 h-6 rounded" />
                            </a>
                            <button className="hidden xs:block bg-gray-800 text-white font-bold py-2 px-4 rounded" onClick={onClickLogOut}>
                                Log Out
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
        )}
        </>
    );

}