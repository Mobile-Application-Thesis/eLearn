import SimpleToast from 'react-native-simple-toast'
import storage from '@react-native-firebase/storage'

const upload = ({ mime, path, user }) => {
  let downloadURL
  const uploadVar = storage()
    .ref(
      `users/${user.id}/uploads/lesson/image/${Date.now()}-${
        path.split('/')[path.split('/').length - 1]
      }`,
    )
    .putFile(path, {
      contentType: mime,
    })

  uploadVar.on(
    'state_changed',
    (snapshot) => {
      switch (snapshot.state) {
        case storage.TaskState.SUCCESS:
          break
      }
    },
    () => {
      SimpleToast.show('An error occured. please try again later.')
    },
    () => {
      uploadVar.snapshot.ref.getDownloadURL().then((url) => {
        downloadURL = url
      })
    },
  )
  return downloadURL
}

const errorHandler = ({ code }: { code: string }) => {
  console.warn(code)
  let msg = ''
  if (code === 'auth/invalid-email') {
    msg = 'Email address is invalid!'
  } else if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
    msg = 'Invalid credentials!'
  } else if (code === 'auth/network-request-failed') {
    msg = 'No internet connection!'
  } else if (code === 'auth/unknown') {
    msg = 'Something went wrong. Please try again later'
  } else if (code === 'auth/email-already-in-use') {
    msg = 'Email already in use'
  } else if (code === 'auth/too-many-requests') {
    msg = 'Too many attempts, please try again later.'
  }

  return SimpleToast.show(msg)
}

export { upload, errorHandler }
