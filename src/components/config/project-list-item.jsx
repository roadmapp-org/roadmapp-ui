import { useState } from "react"
import { useDispatch } from "react-redux"
import { editProject, deleteProject } from "../../data/levels-slice"

export const ProjectListItemComponent = ({project}) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [inputValue, setInputValue] = useState(project.name)

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleDelete = () => {
        setDeleteMode(true)
    }

    const handleCancelEdit = () => {
        setEditMode(false)
        setInputValue(project.name)
    }

    const handleCancelDelete = () => {
        setDeleteMode(false)
    }

    const handleConfirmEdit = () => {
        const persist = {
            id: project.id,
            name: inputValue,
            active: project.active
        }
        dispatch(editProject(persist))
        setEditMode(false)
    }

    const handleConfirmDelete = () => {
        const persist = {
            id: project.id
        }
        dispatch(deleteProject(persist))
    }

    const handleEnableDisable = () => {
        const persist = {
            id: project.id,
            name: project.name,
            active: !project.active
        }
        dispatch(editProject(persist))
        setDeleteMode(false)
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <tr className="border-t border-gray-400 table-fixed">
            <td className="py-3 w-[70%]">
                <input type="text" value={inputValue} disabled={!editMode} onChange={handleInputChange} className="w-full px-3 py-2 placeholder-gray-500 border rounded-md bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                <p hidden={!deleteMode} className="text-red-500">This action will delete the project, its tasks and subtasks and all the related logs. Are you sure?</p>
            </td>
            <td className="py-3 w-[15%]">
                <button hidden={editMode} onClick={handleEdit} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-auto">
                    <img src="edit.png" alt="Edit" style={{ width: '20px', height: '20px' }} />
                </button>
                <button hidden={!editMode} onClick={handleConfirmEdit} className="text-white font-bold py-2 px-4 rounded">
                    <img src="ok.png" alt="Confirm" style={{ width: '20px', height: '20px' }} />
                </button>
                <button hidden={!editMode} onClick={handleCancelEdit} className="text-white font-bold py-2 px-4 rounded">
                    <img src="cancel.png" alt="Cancel" style={{ width: '20px', height: '20px' }} />
                </button>
            </td>
            {/* <td className="px-4 py-3">
                <button onClick={handleEnableDisable} className="text-white font-bold py-2 px-4 rounded">
                    {project.active ? 'Disable' : 'Enable'}
                </button>
            </td> */}
            <td className="py-3 w-[15%]">
                <button hidden={deleteMode} onClick={handleDelete} className="text-white font-bold py-2 px-4 rounded">
                    <img src="remove.png" alt="Cancel" style={{ width: '20px', height: '20px' }} />
                </button>
                <button hidden={!deleteMode} onClick={handleConfirmDelete} className=" text-white font-bold py-2 px-4 rounded">
                <img src="ok.png" alt="Confirm" style={{ width: '20px', height: '20px' }} />
                </button>
                <button hidden={!deleteMode} onClick={handleCancelDelete} className=" text-white font-bold py-2 px-4 rounded">
                    <img src="cancel.png" alt="Cancel" style={{ width: '20px', height: '20px' }} />
                </button>
            </td>
            <td className="px-4 py-3">
                
            </td>
        </tr>
    )

}