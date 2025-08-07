<template>
  <div class="mobile-nav-button">
    <!-- Central Navigation Button -->
    <button 
      class="nav-toggle-btn"
      @click="toggleNavMenu"
      :class="{ active: showNavMenu }"
    >
      <div class="nav-icon">
        <i class="fas fa-compass" v-if="!showNavMenu"></i>
        <i class="fas fa-times" v-else></i>
      </div>
      <span class="nav-label">菜单</span>
    </button>

    <!-- Navigation Menu Overlay -->
    <div 
      v-if="showNavMenu" 
      class="nav-overlay"
      @click="closeNavMenu"
    >
      <div class="nav-menu" @click.stop>
        <!-- User Info Section -->
        <div class="nav-user-section">
          <div class="user-avatar">
            <img 
              :src="currentUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.name || 'User')}&background=dd2525&color=fff&size=64`" 
              :alt="currentUser?.name || 'User'"
              @error="handleAvatarError"
            >
            <div class="user-status online"></div>
          </div>
          <div class="user-info">
            <div class="user-name">{{ currentUser?.name || '用户' }}</div>
            <div class="user-role">{{ currentUser?.department || '团队成员' }}</div>
          </div>
        </div>

        <!-- Navigation Pages -->
        <div class="nav-pages">
          <h3 class="nav-section-title">页面导航</h3>
          <div class="nav-grid">
            <router-link
              v-for="(page, index) in navigationPages"
              :key="index"
              :to="page.path"
              class="nav-page-item"
              :class="{ active: isCurrentPage(page.path) }"
              @click="navigateToPage(page)"
            >
              <div class="page-icon">
                <i :class="page.icon"></i>
              </div>
              <div class="page-info">
                <div class="page-title">{{ page.title }}</div>
                <div class="page-description">{{ page.description }}</div>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="nav-actions">
          <h3 class="nav-section-title">快速操作</h3>
          <div class="action-buttons">
            <button class="action-btn" @click="showNotifications">
              <i class="fas fa-bell"></i>
              <span>通知</span>
              <div v-if="unreadCount > 0" class="action-badge">{{ unreadCount }}</div>
            </button>
            <button class="action-btn" @click="showSettings">
              <i class="fas fa-cog"></i>
              <span>设置</span>
            </button>
            <button class="action-btn" @click="showProfile">
              <i class="fas fa-user"></i>
              <span>个人资料</span>
            </button>
            <button class="action-btn logout-btn" @click="logout">
              <i class="fas fa-sign-out-alt"></i>
              <span>退出登录</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'MobileNavButton',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const appStore = useAppStore()
    
    const showNavMenu = ref(false)

    const navigationPages = [
      {
        title: '首页',
        description: '欢迎页面',
        path: '/',
        icon: 'fas fa-home'
      },
      {
        title: '框架概述',
        description: '人才管理框架',
        path: '/framework',
        icon: 'fas fa-compass'
      },
      {
        title: 'Core 50',
        description: '关键岗位',
        path: '/core50',
        icon: 'fas fa-bullseye'
      },
      {
        title: '仪表盘',
        description: '数据概览',
        path: '/dashboard',
        icon: 'fas fa-tachometer-alt'
      },
      {
        title: '5B核心能力',
        description: '能力评估',
        path: '/5b',
        icon: 'fas fa-star'
      },
      {
        title: '九宫格',
        description: '人才矩阵',
        path: '/9grid',
        icon: 'fas fa-th'
      },
      {
        title: '评估中心',
        description: '能力评估',
        path: '/assessment',
        icon: 'fas fa-clipboard-check'
      },
      {
        title: '数据分析',
        description: '分析报告',
        path: '/analytics',
        icon: 'fas fa-chart-line'
      },
      {
        title: '报告中心',
        description: '生成报告',
        path: '/reports',
        icon: 'fas fa-file-alt'
      }
    ]

    const currentUser = computed(() => appStore.currentUser)
    const unreadCount = computed(() => appStore.unreadCount)

    const toggleNavMenu = () => {
      showNavMenu.value = !showNavMenu.value
    }

    const closeNavMenu = () => {
      showNavMenu.value = false
    }

    const isCurrentPage = (path) => {
      return route.path === path
    }

    const navigateToPage = (page) => {
      router.push(page.path)
      closeNavMenu()
    }

    const showNotifications = () => {
      appStore.showToast('通知', '通知功能开发中', 'info')
      closeNavMenu()
    }

    const showSettings = () => {
      router.push('/settings')
      closeNavMenu()
    }

    const showProfile = () => {
      router.push('/profile')
      closeNavMenu()
    }

    const logout = () => {
      appStore.showToast('系统', '已成功退出登录', 'success')
      closeNavMenu()
    }

    const handleAvatarError = (event) => {
      event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.value?.name || 'User')}&background=dd2525&color=fff&size=64`
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && showNavMenu.value) {
        closeNavMenu()
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleEscapeKey)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscapeKey)
    })

    return {
      showNavMenu,
      navigationPages,
      currentUser,
      unreadCount,
      toggleNavMenu,
      closeNavMenu,
      isCurrentPage,
      navigateToPage,
      showNotifications,
      showSettings,
      showProfile,
      logout,
      handleAvatarError
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-nav-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 2000;
}

.nav-toggle-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(221, 37, 37, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 1);
    border-color: rgba(221, 37, 37, 0.4);
    transform: scale(1.05);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }

  &.active {
    background: #dd2525;
    border-color: #dd2525;
    
    .nav-icon {
      color: white;
    }
    
    .nav-label {
      color: white;
    }
  }

  .nav-icon {
    color: #dd2525;
    font-size: 20px;
    margin-bottom: 2px;
    transition: all 0.3s ease;

    i {
      transition: transform 0.3s ease;
    }
  }

  .nav-label {
    color: #dd2525;
    font-size: 8px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
  }
}

.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1999;
  animation: fadeIn 0.3s ease-out;
}

.nav-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: #FFFFFF;
  overflow-y: auto;
  animation: slideInLeft 0.3s ease-out;
  padding: 20px;
  padding-top: max(env(safe-area-inset-top, 0), 20px);
  padding-bottom: max(env(safe-area-inset-bottom, 0), 20px);
}

.nav-user-section {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;

  .user-avatar {
    position: relative;
    width: 50px;
    height: 50px;
    margin-right: 15px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(221, 37, 37, 0.3);
    }

    .user-status {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      background: #28a745;
      border: 2px solid white;
      border-radius: 50%;
    }
  }

  .user-info {
    flex: 1;

    .user-name {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-bottom: 2px;
    }

    .user-role {
      font-size: 13px;
      color: #666;
    }
  }
}

.nav-pages {
  margin-bottom: 30px;
}

.nav-section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.nav-grid {
  display: grid;
  gap: 8px;
}

.nav-page-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 12px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    background: #e9ecef;
    transform: translateX(4px);
  }

  &.active {
    background: rgba(221, 37, 37, 0.1);
    border-color: rgba(221, 37, 37, 0.3);
    color: #dd2525;

    .page-icon {
      color: #dd2525;
    }
  }

  .page-icon {
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    color: #666;
    font-size: 16px;
    transition: all 0.3s ease;
  }

  .page-info {
    flex: 1;

    .page-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 2px;
    }

    .page-description {
      font-size: 12px;
      color: #666;
    }
  }
}

.nav-actions {
  .action-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .action-btn {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 12px;
    background: #f8f9fa;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #333;

    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
    }

    &.logout-btn {
      grid-column: span 2;
      background: rgba(255, 71, 87, 0.1);
      color: #ff4757;

      &:hover {
        background: rgba(255, 71, 87, 0.2);
      }
    }

    i {
      font-size: 18px;
      margin-bottom: 6px;
    }

    span {
      font-size: 12px;
      font-weight: 500;
    }

    .action-badge {
      position: absolute;
      top: 8px;
      right: 8px;
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
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

// Larger screens adaptation
@media (min-width: 768px) {
  .nav-menu {
    max-width: 350px;
  }
  
  .nav-toggle-btn {
    width: 65px;
    height: 65px;
    
    .nav-icon {
      font-size: 22px;
    }
    
    .nav-label {
      font-size: 9px;
    }
  }
}

// iPhone safe area adjustments
@media screen and (max-width: 430px) {
  .mobile-nav-button {
    top: max(env(safe-area-inset-top, 0), 16px);
    left: 16px;
  }
  
  .nav-toggle-btn {
    width: 56px;
    height: 56px;
    
    .nav-icon {
      font-size: 18px;
    }
    
    .nav-label {
      font-size: 7px;
    }
  }
}
</style>