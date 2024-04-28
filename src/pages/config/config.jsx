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
        <div className="bg-custom-grey py-5 h-auto flex justify-center min-h-screen">
          <div className='flex flex-col w-5/6 sm:w-3/4 md:w-1/2'>
            <h1 className='text-3xl mb-5'>Configuration</h1>
            <ProjectComponent />
            {/*<TaskComponent />*/}
          </div>
        </div>
    );
}
