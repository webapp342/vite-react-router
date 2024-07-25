import React, { useState, useEffect, useCallback } from 'react';
import { db } from './firebaseConfig';
import { doc, setDoc, onSnapshot, Timestamp, updateDoc, increment, DocumentReference } from 'firebase/firestore';

interface CountdownData {
  endTime: Timestamp | null;
  isRunning: boolean;
  pointsAdded?: boolean;
}

const CountdownTimer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);

  const userId = localStorage.getItem('telegramUserId') || 'defaultUserId';

  const updatePoints = useCallback(async (docRef: DocumentReference) => {
    await setDoc(docRef, {
      endTime: null,
      isRunning: false,
      pointsAdded: true
    }, { merge: true });

    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      score: increment(10)
    });

    console.log('Added 10 points to user.');
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching countdown data for user:', userId);

        const docRef = doc(db, 'countdowns', userId);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as CountdownData;
            const currentTime = new Date();

            if (data.isRunning && data.endTime && data.endTime.toDate() > currentTime) {
              setIsRunning(true);
              const remainingTime = Math.floor((data.endTime.toDate().getTime() - currentTime.getTime()) / 1000);
              setSeconds(remainingTime);
              setButtonDisabled(true);
              localStorage.setItem('countdownEndTime', data.endTime.toDate().toISOString());
              localStorage.setItem('isRunning', 'true');
            } else {
              setIsRunning(false);
              setSeconds(0);
              setButtonDisabled(false);

              localStorage.removeItem('countdownEndTime');
              localStorage.setItem('isRunning', 'false');

              if (!data.pointsAdded) {
                updatePoints(docRef);
              } else {
                setDoc(docRef, {
                  endTime: null,
                  isRunning: false
                }, { merge: true });
              }
            }
          } else {
            console.log('Document does not exist. Creating new document.');
            setDoc(docRef, {
              endTime: null,
              isRunning: false,
              pointsAdded: false
            }, { merge: true });
            setButtonDisabled(false);
            localStorage.removeItem('countdownEndTime');
            localStorage.setItem('isRunning', 'false');
          }
        });

        const userDocRef = doc(db, 'users', userId);
        const userUnsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
          if (userDocSnap.exists()) {
            const newScore = userDocSnap.data().score || 0;
            setUserScore(newScore);
            localStorage.setItem('userScore', newScore.toString());
          }
        });

        return () => {
          unsubscribe();
          userUnsubscribe();
        };
      } catch (error) {
        console.error('Error fetching countdown data:', error);
      }
    };

    fetchData();
  }, [userId, updatePoints]);

  const startCountdown = async () => {
    try {
      console.log('Starting countdown for user:', userId);

      const endTime = new Date(Date.now() + 300 * 1000); // 5 dakika sonrası
      console.log('Countdown endTime:', endTime);

      const docRef = doc(db, 'countdowns', userId);

      await setDoc(docRef, {
        endTime: Timestamp.fromDate(endTime),
        isRunning: true,
        pointsAdded: false
      }, { merge: true });

      console.log('Document updated with new endTime and isRunning true.');

      setSeconds(300); // 5 dakika
      setIsRunning(true);
      setButtonDisabled(true);

      localStorage.setItem('countdownEndTime', endTime.toISOString());
      localStorage.setItem('isRunning', 'true');
    } catch (error) {
      console.error('Error starting countdown:', error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      console.log('Countdown started.');
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            console.log('Countdown finished.');
            clearInterval(interval!);
            setIsRunning(false);
            setButtonDisabled(false);

            // Geri sayım tamamlandığında Firestore'u güncelleyin
            const updateFirestore = async () => {
              const docRef = doc(db, 'countdowns', userId);
              updatePoints(docRef);
              localStorage.removeItem('countdownEndTime');
              localStorage.setItem('isRunning', 'false');
            };

            updateFirestore();

            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
        console.log('Interval cleared.');
      }
    };
  }, [isRunning, userId, updatePoints]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: isRunning ? 'lightgreen' : 'lightcoral',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '20px',
    transition: 'background-color 0.5s ease'
  };

  return (
    <div style={containerStyle}>
      <h1>Geri Sayım: {formatTime(seconds)}</h1>
      <p>Mevcut Skor: {userScore}</p>
      <button onClick={startCountdown} disabled={buttonDisabled}>
        {buttonDisabled ? 'Başlatıldı' : 'Başlat'}
      </button>
    </div>
  );
};

export default CountdownTimer;
