// src/components/UserProfilePage.js
import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { ExtendedWebAppUser } from './types'; // Kullanıcı tipi için gerekli olan import

const UserProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<ExtendedWebAppUser | null>(null);
  const [firestoreData, setFirestoreData] = useState<{ invite_link: string; clicks: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;
      if (user) {
        setUserData(user);
        try {
          const docRef = doc(db, "users", user.id.toString());
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFirestoreData({
              invite_link: data.invite_link,
              clicks: data.clicks,
            });
          } else {
            console.error("No such document!");
            setError("No such document!");
          }
        } catch (err) {
          console.error("Error getting document:", err);
          setError("Error getting document");
        } finally {
          setLoading(false);
        }
      } else {
        console.error('User data is not available');
        setError('User data is not available');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-content">
      <h2>User Details</h2>
 
      {userData && firestoreData && (
        <>
          <h3>Firestore Data</h3>
          <p><strong>Invite Link:</strong> {firestoreData.invite_link}</p>
          <p><strong>Clicks:</strong> {firestoreData.clicks}</p>
        </>
      )}
    </div>
  );
};

export default UserProfilePage;
