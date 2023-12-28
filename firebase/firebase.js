import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';




const firebaseConfig = {
  apiKey: "AIzaSyAFhKxhhdVoHAwcYB_ckOpHoFDcfzFeOwg",
  authDomain: "cafe-33cc9.firebaseapp.com",
  projectId: "cafe-33cc9",
  storageBucket: "cafe-33cc9.appspot.com",
  messagingSenderId: "1086326276116",
  appId: "1:1086326276116:web:246cefa7dd612610dae701",
  measurementId: "G-4VXY3MRPJS"
};

// Initialize the Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get the Firebase authentication instance
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firebase Authentication functions

async function resetPass(email){
  await sendPasswordResetEmail(auth,email)
}

// Auto-login function
const autoLogin = (navigation) => {
  let bool = false
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, navigate to the main screen
      navigation.navigate("Main");
    
      bool = true
    } else {
      bool = false
    }
    // Unsubscribe to avoid memory leaks
    unsubscribe();
  });
  return bool
};

const LogOut = (navigation) => {
  signOut(auth)
  navigation?.navigate('Splash')
}

const getUser = () => {
  return auth.currentUser;
};


export { signInWithEmailAndPassword,sendEmailVerification,updateProfile,auth, signOut, autoLogin,resetPass, LogOut,getUser,createUserWithEmailAndPassword };
