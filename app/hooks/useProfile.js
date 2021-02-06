import { useEffect, useState } from 'react'
import { FirebaseService } from 'eLearn/app/services/firebase.services'

const useProfile = (id) => {
  const [userProfile, setUserProfile] = useState({})
  useEffect(() => {
    if (id) {
      const unsubscribe = FirebaseService.db
        .collection('users')
        .doc(id)
        .onSnapshot(
          {
            includeMetadataChanges: true,
          },
          {
            next: (documentSnapshot) => {
              setUserProfile(documentSnapshot._data)
            },
          },
        )
      return unsubscribe
    }
  }, [])

  const setData = (data) => FirebaseService.updateFBData({ values: data })

  const updateUser = (uid) =>
    FirebaseService.db
      .collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserProfile(doc.data())
        } else {
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })

  return [userProfile, setData, updateUser]
}

export default useProfile
