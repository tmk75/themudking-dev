import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'Home',
      transition: 'fade'
    }
  },
  {
    path: '/framework',
    name: 'Framework',
    component: () => import('@/views/Framework.vue'),
    meta: {
      title: 'Framework',
      transition: 'slide-left'
    }
  },
  {
    path: '/core50',
    name: 'Core50',
    component: () => import('@/views/Core50.vue'),
    meta: {
      title: 'Core 50',
      transition: 'slide-left'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: '仪表盘',
      transition: 'slide-up'
    }
  },
  {
    path: '/5b',
    name: 'FiveB',
    component: () => import('@/views/FiveB.vue'),
    meta: {
      title: '5B Framework',
      transition: 'slide-left'
    }
  },
  {
    path: '/9grid',
    name: 'NineGrid',
    component: () => import('@/views/NineGrid.vue'),
    meta: {
      title: '九宫格人才矩阵',
      transition: 'slide-left'
    }
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('@/views/Analytics.vue'),
    meta: {
      title: 'Analytics',
      transition: 'slide-left'
    }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/Reports.vue'),
    meta: {
      title: 'Reports',
      transition: 'slide-up'
    }
  },
  {
    path: '/assessment',
    name: 'Assessment',
    component: () => import('@/views/Assessment.vue'),
    meta: {
      title: 'Assessment',
      transition: 'slide-left'
    }
  },
  {
    path: '/profile/:id?',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: 'Profile',
      transition: 'fade'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: 'Settings',
      transition: 'slide-up'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  
  // Update page title
  document.title = `${to.meta.title} - Global Talents Management`
  
  // Set loading state
  appStore.setLoading(true)
  
  next()
})

router.afterEach(() => {
  const appStore = useAppStore()
  
  // Remove loading state after a short delay
  setTimeout(() => {
    appStore.setLoading(false)
  }, 300)
})

export default router