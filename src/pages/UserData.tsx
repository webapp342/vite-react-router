import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface UserDataProps {
  userId: string; // Firestore'daki kullanıcı ID'si
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInviteLink = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userDocRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setInviteLink(userData.invite_link || null);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching invite link:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInviteLink();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Invite Link</h2>
      {inviteLink ? (
        <p>{inviteLink}</p>
      ) : (
        <p>No invite link found.</p>
      )}
    </div>
  );
};

export default UserData;
