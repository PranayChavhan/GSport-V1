import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import VerifiedIcon from "@mui/icons-material/Verified";

import { onSignInSubmit, verifyCode } from "../../../utils/VerifyOtpHelper";

import { useEffect, useState } from "react";
import app from "../../firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { toast } from "react-toastify";

import { useRegisterUserMutation } from "../../redux/api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Reg = () => {
  const [showOtpField, setShowOtpField] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [verifyBtnMsg, setVerifyBtnMsg] = useState("Verify");
  const [otpField, setOtpField] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  // validation using zod
  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9]+)$/
  );
  const formSchema = z
    .object({
      first_name: z.string().min(1, "First name is required"),
      last_name: z.string().min(1, "Last name is required"),
      email_id: z.string().email("Invalid email").min(1, "Email is required"),
      phone_no: z
        .string()
        .regex(phoneRegex, "Invalid Phone Number!")
        .min(10, "Atleast 10 digits are required"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must have more than 8 characters"),
      confirmPassword: z.string().min(1, "Password confirmation is required"),
      //   terms: z.literal(true, {
      //     errorMap: () => ({
      //       message: "You must accept the terms and conditions",
      //     }),
      //   }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  // using react-hook form to maintain state of input fields
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema) });

  const onVerifyClick = () => {
    const phone_no = getValues("phone_no");
    setShowOtpField(true);
  };

  // ? Mobile verification started
  const auth = getAuth(app);
  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
    }
    window.recaptchaVerifier.render();
  };

  const onSignInSubmit = () => {
    // user input
    setSendingOtp(true);
    onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    const phoneNum = "+91" + getValues("phone_no");
    signInWithPhoneNumber(auth, phoneNum, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent");
        setVerifyBtnMsg("otp sent");
        setSendingOtp(false);
        setShowOtpField(true);
      })
      .catch((error) => {
        setSendingOtp(false);
        console.log(`SMS not sent ${error}`);
      });
  };

  const verifyCode = () => {
    const code = otpField;
    setVerifyingOtp(true);
    if(code.length < 6 || code.length > 6){
      toast.error("Enter valid otp");
    }
    if (code.length === 6) {
      confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log("user from verify otp code", user);
          toast.success("Mobile number verified");
          setShowOtpField(false);
          setMobileVerified(true);
          setVerifyingOtp(false);
          setVerifyBtnMsg("");
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          toast.error("Invalid otp", error);
          setVerifyingOtp(false);
        });
    }
  };
  //  Mobile verification ended

  //Starting register api
  const regUsr = async (data) => {
    const { confirmPassword, ...formData } = data;
    try {
      const regUser = await registerUser(formData).unwrap();
      toast.success(regUser.message);
      navigate("/user/login");
    } catch (error) {
      // toast.error(error);
      toast.error(error?.data.detail);
    }
  };
  //Ending register api
  return (
    <div className="px-5 bg-gray-50 flex flex-row  items-center justify-center md:py-10 w-full h-full">
      <div
        className="bg-gray-50 font-poppins w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-5 py-10 lg:py-24 items-center justify-center  rounded-lg shadow-md"
      >
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-full h-full"
          onSubmit={handleSubmit(regUsr)}
        >
          <div className="mb-4 flex flex-col gap-6 ">
            <div className="w-full gap-5 flex justify-between md:flex-row flex-col">
              <div className="flex flex-col">
                {errors.first_name && (
                  <span className="text-red-600 text-xs pb-1 pl-1 w-full text-left">
                    * {errors.first_name?.message}
                  </span>
                )}
                <Input
                  label="First name"
                  color="amber"
                  {...register("first_name")}
                  className="p-2"
                />
              </div>
              <div className="flex flex-col">
                {errors.last_name && (
                  <span className="text-red-600 text-xs pb-1 pl-1 w-full text-left">
                    *{errors.last_name?.message}
                  </span>
                )}
                <Input
                  label="Last name"
                  color="amber"
                  {...register("last_name")}
                  className="p-2"
                />
              </div>
            </div>

            {/* Phone number started */}
            <div className="relative flex flex-col">
              {errors.phone_no && (
                <span className="text-red-600 text-xs pb-1 pl-1 w-full text-left">
                  *{errors.phone_no?.message}
                </span>
              )}
              <div className="relative">
              <Input
                size="lg"
                className="!relative tracking-widest"
                label="Phone number"
                color="amber"
                disabled={mobileVerified}
                icon={mobileVerified ? <VerifiedIcon fontSize="small"/>:<></>}
                {...register("phone_no")}
              />
              <Button
                size="sm"
                color="orange"
                className={`!absolute right-1 top-1.5 rounded hover:shadow-none ${mobileVerified ? "hidden" : '' }`}
                onClick={onSignInSubmit}
                disabled={mobileVerified}
              >
                {sendingOtp ? <Spinner color="amber" className="h-4 w-4" /> : verifyBtnMsg}
              </Button>
              </div>
              
              <div id="recaptcha-container"></div>
            </div>

            {showOtpField && (
              <div>
                {/* ! OTP input starts */}
                <div className="flex flex-col">
                  {errors.email_id && (
                    <span className="text-red-600 text-xs pb-1 pl-1 w-full text-right">
                      *{errors.email_id?.message}
                    </span>
                  )}
                  <Input
                    size="lg"
                    label="Enter OTP"
                    className="tracking-widest"
                    color="amber"
                    value={otpField}
                    onChange={(e) => setOtpField(e.target.value)}
                  />
                  <Button
                    className="mt-6 hover:shadow-none flex items-center justify-center"
                    fullWidth
                    color="orange"
                    onClick={verifyCode}
                  >
                    {verifyingOtp ? <Spinner color="amber"/>: "Verify"}
                  </Button>
                </div>
              </div>
            )}
            {/* ! OTP input ends */}
            {/* Phone number ended */}
          </div>

          {mobileVerified ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                {errors.email_id && (
                  <span className="text-red-600 text-xs pb-1 pl-1 w-full text-right">
                    *{errors.email_id?.message}
                  </span>
                )}
                <Input
                  size="lg"
                  label="Email"
                  color="amber"
                  {...register("email_id")}
                />
              </div>
              <div className="flex flex-col">
                {errors.password && (
                  <span className="text-red-600 text-xs pb-1 pl-1 w-full text-right">
                    * {errors.password?.message}
                  </span>
                )}
                <Input
                  type="password"
                  size="lg"
                  label="Password"
                  color="amber"
                  {...register("password")}
                />
              </div>
              <div className="flex flex-col">
                {errors.confirmPassword && (
                  <span className="text-red-600 text-xs pb-1 pl-1 w-full text-right">
                    *{errors.confirmPassword?.message}
                  </span>
                )}
                <Input
                  type="password"
                  size="lg"
                  label="Confirm password"
                  color="amber"
                  {...register("confirmPassword")}
                />
              </div>
            </div>
          ):null}

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                Remember me
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button
            type="submit"
            color="orange"
            className="mt-6 flex justify-center"
            fullWidth
          >
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to={"/user/login"}
              className="font-medium text-orange-500 transition-colors hover:text-orange-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    
    </div>
  );
};

export default Reg;
