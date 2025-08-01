import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      transition: 'fade'
    }
  },
  {
    path: '/framework',
    name: 'Framework',
    component: () => import('@/views/Framework.vue'),
    meta: {
      title: '框架概述',
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
    path: '/analytics',
    name: 'Analytics',
    component: () => import('@/views/Analytics.vue'),
    meta: {
      title: '数据分析',
      transition: 'slide-left'
    }
  },
  {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/Reports.vue'),
    meta: {
      title: '报告中心',
      transition: 'slide-up'
    }
  },
  {
    path: '/assessment',
    name: 'Assessment',
    component: () => import('@/views/Assessment.vue'),
    meta: {
      title: '评估中心',
      transition: 'slide-left'
    }
  },
  {
    path: '/profile/:id?',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: '个人档案',
      transition: 'fade'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: '系统设置',
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
  document.title = `${to.meta.title} - Core 50`
  
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