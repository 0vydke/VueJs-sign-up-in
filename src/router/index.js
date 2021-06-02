import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginForm from '../components/LoginForm.vue'
import Dashboard from '../components/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {name: 'LoginForm'}
  },
  {
    path: '/LoginForm',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
]

const router = new VueRouter({
  routes
})

export default router
