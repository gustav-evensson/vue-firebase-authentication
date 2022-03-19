import { initializeApp } from "@firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAMm_coWMq4kKnumJ6_tYuXx9OUqyThtN8",
    authDomain: "fir-auth-project-5b133.firebaseapp.com",
    projectId: "fir-auth-project-5b133",
    storageBucket: "fir-auth-project-5b133.appspot.com",
    messagingSenderId: "190645565523",
    appId: "1:190645565523:web:c8d6e34850b57575b62ea6",
    measurementId: "G-1R38W75QVV"
  };

const app = initializeApp(firebaseConfig)


export { app }