import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import SimpleBottomNavigation from "./pages/Navigation";
import WebApp from "@twa-dev/sdk";

function App() {
    useEffect(() => {
        // Telegram WebApp'i tam ekran moduna genişlet
        WebApp.expand();

        // Telegram Mini App yüklendiğinde, alt kısımdaki öğeleri gizle
        const hideTelegramBottom = () => {
            const chatElement = document.querySelector('.tg_head_peer') as HTMLElement | null;
            if (chatElement) {
                chatElement.style.display = 'none';
            }

            const attachmentElement = document.querySelector('.composer_rich_textarea') as HTMLElement | null;
            if (attachmentElement) {
                attachmentElement.style.display = 'none';
            }
        };

        hideTelegramBottom();
    }, []);

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
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
        </div>
    );
}

export default App;
