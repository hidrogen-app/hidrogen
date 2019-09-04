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