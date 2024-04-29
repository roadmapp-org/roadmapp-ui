import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { createProject } from "../../data/levels-slice";

export const ProjectFormComponent = () => {
    const dispatch = useDispatch()
    const [showError, setShowError] = useState("");
    const [error, setError] = useState("");
    const [inputValue, setInputValue] = useState('');

    const creationStatus = useSelector((state) => state.levels.creationStatus);

    const onSubmit = async (event) => {
        event.preventDefault();
        if(inputValue === "" || inputValue === undefined)
        {
            setError("Project name is required")
            setShowError(true)
            return;
        }
        if(inputValue.length < 5)
        {
            setError("Project name must be at least 5 characters long")
            setShowError(true)
            return;
        }
        const persist = {
            name: inputValue
        }
        await dispatch(createProject(persist));
    }

    useEffect(() => {
        if(creationStatus === "succeeded")
            setInputValue("")
        if(creationStatus === "rejected"){
            setError("An error occurred while creating the project")
            setShowError(true)
        }
    }, [creationStatus])

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <Form method="post" onSubmit={onSubmit} className="w-full flex flex-col">
            <input  
                value={inputValue}
                onChange={handleChange}
                type="text"
                placeholder="New Project Name"
                className="w-full px-3 py-2 placeholder-gray-500 rounded-sm focus:outline-none"
            />
            <div className="flex flex-nowrap mt-3">
                <p className={`text-color-1 ml-2 py-2 w-full`}>
                    {showError && error}
                </p>
                <input
                    type="submit"
                    value="Add"
                    className="py-2 px-4 rounded-md shadow-sm font-medium text-white bg-custom-black"
                />
            </div>
        </Form>
    )
}