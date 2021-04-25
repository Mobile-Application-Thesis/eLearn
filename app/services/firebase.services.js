import app, { firebase } from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/functions'
import '@react-native-firebase/database'
import '@react-native-firebase/firestore'

import DevicesFBServices from './devicesFB.services'
import MessagingFBServices from './messagingFB.services'
import config from './config.json'

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      app.initializeApp(config)
    }

    this.authUser = {}
    this.auth = app.auth()
    this.db = app.firestore()
    this.functions = app.functions()

    this.auth.onAuthStateChanged((user) => {
      this.authUser = { user }
    })

    this.auth.onUserChanged((user) => {
      this.authUser = { user }
    })
  }

  checkAuthorization() {
    if (!this.auth.currentUser) {
      return [
        '[error/unauthorized] You are unauthorized to perform any operation. Please login and try again.',
      ]
    }

    return []
  }

  processSnapshots({ query, setLastRef = Function.prototype } = {}) {
    return query
      .get()
      .then((querySnapshot) => {
        const data = []

        setLastRef(querySnapshot.docs[querySnapshot.docs.length - 1])

        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          })
        })

        return [null, data]
      })
      .catch((error) => {
        return [error]
      })
  }

  signIn({ email, password }) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => err)
  }

  createUserProfile = ({
    id,
    username,
    fullName,
    email,
    avatar = TEMPORARY_AVATAR,
  } = {}) => {
    const user = {
      id,
      avatar,
      username,
      fullName,
      email,
      role: '',
      birthday: '',
      address: '',
      country: '',
      status: '',
    }

    return this.setFBDoc({
      doc: id,
      docData: user,
    })
  }

  signUp({ fullName, username, email, password }) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => app.auth().currentUser)
      .then(async (currentUser) => {
        await this.createUserProfile({
          id: currentUser.uid,
          email,
          username,
          fullName,
        })

        return currentUser
      })
      .then(async (currentUser) => {
        await currentUser.updateProfile({
          username,
          displayName: fullName,
          photoURL: TEMPORARY_AVATAR,
        })
      })
      .then(() => ({ user: app.auth().currentUser }))
      .catch((err) => err)
  }

  updateProfile({ displayName, username, photoURL, ...rest }) {
    const profile = {
      username,
      displayName,
      photoURL,
      ...rest,
    }

    return this.auth.currentUser.updateProfile(profile)
  }

  async signOut() {
    const [token] = await MessagingFBServices.getFCMToken()

    await DevicesFBServices.deactivateUserDevice(token)

    return this.auth.signOut()
  }

  sendPasswordResetEmail(emailAddress) {
    return this.auth
      .sendPasswordResetEmail(emailAddress)
      .then(() => ({ success: true }))
      .catch((error) => ({ error }))
  }

  getFBCollectionData({ collection = 'users' } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db.collection(collection)
  }

  getFBCollectionWhere = ({
    collection = 'users',
    key,
    value,
    operator = '==',
  } = {}) => {
    return this.db.collection(collection).where(key, operator, value)
  }

  getFBCollectionFromChildData({
    endCollection,
    parentCollection = 'users',
    parentDoc,
  } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(parentDoc || this.auth.currentUser.uid)
      .collection(endCollection)
  }

  addFBData({ values, doc, collection = 'users' } = {}) {
    return this.db
      .collection(collection)
      .doc(doc || this.auth.currentUser.uid)
      .add(values)
  }

  updateFBData({
    values,
    doc = this.auth.currentUser.uid,
    collection = 'users',
  } = {}) {
    const clone = { ...values }
    delete clone.id

    return this.db
      .collection(collection)
      .doc(doc)
      .update({
        ...clone,
        updatedAt: app.firestore.FieldValue.serverTimestamp(),
      })
  }

  updateFBChildData({
    values,
    doc = this.auth.currentUser.uid,
    collection = 'users',
    childCollection,
    childDoc,
  } = {}) {
    const clone = { ...values }
    delete clone.id

    return this.db
      .collection(collection)
      .doc(doc)
      .collection(childCollection)
      .doc(childDoc)
      .update({
        ...clone,
        updatedAt: app.firestore.FieldValue.serverTimestamp(),
      })
  }

  addFBDoc = ({ collection = 'users', docData = {} } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(collection)
      .add({ ...docData, createdAt: app.firestore.FieldValue.serverTimestamp() })
      .then((res) => ({ data: res }))
      .catch((err) => err)
  }

  addFBDocToChildDoc = ({
    collection = 'users',
    parentDoc = this.auth.currentUser.uid,
    docData = {},
    endCollection,
  } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(collection)
      .doc(parentDoc)
      .collection(endCollection)
      .add({ ...docData, createdAt: app.firestore.FieldValue.serverTimestamp() })
  }

  setFBDoc = ({ parentCollection = 'users', doc, docData = {} } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(doc)
      .set({
        ...docData,
      })
      .then((res) => [null, res])
      .catch((err) => [err])
  }

  getFBData({ id, parentDoc, endCollection, parentCollection = 'users' } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(parentDoc || this.auth.currentUser.uid)
      .collection(endCollection)
      .doc(id)
  }

  getFBDoc = ({ parentCollection = 'users', doc } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    const colllectionDoc = doc ? doc : this.auth.currentUser.uid

    return this.db.collection(parentCollection).doc(colllectionDoc)
  }

  deleteFBDoc = ({ parentCollection, doc } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(doc)
      .delete()
      .then((res) => [null, res])
      .catch((err) => [err])
  }
  deleteFBDocChild = ({ parentCollection, doc, childCollection, childDoc } = {}) => {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(doc)
      .collection(childCollection)
      .doc(childDoc)
      .delete()
      .then((res) => [null, res])
      .catch((err) => [err])
  }

  updateFBDoc({ doc, docData, parentDoc, parentCollection = 'users' } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(parentDoc || this.auth.currentUser.uid)
      .update({
        [doc]: docData,
      })
  }

  updateMultipleFBDoc({
    docs = {},
    parentDoc,
    parentCollection = 'users',
  } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    return this.db
      .collection(parentCollection)
      .doc(parentDoc || this.auth.currentUser.uid)
      .update({
        ...docs,
      })
  }

  async deleteMultipleFBData({
    ids,
    endCollection,
    parentCollection = 'users',
  } = {}) {
    const [authError] = this.checkAuthorization()

    if (authError) {
      return [authError]
    }

    let batch = this.db.batch()
    if (ids && ids.length > 0) {
      ids.forEach((id) => {
        let dataRef = this.db
          .collection(parentCollection)
          .doc(`${this.auth.currentUser.uid}`)
          .collection(endCollection)
          .doc(id)
        batch.delete(dataRef)
      })
      batch.commit()
    }
  }
}
const TEMPORARY_AVATAR =
  'https://firebasestorage.googleapis.com/v0/b/elearn-13cae.appspot.com/o/default_profile_img.jpg?alt=media&token=03b38f16-5f4c-4763-a5f2-be2d76a652a7'

export const FirebaseService = new Firebase()
export default app
