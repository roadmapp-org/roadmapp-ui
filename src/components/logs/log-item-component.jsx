export const LogItemComponent = ({log, index}) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-4 w-full">
            <i className="text-gray-500">{log.date}</i>
            <p className="mt-2 text-gray-700">{log.log}</p>
        </div>
    );
}