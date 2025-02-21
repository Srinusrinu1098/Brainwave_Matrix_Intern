import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Headers from "./AllComponents/Headers/Headers";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import Home from "./AllComponents/Home/Home.jsx";
import Login from "./AllComponents/Login/Login";
import MoneyTrack from "./AllComponents/MoneyManager/MoneyTrack";
import { Toaster } from "./components/ui/sonner";
import NotFound from "./AllComponents/NotFound/NotFound";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/money" element={<MoneyTrack />} />
        <Route exact path="/not-found" element={<NotFound />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
