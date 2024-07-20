
import "./App.css";
import { Outlet } from "react-router-dom";
import SimpleBottomNavigation from "./pages/Navigation";
import { useEffect } from "react";
import WebApp from "@twa-dev/sdk";
import './index.css'; // Global stil dosyasını import edin


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
