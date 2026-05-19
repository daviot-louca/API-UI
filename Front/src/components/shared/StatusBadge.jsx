function StatusBadge({ status }) {

    let statusColor = "";

    if (status === "ouvert") {

        statusColor =
            "bg-red-100 text-red-600";

    } else if (status === "en cours") {

        statusColor =
            "bg-yellow-100 text-yellow-700";

    } else if (status === "résolu") {

        statusColor =
            "bg-green-100 text-green-700";

    } else if (status === "remis") {

        statusColor =
            "bg-blue-100 text-blue-700";
    }

    return (

        <div
            className={`${statusColor} px-4 py-2 rounded-xl font-medium text-center`}
        >

            {status}

        </div>
    );
}

export default StatusBadge;