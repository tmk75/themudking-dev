<template>
  <div class="home-page">
    <!-- Clean Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>高管人才框架</span>
          </div>
          
          <h1 class="hero-title">
            全球人才管理
          </h1>
          
          <p class="hero-subtitle">
            通过全面的评估和发展建立卓越的领导力。
            用数据驱动的人才洞察转变您的组织。
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="startAssessment">
              开始评估
            </button>
            <button class="btn btn-secondary" @click="watchDemo">
              <i class="fas fa-play"></i>
              观看演示
            </button>
          </div>

          <div class="hero-stats">
            <div class="stat-item" v-for="(stat, index) in heroStats" :key="index">
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="visual-card">
            <div class="card-header">
              <div class="card-title">评估仪表板</div>
              <div class="card-status">实时</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">领导力评分</span>
                <span class="metric-value">87%</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">团队表现</span>
                <span class="metric-value">92%</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">增长率</span>
                <span class="metric-value">+15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">核心能力</h2>
          <p class="section-description">
            为高管人才发展设计的综合工具
          </p>
        </div>
        
        <div class="features-grid">
          <div 
            class="feature-card" 
            v-for="(feature, index) in features" 
            :key="index"
            @click="showFeatureDetail(feature.type)"
          >
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            
            <div class="feature-content">
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
              
              <div class="feature-stat">
                <span class="stat-value">{{ feature.stat.value }}</span>
                <span class="stat-label">{{ feature.stat.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">实施流程</h2>
          <p class="section-description">
            人才发展的结构化方法
          </p>
        </div>
        
        <div class="process-grid">
          <div 
            v-for="(step, index) in processSteps" 
            :key="index" 
            class="process-card"
          >
            <div class="process-number">{{ index + 1 }}</div>
            <div class="process-content">
              <h4 class="process-title">{{ step.title }}</h4>
              <p class="process-description">{{ step.description }}</p>
              <div class="process-duration">{{ step.duration }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-content">
          <div class="stats-header">
            <h3 class="stats-title">行业领导者的信赖之选</h3>
            <p class="stats-subtitle">加入数千家正在转变人才管理的企业</p>
          </div>
          
          <div class="stats-grid">
            <div 
              v-for="(stat, index) in statistics" 
              :key="index" 
              class="stat-card"
            >
              <div class="stat-icon">
                <i :class="stat.icon"></i>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Executive Action Section -->
    <section class="executive-action-section">
      <div class="container">
        <div class="action-content">
          <div class="action-header">
            <div class="action-badge">
              <i class="fas fa-rocket"></i>
              <span>高管决策点</span>
            </div>
            
            <h2 class="action-title">
              加速您的领导力卓越
            </h2>
            
            <p class="action-description">
              加入具有前瞻性思维的组织，利用数据驱动的人才洞察
              构建卓越的领导能力，推动可持续增长。
            </p>
          </div>
          
          <div class="action-grid">
            <div class="action-card primary-action">
              <div class="card-header">
                <div class="card-icon">
                  <i class="fas fa-play"></i>
                </div>
                <h3 class="card-title">开始评估</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  从我们全面的360°领导力评估开始
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>15分钟完成</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>即时洞察</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>无需承诺</span>
                  </div>
                </div>
                
                <button class="action-btn primary" @click="startTrial">
                  <span>开始评估</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
            
            <div class="action-card secondary-action">
              <div class="card-header">
                <div class="card-icon">
                  <i class="fas fa-users"></i>
                </div>
                <h3 class="card-title">企业解决方案</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  与我们的专家讨论企业实施方案
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>定制实施</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>专属支持</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>ROI分析</span>
                  </div>
                </div>
                
                <button class="action-btn secondary" @click="contactSales">
                  <span>预约咨询</span>
                  <i class="fas fa-calendar"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="trust-indicators">
            <div class="trust-item">
              <i class="fas fa-shield-alt"></i>
              <span>企业级安全</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-award"></i>
              <span>行业认证</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-headset"></i>
              <span>24/7支持</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-chart-line"></i>
              <span>验证ROI</span>
            </div>
          </div>
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


    
    const heroStats = [
      { value: '500+', label: '合作企业' },
      { value: '10K+', label: '用户数量' },
      { value: '85%', label: '成功率' },
      { value: '98%', label: '满意度' }
    ]

    const features = [
      {
        type: 'assessment',
        icon: 'fas fa-chart-bar',
        title: '360°评估',
        description: '多维度评估系统，确保客观全面的结果',
        stat: { value: '50+', label: '评估维度' }
      },
      {
        type: 'development',
        icon: 'fas fa-route',
        title: '个性化发展',
        description: '基于评估结果的定制化发展计划和学习路径',
        stat: { value: '95%', label: '满意度' }
      },
      {
        type: 'analytics',
        icon: 'fas fa-analytics',
        title: '数据驱动洞察',
        description: '实时进度监控和数据分析，优化策略',
        stat: { value: '24/7', label: '实时监控' }
      },
      {
        type: 'collaboration',
        icon: 'fas fa-users',
        title: '团队协作',
        description: '支持团队协作和知识共享，建立学习文化',
        stat: { value: '100+', label: '企业用户' }
      }
    ]

    const processSteps = [
      {
        title: '评估准备',
        description: '定义评估目标，配置参数，准备评估工具',
        duration: '1-2周'
      },
      {
        title: '数据收集',
        description: '执行360度评估，收集多维度反馈数据',
        duration: '2-3周'
      },
      {
        title: '分析报告',
        description: '生成个性化分析报告和发展建议',
        duration: '1周'
      },
      {
        title: '持续发展',
        description: '实施发展计划，持续跟踪和优化',
        duration: '持续进行'
      }
    ]

    const statistics = [
      { icon: 'fas fa-building', value: '500+', label: '合作企业' },
      { icon: 'fas fa-users', value: '10,000+', label: '评估用户' },
      { icon: 'fas fa-chart-line', value: '85%', label: '改善率' },
      { icon: 'fas fa-award', value: '98%', label: '客户满意度' }
    ]



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

    const showFeatureDetail = (featureType) => {
      const features = {
        assessment: { title: '360°评估', description: '全面的多维度评估系统' },
        development: { title: '个性化发展', description: '定制化发展计划和学习路径' },
        analytics: { title: '数据驱动洞察', description: '实时监控和分析' },
        collaboration: { title: '团队协作', description: '增强团队协作和知识共享' }
      }
      const feature = features[featureType]
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
      // Simple initialization if needed
    })

    return {
      heroStats,
      features,
      processSteps,
      statistics,
      startAssessment,
      watchDemo,
      showFeatureDetail,
      startTrial,
      contactSales
    }
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  background: #ffffff;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  
  @media (min-width: 768px) {
    padding: 0 24px;
  }
}

// Hero Section - Mobile First
.hero-section {
  padding: 60px 0 40px;
  background: #ffffff;
  
  .hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    align-items: center;
    text-align: center;
    
    @media (min-width: 768px) {
      padding: 0 24px;
      gap: 60px;
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      text-align: left;
      padding: 80px 24px 60px;
    }
    
    @media (min-width: 1200px) {
      padding: 120px 24px 80px;
    }
  }
  
  .hero-content {
    .hero-badge {
      display: inline-block;
      padding: 8px 16px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 500;
      color: #6c757d;
      margin-bottom: 32px;
    }
    
    .hero-title {
      font-size: 2rem;
      font-weight: 700;
      line-height: 1.2;
      color: #212529;
      margin-bottom: 16px;
      letter-spacing: -0.01em;
      
      @media (min-width: 768px) {
        font-size: 2.5rem;
        margin-bottom: 20px;
        line-height: 1.15;
      }
      
      @media (min-width: 1024px) {
        font-size: 3rem;
        margin-bottom: 24px;
        line-height: 1.1;
        letter-spacing: -0.02em;
      }
      
      @media (min-width: 1200px) {
        font-size: 3.5rem;
      }
    }
    
    .hero-subtitle {
      font-size: 1rem;
      line-height: 1.5;
      color: #6c757d;
      margin-bottom: 24px;
      max-width: 100%;
      
      @media (min-width: 768px) {
        font-size: 1.125rem;
        margin-bottom: 32px;
        line-height: 1.6;
      }
      
      @media (min-width: 1024px) {
        font-size: 1.25rem;
        margin-bottom: 40px;
        max-width: 500px;
      }
    }
    
    .hero-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
      align-items: center;
      
      @media (min-width: 640px) {
        flex-direction: row;
        gap: 16px;
        justify-content: center;
      }
      
      @media (min-width: 1024px) {
        justify-content: flex-start;
        margin-bottom: 60px;
      }
    }
    
    .hero-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      
      .stat-item {
        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 2px;
        }
        
        .stat-label {
          font-size: 0.75rem;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }
      
      @media (min-width: 640px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        
        .stat-item {
          .stat-number {
            font-size: 1.75rem;
            margin-bottom: 3px;
          }
          
          .stat-label {
            font-size: 0.8rem;
          }
        }
      }
      
      @media (min-width: 1024px) {
        gap: 32px;
        
        .stat-item {
          .stat-number {
            font-size: 2rem;
            margin-bottom: 4px;
          }
          
          .stat-label {
            font-size: 0.875rem;
          }
        }
      }
    }
  }
  
  .hero-visual {
    .visual-card {
      background: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        
        .card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #212529;
        }
        
        .card-status {
          padding: 4px 12px;
          background: #d1ecf1;
          color: #0c5460;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 500;
        }
      }
      
      .card-content {
        .metric-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f8f9fa;
          
          &:last-child {
            border-bottom: none;
          }
          
          .metric-label {
            color: #6c757d;
            font-size: 0.875rem;
          }
          
          .metric-value {
            font-weight: 600;
            color: #212529;
          }
        }
      }
    }
  }
}

// Features Section - Mobile First
.features-section {
  padding: 60px 0;
  
  .section-header {
    text-align: center;
    margin-bottom: 40px;
    
    .section-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #212529;
      margin-bottom: 12px;
      letter-spacing: -0.01em;
      
      @media (min-width: 768px) {
        font-size: 2rem;
        margin-bottom: 14px;
      }
      
      @media (min-width: 1024px) {
        font-size: 2.5rem;
        margin-bottom: 16px;
        letter-spacing: -0.02em;
      }
    }
    
    .section-description {
      font-size: 1rem;
      color: #6c757d;
      max-width: 100%;
      margin: 0 auto;
      padding: 0 16px;
      
      @media (min-width: 768px) {
        font-size: 1.125rem;
        max-width: 600px;
        padding: 0;
      }
    }
    
    @media (min-width: 768px) {
      margin-bottom: 60px;
    }
    
    @media (min-width: 1024px) {
      margin-bottom: 80px;
    }
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }
    
    @media (min-width: 1024px) {
      gap: 40px;
    }
  }
  
  .feature-card {
    background: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 24px;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      border-color: #dd2525;
      box-shadow: 0 6px 20px rgba(221, 37, 37, 0.1);
      transform: translateY(-2px);
    }
    
    .feature-icon {
      width: 48px;
      height: 48px;
      background: #dd2525;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      
      i {
        font-size: 1.25rem;
        color: #ffffff;
      }
    }
    
    .feature-content {
      .feature-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #212529;
        margin-bottom: 8px;
      }
      
      .feature-description {
        color: #6c757d;
        line-height: 1.5;
        margin-bottom: 16px;
        font-size: 0.9rem;
      }
      
      .feature-stat {
        display: flex;
        align-items: baseline;
        gap: 6px;
        
        .stat-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: #dd2525;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #6c757d;
        }
      }
    }
    
    @media (min-width: 768px) {
      padding: 32px;
      
      &:hover {
        box-shadow: 0 7px 22px rgba(221, 37, 37, 0.1);
        transform: translateY(-3px);
      }
      
      .feature-icon {
        width: 52px;
        height: 52px;
        border-radius: 11px;
        margin-bottom: 20px;
        
        i {
          font-size: 1.375rem;
        }
      }
      
      .feature-content {
        .feature-title {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        
        .feature-description {
          margin-bottom: 20px;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        .feature-stat {
          gap: 7px;
          
          .stat-value {
            font-size: 1.375rem;
          }
          
          .stat-label {
            font-size: 0.825rem;
          }
        }
      }
    }
    
    @media (min-width: 1024px) {
      padding: 40px;
      
      &:hover {
        box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
        transform: translateY(-4px);
      }
      
      .feature-icon {
        width: 56px;
        height: 56px;
        border-radius: 12px;
        margin-bottom: 24px;
        
        i {
          font-size: 1.5rem;
        }
      }
      
      .feature-content {
        .feature-title {
          font-size: 1.25rem;
          margin-bottom: 12px;
        }
        
        .feature-description {
          margin-bottom: 24px;
          font-size: 1rem;
        }
        
        .feature-stat {
          gap: 8px;
          
          .stat-value {
            font-size: 1.5rem;
          }
          
          .stat-label {
            font-size: 0.875rem;
          }
        }
      }
    }
  }
  
  @media (min-width: 768px) {
    padding: 80px 0;
  }
  
  @media (min-width: 1024px) {
    padding: 120px 0;
  }
}


// Process Section - Mobile First
.process-section {
  padding: 60px 0;
  background: #fafafa;
  
  .section-header {
    text-align: center;
    margin-bottom: 40px;
    
    .section-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #212529;
      margin-bottom: 12px;
      letter-spacing: -0.01em;
      
      @media (min-width: 768px) {
        font-size: 2rem;
        margin-bottom: 14px;
      }
      
      @media (min-width: 1024px) {
        font-size: 2.5rem;
        margin-bottom: 16px;
        letter-spacing: -0.02em;
      }
    }
    
    .section-description {
      font-size: 1rem;
      color: #6c757d;
      max-width: 100%;
      margin: 0 auto;
      padding: 0 16px;
      
      @media (min-width: 768px) {
        font-size: 1.125rem;
        max-width: 600px;
        padding: 0;
      }
    }
    
    @media (min-width: 768px) {
      margin-bottom: 60px;
    }
    
    @media (min-width: 1024px) {
      margin-bottom: 80px;
    }
  }
  
  .process-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
    }
  }
  
  .process-card {
    background: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #dd2525;
      box-shadow: 0 6px 20px rgba(221, 37, 37, 0.1);
      transform: translateY(-2px);
    }
    
    .process-number {
      width: 40px;
      height: 40px;
      background: #dd2525;
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.125rem;
      font-weight: 700;
      margin: 0 auto 16px;
    }
    
    .process-content {
      .process-title {
        font-size: 1rem;
        font-weight: 600;
        color: #212529;
        margin-bottom: 8px;
      }
      
      .process-description {
        color: #6c757d;
        line-height: 1.5;
        margin-bottom: 12px;
        font-size: 0.8rem;
      }
      
      .process-duration {
        font-size: 0.7rem;
        color: #dd2525;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }
    
    @media (min-width: 768px) {
      padding: 28px;
      
      &:hover {
        box-shadow: 0 7px 22px rgba(221, 37, 37, 0.1);
        transform: translateY(-3px);
      }
      
      .process-number {
        width: 44px;
        height: 44px;
        font-size: 1.2rem;
        margin: 0 auto 20px;
      }
      
      .process-content {
        .process-title {
          font-size: 1.05rem;
          margin-bottom: 10px;
        }
        
        .process-description {
          margin-bottom: 14px;
          font-size: 0.825rem;
          line-height: 1.6;
        }
        
        .process-duration {
          font-size: 0.725rem;
        }
      }
    }
    
    @media (min-width: 1024px) {
      padding: 32px;
      
      &:hover {
        box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
        transform: translateY(-4px);
      }
      
      .process-number {
        width: 48px;
        height: 48px;
        font-size: 1.25rem;
        margin: 0 auto 24px;
      }
      
      .process-content {
        .process-title {
          font-size: 1.125rem;
          margin-bottom: 12px;
        }
        
        .process-description {
          margin-bottom: 16px;
          font-size: 0.875rem;
        }
        
        .process-duration {
          font-size: 0.75rem;
        }
      }
    }
  }
  
  @media (min-width: 768px) {
    padding: 80px 0;
  }
  
  @media (min-width: 1024px) {
    padding: 120px 0;
  }
}

  
// Statistics Section
.stats-section {
  padding: 120px 0;
  
  .stats-content {
    .stats-header {
      text-align: center;
      margin-bottom: 80px;
      
      .stats-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #212529;
        margin-bottom: 16px;
        letter-spacing: -0.02em;
      }
      
      .stats-subtitle {
        font-size: 1.125rem;
        color: #6c757d;
        max-width: 600px;
        margin: 0 auto;
      }
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
    }
    
    .stat-card {
      background: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #dd2525;
        box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
        transform: translateY(-4px);
      }
      
      .stat-icon {
        width: 56px;
        height: 56px;
        background: #f8f9fa;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
        
        i {
          font-size: 1.5rem;
          color: #dd2525;
        }
      }
      
      .stat-content {
        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 8px;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }
    }
  }
}

// Executive Action Section - McKinsey Style
.executive-action-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  

  
  .action-content {
    position: relative;
    z-index: 2;
    max-width: 1000px;
    margin: 0 auto;
    
    .action-header {
      text-align: center;
      margin-bottom: 80px;
      
      .action-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 20px;
        background: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 24px;
        font-size: 14px;
        font-weight: 600;
        color: #495057;
        margin-bottom: 32px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        
        i {
          color: #dd2525;
          font-size: 12px;
        }
      }
      
      .action-title {
        font-size: 2.75rem;
        font-weight: 700;
        color: #212529;
        margin-bottom: 24px;
        letter-spacing: -0.02em;
        line-height: 1.2;
      }
      
      .action-description {
        font-size: 1.125rem;
        color: #6c757d;
        line-height: 1.6;
        max-width: 700px;
        margin: 0 auto;
      }
    }
    
    .action-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 60px;
    }
    
    .action-card {
      background: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 16px;
      padding: 40px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #dd2525 0%, #b91c1c 100%);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        border-color: #dd2525;
        
        &::before {
          transform: scaleX(1);
        }
      }
      
      &.primary-action {
        border-color: #dd2525;
        background: linear-gradient(135deg, #ffffff 0%, #fff8f8 100%);
        
        &::before {
          background: linear-gradient(90deg, #dd2525 0%, #b91c1c 100%);
        }
        
        .card-icon {
          background: #dd2525;
          color: #ffffff;
        }
      }
      
      &.secondary-action {
        .card-icon {
          background: #f8f9fa;
          color: #495057;
          border: 2px solid #e9ecef;
        }
      }
      
      .card-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
        
        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }
        
        .card-title {
          font-size: 1.375rem;
          font-weight: 600;
          color: #212529;
          margin: 0;
        }
      }
      
      .card-content {
        .card-description {
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 24px;
          font-size: 1rem;
        }
        
        .card-features {
          margin-bottom: 32px;
          
          .feature-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
            
            i {
              color: #dd2525;
              font-size: 0.875rem;
              width: 16px;
            }
            
            span {
              color: #495057;
              font-size: 0.875rem;
              font-weight: 500;
            }
          }
        }
        
        .action-btn {
          width: 100%;
          padding: 16px 24px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-transform: none;
          
          &.primary {
            background: #dd2525;
            color: #ffffff;
            
            &:hover {
              background: #b91c1c;
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
            }
          }
          
          &.secondary {
            background: #ffffff;
            color: #495057;
            border: 2px solid #e9ecef;
            
            &:hover {
              background: #f8f9fa;
              border-color: #dd2525;
              color: #dd2525;
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
          }
          
          i {
            font-size: 0.875rem;
            transition: transform 0.3s ease;
          }
          
          &:hover i {
            transform: translateX(4px);
          }
        }
      }
    }
    
    .trust-indicators {
      display: flex;
      justify-content: center;
      gap: 48px;
      padding: 32px 0;
      border-top: 1px solid #e9ecef;
      
      .trust-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #6c757d;
        font-size: 0.875rem;
        font-weight: 500;
        
        i {
          color: #dd2525;
          font-size: 1rem;
        }
      }
    }
  }
}

// Button Styles - Mobile First
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  min-width: 140px;
  text-align: center;
  
  &.btn-primary {
    background: #dd2525;
    color: #ffffff;
    
    &:hover {
      background: #c41e1e;
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(221, 37, 37, 0.3);
    }
  }
  
  &.btn-secondary {
    background: #ffffff;
    color: #dd2525;
    border: 2px solid #dd2525;
    
    &:hover {
      background: #dd2525;
      color: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(221, 37, 37, 0.3);
    }
  }
  
  &.btn-outline {
    background: transparent;
    color: #dd2525;
    border: 1px solid #dd2525;
    
    &:hover {
      background: #dd2525;
      color: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 3px 10px rgba(221, 37, 37, 0.3);
    }
  }
  
  i {
    font-size: 0.8rem;
  }
  
  @media (min-width: 640px) {
    gap: 8px;
    padding: 12px 24px;
    font-size: 0.875rem;
    min-width: auto;
    
    &:hover {
      box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
    }
    
    i {
      font-size: 0.875rem;
    }
  }
}

// McKinsey-Style Button System
.btn {
  &.btn-outline {
    background: transparent;
    color: #dd2525;
    border: 2px solid #dd2525;
    
    &:hover {
      background: #dd2525;
      color: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }
  }
}
// McKinsey-Style Responsive Design
@media (max-width: 1024px) {
  .hero-section .hero-container {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  
  .hero-content .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .process-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  
  .executive-action-section .action-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 0;
    
    .hero-container {
      padding: 0 16px;
    }
    
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-actions {
      flex-direction: column;
      align-items: center;
      gap: 12px;
      
      .btn {
        width: 100%;
        max-width: 280px;
        justify-content: center;
      }
    }
    
    .hero-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
  }
  
  .features-section,
  .process-section,
  .stats-section,
  .executive-action-section {
    padding: 80px 0;
  }
  
  .section-title {
    font-size: 2rem !important;
  }
  
  .process-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .executive-action-section {
    .action-title {
      font-size: 2.25rem;
    }
    
    .trust-indicators {
      flex-direction: column;
      gap: 24px;
      align-items: center;
    }
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .hero-section {
    padding: 60px 0;
    
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-stats {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
  
  .features-section,
  .process-section,
  .stats-section,
  .executive-action-section {
    padding: 60px 0;
  }
  
  .executive-action-section {
    .action-card {
      padding: 32px 24px;
    }
    
    .action-title {
      font-size: 1.875rem;
    }
    
    .trust-indicators {
      gap: 20px;
      
      .trust-item {
        font-size: 0.8rem;
      }
    }
  }
}



// Clean McKinsey-Style Design - No Excessive Animations
</style>