<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section glass animate__animated animate__fadeInUp">
      <div class="hero-content">
        <div class="hero-badge">
          <i class="fas fa-star"></i>
          <span>高管人才发展框架</span>
        </div>
        <h1 class="hero-title">Core 50</h1>
        <p class="hero-subtitle">构建卓越领导力的综合评估与发展体系</p>
        <p class="hero-description">
          通过科学的评估方法和个性化的发展路径，帮助高管人才实现职业突破与组织价值最大化
        </p>
        <div class="hero-actions">
          <button class="btn primary" @click="startAssessment">
            <i class="fas fa-rocket"></i>
            开始评估
          </button>
          <button class="btn secondary" @click="watchDemo">
            <i class="fas fa-play"></i>
            观看演示
          </button>
          <button class="btn outline" @click="downloadGuide">
            <i class="fas fa-download"></i>
            下载指南
          </button>
        </div>
      </div>
      
      <!-- Hero Animation -->
      <div class="hero-animation">
        <div class="floating-elements">
          <div class="element" v-for="i in 6" :key="i" :style="getElementStyle(i)">
            <i :class="getElementIcon(i)"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-compass"></i>
          核心特性
        </h2>
        <p class="section-description">
          Core 50 框架提供全方位的人才评估和发展解决方案
        </p>
      </div>

      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card glass animate__animated animate__fadeInUp"
          :style="{ animationDelay: (index * 0.1) + 's' }"
          @click="showFeatureDetail(feature)"
        >
          <div class="feature-icon">
            <i :class="feature.icon"></i>
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <div class="feature-stats">
            <div class="stat">
              <span class="stat-value">{{ feature.stats.value }}</span>
              <span class="stat-label">{{ feature.stats.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section glass">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-cogs"></i>
          实施流程
        </h2>
        <p class="section-description">
          简单四步，开启您的人才发展之旅
        </p>
      </div>

      <div class="process-flow">
        <div 
          v-for="(step, index) in processSteps" 
          :key="index"
          class="process-step animate__animated animate__fadeInLeft"
          :style="{ animationDelay: (index * 0.2) + 's' }"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h4 class="step-title">{{ step.title }}</h4>
            <p class="step-description">{{ step.description }}</p>
            <div class="step-features">
              <span 
                v-for="feature in step.features" 
                :key="feature"
                class="feature-tag"
              >
                {{ feature }}
              </span>
            </div>
          </div>
          <div v-if="index < processSteps.length - 1" class="step-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="stats-section">
      <div class="stats-grid">
        <div 
          v-for="(stat, index) in statistics" 
          :key="index"
          class="stat-card glass animate__animated animate__zoomIn"
          :style="{ animationDelay: (index * 0.1) + 's' }"
        >
          <div class="stat-icon">
            <i :class="stat.icon"></i>
          </div>
          <div class="stat-content">
            <div class="stat-number" ref="statNumbers">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section glass">
      <div class="cta-content">
        <h2 class="cta-title">准备开始您的人才发展之旅？</h2>
        <p class="cta-description">
          立即体验 Core 50 框架，解锁您团队的无限潜能
        </p>
        <div class="cta-actions">
          <button class="btn primary large" @click="startTrial">
            <i class="fas fa-rocket"></i>
            免费试用
          </button>
          <button class="btn outline large" @click="contactSales">
            <i class="fas fa-phone"></i>
            联系销售
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'Home',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()

    const features = [
      {
        icon: 'fas fa-chart-bar',
        title: '360度评估',
        description: '多维度、多角度的综合评估体系，确保评估结果的客观性和全面性',
        stats: { value: '50+', label: '评估维度' }
      },
      {
        icon: 'fas fa-route',
        title: '个性化发展',
        description: '基于评估结果，为每位高管量身定制发展计划和学习路径',
        stats: { value: '95%', label: '满意度' }
      },
      {
        icon: 'fas fa-analytics',
        title: '数据驱动',
        description: '实时监测发展进度，通过数据分析优化发展策略',
        stats: { value: '24/7', label: '实时监控' }
      },
      {
        icon: 'fas fa-users',
        title: '团队协作',
        description: '支持团队协作和知识分享，构建学习型组织文化',
        stats: { value: '100+', label: '企业用户' }
      }
    ]

    const processSteps = [
      {
        title: '评估准备',
        description: '确定评估对象，设置评估参数，准备评估工具',
        features: ['目标设定', '参数配置', '工具准备']
      },
      {
        title: '数据收集',
        description: '执行360度评估，收集多维度反馈数据',
        features: ['多角度评估', '数据采集', '质量控制']
      },
      {
        title: '分析报告',
        description: '生成个性化分析报告和发展建议',
        features: ['智能分析', '报告生成', '建议制定']
      },
      {
        title: '持续发展',
        description: '实施发展计划，持续跟踪和优化',
        features: ['计划执行', '进度跟踪', '效果评估']
      }
    ]

    const statistics = [
      { icon: 'fas fa-building', value: '500+', label: '合作企业' },
      { icon: 'fas fa-users', value: '10,000+', label: '评估用户' },
      { icon: 'fas fa-chart-line', value: '85%', label: '提升效果' },
      { icon: 'fas fa-award', value: '98%', label: '客户满意度' }
    ]

    const getElementStyle = (index) => {
      const positions = [
        { top: '10%', left: '10%', delay: '0s' },
        { top: '20%', right: '15%', delay: '0.5s' },
        { bottom: '30%', left: '20%', delay: '1s' },
        { bottom: '20%', right: '10%', delay: '1.5s' },
        { top: '50%', left: '5%', delay: '2s' },
        { top: '60%', right: '5%', delay: '2.5s' }
      ]
      
      return {
        ...positions[index - 1],
        animationDelay: positions[index - 1].delay
      }
    }

    const getElementIcon = (index) => {
      const icons = [
        'fas fa-lightbulb',
        'fas fa-target',
        'fas fa-rocket',
        'fas fa-star',
        'fas fa-gem',
        'fas fa-crown'
      ]
      return icons[index - 1]
    }

    const startAssessment = () => {
      router.push('/assessment')
    }

    const watchDemo = () => {
      appStore.showModal({
        title: '观看演示',
        content: '演示视频功能即将推出，敬请期待！',
        type: 'info'
      })
    }

    const downloadGuide = () => {
      appStore.showToast('下载', '用户指南下载已开始', 'success')
    }

    const showFeatureDetail = (feature) => {
      appStore.showModal({
        title: feature.title,
        content: feature.description,
        type: 'info'
      })
    }

    const startTrial = () => {
      appStore.showModal({
        title: '免费试用',
        content: '感谢您的兴趣！我们的销售团队将在24小时内与您联系，为您安排免费试用。',
        type: 'success'
      })
    }

    const contactSales = () => {
      appStore.showModal({
        title: '联系销售',
        content: '请拨打销售热线：400-123-4567，或发送邮件至：sales@core50.com',
        type: 'info'
      })
    }

    onMounted(() => {
      // Add entrance animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp')
          }
        })
      })

      document.querySelectorAll('.feature-card, .process-step, .stat-card').forEach(el => {
        observer.observe(el)
      })
    })

    return {
      features,
      processSteps,
      statistics,
      getElementStyle,
      getElementIcon,
      startAssessment,
      watchDemo,
      downloadGuide,
      showFeatureDetail,
      startTrial,
      contactSales
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

// Hero Section
.hero-section {
  position: relative;
  text-align: center;
  padding: 80px 40px;
  margin-bottom: 100px;
  overflow: hidden;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  max-width: 800px;
  z-index: 2;
  position: relative;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(221, 37, 37, 0.1);
  border: 1px solid rgba(221, 37, 37, 0.3);
  border-radius: 30px;
  color: #dd2525;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: 4.5rem;
  font-weight: 900;
  color: #dd2525;
  margin-bottom: 20px;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(221, 37, 37, 0.3);
  letter-spacing: -2px;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

.hero-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.floating-elements {
  position: relative;
  width: 100%;
  height: 100%;
}

.element {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  animation: float 6s ease-in-out infinite;

  &:nth-child(even) {
    animation-direction: reverse;
  }
}

// Features Section
.features-section {
  margin-bottom: 100px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.section-description {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  padding: 40px 30px;
  text-align: center;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);

    &::before {
      left: 100%;
    }
  }
}

.feature-icon {
  font-size: 3.5rem;
  color: #dd2525;
  margin-bottom: 25px;
  opacity: 0.9;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.feature-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.feature-stats {
  display: flex;
  justify-content: center;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #dd2525;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

// Process Section
.process-section {
  padding: 60px 40px;
  margin-bottom: 100px;
}

.process-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.process-step {
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 300px;
  position: relative;
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #dd2525, #b91c1c);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(221, 37, 37, 0.3);
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.step-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
  font-size: 0.95rem;
}

.step-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  padding: 4px 12px;
  background: rgba(221, 37, 37, 0.1);
  border: 1px solid rgba(221, 37, 37, 0.3);
  border-radius: 15px;
  color: #dd2525;
  font-size: 0.8rem;
  font-weight: 500;
}

.step-arrow {
  font-size: 1.5rem;
  color: #dd2525;
  margin: 0 20px;
  opacity: 0.7;
}

// Statistics Section
.stats-section {
  margin-bottom: 100px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.stat-card {
  padding: 40px 30px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
}

.stat-icon {
  font-size: 3rem;
  color: #dd2525;
  opacity: 0.8;
}

.stat-content {
  flex: 1;
  text-align: left;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #dd2525;
  margin-bottom: 5px;
}

// CTA Section
.cta-section {
  padding: 60px 40px;
  text-align: center;
  margin-bottom: 50px;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
}

.cta-description {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

// Buttons
.btn {
  padding: 15px 30px;
  border: 2px solid transparent;
  border-radius: 30px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  backdrop-filter: blur(10px);

  &.primary {
    background: linear-gradient(135deg, #dd2525, #b91c1c);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #c41e1e, #991b1b);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 10px 30px rgba(221, 37, 37, 0.3);
    }
  }

  &.secondary {
    background: rgba(221, 37, 37, 0.1);
    color: #dd2525;
    border-color: rgba(221, 37, 37, 0.3);

    &:hover {
      background: rgba(221, 37, 37, 0.2);
      border-color: rgba(221, 37, 37, 0.5);
      transform: translateY(-3px);
    }
  }

  &.outline {
    background: transparent;
    color: #dd2525;
    border-color: rgba(221, 37, 37, 0.5);

    &:hover {
      background: rgba(221, 37, 37, 0.1);
      transform: translateY(-3px);
    }
  }

  &.large {
    padding: 18px 36px;
    font-size: 18px;
  }

  i {
    font-size: 1.1em;
  }
}

// Animations
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .process-flow {
    flex-direction: column;
    align-items: center;
  }

  .step-arrow {
    transform: rotate(90deg);
    margin: 20px 0;
  }

  .process-step {
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.3rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .section-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 10px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-card {
    flex-direction: column;
    text-align: center;
  }

  .stat-content {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 20px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .process-section {
    padding: 40px 20px;
  }

  .cta-section {
    padding: 40px 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .element {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}
</style>