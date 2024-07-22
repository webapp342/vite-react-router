import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Firestore'u içe aktarın
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

// Kullanıcı ID'si tipi (örnek olarak string olarak tanımlanmıştır, gerçek uygulamada farklı olabilir)
type UserId = string;

interface CountdownData {
  endTime: Timestamp | null;
  isRunning: boolean;
}

const CountdownTimer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  // Kullanıcı ID'si (önceden belirlenmiş veya kimlik doğrulama ile alınmış olmalı)
  const userId: UserId = '7046348699'; // Örnek kullanıcı ID'si

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'countdowns', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as CountdownData;
          const currentTime = new Date();

          if (data.isRunning && data.endTime && data.endTime.toDate() > currentTime) {
            // Geri sayım süresi hala devam ediyorsa
            setIsRunning(true);
            const remainingTime = Math.floor((data.endTime.toDate().getTime() - currentTime.getTime()) / 1000);
            setSeconds(remainingTime);
            setButtonDisabled(true);
          } else {
            // Geri sayım süresi dolmuşsa
            setIsRunning(false);
            setSeconds(0);
            setButtonDisabled(false);
            // Firestore'daki isRunning ve endTime'ı güncelleyin
            await setDoc(docRef, {
              endTime: null,
              isRunning: false,
            }, { merge: true });
          }
        }
      } catch (error) {
        console.error('Error fetching countdown data:', error);
      }
    };

    fetchData();
  }, []);

  const startCountdown = async () => {
    try {
      const endTime = new Date(Date.now() + 300 * 1000); // Şu andan 5 dakika ekleyin
      const docRef = doc(db, 'countdowns', userId);

      await setDoc(docRef, {
        endTime: Timestamp.fromDate(endTime),
        isRunning: true,
      }, { merge: true });

      setSeconds(300);
      setIsRunning(true);
      setButtonDisabled(true);
    } catch (error) {
      console.error('Error starting countdown:', error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(interval!);
            setIsRunning(false);
            setButtonDisabled(false);
            // Geri sayım tamamlandığında Firestore'u güncelleyin
            setDoc(doc(db, 'countdowns', userId), {
              endTime: null,
              isRunning: false,
            }, { merge: true });
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Geri Sayım: {formatTime(seconds)}</h1>
      <button onClick={startCountdown} disabled={buttonDisabled}>
        {buttonDisabled ? 'Başlatıldı' : 'Başlat'}
      </button>
    </div>
  );
};

export default CountdownTimer;
