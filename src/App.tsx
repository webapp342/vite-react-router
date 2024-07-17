import reactLogo from "./assets/react.svg";
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import viteLogo from "/vite.svg";
import "./App.css";
import { saveUserData } from '../src/pages/firestoreUtils.tsx';

import { Link, Outlet, useNavigate } from "react-router-dom";
import { ExtendedWebAppUser } from '../src/pages/types'; // Kullanıcı tipi için gerekli olan import

function App() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [photoUrl, setPhotoUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;
      if (user) {
        setUsername(user.username || 'Kullanıcı adı yok');
        setUserId(user.id);
        setPhotoUrl(user.photo ? user.photo.big_file_id : 'default-profile-pic.png');
        await saveUserData(user);
      }
    };

    fetchData();
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
        <Link to="/vite-react-router/contact">Contact</Link>
        {" | "}
        <Link 
          to="/vite-react-router/user"
          onClick={() => navigate('/vite-react-router/user', {
            state: { username, userId, photoUrl }
          })}
        >
          User Profile
        </Link>
      </nav>

      <Outlet />

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
