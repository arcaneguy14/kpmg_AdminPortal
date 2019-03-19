import Vue from 'vue'
import Router from 'vue-router'

// Containers
const kpmgContainer = () => import('@/containers/kpmgContainer')
const eventContainer = () => import('@/containers/eventContainer')

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
      path: '/kpmg',
      name: 'Kpmg Mode Home',
      component: kpmgContainer,
      children: [
        {
          path: 'users',
          name: 'Users',
          component: UsersMain
        }
      ]
    },
    {
      path: '/event',
      name: 'Event Mode Home',
      component: eventContainer,
      children: [

      ]
    }
  ]
})
