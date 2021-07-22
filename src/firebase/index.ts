import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8AnRXV3_u7C8mM9NHmPZ9qgksTxf82A8",
  authDomain: "ar-dashboard-9dcfa.firebaseapp.com",
  projectId: "ar-dashboard-9dcfa",
  storageBucket: "ar-dashboard-9dcfa.appspot.com",
  messagingSenderId: "1077945381092",
  appId: "1:1077945381092:web:296d21ab29ed3484dc3cf1",
  databaseURL:
    "https://ar-dashboard-9dcfa-default-rtdb.asia-southeast1.firebasedatabase.app",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const database = firebase.database();

export { storage, database, firebase as default };
