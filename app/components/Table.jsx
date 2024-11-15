"use client"
import { useState, useEffect } from "react";
import axiosInstance from "../shared/axiosinstance";

export default function Table() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    function GetTrips() {
        axiosInstance.get("bus")
            .then((response) => {
                setTrips(response.data);
                console.log(response);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function PostTrip(tripId) {
        axiosInstance.post(`busId?busId=${tripId}`)
            .then((response) => {
                console.log("ok ", response);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    useEffect(() => {

            if (!localStorage.getItem("token")) {
                window.location.href = "/login"
            }

        GetTrips();
    }, []);

    function formatTime(time) {
        const [hours, minutes] = time.split(":");
        const formattedHours = hours.startsWith("0") ? hours.slice(1) : hours;
        return `${formattedHours}:${minutes}`;
    }

    return (
        <div className="relative overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-white uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3">عدد المقاعد</th>
                        <th scope="col" className="px-6 py-3">التوقيت</th>
                    </tr>
                </thead>

                <tbody className="text-white">
                    {loading ? (
                        <tr>
                            <td colSpan="3" className="text-center py-32">
                                <div className="flex justify-center items-center h-full">
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        trips.map((trip, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                    <button
                                        type="button"
                                        onClick={() => PostTrip(trip.id)}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"                                    >
                                        حجز
                                    </button>
                                </th>
                                <td className="px-6 py-4 text-center sm:text-left">
                                    {trip.capacity}
                                </td>
                                <td className="px-6 py-4 text-center sm:text-left">
                                    {formatTime(trip.startTime)}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}




{/* <tbody className="text-white">
<tr className="bg-white border-b dark:bg-gray-800  dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white">
    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">ممتلئ</button>
    </th>
    <td className="px-6 py-4 text-center sm:text-left">
        40
    </td>
    <td className="px-6 py-4 text-center sm:text-left">
        12:30
    </td>

</tr>
<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">متوفر</button>
    </th>
    <td className="px-6 py-4 text-center sm:text-left">
        40
    </td>
    <td className="px-6 py-4 text-center sm:text-left">
        1:30
    </td>

</tr>
<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">متوفر</button>
    </th>
    <td className="px-6 py-4 text-center sm:text-left">
        40
    </td>
    <td className="px-6 py-4 text-center sm:text-left">
        2:30
    </td>

</tr>
<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">ممتلئ</button>
    </th>
    <td className="px-6 py-4 text-center sm:text-left">
        40
    </td>
    <td className="px-6 py-4 text-center sm:text-left">
        3:30
    </td>

</tr>
<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">متوفر</button>
    </th>
    <td className="px-6 py-4 text-center sm:text-left">
        40
    </td>
    <td className="px-6 py-4 text-center sm:text-left">
        4:30
    </td>

</tr>
</tbody> */}