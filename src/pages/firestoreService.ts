import { db } from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export const updateSpinPoints = async (telegramUserId: string, spinPoints: number) => {
  const userRef = doc(db, 'users', telegramUserId);

  try {
    await updateDoc(userRef, {
      spinPoints: spinPoints
    });
    console.log("Spin points updated successfully for user:", telegramUserId);
  } catch (error) {
    console.error("Error updating spin points: ", error);
  }
};
