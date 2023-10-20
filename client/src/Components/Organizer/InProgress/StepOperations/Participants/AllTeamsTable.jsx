/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { useGetTeamByIdQuery } from "../../../../../redux/api/player/playerApi";
import { useTeamsApprovalMutation } from "../../../../../redux/api/organizer/orgApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function TeamPlayers({ teamData }) {
  const content =
    teamData &&
    teamData?.team_players.map((team, index) => {
      return (
        <Card
          key={index}
          color="transparent"
          shadow={true}
          className="w-full px-2 transition-all duration-400 hover:border-orange-500 border-2"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 p-2 "
          >
            <Avatar
              size="md"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="capitalize"
                >
                  {team?.player.first_name}
                </Typography>
              </div>
              <Typography color="blue-gray">{team?.player.email_id}</Typography>
            </div>
            <div className="self-start">
              {team?.player.gender == 1 ? (
                <MaleIcon className="text-blue-500" />
              ) : (
                <FemaleIcon className="text-pink-300" />
              )}
            </div>
          </CardHeader>

          <CardBody className="mb-2 p-0 ">hidden text</CardBody>
        </Card>
      );
    });

  return content;
}

function TeamDetailsDialog({
  openTeamDetails,
  handleShowTeamDetails,
  teamId,
  refetchAllTeamsData
}) {

  const params = useParams()
  const {
    data: teamData,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetTeamByIdQuery(teamId);

  const [teamsApproval, {isLoading: teamApproving, isSuccess: teamApproveSuccess}] = useTeamsApprovalMutation()
  const approveTeam =async ({approve,team_id })=>{
    const toSend = {
      tournament_id: params.tourId,
      tournament_game_id: params.tour_game_id,
      team_id,
      approve
    }
    const teamApproved = await teamsApproval(toSend).unwrap()
    refetchAllTeamsData()
    console.log(teamApproved)
    if(teamApproved?.status === "error" && teamApproved?.status_code === 400){
      toast.error(teamApproved.message)
    }
    handleShowTeamDetails(false)
  }

  if(isLoading)
    return <h1>...loading</h1>
  if (isSuccess) {
    return (
      <>
        <Dialog
          open={openTeamDetails}
          handler={() => handleShowTeamDetails(false)}
          size="lg"
        >
          <DialogHeader>Team Details</DialogHeader>
          <DialogBody className="h-72 overflow-auto" divider>
            {/* Start of team details  */}
            <div className="w-full h-24 py-2 px-4">
              <div>
                <p>
                  No of Boys: {teamData?.data?.no_of_boys}
                </p>
                <p>
                  No of Girls: {teamData?.data?.no_of_girls}
                </p>
                <p>
                  Created by: {teamData?.data?.admin?.email_id}
                </p>
              </div>
            </div>
            {/* End of team details  */}
            {/* Team member started */}
            <div className="w-full h-auto grid grid-auto-fit-lg gap-6  p-4">
              <TeamPlayers teamData={teamData?.data} />
            </div>
            {/* Team member ended */}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => approveTeam({approve: false, team_id: teamData?.data?.id })}
              className="mr-1"
            >
              Reject
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => approveTeam({approve: true, team_id: teamData?.data?.id })}
            >
              Confirm
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  }
  else{
    return <h1>Nothing to show here</h1>
  }
}

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Approved",
    value: "Approved",
  },
  {
    label: "Rejected",
    value: "Rejected",
  },
];

const TABLE_HEAD = ["Admin", "Team Name", "Status", "Points", "Net run rate"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    team_name: "crazy soul",
    status: true,
    points: 23,
    netRunRate: 2.4,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    team_name: "Programator",
    status: false,
    points: 23,
    netRunRate: 2.4,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    team_name: "Executive",
    status: true,
    points: 23,
    netRunRate: 2.4,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    team_name: "Programator",
    status: false,
    points: 23,
    netRunRate: 2.4,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    team_name: "Manager",
    status: true,
    points: 23,
    netRunRate: 2.4,
  },
];

export default function AllTeamsTable({ allTeams, refetchAllTeamsData }) {
  const [openTeamDetails, setOpenTeamDetails] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const handleShowTeamDetails = (teamId) => {
    setSelectedTeamId(teamId); // Set the selected teamId when a row is clicked
    setOpenTeamDetails(!openTeamDetails);
  };

  console.log(allTeams);
  return (
    <>
      <TeamDetailsDialog
        openTeamDetails={openTeamDetails}
        setOpenTeamDetails={setOpenTeamDetails}
        handleShowTeamDetails={handleShowTeamDetails}
        teamId={selectedTeamId}
        refetchAllTeamsData={refetchAllTeamsData}
      />
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                All Registered Teams
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all registered teams to approve them in
                tournament game
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
              {allTeams &&
                allTeams.map((team, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr
                      onClick={() => {
                        handleShowTeamDetails(team?.id);
                      }}
                      key={index}
                      className="hover:bg-gray-100 hover:cursor-pointer"
                    >
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {/* <Avatar src={img} alt={name} size="sm" /> */}
                          <Avatar
                            src={
                              "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
                            }
                            alt={team?.name}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {team?.admin?.first_name +
                                " " +
                                team?.admin?.last_name}
                            </Typography>
                            {/* <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {email}
                            </Typography> */}
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {team?.name}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={team?.verified === 1 ? "verified" : "not verfied"}
                            color={team?.verified === 1? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {team?.points ? team?.points : 0}
                        </Typography>
                      </td>
                      <td className={classes}>{team?.nr ? team?.nr : 0}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
