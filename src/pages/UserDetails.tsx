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
  const [counterValue, setCounterValue] = useState<number>(0); // Sayıcı için durum

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

              // Sayacı güncelle
              const elapsedTime = 300 - remainingTime;
              const counterIncrementPerSecond = 10 / 300;
              setCounterValue(counterIncrementPerSecond * elapsedTime);

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

              // Sayıcıyı sıfırla
              setCounterValue(0);
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

            // Sayıcıyı sıfırla
            setCounterValue(0);
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

      // Sayıcıyı sıfırla
      setCounterValue(0);

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

            // Sayıcıyı sıfırla
            setCounterValue(0);

            return 0;
          }
          // Güncel sayıcı değerini güncelle
          const elapsedTime = 300 - prevSeconds;
          const counterIncrementPerSecond = 10 / 300;
          setCounterValue(counterIncrementPerSecond * elapsedTime);
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
    backgroundColor: 'black',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'background-color 0.5s ease'
  };

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    fontSize: '20px',
    textAlign: 'center',
    backgroundColor: 'black',
    color: isRunning ? 'green' : 'white',
    border: `2px solid ${isRunning ? 'green' : 'red'}`,
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    cursor: 'pointer',
    boxShadow: `
      0px 50px 100px -20px ${isRunning ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'},
      0px 30px 60px -30px ${isRunning ? 'rgba(0, 255, 0, 0.4)' : 'rgba(255, 0, 0, 0.4)'},
      0px -2px 6px 0px inset ${isRunning ? 'rgba(0, 255, 0, 0.35)' : 'rgba(255, 0, 0, 0.35)'}
    `,
    transition: 'background-color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease'
  };

  const scoreStyle: React.CSSProperties = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '18px',
    color: 'white',
    textAlign: 'center'
  };

  const counterStyle: React.CSSProperties = {
    position: 'absolute',
    top: '75%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '18px',
    color: 'white',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={scoreStyle}>
        <p>Mevcut Skor: {userScore}</p>
      </div>
      <button onClick={startCountdown} disabled={buttonDisabled} style={buttonStyle}>
        {isRunning ? (
          <>
            <span style={{ display: 'block', marginBottom: '10px' }}>Başlatıldı</span>
            <span>{formatTime(seconds)}</span>
          </>
        ) : (
          <span style={{ display: 'block' }}>Başlat</span>
        )}
      </button>
      <div style={counterStyle}>
        <p>{counterValue.toFixed(2)} Puan</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
