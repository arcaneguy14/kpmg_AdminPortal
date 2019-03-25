import Vue from 'vue'
import Router from 'vue-router'
import {wsutil} from '../assets/js/wsutil.js'

// Containers
const kpmgContainer = () => import('@/containers/kpmgContainer')
const eventContainer = () => import('@/containers/eventContainer')

// Views - Main Login
const Login = () => import('@/views/login/Login')

// Users Management
const UsersMain = () => import('@/views/users/UsersMain')

const Dashboard = () => import('@/views/Dashboard')

const EventHome = () => import('@/views/EventHome')


Vue.use(Router)

let entryUrl = null;

const guard = async (to, from, next) => {
  if (wsutil.getters.getJwt) {
    if (entryUrl) {
      const url = entryUrl;
      entryUrl = null;
      return next(url); // goto stored url
    } else {
      return next(); // all is fine
    }
  }

  if (wsutil.getters.getJwt) {
    next();
  } else {
    entryUrl = to.path; // store entry url before redirect
    next('/');
  }
};

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
      redirect: '/kpmg/dashboard',
      beforeEnter: guard, // Using guard before entering the route
      component: kpmgContainer,
      children: [
        {
          path: 'users',
          name: 'Users',
          beforeEnter: guard, // Using guard before entering the route
          component: UsersMain
        },

        {
          path: 'dashboard',
          name: 'Dashboard',
          beforeEnter: guard, // Using guard before entering the route
          component: Dashboard
        }
      ]
    },
    {
      path: '/event',
      name: 'Event Mode Home',
      component: eventContainer,
      children: [
        {
          path: 'event-home',
          name: 'Event Home',
          beforeEnter: guard, // Using guard before entering the route
          component: EventHome
        }
      ]
    }
  ]
})
