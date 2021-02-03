import { useEffect, useState } from 'react'
import { FirebaseService } from 'eLearn/app/services/firebase.services'

const useProfile = (id) => {
  const [userProfile, setUserProfile] = useState({})
  useEffect(() => {
    const unsubscribe = FirebaseService.db
      .collection('users')
      .doc(id || FirebaseService.auth.currentUser.uid)
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
  }, [])

  const setData = (data) => FirebaseService.updateFBData({ values: data })

  return [userProfile, setData]
}

export default useProfile
