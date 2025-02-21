import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_LOGIN_CLEINT_ID}
      >
        <App />
      </GoogleOAuthProvider>
    </HashRouter>
  </StrictMode>
);
