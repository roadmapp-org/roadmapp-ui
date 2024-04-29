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
        <div className="mb-3">
            <div className="flex flex-nowrap">
                <input type="text" value={inputValue} disabled={!editMode} onChange={handleInputChange} className={`w-full py-2 px-3 mr-2 rounded-md ${editMode ? "bg-white" : "bg-custom-white"}`}/>
                <div className={`flex py-3 mr-2 ${deleteMode ? "hidden" : "block"}`}>
                    <button hidden={editMode} onClick={handleEdit} className="text-white font-bold w-5 h-5">
                        <img src="edit.png" alt="Edit"/>
                    </button>
                    <button hidden={!editMode} onClick={handleConfirmEdit} className="text-white font-bold mr-3 w-5 h-5">
                        <img src="ok.png" alt="Confirm" />
                    </button>
                    <button hidden={!editMode} onClick={handleCancelEdit} className="text-white font-bold mr-3 w-5 h-5">
                        <img src="cancel.png" alt="Cancel" />
                    </button>
                </div>
                {/* <td className="px-4 py-3">
                    <button onClick={handleEnableDisable} className="text-white font-bold py-2 px-4 rounded">
                        {project.active ? 'Disable' : 'Enable'}
                    </button>
                </td> */}
                <div className={`flex py-3 mr-2 ${editMode ? "hidden" : "block"}`}>
                    <button hidden={deleteMode} onClick={handleDelete} className="text-white font-bold w-5 h-5">
                        <img src="remove.png" alt="Cancel" />
                    </button>
                    <button hidden={!deleteMode} onClick={handleConfirmDelete} className=" text-white font-bold mr-3 w-5 h-5">
                        <img src="ok.png" alt="Confirm"/>
                    </button>
                    <button hidden={!deleteMode} onClick={handleCancelDelete} className=" text-white font-bold mr-4 w-5 h-5">
                        <img src="cancel.png" alt="Cancel" />
                    </button>
                </div>
            </div>
            <p hidden={!deleteMode} className="text-color-1">This action will delete the project, its tasks and all the related logs. Are you sure?</p>
        </div>
    )

}