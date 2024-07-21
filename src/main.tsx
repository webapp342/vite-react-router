import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home  from "./pages/Home.tsx";
import  FarmComponent  from "./pages/FarmComponent.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import LocalStorageViewer from "./pages/localStorageViewer.tsx";



const router = createBrowserRouter([
  {
    path: "/vite-react-router/",
    element: <App />,
    children: [
      {
        path: "/vite-react-router/",
        element: <Home />,
      },
      {
        path: "/vite-react-router/farm",
        element: <FarmComponent />,
      },
      {
        path: "/vite-react-router/user-details",
        element: <LocalStorageViewer />,
      },
      {
        path: "/vite-react-router/user-profile-page",
        element: <UserProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
