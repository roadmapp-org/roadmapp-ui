import React from 'react'
import { useSelector } from 'react-redux'
import { ProjectListItemComponent } from './project-list-item'
import { TaskListItemComponent } from './task-list-item-component'

export const TaskListComponent = () => {
    const projects = useSelector((state) => state.levels.projects)
    const tasks = useSelector((state) => state.levels.tasks)

    return (
        <>
        <select>
            <option value="0">Select a project</option>
            {projects.map((project) => (
                <option value={project.id}>{project.name}</option>
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
                        tasks.map((task,index) => (
                            <TaskListItemComponent task={task} key={task.id}/>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}