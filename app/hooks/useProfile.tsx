import { useEffect, useState } from 'react'
import { FirebaseService } from '../services/firebase.services'

const useProfile = (
  id?: string,
): [any, (data: object) => any, (uid: string) => any] => {
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
              setUserProfile(documentSnapshot.data())
            },
          },
        )
      return unsubscribe
    }
  }, [])

  const updateUser = (data) => FirebaseService.updateFBData({ values: data })

  const setUser = (uid) =>
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

  return [userProfile, updateUser, setUser]
}

export default useProfile
