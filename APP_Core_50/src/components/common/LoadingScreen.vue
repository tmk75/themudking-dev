<template>
  <div class="loading-screen">
    <div class="loading-content">
      <!-- Logo Animation -->
      <div class="loading-logo">
        <div class="logo-circle">
          <i class="fas fa-compass"></i>
        </div>
        <div class="logo-text">Global Talents Management</div>
      </div>

      <!-- Progress Bar -->
      <div class="loading-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        <div class="progress-text">{{ loadingText }}</div>
      </div>

      <!-- Loading Animation -->
      <div class="loading-animation">
        <div class="dot" v-for="i in 3" :key="i" :style="{ animationDelay: (i - 1) * 0.2 + 's' }"></div>
      </div>
    </div>

    <!-- Background Pattern -->
    <div class="background-pattern">
      <div class="pattern-circle" v-for="i in 6" :key="i" :style="getCircleStyle(i)"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'LoadingScreen',
  setup() {
    const progress = ref(0)
    const loadingText = ref('正在初始化系统...')
    
    const loadingSteps = [
      { progress: 20, text: '正在加载用户配置...' },
      { progress: 40, text: '正在连接数据服务...' },
      { progress: 60, text: '正在加载框架数据...' },
      { progress: 80, text: '正在准备界面...' },
      { progress: 100, text: '加载完成！' }
    ]

    let currentStep = 0
    let progressInterval = null

    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        progress.value = step.progress
        loadingText.value = step.text
        currentStep++
      }
    }

    const getCircleStyle = (index) => {
      const size = 100 + (index * 50)
      const delay = index * 0.5
      return {
        width: size + 'px',
        height: size + 'px',
        animationDelay: delay + 's'
      }
    }

    onMounted(() => {
      progressInterval = setInterval(updateProgress, 400)
    })

    onUnmounted(() => {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    })

    return {
      progress,
      loadingText,
      getCircleStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
}

.loading-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.loading-logo {
  margin-bottom: 24px;
  animation: fadeInUp 0.8s ease-out;
  
  @media (min-width: 768px) {
    margin-bottom: 32px;
  }
  
  @media (min-width: 1024px) {
    margin-bottom: 40px;
  }
}

.logo-circle {
  width: 80px;
  height: 80px;
  background: rgba(221, 37, 37, 0.1);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(221, 37, 37, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  animation: rotate 3s linear infinite;

  i {
    font-size: 2rem;
    color: #dd2525;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
    margin: 0 auto 18px;
    backdrop-filter: blur(18px);
    
    i {
      font-size: 2.5rem;
    }
  }
  
  @media (min-width: 1024px) {
    width: 120px;
    height: 120px;
    margin: 0 auto 20px;
    backdrop-filter: blur(20px);
    
    i {
      font-size: 3rem;
    }
  }
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 900;
  color: #dd2525;
  text-shadow: 0 2px 12px rgba(221, 37, 37, 0.3);
  letter-spacing: 1px;
  
  @media (min-width: 768px) {
    font-size: 2rem;
    letter-spacing: 1.5px;
    text-shadow: 0 3px 16px rgba(221, 37, 37, 0.3);
  }
  
  @media (min-width: 1024px) {
    font-size: 2.5rem;
    letter-spacing: 2px;
    text-shadow: 0 4px 20px rgba(221, 37, 37, 0.3);
  }
}

.loading-progress {
  margin: 24px 0;
  animation: fadeInUp 0.8s ease-out 0.3s both;
  
  @media (min-width: 768px) {
    margin: 32px 0;
  }
  
  @media (min-width: 1024px) {
    margin: 40px 0;
  }
}

.progress-bar {
  width: 200px;
  height: 4px;
  background: rgba(221, 37, 37, 0.2);
  border-radius: 2px;
  margin: 0 auto 12px;
  overflow: hidden;
  position: relative;

  @media (min-width: 640px) {
    width: 250px;
    height: 5px;
    margin: 0 auto 13px;
  }
  
  @media (min-width: 1024px) {
    width: 300px;
    height: 6px;
    border-radius: 3px;
    margin: 0 auto 15px;
  }
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #dd2525, rgba(221, 37, 37, 0.8));
  border-radius: 3px;
  transition: width 0.4s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
    animation: shimmer 1.5s infinite;
  }
}

.progress-text {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
  min-height: 20px;
}

.loading-animation {
  display: flex;
  justify-content: center;
  gap: 8px;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.dot {
  width: 12px;
  height: 12px;
  background: #dd2525;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.pattern-circle {
  position: absolute;
  border: 1px solid rgba(221, 37, 37, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;

  &:nth-child(1) {
    top: 10%;
    left: 10%;
  }

  &:nth-child(2) {
    top: 20%;
    right: 15%;
  }

  &:nth-child(3) {
    bottom: 30%;
    left: 20%;
  }

  &:nth-child(4) {
    bottom: 20%;
    right: 10%;
  }

  &:nth-child(5) {
    top: 50%;
    left: 5%;
  }

  &:nth-child(6) {
    top: 60%;
    right: 5%;
  }
}

// Animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.1;
  }
}

// Responsive
@media (max-width: 768px) {
  .logo-circle {
    width: 100px;
    height: 100px;

    i {
      font-size: 2.5rem;
    }
  }

  .logo-text {
    font-size: 2rem;
  }

  .progress-bar {
    width: 250px;
  }
}

@media (max-width: 480px) {
  .logo-circle {
    width: 80px;
    height: 80px;

    i {
      font-size: 2rem;
    }
  }

  .logo-text {
    font-size: 1.8rem;
  }

  .progress-bar {
    width: 200px;
  }
}
</style>