/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  postRequest,
} from "../../api/api";

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
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

const LoginPage = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    // At least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  function handleSignIn() {
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters and include one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    if (!emailError && !passwordError) {
      // Prepare the formData for your backend API.
      const jsonData = {
        email_id: email,
        password: password,
      };

      postRequest("/users/login", jsonData)
        .then((data) => {
          console.log("API response:", data);
          const decoded = jwt(data.access_token);
          cookie.set("jwt_auth_token", data.access_token, {
            expires: new Date(decoded.exp * 1000),
            path: "/",
          });
           // Save user data to localStorage
          localStorage.setItem('userData', JSON.stringify(data.data));
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

          navigate("/user/home");
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            // Handle the specific 400 error with the "User with this email or phone already exists" message.
            console.error("API error: Incorrect email or password");
            toast.error("Incorrect email or password", {
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
              src="/login2.jpg"
              alt="img"
              className="h-screen w-full opacity-40"
            />
          </div>
        </div>

        <p className="p-5 text-2xl font-bold text-white opacity-100 relative">
          GSort***
        </p>

        <div className="container py-[108px] mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white shadow-md rounded-lg p-8 flex flex-col justify-center items-center md:ml-auto md:mt-0 relative z-10">
            <Card className="p-5" color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
                Sign In
              </Typography>
              <Typography color="gray" className="mt-1 font-normal text-sm">
                Nice to see you again! Enter your details to continue.
              </Typography>
              <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-4">
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
                      Remember
                      <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                      >
                        &nbsp;me
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <Button
                  onClick={handleSignIn}
                  color="orange"
                  className="mt-6"
                  fullWidth
                >
                  sign in
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
                  Dont have an account?{" "}
                  <Link
                    to="/"
                    className="font-medium text-gray-900 hover:text-orange-600"
                  >
                    Sign Up
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

export default LoginPage;
