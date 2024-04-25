import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createLog } from "../../data/log-slice"
import {
    selectSelectedProject,
    selectSelectedTask,
    selectSelectedSubtask } from "../../data/levels-slice";
import { setCreationError } from "../../data/log-slice";

export const LogCreateForm = () => {

    const dispatch = useDispatch();

    const selectedProject = useSelector(selectSelectedProject);
    const selectedTask = useSelector(selectSelectedTask);
    const selectedSubtask = useSelector(selectSelectedSubtask);
    const creationStatus = useSelector((state) => state.log.creationStatus);
    const creationError = useSelector((state) => state.log.creationError);
    
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = async (event) => {
        debugger;
        event.preventDefault();
        if(inputValue === "" || inputValue === undefined)
        {
            dispatch(setCreationError("Log cannot be empty"))
            return;
        }
        const persist = {
            projectId: selectedProject,
            taskId: selectedTask,
            subtaskId: selectedSubtask,
            log: inputValue
        }
        await dispatch(createLog(persist));
        
    }

    useEffect(() => {
        if(creationStatus === "succeeded")
            setInputValue("")
    }, [creationStatus])

    return (
        <form method="post" onSubmit={onSubmit} className="space-y-4 flex flex-col md:flex-row md:items-end justify-evenly">
            <textarea
                value={inputValue}
                onChange={handleChange}
                rows={4}
                placeholder="Type your text here..."
                className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 md:text-sm md:w-[70%]"
            />
            {creationError && <p className="text-red-500">{creationError}</p>}
            <input
                type="submit"
                value="Log"
                disabled={selectedProject === "0" || inputValue.length < 5 ? true : false}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-900 focus:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 md:w-[20%] bg-custom-black"
            />
        </form>
    );
}