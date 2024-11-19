import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
//import Home  from "./pages/Home.tsx"; 
import  MetalsTable  from "./pages/TopInvestors.tsx";
import UserDetails from "./pages/UserDetails.tsx";
// import UserProfilePage from "./pages/UserProfilePage.tsx";
//import WheelSpin from "./pages/WheelSpin.tsx";
import LocalStorageViewer from "./pages/localStorage.tsx";
//import  CryptoTable2  from "./pages/wallet.tsx";
import Calculator from "./pages/Calculator.tsx";





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
        element: <MetalsTable />,
      },
      {
        path: "/vite-react-router/user-details",
        element: <UserDetails />,
      },
      {
        path: "/vite-react-router/user-profile-page",
        element: <LocalStorageViewer />,
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
