import { Form } from "react-router-dom"
import { createTask } from "../../data/levels-slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { projectSelected } from "../../data/levels-slice";


export const TaskFormComponent = () => {
    
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const selectedProject = useSelector((state) => state.levels.selectedProject)

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const persist = {
            projectId: selectedProject,
            name: inputValue,
            active: true
        }
        setInputValue('');
        dispatch(createTask(persist))
    }

    return (
        <Form method="post" onSubmit={onSubmit}>
            <input  value={inputValue}
                    onChange={handleChange}
                    type="text"
                    placeholder="New task name" />
            <input type="submit" value="Add" disabled={selectedProject === '0'}/>
            <br></br>
        </Form>
    )
}