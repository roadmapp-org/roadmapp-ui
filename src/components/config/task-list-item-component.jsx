import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editTask, deleteTask } from "../../data/levels-slice"

export const TaskListItemComponent = ({task}) => {
    const [inputValue, setInputValue] = useState(task.name)
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const projects = useSelector((state) => state.levels.projects)
    const project = projects.find(p => p.id === task.project_id)
    const dispatch = useDispatch();

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

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleConfirmEdit = () => {
        const persist = {
            id: task.id,
            projectId: task.project_id,
            name: inputValue,
            active: task.active
        }
        dispatch(editTask(persist))
        setEditMode(false)
    }

    const handleEnableDisable = () => {
        const persist = {
            id: task.id,
            projectId: task.project_id,
            name: task.name,
            active: !task.active
        }
        dispatch(editTask(persist))
    }

    const handleConfirmDelete = () => {
        const persist = {
            id: task.id
        }
        dispatch(deleteTask(persist))
    }

    return (
        <div className="mb-3">
            <div className="flex flex-nowrap items-center">
                <input  type="text"
                        value={inputValue}
                        disabled={!editMode}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 mr-2 rounded-md ${editMode ? "bg-white" : "bg-custom-white"}`}/>
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
            {/* <td>{project && project.name}</td>
            <td><input type="text" value={inputValue} disabled={!editMode} onChange={handleInputChange}/></td>
            <td>
                <button hidden={editMode} onClick={handleEdit}>Edit</button>
                <button hidden={!editMode} onClick={handleConfirmEdit}>OK</button>
                <button hidden={!editMode} onClick={handleCancelEdit}>Cancel</button>
            </td>
            <td><button onClick={handleEnableDisable}>{task.active ? "Disable" : "Enable"}</button></td>
            <td>
                <button hidden={deleteMode} onClick={handleDelete}>Delete</button>
                <button hidden={!deleteMode} onClick={handleConfirmDelete}>OK</button>
                <button hidden={!deleteMode} onClick={handleCancelDelete}>Cancel</button>
            </td> */}
        </div>
    )
}