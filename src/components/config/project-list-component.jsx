import { useSelector } from "react-redux"
import { ProjectListItemComponent } from "./project-list-item"

export const ProjectListComponent = () => {

    const projects = useSelector((state) => state.levels.projects)

    return (
        <>
            <table className="mb-3">
                <tbody>
                    { projects.length > 0 &&
                        projects.map((project,index) => (
                            <ProjectListItemComponent project={project} key={project.id}/>
                        ))
                    }
                    { projects.length === 0 &&
                        <tr>
                            <td colSpan="4">
                                <div className="flex text-center py-4">
                                    <em>Add a project to start logging!</em>
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </>      
    )
}