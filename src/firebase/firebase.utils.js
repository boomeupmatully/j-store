import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDGW0EblG9LTz2k9Rx4rT0ZE5Qr3MSn3NQ",
    authDomain: "j-store-db.firebaseapp.com",
    databaseURL: "https://j-store-db.firebaseio.com",
    projectId: "j-store-db",
    storageBucket: "",
    messagingSenderId: "465620799136",
    appId: "1:465620799136:web:c91cfb74c2c99de3"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
