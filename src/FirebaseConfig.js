import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAL1H3iIvS3-mra_zPVd7IjWtI7ep9ZuIk",
  authDomain: "chat-app-7578d.firebaseapp.com",
  databaseURL: "https://chat-app-7578d.firebaseio.com",
  projectId: "chat-app-7578d",
  storageBucket: "chat-app-7578d.appspot.com",
  messagingSenderId: "625356030030",
  appId: "1:625356030030:web:f95b3805761bc3c777831f",
  measurementId: "G-QPSCM27GN3"
};

let Firebase = firebase.initializeApp(firebaseConfig);

export default firebase

