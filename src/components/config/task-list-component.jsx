import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskListItemComponent } from './task-list-item-component'
import { projectSelected } from '../../data/levels-slice'

export const TaskListComponent = () => {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.levels.projects)
    const tasks = useSelector((state) => state.levels.tasks)
    const [filteredTask, setFilteredTasks] = useState([]);
    const selectedProject = useSelector((state) => state.levels.selectedProject)

    const onSelectProject = (e) => {
        if(e.target.value !== "0") {
            setFilteredTasks(tasks.filter((item) => item.project_id.toString() === e.target.value))
            dispatch(projectSelected(e.target.value))
        } else {
            setFilteredTasks(tasks)
        }
    }

    useEffect(() => {
        if(selectedProject === "0")
            setFilteredTasks(tasks)
        else
            setFilteredTasks(tasks.filter((item) => item.project_id.toString() === selectedProject))
    }, [tasks, selectedProject])

    return (
        <>
        <select onChange={onSelectProject}>
            <option value="0" key={0}>All</option>
            {projects.map((project) => (
                <option value={project.id} key={project.id}>{project.name}</option>
            ))}
        </select>
        <br></br>
        <table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Task</th>
                        <th colSpan={4}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredTask.map((task,index) => (
                            <TaskListItemComponent task={task} key={task.id}/>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}