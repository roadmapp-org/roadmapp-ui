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
        dispatch(deleteProject(persist))
        setDeleteMode(false)
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <tr>
            <td>
                <input type="text" value={inputValue} disabled={!editMode} onChange={handleInputChange}/>
                <button hidden={editMode} onClick={handleEdit}>Edit</button>
                <button hidden={!editMode} onClick={handleConfirmEdit}>OK</button>
                <button hidden={!editMode} onClick={handleCancelEdit}>Cancel</button>
            </td>
            <td>
                <button onClick={handleEnableDisable}>{project.active ? 'Disable' : 'Enable'}</button>
            </td>
            <td>
                <button hidden={deleteMode} onClick={handleDelete}>Delete</button>
                <button hidden={!deleteMode} onClick={handleConfirmDelete} >OK</button>
                <button hidden={!deleteMode} onClick={handleCancelDelete}>Cancel</button>
            </td>
            <td>
                <p hidden={!deleteMode}>This action will delete the project, its tasks and subtasks and all the related logs. Are you sure?</p>
            </td>
        </tr>
    )

}