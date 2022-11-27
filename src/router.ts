import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/auth/Login.vue';
import Register from './views/auth/Registration.vue';
import Products from './views/products/Products.vue';
import Product from './views/products/Product.vue';
import Users from './views/users/Users.vue';
import Roles from './views/roles/Roles.vue';
import RegistrationVerificationCode from './views/auth/RegistrationVerificationCode.vue';
import ShoppingSessions from './views/shoppingSessions/shoppingSessions.vue';
import authStore from './store/authStore';

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/registration', component: Register },
  { path: '/registration-verification', component: RegistrationVerificationCode },
  { path: '/products', component: Products, meta: { requiresAuth: true } },
  { path: '/product', component: Product, meta: { requiresAuth: true } },
  { path: '/users', component: Users, meta: { requiresAuth: true } },
  { path: '/shopping-sessions', component: ShoppingSessions, meta: { requiresAuth: true } },
  { path: '/roles', component: Roles, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {
  const isUserAuthenticated = localStorage.getItem('cactus-token') && localStorage.getItem('cactus-user');
  let authrequired = false
  if (to && to.meta && to.meta.requiresAuth) authrequired = true
  console.log('authrequired', authrequired)
  if (authrequired) {
    if (isUserAuthenticated) {
      if (to.name === 'login') {
        router.push('/');
        return false
      } else {
        next()
      }
    } else {
      if (to.name !== 'login') {

        router.push('/login');
        return false
      }
      next()
    }
  } else {
    if (isUserAuthenticated && to.name === 'login') {
      console.log('WHAAAAT!')
      router.push('/');
      return false
    } else {
      console.log('YESSS!')
      next()
    }
  }
});


export default router;