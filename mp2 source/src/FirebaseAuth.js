import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDHyHcU2uuHZ0FXgPs-NOZnn5grYKIEWsc",
  authDomain: "registration-form-5d14c.firebaseapp.com",
  databaseURL: "https://registration-form-5d14c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "registration-form-5d14c",
  storageBucket: "registration-form-5d14c.appspot.com",
  messagingSenderId: "107873486393",
  appId: "1:107873486393:web:3d03753c6b42f325796fe8",
  measurementId: "G-KHEHQS0VG8"
};


firebase.initializeApp(firebaseConfig);

export default firebase.auth();