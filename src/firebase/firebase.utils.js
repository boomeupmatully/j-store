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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef =  firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj =>{
        console.log(obj);
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    await batch.commit();

}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    //console.log(transformedCollection);
   return transformedCollection.reduce((accumulator, collection) =>{
        
        accumulator[collection.title.toLowerCase()] = collection;
     
        return accumulator;
    }, {});
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
