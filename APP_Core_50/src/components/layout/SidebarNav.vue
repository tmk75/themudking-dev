<template>
  <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
    <div class="sidebar-content glass">
      <!-- Navigation Items -->
      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="nav-item"
          :class="{ active: $route.name === item.name }"
          :data-tooltip="item.title"
        >
          <i :class="item.icon"></i>
          <span class="nav-text">{{ item.title }}</span>
        </router-link>
      </nav>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <button 
          class="action-btn"
          data-tooltip="新建评估"
          @click="createAssessment"
        >
          <i class="fas fa-plus"></i>
          <span class="nav-text">新建</span>
        </button>
        
        <button 
          class="action-btn"
          data-tooltip="导出报告"
          @click="exportReport"
        >
          <i class="fas fa-download"></i>
          <span class="nav-text">导出</span>
        </button>
      </div>

      <!-- Collapse Toggle -->
      <button class="collapse-btn" @click="toggleSidebar">
        <i class="fas fa-chevron-left" :class="{ rotated: sidebarCollapsed }"></i>
      </button>
    </div>
  </aside>
</template>

<script>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

export default {
  name: 'SidebarNav',
  setup() {
    const appStore = useAppStore()

    const navItems = [
      {
        name: 'Home',
        path: '/',
        title: '首页',
        icon: 'fas fa-home'
      },
      {
        name: 'Framework',
        path: '/framework',
        title: '框架概述',
        icon: 'fas fa-compass'
      },
      {
        name: 'Core50',
        path: '/core50',
        title: 'Core 50',
        icon: 'fas fa-bullseye'
      },
      {
        name: 'Dashboard',
        path: '/dashboard',
        title: '仪表盘',
        icon: 'fas fa-tachometer-alt'
      },
      {
        name: 'FiveB',
        path: '/5b',
        title: '5B框架',
        icon: 'fas fa-layer-group'
      },
      {
        name: 'NineGrid',
        path: '/9grid',
        title: '九宫格矩阵',
        icon: 'fas fa-th'
      },
      {
        name: 'Assessment',
        path: '/assessment',
        title: '评估中心',
        icon: 'fas fa-clipboard-check'
      },
      {
        name: 'Analytics',
        path: '/analytics',
        title: '数据分析',
        icon: 'fas fa-chart-line'
      },
      {
        name: 'Reports',
        path: '/reports',
        title: '报告中心',
        icon: 'fas fa-file-alt'
      },
      {
        name: 'Profile',
        path: '/profile',
        title: '个人档案',
        icon: 'fas fa-user'
      },
      {
        name: 'Settings',
        path: '/settings',
        title: '系统设置',
        icon: 'fas fa-cog'
      }
    ]

    const sidebarCollapsed = computed(() => appStore.sidebarCollapsed)

    const toggleSidebar = () => {
      appStore.toggleSidebar()
    }

    const createAssessment = () => {
      appStore.showToast('功能', '新建评估功能即将推出', 'info')
    }

    const exportReport = () => {
      appStore.showToast('功能', '报告导出功能即将推出', 'info')
    }

    return {
      navItems,
      sidebarCollapsed,
      toggleSidebar,
      createAssessment,
      exportReport
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
  width: 280px;
  height: calc(100vh - 140px);
  transition: all 0.3s ease;

  @media (max-width: 1024px) {
    left: -300px;
    
    &.show {
      left: 20px;
    }
  }

  &.collapsed {
    width: 80px;

    .nav-text {
      opacity: 0;
      transform: translateX(-10px);
    }

    .nav-item,
    .action-btn {
      justify-content: center;
      
      &::after {
        opacity: 1;
        visibility: visible;
      }
    }

    .quick-actions {
      padding: 15px 10px;
    }
  }
}

.sidebar-content {
  height: 100%;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  color: #666;
  text-decoration: none;
  border-radius: 15px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: #dd2525;
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    margin-left: 15px;
    z-index: 1000;
  }

  &:hover {
    color: #dd2525;
    background: rgba(221, 37, 37, 0.1);
    transform: translateX(5px);

    &::before {
      transform: scaleY(1);
    }
  }

  &.active {
    color: #dd2525;
    background: rgba(221, 37, 37, 0.15);
    box-shadow: 0 4px 15px rgba(221, 37, 37, 0.2);

    &::before {
      transform: scaleY(1);
    }
  }

  i {
    font-size: 18px;
    width: 20px;
    text-align: center;
    flex-shrink: 0;
  }

  .nav-text {
    transition: all 0.3s ease;
    white-space: nowrap;
  }
}

.quick-actions {
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 20px;
  background: rgba(221, 37, 37, 0.1);
  border: 1px solid rgba(221, 37, 37, 0.2);
  border-radius: 12px;
  color: #dd2525;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    margin-left: 15px;
    z-index: 1000;
  }

  &:hover {
    color: #dd2525;
    background: rgba(221, 37, 37, 0.15);
    border-color: rgba(221, 37, 37, 0.3);
    transform: translateY(-2px);
  }

  i {
    font-size: 16px;
    width: 18px;
    text-align: center;
    flex-shrink: 0;
  }

  .nav-text {
    transition: all 0.3s ease;
    white-space: nowrap;
  }
}

.collapse-btn {
  position: absolute;
  right: -15px;
  top: 30px;
  width: 30px;
  height: 30px;
  background: #dd2525;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(221, 37, 37, 0.3);

  &:hover {
    background: #b91c1c;
    transform: scale(1.1);
  }

  i {
    font-size: 12px;
    transition: transform 0.3s ease;

    &.rotated {
      transform: rotate(180deg);
    }
  }
}

// Mobile responsive
@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    left: -300px;
    top: 100px;
    transform: none;
    width: 280px;
    height: calc(100vh - 120px);
    z-index: 1001;

    &.show {
      left: 20px;
    }
  }

  .collapse-btn {
    display: none;
  }
}

@media (max-width: 768px) {
  .sidebar {
    left: -100%;
    top: 80px;
    width: calc(100vw - 40px);
    height: calc(100vh - 100px);

    &.show {
      left: 20px;
    }
  }
}
</style>