import {Link,useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {logout} from '../data/slices/login-slice'
import { useState } from 'react';

export const Home = () => {

    const [user, setUser] = useState("Tobi")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onClick = () => {
        
    }

    const onClickLogOut = () => {
        dispatch(logout());
        navigate(`/login`);
    }

    return (
        <div>
            <h1>Welcome {user}</h1>
            <button onClick={onClick}> Click </button>
            <button onClick={onClickLogOut}> Logout </button>
        </div>
    );
}