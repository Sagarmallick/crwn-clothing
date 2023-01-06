// Most apps need to know the identity of a user. Knowing a user's identity allows an app to securely save user data in the cloud and provide the same personalized experience across all of the user's devices.
// Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.

// Firebase Authentication integrates tightly with other Firebase services, and it leverages industry standards like OAuth 2.0 and OpenID Connect, so it can be easily integrated with your custom backend.


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {

  getAuth,

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword,

  //  signInWithRedirect,

  signInWithPopup,

  GoogleAuthProvider,
  signOut,

  onAuthStateChanged,

} from 'firebase/auth'

// Getfirestore for initialize firestore to store google auth data to database
// Doc for doc creation in firestore 
//getDoc for get data from the firestore database
//setDoc for get data from the firebase database

import { getFirestore,
   doc, 
   getDoc, 
   setDoc, 
   collection, 
   writeBatch ,
   query,
   getDocs,
  } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDexQKjMOwdknaBcLtRNr5RpTmDxKn9TeQ",
  authDomain: "crwn-db-d9494.firebaseapp.com",
  projectId: "crwn-db-d9494",
  storageBucket: "crwn-db-d9494.appspot.com",
  messagingSenderId: "66701112916",
  appId: "1:66701112916:web:0fe5001bede9e19c8fdfc1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Force the user to select an provider for google login. of example: login with google on email id  
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
})




export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field)=>{
const collectionRef = collection(db,collectionKey );
const batch = writeBatch(db);

objectsToAdd.forEach((object)=>{
  const docRef =doc(collectionRef,object.title.toLowerCase());
  batch.set(docRef, object);
});
await batch.commit();
console.log('done');
}

export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db, 'categories');
  const q= query(collectionRef);  
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items}= docSnapshot.data();
    acc[title.toLowerCase()] =items;
    return acc;
  },{});

  return categoryMap;

}


export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

