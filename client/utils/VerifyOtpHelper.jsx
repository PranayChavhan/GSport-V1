import app from "../src/firebase";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";


 // ? Mobile verification started
 const auth = getAuth(app);
 
 const onCaptchaVerify=() =>{
   window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
     size: "invisible",
     callback: (response) => {
       // reCAPTCHA solved, allow signInWithPhoneNumber.
     },
   }, auth);
 }

 export const onSignInSubmit = ()=> { // user input

   onCaptchaVerify()
   const appVerifier = window.recaptchaVerifier;
   const phoneNum ="+91"+ phoneNumber
   signInWithPhoneNumber(auth, phoneNum, appVerifier)
     .then((confirmationResult) => {
       // SMS sent. Prompt user to type the code from the message, then sign the
       // user in with confirmationResult.confirm(code).
       window.confirmationResult = confirmationResult;
       alert("otp sent");
     })
     .catch((error) => {
       console.log(`SMS not sent ${error}`);
     });
 }

export const verifyCode=()=> {
   const code = verifyOtp;
   if(code.length === 6 ){
     confirmationResult
     .confirm(code)
     .then((result) => {
       // User signed in successfully.
       const user = result.user;
       console.log("user from verify otp code", user)
       // ...
       alert('verification done')
     })
     .catch((error) => {
       // User couldn't sign in (bad verification code?)
       // ...
       alert('invalid otp', error)
     });
   }
   
 }
 //  Mobile verification ended