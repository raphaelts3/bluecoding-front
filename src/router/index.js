import Vue from 'vue'
import Router from 'vue-router'
import auth from '../auth'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    }
  ]
})
