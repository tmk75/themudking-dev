<template>
  <div class="toast-container">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="[toast.variant, { show: toast.show }]"
      >
        <div class="toast-header">
          <div class="toast-icon">
            <i :class="getToastIcon(toast.variant)"></i>
          </div>
          <div class="toast-content">
            <h4 class="toast-title">{{ toast.title }}</h4>
            <p class="toast-message">{{ toast.message }}</p>
          </div>
          <button class="toast-close" @click="removeToast(toast.id)">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="toast-progress">
          <div 
            class="progress-bar" 
            :style="{ width: toast.progress + '%' }"
          ></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

export default {
  name: 'ToastContainer',
  setup() {
    const appStore = useAppStore()
    const toasts = ref([])

    const notifications = computed(() => 
      appStore.notifications.filter(n => n.type === 'toast')
    )

    const getToastIcon = (variant) => {
      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
      }
      return icons[variant] || icons.info
    }

    const removeToast = (id) => {
      const toast = toasts.value.find(t => t.id === id)
      if (toast) {
        toast.show = false
        setTimeout(() => {
          const index = toasts.value.findIndex(t => t.id === id)
          if (index > -1) {
            toasts.value.splice(index, 1)
          }
          appStore.removeNotification(id)
        }, 300)
      }
    }

    const addToast = (notification) => {
      const toast = {
        ...notification,
        show: false,
        progress: 100
      }
      
      toasts.value.push(toast)
      
      // Show toast after a brief delay
      setTimeout(() => {
        toast.show = true
      }, 100)

      // Start progress countdown
      const duration = 5000
      const interval = 50
      const decrement = (interval / duration) * 100
      
      const progressTimer = setInterval(() => {
        toast.progress -= decrement
        if (toast.progress <= 0) {
          clearInterval(progressTimer)
          removeToast(toast.id)
        }
      }, interval)

      // Store timer reference for cleanup
      toast.timer = progressTimer
    }

    // Watch for new notifications
    watch(notifications, (newNotifications, oldNotifications) => {
      const oldIds = oldNotifications?.map(n => n.id) || []
      const newToasts = newNotifications.filter(n => !oldIds.includes(n.id))
      
      newToasts.forEach(addToast)
    }, { immediate: true })

    return {
      toasts,
      getToastIcon,
      removeToast
    }
  }
}
</script>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;

  @media (max-width: 768px) {
    right: 10px;
    left: 10px;
    max-width: none;
  }
}

.toast {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transform: translateX(400px);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border-left: 4px solid #667eea;
  min-width: 350px;

  @media (max-width: 768px) {
    min-width: auto;
    transform: translateY(-100px);
  }

  &.show {
    transform: translateX(0);
    opacity: 1;

    @media (max-width: 768px) {
      transform: translateY(0);
    }
  }

  &.success {
    border-left-color: #28a745;
    
    .toast-icon {
      color: #28a745;
    }
  }

  &.error {
    border-left-color: #dc3545;
    
    .toast-icon {
      color: #dc3545;
    }
  }

  &.warning {
    border-left-color: #ffc107;
    
    .toast-icon {
      color: #ffc107;
    }
  }

  &.info {
    border-left-color: #dd2525;
    
    .toast-icon {
      color: #dd2525;
    }
  }
}

.toast-header {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
}

.toast-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  margin: 0 0 5px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  line-height: 1.2;
}

.toast-message {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  word-wrap: break-word;
}

.toast-close {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    color: #666;
    background: rgba(0, 0, 0, 0.1);
  }

  i {
    font-size: 12px;
  }
}

.toast-progress {
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #dd2525, #b91c1c);
  transition: width 0.1s linear;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer 2s infinite;
  }
}

// Toast Transitions
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from {
  transform: translateX(400px);
  opacity: 0;

  @media (max-width: 768px) {
    transform: translateY(-100px);
  }
}

.toast-leave-to {
  transform: translateX(400px);
  opacity: 0;

  @media (max-width: 768px) {
    transform: translateY(-100px);
  }
}

.toast-move {
  transition: transform 0.3s ease;
}

// Animations
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

// Responsive adjustments
@media (max-width: 480px) {
  .toast-container {
    top: 80px;
  }

  .toast {
    min-width: auto;
  }

  .toast-header {
    padding: 15px;
    gap: 12px;
  }

  .toast-icon {
    font-size: 1.3rem;
  }

  .toast-title {
    font-size: 0.9rem;
  }

  .toast-message {
    font-size: 0.8rem;
  }
}
</style>