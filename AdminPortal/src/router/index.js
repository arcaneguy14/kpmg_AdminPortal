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
//const Dashboard = () => import('@/views/Dashboard')
//const EventHome = () => import('@/views/EventHome')
const Featured = () => import('@/views/featured/Featured')
//const Navigation = () => import('@/views/navigation/Navigation')
const Insights = () => import('@/views/insights/Insights')
const Services = () => import('@/views/services/Services')
const Industries = () => import('@/views/industries/Industries')
const About = () => import('@/views/about/About')
const Career = () => import('@/views/career/Career')
//const CareerJobs = () => import('@/views/career/CareerJobs')
const Contact = () => import('@/views/contact/Contact')

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
      redirect: '/kpmg/users',
      beforeEnter: guard, // Using guard before entering the route
      component: kpmgContainer,
      children: [
        {
          path: 'users',
          name: 'Users',
          beforeEnter: guard, // Using guard before entering the route
          component: UsersMain
        },

        /*
        {
          path: 'dashboard',
          name: 'Dashboard',
          beforeEnter: guard, // Using guard before entering the route
          component: Dashboard
        },

        {
          path: 'navigation',
          name: 'Navigation',
          beforeEnter: guard, // Using guard before entering the route
          component: Navigation
        },
        */
        {
          path: 'featured',
          name: 'Featured',
          beforeEnter: guard,
          component: Featured
        },

        {
          path: 'insights',
          name: 'Insights',
          beforeEnter: guard,
          component: Insights
        },

        {
          path: 'services',
          name: 'Services',
          beforeEnter: guard,
          component: Services
        },

        {
          path: 'industries',
          name: 'Industries',
          beforeEnter: guard,
          component: Industries
        },

        {
          path: 'about',
          name: 'About',
          beforeEnter: guard,
          component: About
        },

        {
          path: 'career_articles',
          name: 'Career Article',
          beforeEnter: guard,
          component: Career
        },

        {
          path: 'contact',
          name: 'Contact',
          beforeEnter: guard,
          component: Contact
        },

        /*
        {
          path: 'career/career_jobs',
          name: 'CareerJobs',
          beforeEnter: guard,
          component: CareerJobs
        }
        */
      ]
    },
    /*
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
    */
  ]
})
