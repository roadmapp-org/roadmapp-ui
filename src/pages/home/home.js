import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LogListComponent } from '../../components/logs/log-list-component';
import { useEffect } from 'react';
import { LogFilterComponent } from '../../components/logs/log-filter-component';
import { getHome } from "../../pages/home/home-slice";

export const Home = () => {
    
    const homeStatus = useSelector(state => state.home.status)
    const dispatch = useDispatch();

    useEffect(() => {
        if (homeStatus === 'idle') {
          dispatch(getHome())
        }
      }, [])

    return (
        <>
            <LogFilterComponent/>    
            <h2>Ultimos logs</h2>
            {
                <LogListComponent/>
            }
        </>
    );
}