import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-router-dom";
import { createProject } from "../../data/levels-slice";

export const ProjectFormComponent = () => {
    const dispatch = useDispatch()
    const [showError, setShowError] = useState("");
    const [inputValue, setInputValue] = useState('');

    const creationStatus = useSelector((state) => state.levels.creationStatus);

    const onSubmit = async (event) => {
        event.preventDefault();
        if(inputValue === "" || inputValue === undefined)
        {
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
        if(creationStatus === "rejected")
            setShowError(true)
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
            <input
                type="submit"
                value="Add"
                disabled={inputValue.length < 5}
                className="w-full mt-3 py-2 px-4 rounded-md shadow-sm font-medium text-white bg-custom-black w-[30%] self-end"
            />
            {showError && <p className="text-red-500">Error when saving the project</p>}
        </Form>
    )
}