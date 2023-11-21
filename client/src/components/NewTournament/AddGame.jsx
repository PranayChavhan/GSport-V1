// /* eslint-disable no-unused-vars */
// import { useState } from "react";
// import {
//   Input,
//   Button,
//   Textarea,
//   Spinner,
//   Select as MSelect,
//   Option,
//   Card,
//   List,
//   ListItem,
//   ListItemPrefix,
//   Radio,
//   Typography,
// } from "@material-tailwind/react";
// import { useDispatch } from "react-redux";
// import Select from "react-select";
// import { useAddGameToTnmtMutation } from "../../../../redux/api/organizer/orgApi";
// import { useAppSelector } from "../../../../redux/store";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import DatePicker from "react-datepicker";
// import { useGetGamesQuery } from "../../../../redux/api/General/generalApi";
// import { toast } from "react-toastify";

// // icons

// const DateSelector = () => {
//   const [hours, setHours] = useState();
//   const [minutes, setMinutes] = useState();
//   const [startDate, setStartDate] = useState(
//     setHours(setMinutes(new Date(), 30), 16)
//   );
//   const [endDate, setEndDate] = useState(new Date("2014/02/10"));
//   return (
//     <div>
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         selectsStart
//         startDate={startDate}
//         endDate={endDate}
//         showTimeSelect
//         dateFormat="MMMM d, yyyy h:mm aa"
//       />
//       <DatePicker
//         selected={endDate}
//         onChange={(date) => setEndDate(date)}
//         selectsEnd
//         startDate={startDate}
//         endDate={endDate}
//         showTimeSelect
//         dateFormat="MMMM d, yyyy h:mm aa"
//         minDate={startDate}
//       />
//     </div>
//   );
// };

// const AddGame = ({ key, gameIndex }) => {
  
//   console.log(gameIndex);
//   const { id: tourId } = useAppSelector(
//     (state) => state.tournament.tour_details
//   );
//   const dispatch = useDispatch();
//   const [
//     addGameToTnmt,
//     { isSuccess, isLoading: isAddingGame, isError: errorWhileAddingGame },
//   ] = useAddGameToTnmtMutation();

//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [qualification, setQualification] = useState("Single Elimination");
//   const [game, setGame] = useState(null);
//   const [whoCanParticipate, setWhoCanParticipate] = useState(2);

//   const initialValues = {
//     name: null, // string
//     tournament_id: tourId, //string
//     game_id: null, // hardcoded from database 1 -> cricket
//     info: null, // string
//     prize_pool: null,
//     participation_fees: null,
//     team_size: null,
//     max_teams: null,
//     total_rounds: null,
//     min_boys: null,
//     min_girls: null,
//     open_to: whoCanParticipate,
//     min_age: null,
//     max_age: null,

//     // field to be added

//     type: qualification, // select field
//     num_groups: 0,
//     teams_per_group: 0,
//     avg_duration: 45,

//     start_date: startDate, // string
//     end_date: endDate, //string
//   };

//   const [values, setValues] = useState(initialValues);

//   const {
//     data: fetchedGames,
//     isLoading,
//     isFetching,
//     isSuccess: successGames,
//     isError: errorWhileGamesFetch,
//     error: errGameFetch,
//   } = useGetGamesQuery({ skip: true });
//   if (errorWhileGamesFetch) {
//     toast.error("Error while fetching games from our side");
//   }

//   const handleInputChangeString = (e) => {
//     const { name, value } = e.target;

//     // const parsedValue = (name !== "name" || name !== "tournament_id" || name !== "info" || name !== "start_date" || name !== "end_date" ) ? parseInt(value, 10) : value;

//     setValues({
//       ...values,
//       [name]: value,
//     });
//   };

//   const handleInputChangeNumber = (e) => {
//     const { name, value } = e.target;

//     setValues({
//       ...values,
//       [name]: Number(value),
//     });
//   };

//   const qualificationOptions = [
//     {
//       value: 1,
//       label: "Single Elimination",
//     },
//     {
//       value: 2,
//       label: "League",
//     },
//   ];

//   const handleQualification = (selectedOption) => {
//     console.log(selectedOption);
//     setQualification(selectedOption.label);
//     setValues({
//       ...values,
//       type: selectedOption,
//     });
//   };

//   const handleGameChange = (selectedId) => {
//     setValues({
//       ...values,
//       game_id: selectedId,
//     });
//   };

//   const handleParticipantRadio = (value) => {
//     setWhoCanParticipate(value);
//     setValues({
//       ...values,
//       open_to: value,
//     });

//     if (value === 0) {
//       setValues({
//         ...values,
//         min_girls: values.team_size,
//         min_boys: 0,
//         open_to: 0,
//       });
//     } else if (value === 1) {
//       setValues({
//         ...values,
//         min_boys: values.team_size,
//         min_girls: 0,
//         open_to: 1,
//       });
//     } else if (value === 2) {
//       setValues({
//         ...values,
//         min_boys: values.min_boys,
//         min_girls: values.min_girls,
//         open_to: value,
//       });
//     }
//   };

//   const addGameToDB = async () => {
//     setValues({
//       ...values,
//       start_date: new Date(startDate).toISOString(),
//       end_date: new Date(endDate).toISOString(),
//     });
//     const ressponse = await addGameToTnmt(values);
//     if (errorWhileAddingGame) {
//       toast.error(errGameFetch);
//     }
//     if (ressponse?.error) {
//       toast.error(ressponse?.error?.data.detail);
//     }
//   };

//   const GenderRadioButtons = ({ gameIndex }) => (
//     <List key={gameIndex} className=" w-full flex-row">
//       <ListItem className="p-0">
//         <label
//           htmlFor="horizontal-list-react"
//           className="flex w-full cursor-pointer items-center px-3 py-2"
//         >
//           <ListItemPrefix className="mr-3">
//             <Radio
//               color="amber"
//               name="horizontal-list"
//               id={gameIndex * 3 + 1}
//               ripple={false}
//               checked={whoCanParticipate === 0}
//               onChange={() => handleParticipantRadio(0)}
//               className="hover:before:opacity-0 "
//               containerProps={{
//                 className: "p-0",
//               }}
//             />
//           </ListItemPrefix>
//           <Typography color="blue-gray" className="font-medium">
//             Only Girls
//           </Typography>
//         </label>
//       </ListItem>
//       <ListItem className="p-0">
//         <label
//           htmlFor="horizontal-list-vue"
//           className="flex w-full cursor-pointer items-center px-3 py-2"
//         >
//           <ListItemPrefix className="mr-3">
//             <Radio
//               color="amber"
//               name="horizontal-list"
//               id={gameIndex * 3 + 2}
//               ripple={false}
//               className="hover:before:opacity-0"
//               containerProps={{
//                 className: "p-0",
//               }}
//               checked={whoCanParticipate === 1}
//               onChange={() => handleParticipantRadio(1)}
//             />
//           </ListItemPrefix>
//           <Typography color="blue-gray" className="font-medium">
//             Only Boys
//           </Typography>
//         </label>
//       </ListItem>
//       <ListItem className="p-0">
//         <label
//           htmlFor="horizontal-list-svelte"
//           className="flex w-full cursor-pointer items-center px-3 py-2"
//         >
//           <ListItemPrefix className="mr-3">
//             <Radio
//               color="amber"
//               name="horizontal-list"
//               id={gameIndex * 3 + 3}
//               ripple={false}
//               className="hover:before:opacity-0"
//               containerProps={{
//                 className: "p-0",
//               }}
//               checked={whoCanParticipate === 2}
//               onChange={() => handleParticipantRadio(2)}
//             />
//           </ListItemPrefix>
//           <Typography color="blue-gray" className="font-medium">
//             Both
//           </Typography>
//         </label>
//       </ListItem>
//     </List>
//   );
//   console.log(values);
//   return (
//     <div key={key} className="w-full gap-8 py-5 border-t-2 ">
//       {isSuccess ? (
//         <div className="flex items-center justify-start mx-auto text-xl font-poppins gap-3">
//           <CheckCircleIcon className="text-green-500" />{" "}
//           <p>Game added Successfully</p>
//         </div>
//       ) : (
//         <div className="space-y-4 shadow-sm md:p-4 w-full ">
//           <p className=" text-xl text-center font-poppins font-bold">
//             Add new Game
//           </p>

//           {/* GAme details div starts */}
//           <div className="w-full lg:p-4 border border-black-100 rounded-lg flex flex-col gap-6">
//             <p className="font-semibold font-poppins text-blue-gray-700">
//               Enter game details{" "}
//             </p>
//             <div className="flex flex-col lg:flex-row gap-4">
//               <div className="w-full lg:w-1/2 gap-x-2">
//                 <Input
//                   value={values.name}
//                   onChange={handleInputChangeString}
//                   label="Enter the name of Game"
//                   className="min-w-1/3"
//                   color="orange"
//                   name="name"
//                 />
//               </div>
//               <div className="w-full lg:w-1/2 text-sm">
//                 <MSelect
//                   onChange={handleGameChange}
//                   color="orange"
//                   label="select game to be played"
//                 >
//                   {successGames ? (
//                     fetchedGames.map((o, index) => (
//                       <Option key={index} className="capitalize" value={o.id}>
//                         {o.value}
//                       </Option>
//                     ))
//                   ) : (
//                     <Option>game 1</Option>
//                   )}
//                 </MSelect>
//               </div>
//             </div>
//             <div className="flex flex-col lg:flex-row gap-4">
//               <Input
//                 value={values.avg_duration}
//                 type="number"
//                 onChange={handleInputChangeNumber}
//                 label="Average duration (in minutes)"
//                 color="orange"
//                 name="avg_duration"
//               />
//               <MSelect
//                 onChange={handleQualification}
//                 color="orange"
//                 label="Type of Game"
//               >
//                 {qualificationOptions.map((op, index) => (
//                   <Option key={index} className="capitalize" value={op.value}>
//                     {op.label}
//                   </Option>
//                 ))}
//               </MSelect>
//             </div>

//             {values.type === 2 && (
//               <div className={`w-full flex flex-col lg:flex-row gap-5`}>
//                 <Input
//                   value={values.num_groups}
//                   type="number"
//                   onChange={handleInputChangeNumber}
//                   label="Number of Groups"
//                   color="orange"
//                   name="num_groups"
//                 />
//                 <Input
//                   value={values.teams_per_group}
//                   type="number"
//                   onChange={handleInputChangeNumber}
//                   label="Teams per group"
//                   color="orange"
//                   name="teams_per_group"
//                 />
//               </div>
//             )}

//             <div className="w-full flex flex-col lg:flex-row gap-5">
//               <Input
//                 value={values.team_size}
//                 onChange={handleInputChangeNumber}
//                 label="Team Size"
//                 color="orange"
//                 name="team_size"
//                 type="number"
//               />
//               <Input
//                 value={values.max_teams}
//                 onChange={handleInputChangeNumber}
//                 label="Maximum Team"
//                 color="orange"
//                 name="max_teams"
//                 type="number"
//               />
//               <Input
//                 value={values.total_rounds}
//                 onChange={handleInputChangeNumber}
//                 label="Total Rounds to be played"
//                 color="orange"
//                 name="total_rounds"
//                 type="number"
//               />
//             </div>

//             <Textarea
//               value={values.info}
//               onChange={handleInputChangeString}
//               className="w-full "
//               label="Tournament Description"
//               color="orange"
//               name="info"
//             />
//           </div>
//           {/* GAme details div ends */}

//           {/* Participants div starts */}
//           <div className="lg:p-4 border border-black-100 rounded-lg space-y-4">
//             <div className="flex gap-4">
//               <p className="font-semibold font-poppins text-blue-gray-700">
//                 Who can participate?
//               </p>
//             </div>
//             <div className="w-1/3 flex flex-col lg:flex-row gap-5">
//               {/* <GenderRadioButtons key={gameIndex} gameIndex={gameIndex}/> */}
//               <MSelect
//                 onChange={handleParticipantRadio}
//                 color="orange"
//                 label="Who can participate"
//               >
//                 <Option key={0} value={0}>
//                   Only girls
//                 </Option>
//                 <Option key={1} value={1}>
//                   Only boys
//                 </Option>
//                 <Option key={2} value={2}>
//                   Both
//                 </Option>
//               </MSelect>
//               {values.open_to === 2 && (
//                 <div className={`w-2/3 flex flex-col lg:flex-row gap-5`}>
//                   <Input
//                     value={values.min_boys}
//                     type="number"
//                     onChange={handleInputChangeNumber}
//                     label="Minimum boys"
//                     color="orange"
//                     name="min_boys"
//                   />
//                   <Input
//                     value={values.min_girls}
//                     type="number"
//                     onChange={handleInputChangeNumber}
//                     label="Minimum girls"
//                     color="orange"
//                     name="min_girls"
//                   />
//                 </div>
//               )}
//             </div>
//             <div className={`w-full flex flex-col lg:flex-row gap-5`}>
//               <Input
//                 value={values.min_age}
//                 type="number"
//                 onChange={handleInputChangeNumber}
//                 label="Minimum age"
//                 color="orange"
//                 name="min_age"
//               />
//               <Input
//                 value={values.max_age}
//                 onChange={handleInputChangeNumber}
//                 label="Maximum age"
//                 color="orange"
//                 name="max_age"
//               />
//             </div>
//           </div>
//           {/* Participants div ends */}

//           {/* Prize and schedule div starts */}
//           <div className="w-full lg:p-4  border border-black-100 flex md:justify-between flex-col lg:flex-row gap-4">
//             <div className="w-full flex flex-col gap-4 ">
//               <p className="font-semibold font-poppins text-blue-gray-700">
//                 Fess and Prizes{" "}
//               </p>
//               <div className="flex flex-col lg:flex-row gap-5">
//                 <Input
//                   value={values.prize_pool}
//                   onChange={handleInputChangeNumber}
//                   label="Prize pool Rs"
//                   color="orange"
//                   name="prize_pool"
//                   type="number"
//                 />
//                 <Input
//                   value={values.participation_fees}
//                   onChange={handleInputChangeNumber}
//                   label="Participation fees"
//                   color="orange"
//                   name="participation_fees"
//                   type="number"
//                 />
//               </div>
//             </div>

//             {/* Schedule div starts */}
//             <div className="w-full flex flex-col gap-4">
//               <p className="font-semibold font-poppins text-blue-gray-700">
//                 Schedule{" "}
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
//                 <DatePicker
//                   selected={startDate}
//                   showTimeSelect
//                   onChange={(date) => {
//                     setStartDate(date)
//                     values.start_date = new Date(date).toISOString()

//                   }}
//                   className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm md:text-normal"
//                   placeholderText="Select start Date"
//                   selectsStart
//                   name="start_date"
//                   dateFormat="yyyy-MM-dd hh:mm:aa"
//                   startDate={startDate}
//                   endDate={endDate}
//                 />
//                 <p className="font-poppins p-2 bg-gray-100 rounded-lg">To</p>
//                 <DatePicker
//                   selected={endDate}
//                   showTimeSelect
//                   onChange={(date) => {
//                     setEndDate(date);
//                     values.end_date = new Date(date).toISOString()
//                   }}
//                   className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200  text-sm md:text-normal"
//                   placeholderText="Select End Date"
//                   selectsStart
//                   name="end_date"
//                   dateFormat="yyyy-MM-dd hh:mm:aa"
//                   startDate={startDate}
//                   endDate={endDate}
//                   minDate={startDate}
//                 />
//               </div>
//             </div>
//             {/* Schedule div ends */}
//           </div>
//           {/* Prize and schedule div ends */}

//           <div className="w-full flex justify-center items-center">
//             <Button
//               onClick={addGameToDB}
//               className="flex justify-center items-center"
//               color="orange"
//             >
//               {isAddingGame ? <Spinner color="amber" /> : "Add game"}
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddGame;
