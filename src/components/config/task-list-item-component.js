import { useState } from "react"
import { useSelector } from "react-redux"

export const TaskListItemComponent = ({task}) => {
    const [inputValue, setInputValue] = useState(task.name)
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const projects = useSelector((state) => state.levels.projects)
    const project = projects.find(p => p.id === task.project_id)

    return (
        <tr>
            <td>{project.name}</td>
            <td><input type="text" value={inputValue} disabled={!editMode}/></td>
            <td>
                <button hidden={editMode}>Edit</button>
                <button hidden={!editMode}>OK</button>
                <button hidden={!editMode}>Cancel</button>
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