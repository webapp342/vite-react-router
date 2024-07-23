import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { doc, setDoc, getDoc, Timestamp, updateDoc, increment } from 'firebase/firestore';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching countdown data for user:', userId);

        const docRef = doc(db, 'countdowns', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as CountdownData;
          const currentTime = new Date();

          if (data.isRunning && data.endTime && data.endTime.toDate() > currentTime) {
            // Geri sayım hala çalışıyor
            setIsRunning(true);
            const remainingTime = Math.floor((data.endTime.toDate().getTime() - currentTime.getTime()) / 1000);
            setSeconds(remainingTime);
            setButtonDisabled(true);
            localStorage.setItem('countdownEndTime', data.endTime.toDate().toISOString());
            localStorage.setItem('isRunning', 'true');
          } else {
            // Geri sayım bitmiş veya çalışmıyor
            setIsRunning(false);
            setSeconds(0);
            setButtonDisabled(false);

            // localStorage'ı güncelle
            localStorage.removeItem('countdownEndTime');
            localStorage.setItem('isRunning', 'false');

            if (!data.pointsAdded) {
              // Puan eklenmemişse, puanı ekleyin
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

              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
                const newScore = userDocSnap.data().score || 0;
                setUserScore(newScore);
                localStorage.setItem('userScore', newScore.toString());
              }
            } else {
              // Puan eklenmişse, sadece geri sayımı güncelleyin
              await setDoc(docRef, {
                endTime: null,
                isRunning: false
              }, { merge: true });
            }
          }
        } else {
          // Belge mevcut değilse, yeni belge oluşturun
          console.log('Document does not exist. Creating new document.');
          await setDoc(docRef, {
            endTime: null,
            isRunning: false,
            pointsAdded: false
          }, { merge: true });
          setButtonDisabled(false);
          localStorage.removeItem('countdownEndTime');
          localStorage.setItem('isRunning', 'false');
        }

        // Kullanıcı skorunu güncelle
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const newScore = userDocSnap.data().score || 0;
          setUserScore(newScore);
          localStorage.setItem('userScore', newScore.toString());
        }
      } catch (error) {
        console.error('Error fetching countdown data:', error);
      }
    };

    fetchData();
  }, [userId]);

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

              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
                const newScore = userDocSnap.data().score || 0;
                setUserScore(newScore);
                localStorage.setItem('userScore', newScore.toString());
              }

              // Güncellenmiş verileri localStorage'a kaydedin
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
  }, [isRunning, userId]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Geri Sayım: {formatTime(seconds)}</h1>
      <p>Mevcut Skor: {userScore}</p>
      <button onClick={startCountdown} disabled={buttonDisabled}>
        {buttonDisabled ? 'Başlatıldı' : 'Başlat'}
      </button>
    </div>
  );
};

export default CountdownTimer;
