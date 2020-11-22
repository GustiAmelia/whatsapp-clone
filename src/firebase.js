import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBIGjRoS6jaei90aK6uAAoDY9qk8OMOPds",
  authDomain: "whatsapp-clone-405a3.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-405a3.firebaseio.com",
  projectId: "whatsapp-clone-405a3",
  storageBucket: "whatsapp-clone-405a3.appspot.com",
  messagingSenderId: "291458977477",
  appId: "1:291458977477:web:5d6a2c9305285934686aac",
  measurementId: "G-Y3L5F7MDKD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth =firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db;