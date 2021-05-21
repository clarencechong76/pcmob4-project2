import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCC2Nu2LTI1GLdxEfmp-xM4fA_N3dWjVXA",
    authDomain: "pcmob4-project2.firebaseapp.com",
    projectId: "pcmob4-project2",
    storageBucket: "pcmob4-project2.appspot.com",
    messagingSenderId: "400330862734",
    appId: "1:400330862734:web:d0f05ea86852b5e27919df"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
