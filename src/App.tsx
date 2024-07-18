import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import SimpleBottomNavigation from "./pages/Navigation";
import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

function App() {
    useEffect(() => {
        // Telegram WebApp'i tam ekran moduna genişlet
        WebApp.expand();
    }, []);

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>

            <nav>
                <Link to="/vite-react-router/">Home</Link>
                {" | "}
                <Link to="/vite-react-router/farm">Farm</Link>
                {" | "}
                <Link to="/vite-react-router/user-details">User Profile</Link>
                {" | "}
                <Link to="/vite-react-router/user-profile-page">User Profile Page</Link>
            </nav>

            <Outlet />
            <SimpleBottomNavigation />
        </>
    );
}

export default App;
