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

    const selectedProject = useSelector(selectSelectedProject);
    const selectedTask = useSelector(selectSelectedTask);
    const selectedSubtask = useSelector(selectSelectedSubtask);
    
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const persist = {
            projectId: selectedProject,
            taskId: selectedTask,
            subtaskId: selectedSubtask,
            log: inputValue
        }
        
        try {
            await dispatch(createLog(persist));
        } catch (err) {
            console.log(err);
        }
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
            <input type="submit" value="Log" />
        </Form>
    );
}