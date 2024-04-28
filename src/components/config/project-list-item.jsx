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
        <tr className="table-fixed">
            <td className="py-3 w-[70%]">
                <input type="text" value={inputValue} disabled={!editMode} onChange={handleInputChange} className="w-full bg-white"/>
                <p hidden={!deleteMode} className="text-red-500">This action will delete the project, its tasks and subtasks and all the related logs. Are you sure?</p>
            </td>
            <td className="py-3 w-[15%]">
                <button hidden={editMode} onClick={handleEdit} className="hover:bg-blue-700 text-white font-bold">
                    <img src="edit.png" alt="Edit" className="w-5 h-5" />
                </button>
                <button hidden={!editMode} onClick={handleConfirmEdit} className="text-white font-bold">
                    <img src="ok.png" alt="Confirm" className="w-5 h-5" />
                </button>
                <button hidden={!editMode} onClick={handleCancelEdit} className="text-white font-bold">
                    <img src="cancel.png" alt="Cancel" className="w-5 h-5" />
                </button>
            </td>
            {/* <td className="px-4 py-3">
                <button onClick={handleEnableDisable} className="text-white font-bold py-2 px-4 rounded">
                    {project.active ? 'Disable' : 'Enable'}
                </button>
            </td> */}
            <td className="py-3 w-[15%]">
                <button hidden={deleteMode} onClick={handleDelete} className="text-white font-bold">
                    <img src="remove.png" alt="Cancel" className="w-5 h-5" />
                </button>
                <button hidden={!deleteMode} onClick={handleConfirmDelete} className=" text-white font-bold">
                <img src="ok.png" alt="Confirm" className="w-5 h-5" />
                </button>
                <button hidden={!deleteMode} onClick={handleCancelDelete} className=" text-white font-bold">
                    <img src="cancel.png" alt="Cancel" className="w-5 h-5" />
                </button>
            </td>
            <td className="px-4 py-3">
                
            </td>
        </tr>
    )

}