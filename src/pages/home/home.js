import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LogListComponent } from '../../components/logs/log-list-component';
import { useEffect } from 'react';
import { getLevels } from './log-level-slice';

export const Home = () => {

    const dispatch = useDispatch();
    const projectsStatus = useSelector(state => state.logLevel.status)
    const projects = useSelector((state) => state.logLevel.projects)
    const tasks = useSelector((state) => state.logLevel.tasks)
    const subtasks = useSelector((state) => state.logLevel.subtasks)

    useEffect(() => {
        if(projectsStatus === 'idle') {
            dispatch(getLevels())
        }
    }, [projects])

    return (
        <>
            <h1>Home</h1>
            <select>
                {
                    projects.map((item, index) => (
                        <option value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            <h2>Ultimos logs</h2>
            {
            /*
                <LogListComponent/>
            */
            }
        </>
    );
}