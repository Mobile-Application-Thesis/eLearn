import SimpleToast from 'react-native-simple-toast'

const errors = ({ code }: { code: string }) => {
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
  }

  return SimpleToast.show(msg)
}

export default errors
