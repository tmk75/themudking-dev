<template>
  <div id="app">
    <!-- Loading Screen -->
    <LoadingScreen v-if="isLoading" />
    
    <!-- Main App -->
    <div v-else class="app-container">
      <!-- Header -->
      <AppHeader />
      
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
import AppHeader from '@/components/layout/AppHeader.vue'
import FloatingTabBar from '@/components/layout/FloatingTabBar.vue'
import LoadingScreen from '@/components/common/LoadingScreen.vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import GlobalModal from '@/components/common/GlobalModal.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    FloatingTabBar,
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
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
}

.main-content {
  margin-left: 0;
  padding: 80px 16px 20px 16px;
  min-height: 100vh;
  transition: all 0.3s ease;

  @media (min-width: 768px) {
    padding: 90px 24px 30px 24px;
  }

  @media (min-width: 1024px) {
    padding: 100px 40px 40px 40px;
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