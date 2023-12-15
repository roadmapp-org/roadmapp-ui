import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LogListComponent } from '../../components/logs/log-list-component';
import { useEffect } from 'react';
import { LogFilterComponent } from '../../components/logs/log-filter-component';
import { getHome } from "../../pages/home/home-slice";
import { getLogs } from '../../components/logs/log-slice';
import { LogCreateForm } from '../../components/logs/log-create-form';

export const Home = () => {
    
    const homeStatus = useSelector(state => state.home.status)
    const dispatch = useDispatch();

    useEffect(() => {
        if (homeStatus === 'idle') {
          dispatch(getHome())
        }
      }, [])

    useEffect(() => {
      if (homeStatus === 'idle') {
        dispatch(getLogs())
      }
    }, [])

    return (
        <>
            <LogFilterComponent/>
            <br></br>
            <LogCreateForm/>
            <br></br>
            <LogListComponent/>
        </>
    );
}