// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js')

// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: 'AIzaSyB4h-AaNW0hknjjWdIMgtnahx452InuN_0',
  authDomain: 'tustramitesvip-11c23.firebaseapp.com',
  projectId: 'tustramitesvip-11c23',
  storageBucket: 'tustramitesvip-11c23.appspot.com',
  messagingSenderId: '159376822610',
  appId: '1:159376822610:web:f73c3417c70d014dd36a8b',
  measurementId: 'G-7K46BLMG0H'
})

// eslint-disable-next-line no-undef
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image
  }
  self.registration.showNotification(notificationTitle, notificationOptions)
})
