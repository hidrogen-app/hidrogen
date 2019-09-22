import { firebase } from './firebase'
import { SignInStore } from './stores/sign-in-store'
import { User } from '../models/user'
import { log } from './log'

const signInStore = new SignInStore()

export const getAccountInfo = async uuid => {
  try {
    const rawAccountInfo = await firebase.database().ref(`users/${uuid}`).once('value')
    return Promise.resolve(rawAccountInfo.val())
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getCurrentUser = () => {
  return signInStore.get('user')
}

export const signIn = async (credentials, session) => {
  try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
    const uuid = user.uid
    const accountInfo = getAccountInfo(uuid)
    const signedInUser = new User(accountInfo)

    await signInStore.set('user', signedInUser)
    return Promise.resolve(signedInUser)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const signUp = async credentials => {
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password.toString())
    const uuid = user.uid
    const createdDate = new Date().toString().split(' (')[0]
    const accountInfo = {
      uid: uuid,
      username: credentials.username,
      email: credentials.email,
      pictureUrl: 'defaultPictureUrl',
      games: [],
      settings: [],
      metadata: {
        createdOn: createdDate,
        lastSignInTime: createdDate
      }
    }

    const signedUpUser = new User(accountInfo)

    await firebase.database().ref(`users/${uuid}`).set(accountInfo)
    await signInStore.set('user', signedUpUser)
    return Promise.resolve(signedUpUser)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const signOut = async () => {
  try {
    await firebase.auth().signOut()
    await signInStore.set('user', null)
    log.info('[Auth] User signed out successfully.')
    return Promise.resolve()
  } catch (err) {
    log.error(`[Auth] User couldn\`t be signed out. Something went wrong: ${err}`)
    return Promise.reject()
  }
}

export const isUserAuthenticated = () => {
  return Boolean(signInStore.get('user'))
}

export const onAuthStateChanged = callback => {
  signInStore.observe('user', callback)
}