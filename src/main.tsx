import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
//import Home  from "./pages/Home.tsx"; 
import  AccountEquityCard  from "./pages/extras/AccountEquityCard.tsx";
import DPRdata from "./pages/DPRdata.tsx";
// import UserProfilePage from "./pages/UserProfilePage.tsx";
//import WheelSpin from "./pages/WheelSpin.tsx";
import LocalStorageViewer from "./pages/localStorage.tsx";
//import  CryptoTable2  from "./pages/wallet.tsx";
import Calculator from "./pages/Calculator.tsx";
import Task from "./pages/Tasks/Task.tsx";

import SwapComponent from "./pages/SwapComponent.tsx";
import TradingViewWidgetVertical from "./pages/extras/DataComponent.tsx";






const router = createBrowserRouter([
  {
    path: "/vite-react-router/",
    element: <App />,
    children: [
      {
        path: "/vite-react-router/calculator",
        element: <Calculator />,
      },
     
      {
        path: "/vite-react-router/farm",
        element: <AccountEquityCard />,
      },
      {
        path: "/vite-react-router/task",
        element: <Task />,
      },
      {
        path: "/vite-react-router/news",
        element: <TradingViewWidgetVertical />,
      },
      {
        path: "/vite-react-router/user-details",
        element: <DPRdata />,
      },
      {
        path: "/vite-react-router/user-profile-page",
        element: <SwapComponent />,
      },
      {
        path: "/vite-react-router/",
        element: <LocalStorageViewer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
