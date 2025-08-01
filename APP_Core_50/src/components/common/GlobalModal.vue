<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="modal.show" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">{{ modal.title }}</h3>
            <button class="modal-close" @click="closeModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div v-if="modal.type === 'confirm'" class="confirm-content">
              <div class="confirm-icon">
                <i class="fas fa-question-circle"></i>
              </div>
              <p>{{ modal.content }}</p>
            </div>
            
            <div v-else-if="modal.type === 'error'" class="error-content">
              <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <p>{{ modal.content }}</p>
            </div>
            
            <div v-else-if="modal.type === 'success'" class="success-content">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <p>{{ modal.content }}</p>
            </div>
            
            <div v-else class="info-content">
              <div class="info-icon">
                <i class="fas fa-info-circle"></i>
              </div>
              <p>{{ modal.content }}</p>
            </div>
          </div>
          
          <div class="modal-footer" v-if="modal.actions && modal.actions.length > 0">
            <button
              v-for="action in modal.actions"
              :key="action.text"
              class="modal-btn"
              :class="action.type || 'default'"
              @click="handleAction(action)"
            >
              <i v-if="action.icon" :class="action.icon"></i>
              {{ action.text }}
            </button>
          </div>
          
          <div v-else class="modal-footer">
            <button class="modal-btn primary" @click="closeModal">
              确定
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

export default {
  name: 'GlobalModal',
  setup() {
    const appStore = useAppStore()

    const modal = computed(() => appStore.modal)

    const closeModal = () => {
      appStore.hideModal()
    }

    const handleOverlayClick = () => {
      // Only close on overlay click if not a confirm dialog
      if (modal.value.type !== 'confirm') {
        closeModal()
      }
    }

    const handleAction = (action) => {
      if (action.handler) {
        action.handler()
      }
      closeModal()
    }

    return {
      modal,
      closeModal,
      handleOverlayClick,
      handleAction
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
    background: rgba(0, 0, 0, 0.1);
    transform: rotate(90deg);
  }
}

.modal-body {
  padding: 30px;
  max-height: 60vh;
  overflow-y: auto;
}

.confirm-content,
.error-content,
.success-content,
.info-content {
  display: flex;
  align-items: center;
  gap: 20px;
  text-align: left;

  p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    flex: 1;
  }
}

.confirm-icon,
.error-icon,
.success-icon,
.info-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.confirm-icon {
  color: #ffc107;
}

.error-icon {
  color: #dc3545;
}

.success-icon {
  color: #28a745;
}

.info-icon {
  color: #dd2525;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 20px 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.02);
}

.modal-btn {
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  justify-content: center;

  &.default {
    background: rgba(0, 0, 0, 0.05);
    color: #666;
    border-color: rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(0, 0, 0, 0.1);
      color: #333;
      transform: translateY(-2px);
    }
  }

  &.primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #5a6fd8, #6a4190);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
  }

  &.success {
    background: #2ed573;
    color: white;

    &:hover {
      background: #26d065;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(46, 213, 115, 0.4);
    }
  }

  &.danger {
    background: #ff4757;
    color: white;

    &:hover {
      background: #ff3838;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
    }
  }

  &.warning {
    background: #ffa502;
    color: white;

    &:hover {
      background: #ff9500;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 165, 2, 0.4);
    }
  }

  i {
    font-size: 0.9rem;
  }
}

// Modal Transitions
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.8) translateY(50px);
}

.modal-enter-to .modal-container,
.modal-leave-from .modal-container {
  transform: scale(1) translateY(0);
}

// Responsive Design
@media (max-width: 768px) {
  .modal-overlay {
    padding: 15px;
  }

  .modal-container {
    max-width: none;
    width: 100%;
  }

  .modal-header {
    padding: 20px 25px;
  }

  .modal-title {
    font-size: 1.3rem;
  }

  .modal-body {
    padding: 25px;
  }

  .modal-footer {
    padding: 15px 25px;
    flex-direction: column;

    .modal-btn {
      width: 100%;
    }
  }

  .confirm-content,
  .error-content,
  .success-content,
  .info-content {
    flex-direction: column;
    text-align: center;
    gap: 15px;

    p {
      font-size: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 10px;
  }

  .modal-header {
    padding: 15px 20px;
  }

  .modal-title {
    font-size: 1.2rem;
  }

  .modal-body {
    padding: 20px;
  }

  .modal-footer {
    padding: 15px 20px;
  }

  .confirm-icon,
  .error-icon,
  .success-icon,
  .info-icon {
    font-size: 2.5rem;
  }
}
</style>