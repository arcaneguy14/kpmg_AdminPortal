import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views - Main Login
const Login = () => import('@/views/login/Login')

// Users Management
const UsersMain = () => import('@/views/users/UsersMain')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'users',
          name: 'Users',
          component: UsersMain
        }
      ]
    }
  ]
})
