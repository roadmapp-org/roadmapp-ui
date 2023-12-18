import { useState } from "react"
import { Form } from "react-router-dom"

export const ProjectListItemComponent = ({project}) => {

    const [editMode, setEditMode] = useState(false)

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleCancelEdit = () => {
        setEditMode(false)
    }

    return (
        <tr key={project.id}>
            <td>
                <input type="text" value={project.name} readOnly={editMode} disabled={!editMode}></input>
                <button hidden={editMode} onClick={handleEdit}>Edit</button>
                <button hidden={!editMode}>OK</button>
                <button hidden={!editMode} onClick={handleCancelEdit}>Cancel</button>
            </td>
            <td>
                <button>{project.active ? 'Disable' : 'Enable'}</button>
            </td>
            <td>
                <button>Delete</button>
            </td>
        </tr>
    )

}