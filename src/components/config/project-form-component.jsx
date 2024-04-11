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
        <Form method="post" onSubmit={onSubmit} className="flex flex-col md:flex-row justify-evenly items-center">
            <input  
                value={inputValue}
                onChange={handleChange}
                type="text"
                placeholder="New Project Name"
                className="w-full px-3 py-2 placeholder-gray-500 border rounded-md focus:outline-none md:w-[70%]"
            />
            <input
                type="submit"
                value="Add"
                disabled={inputValue.length < 5}
                className="w-full mt-3 py-2 px-4 rounded-md shadow-sm font-medium text-white bg-cyan-700 md:w-[15%] md:mt-0 "
            />
            <br></br>
            {showError && <p className="text-red-500">Error when saving the project</p>}
        </Form>
    )
}