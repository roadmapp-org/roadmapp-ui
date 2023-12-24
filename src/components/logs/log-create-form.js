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
        <Form method="post" onSubmit={onSubmit} >
            <textarea
                value={inputValue}
                onChange={handleChange}
                rows={4}
                cols={50}
                placeholder="Type your text here..."
            />
            <br></br>
            {creationError && <p>{creationError}</p>}
            <br></br>
            <input
                type="submit"
                value="Log"
                disabled={
                    selectedProject === "0" || 
                    inputValue.length < 5
                    ? true : false}/>
        </Form>
    );
}