import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LogListComponent } from '../../components/logs/log-list-component';

export const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <h2>Ultimos logs</h2>
            <LogListComponent/>
        </>
    );
}