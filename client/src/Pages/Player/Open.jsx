import { Link } from "react-router-dom";
import { React, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

function UpdateDialog({buttonText,leftText,middleText}) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div className="flex items-center justify-between">
      {buttonText === "Apply Now" ? (
          <Link
            to={"/p/Info"}
            color="amber"
            variant="outlined"
            className="px-4 py-2 rounded-lg font-bold text-white bg-orange-500 flex gap-2 items-center justify-center w-auto border-none"
          >
            <p>{buttonText} </p>
          </Link>
        ) : (
          <Link
            color="amber"
            variant="outlined"
            
            className="px-4 py-2 rounded-lg font-bold text-white bg-orange-500 flex gap-2 items-center justify-center w-auto border-none"
          >
            <p>{buttonText} </p>
          </Link>
        )}
      <span className="ml-0  font-bold text-gray-900 bg-gray-200 px-4 py-2 rounded-lg">{middleText}</span>
      <span className="ml-0 font-bold text-gray-900 bg-gray-200 px-4 py-2 rounded-lg">{leftText}</span>
      </div>
     
    </>
  );
}

const Open = () => {
  const gamesData = [
    { name: "Game 1" },
    { name: "Game 2" },
    { name: "Game 3" },
    { name: "Game 4" },
    { name: "Game 5" },
    { name: "Game 6" },
    { name: "Game 7" },
    { name: "Game 8" },
    { name: "Game 9" },
  ];

  return (
    <div className="w-full p-4">
        <div className="w-full flex justify-between mb-4">
        <div className="bg-orange-200 w-full h-64 p-6 rounded-lg">
        <p className="text-4xl mt-8 text-white font-bold font-poppins">
          Games Open
        </p>
        <div className="mt-8">
        <Link
          to={"/p/games"}
          className="font-bold bg-orange-100 rounded-lg px-6 py-4 text-orange-500 hover:text-orange-500"
        >
         Back to all Games
        </Link>
        </div>
        </div>
      </div>

      <div className="grid grid-auto-fit-[25rem] gap-6">
        {gamesData.map((game, index) => (
          <Card
            key={index}
            className="w-fit border-2 hover:border-orange-500 cursor-pointer"
          >
            <CardBody>
              <Typography variant="h5" className="mb-2 capitalize">
                {game?.name}
              </Typography>
              {/* <img src="/footcric.jpg" alt="Game" className="w-full h-44 rounded-lg" /> */}
                <Typography className="mt-4">
                The place is close to Barceloneta Beach and bus stop just 2
                min by walk and near to "Naviglio" where you can enjoy the main
                night life in Barcelona.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <UpdateDialog buttonText="Apply Now" middleText="OPEN" leftText="STARTS 14/11/24"/>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Open;
