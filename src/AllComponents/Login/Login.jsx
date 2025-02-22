import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loginEntries from "/src/assets/loginEntries.json";
import Google from "/src/assets/Google.json";
import Headers from "../Headers/Headers";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [log, setLog] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Redirect to /money if user is already logged in
  useEffect(() => {
    if (log && log.email) {
      // ✅ Ensure log contains valid user data
      navigate("/money");
    }
  }, [log, navigate]);

  // Define Google Login
  const login = useGoogleLogin({
    onSuccess: (resp) => saveUserProfile(resp),
    onError: (resp) => console.log(resp),
  });

  // Fetch and store user profile
  const saveUserProfile = async (userInfo) => {
    try {
      const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInfo.access_token}`;
      const options = {
        headers: {
          Authorization: `Bearer ${userInfo.access_token}`,
          Accept: "application/json",
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setLog(data); // Update state to trigger useEffect
        navigate("/money");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const loginBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Headers />
      <div className="flex flex-col justify-center items-center my-4">
        <h1 className="text-center text-[24px] sm:text-[34px] font-bold  py-4 -ml-6">
          Please Login with
        </h1>
        <Lottie
          animationData={Google}
          loop={true}
          className="w-[30vh] sm:w-[40vh] "
        />

        <Lottie animationData={loginEntries} loop={true} className="w-[50vh]" />
        <div className="flex gap-4">
          <Button
            className="my-4"
            onClick={() => {
              toast.info("🔄 Redirecting to Google Login...");
              login();
            }}
          >
            Login <FcGoogle />
          </Button>
          <Button className="my-4" onClick={loginBack}>
            Change Username
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
