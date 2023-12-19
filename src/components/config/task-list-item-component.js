import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editTask } from "../../data/levels-slice"

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
            name: inputValue
        }
        dispatch(editTask(persist))
        setEditMode(false)
    }

    return (
        <tr>
            <td>{project.name}</td>
            <td><input type="text" value={inputValue} disabled={!editMode} onChange={handleInputChange}/></td>
            <td>
                <button hidden={editMode} onClick={handleEdit}>Edit</button>
                <button hidden={!editMode} onClick={handleConfirmEdit}>OK</button>
                <button hidden={!editMode} onClick={handleCancelEdit}>Cancel</button>
            </td>
            <td><button>{task.active ? "Disable" : "Enable"}</button></td>
            <td>
                <button hidden={deleteMode}>Delete</button>
                <button hidden={!deleteMode}>OK</button>
                <button hidden={!deleteMode}>Cancel</button>
            </td>
        </tr>
    )
}