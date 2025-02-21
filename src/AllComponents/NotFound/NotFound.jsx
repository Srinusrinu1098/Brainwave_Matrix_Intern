import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img src="./404.png" alt="404 Not Found" className="w-64 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <span className="animate-spin">🚫</span> Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mt-2">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
