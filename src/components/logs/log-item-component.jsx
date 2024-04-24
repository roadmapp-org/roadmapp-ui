export const LogItemComponent = ({log, index}) => {
    return (
        <div className="bg-amber-200 shadow overflow-hidden sm:rounded-lg p-6 mb-4 w-full bg-color-3 rounded-lg">
            <div className="flex w-full justify-between">
                <i className="text-custom-grey-2">{log.date.split(" ")[0]}</i>
                <i className="text-custom-grey-2">{log.date.split(" ")[1]}</i>
            </div>
            <p className="mt-2 text-gray-700">{log.log}</p>
        </div>
    );
}