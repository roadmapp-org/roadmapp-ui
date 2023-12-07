import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import {logout, selectCurrentUser } from './data/slices/login-slice'

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
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/articles">Articles</Link></li>
                </ul>
                <div className="nav-right">
                    <button onClick={onClickLogOut}>Log Out</button>
                </div>
            </nav>
        )}
        </>
    );

}