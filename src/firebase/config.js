import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyB4h-AaNW0hknjjWdIMgtnahx452InuN_0',
  authDomain: 'tustramitesvip-11c23.firebaseapp.com',
  projectId: 'tustramitesvip-11c23',
  storageBucket: 'tustramitesvip-11c23.appspot.com',
  messagingSenderId: '159376822610',
  appId: '1:159376822610:web:f73c3417c70d014dd36a8b',
  measurementId: 'G-7K46BLMG0H'
}

const app = initializeApp(firebaseConfig)

export const messaging = getMessaging(app)
