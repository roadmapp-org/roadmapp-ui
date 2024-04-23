import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { projectSelected, taskSelected, subtaskSelected } from '../../data/levels-slice'
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
    }

    const cleanCurrentProject = () => {
        cleanCurrentTask();
        setCurrentProject(null);
        setCurrentProjectName(null);
        dispatch(projectSelected(0));
        dispatch(taskSelected(0));
    }

    const onClickTask = (item) => {
        setCurrentTask(item.id);
        setCurrentTaskName(item.name);
    }  
    
    const cleanCurrentTask = () => {
        setCurrentTask(null);
        setCurrentTaskName(null);
    }

    const onSelectProject = (id) => {
        const filtered = tasks.filter((item) => item.project_id.toString() === id);
        setFilteredTasks(filtered);
        
    }

    // const onSelectTask = (e) => {
    //     if(e.target.value !== "0") {
    //         setLayout({...layout, subtaskDisabled: false})
    //     } else {
    //         setLayout({
    //             ...layout,
    //             subtaskDisabled: true
    //         })
    //         dispatch(subtaskSelected(e.target.value))
    //     }
    //     document.getElementById('subtaskFilter').selectedIndex = 0
    //     dispatch(taskSelected(e.target.value))
    //     const filtered = subtasks.filter((item) => item.task_id.toString() === e.target.value)
    //     setFilteredSubtasks(filtered);
    //     dispatch(fetchFilteredLogs({
    //         project: e.target.value !== "0" ? "0" : selectedProject,
    //         task: e.target.value !== "0" ? e.target.value : "0",
    //         subtask: "0"
    //     }))
    // }

    // const onSelectSubtask = (e) => {
    //     dispatch(subtaskSelected(e.target.value))
    //     dispatch(fetchFilteredLogs({
    //         project: "0",
    //         task: e.target.value !== "0" ? "0" : selectedTask,
    //         subtask: e.target.value !== "0" ? e.target.value : "0"
    //     }))
    // }

    return (
        <>
            <div className={`flex flex-col ${currentProject != null ? "block" : "hidden"} items-center mb-8`}>
                <h1 className='text-2xl mb-4'>Your current roadmap</h1>
                <div className="flex justify-center">
                    <div className='bg-color-3 rounded-md py-1 px-2 relative grow-0'>
                        <p className="font-medium">{currentProjectName}</p>
                        <button className='absolute -top-2 -right-3 rounded-[50%] bg-color-2' onClick={() => cleanCurrentProject()}>
                            <img src="white-cancel.png" className="w-5 h-5 p-1" />
                        </button>
                    </div>
                    <div className={`bg-color-4 rounded-md py-1 px-2 relative grow-0 ml-4 ${currentTask != null ? "block" : "hidden"}`}>
                        <p className="font-medium">{currentTaskName}</p>
                        <button className='absolute -top-2 -right-3 rounded-[50%] bg-color-2' onClick={() => cleanCurrentTask()}>
                            <img src="white-cancel.png" className="w-5 h-5 p-1" />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col items-center justify-center ${currentProject != null ? "hidden" : "block"}`}>
                <h1 className='text-2xl mb-4'>Projects</h1>
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
            <div className={`flex flex-col items-center justify-center ${currentProject != null && currentTask == null ? "block" : "hidden"}`}>
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
            {
            /*
            <h1 className='sm:order-1 text-xl leading-2 font-medium text-gray-700 hidden sm:block'>
                Project
            </h1>
             <select id='projectTask' className='w-full rounded-md sm:order-6 py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' disabled={layout.projectDisabled} onChange={onSelectProject}>
                <option key={0} value={0}>{"All projects"}</option>
                {
                    projects.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            <h1 className='sm:order-2 text-xl leading-2 font-medium text-gray-700  hidden sm:block'>Task</h1>
            <select id='taskFilter' className='w-full rounded-md sm:order-6 py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' disabled={layout.taskDisabled} onChange={onSelectTask}>
                <option key={0} value={0}>{"All tasks"}</option>
                {
                    filteredTask.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }z
            </select>
            <h1 className='sm:order-3 text-xl leading-2 font-medium text-gray-700  hidden'>Subtask</h1>
            <select id='subtaskFilter' className='w-full rounded-md sm:order-6 py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hidden' disabled={layout.subtaskDisabled} onChange={onSelectSubtask}>
                <option key={0} value={0}>{"All subtasks"}</option>
                {
                    filteredSubtask.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            {error && <p>{error}</p>} */}
        </>
    )

    
}