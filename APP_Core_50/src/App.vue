<template>
  <div id="app">
    <!-- Loading Screen -->
    <LoadingScreen v-if="isLoading" />
    
    <!-- Main App -->
    <div v-else class="app-container">
      <!-- Mobile Navigation Button -->
      <MobileNavButton />
      
      <!-- Floating Tab Bar -->
      <FloatingTabBar />
      
      <!-- Main Content -->
      <main class="main-content">
        <router-view v-slot="{ Component, route }">
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </main>
      
      <!-- Toast Notifications -->
      <ToastContainer />
      
      <!-- Global Modal -->
      <GlobalModal />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import FloatingTabBar from '@/components/layout/FloatingTabBar.vue'
import MobileNavButton from '@/components/layout/MobileNavButton.vue'
import LoadingScreen from '@/components/common/LoadingScreen.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import GlobalModal from '@/components/common/GlobalModal.vue'

export default {
  name: 'App',
  components: {
    FloatingTabBar,
    MobileNavButton,
    LoadingScreen,
    ToastContainer,
    GlobalModal
  },
  setup() {
    const appStore = useAppStore()
    const isLoading = ref(true)

    onMounted(async () => {
      // Simulate app initialization
      await new Promise(resolve => setTimeout(resolve, 2000))
      await appStore.initialize()
      isLoading.value = false
    })

    return {
      isLoading
    }
  }
}
</script>

<style lang="scss">
.app-container {
  min-height: 100vh;
  background: #FFFFFF;
  position: relative;
  
  // iPhone 15 safe area support
  @supports (padding: max(0px)) {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
}

.main-content {
  margin-left: 0;
  padding: 100px 16px 20px 16px; // Top padding for nav button clearance
  min-height: 100vh;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    padding: 110px 24px 30px 24px;
  }

  @media (min-width: 1024px) {
    padding: 120px 40px 40px 40px;
  }
}

// Page Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>