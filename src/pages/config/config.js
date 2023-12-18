import React from 'react';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getLevels } from "../../data/levels-slice";
import { ProjectFormComponent } from '../../components/config/project-form-component';


export const Config = () => {
    const dispatch = useDispatch();
    const levelsStatus = useSelector(state => state.levels.status)
    const projects = useSelector((state) => state.levels.projects)

    useEffect(() => {
        if (levelsStatus === 'idle') {
          dispatch(getLevels())
        }
      }, [])

    return (
        <>
            <h1>Config</h1>
            <h2>Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // filter enabled projects
                        projects.filter(project => project.active === true).map((project) => (
                            <tr>
                                <td>{project.name}</td>
                                <td>Edit | Disable</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <ProjectFormComponent />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.filter(project => project.active === false).map((project) => (
                            <tr>
                                <td>{project.name}</td>
                                <td>Edit | Disable</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}
