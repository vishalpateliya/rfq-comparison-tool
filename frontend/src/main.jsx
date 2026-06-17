import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ThemeProvider } from "@/shared/theme/ThemeProvider";
import ThemedToaster from "@/shared/theme/ThemedToaster";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
        <ThemedToaster />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
