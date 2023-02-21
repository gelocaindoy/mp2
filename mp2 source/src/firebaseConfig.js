import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';


    const firebaseConfig = {
//secret api 
    };

    firebase.initializeApp(firebaseConfig);

    export default firebase;
