/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { postRequest } from "../../api/api";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");

  function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  function validateMobileNumber(mobileNumber) {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobileNumber);
  }

  function validatePassword(password) {
    // At least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  function handleSignUp() {
    setFullNameError("");
    setEmailError("");
    setMobileNumberError("");
    setPasswordError("");
    setCheckboxError("");

    if (!fullName) {
      setFullNameError("Full Name is required");
    }

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
    }

    if (!validateMobileNumber(mobileNumber)) {
      setMobileNumberError("Invalid mobile number");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    if (!isCheckboxChecked) {
      setCheckboxError("Please accept the terms and conditions.");
    }

    if (
      !fullNameError &&
      !emailError &&
      !mobileNumberError &&
      !passwordError &&
      isCheckboxChecked
    ) {
      // Prepare the formData for your backend API.
      const jsonData = {
        email_id: email,
        full_name: fullName,
        phone_no: mobileNumber,
        password: password,
      };

      postRequest("/users/register", jsonData)
        .then((data) => {
          // Handle a successful API response here
          console.log("API response:", data);
          toast.success("Operation was successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          navigate("/login");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            // Handle the specific 400 error with the "User with this email or phone already exists" message.
            console.error(
              "API error: User with this email or phone already exists"
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
            // Handle other API errors
            console.error("API error:", error);
            // You can handle other errors or set an appropriate error state.
          }
        });
    }
  }

  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font relative h-full">
        <div className="absolute inset-0 h-full">
          <div className=" h-full">
            <img
              src="/login.jpg"
              alt="img"
              className="h-full w-full opacity-40"
            />
          </div>
        </div>

        <p className="p-5 text-2xl font-bold text-white opacity-100 relative hidden lg:block">
          GSort
        </p>

        <div className="container lg:py-[36px] mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white shadow-md rounded-lg p-5  flex flex-col justify-center items-center md:ml-auto md:mt-0 relative z-10">
            <Card className="p-5" color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
                Sign Up
              </Typography>
              <Typography color="gray" className="mt-1 font-normal text-sm">
                Nice to meet you! Enter your details to register.
              </Typography>
              <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-4">
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-sm"
                  >
                    Full Name
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Pranay Chavhan"
                    className=" !border-t-blue-gray-200 focus:!border-gray-500"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {fullNameError && (
                    <p className="text-red-500 text-[12px]">{fullNameError}</p>
                  )}

                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-sm"
                  >
                    Email Address
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="example@gmail.com"
                    className=" !border-t-blue-gray-200 focus:!border-gray-500"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="text-red-500 text-[12px]">{emailError}</p>
                  )}

                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-sm"
                  >
                    Mobile Number
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="7774860123"
                    className=" !border-t-blue-gray-200 focus:!border-gray-500"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  {mobileNumberError && (
                    <p className="text-red-500 text-[12px]">
                      {mobileNumberError}
                    </p>
                  )}
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="-mb-3 text-sm"
                  >
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-gray-500"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <p className="text-red-500 text-[12px]">{passwordError}</p>
                  )}
                </div>
                <Checkbox
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center font-normal"
                    >
                      I agree the
                      <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                      >
                        &nbsp;Terms and Conditions
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                  checked={isCheckboxChecked}
                  onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                />
                {checkboxError && (
                  <p className="text-red-500">{checkboxError}</p>
                )}
                <Button
                  onClick={handleSignUp}
                  color="orange"
                  className="mt-6"
                  fullWidth
                  disabled={!isCheckboxChecked}
                >
                  sign up
                </Button>

                <div className="mt-10 grid space-y-4">
                  <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-orange-400 focus:bg-blue-50 active:bg-blue-100">
                    <div className="relative flex items-center space-x-4 justify-center">
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        className="absolute left-0 w-5"
                        alt="google logo"
                      />
                      <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-orange-600 sm:text-base">
                        Continue with Google
                      </span>
                    </div>
                  </button>
                  <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-orange-400 focus:bg-blue-50 active:bg-blue-100">
                    <div className="relative flex items-center space-x-4 justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="absolute left-0 w-5 text-gray-700"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                      </svg>
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition dark:text-white duration-300 group-hover:text-orange-600 sm:text-base">
                        Continue with Github
                      </span>
                    </div>
                  </button>
                </div>

                <Typography
                  color="gray"
                  className="mt-4 text-center font-normal"
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-gray-900 hover:text-orange-600"
                  >
                    Sign In
                  </Link>
                </Typography>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
