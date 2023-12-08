import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Home</h1>
            <h2>Ultimos logs</h2>
            <div>

            </div>
        </div>
    );
}