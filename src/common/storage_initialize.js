// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA3nRztpF-TE-_BhQN2csKJ-_H76CFXoqg',
  authDomain: 'thaihoaaquarium-cb53f.firebaseapp.com',
  projectId: 'thaihoaaquarium-cb53f',
  storageBucket: 'thaihoaaquarium-cb53f.appspot.com',
  messagingSenderId: '866597925034',
  appId: '1:866597925034:web:daa7239e4b89eeccc9a0d3',
  measurementId: 'G-CS2XHC9MQQ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export { app, analytics }
