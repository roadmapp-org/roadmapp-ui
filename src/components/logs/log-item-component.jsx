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
        <div className="overflow-hidden sm:rounded-lg px-6 pt-6 pb-3 mb-4 w-full rounded-lg shadow-custom-black bg-custom-white">
            <div className="flex w-full justify-between">
                <i className="text-custom-grey-2">{formatDate(log.date)}</i>
                <i className="text-custom-grey-2">{log.date.split(" ")[1]}</i>
            </div>
            {breakLines(log.log)}
            <div className={`flex flex-col w-full mt-4 justify-evenly`}>
                <div className="bg-custom-grey rounded-lg text-xs px-3 mb-1 max-w-max">
                    #Cumpleaños de Leo Messi
                </div>
                <div className="bg-custom-grey rounded-lg text-xs px-3 mb-1 grow-0 max-w-max">
                    #Audio
                </div>
            </div>
        </div>
    );
}