/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useCreateTournamentMutation } from "../../../redux/api/organizer/orgApi";
// import { useAppSelector } from "../../../redux/store";
import { Button, Spinner } from "@material-tailwind/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setTournamentDetails } from "../../../redux/features/tournamentSlice";
import CustomizedSteppers from "../../../components/Stepper";
import { useNavigate, useParams } from "react-router-dom";
import {
  patchRequest,
  getRequest
} from "../../../api/api";


function Success() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3">
        <p className="text-6xl">
          <CheckCircleOutlineIcon
            fontSize="inherit"
            className="text-green-400"
          />
        </p>
        <p className="font-poppins text-xl">Tournament Created Succesfully</p>
        <p className="font-poppins text-sm text-gray-600">
          Now you can add games to tournament
        </p>
      </div>
    </div>
  );
}

const Step1Update = () => {
  const navigate = useNavigate()
  let { id } = useParams();


  const [organizationName, setOrganizationName] = useState("");
  const [organizationDescription, setOrganizationDescription] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDescription, setTournamentDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [oid, setOid] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [idParam, setIdParam] = useState("");
  const [tournamentData, setTournamentData] = useState(null);


  const handleOrganizationNameChange = (event) => {
    setOrganizationName(event.target.value);
  };

  const handleOrganizationDescriptionChange = (event) => {
    setOrganizationDescription(event.target.value);
  };

  const handleTournamentNameChange = (event) => {
    setTournamentName(event.target.value);
  };

  const handleTournamentDescriptionChange = (event) => {
    setTournamentDescription(event.target.value);
  };


 useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = 'tournaments/DDbHeHy2rjuHuKb4';
        const data = await getRequest(url);
        setTournamentData(data.data);
        setOrganizationName(data.data.organizer_name);
        setOrganizationDescription(data.data.organizer_info);
        setTournamentName(data.data.name);
        setTournamentDescription(data.data.about);
        setStartDate(new Date(data.data.start_date));
        setEndDate(new Date(data.data.end_date));
      } catch (error) {
        console.error('Error fetching tournament data:', error);
      }
    };
    fetchTournamentData();
  }, []);
  
  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };
    const jwtToken = getCookie('jwt_auth_token');
    if (jwtToken) {
      setToken(jwtToken);
    } else {
      console.log('JWT Token not found in cookies');
    }
  }, []);




  useEffect(() => {
    // Fetch the item from localStorage
    const userId = localStorage.getItem('userData');
    if (userId) {
      try {
        const userData = JSON.parse(userId);
        setOid(userData.id);
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }
  }, []);


  
  const handleProceed = async () => {
    // Validate organizationName
  if (!organizationName) {
    toast.error('Please enter Organization Name.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return;
  }

  // Validate organizationDescription
  if (!organizationDescription) {
    toast.error('Please enter About Organisation.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return;
  }

  // Validate tournamentName
  if (!tournamentName) {
    toast.error('Please enter Tournament Name.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return;
  }

  // Validate tournamentDescription
  if (!tournamentDescription) {
    toast.error('Please enter About Tournament.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return;
  }

  // Validate startDate and endDate
  if (!startDate || !endDate) {
    toast.error('Please select both start and end dates.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return;
  }

  const toSent = {
    name: tournamentName,
    about: tournamentDescription,
    organizer_id: oid,
    organizer_name: organizationName,
    organizer_info: organizationDescription,
    start_date: new Date(startDate).toISOString(),
    end_date: new Date(endDate).toISOString(),
    is_payment_done: true,
    payment_id: "",
    is_active: true,
  };

  patchRequest(`organizer/tournament/${id}`, toSent, token)
        .then((data) => {
          // Handle a successful API response here
          console.log("API response:", data);
          toast.success("Updates successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }); 
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            console.error(
              "API error"
            );
            toast.error("An error occurred. Please try again.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            console.error("API error:", error);
          }
        });

  };


  const isLoading = false;

  return (
    <div className="w-full h-full">
                  <div className="w-full py-10">
            <CustomizedSteppers step={0} />
          </div>
      {isSuccess ? (
        <>
        <Success />
        <div className="w-full flex flex-row  items-center justify-center pt-10 gap-4">
            <Button
              color="orange"
              onClick={() => navigate(`/organizer/new-tournament/step2/${idParam}`)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full space-y-4">
          <div className=" mt-2 md:mt-4 w-full sm:w-4/4 lg:w-full py-2 md:py-5 rounded-lg flex flex-col  justify-center items-center shadow-md">
            <div className="flex flex-col gap-4 justify-between">
              <div className="flex flex-col justify-start w-full ">
                <p className=" text-blue-gray-700 text-2xl  md:text-3xl font-poppins font-bold ">
                  Organisational Details heh
                </p>

                <div className="mt-4 font-poppins ">
                  <div className="text-sm w-full">
                    <label htmlFor="organization" className="block mb-1 mt-2  ">
                      Organisation Name
                    </label>
                    <input
                      type="text"
                      id="organization"
                      className="border border-gray-500 px-4 py-2 rounded-lg focus:outline-none w-full  focus:border-orange-500 focus:ring-2 focus:ring-orange-200 "
                      placeholder="Enter Organisation Name"
                      value={organizationName}
                      onChange={handleOrganizationNameChange}
                    />
                  </div>
                  <div className="text-sm mt-6">
                    <label htmlFor="description" className="block mb-1 mt-4">
                      About Organisation {" "}
                    </label>
                    <textarea
                      id="description"
                      className="border border-gray-500 px-4 py-2 rounded-lg focus:outline-none w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 "
                      placeholder="Enter Organisation Description"
                      value={organizationDescription}
                      onChange={handleOrganizationDescriptionChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-start w-full ">
                <p className=" text-blue-gray-700 text-2xl md:text-3xl font-bold  ">
                  Tournament Details
                </p>
                <div className="flex mt-4">
                  <div className="text-sm  w-full">
                    <label htmlFor="tournament" className="block mb-1 mt-2">
                      Tournament Name
                    </label>
                    <input
                      type="text"
                      id="tournament"
                      className="border border-gray-500 px-4 py-2 rounded-lg focus:outline-none w-full  focus:border-orange-500 focus:ring-2 focus:ring-orange-200 "
                      placeholder="Enter Tournament Name"
                      value={tournamentName}
                      onChange={handleTournamentNameChange}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-sm l">
                    <label htmlFor="details" className="block mb-1 mt-4">
                      About Tournament{" "}
                    </label>
                    <textarea
                      id="details"
                      className="border border-gray-500 px-4 py-2 rounded-lg focus:outline-none w-full focus:border-orange-500 focus:ring-2 focus:ring-orange-200 "
                      placeholder="Enter Tournament Description"
                      value={tournamentDescription}
                      onChange={handleTournamentDescriptionChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
                  <DatePicker
                    selected={startDate}
                    showTimeSelect
                    onChange={(date) =>
                      setStartDate(date) }
                    className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm md:text-normal"
                    placeholderText="Select start Date"
                    selectsStart
                    dateFormat="Pp"
                    timeFormat="p"
                    startDate={startDate}
                    endDate={endDate}
                  />
                  <p className="font-poppins p-2 bg-gray-100 rounded-lg">To</p>
                  <DatePicker
                    selected={endDate}
                    showTimeSelect
                    onChange={(date) => setEndDate(date)}
                    className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200  text-sm md:text-normal"
                    placeholderText="Select End Date"
                    selectsStart
                    dateFormat="Pp"
                    timeFormat="p"
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                className="flex items-center justify-center bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-lg w-full"
                onClick={handleProceed}
              >
                {isLoading ? <Spinner color="amber" /> : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1Update;
