import { firebase, signInWithFirebase } from './firebase'
import { appState } from './app-store'

const getAccountInfo = async uuid => {
  try {
    const userAccountInfo = await firebase.database().ref(`users/${uuid}`).once('value')
    return Promise.resolve(userAccountInfo.val())
  } catch (err) {
    return Promise.reject(err)
  }
}

export const signIn = async (credentials, persistence) => {
  try {
    const uuid = await signInWithFirebase(credentials)
    const user = await getAccountInfo(uuid)
    appState.setState({ user })
    console.log(`%c[auth] Signed in successfully! Got this user account from database:\n ${JSON.stringify(user)}`, 'background: #222; color: #bada55')
    return Promise.resolve(user)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const signUp = async credentials => {
  try {
    const uuid = await signUpWithFirebase(credentials)
    const user = {
      uuid: uuid,
      name: credentials.name,
      email: credentials.email,
      pictureUrl: 'https://firebasestorage.googleapis.com/v0/b/hidrogen-ea5fc.appspot.com/o/users%2FAFQbbDHAhKPXHqpi8jZxSXXQqoI3%2FprofilePicture?alt=media&token=de478a07-4873-45ae-b769-6dbf59589290',
      games: []
    }
    console.log(`%c[auth] User has signed up successfully! \n ${JSON.stringify(user)}`, 'background: #222; color: #bada55')

    appState.setState({ user })
    await firebase.database().ref(`users/${uuid}`).set(user)
    return Promise.resolve(user)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const signOut = async () => {
  try {
    await firebase.auth().signOut()
    console.log(`%c[auth] User has signed out successfully!`, 'background: #222; color: #bada55')
    appState.setState({ user: null })
    return Promise.resolve()
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}