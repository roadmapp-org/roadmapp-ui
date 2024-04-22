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
    const [filteredSubtask, setFilteredSubtasks] = useState(useSelector((state) => state.levels.subtasks));

    const [ layout, setLayout ] = useState({
        projectDisabled: false,
        taskDisabled: true,
        subtaskDisabled: true
    });

    const [currentProject, setCurrentProject] = useState(null);
    const onClickProject = (id) => {
        setCurrentProject(id);
    } 

    const onSelectProject = (e) => {

        if(e !== "0") {
            setLayout({...setLayout, taskDisabled: false, subtaskDisabled: true})
        } else {
            setLayout({...layout, taskDisabled: true, subtaskDisabled: true})
            dispatch(taskSelected(e))
            dispatch(subtaskSelected(e))
        }
        document.getElementById('taskFilter').selectedIndex = 0
        document.getElementById('subtaskFilter').selectedIndex = 0
        dispatch(projectSelected(e))
        const filtered = tasks.filter((item) => item.project_id.toString() === e);
        setFilteredTasks(filtered)
        if(e === "0") {
            dispatch(getLogs())
        }
        else {
            dispatch(fetchFilteredLogs({
                project: e,
                task: "0",
                subtask: "0"
            }))
        }
    }

    const onSelectTask = (e) => {
        if(e.target.value !== "0") {
            setLayout({...layout, subtaskDisabled: false})
        } else {
            setLayout({
                ...layout,
                subtaskDisabled: true
            })
            dispatch(subtaskSelected(e.target.value))
        }
        document.getElementById('subtaskFilter').selectedIndex = 0
        dispatch(taskSelected(e.target.value))
        const filtered = subtasks.filter((item) => item.task_id.toString() === e.target.value)
        setFilteredSubtasks(filtered);
        dispatch(fetchFilteredLogs({
            project: e.target.value !== "0" ? "0" : selectedProject,
            task: e.target.value !== "0" ? e.target.value : "0",
            subtask: "0"
        }))
    }

    const onSelectSubtask = (e) => {
        dispatch(subtaskSelected(e.target.value))
        dispatch(fetchFilteredLogs({
            project: "0",
            task: e.target.value !== "0" ? "0" : selectedTask,
            subtask: e.target.value !== "0" ? e.target.value : "0"
        }))
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className='text-2xl mb-4'>Select a project</h1>
                <div className="flex items-start">
                    <div className="flex flex-wrap justify-evenly" id="projectsList">
                        {
                            projects.map((item, index) => (
                                <div className={`relative align-content-center flex-grow text-center text-custom-black p-2 m-1 rounded-md font-medium text-black hover:cursor-pointer ${item.id === currentProject ? 'bg-color-4' : 'bg-color-3'}`} onClick={() => onClickProject(item.id)}>
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
            <div className="flex flex-col items-center justify-center mt-5">
                <h1 className='text-2xl mb-4'>Select a Task</h1>
                <div className="flex items-start">
                    <div className="flex flex-wrap justify-evenly" id="projectsList">
                        {
                            projects.map((item, index) => (
                                <div className={`relative align-content-center flex-grow text-center text-custom-black p-2 m-1 rounded-md font-medium text-black hover:cursor-pointer ${item.id === currentProject ? 'bg-color-4' : 'bg-color-4'}`} onClick={() => onClickProject(item.id)}>
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