import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getLevels } from '../../pages/home/log-level-slice';

export const LogFilterComponent = () => {

    const dispatch = useDispatch();
    const projectsStatus = useSelector(state => state.logLevel.status)
    const projects = useSelector((state) => state.logLevel.projects)
    const tasks = useSelector((state) => state.logLevel.tasks)
    const subtasks = useSelector((state) => state.logLevel.subtasks)

    const [filteredProjects, setFilteredProjects] = useState(useSelector((state) => state.logLevel.projects));

    
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
        console.log(layout)
        if(e.target.value !== "0") {
            setLayout({...setLayout, taskDisabled: false, subtaskDisabled: true})
        } else {
            setLayout({...layout, taskDisabled: true, subtaskDisabled: true})
        }
        document.getElementById('taskFilter').selectedIndex = 0
        document.getElementById('subtaskFilter').selectedIndex = 0
        setFilter({project: e.target.value, task: "0", subtask: "0"})
    }

    const onSelectTask = (e) => {
        if(e.target.value !== "0") {
            setLayout({...layout, subtaskDisabled: false})
        } else {
            setLayout({
                ...layout,
                subtaskDisabled: true
            })
        }
        document.getElementById('subtaskFilter').selectedIndex = 0
        setFilter({...filter, task: e.target.value, subtask: "0"})
    }

    const onSelectSubtask = (e) => {
        setFilter({...filter, subtask: e.target.value})
    }


    useEffect(() => {
        if(projectsStatus === 'idle') {
            dispatch(getLevels())
        }
    }, [])

    return (
        <div>
            <p>Project:</p>
            <select id='projectTask' disabled={layout.projectDisabled} onChange={onSelectProject}>
                <option key={0} value={0}>{" "}</option>
                {
                    projects.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            <span>{filter.project}</span>
            <p>Task:</p>
            <select id='taskFilter' disabled={layout.taskDisabled} onChange={onSelectTask}>
                <option key={0} value={0}>{" "}</option>
                {
                    tasks.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            <span>{filter.task}</span>
            <p>Subtask:</p>
            <select id='subtaskFilter' disabled={layout.subtaskDisabled} onChange={onSelectSubtask}>
                <option key={0} value={0}>{" "}</option>
                {
                    subtasks.map((item, index) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
            <span>{filter.subtask}</span>
        </div>
    )

    
}