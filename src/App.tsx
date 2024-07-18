
import "./App.css";
import { Outlet } from "react-router-dom";
import SimpleBottomNavigation from "./pages/Navigation";
import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";

function App() {
    useEffect(() => {
        // Telegram WebApp'i tam ekran moduna genişlet
        WebApp.expand();
    }, []);

    return (
        <div id="root">
            <div className="main-content">
                <Outlet />
            </div>
            <SimpleBottomNavigation />
        </div>
    );
}

export default App;
