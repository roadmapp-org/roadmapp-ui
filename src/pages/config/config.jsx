import React from 'react';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getLevels } from "../../data/levels-slice";
import { ProjectComponent } from '../../components/config/project-component.jsx';
import { TaskComponent } from '../../components/config/task-component.jsx';


export const Config = () => {
    const dispatch = useDispatch();
    const levelsStatus = useSelector(state => state.levels.status)

    useEffect(() => {
        if (levelsStatus === 'idle') {
          dispatch(getLevels())
        }
      }, [])

    return (
        <>
          <h1>Config</h1>
          <ProjectComponent />
          <TaskComponent />
        </>
    );
}
