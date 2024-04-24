import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { projectSelected, projectNameSelected, taskSelected, taskNameSelected } from '../../data/levels-slice'
import { getLogs } from "../../data/log-slice"

export const LogFilterComponent = () => {
    const dispatch = useDispatch()
    const levelsStatus = useSelector(state => state.levels.status)
    const projects = useSelector((state) => state.levels.projects)
    const tasks = useSelector((state) => state.levels.tasks)    
    const currentProject = useSelector((state) => state.levels.selectedProject);
    const currentTask = useSelector((state) => state.levels.selectedTask);
    const currentProjectName = useSelector((state) => state.levels.selectedProjectName);
    
    const [filteredTask, setFilteredTasks] = useState(useSelector((state) => state.levels.tasks));
    
    const onClickProject = (e) => {
        if(e.target.value == 0) return;
        let item = projects.find((item) => item.id === parseInt(e.target.value, 10));
        let filtered = tasks.filter((task) => task.project_id === item.id);
        setFilteredTasks(filtered);
        dispatch(projectSelected(item.id));
        dispatch(projectNameSelected(item.name));
    }

    const onClickTask = (e) => {
        if(e.target.value == 0) return;
        let item = tasks.find((item) => item.id === parseInt(e.target.value, 10));
        dispatch(taskSelected(item.id));
        dispatch(taskNameSelected(item.name));
    }

    useEffect(() => {
      if (levelsStatus === 'idle') {
        dispatch(getLogs())
      }
    }, [])

    useEffect(() => {
        if(currentProject === 0)
            document.getElementById("projectsList").value = 0;
        if(currentTask === 0) {
            document.getElementById("taskList").value = 0;
        }

      }, [currentProject, currentTask])

    return (
        <>
            <div className={`mb-5 flex flex-col items-center justify-center ${currentProject == 0 ? "block" : "hidden"}`}>
                <h1 className='text-2xl mb-4 self-start'>Projects</h1>
                <div className="flex items-start">
                    <select className="w-full flex flex-wrap justify-evenly rounded-md py-2 bg-custom-white shadow" id="projectsList" onChange={onClickProject}>
                        <option key={0} value={0} className={`relative align-content-center flex-grow text-center text-custom-black p-2 m-1 rounded-md font-medium text-black hover:cursor-pointer`}>{"All projects"}</option>
                        {
                            projects.map((item, index) => (
                                <option key={index} value={item.id} className={`relative align-content-center flex-grow text-center text-custom-black p-2 mx-1  font-medium  hover:cursor-pointer`}>
                                    {item.name}
                                </option>
                            ))
                        }  
                    </select>
                    {/* <div className='flex-grow text-center bg-custom-black text-custom-white p-2 m-1 rounded-md font-medium text-black'>
                        +
                    </div> */}
                </div>
            </div>
            <div className={`mb-5 flex flex-col items-center justify-center ${currentProject != 0 && currentTask == 0 ? "block" : "hidden"}`}>
                <div className='text-2xl flex mb-5 self-start'>
                    <span className='self-center text-center'>Tasks</span>
                </div>
                <select className="w-full rounded-md py-2 bg-custom-white shadow" id="taskList" onChange={onClickTask}>
                    <option key={0} value={0} className={`relative align-content-center flex-grow text-center text-custom-black p-2 m-1 rounded-md font-medium text-black hover:cursor-pointer`}>{"All tasks"}</option>
                    {
                        filteredTask.map((item, index) => (
                            <option key={index} value={item.id} className={`relative align-content-center flex-grow text-center text-custom-black p-2 m-1 rounded-md font-medium text-black hover:cursor-pointer`}>
                                {item.name}
                            </option>
                        ))
                    }  
                </select>
                {/* <div className='flex-grow text-center bg-custom-black text-custom-white p-2 m-1 rounded-md font-medium text-black'>
                    +
                </div> */}
            </div>
        </>
    )

    
}