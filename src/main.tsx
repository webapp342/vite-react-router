import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
//import Home  from "./pages/Home.tsx"; 
import  CryptoTable  from "./pages/CryptoTable.tsx";
import UserDetails from "./pages/UserDetails.tsx";
// import UserProfilePage from "./pages/UserProfilePage.tsx";
//import WheelSpin from "./pages/WheelSpin.tsx";
import SlotMachine from "./pages/slot/SlotMachine.tsx";
import LocalStorageViewer from "./pages/localStorage.tsx";




const router = createBrowserRouter([
  {
    path: "/vite-react-router/",
    element: <App />,
    children: [
      {
        path: "/vite-react-router/",
        element: <LocalStorageViewer />,
      },
      {
        path: "/vite-react-router/farm",
        element: <CryptoTable />,
      },
      {
        path: "/vite-react-router/user-details",
        element: <UserDetails />,
      },
      {
        path: "/vite-react-router/user-profile-page",
        element: <SlotMachine />,

      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
