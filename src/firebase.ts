import * as firebase from 'firebase/app'
import * as storeFb from 'firebase/firestore'
import * as authFb from 'firebase/auth'
import * as storageFb from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDW-DpXxeYxrqNfQHPeH_WvBc04VnnwOQk",
    authDomain: "cactus-660cc.firebaseapp.com",
    projectId: "cactus-660cc",
    storageBucket: "cactus-660cc.appspot.com",
    messagingSenderId: "424327318441",
    appId: "1:424327318441:web:5552dd10667a095036d2b8",
    measurementId: "G-1Z5BWL1Z5T"
}

firebase.initializeApp(firebaseConfig)
export const db = storeFb
export const auth = authFb
export const storage = storageFb