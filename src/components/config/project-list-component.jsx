import { useSelector } from "react-redux"
import { ProjectListItemComponent } from "./project-list-item"

export const ProjectListComponent = () => {

    const projects = useSelector((state) => state.levels.projects)

    return (
        <>
            <table>
                <tbody>
                    {
                        projects.map((project,index) => (
                            <ProjectListItemComponent project={project} key={project.id}/>
                        ))
                    }
                </tbody>
            </table>
        </>      
    )
}