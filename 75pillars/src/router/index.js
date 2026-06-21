import { createRouter, createWebHistory } from 'vue-router'
import AppEmbed from '../views/AppEmbed.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: '75 Pillars' },
  },
  {
    path: '/app',
    name: 'app',
    component: AppEmbed,
    meta: { title: '75 Pillars Platform' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 84,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || '75 Pillars'
})

export default router
