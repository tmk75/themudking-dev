<template>
  <div 
    class="floating-tab-bar"
    :class="{ 
      collapsed: isCollapsed,
      'show-on-hover': !isCollapsed
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Collapse Toggle Button -->
    <button 
      class="collapse-toggle"
      @click="toggleCollapse"
      v-show="isCollapsed"
    >
      <i class="fas fa-compass spinning"></i>
    </button>
    
    <div class="tab-bar-content" v-show="!isCollapsed">
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
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'FloatingTabBar',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const appStore = useAppStore()
    
    // Collapse functionality
    const isCollapsed = ref(false)
    const collapseTimer = ref(null)
    const COLLAPSE_DELAY = 3000 // 3 seconds
    

    
    const tabs = [
      {
        name: 'Home',
        path: '/',
        icon: 'fas fa-home',
        tooltip: '首页'
      },
      {
        name: 'Framework',
        path: '/framework',
        icon: 'fas fa-compass',
        tooltip: '框架概述'
      },
      {
        name: 'Core50',
        path: '/core50',
        icon: 'fas fa-bullseye',
        tooltip: 'Core 50 关键岗位'
      },
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'fas fa-tachometer-alt',
        tooltip: '仪表盘'
      },
      {
        name: 'FiveB',
        path: '/5b',
        icon: 'fas fa-star',
        tooltip: '5B核心能力'
      },
      {
        name: 'NineGrid',
        path: '/9grid',
        icon: 'fas fa-th',
        tooltip: '九宫格人才矩阵'
      },
      {
        name: 'Assessment',
        path: '/assessment',
        icon: 'fas fa-clipboard-check',
        tooltip: '评估中心'
      },
      {
        name: 'Analytics',
        path: '/analytics',
        icon: 'fas fa-chart-line',
        tooltip: '数据分析'
      },
      {
        name: 'Reports',
        path: '/reports',
        icon: 'fas fa-file-alt',
        tooltip: '报告中心'
      }
    ]

    const activeTab = computed(() => {
      const currentRouteName = route.name
      const index = tabs.findIndex(tab => tab.name === currentRouteName)
      return index >= 0 ? index : -1
    })



    // Collapse functionality
    const startCollapseTimer = () => {
      clearTimeout(collapseTimer.value)
      collapseTimer.value = setTimeout(() => {
        isCollapsed.value = true
      }, COLLAPSE_DELAY)
    }

    const clearCollapseTimer = () => {
      clearTimeout(collapseTimer.value)
    }

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value
      clearCollapseTimer()
    }

    const handleMouseEnter = () => {
      clearCollapseTimer()
      if (isCollapsed.value) {
        isCollapsed.value = false
      }
    }

    const handleMouseLeave = () => {
      if (!isCollapsed.value) {
        isCollapsed.value = true
      }
    }

    // Load saved collapse state
    const loadCollapseState = () => {
      const saved = localStorage.getItem('floating-menu-collapsed')
      if (saved) {
        try {
          isCollapsed.value = JSON.parse(saved)
        } catch (e) {
          console.log('Failed to load saved collapse state')
        }
      }
      
      // Start collapse timer if not collapsed
      if (!isCollapsed.value) {
        startCollapseTimer()
      }
    }

    onMounted(() => {
      loadCollapseState()
    })

    onUnmounted(() => {
      clearCollapseTimer()
    })

    const switchTab = (index) => {
      const tab = tabs[index]
      if (tab) {
        router.push(tab.path).catch(err => {
          console.log('Navigation error:', err)
        })
      }
    }

    return {
      tabs,
      activeTab,
      isCollapsed,
      switchTab,
      toggleCollapse,
      handleMouseEnter,
      handleMouseLeave
    }
  }
}
</script>

<style lang="scss" scoped>
.floating-tab-bar {
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: 1000;
  opacity: 0.3;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover,
  &.show-on-hover:hover {
    opacity: 1;
  }
  
  &.collapsed {
    opacity: 0.7;
    
    &:hover {
      opacity: 1;
    }
    
    .tab-bar-content {
      transform: translateX(100%);
      opacity: 0;
      pointer-events: none;
    }
  }
  
  @media (min-width: 768px) {
    right: 16px;
    bottom: 16px;
    opacity: 0.2;
    gap: 10px;
    
    &.collapsed {
      opacity: 0.6;
    }
  }
  
  @media (min-width: 1024px) {
    right: 20px;
    bottom: 20px;
  }
}

.collapse-toggle {
  background: #dd2525;
  border: 1px solid #dd2525;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  font-size: 12px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    background: rgba(221, 37, 37, 0.9);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  .spinning {
    animation: spin 2s linear infinite;
  }
  
  @media (min-width: 768px) {
    width: 38px;
    height: 38px;
    font-size: 13px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
  
  @media (min-width: 1024px) {
    width: 40px;
    height: 40px;
    font-size: 14px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.tab-bar-content {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(221, 37, 37, 0.1);
  border-radius: 20px;
  padding: 16px 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 60px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: right center;
  
  @media (min-width: 768px) {
    border-radius: 22px;
    padding: 18px 13px;
    gap: 13px;
    width: 65px;
    box-shadow: 0 9px 36px rgba(0, 0, 0, 0.11);
  }
  
  @media (min-width: 1024px) {
    border-radius: 25px;
    padding: 20px 15px;
    gap: 15px;
    width: 70px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
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
  justify-content: center;
  padding: 10px;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 12px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  
  &::after {
    content: attr(data-tooltip);
    position: absolute;
    right: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 11px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 1001;
    pointer-events: none;
    
    @media (max-width: 767px) {
      display: none; // Hide tooltips on mobile
    }
  }

  &:hover {
    color: #dd2525;
    background: rgba(221, 37, 37, 0.08);
    border-color: rgba(221, 37, 37, 0.2);
    
    &::after {
      opacity: 1;
      visibility: visible;
    }
  }

  &.active {
    color: white;
    background: #dd2525;
    border-color: #dd2525;
    box-shadow: 0 3px 12px rgba(221, 37, 37, 0.3);
  }

  i {
    font-size: 16px;
    width: 18px;
    text-align: center;
  }
  
  @media (min-width: 768px) {
    padding: 11px;
    border-radius: 13px;
    font-size: 15px;
    
    &::after {
      right: calc(100% + 13px);
      padding: 7px 11px;
      border-radius: 7px;
      font-size: 11.5px;
    }
    
    &.active {
      box-shadow: 0 3.5px 13px rgba(221, 37, 37, 0.3);
    }
    
    i {
      font-size: 17px;
      width: 19px;
    }
  }
  
  @media (min-width: 1024px) {
    padding: 12px;
    border-radius: 15px;
    font-size: 16px;
    
    &::after {
      right: calc(100% + 15px);
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 12px;
    }
    
    &.active {
      box-shadow: 0 4px 15px rgba(221, 37, 37, 0.3);
    }
    
    i {
      font-size: 18px;
      width: 20px;
    }
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .floating-tab-bar {
    right: 15px;
  }
}

@media (max-width: 768px) {
  .floating-tab-bar {
    right: 10px;
  }

  .collapse-toggle {
    width: 35px;
    height: 35px;
    font-size: 12px;
  }

  .tab-bar-content {
    padding: 15px 12px;
    width: 60px;
  }

  .tab-button {
    padding: 10px;
    font-size: 14px;

    i {
      font-size: 16px;
    }
    
    &::after {
      display: none; // Hide tooltips on mobile
    }
  }
}

@media (max-width: 480px) {
  .floating-tab-bar {
    right: 8px;
  }

  .collapse-toggle {
    width: 32px;
    height: 32px;
    font-size: 11px;
  }

  .tab-bar-content {
    width: 55px;
  }

  .tab-button {
    padding: 8px;
  }
}
</style>