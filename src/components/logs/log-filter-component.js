import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { projectSelected, taskSelected, subtaskSelected } from '../../data/levels-slice'
import { fetchFilteredLogs, getLogs } from "../../data/log-slice"

export const LogFilterComponent = () => {
    const dispatch = useDispatch()

    const projects = useSelector((state) => state.home.projects)
    const tasks = useSelector((state) => state.home.tasks)
    const subtasks = useSelector((state) => state.home.subtasks)

    const [filteredTask, setFilteredTasks] = useState(useSelector((state) => state.home.tasks));
    const [filteredSubtask, setFilteredSubtasks] = useState(useSelector((state) => state.home.subtasks));

    
    const [ layout, setLayout ] = useState({
        projectDisabled: false,
        taskDisabled: true,
        subtaskDisabled: true
    });

    const [ filter, setFilter ] = useState({
        project: 0,
        task: 0,
        subtask: 0
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
        setFilter({project: e.target.value, task: "0", subtask: "0"})
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
        setFilter({...filter, task: e.target.value, subtask: "0"})
        dispatch(taskSelected(e.target.value))
        const filtered = subtasks.filter((item) => item.task_id.toString() === e.target.value)
        setFilteredSubtasks(filtered);
        dispatch(fetchFilteredLogs({
            project: e.target.value !== "0" ? "0" : filter.project,
            task: e.target.value !== "0" ? e.target.value : "0",
            subtask: "0"
        }))
    }

    const onSelectSubtask = (e) => {
        setFilter({...filter, subtask: e.target.value})
        dispatch(subtaskSelected(e.target.value))
        dispatch(fetchFilteredLogs({
            project: "0",
            task: e.target.value !== "0" ? "0" : filter.task,
            subtask: e.target.value !== "0" ? e.target.value : "0"
        }))
    }

    return (
        <div>
            <p>Project:</p>
            <select id='projectTask' disabled={layout.projectDisabled} onChange={onSelectProject}>
                <option key={0} value={0}>{"All"}</option>
                {
                    projects.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            <p>Task:</p>
            <select id='taskFilter' disabled={layout.taskDisabled} onChange={onSelectTask}>
                <option key={0} value={0}>{"All"}</option>
                {
                    filteredTask.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            <p>Subtask:</p>
            <select id='subtaskFilter' disabled={layout.subtaskDisabled} onChange={onSelectSubtask}>
                <option key={0} value={0}>{"All"}</option>
                {
                    filteredSubtask.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
        </div>
    )

    
}