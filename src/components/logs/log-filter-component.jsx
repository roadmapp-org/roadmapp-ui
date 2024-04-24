import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { projectSelected, projectNameSelected, taskSelected, taskNameSelected, subtaskSelected } from '../../data/levels-slice'

export const LogFilterComponent = () => {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.levels.projects)
    const tasks = useSelector((state) => state.levels.tasks)    
    const currentProject = useSelector((state) => state.levels.selectedProject);
    const currentTask = useSelector((state) => state.levels.selectedTask);
    const currentProjectName = useSelector((state) => state.levels.selectedProjectName);
    
    const [filteredTask, setFilteredTasks] = useState(useSelector((state) => state.levels.tasks));
    
    const onClickProject = (item) => {
        let filtered = tasks.filter((task) => task.project_id === item.id);
        setFilteredTasks(filtered);
        dispatch(projectSelected(item.id));
        dispatch(projectNameSelected(item.name));
    }

    const onClickTask = (item) => {
        dispatch(taskSelected(item.id));
        dispatch(taskNameSelected(item.name));
    }

    return (
        <>
            <div className={`mb-5 flex flex-col items-center justify-center ${currentProject == 0 ? "block" : "hidden"}`}>
                <h1 className='text-2xl mb-4'>Your projects</h1>
                <div className="flex items-start">
                    <div className="flex flex-wrap justify-evenly" id="projectsList">
                        {
                            projects.map((item, index) => (
                                <div key={index} className={`relative align-content-center flex-grow text-center text-custom-black p-2 m-1 rounded-md font-medium text-black hover:cursor-pointer bg-color-2`} onClick={() => onClickProject(item)}>
                                    <p>{item.name}</p>
                                </div>
                            ))
                        }  
                    </div>
                    {/* <div className='flex-grow text-center bg-custom-black text-custom-white p-2 m-1 rounded-md font-medium text-black'>
                        +
                    </div> */}
                </div>
            </div>
            <div className={`mb-5 flex flex-col items-center justify-center ${currentProject != 0 && currentTask == 0 ? "block" : "hidden"}`}>
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
                    {/* <div className='flex-grow text-center bg-custom-black text-custom-white p-2 m-1 rounded-md font-medium text-black'>
                        +
                    </div> */}
                </div>
            </div>
        </>
    )

    
}