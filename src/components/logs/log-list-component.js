import { useDispatch, useSelector } from "react-redux"
import { LogItemComponent } from "./log-item-component"
import { getLogs } from "../../pages/login/log-slice";
import { useEffect } from "react";

export const LogListComponent = () => {
    const dispatch = useDispatch();
    const logs = useSelector((state) => state.log.list)
    const logStatus = useSelector(state => state.log.status)
    
    useEffect(() => {
        if (logStatus === 'idle') {
          dispatch(getLogs())
        }
      }, [logs])

    return (
        <div>
            {logs.map((item, index) => (
                <LogItemComponent item={item} index={index}></LogItemComponent>
            ))}
        </div>
    )

}
