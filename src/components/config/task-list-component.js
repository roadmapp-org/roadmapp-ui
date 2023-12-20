import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ProjectListItemComponent } from './project-list-item'
import { TaskListItemComponent } from './task-list-item-component'

export const TaskListComponent = () => {
    const projects = useSelector((state) => state.levels.projects)
    const tasks = useSelector((state) => state.levels.tasks)
    const [filteredTask, setFilteredTasks] = useState([]);

    const onSelectProject = (e) => {
        if(e.target.value !== "0") {
            setFilteredTasks(tasks.filter((item) => item.project_id.toString() === e.target.value))
        } else {
            setFilteredTasks(tasks)
        }
    }

    useEffect(() => {
        setFilteredTasks(tasks)
    }, [tasks])

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