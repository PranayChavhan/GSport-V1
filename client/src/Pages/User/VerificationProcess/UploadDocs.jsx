import { Button, Input, Spinner } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { storage } from "../../../firebase";

import { BiSolidFilePng } from "react-icons/bi";
import { BiSolidFilePdf } from "react-icons/bi";
import { BiSolidFileTxt } from "react-icons/bi";
import Cookies from "universal-cookie";

import upload from "../../../assets/images/upload.png";

import Select from "react-select";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { useUploadDocMutation } from "../../../redux/api/userApi";
import { useAppSelector } from "../../../redux/store";
export default function UploadDocs() {
  const [docUpload, setDocUpload] = React.useState(null);
  const [imgUrl, setImgUrl] = React.useState(null);
  const [progress, setProgress] = React.useState(0);

  const navigate = useNavigate();
  const cookie = new Cookies();
  const tokn = cookie.get("jwt_auth_token");
  const { id: user_id } = useAppSelector((state) => state.userState.user) || "";

  const [docId, setDocId] = useState("");
  const [docName, setDocName] = useState("");
  const [allow, setAllow] = useState(false);
  const [display, setDisplay] = useState(false);

  const handleDocChange = (e) => {
    setDocName(e.label);
    setDocId(e.value);
    setAllow(true);
    console.log("document", docName, docId);
  };

  const [file, setFile] = useState();
  const [dragging, setDragging] = useState(false);

  const allDocsRef = ref(storage, "player/");

  const uploadDocs = () => {
    console.log("clicked");
    if (docUpload === null) return;

    const docRef = ref(storage, `player/${docUpload.name}`);

    // const upload = await uploadBytes(docRef, docUpload)
    uploadBytesResumable(docRef, docUpload).on(
      "state_changed",
      (snapshot) => {
        setProgress(
          Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        toast.success("Document uploaded");
        getDownloadURL(docRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const [uploadDoc, { isLoading: isSavingToDb, isSuccess }] =
    useUploadDocMutation();
  const saveToDB = async () => {
    try {
      const token = tokn;
      const data = {
        user_id,
        document_type: docName,
        document_url: imgUrl,
        token,
      };
      const upload = await uploadDoc(data);
      console.log("saving to db...", upload);
      
    } catch (error) {
      console.log("error while saving docs to db", error);
    }
  };
  if (isSuccess) {
    toast.success("Added successfully to db");
  }
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    if (allow) {
      const newFile = event.dataTransfer.files[0];
      setFile(newFile);
      setDocUpload(newFile);
      setDisplay(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (allow) {
      setDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleFileInputChange = (event) => {
    const newFile = event.target.files[0];
    setDocUpload(newFile);
    setDisplay(true);
  };

  const handleSubmit = () => {
    console.log("Submitting files:", file);
    console.log("docs uploaded, verification in progress");
    console.log(file);
    saveToDB();

    // navigate('/player/verification');
  };

  const options = [
    {
      label: "Aadhar",
      value: "1",
    },
    {
      label: "School Id",
      value: "2",
    },
    {
      label: "PAN (mandatory for organizers)",
      value: "3",
    },
    {
      label: "College Id",
      value: "4",
    },
    {
      label: "Company Id",
      value: "5",
    },
    {
      label: "Other (as per requirement)",
      value: "6",
    },
  ];

  return (
    <div className=" flex flex-col justify-center items-center space-y-10">
      <div className="flex flex-col items-center space-y-3">
        <p className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl  text-center font-bold mt-5 sm:mt-10">
          Verify your atleast 1 document(s) to proceed{" "}
        </p>
        <p className="text-xs sm:text-sm text-center text-gray-500">
          PDF, text, images or videos. Max 10MB each
        </p>
      </div>
      <div className="flex flex-row w-full">
        <div className="w-full  h-full flex flex-col justify-center content-center items-center space-y-10">
          <div className="w-3/4 sm:w-3/4 md:w-2/4 lg:w-1/4">
            <Select
              placeholder="Select Document"
              onChange={handleDocChange}
              options={options}
            />
          </div>

          <div className="w-full h-52  rounded-xl flex flex-col justify-center items-center space-y-2">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`py-10 border-2 rounded-lg w-3/4 sm:w-2/4 md:w-1/3 lg:w-1/4 h-full flex flex-col items-center justify-center space-y-2 border-dashed bg-blue-gray-50 ${
                allow ? "" : "cursor-not-allowed opacity-50"
              } ${allow && dragging ? "border-blue-500" : "border-orange-500"}`}
            >
              <div className="h-20 w-20 font-bold text-6xl text-orange-500 flex items-center justify-center">
                <img src={upload} alt="store" className="" />
              </div>
              <p className=" text-blue-gray-700 mb-2 text-center text-xs sm:text-sm ">
                Drag and drop files here
              </p>
              <div className={`${allow ? "" : "hidden"}`}>
                <input
                  type="file"
                  onChange={handleFileInputChange}
                  className={`block md:block text-xs`}
                  id="file-input"
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full   flex flex-col items-center justify-center p-5  text-gray-500">
              {display ? (
                <div className="space-y-3 w-full flex flex-col justify-center items-center">
                  <p className="text-md text-gray-600 text-center">
                    Uploading files...
                  </p>
                  <div className="flex space-x-3 w-full sm:w-3/4 md:w-2/4 lg:w-2/5">
                    <div className="rounded-xl border-2 border-orange-100 w-full text-center py-2 px-3 flex flex-row justify-center text-3xl items-center space-x-1">
                      {docUpload.type === "application/pdf" ? (
                        <BiSolidFilePdf />
                      ) : docUpload.type === "text/plain" ? (
                        <BiSolidFileTxt />
                      ) : docUpload.type == "image/png" ? (
                        <BiSolidFilePng />
                      ) : (
                        <p></p>
                      )}

                      <div className="w-full flex flex-col justify-center items-start space-y-2">
                        <div className="w-full flex flex-row justify-between items-center space-x-3">
                          <p className="text-xs">{docUpload.name}</p>
                          <div
                            className={`hidden sm:block h-2 w-full  rounded-lg ${
                              progress < 30
                                ? "bg-gray-400 w-[30%]"
                                : progress < 60
                                ? "bg-yellow-400 w-[60%]"
                                : progress < 80
                                ? "bg-green-300 w-[80%]"
                                : progress <= 100
                                ? "bg-green-500 w-full"
                                : ""
                            }`}
                          ></div>
                          <p
                            className={`md:block text-xs ${
                              progress < 30
                                ? "text-gray-400"
                                : progress < 60
                                ? "text-yellow-400"
                                : progress < 80
                                ? "text-green-300"
                                : progress == 100
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {progress}%
                          </p>
                        </div>
                      </div>
                    </div>
                    {progress == 100 ? (
                      <></>
                    ) : (
                      <Button
                        color="orange"
                        onClick={uploadDocs}
                        className="flex items-center justify-center"
                      >
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>

            {allow && display && (
              <div className=" w-full flex flex-col justify-center items-center space-y-10 lg:items-end lg:px-5">
                <Button
                  color="orange"
                  className="w-3/4 text-xs sm:w-2/4 md:w-1/3 lg:w-1/5"
                  onClick={handleSubmit}
                >
                  {" "}
                  Submit for verification
                </Button>
                <Button
                  color="orange"
                  className="w-3/4 text-xs sm:w-2/4 md:w-1/3 lg:w-1/5"
                >
                  Verify your photo
                </Button>
              </div>
            )}
          </div>
          <Link to={"/user/main"}>
            <p className=" text-blue-gray-700 text-2xl font-bold underline">
              Explore
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
