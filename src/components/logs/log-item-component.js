export const LogItemComponent = ({item, index}) => {
    return (
        <div>
            {item.logList.map((log, index) => (
                <>
                    <p>{log.log}</p>
                    <i>{log.date}</i>
                </>
            ))}
        </div>
    )
}