import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
//import Home  from "./pages/Home.tsx"; 
import  FarmComponent  from "./pages/FarmComponent.tsx";
import UserDetails from "./pages/UserDetails.tsx";
// import UserProfilePage from "./pages/UserProfilePage.tsx";
import WheelSpin from "./pages/WheelSpin.tsx";
import SlotMachine from "./pages/slot/SlotMachine.tsx";




const router = createBrowserRouter([
  {
    path: "/vite-react-router/",
    element: <App />,
    children: [
      {
        path: "/vite-react-router/",
        element: <WheelSpin />,
      },
      {
        path: "/vite-react-router/farm",
        element: <FarmComponent />,
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
