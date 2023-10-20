import { useEffect, useState } from "react";
//import { useDispatch } from "react-redux";
//import { getTournamentByID } from "../redux/slices/Tournament/tournamentAction";

export default function Details() {
  const [tourDetails, setTourDetails] = useState({});
  const [textareaValue, setTextareaValue] = useState(""); // Adding state for the textarea content
  //const dispatch = useDispatch();
  const tourID = localStorage.getItem("createdTournamentID");
  useEffect(() => {
    const fetchData = async () => {
    //   const response = await dispatch(getTournamentByID({ id: tourID }));
      // console.log('Data:', response.payload); // Access the data from the response
    //   setTourDetails(response.payload);
    };
    fetchData();
  }, []);

  console.log(tourDetails);

  return (
    <div className="h-full w-full min-h-screen">
      <div>
        <p className="text-gray-900 font-bold text-xl"> </p>
      </div>

      <div className="h-full flex flex-col">
        <textarea
         
          className="flex-grow w-full h-full border border-gray-500 px-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          placeholder="Enter details..."
          rows={10}
          value={textareaValue} // Set value from state
          onChange={(e) => setTextareaValue(e.target.value)} // Update state on change
        ></textarea>
      </div>
    </div>
  );
}
