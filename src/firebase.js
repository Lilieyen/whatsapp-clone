import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBuhGmIMFchL3rOQAmlkbOEIf-YBIB2zgY",
    authDomain: "whatsapp-clone-ac87a.firebaseapp.com",
    projectId: "whatsapp-clone-ac87a",
    storageBucket: "whatsapp-clone-ac87a.appspot.com",
    messagingSenderId: "458892443927",
    appId: "1:458892443927:web:fa082c67f63d11d6e27752",
    measurementId: "G-YR39C7Y8J0"
  };
  

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;