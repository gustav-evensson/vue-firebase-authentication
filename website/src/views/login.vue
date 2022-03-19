<template>
  <div class="loginPage">
    <div class="header">
      <h1>Welcome to my Vue-Firebase Auth project</h1>
    </div>
    <div class="main">
      <div class="icon">
        <svg width="80" height="100" viewBox="0 0 107 147" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M51.3446 22.1183L43.0481 37.7685L56.0585 63.0351L69.6346 50.2132L55.6814 22.1183C55.6814 22.1183 55.1216 21.2395 54.55 20.987C54.2066 20.8352 53.9825 20.8105 53.6073 20.7984C53.1596 20.784 52.8845 20.8033 52.4759 20.987C51.906 21.2432 51.3446 22.1183 51.3446 22.1183Z" fill="#00B594" stroke="#00B594"/>
          <path d="M19.6671 2.88558C19.1014 4.0169 1 116.397 1 116.397L43.0481 37.7685L24.5696 2.50846C24.5696 2.50846 23.8153 1.37711 23.2497 1.18857C22.684 1.00002 22.9627 0.999982 22.1183 1C21.7412 1.00001 20.987 1.37712 20.987 1.37712C20.987 1.37712 20.2328 1.75425 19.6671 2.88558Z" fill="#393E46" stroke="#393E46"/>
          <path d="M56.2471 62.8466L43.0481 37.7686L1 116.397L56.2471 62.8466Z" fill="#00957A" stroke="#00957A"/>
          <path d="M89.056 31.5461L1.1886 116.397L51.7218 145.623C51.7218 145.623 53.0417 146 53.4188 146C53.7959 146 54.1369 145.989 54.9272 145.811C55.6348 145.653 56.6242 145.057 56.6242 145.057L106.026 116.397L93.7699 33.4317C93.7699 33.4317 93.5316 32.4347 93.2042 31.9232C92.8941 31.4389 92.6385 31.169 92.2614 30.9805C91.7304 30.715 91.1539 30.7213 90.5644 30.7919C89.8443 30.8782 89.056 31.5461 89.056 31.5461Z" fill="#00FFB2" stroke="#00FFB2"/>
        </svg>
      </div>
      <h2 v-if="this.loggedUser" >{{loggedUser.email}}</h2>
      <form @submit.prevent="loginUser()">
          <p>Email</p>
          <input type="email" placeholder="Enter your email..." v-model="email">
          <p>Password</p>
          <input type="password" placeholder="Enter your password..." v-model="password">
          <button id="login" type="submit">Sign In</button>
          <a href="/register">register here</a>
      </form>
    </div>
    <div v-if="this.error" id="error">
      <p>{{errorMessage}}</p>
      <button @click="this.error = false">OK</button>
    </div>
    <div class="info">
      <p class="maintext">
        In this project I will show how to create an authentication system with Vue.js and Firebase. You will learn how to implement authentication on your website with firebase and also some neat features that firebase has to make your development experience. Please login or register an account to start!
      </p>
      <p class="sectext">
        Please note, the account you will create is not important and will unly be used as educational material on during this demonstration.
      </p>
    </div>
  </div>
</template>

<script>
import { app } from '../firebase/init.js'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth(app);

export default {
  name: 'Login',
  beforeCreate(){
    onAuthStateChanged(auth, (user) => {
      if(user){
        this.loggedUser = user
        this.$router.push('/')
      }
      else{
        this.loggedUser = null
      }
    })
  },
  data(){
    return{
      email: '',
      password: '',
      user: '',
      loggedUser: null,
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    loginUser(){
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.user = userCredential.user;
          console.log(this.user)
          this.$router.push('/') })
        .catch((error) => {
          console.log(error)
          if(error == 'FirebaseError: Firebase: Error (auth/invalid-email).'){
            this.error = true
            this.errorMessage = 'The email is invalid.'
            console.log("Email Invalid!")
          }
          else if(error == 'FirebaseError: Firebase: Error (auth/wrong-password).'){
            this.error = true
            this.errorMessage = 'The password is wrong.'
            console.log("Wrong Password!")
          }
          else if(error == 'FirebaseError: Firebase: Error (auth/user-not-found).'){
            this.error = true
            this.errorMessage = 'The email does not exists.'
            console.log("Wrong email!")
          }
        });
    }
  }
}
</script>