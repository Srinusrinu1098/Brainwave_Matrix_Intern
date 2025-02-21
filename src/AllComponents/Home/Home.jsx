import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Headers from "../Headers/Headers";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

function Home() {
  const [username, userentered] = useState("");
  const Navegate = useNavigate();
  const [user, adduser] = useState(localStorage.getItem("user"));

  const GetStarted = () => {
    if (username.length < 5) {
      return toast("Name should contain atleast 5 letters");
    } else {
      Cookies.set("Srinu", username, { expires: 5 });
    }
    if (!user) {
      Navegate("/login");
    }
  };
  useEffect(() => {
    if (user) {
      Navegate("/money");
    }
  }, [user, Navegate]);

  return (
    <div className="w-full h-full">
      <Headers />

      <div className="flex items-center justify-center  flex-col px-4 min-h-screen  bg-black pointer-events-auto">
        <input
          type="text"
          className="w-full h-8 outline-none pl-6 round rounded-md border border-white bg-black text-white"
          placeholder="Enter your name"
          onChange={(e) => userentered(e.target.value)}
        />
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-green-900 to-gray-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Track Your Expenses
          <br /> Control Your Future
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-white dark:text-neutral-400 text-center py-2">
          Take charge of your finances with our smart expense tracker. Easily
          monitor your income, spending, and savings—all in one place. Gain
          insights, set budgets, and achieve financial freedom with ease! 🚀
        </p>
        <Button
          variant="secondary"
          className="cursor-pointer my-10"
          onClick={GetStarted}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Home;
