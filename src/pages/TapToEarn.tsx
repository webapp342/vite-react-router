// TapToEarn.tsx
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Firestore bağlantınızı içe aktarın
import { doc, getDoc, setDoc } from 'firebase/firestore';

const TapToEarn: React.FC<{ userId: string }> = ({ userId }) => {
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const userDoc = doc(db, 'users', userId);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          if (userData && userData.clicks) {
            setPoints(userData.clicks);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchPoints();
  }, [userId]);

  const handleClick = async () => {
    try {
      const newPoints = points + 1;
      const userDoc = doc(db, 'users', userId);
      await setDoc(userDoc, { clicks: newPoints }, { merge: true });
      setPoints(newPoints);
    } catch (error) {
      console.error('Error updating clicks:', error);
    }
  };

  return (
    <div className="main-content">
      <h2>Tap to Earn</h2>
      <p>Puanlarınız: {points}</p>
      <button onClick={handleClick}>Tap Here!</button>
    </div>
  );
};

export default TapToEarn;
