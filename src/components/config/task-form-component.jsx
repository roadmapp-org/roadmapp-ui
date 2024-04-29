import { Form } from "react-router-dom"
import { createTask } from "../../data/levels-slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { projectSelected } from "../../data/levels-slice";


export const TaskFormComponent = () => {
    
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [showError, setShowError] = useState("");
    const [error, setError] = useState("");
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
        <Form method="post" onSubmit={onSubmit} className="w-full flex flex-col">
            <input  value={inputValue}
                    onChange={handleChange}
                    type="text"
                    placeholder="New task name"
                    className="w-full px-3 py-2 placeholder-gray-500 rounded-sm focus:outline-none"
            />
            <div className="flex flex-nowrap mt-3">
                <p className={`text-color-1 ml-2 py-2 w-full`}>
                    {showError && error}
                </p>
                <input
                    type="submit"
                    value="Add"
                    disabled={selectedProject === '0'}
                    className="py-2 px-4 rounded-md shadow-sm font-medium text-white bg-custom-black"/>
            </div>
        </Form>
    )
}