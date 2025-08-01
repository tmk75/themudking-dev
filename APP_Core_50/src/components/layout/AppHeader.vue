<template>
  <header class="app-header glass">
    <div class="header-content">
      <!-- Logo and Title -->
      <div class="header-left">
        <router-link to="/" class="logo">
          <i class="fas fa-compass"></i>
          <span>Global Talents Management</span>
        </router-link>
        <div class="breadcrumb">
          <span class="breadcrumb-item">{{ currentPageTitle }}</span>
        </div>
      </div>

      <!-- Navigation removed - using floating tab bar instead -->

      <!-- Right Side Actions -->
      <div class="header-right">
        <!-- Search -->
        <div class="search-box" :class="{ active: searchActive }">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索..."
            @focus="searchActive = true"
            @blur="searchActive = false"
          >
          <i class="fas fa-search"></i>
        </div>

        <!-- Notifications -->
        <div class="notification-dropdown" @click="toggleNotifications">
          <button class="notification-btn">
            <i class="fas fa-bell"></i>
            <span v-if="unreadCount > 0" class="notification-badge">{{ unreadCount }}</span>
          </button>
          
          <div v-if="showNotifications" class="notification-panel">
            <div class="notification-header">
              <h4>通知</h4>
              <button @click="clearAllNotifications" class="clear-btn">清空</button>
            </div>
            <div class="notification-list">
              <div 
                v-for="notification in notifications.slice(0, 5)" 
                :key="notification.id"
                class="notification-item"
                :class="{ unread: !notification.read }"
                @click="markAsRead(notification.id)"
              >
                <div class="notification-content">
                  <h5>{{ notification.title }}</h5>
                  <p>{{ notification.message }}</p>
                  <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
                </div>
              </div>
              <div v-if="notifications.length === 0" class="no-notifications">
                暂无通知
              </div>
            </div>
          </div>
        </div>

        <!-- User Menu -->
        <div class="user-dropdown" @click="toggleUserMenu">
          <div class="user-info-display">
            <div class="user-name">{{ currentUser?.name || '用户' }}</div>
            <div class="user-avatar">
              <img 
                :src="currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || '用户')}&background=dd2525&color=fff&size=128`" 
                :alt="currentUser?.name || '用户'"
                @error="handleAvatarError"
              >
              <div class="user-status online"></div>
            </div>
          </div>
          
          <div v-if="showUserMenu" class="user-panel">
            <div class="user-info">
              <h4>{{ currentUser?.name }}</h4>
              <p>{{ currentUser?.department }}</p>
            </div>
            <div class="user-actions">
              <router-link to="/profile" class="user-action">
                <i class="fas fa-user"></i> 个人资料
              </router-link>
              <router-link to="/settings" class="user-action">
                <i class="fas fa-cog"></i> 设置
              </router-link>
              <button @click="logout" class="user-action logout">
                <i class="fas fa-sign-out-alt"></i> 退出登录
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-menu-btn" @click="toggleSidebar">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'AppHeader',
  setup() {
    const route = useRoute()
    const appStore = useAppStore()
    
    const searchQuery = ref('')
    const searchActive = ref(false)
    const showNotifications = ref(false)
    const showUserMenu = ref(false)

    // Navigation links removed - using floating tab bar instead

    const currentPageTitle = computed(() => {
      return route.meta.title || '首页'
    })

    const currentUser = computed(() => appStore.currentUser)
    const notifications = computed(() => appStore.notifications)
    const unreadCount = computed(() => appStore.unreadCount)

    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value
      showUserMenu.value = false
    }

    const toggleUserMenu = () => {
      showUserMenu.value = !showUserMenu.value
      showNotifications.value = false
    }

    const toggleSidebar = () => {
      appStore.toggleSidebar()
    }

    const markAsRead = (id) => {
      appStore.markAsRead(id)
    }

    const clearAllNotifications = () => {
      appStore.clearAllNotifications()
      showNotifications.value = false
    }

    const logout = () => {
      // Implement logout logic
      appStore.showToast('系统', '已退出登录', 'success')
      showUserMenu.value = false
    }

    const handleAvatarError = (event) => {
      // Fallback to a default avatar if image fails to load
      event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.value?.name || '用户')}&background=dd2525&color=fff&size=128`
    }

    const formatTime = (timestamp) => {
      const now = new Date()
      const time = new Date(timestamp)
      const diff = now - time
      
      if (diff < 60000) return '刚刚'
      if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
      return `${Math.floor(diff / 86400000)}天前`
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-dropdown')) {
        showNotifications.value = false
      }
      if (!event.target.closest('.user-dropdown')) {
        showUserMenu.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      searchQuery,
      searchActive,
      showNotifications,
      showUserMenu,
      currentPageTitle,
      currentUser,
      notifications,
      unreadCount,
      toggleNotifications,
      toggleUserMenu,
      toggleSidebar,
      markAsRead,
      clearAllNotifications,
      logout,
      formatTime,
      handleAvatarError
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: calc(100% - 40px);
  max-width: 1400px;
  padding: 15px 30px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: calc(100% - 20px);
    padding: 15px 20px;
    top: 10px;
  }
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.8rem;
  font-weight: 800;
  color: #dd2525;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  i {
    font-size: 2rem;
  }

  span {
    @media (max-width: 480px) {
      display: none;
    }
  }
}

.breadcrumb {
  .breadcrumb-item {
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
  }
}

/* Navigation links removed - using floating tab bar instead */

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    display: none;
  }

  input {
    width: 200px;
    padding: 8px 40px 8px 15px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(221, 37, 37, 0.2);
    border-radius: 20px;
    color: #333;
    font-size: 14px;
    transition: all 0.3s ease;

    &::placeholder {
      color: #999;
    }

    &:focus {
      outline: none;
      background: white;
      border-color: #dd2525;
      width: 250px;
    }
  }

  i {
    position: absolute;
    right: 15px;
    color: #999;
    pointer-events: none;
  }
}

.notification-dropdown,
.user-dropdown {
  position: relative;
}

.notification-btn {
  position: relative;
  background: rgba(221, 37, 37, 0.1);
  border: 1px solid rgba(221, 37, 37, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dd2525;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(221, 37, 37, 0.2);
    transform: scale(1.1);
  }

  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #ff4757;
    color: white;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 16px;
    text-align: center;
  }
}

.notification-panel,
.user-panel {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1001;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  h4 {
    margin: 0;
    color: #333;
    font-size: 1.1rem;
  }

  .clear-btn {
    background: none;
    border: none;
    color: #666;
    font-size: 0.9rem;
    cursor: pointer;
    
    &:hover {
      color: #333;
    }
  }
}

.notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 15px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &.unread {
    background: rgba(102, 126, 234, 0.1);
    border-left: 3px solid #667eea;
  }

  &:last-child {
    border-bottom: none;
  }
}

.notification-content {
  h5 {
    margin: 0 0 5px 0;
    color: #333;
    font-size: 0.9rem;
    font-weight: 600;
  }

  p {
    margin: 0 0 5px 0;
    color: #666;
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .notification-time {
    color: #999;
    font-size: 0.75rem;
  }
}

.no-notifications {
  padding: 30px 20px;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}

.user-info-display {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 25px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(221, 37, 37, 0.1);
  }
}

.user-name {
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    display: none;
  }
}

.user-avatar {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(221, 37, 37, 0.3);
    transition: all 0.3s ease;
  }

  .user-info-display:hover & img {
    border-color: #dd2525;
    transform: scale(1.05);
  }

  .user-status {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;

    &.online {
      background: #28a745;
    }

    &.away {
      background: #ffc107;
    }

    &.offline {
      background: #6c757d;
    }
  }
}

.user-info {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  h4 {
    margin: 0 0 5px 0;
    color: #333;
    font-size: 1.1rem;
  }

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }
}

.user-actions {
  padding: 10px 0;
}

.user-action {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  &.logout {
    color: #ff4757;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(255, 71, 87, 0.1);
    }
  }

  i {
    width: 16px;
    text-align: center;
  }
}

.mobile-menu-btn {
  display: none;
  background: rgba(221, 37, 37, 0.1);
  border: 1px solid rgba(221, 37, 37, 0.2);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  color: #dd2525;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background: rgba(221, 37, 37, 0.2);
  }
}
</style>