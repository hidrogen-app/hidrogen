import firebaseAPI from 'firebase'

const secrets = require('../../../secrets.json')

const config = {
  apiKey: secrets.firebase.apiKey,
  authDomain: secrets.firebase.authDomain,
  databaseURL: secrets.firebase.databaseURL,
  projectId: secrets.firebase.projectId,
  storageBucket: secrets.firebase.storageBucket,
  messagingSenderId: secrets.firebase.messagingSenderId
}

export const firebase = firebaseAPI.initializeApp(config)

export const signInWithFirebase = async ({ email, password }) => {
  try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password)
    return Promise.resolve(user.uid)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const signUpWithFirebase = async ({ email, password }) => {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password.toString())
    return Promise.resolve(user.uid)
  } catch (err) {
    return Promise.reject(err)
  }
}