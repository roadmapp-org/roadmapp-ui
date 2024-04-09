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
        
            <nav>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/config">Config</Link></li>
                </ul>
                <div className="nav-right">
                    <button onClick={onClickLogOut}>Log Out</button>
                </div>
            </nav>
        )}
        </>
    );

}