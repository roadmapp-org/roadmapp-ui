export const LogItemComponent = ({log, index}) => {
    
    const formatDate = (date) => {
        const d = new Date(date);
        const day = d.getDate().toString().length === 1 ? `0${d.getDate()}` : d.getDate();
        const month = (d.getMonth() + 1).toString().length === 1 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
        return `${day}-${month}-${d.getFullYear()}`;
    }

    const breakLines = (text) => {
        return text.split("\\\\n").map((item, index) => {
            return <p key={index} className="mt-2 text-gray-700" >{item}</p>
        });
    }

    return (
        <div className="bg-amber-200 shadow overflow-hidden sm:rounded-lg p-6 mb-4 w-full bg-color-3 rounded-lg">
            <div className="flex w-full justify-between">
                <i className="text-custom-grey-2">{formatDate(log.date)}</i>
                <i className="text-custom-grey-2">{log.date.split(" ")[1]}</i>
            </div>
            {breakLines(log.log)}
        </div>
    );
}