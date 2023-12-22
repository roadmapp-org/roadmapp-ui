import { TaskFormComponent } from "./task-form-component"
import { TaskListComponent } from "./task-list-component"

export const TaskComponent = () => {
    return (
        <>
        <h2>Tasks</h2>
        <TaskListComponent />
        <br></br>
        <TaskFormComponent />
        </>
    )
}