import { useDispatch, useSelector } from "react-redux"
import { LogItemComponent } from "./log-item-component"

export const LogListComponent = () => {
    const logs = useSelector((state) => state.log.list)

    return (
        <div>
            { logs && logs.length > 0 && 
                <>
                    {logs.map((item, index) => (
                        <LogItemComponent log={item} index={index} key={item.id}></LogItemComponent>
                    ))}
                </>
            }
        </div>
    )

}
