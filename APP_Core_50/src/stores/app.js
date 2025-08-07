import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const isLoading = ref(false)
  const sidebarCollapsed = ref(false)
  const currentUser = ref(null)
  const notifications = ref([])
  const modal = ref({
    show: false,
    title: '',
    content: '',
    type: 'info',
    actions: []
  })

  // Getters
  const hasNotifications = computed(() => notifications.value.length > 0)
  const unreadCount = computed(() => 
    notifications.value.filter(n => !n.read).length
  )

  // Actions
  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  const addNotification = (notification) => {
    const id = Date.now()
    notifications.value.unshift({
      id,
      read: false,
      timestamp: new Date(),
      ...notification
    })
    
    // Auto remove after 5 seconds if it's a toast
    if (notification.type === 'toast') {
      setTimeout(() => {
        removeNotification(id)
      }, 5000)
    }
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  const clearAllNotifications = () => {
    notifications.value = []
  }

  const showModal = (options) => {
    modal.value = {
      show: true,
      title: options.title || '',
      content: options.content || '',
      type: options.type || 'info',
      actions: options.actions || []
    }
  }

  const hideModal = () => {
    modal.value.show = false
  }

  const showToast = (title, message, type = 'info') => {
    addNotification({
      type: 'toast',
      title,
      message,
      variant: type
    })
  }

  const initialize = async () => {
    try {
      // Simulate API calls for initialization
      await Promise.all([
        loadUserProfile(),
        loadSystemSettings(),
        loadInitialData()
      ])
    } catch (error) {
      console.error('App initialization failed:', error)
      showToast('系统错误', '应用初始化失败，请刷新页面重试', 'error')
    }
  }

  const loadUserProfile = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    currentUser.value = {
      id: 1,
      name: 'Carol Wen',
      email: 'carol.wen@company.com',
      role: 'manager',
      avatar: 'https://ui-avatars.com/api/?name=Carol+Wen&background=dd2525&color=fff&size=128',
      department: '人力资源部'
    }
  }

  const loadSystemSettings = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    // Load system settings
  }

  const loadInitialData = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400))
    
    // Add some sample notifications
    addNotification({
      title: '系统通知',
      message: '欢迎使用全球人才管理系统',
      type: 'info'
    })
    
    addNotification({
      title: '评估提醒',
      message: '您有3个待完成的评估任务',
      type: 'warning'
    })
  }

  return {
    // State
    isLoading,
    sidebarCollapsed,
    currentUser,
    notifications,
    modal,
    
    // Getters
    hasNotifications,
    unreadCount,
    
    // Actions
    setLoading,
    toggleSidebar,
    addNotification,
    removeNotification,
    markAsRead,
    clearAllNotifications,
    showModal,
    hideModal,
    showToast,
    initialize
  }
})