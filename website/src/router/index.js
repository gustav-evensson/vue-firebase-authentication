import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { app } from '../firebase/init.js'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const auth = getAuth(app)

function getUser(){
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

router.beforeEach(async (to, from, next) => {
  let isAuth = await getUser()
  const reqAuth = to.matched.some(record => record.meta.requiresAuth)
  if(reqAuth && !isAuth){
    console.log("No User logged in!")
    next("/login")
  }
  else{
    next()
  }
  
})

export default router
