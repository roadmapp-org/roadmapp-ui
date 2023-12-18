import React from 'react';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getLevels } from "../../data/levels-slice";
import { ProjectFormComponent } from '../../components/config/project-form-component';
import { ProjectListComponent } from '../../components/config/project-list-component';


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
            <ProjectListComponent /> 
            <br></br>
            <ProjectFormComponent />
            <br></br>            
        </>
    );
}
