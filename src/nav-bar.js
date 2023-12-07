import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import {logout, loggedUser} from './data/slices/login-slice'

export const NavBar = () => {
    
    //const userToken = useSelector(state => state.auth.user.token);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClick = () => {
        dispatch(logout());
        navigate(`/login`);
    }

    return (
        <>
            { loggedUser && (
                <>
                    <h1>{loggedUser}</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/articles">Articles</Link></li>
                        </ul>
                        <div className="nav-right">
                            <button onClick={onClick}>Log Out</button>
                        </div>
                    </nav>
                </>
            )}
        </>
    );

}