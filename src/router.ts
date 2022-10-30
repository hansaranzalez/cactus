import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/auth/Login.vue';
import Register from './views/auth/Registration.vue';
import Products from './views/products/Products.vue';
import Users from './views/users/Users.vue';
import Roles from './views/roles/Roles.vue';
import ShoppingSessions from './views/shoppingSessions/shoppingSessions.vue';

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/registration', component: Register },
  { path: '/products', component: Products, meta: { requiresAuth: true } },
  { path: '/users', component: Users, meta: { requiresAuth: true } },
  { path: '/shopping-sessions', component: ShoppingSessions, meta: { requiresAuth: true } },
  { path: '/roles', component: Roles, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const isUserAuthenticated = localStorage.getItem('cactus-token');
  let authrequired = false
  if (to && to.meta && to.meta.requiresAuth) authrequired = true
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
      router.push('/');
      return false
    } else {
      next()
    }
  }
});


export default router;