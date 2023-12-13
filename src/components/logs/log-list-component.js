import { useDispatch, useSelector } from "react-redux"
import { LogItemComponent } from "./log-item-component"

export const LogListComponent = () => {
    const logs = useSelector((state) => state.home.logs)

    return (
        <div>
            { logs.length > 0 && 
                <>
                    {logs.map((item, index) => (
                        <LogItemComponent log={item} index={index}></LogItemComponent>
                    ))}
                </>
            }
        </div>
    )

}
