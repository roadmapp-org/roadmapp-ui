import { useSelector } from "react-redux"
import { ProjectListItemComponent } from "./project-list-item"

export const ProjectListComponent = () => {

    const projects = useSelector((state) => state.levels.projects)

    return (
        <>
            <div className="flex flex-col">
                { projects.length > 0 &&
                    projects.map((project,index) => (
                        <ProjectListItemComponent project={project} key={project.id}/>
                    ))
                }
                { projects.length === 0 &&
                    
                    <div className="flex text-center py-4 mb-3">
                        <em>Add a project to start logging!</em>
                    </div>
                }
            </div>
        </>      
    )
}