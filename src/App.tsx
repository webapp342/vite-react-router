
import "./App.css";

import  { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import SimpleBottomNavigation from "./pages/Navigation";
import WebApp from "@twa-dev/sdk";
import Loading from "./pages/Loading"; // Loading bileşenini import edin
import './index.css'; // Global stil dosyasını import edin

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Telegram WebApp'i tam ekran moduna genişlet
        WebApp.expand();

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // 3 saniye bekleme süresi

        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="root">
            {loading && <Loading />}
            <div className={`main-content ${loading ? 'hidden' : ''}`}>
                <Outlet />
            </div>
            <SimpleBottomNavigation />
        </div>
    );
}

export default App;