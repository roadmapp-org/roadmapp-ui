import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LogListComponent } from '../../components/logs/log-list-component';
import { useEffect } from 'react';
import { LogFilterComponent } from '../../components/logs/log-filter-component';
import { getLevels } from "../../data/levels-slice";
import { getLogs } from "../../data/log-slice"
import { LogCreateForm } from '../../components/logs/log-create-form';

export const Home = () => {
    
    const homeStatus = useSelector(state => state.home.status)
    const dispatch = useDispatch();

    useEffect(() => {
        if (homeStatus === 'idle') {
          dispatch(getLevels())
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