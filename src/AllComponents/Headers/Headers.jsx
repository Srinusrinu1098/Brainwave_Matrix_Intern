import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import Logo from "/src/assets/Logo.json";
import login from "/src/assets/login.json";
import Logout from "/src/assets/Logout.json";
import Cookies from "js-cookie";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Headers() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [open, close] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setUser(null);
    }
  }, [user]);

  const getLogedin = useGoogleLogin({
    onSuccess: (resp) => SaveUserInfo(resp),
    onError: (resp) => console.log(resp),
  });

  const SaveUserInfo = async (token) => {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${token.access_token}`;
    const options = {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Accept: "application/json",
      },
    };
    console.log(Cookies.get("Srinu"));

    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setTimeout(() => {
        close(false);
      }, 500);
      setUser(localStorage.getItem("user"));
      navigate("/money");
    }
  };

  const Logouts = () => {
    setloging(true);
  };

  const userLogout = () => {
    localStorage.removeItem("user");
    Cookies.remove("Srinu");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-gradient-to-t from-gray-500 to-neutral-500 cursor-pointer">
      <Lottie
        animationData={Logo}
        loop={true}
        className="w-14 h-14"
        onClick={() => {
          if (user) {
            toast.error("Please Logout first");
          } else {
            navigate("/");
          }
        }}
      />

      {user ? (
        <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <AlertDialogTrigger>
            <Lottie
              animationData={Logout}
              loop={true}
              className="w-14 h-14 cursor-pointer !important"
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will be signed out from your account. To access your data
                again, you will need to log in.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={userLogout}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Lottie
          animationData={login}
          loop={true}
          className="w-14 h-14 cursor-pointer !important"
          onClick={() => {
            if (!Cookies.get("Srinu")) {
              toast.error("⚠️ Please enter your name and click 'Get Started'!");
            } else {
              toast.info("🔄 Redirecting to Google Login...");
              getLogedin();
            }
          }}
        />
      )}
    </div>
  );
}

export default Headers;
