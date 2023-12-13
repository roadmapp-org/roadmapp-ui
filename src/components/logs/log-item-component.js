export const LogItemComponent = ({log, index}) => {
    return (
        <div>
            <p>{log.log}</p>
            <i>{log.date}</i>
        </div>
    )
}