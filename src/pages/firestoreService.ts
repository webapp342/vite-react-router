import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Kullanıcının spin puanlarını kontrol et ve güncelle
export const checkAndUpdatePoints = async (telegramUserId: string) => {
  const userRef = doc(db, 'users', telegramUserId);

  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const currentPoints = userDoc.data().points || 0;

      // Yeterli puan olup olmadığını kontrol et
      if (currentPoints >= 10) {
        // Puan yeterli ise güncelle
        const updatedPoints = currentPoints - 10;
        await updateDoc(userRef, {
          points: updatedPoints
        });
        console.log("Points updated successfully for user:", telegramUserId);
        return true;
      } else {
        console.log("Not enough points for user:", telegramUserId);
        return false;
      }
    } else {
      console.error("User document does not exist");
      return false;
    }
  } catch (error) {
    console.error("Error checking and updating points: ", error);
    return false;
  }
};

// Kullanıcının spinPoints değerini güncelle
export const updateSpinPoints = async (telegramUserId: string, spinPoints: number) => {
  const userRef = doc(db, 'users', telegramUserId);

  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const currentSpinPoints = userDoc.data().spinPoints || 0;
      const updatedSpinPoints = currentSpinPoints + spinPoints;
      await updateDoc(userRef, {
        spinPoints: updatedSpinPoints
      });
      console.log("Spin points updated successfully for user:", telegramUserId);
    } else {
      console.error("User document does not exist");
    }
  } catch (error) {
    console.error("Error updating spin points: ", error);
  }
};
