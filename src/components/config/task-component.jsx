import { TaskFormComponent } from "./task-form-component"
import { TaskListComponent } from "./task-list-component"

export const TaskComponent = () => {
    return (
        <div className="bg-custom-white p-4 rounded-md mt-6">
            <h2 className='text-2xl mb-3'>Tasks</h2>
            <TaskListComponent />
            <TaskFormComponent />
        </div>
    )
}