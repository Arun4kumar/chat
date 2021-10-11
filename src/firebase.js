import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDF7thnxL5VRoqW-YlmUf1warrGtyNCc-s",
    authDomain: "chat-feea2.firebaseapp.com",
    projectId: "chat-feea2",
    storageBucket: "chat-feea2.appspot.com",
    messagingSenderId: "518590336266",
    appId: "1:518590336266:web:46400c66d12e9b40d7bef3",
  })
  .auth();
