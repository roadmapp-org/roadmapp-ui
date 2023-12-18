import { useState } from "react"
import { useDispatch } from "react-redux"
import { editProject } from "../../data/levels-slice"

export const ProjectListItemComponent = ({project}) => {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(project.name)

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleCancelEdit = () => {
        setEditMode(false)
    }

    const handleConfirmEdit = () => {
        const persist = {
            id: project.id,
            name: inputValue
        }
        console.log('edit')
        console.log(persist)
        dispatch(editProject(persist))
        setEditMode(false)
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
                <button>{project.active ? 'Disable' : 'Enable'}</button>
            </td>
            <td>
                <button>Delete</button>
            </td>
        </tr>
    )

}