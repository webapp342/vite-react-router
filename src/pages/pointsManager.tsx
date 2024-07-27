import React, { useState, useEffect } from 'react';
import { getUserData } from './firestoreService';
import './PointsManager.css'; // CSS dosyasını ekleyin

const PointsManager: React.FC = () => {
  const [spinPoints, setSpinPoints] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const userId = localStorage.getItem('telegramUserId') || '';

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getUserData(userId);
        setSpinPoints(userData.spinPoints);
        setPoints(userData.points);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="points-manager">
      <div className="points-display">
        <h2>Spin Points:</h2>
        <p>{spinPoints}</p>
      </div>
      <div className="points-display">
        <h2>Points:</h2>
        <p>{points}</p>
      </div>
    </div>
  );
};

export default PointsManager;
