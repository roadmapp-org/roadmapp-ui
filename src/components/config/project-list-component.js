import { useSelector } from "react-redux"
import { ProjectListItemComponent } from "./project-list-item"

export const ProjectListComponent = () => {

    const projects = useSelector((state) => state.levels.projects)

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th colSpan={4}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map((project) => (
                            <ProjectListItemComponent project={project} />
                        ))
                    }
                </tbody>
            </table>
        </>      
    )
}