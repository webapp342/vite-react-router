import {  getDocs, collection, DocumentData } from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function fetchCollectionData(collectionPath: string) {
  const collectionRef = collection(db, collectionPath);
  const snapshot = await getDocs(collectionRef);

  return snapshot.docs.map((doc: DocumentData) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function fetchSubCollectionData(
  parentPath: string,
  subCollectionName: string
) {
  const subCollectionRef = collection(db, `${parentPath}/${subCollectionName}`);
  const snapshot = await getDocs(subCollectionRef);

  return snapshot.docs.map((doc: DocumentData) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
