import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCRvIQkGFGYHKkxgbv7VxM2e0T2V-UrC3Q",
  authDomain: "crwn-db-7dbd7.firebaseapp.com",
  databaseURL: "https://crwn-db-7dbd7.firebaseio.com",
  projectId: "crwn-db-7dbd7",
  storageBucket: "crwn-db-7dbd7.appspot.com",
  messagingSenderId: "653673250658",
  appId: "1:653673250658:web:58a05889ee1954cfacf63b",
  measurementId: "G-Y9T5YVRMB3"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

