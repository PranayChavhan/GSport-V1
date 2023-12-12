/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRequest } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { FaUndoAlt } from "react-icons/fa";

const TABLE_HEAD = ["Player", "Matches", "Win", "Loose", "Points"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    Matches: 4,
    Win: 4,
    Loose: 0,
    Points: 8,
  },
  {
    name: "Alexa Liras",
    Matches: 4,
    Win: 3,
    Loose: 1,
    Points: 6,
  },
  {
    name: "Laurent Perrier",
    Matches: 4,
    Win: 2,
    Loose: 2,
    Points: 4,
  },
  {
    name: "Michael Levi",
    Matches: 4,
    Win: 2,
    Loose: 2,
    Points: 4,
  },
  {
    name: "Richard Gran",
    Matches: 4,
    Win: 0,
    Loose: 4,
    Points: 0,
  },
];


const TABLE_HEAD2 = ["Player", "College"];

const TABLE_ROWS2 = [
  {
    name: "John Michael",
    college: "PICT"
  },
  {
    name: "Alexa Liras",
    college: "COEP"
  },
  {
    name: "Laurent Perrier",
    college: "VIT"
  },
  {
    name: "Michael Levi",
    college: "DY Patil"
  },
  {
    name: "Richard Gran",
    college: "IIIT"
  },
];


const TournamentDetail = () => {
  const [org, setOrg] = useState([]);
  const [userData, setUserData] = useState("");

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
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    fetchTournamentData();
  }, [id]);
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

  const isStarted = false;

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

                  <p className="mb-1">Close on : 24 March 2023</p>
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

      {
        isStarted
        ?
        <>
         <section>
        <div className="grid grid-cols-7 pt-10">
          <div className="col-start-1 col-end-5 ">
            <div className=" p-4 bg-white shadow-lg rounded-lg ">
              <div className="flex flex-row justify-between items-center mb-4 border-b-2 pb-2">
                <p>24 March 2023</p>
                <p>Venue: PICT Campus </p>
              </div>

              <div className="flex flex-row items-center justify-between px-4 py-2">
                {/* Player 1 */}
                <div className="flex flex-row items-center gap-4">
                  <div className="rounded-full">
                    <img
                      className="w-20 h-20 rounded-full object-cover"
                      src="https://i0.wp.com/www.poornima.edu.in/wp-content/uploads/2023/11/cricbuzz-womens-points-table-2023_c6a15de7f.jpg?strip=all"
                      alt="Player 2"
                    />
                  </div>

                  <div className=" flex flex-col items-start">
                    <h2 className="text-lg ">Pranay</h2>
                    <p>PICT</p>
                  </div>
                  <div className="mb-2 ml-10">
                    {userData.id == org.organizer_id ? (
                      <>
                        <div className="flex flex-row items-center  gap-4">
                          <div>
                            <button
                              className="text-red-500"
                              onClick={() => decrementScore("player1")}
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
                              onClick={() => incrementScore("player1")}
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
                {/* Timer */}
                <div className="w-1/4 p-4 flex flex-col items-center">
                  <h2 className="text-lg font-semibold mb-2">Timer</h2>
                  <div className="text-2xl font-bold">00:30</div>
                </div>

                {/* Player 2 */}

                <div className="flex flex-row items-center gap-4">
                  <div className="mb-2 mr-10">
                    {userData.id == org.organizer_id ? (
                      <>
                        <div className="flex flex-row items-center  gap-4">
                          <div>
                            <p className="bg-gray-100 border p-5 font-black">
                              {player2Score}
                            </p>
                            <button
                              className="bg-green-600 text-white w-full py-1"
                              onClick={() => incrementScore("player2")}
                            >
                              +
                            </button>
                          </div>
                          <div>
                            <button
                              className="text-red-500"
                              onClick={() => decrementScore("player2")}
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
                    <h2 className="text-lg ">Karan</h2>
                    <p>COEP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-start-5 col-end-8 pl-24">
            <Card className=" w-full overflow-scroll">
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
                  {TABLE_ROWS.map(
                    ({ name, Matches, Win, Loose, Points }, index) => (
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
                            {Matches}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {Win}
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
                            {Loose}
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
                            {Points}
                          </Typography>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </section>

        </>
        :
        <>

<section>
        <div className="grid grid-cols-7 pt-10">
          <div className="col-start-1 col-end-5">
          <Link 
          to="/organizer/player-details" 
          className="flex-shrink-0 ml-[21rem] shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg sm:mt-0">
            Register
            </Link>

            <Link 
          to="/organizer/wishlist" 
          className="flex-shrink-0 ml-10 shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg sm:mt-0">
            Add to wishlist
            </Link>
    
          </div>

          <div className="col-start-5 col-end-8 mr-[16rem]">
            <p className="pb-4 text-lg font-bold pl-1">Registered Players</p>
            <Card className=" w-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD2.map((head) => (
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
                  {TABLE_ROWS2.map(
                    ({ name, college }, index) => (
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
                            {college}
                          </Typography>
                        </td>
                        
                        
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </section>

        </>
      }

         </div>
  );
};

export default TournamentDetail;
