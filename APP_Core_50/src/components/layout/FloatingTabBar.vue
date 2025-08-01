<template>
  <div class="floating-tab-bar">
    <div class="tab-bar-content">
      <!-- Tab Buttons -->
      <div class="tab-buttons">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-button"
          :class="{ active: activeTab === index }"
          :data-tooltip="tab.tooltip"
          @click="switchTab(index)"
        >
          <i :class="tab.icon"></i>
          <!-- No labels - using tooltips only -->
        </button>
      </div>

      <!-- Quick Actions - Always visible, no expansion -->
      <div class="quick-actions">
        <div class="actions-divider"></div>
        <button class="action-button" data-tooltip="新建评估" @click="createNew">
          <i class="fas fa-plus"></i>
        </button>
        <button class="action-button" data-tooltip="导出数据" @click="exportData">
          <i class="fas fa-download"></i>
        </button>
        <button class="action-button" data-tooltip="设置" @click="openSettings">
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'FloatingTabBar',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const appStore = useAppStore()
    
    const tabs = [
      {
        name: 'Home',
        path: '/',
        icon: 'fas fa-home',
        label: '首页',
        tooltip: '首页'
      },
      {
        name: 'Framework',
        path: '/framework',
        icon: 'fas fa-compass',
        label: '框架',
        tooltip: '框架概述'
      },
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'fas fa-tachometer-alt',
        label: '仪表盘',
        tooltip: '仪表盘'
      },
      {
        name: 'Assessment',
        path: '/assessment',
        icon: 'fas fa-clipboard-check',
        label: '评估',
        tooltip: '评估中心'
      },
      {
        name: 'Analytics',
        path: '/analytics',
        icon: 'fas fa-chart-line',
        label: '分析',
        tooltip: '数据分析'
      },
      {
        name: 'Reports',
        path: '/reports',
        icon: 'fas fa-file-alt',
        label: '报告',
        tooltip: '报告中心'
      }
    ]

    const activeTab = computed(() => {
      const currentRouteName = route.name
      const index = tabs.findIndex(tab => tab.name === currentRouteName)
      return index >= 0 ? index : -1
    })

    // No need for hover state management since we're not expanding

    const switchTab = (index) => {
      const tab = tabs[index]
      if (tab) {
        router.push(tab.path).catch(err => {
          // Handle navigation errors gracefully
          console.log('Navigation error:', err)
        })
      }
    }

    const createNew = () => {
      appStore.showToast('功能', '新建评估功能即将推出', 'info')
    }

    const exportData = () => {
      appStore.showToast('导出', '数据导出功能即将推出', 'info')
    }

    const openSettings = () => {
      router.push('/settings')
    }

    // Debug logging
    console.log('FloatingTabBar mounted, current route:', route.name)
    console.log('Active tab index:', activeTab.value)

    return {
      tabs,
      activeTab,
      switchTab,
      createNew,
      exportData,
      openSettings
    }
  }
}
</script>

<style lang="scss" scoped>
.floating-tab-bar {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  opacity: 0.25;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  /* Ensure stable positioning */
  will-change: opacity;
  
  &:hover {
    opacity: 1; /* 0% transparent = fully opaque */
  }
}

.tab-bar-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(221, 37, 37, 0.1);
  border-radius: 25px;
  padding: 20px 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 70px; /* Fixed width - no expansion */
  min-height: fit-content; /* Ensure proper height calculation */
  position: relative;
  overflow: visible; /* Allow tooltips to show outside */



  /* Removed shimmer effect */


}

.tab-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.tab-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* Center the icon */
  padding: 12px;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 15px;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  overflow: visible; /* Allow tooltips to show */

  /* Removed red bar indicator */

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    right: calc(100% + 15px);
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 1001;
    pointer-events: none;
  }

  &:hover {
    color: #dd2525;
    background: rgba(221, 37, 37, 0.08);
    border-color: rgba(221, 37, 37, 0.2);
    /* Removed transform to prevent shaking */
  }

  &.active {
    color: white; /* White text on red background */
    background: #dd2525; /* Solid red background */
    border-color: #dd2525;
    box-shadow: 0 4px 15px rgba(221, 37, 37, 0.3);
  }

  // Show tooltip on hover
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }

  i {
    font-size: 18px;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
  }

  /* No tab labels - removed */
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  opacity: 1; /* Always visible */
  transform: translateY(0);
}

.actions-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(221, 37, 37, 0.2), transparent);
  margin: 10px 0;
}

.action-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* Center the icon */
  padding: 10px;
  background: rgba(221, 37, 37, 0.05);
  border: 1px solid rgba(221, 37, 37, 0.15);
  border-radius: 12px;
  color: #dd2525;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  font-weight: 500;
  width: 100%;
  overflow: visible; /* Allow tooltips to show */

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    right: calc(100% + 15px);
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 1001;
    pointer-events: none;
  }

  &:hover {
    background: rgba(221, 37, 37, 0.1);
    border-color: rgba(221, 37, 37, 0.25);
    /* Removed transform to prevent shaking */
    box-shadow: 0 2px 8px rgba(221, 37, 37, 0.15);

    &::after {
      opacity: 1;
      visibility: visible;
    }
  }

  i {
    font-size: 14px;
    text-align: center;
  }
}

/* Removed collapse indicator since we're not expanding */

// Responsive Design
@media (max-width: 1024px) {
  .floating-tab-bar {
    right: 15px;
  }

  /* No expansion on hover */
}

@media (max-width: 768px) {
  .floating-tab-bar {
    right: 10px;
    opacity: 0.15;

    &:hover {
      opacity: 1;
    }
  }

  .tab-bar-content {
    padding: 15px 12px;
  }

  /* No expansion on hover */

  .tab-button {
    padding: 10px;
    font-size: 14px;

    i {
      font-size: 16px;
    }

    /* No tab labels */
  }

  .action-button {
    padding: 8px 10px;
    font-size: 12px;

    i {
      font-size: 13px;
    }

    /* No action labels */
  }
}

@media (max-width: 480px) {
  .floating-tab-bar {
    right: 8px;
    opacity: 0.1;
  }

  /* No expansion on hover */

  .tab-button {
    padding: 8px;

    &::after {
      display: none; // Hide tooltips on very small screens
    }
  }
}

// Animation keyframes
/* Removed slideInRight animation to prevent positioning conflicts */

@keyframes pulse {
  0%, 100% {
    opacity: 0.25;
  }
  50% {
    opacity: 0.35;
  }
}

// Add subtle pulse animation when not hovered
.floating-tab-bar:not(:hover) {
  animation: pulse 3s ease-in-out infinite;
}

/* Removed shimmer effects to prevent positioning conflicts */
</style>