import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const updateSpinPoints = async (telegramUserId: string, newSpinPoints: number) => {
  const userRef = doc(db, 'users', telegramUserId);

  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const currentSpinPoints = userDoc.data().spinPoints || 0;
      const updatedSpinPoints = currentSpinPoints + newSpinPoints;
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
