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
            <header className="bg-cyan-900 text-white shadow w-full">
                <nav className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <a href='/home'><img src="roadmap.png" className="w-10 h-10 rounded" /></a>
                            <Link className="text-white hover:text-blue-300" to="/home">Home</Link>
                            <Link className="text-white hover:text-blue-300" to="/config">Config</Link>
                        </div>
                        <div>
                            <button 
                                className="bg-gray-800 text-white font-bold py-2 px-4 rounded" 
                                onClick={onClickLogOut}
                            >
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