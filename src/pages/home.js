import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../data/slices/login-slice'

export const Home = () => {

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
            <h1>Welcome</h1>
            <button onClick={onClick}> Click </button>
            <button onClick={onClickLogOut}> Logout </button>
        </div>
    );
}