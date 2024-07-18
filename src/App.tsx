
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
                <h1>Vite + React</h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloremque expedita ipsa tempore aperiam eaque quisquam distinctio ullam quibusdam a. Molestiae exercitationem, eaque beatae alias inventore aliquam quae eius officiis!
                <Outlet />
            </div>
            <SimpleBottomNavigation />
        </div>
    );
}

export default App;
