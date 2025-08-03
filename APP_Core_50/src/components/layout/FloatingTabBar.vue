<template>
  <div 
    class="floating-tab-bar"
    :class="{ 
      dragging: isDragging,
      collapsed: isCollapsed,
      'show-on-hover': !isCollapsed
    }"
    :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
    @mousedown="startDrag"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Collapse Toggle Button -->
    <button 
      class="collapse-toggle"
      @click="toggleCollapse"
      @mousedown.stop
    >
      <i :class="isCollapsed ? 'fas fa-chevron-left' : 'fas fa-chevron-right'"></i>
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
    
    // Drag functionality
    const isDragging = ref(false)
    const position = ref({ x: 0, y: 0 })
    const dragStart = ref({ x: 0, y: 0 })
    const initialPosition = ref({ x: 0, y: 0 })
    const hasMoved = ref(false)
    
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

    // Drag functionality
    const startDrag = (e) => {
      e.preventDefault()
      isDragging.value = true
      hasMoved.value = false
      
      dragStart.value = {
        x: e.clientX,
        y: e.clientY
      }
      
      initialPosition.value = {
        x: position.value.x,
        y: position.value.y
      }
      
      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', stopDrag)
    }

    const onDrag = (e) => {
      if (!isDragging.value) return
      
      const deltaX = e.clientX - dragStart.value.x
      const deltaY = e.clientY - dragStart.value.y
      
      // Mark as moved if dragged more than 5px
      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMoved.value = true
      }
      
      position.value = {
        x: initialPosition.value.x + deltaX,
        y: initialPosition.value.y + deltaY
      }
      
      // Keep within viewport bounds
      const padding = 30
      const maxX = window.innerWidth - padding
      const maxY = window.innerHeight - padding
      
      position.value.x = Math.max(-window.innerWidth + padding, Math.min(maxX, position.value.x))
      position.value.y = Math.max(-window.innerHeight + padding, Math.min(maxY, position.value.y))
    }

    const stopDrag = () => {
      isDragging.value = false
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', stopDrag)
      
      // Save position after drag
      if (hasMoved.value) {
        savePosition()
      }
    }

    // Collapse functionality
    const startCollapseTimer = () => {
      clearTimeout(collapseTimer.value)
      collapseTimer.value = setTimeout(() => {
        if (!isDragging.value) {
          isCollapsed.value = true
        }
      }, COLLAPSE_DELAY)
    }

    const clearCollapseTimer = () => {
      clearTimeout(collapseTimer.value)
    }

    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value
      clearCollapseTimer()
      
      // Save collapse state
      localStorage.setItem('floating-menu-collapsed', JSON.stringify(isCollapsed.value))
      
      // If expanding, start timer to collapse again
      if (!isCollapsed.value) {
        startCollapseTimer()
      }
    }

    const handleMouseEnter = () => {
      clearCollapseTimer()
      if (isCollapsed.value) {
        isCollapsed.value = false
      }
    }

    const handleMouseLeave = () => {
      if (!isCollapsed.value) {
        startCollapseTimer()
      }
    }

    // Load saved position from localStorage
    const loadPosition = () => {
      const saved = localStorage.getItem('floating-menu-position')
      if (saved) {
        try {
          position.value = JSON.parse(saved)
        } catch (e) {
          console.log('Failed to load saved position')
        }
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

    // Save position to localStorage
    const savePosition = () => {
      localStorage.setItem('floating-menu-position', JSON.stringify(position.value))
    }

    onMounted(() => {
      loadPosition()
      loadCollapseState()
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', stopDrag)
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
      isDragging,
      position,
      isCollapsed,
      switchTab,
      startDrag,
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
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  opacity: 0.2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: grab;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover,
  &.show-on-hover:hover {
    opacity: 1;
  }
  
  &.dragging {
    cursor: grabbing;
    opacity: 1;
  }
  
  &.collapsed {
    opacity: 0.6;
    
    &:hover {
      opacity: 1;
    }
    
    .tab-bar-content {
      transform: translateX(100%);
      opacity: 0;
      pointer-events: none;
    }
  }
}

.collapse-toggle {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(221, 37, 37, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: rgba(221, 37, 37, 0.1);
    color: #dd2525;
    border-color: rgba(221, 37, 37, 0.4);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.tab-bar-content {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(221, 37, 37, 0.1);
  border-radius: 25px;
  padding: 20px 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 70px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: right center;
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
  padding: 12px;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 15px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 16px;
  width: 100%;
  
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
    
    &::after {
      opacity: 1;
      visibility: visible;
    }
  }

  &.active {
    color: white;
    background: #dd2525;
    border-color: #dd2525;
    box-shadow: 0 4px 15px rgba(221, 37, 37, 0.3);
  }

  i {
    font-size: 18px;
    width: 20px;
    text-align: center;
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