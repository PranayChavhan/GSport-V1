/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { FaUndoAlt } from "react-icons/fa";
import { toast } from "react-toastify";


const TABLE_HEAD = ["Team", "Matches", "Win", "Loose", "Points"];
const TABLE_HEAD2 = ["Player", "College"];
const TournamentDetail = () => {
  const [org, setOrg] = useState([]);
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [tData, setTData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };
    const jwtToken = getCookie("jwt_auth_token");
    if (jwtToken) {
      setToken(jwtToken);
    } else {
      console.log("JWT Token not found in cookies");
    }
  }, []);

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      try {
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  let { id } = useParams();
  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `tournaments/${id}`;
        const data = await getRequest(url);
        setOrg(data.data);

        if (org.organizer_id === userData.id) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        if (new Date().toLocaleDateString() == new Date(org.start_date).toLocaleDateString()) {
          setIsStarted(true);
        }else{
          setIsStarted(false);
        }

        const teamData = await getRequest(
          `players/team/tournament_id/${id}?token=${token}`
        );
        setTData(teamData.data);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }


    };
    fetchTournamentData();
  }, [id, org.organizer_id, org.start_date, token, userData.id]);


  function generateMatchSchedule(teams) {
    const schedule = [];
    const numberOfTeams = teams.length;
    const isOddNumberOfTeams = numberOfTeams % 2 !== 0;
    for (let i = 0; i < numberOfTeams - 1; i++) {
      for (let j = i + 1; j < numberOfTeams; j++) {
        const match = {
          team1: teams[i],
          team2: teams[j],
        };
        const isTeam1Bye = isOddNumberOfTeams && j === numberOfTeams - 1;
        const isTeam2Bye = isOddNumberOfTeams && i === numberOfTeams - 1;
        const isMatchUnique =
          !schedule.some(
            (existingMatch) =>
              (existingMatch.team1 === match.team1 && existingMatch.team2 === match.team2) ||
              (existingMatch.team1 === match.team2 && existingMatch.team2 === match.team1)
          ) && !isTeam1Bye && !isTeam2Bye;
  
        if (isMatchUnique) {
          schedule.push(match);
        }
      }
    }
    return schedule;
  }
  const matchSchedule = generateMatchSchedule(tData);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const incrementScore = (player) => {
    if (player === "player1") {
      setPlayer1Score(player1Score + 1);
    } else if (player === "player2") {
      setPlayer2Score(player2Score + 1);
    }
  };
  const decrementScore = (player) => {
    if (player === "player1" && player1Score > 0) {
      setPlayer1Score(player1Score - 1);
    } else if (player === "player2" && player2Score > 0) {
      setPlayer2Score(player2Score - 1);
    }
  };
  const addToWishlist = () => {
    const jsonData = {
      user_id: userData.id,
      tournament_id: id,
    };
    postRequest("/players/add_to_wishlist", jsonData, token)
      .then((data) => {
        toast.success("Added to Wishlist!", {
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
          console.error("API error");
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

  
  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font">
        <div className=" flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={`http://127.0.0.1:8000/organizer/images/${org.image}`}
              />
            </div>
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font text-gray-900 text-lg">
                    {org.organizer_name}
                  </h2>
                  <div className="w-12 h-1 bg-yellow-500 rounded mt-2 mb-4"></div>

                  <p className="mb-1">Starts on : {new Date(org.start_date).getDate()}/{new Date(org.start_date).getMonth()}/{new Date(org.start_date).getFullYear()}</p>
                  <p className="mb-1">Badminton</p>
                  <p className="mb-1">Prize : 20000</p>
                  <p className="mb-1">Total teams : 8</p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4">
                  {org.organizer_info}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-7 pt-10">
          {isStarted ? (
            <>
             {
               <div className="col-start-1 col-end-5 ">
                {isAdmin ? (
                    <>
                    {matchSchedule.map((item, index) => (
                      <div key={index} className="">
                        <div className=" p-4 bg-gray-50 shadow-lg rounded-lg mb-10 ">
                          <div className="flex flex-row justify-between items-center mb-4 border-b-2 pb-2">
                            {/* <p>24 March 2023</p> */}
                            <p>Venue: PICT Campus </p>
                          </div>

                          <div className="flex flex-row items-center justify-between px-4 py-2">
                            <div className="flex flex-row items-center gap-4">
                              <div className="rounded-full">
                                <img
                                  className="w-20 h-20 rounded-full object-cover"
                                  src="https://i0.wp.com/www.poornima.edu.in/wp-content/uploads/2023/11/cricbuzz-womens-points-table-2023_c6a15de7f.jpg?strip=all"
                                  alt="Player 2"
                                />
                              </div>

                              <div className=" flex flex-col items-start">
                                <h2 className="text-lg ">{item.team1.name}</h2>
                                <p>{item.team1.admin.college}</p>
                              </div>
                              <div className="mb-2 ml-10">
                                {isAdmin ? (
                                  <>
                                    <div className="flex flex-row items-center  gap-4">
                                      <div>
                                        <button
                                          className="text-red-500"
                                          onClick={() =>
                                            decrementScore("player1")
                                          }
                                        >
                                          <FaUndoAlt />
                                        </button>
                                      </div>

                                      <div>
                                        <p className="bg-gray-100 border p-5 font-black">
                                          {player1Score}
                                        </p>
                                        <button
                                          className="bg-green-600 text-white w-full py-1"
                                          onClick={() =>
                                            incrementScore("player1")
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex flex-row items-center  gap-4">
                                      <div>
                                        <p className="bg-gray-100 border p-5 font-black">
                                          {player1Score}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="w-1/4 p-4 flex flex-col items-center">
                              <h2 className="text-lg font-semibold mb-2">
                                Timer
                              </h2>
                              <div className="text-2xl font-bold">00:30</div>
                            </div>

                            <div className="flex flex-row items-center gap-4">
                              <div className="mb-2 mr-10">
                                {isAdmin ? (
                                  <>
                                    <div className="flex flex-row items-center  gap-4">
                                      <div>
                                        <p className="bg-gray-100 border p-5 font-black">
                                          {player2Score}
                                        </p>
                                        <button
                                          className="bg-green-600 text-white w-full py-1"
                                          onClick={() =>
                                            incrementScore("player2")
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          className="text-red-500"
                                          onClick={() =>
                                            decrementScore("player2")
                                          }
                                        >
                                          <FaUndoAlt />
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex flex-row items-center  gap-4">
                                      <div>
                                        <p className="bg-gray-100 border p-5 font-black">
                                          {player2Score}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="rounded-full">
                                <img
                                  className="w-20 h-20 rounded-full object-cover"
                                  src="https://i0.wp.com/www.poornima.edu.in/wp-content/uploads/2023/11/cricbuzz-womens-points-table-2023_c6a15de7f.jpg?strip=all"
                                  alt="Player 2"
                                />
                              </div>

                              <div className=" flex flex-col items-start">
                                <h2 className="text-lg ">{item.team2.name}</h2>
                                <p>{item.team2.admin.college}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                       ))}
                    </>
                  ) : (
                    <>
                      {
                        isRegistered 
                        ?-
                        <>
                        <p>registered</p>
                        </>
                        :
                        <>
                        <div className="col-start-1 col-end-5">
                        <Link
                          to={`/organizer/register/player-details/${id}`}
                          className="flex-shrink-0 ml-[21rem] shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg sm:mt-0"
                        >
                          Register
                        </Link>

                        <button
                          onClick={addToWishlist}
                          className="flex-shrink-0 ml-10 shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg sm:mt-0"
                        >
                          Add to wishlist
                        </button>
                      </div>
                        </>
                      }
                    </>
                  )}
               
                  </div>
              
             }
            </>
          ) : (
            <>
             
                <div className="col-start-1 col-end-5 ">
                {isAdmin ? (
                    <>
                    {matchSchedule.map((item, index) => (

                   
                      <div key={index} className="">
                        <div className=" p-4 bg-gray-50 shadow-lg rounded-lg mb-10 ">
                          <div className="flex flex-row justify-between items-center mb-4 border-b-2 pb-2">
                            {/* <p>24 March 2023</p> */}
                            <p>Venue: PICT Campus </p>
                          </div>

                          <div className="flex flex-row items-center justify-between px-4 py-2">
                            <div className="flex flex-row items-center gap-4">
                              <div className="rounded-full">
                                <img
                                  className="w-20 h-20 rounded-full object-cover"
                                  src="https://i0.wp.com/www.poornima.edu.in/wp-content/uploads/2023/11/cricbuzz-womens-points-table-2023_c6a15de7f.jpg?strip=all"
                                  alt="Player 2"
                                />
                              </div>

                              <div className=" flex flex-col items-start">
                                <h2 className="text-lg ">{item.team1.name}</h2>
                                <p>{item.team1.admin.college}</p>
                              </div>
                              <div className="mb-2 ml-10">
                                {isAdmin ? (
                                  <>
                                    <div className="flex flex-row items-center  gap-4">
                                      <div>
                                        <button
                                          className="text-red-500"
                                          onClick={() =>
                                            decrementScore("player1")
                                          }
                                        >
                                          <FaUndoAlt />
                                        </button>
                                      </div>

                                      <div>
                                        <p className="bg-gray-100 border p-5 font-black">
                                          {player1Score}
                                        </p>
                                        <button
                                          className="bg-green-600 text-white w-full py-1"
                                          onClick={() =>
                                            incrementScore("player1")
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex flex-row items-center  gap-4">
                                      <div>
                                        <p className="bg-gray-100 border p-5 font-black">
                                          {player1Score}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="w-1/4 p-4 flex flex-col items-center">
                              <h2 className="text-lg font-semibold mb-2">
                                Timer
                              </h2>
                              <div className="text-2xl font-bold">00:30</div>
                            </div>

                            <div className="flex flex-row items-center gap-4">
                              <div className="mb-2 mr-10">
                                {isAdmin ? (
                                  <>
                                    <div className="flex flex-row items-center  gap-4">
                                      <div>
                                        <p className="bg-gray-100 border p-5 font-black">
                                          {player2Score}
                                        </p>
                                        <button
                                          className="bg-green-600 text-white w-full py-1"
                                          onClick={() =>
                                            incrementScore("player2")
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          className="text-red-500"
                                          onClick={() =>
                                            decrementScore("player2")
                                          }
                                        >
                                          <FaUndoAlt />
                                        </button>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex flex-row items-center  gap-4">
                                      <div>
                                        <p className="bg-gray-100 border p-5 font-black">
                                          {player2Score}
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="rounded-full">
                                <img
                                  className="w-20 h-20 rounded-full object-cover"
                                  src="https://i0.wp.com/www.poornima.edu.in/wp-content/uploads/2023/11/cricbuzz-womens-points-table-2023_c6a15de7f.jpg?strip=all"
                                  alt="Player 2"
                                />
                              </div>

                              <div className=" flex flex-col items-start">
                                <h2 className="text-lg ">{item.team2.name}</h2>
                                <p>{item.team2.admin.college}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                       ))}
                    </>
                  ) : (
                    <>
                      {
                        isRegistered 
                        ?
                        <>
                        <p>registered</p>
                        </>
                        :
                        <>
                        <div className="col-start-1 col-end-5">
                        <Link
                          to={`/organizer/register/player-details/${id}`}
                          className="flex-shrink-0 ml-[21rem] shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg sm:mt-0"
                        >
                          Register
                        </Link>

                        <button
                          onClick={addToWishlist}
                          className="flex-shrink-0 ml-10 shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg sm:mt-0"
                        >
                          Add to wishlist
                        </button>
                      </div>
                        </>
                      }
                    </>
                  )}
               
                  </div>
              
            </>
          )}

          <div className="col-start-5 col-end-8 pl-24">
            <Card className=" w-full overflow-hidden">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tData.map(({ name, matches, win, loose, points }, index) => (
                    <tr key={name} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {matches}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {win}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {loose}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {points}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>

        <div className="border-t border-gray-400 mt-20 py-10">
          <p>Result</p>
        </div>
      </section>
    </div>
  );
};

export default TournamentDetail;
