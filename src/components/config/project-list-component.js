import { useSelector } from "react-redux"

export const ProjectListComponent = () => {

    const projects = useSelector((state) => state.levels.projects)

    return (
        <>
            <h1>Config</h1>
            <h2>Projects</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // filter enabled projects
                        projects.map((project) => (
                            <tr key={project.id}>
                                <td>{project.name}</td>
                                <td>Edit | {project.active ? 'Disable' : 'Enable'} | Edit</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>      
    )
}