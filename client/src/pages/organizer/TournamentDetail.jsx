/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRequest, postRequest, patchRequest } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { FaUndoAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Team", "Matches", "Win", "Loose", "Points"];

const TournamentDetail = () => {
  const [commentVisible, setCommentVisible] = useState(true);
  const [squadVisible, setSquadVisible] = useState(false);
  const [org, setOrg] = useState([]);
  const [commentry, setCommentry] = useState([]);
  const [userData, setUserData] = useState("");
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStarted, setIsStarted] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [tData, setTData] = useState([]);
  const navigate = useNavigate();
  const [adminComment, setAdminComment] = useState("");
  let { id } = useParams();
  let initialDuration = 20;

  const [timer, setTimer] = useState(initialDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `tournaments/${id}`;
        const data = await getRequest(url);
        setOrg(data.data);
        console.log('====================================');
        console.log(data);
        console.log('====================================');

        if (data.data.organizer_id === userData.id) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setCommentry(data.data.commentry);

        const teamData = await getRequest(
          `players/team/tournament_id/${id}?token=${token}`
        );

        const sortedData = [...teamData.data].sort(
          (a, b) => b.points - a.points
        );
        setTData(sortedData);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    const intervalId = setInterval(fetchTournamentData, 1000);
    return () => clearInterval(intervalId);
  }, [commentry, id, token, userData.id]);



  useEffect(() => {
    let countdown;

    if (isTimerRunning) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [isTimerRunning, tData]);

  const toggleTimer = () => {
    setIsTimerRunning((prevIsTimerRunning) => !prevIsTimerRunning);
  };
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
              (existingMatch.team1 === match.team1 &&
                existingMatch.team2 === match.team2) ||
              (existingMatch.team1 === match.team2 &&
                existingMatch.team2 === match.team1)
          ) &&
          !isTeam1Bye &&
          !isTeam2Bye;

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

  const incrementScore = (
    player,
    team_id,
    team_score,
    team_name,
    team_collegeName
  ) => {
    const jsonData = {
      score: team_score + 1,
    };
    patchRequest(`/players/create_team/${team_id} `, jsonData, token)
      .then((data) => {
        if (data.status == "success") {
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
          const jsonString = {
            comment: `${team_name} from ${team_collegeName} scores 1 score. Now total score of ${team_name} is ${jsonData.score}`,
          };
          postRequest(
            `/organizer/tournament/${id}/comments`,
            jsonString,
            token
          );
        }
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

  const handleComment = () => {
    const jsonString = {
      comment: adminComment,
    };
    postRequest(`/organizer/tournament/${id}/comments`, jsonString, token);

    setAdminComment("");
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

                  <p className="mb-1">
                    Starts on : {new Date(org.start_date).getDate()}/
                    {new Date(org.start_date).getMonth()}/
                    {new Date(org.start_date).getFullYear()}
                  </p>
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
                  {matchSchedule.map((item, index) => (
                    <div key={index} className="">
                      <div className=" p-4 bg-gray-50 shadow-lg rounded-lg rounded-b-[55px] mb-10 ">
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
                                        disabled={isTimerRunning ? false : true}
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
                                        {item.team1.score}
                                      </p>
                                      <button
                                        disabled={isTimerRunning ? false : true}
                                        className="bg-green-600 text-white w-full py-1"
                                        onClick={() =>
                                          incrementScore(
                                            "player1",
                                            item.team1.id,
                                            item.team1.score,
                                            item.team1.name,
                                            item.team1.admin.college
                                          )
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
                                        {item.team1.score}
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
                            <div className="text-2xl font-bold">{`${Math.floor(
                              timer / 60
                            )
                              .toString()
                              .padStart(2, "0")}:${(timer % 60)
                              .toString()
                              .padStart(2, "0")}`}</div>

                            {isAdmin ? (
                              <>
                                {timer == 0 ? (
                                  <>
                                    <p>Finished</p>
                                  </>
                                ) : (
                                  <>
                                    <div className="mt-2">
                                      <button
                                        className={
                                          isTimerRunning
                                            ? "bg-red-300 px-2 py-1 rounded-lg"
                                            : "bg-green-300 px-2 py-1 rounded-lg"
                                        }
                                        onClick={toggleTimer}
                                      >
                                        {isTimerRunning
                                          ? "Stop The Match"
                                          : "Start The Match"}
                                      </button>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : null}
                          </div>

                          <div className="flex flex-row items-center gap-4">
                            <div className="mb-2 mr-10">
                              {isAdmin ? (
                                <>
                                  <div className="flex flex-row items-center  gap-4">
                                    <div>
                                      <p className="bg-gray-100 border p-5 font-black">
                                        {item.team2.score}
                                      </p>
                                      <button
                                        disabled={isTimerRunning ? false : true}
                                        className="bg-green-600 text-white w-full py-1"
                                        onClick={() =>
                                          incrementScore(
                                            "player2",
                                            item.team2.id,
                                            item.team2.score,
                                            item.team2.name,
                                            item.team2.admin.college
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </div>
                                    <div>
                                      <button
                                        disabled={isTimerRunning ? false : true}
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
                                        {item.team2.score}
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

                        <div className="bg-gray-200 -m-4 p-4 rounded-b-full">
                          {timer == 0 ? (
                            <>
                              <div className="px-6 flex flex-row items-center justify-center gap-4">
                                <div>
                                  {item.team1.score > item.team2.score ? (
                                    <>
                                      <p className="text-sm font-semibold">
                                        Won by {item.team1.name} from{" "}
                                        {item.team1.admin.college} by{" "}
                                        {item.team1.score - item.team2.score}{" "}
                                        points
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p className="text-sm font-semibold">
                                        Won by {item.team2.name} from{" "}
                                        {item.team2.admin.college} by{" "}
                                        {item.team2.score - item.team1.score}{" "}
                                        points
                                      </p>
                                    </>
                                  )}
                                </div>
                                <button
                                  onClick={() => {
                                    if (item.team1.score > item.team2.score) {
                                      const jsonData = {
                                        matches: item.team1.matches + 1,
                                        win: item.team1.win + 1,
                                        points: item.team1.points + 2,
                                      };
                                      const jsonData2 = {
                                        matches: item.team2.matches + 1,
                                        loose: item.team2.loose + 1,
                                      };
                                      patchRequest(
                                        `/players/create_team/${item.team1.id} `,
                                        jsonData,
                                        token
                                      )
                                        .then((data) => {})
                                        .catch((error) => {
                                          if (
                                            error.response &&
                                            error.response.status === 400
                                          ) {
                                            console.error("API error");
                                          } else {
                                            console.error("API error:", error);
                                          }
                                        });
                                      patchRequest(
                                        `/players/create_team/${item.team2.id} `,
                                        jsonData2,
                                        token
                                      )
                                        .then((data) => {})
                                        .catch((error) => {
                                          if (
                                            error.response &&
                                            error.response.status === 400
                                          ) {
                                            console.error("API error");
                                          } else {
                                            console.error("API error:", error);
                                          }
                                        });
                                    } else {
                                      const jsonData = {
                                        matches: item.team1.matches + 1,
                                        loose: item.team1.loose + 1,
                                      };
                                      const jsonData2 = {
                                        matches: item.team2.matches + 1,

                                        win: item.team2.win + 1,
                                        points: item.team2.points + 2,
                                      };
                                      patchRequest(
                                        `/players/create_team/${item.team1.id} `,
                                        jsonData,
                                        token
                                      )
                                        .then((data) => {})
                                        .catch((error) => {
                                          if (
                                            error.response &&
                                            error.response.status === 400
                                          ) {
                                            console.error("API error");
                                          } else {
                                            console.error("API error:", error);
                                          }
                                        });
                                      patchRequest(
                                        `/players/create_team/${item.team2.id} `,
                                        jsonData2,
                                        token
                                      )
                                        .then((data) => {})
                                        .catch((error) => {
                                          if (
                                            error.response &&
                                            error.response.status === 400
                                          ) {
                                            console.error("API error");
                                          } else {
                                            console.error("API error:", error);
                                          }
                                        });
                                    }
                                  }}
                                  className="bg-gray-400 px-3 rounded-md font-medium hover:bg-gray-500"
                                >
                                  Declare
                                </button>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div>
                    
                    

                    <div className="flex flex-row gap-4 mb-4 ">
                      <button
                        className={`${
                          commentVisible
                            ? "bg-orange-400 md:p-3 p-2 rounded-xl "
                            : "p-3"
                        } `}
                        onClick={() => {
                          if (commentVisible == false) {
                            setCommentVisible(true);
                            setSquadVisible(false);
                            
                          } else setCommentVisible(true);
                        }}
                      >
                        <p className="md:text-md text-[12px]">Commentry</p>
                      </button>

                      <button
                        className={`${
                          squadVisible ? "bg-orange-400 md:p-3 p-2 rounded-xl " : "p-3"
                        } `}
                        onClick={() => {
                          if (squadVisible == false) {
                            setCommentVisible(false);
                            
                            setSquadVisible(true);
                          } else setSquadVisible(true);
                        }}
                      >
                        <p className="md:text-md text-[12px]">Squads</p>
                      </button>

                      
                    </div>

                    {commentry.map((item, index) => (
                      <div key={index}>
                       {
                        item.comment ?

                        <>
                         <div className="bg-gray-50 my-2 text-gray-800  p-4 rounded-2xl text-[14px] flex flex-row justify-between items-center">
                          <p>{item.comment}</p>

                          <p className="text-xs text-gray-600">
                            {new Date(item.createdAt).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              hour12: true,
                            })}
                          </p>
                        </div>
                        </>
                        :
                        <>he</>
                       }
                      </div>
                    ))}
                  </div>
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
                        <div className=" p-4 bg-gray-50 shadow-lg rounded-b-full mb-10 ">
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
                                          disabled={timer == 0 ? true : false}
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
                                          {item.team1.score}
                                        </p>
                                        <button
                                          disabled={timer == 0 ? true : false}
                                          className="bg-green-600 text-white w-full py-1"
                                          onClick={() =>
                                            incrementScore(
                                              "player1",
                                              item.team1.id,
                                              item.team1.score,
                                              item.team1.name,
                                              item.team1.admin.college
                                            )
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
                                          {item.team1.score}
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
                                          {item.team2.score}
                                        </p>
                                        <button
                                          disabled={timer == 0 ? true : false}
                                          className="bg-green-600 text-white w-full py-1"
                                          onClick={() =>
                                            incrementScore(
                                              "player2",
                                              item.team2.id,
                                              item.team2.score,
                                              item.team2.name,
                                              item.team2.admin.college
                                            )
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          disabled={timer == 0 ? true : false}
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
                                          {item.team2.score}
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
                    {isRegistered ? (
                      <>
                        <p>registered</p>
                      </>
                    ) : (
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
                    )}
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

            <div className="border-t border-gray-400 mt-20 py-10">
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Commentry
                </label>
                <textarea
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-300  focus:ring-2 focus:ring-orange-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              <button
                onClick={handleComment}
                className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded-md text-lg"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TournamentDetail;
