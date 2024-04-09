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

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleCancelEdit = () => {
        setEditMode(false)
        setInputValue(task.name)
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

    const handleDelete = () => {
        setDeleteMode(true)
    }

    const handleCancelDelete = () => {
        setDeleteMode(false)
    }

    const handleConfirmDelete = () => {
        const persist = {
            id: task.id
        }
        dispatch(deleteTask(persist))
    }

    return (
        <tr>
            <td>{project && project.name}</td>
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
            </td>
        </tr>
    )
}