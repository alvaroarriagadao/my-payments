import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCcHPzYuLv_BjFgp-6pE7VnItDl_LNnmbk",
    authDomain: "mispagoscloud.firebaseapp.com",
    projectId: "mispagoscloud",
    storageBucket: "mispagoscloud.firebasestorage.app",
    messagingSenderId: "118418899592",
    appId: "1:118418899592:web:4c1f9737dfa24159b5553d",
    measurementId: "G-Q6F0NKSZHP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };
