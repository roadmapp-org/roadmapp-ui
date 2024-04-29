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
        <select className="w-full flex flex-wrap justify-evenly rounded-md py-2 bg-white mb-3" id="projectsList" onChange={onSelectProject}>
            <option key={0} value={0} className={`relative align-content-center flex-grow text-center text-custom-black p-2 m-1 rounded-md font-medium text-black hover:cursor-pointer`}>{"All projects"}</option>
            {
                projects.map((item, index) => (
                    <option key={index} value={item.id} className={`relative align-content-center flex-grow text-center text-custom-black p-2 mx-1  font-medium  hover:cursor-pointer`}>
                        {item.name}
                    </option>
                ))
            }  
        </select>
        <div className="flex flex-col">
            {
                filteredTask.map((task,index) => (
                    <TaskListItemComponent task={task} key={task.id}/>
                ))
            }
        </div>
        </>
    )
}