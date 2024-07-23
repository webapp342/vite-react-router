import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { doc, setDoc, getDoc, Timestamp, updateDoc, increment } from 'firebase/firestore';

interface CountdownData {
  endTime: Timestamp | null;
  isRunning: boolean;
  pointsAdded?: boolean; // Puan eklendi mi?
}

const CountdownTimer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [userScore, setUserScore] = useState<number>(0);

  // Kullanıcı ID'sini localStorage'dan al
  const userId = localStorage.getItem('telegramUserId') || 'defaultUserId'; // Varsayılan bir ID eklenebilir

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching countdown data for user:', userId);

        const docRef = doc(db, 'countdowns', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          const data = docSnap.data() as CountdownData;
          const currentTime = new Date();
          console.log('Current time:', currentTime);
          console.log('Document endTime:', data.endTime?.toDate());

          if (data.isRunning && data.endTime && data.endTime.toDate() > currentTime) {
            console.log('Countdown is running.');
            setIsRunning(true);
            const remainingTime = Math.floor((data.endTime.toDate().getTime() - currentTime.getTime()) / 1000);
            setSeconds(remainingTime);
            setButtonDisabled(true);
            localStorage.setItem('countdownEndTime', data.endTime.toDate().toISOString());
            localStorage.setItem('isRunning', 'true');
          } else {
            console.log('Countdown has expired or is not running.');
            setIsRunning(false);
            setSeconds(0);
            setButtonDisabled(false);
            localStorage.removeItem('countdownEndTime');
            localStorage.removeItem('isRunning');

            if (!data.pointsAdded) {
              // Puan ekleme işlemi yapılmamışsa, puanı ekleyin
              await setDoc(docRef, {
                endTime: null,
                isRunning: false,
                pointsAdded: true
              }, { merge: true });

              // Kullanıcı puanını güncelleyin
              const userDocRef = doc(db, 'users', userId);
              await updateDoc(userDocRef, {
                score: increment(10)
              });
              console.log('Added 10 points to user.');

              // Kullanıcı skorunu güncelle
              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
                setUserScore(userDocSnap.data().score || 0);
                localStorage.setItem('userScore', (userDocSnap.data().score || 0).toString());
              }
            } else {
              // Puan ekleme işlemi yapılmışsa, sadece geri sayımı güncelleyin
              await setDoc(docRef, {
                endTime: null,
                isRunning: false
              }, { merge: true });
            }
          }
        } else {
          console.log('Document does not exist. Creating new document.');
          await setDoc(docRef, {
            endTime: null,
            isRunning: false,
            pointsAdded: false // Başlangıçta puan eklenmedi
          }, { merge: true });
          setButtonDisabled(false);
          localStorage.removeItem('countdownEndTime');
          localStorage.removeItem('isRunning');
        }

        // Kullanıcı skorunu al
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserScore(userDocSnap.data().score || 0);
          localStorage.setItem('userScore', (userDocSnap.data().score || 0).toString());
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

      const endTime = new Date(Date.now() + 300 * 1000);
      console.log('Countdown endTime:', endTime);

      const docRef = doc(db, 'countdowns', userId);

      await setDoc(docRef, {
        endTime: Timestamp.fromDate(endTime),
        isRunning: true,
        pointsAdded: false // Geri sayım başlatıldığında puan eklenmedi
      }, { merge: true });

      console.log('Document updated with new endTime and isRunning true.');

      setSeconds(300);
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
            setDoc(doc(db, 'countdowns', userId), {
              endTime: null,
              isRunning: false,
              pointsAdded: true
            }, { merge: true });

            // Kullanıcı puanını güncelleyin
            const userDocRef = doc(db, 'users', userId);
            updateDoc(userDocRef, {
              score: increment(10)
            });

            console.log('Added 10 points to user.');

            // Kullanıcı skorunu güncelle
            getDoc(userDocRef).then(userDocSnap => {
              if (userDocSnap.exists()) {
                const newScore = userDocSnap.data().score || 0;
                setUserScore(newScore);
                localStorage.setItem('userScore', newScore.toString());
              }
            });

            localStorage.removeItem('countdownEndTime');
            localStorage.removeItem('isRunning');

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
