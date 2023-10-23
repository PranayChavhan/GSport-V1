/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  PresentationChartBarIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { Typography, Button, Avatar } from "@material-tailwind/react";
import {
  Card,
  Select as MSelect,
  Option,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { patchRequest } from '../../api/api';
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      try {
        const userDataObject = JSON.parse(userDataString);
        setUserData(userDataObject);
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }
  }, []);

  const userInformation = {
    mobile_number: userData.phone_no,
    name: userData.full_name,
    verified: userData.verified,
    createdAt: userData.createdAt,
    email_id: userData.email_id,
    emergency_contact: "null",
    dob: userData.dob,
    profile_img: userData.profile_url,
    id: userData.id,
    gender: userData.gender
  };

  const [birthDate, setBirthDate] = useState(new Date());
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [editedName, setEditedName] = useState(userInformation.name);
  const [editedimg, setEditedimg] = useState(userInformation.profile_img);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState(userInformation.email_id);

  const [isMobileEditing, setIsMobileEditing] = useState(false);
  const [editedMobile, setEditedMobile] = useState(
    userInformation.mobile_number
  );

  const [isEmergencyEditing, setIsEmergencyEditing] = useState(false);
  const [isGenderEditing, setIsGenderEditing] = useState("");
  const [editedGender, setEditedGender] = useState(userInformation.gender);
  const [editedEmergency, setEditedEmergency] = useState(
    userInformation.emergency_contact
  );

  const [gender, setGender] = useState("");

  const [isDOBEditing, setIsDOBEditing] = useState(false);
  const [editedDOB, setEditedDOB] = useState(new Date(userInformation.dob));

  const handleSaveName = async () => {
    setIsNameEditing(false);
    userInformation.name = editedName;
  };

  const handleCancelName = () => {
    setIsNameEditing(false);
    setEditedName(userInformation.name);
  };

  const handleEditName = () => {
    setIsNameEditing(true);
  };

  const handleSaveEmail = () => {
    setIsEmailEditing(false);
    userInformation.email_id = editedEmail;
  };

  const handleCancelEmail = () => {
    setIsEmailEditing(false);
    setEditedEmail(userInformation.email_id);
  };

  const handleEditEmail = () => {
    setIsEmailEditing(true);
  };

  const handleSaveMobile = () => {
    setIsMobileEditing(false);
    console.log(editedMobile);
    const data = { phone_no: editedMobile };
    // saveDetails(data);
    userInformation.mobile_number = editedMobile;
  };

  const handleCancelMobile = () => {
    setIsMobileEditing(false);
    setEditedMobile(userInformation.mobile_number);
  };

  const handleEditMobile = () => {
    setIsMobileEditing(true);
  };

  const handleSaveEmergency = () => {
    setIsEmergencyEditing(false);
    userInformation.emergency_contact = editedEmergency;
  };

  const handleCancelEmergency = () => {
    setIsEmergencyEditing(false);
    setEditedEmergency(userInformation.emergency_contact);
  };

  const handleEditEmergency = () => {
    setIsEmergencyEditing(true);
  };

  const handleEditGender = () => {
    setIsGenderEditing(true);
  };

  const handlleSaveGendder = () => {
    setIsGenderEditing(false);
    userInformation.gender = editedGender;
  };

  const handleCancelGender = () => {
    setIsGenderEditing(false);
    setEditedGender("");
  };

  const handleSaveDOB = () => {
    setIsDOBEditing(false);
    // userInformation.dob = editedDOB.toISOString().split("T")[0];
  };

  const handleCancelDOB = () => {
    setIsDOBEditing(false);
    // setEditedDOB(new Date(userInformation.dob));
  };

  const handleEditDOB = () => {
    setIsDOBEditing(true);
  };



  const saveDetails = () =>{



    const jsonData = {
      email_id: editedEmail?editedEmail:userInformation.email_id,
      full_name: editedName?editedName:userInformation.name,
      phone_no: editedMobile?editedMobile:userInformation.mobile_number,
      
    };


    patchRequest("/users/details", jsonData, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTgxNTgyNjEsInN1YiI6IlplejRCOTR2WU0ifQ.SdwrNna6WHHNI-ZZaVP2Wt_hXesStBsdxDwWY_SWGbE")
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
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className=" mx-auto flex px-20 md:flex-row flex-col item-start justify-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0">
            <div className="border-2 px-16 py-5 rounded-md">
              <div className="">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="text-3xl mb-6"
                >
                  Account Settings
                </Typography>
              </div>
              <List>
                <ListItem className="mb-2 hover:bg-orange-200">
                  <ListItemPrefix>
                    <UserCircleIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Personal info</p>
                </ListItem>
                <ListItem className="mb-2 hover:bg-orange-200">
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Update payment details</p>
                </ListItem>
                <ListItem className="mb-2 hover:bg-orange-200">
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Security setting</p>
                </ListItem>
                <ListItem className="mb-2 hover:bg-orange-200">
                  <ListItemPrefix>
                    <Cog6ToothIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Permissions</p>
                </ListItem>
                <ListItem className="mb-2 hover:bg-orange-200">
                  <ListItemPrefix>
                    <InboxIcon className="h-6 w-6 text-black font-bold" />
                  </ListItemPrefix>
                  <p>Email notifications</p>
                  <ListItemSuffix>
                    <Chip
                      value="14"
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>

                <ListItem className=" mt-[22rem] hover:bg-red-500 bg-red-600">
                  <ListItemPrefix>
                    <Cog6ToothIcon className="h-6 w-6 text-white font-bold" />
                  </ListItemPrefix>
                  <p className="text-white">Log out</p>
                </ListItem>
              </List>
            </div>
          </div>

          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center ">
            <div className="h-full flex flex-col w-full lg:w-3/4 xl:w-4/5 gap-4 py-5">
              <div className="flex flex-row gap-4 ">
                <Avatar
                  variant="circular"
                  size="xl"
                  alt="User Profile"
                  src={userInformation?.profile_img}
                  className=" border"
                />
                <div className="flex flex-col justify-center items-center  ">
                  <div className=" font-normal  flex">
                    <p className="text-[16px] font-semibold">{"G-Sport ID : "}</p>
                    <p className="text-black ml-2 font-bold">{userInformation.id}</p>
                  </div>
                </div>
              </div>

              <div className="">
                <div className="">
                  <div className="">
                   <h1 className="font-medium  text-gray-900 text-lg">Full Name</h1>
                    <div className="  gap-2">
                      {isNameEditing ? (
                        <div className="flex  items-center sm:items-start gap-4">
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                          <div className="flex sm:flex-row items-center  gap-2">
                            <Button
                              color="orange"
                              size="sm"
                              onClick={handleSaveName}
                              className="text-white"
                            >
                              Save
                            </Button>
                            <div className="flex sm:flex-row ">
                              <Button
                                variant="outlined"
                                size="sm"
                                onClick={handleCancelName}
                                className="text-gray-900"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-between items-center gap-4 mt-3">
                          <Typography variant="body" className="text-[16px]" color="gray">
                            {userInformation?.name}
                          </Typography>

                          <button
                            onClick={handleEditName}
                            className="text-orange-500 hover:text-orange-700"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                    <hr className="my-2 hr-light" />
                  </div>
                  <div className="mb-8">
                  <h1 className="font-medium  text-gray-900 text-lg">Email</h1>
                    <div className="gap-2">
                      {isEmailEditing ? (
                        <div>
                          <div className="flex flex-col md:flex-row items-center sm:items-start gap-4">
                            <input
                              type="text"
                              value={editedEmail}
                              onChange={(e) => setEditedEmail(e.target.value)}
                              className="border rounded px-2 py-1 w-full"
                            />
                            <div className="flex sm:flex-row gap-2">
                              <Button
                                size="sm"
                                color="orange"
                                onClick={handleSaveEmail}
                                className="text-white"
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outlined"
                                onClick={handleCancelEmail}
                                className="text-gray-900"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-between mt-3 gap-4">
                          <Typography variant="body" color="gray" className="text-[16px]">
                            {editedEmail?editedEmail:userInformation.email_id}
                          </Typography>

                          <button
                            onClick={handleEditEmail}
                            className="text-orange-500 hover:text-orange-700"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                    <hr className="my-2 hr-light" />
                  </div>
                  <div className="mb-8">
                  <h1 className="font-medium  text-gray-900 text-lg">Mobile Number</h1>
                    <div className=" gap-2">
                      {isMobileEditing ? (
                        <div className="flex flex-row items-center sm:items-start gap-4">
                          <input
                            type="number"
                            value={editedMobile}
                            onChange={(e) => setEditedMobile(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                          <div className="flex sm:flex-row gap-2">
                            <Button
                              size="sm"
                              color="orange"
                              onClick={handleSaveMobile}
                              className="text-white"
                            >
                              Save
                            </Button>
                            <div className="flex sm:flex-row gap-2">
                              <Button
                                size="sm"
                                variant="outlined"
                                onClick={handleCancelMobile}
                                className="text-gray-900"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-between mt-3">
                          <Typography variant="body" color="gray">
                            {editedMobile?editedMobile:userInformation.mobile_number}
                          </Typography>
                          <div className="flex-grow"></div>

                          <button
                            onClick={handleEditMobile}
                            className="text-orange-500 hover:text-orange-700"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                    <hr className="my-2 hr-light" />
                  </div>
                  <div className="mb-8">
                  <h1 className="font-medium  text-gray-900 text-lg">Emergency contact</h1>
                    <div className="gap-2">
                      {isEmergencyEditing ? (
                        <div className="flex  items-center sm:items-start gap-4">
                          <input
                            type="number"
                            value={editedEmergency}
                            onChange={(e) => setEditedEmergency(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                          <div className="flex sm:flex-row gap-2">
                            <Button
                              size="sm"
                              color="orange"
                              onClick={handleSaveEmergency}
                              className="text-white"
                            >
                              Save
                            </Button>
                            <div className="flex sm:flex-row gap-2">
                              <Button
                                size="sm"
                                variant="outlined"
                                onClick={handleCancelEmergency}
                                className="text-gray-900"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-between mt-3 gap-4">
                          <Typography variant="body" color="gray">
                            {editedEmergency?editedEmergency:userInformation.emergency_contact}
                          </Typography>
                          <div className="flex-grow"></div>

                          <button
                            onClick={handleEditEmergency}
                            className="text-orange-500 hover:text-orange-700"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                    <hr className="my-2 hr-light" />
                  </div>

                  <div className="mb-8">
                  <h1 className="font-medium  text-gray-900 text-lg">Gender</h1>
                    <div className=" gap-2 border-none">
                      {isGenderEditing ? (
                        <div className="flex  items-center sm:items-start gap-4 border-none">
                          <MSelect
                            onChange={() => {setEditedGender()}}
                            
                            color="orange"
                            className='border-none focus:border-none '
                          >
                            <Option key={0} value={0}>
                              Female
                            </Option>
                            <Option key={1} value={1}>
                              Male
                            </Option>
                            <Option key={2} value={2}>
                              Prefer not to say
                            </Option>
                          </MSelect>
                          <div className="flex sm:flex-row gap-2">
                            <Button
                              size="sm"
                              color="orange"
                              onClick={handlleSaveGendder}
                              className="text-white"
                            >
                              Save
                            </Button>
                            <div className="flex sm:flex-row gap-2">
                              <Button
                                size="sm"
                                variant="outlined"
                                onClick={handleCancelGender}
                                className="text-gray-900"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-between mt-3 gap-4">
                          <Typography variant="body" color="gray">
                            {editedGender?editedGender:userInformation.gender}
                          </Typography>
                          

                          <button
                            onClick={handleEditGender}
                            className="text-orange-500 hover:text-orange-700"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                    <hr className="my-2 hr-light" />
                  </div>

                  <div className="mb-8">
                  <h1 className="font-medium  text-gray-900 text-lg">Date Of Birth</h1>
                    <div className=" gap-2">
                      {isDOBEditing ? (
                        <div className="flex  items-center sm:items-start gap-4">
                          <DatePicker
                            selected={birthDate}
                            onChange={(date) => {
                              setBirthDate(date);
                            }}
                            className="w-full sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200  text-sm md:text-normal"
                            placeholderText="Enter birth date"
                            selectsStart
                            name="Birth Date"
                            dateFormat="yyyy-MM-dd"
                          />
                          <div className="flex sm:flex-row gap-2">
                            <Button
                            color="orange"
                              onClick={handleSaveDOB}
                              className="text-white"
                            >
                              Save
                            </Button>
                            <div className="flex sm:flex-row gap-2">
                              <Button
                              variant="outlined"
                                onClick={handleCancelDOB}
                                className="text-gray-900"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-between mt-3 gap-4">
                          <Typography variant="body" color="gray">
                            {/** editedDOB.toDateString() */}
                            {"23-08-2023"}
                          </Typography>
                          <div className="flex-grow"></div>

                          <button
                            onClick={handleEditDOB}
                            className="text-orange-500 hover:text-orange-700"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                    <hr className="my-2 hr-light" />
                  </div>
                 

                  {/* Submit button  */}
                  <div className="flex flex-row  justify-center gap-6 mt-[3.5rem]">
                    <Button
                      color="orange"
                      className="text-white w-[16rem]"
                      onClick={saveDetails}
                    >
                      Save
                    </Button>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
