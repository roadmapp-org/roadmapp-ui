import React from 'react';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getHome } from "../../pages/home/home-slice";


export const Config = () => {
    const dispatch = useDispatch();
    const homeStatus = useSelector(state => state.home.status)
    const projects = useSelector((state) => state.home.projects)

    useEffect(() => {
        if (homeStatus === 'idle') {
          dispatch(getHome())
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
            <input type="text" placeholder="New Project Name" />
            <button>Add Project</button>
            <h2>Disabled projects</h2>
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
