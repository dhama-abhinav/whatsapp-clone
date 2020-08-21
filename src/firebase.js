import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBBJ9xGLFB77dUMUP517XtecZTIN75kgd0",
    authDomain: "whats-app-clone-7f94b.firebaseapp.com",
    databaseURL: "https://whats-app-clone-7f94b.firebaseio.com",
    projectId: "whats-app-clone-7f94b",
    storageBucket: "whats-app-clone-7f94b.appspot.com",
    messagingSenderId: "30370028747",
    appId: "1:30370028747:web:64d7cf3baca33a37e20f4e",
    measurementId: "G-SDXSJRLCSG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db= firebaseApp.firestore()

  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth ,provider }
  export default db