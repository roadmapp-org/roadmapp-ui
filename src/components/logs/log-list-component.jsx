import { useDispatch, useSelector } from "react-redux"
import { LogItemComponent } from "./log-item-component"
import { useEffect, useState } from "react"

export const LogListComponent = () => {
    const logs = useSelector((state) => state.log.list)
    const currentProject = useSelector((state) => state.levels.selectedProject);
    const currentTask = useSelector((state) => state.levels.selectedTask);
    const [filteredLogs, setFilteredLogs] = useState([])
    
    useEffect(() => {
        if(currentProject === 0 || currentTask === 0) {
            setFilteredLogs(logs);
        } else {
            setFilteredLogs(logs.filter(log => log.projectId === currentProject && log.taskId === currentTask));
        }
    }, [currentProject, currentTask])

    return (
        <>
            { filteredLogs && filteredLogs.length > 0 && 
                <>
                    <h1 className='text-2xl pb-5 self-start'>Roadmap</h1>
                    {logs.map((item, index) => (
                        <LogItemComponent log={item} index={index} key={item.id}></LogItemComponent>
                    ))}
                </>
            }
        </>
    )

}
