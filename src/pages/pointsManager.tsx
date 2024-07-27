import React, { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Firebase konfigürasyonunuzu import edin
import './PointsManager.css'; // CSS dosyasını ekleyin

const PointsManager: React.FC = () => {
  const [spinPoints, setSpinPoints] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const userId = localStorage.getItem('telegramUserId') || '';

  useEffect(() => {
    if (userId) {
      const userRef = doc(db, 'users', userId);

      // Veritabanı değişikliklerini dinle
      const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setSpinPoints(data?.spinPoints || 0);
          setPoints(data?.points || 0);
        }
      });

      // Unsubscribe on component unmount
      return () => unsubscribe();
    }
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
