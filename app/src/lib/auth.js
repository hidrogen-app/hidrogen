import { EventEmitter } from 'events'
import { firebase } from './firebase'
import { User } from '../models/user'

class Auth extends EventEmitter {
  constructor () {
    super()
    this.currentUser = null
  }

  signIn = async (credentials, session) => {
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      const uuid = user.uid

      this.currentUser = await this.fetchUser(uuid)

      this.emit('auth-state-changed', this.currentUser)
      return Promise.resolve(this.currentUser)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  signUp = async (credentials) => {
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password.toString())
      const uuid = user.uid

      const createdDate = new Date().toString().split(' (')[0]

      const userData = {
        uid: uuid,
        username: credentials.username,
        email: credentials.email,
        pictureUrl: 'pictureUrl',
        games: [],
        settings: [],
        metadata: {
          createdOn: createdDate,
          lastSignInTime: createdDate
        }
      }

      this.currentUser = new User(userData)
      this.emit('auth-state-changed', this.currentUser)
      await firebase.database().ref(`users/${uuid}`).set(userData)
      return Promise.resolve(this.currentUser)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  signOut = async () => {
    firebase.auth().signOut()
      .then(() => {
        console.log('[auth] User signed out.')
        this.currentUser = null
        this.emit('auth-state-changed', this.currentUser)
      })
      .catch(err => {
        console.log('[auth] Something went wrong', err)
      })
  }

  getAuthedUser = () => {
    return this.currentUser
  }

  fetchUser = async uuid => {
    try {
      const fetchedUserData = await firebase.database().ref(`users/${uuid}`).once('value')
      const user = new User(fetchedUserData.val())
      return Promise.resolve(user)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  onAuthStateChanged = callback => {
    this.on('auth-state-changed', callback)
  } 
}

export const auth = new Auth()