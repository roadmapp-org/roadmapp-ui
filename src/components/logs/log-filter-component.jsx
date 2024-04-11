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

    const onSelectProject = (e) => {

        if(e.target.value !== "0") {
            setLayout({...setLayout, taskDisabled: false, subtaskDisabled: true})
        } else {
            setLayout({...layout, taskDisabled: true, subtaskDisabled: true})
            dispatch(taskSelected(e.target.value))
            dispatch(subtaskSelected(e.target.value))
        }
        document.getElementById('taskFilter').selectedIndex = 0
        document.getElementById('subtaskFilter').selectedIndex = 0
        dispatch(projectSelected(e.target.value))
        const filtered = tasks.filter((item) => item.project_id.toString() === e.target.value);
        setFilteredTasks(filtered)
        if(e.target.value === "0") {
            dispatch(getLogs())
        }
        else {
            dispatch(fetchFilteredLogs({
                project: e.target.value,
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
            <h1 className='sm:order-1 text-xl leading-2 font-medium text-gray-700'>
                Project
            </h1>
            <select id='projectTask' className='w-full rounded-md sm:order-6 py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' disabled={layout.projectDisabled} onChange={onSelectProject}>
                <option key={0} value={0}>{"All"}</option>
                {
                    projects.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            <h1 className='sm:order-2 text-xl leading-2 font-medium text-gray-700'>Task</h1>
            <select id='taskFilter' className='w-full rounded-md sm:order-6 py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' disabled={layout.taskDisabled} onChange={onSelectTask}>
                <option key={0} value={0}>{"All"}</option>
                {
                    filteredTask.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }z
            </select>
            <h1 className='sm:order-3 text-xl leading-2 font-medium text-gray-700'>Subtask</h1>
            <select id='subtaskFilter' className='w-full rounded-md sm:order-6 py-2 px-3 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' disabled={layout.subtaskDisabled} onChange={onSelectSubtask}>
                <option key={0} value={0}>{"All"}</option>
                {
                    filteredSubtask.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            {error && <p>{error}</p>}
        </>
    )

    
}