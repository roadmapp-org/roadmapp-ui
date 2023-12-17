import { useState } from "react";
import { Form } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createLog } from "./log-slice";
import {
    selectSelectedProject,
    selectSelectedTask,
    selectSelectedSubtask } from "../../pages/home/home-slice";

export const LogCreateForm = () => {

    const dispatch = useDispatch();
    const [showError, setShowError] = useState(false);
    const [createLogErrorMessage, setCreateLogErrorMessage] = useState("Error when saving the log");

    const selectedProject = useSelector(selectSelectedProject);
    const selectedTask = useSelector(selectSelectedTask);
    const selectedSubtask = useSelector(selectSelectedSubtask);
    const creationStatus = useSelector((state) => state.log.creationStatus);
    
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if(inputValue === "" || inputValue === undefined)
        {
            setShowError(true)
            setCreateLogErrorMessage("Insert a log")
            return;
        }
        const persist = {
            projectId: selectedProject,
            taskId: selectedTask,
            subtaskId: selectedSubtask,
            log: inputValue
        }
        
        await dispatch(createLog(persist));
        if(creationStatus === "succeeded")
            setInputValue("")
    }

    return (
        <Form method="post" onSubmit={onSubmit} >
            <textarea
                value={inputValue}
                onChange={handleChange}
                rows={4} // Set the number of visible rows
                cols={50} // Set the number of visible columns
                placeholder="Type your text here..."
            />
            <br></br>
            {(showError || creationStatus === "failed") && <p>{createLogErrorMessage}</p>}
            <br></br>
            <input
                type="submit"
                value="Log"
                disabled={
                    selectedProject === "0" || 
                    inputValue.length <= 2
                    ? true : false}/>
        </Form>
    );
}