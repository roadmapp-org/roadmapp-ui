import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LogListComponent } from '../../components/logs/log-list-component';
import { useEffect } from 'react';
import { LogFilterComponent } from '../../components/logs/log-filter-component';
import { getLevels } from "../../data/levels-slice";
import { getLogs } from "../../data/log-slice"
import { LogCreateForm } from '../../components/logs/log-create-form';

export const Home = () => {
    
    const levelsStatus = useSelector(state => state.levels.status)
    const dispatch = useDispatch();

    useEffect(() => {
        if (levelsStatus === 'idle') {
          dispatch(getLevels())
        }
      }, [])

    useEffect(() => {
      if (levelsStatus === 'idle') {
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