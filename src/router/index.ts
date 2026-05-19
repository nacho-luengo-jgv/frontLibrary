import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import AdminBooks from '../views/admin/AdminBooks.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'
import AdminUsers from '../views/admin/AdminUsers.vue'
import LoginBiblio from '../views/LoginBiblio.vue'
import UserLayout from "@/views/user/UserLayout.vue";
import UserBookHave from "@/views/user/UserBookHave.vue"
import UserBookDis from "@/views/user/UserBooksDis.vue"
import notFound from '../views/notFound.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, role: 'admin' },
      children: [
        {
          path: 'books',
          component: AdminBooks,
        },
        {
          path: 'users',
          component: AdminUsers,
        }
      ]
    },
    {
      path: '/login',
      component: LoginBiblio,
      meta: { hideLayout: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: notFound,
    },
    {
      path: '/user',
      component: UserLayout,
      meta: { requiresAuth: true, role: 'user' },
      children:[
        {
          path: 'prest',
          component: UserBookHave
        },
        {
          path: 'disp',
          component: UserBookDis
        }
      ]
    }
  ],
})


router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }
  if (to.meta.role && auth.role !== to.meta.role) {
    return next({ name: 'NotFound' })
  }
  next()
})

export default router
