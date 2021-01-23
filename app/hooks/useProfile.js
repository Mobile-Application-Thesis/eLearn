import { useEffect, useState } from 'react'
import { FirebaseService } from '../services/firebase.services'

const useProfile = (loggedIn) => {
  const [userProfile, setUserProfile] = useState({})
  useEffect(() => {
    if (loggedIn) {
      const unsubscribe = FirebaseService.db
        .collection('users')
        .doc(FirebaseService.auth.currentUser.uid)
        .onSnapshot(
          {
            includeMetadataChanges: true,
          },
          {
            error: (e) => console.error(e),
            next: (documentSnapshot) => {
              setUserProfile(documentSnapshot._data)
            },
          },
        )
      return unsubscribe
    }
  }, [])
  return [userProfile, setUserProfile]
}

export default useProfile
