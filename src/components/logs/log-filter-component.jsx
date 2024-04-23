import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { projectSelected, projectNameSelected, taskSelected, taskNameSelected, subtaskSelected } from '../../data/levels-slice'
import { fetchFilteredLogs, getLogs } from "../../data/log-slice"

export const LogFilterComponent = () => {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.levels.projects)
    const tasks = useSelector((state) => state.levels.tasks)
    const subtasks = useSelector((state) => state.levels.subtasks)
    const selectedProject = useSelector((state) => state.levels.selectedProject)
    const selectedTask = useSelector((state) => state.levels.selectedTask)
    const error = useSelector((state) => state.levels.error)

    

    const [filteredTask, setFilteredTasks] = useState(useSelector((state) => state.levels.tasks));

    const [currentProject, setCurrentProject] = useState(null);
    const [currentProjectName, setCurrentProjectName] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentTaskName, setCurrentTaskName] = useState(null);
    
    const onClickProject = (item) => {
        setCurrentProject(item.id);
        setCurrentProjectName(item.name);
        let filtered = tasks.filter((task) => task.project_id === item.id);
        setFilteredTasks(filtered);
        dispatch(projectSelected(item.id));
        dispatch(projectNameSelected(item.name));
    }

    const onClickTask = (item) => {
        setCurrentTask(item.id);
        setCurrentTaskName(item.name);
        dispatch(taskSelected(item.id));
        dispatch(taskNameSelected(item.name));
    }

    return (
        <>
            <div className={`mb-5 flex flex-col items-center justify-center ${currentProject != null ? "hidden" : "block"}`}>
                <h1 className='text-2xl mb-4'>Your projects</h1>
                <div className="flex items-start">
                    <div className="flex flex-wrap justify-evenly" id="projectsList">
                        {
                            projects.map((item, index) => (
                                <div key={index} className={`relative align-content-center flex-grow text-center text-custom-black p-2 m-1 rounded-md font-medium text-black hover:cursor-pointer ${item.id === currentProject ? 'bg-color-4' : 'bg-color-3'}`} onClick={() => onClickProject(item)}>
                                    <p>{item.name}</p>
                                </div>
                            ))
                        }  
                    </div>
                    <div className='flex-grow text-center bg-custom-black text-custom-white p-2 m-1 rounded-md font-medium text-black'>
                        +
                    </div>
                </div>
            </div>
            <div className={`mb-5 flex flex-col items-center justify-center ${currentProject != null && currentTask == null ? "block" : "hidden"}`}>
                <div className='text-2xl flex mb-5'>
                    <span className='self-center'>Tasks of&nbsp;{currentProjectName}</span>
                </div>
                <div className="flex items-start">
                    <div className="flex flex-wrap justify-evenly" id="projectsList">
                        {
                            filteredTask.map((item, index) => (
                                <div key={index} className={`relative align-content-center flex-grow text-center text-custom-black p-2 m-1 rounded-md font-medium text-black hover:cursor-pointer ${item.id === currentProject ? 'bg-color-4' : 'bg-color-4'}`} onClick={() => onClickTask(item)}>
                                    <p>{item.name}</p>
                                </div>
                            ))
                        }  
                    </div>
                    <div className='flex-grow text-center bg-custom-black text-custom-white p-2 m-1 rounded-md font-medium text-black'>
                        +
                    </div>
                </div>
            </div>
        </>
    )

    
}