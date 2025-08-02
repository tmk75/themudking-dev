<template>
  <div class="five-b-page">
    <!-- Clean Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>5B 领导力框架</span>
          </div>
          
          <h1 class="hero-title">
            5B 核心能力体系
          </h1>
          
          <p class="hero-subtitle">
            Build（建设）、Bind（联结）、Borrow（借鉴）、Buy（购买）、Bounce（反弹）
            - 全面构建卓越领导力的五大核心维度
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="startAssessment">
              开始评估
            </button>
            <button class="btn btn-secondary" @click="learnMore">
              <i class="fas fa-book"></i>
              了解更多
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
              <div class="card-title">5B 能力雷达图</div>
              <div class="card-status">实时</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">Build 建设能力</span>
                <span class="metric-value">85%</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Bind 联结能力</span>
                <span class="metric-value">92%</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Borrow 借鉴能力</span>
                <span class="metric-value">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>    <
!-- 5B Dimensions Section -->
    <section class="dimensions-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">五大核心维度</h2>
          <p class="section-description">
            深入了解5B框架的每个维度及其核心能力要求
          </p>
        </div>
        
        <div class="dimensions-grid">
          <div 
            class="dimension-card" 
            v-for="(dimension, index) in fiveBDimensions" 
            :key="index"
            @click="showDimensionDetail(dimension)"
          >
            <div class="dimension-header">
              <div class="dimension-icon">
                <i :class="dimension.icon"></i>
              </div>
              <div class="dimension-info">
                <h3 class="dimension-title">{{ dimension.title }}</h3>
                <p class="dimension-subtitle">{{ dimension.subtitle }}</p>
              </div>
            </div>
            
            <div class="dimension-content">
              <p class="dimension-description">{{ dimension.description }}</p>
              
              <div class="competencies-list">
                <h4>核心能力</h4>
                <ul>
                  <li v-for="competency in dimension.competencies.slice(0, 4)" :key="competency">
                    <i class="fas fa-check"></i>
                    {{ competency }}
                  </li>
                </ul>
              </div>
              
              <div class="dimension-score">
                <div class="score-label">平均得分</div>
                <div class="score-value">{{ dimension.score }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>    <!
-- Implementation Process Section -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">实施流程</h2>
          <p class="section-description">
            系统化的5B能力发展路径
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
            <h3 class="stats-title">成功案例数据</h3>
            <p class="stats-subtitle">基于5B框架的领导力发展成果</p>
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
              <i class="fas fa-star"></i>
              <span>5B 能力提升</span>
            </div>
            
            <h2 class="action-title">
              开启您的5B领导力之旅
            </h2>
            
            <p class="action-description">
              通过科学的评估和个性化的发展计划，全面提升您在Build、Bind、Borrow、Buy、Bounce五个维度的领导能力。
            </p>
          </div>
          
          <div class="action-grid">
            <div class="action-card primary-action">
              <div class="card-header">
                <div class="card-icon">
                  <i class="fas fa-chart-bar"></i>
                </div>
                <h3 class="card-title">5B 能力评估</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  全面评估您在五个维度的当前能力水平
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>50项核心能力评估</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>360度反馈收集</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>个性化报告生成</span>
                  </div>
                </div>
                
                <button class="action-btn primary" @click="startAssessment">
                  <span>开始评估</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
            
            <div class="action-card secondary-action">
              <div class="card-header">
                <div class="card-icon">
                  <i class="fas fa-graduation-cap"></i>
                </div>
                <h3 class="card-title">发展计划定制</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  基于评估结果制定个性化的能力发展路径
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>个性化学习路径</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>专业导师指导</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>进度跟踪分析</span>
                  </div>
                </div>
                
                <button class="action-btn secondary" @click="createPlan">
                  <span>制定计划</span>
                  <i class="fas fa-cog"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="trust-indicators">
            <div class="trust-item">
              <i class="fas fa-award"></i>
              <span>权威认证</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-users"></i>
              <span>专家团队</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-chart-line"></i>
              <span>持续改进</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-shield-alt"></i>
              <span>数据安全</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'FiveB',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()

    const heroStats = [
      { value: '5', label: '核心维度' },
      { value: '50+', label: '能力指标' },
      { value: '95%', label: '准确率' },
      { value: '1000+', label: '成功案例' }
    ]

    const fiveBDimensions = [
      {
        title: 'Build 建设',
        subtitle: '构建与创造',
        icon: 'fas fa-hammer',
        description: '构建团队、系统和流程的能力，创造价值和推动创新的核心技能。',
        competencies: [
          '团队建设', '系统构建', '流程优化', '创新推动',
          '价值创造', '组织发展', '文化塑造', '变革管理'
        ],
        score: 85
      },
      {
        title: 'Bind 联结',
        subtitle: '连接与协作',
        icon: 'fas fa-link',
        description: '建立关系、促进协作和增强团队凝聚力的能力。',
        competencies: [
          '关系建立', '团队协作', '沟通协调', '冲突解决',
          '网络构建', '合作伙伴关系', '跨部门协作', '文化融合'
        ],
        score: 92
      },
      {
        title: 'Borrow 借鉴',
        subtitle: '学习与借鉴',
        icon: 'fas fa-book-open',
        description: '从他人经验中学习，借鉴最佳实践和成功模式的能力。',
        competencies: [
          '最佳实践学习', '标杆管理', '知识转移', '经验总结',
          '外部学习', '行业洞察', '趋势分析', '持续改进'
        ],
        score: 78
      },
      {
        title: 'Buy 购买',
        subtitle: '资源获取',
        icon: 'fas fa-shopping-cart',
        description: '识别、获取和整合外部资源以实现目标的能力。',
        competencies: [
          '资源识别', '供应商管理', '采购决策', '成本控制',
          '外包管理', '合作伙伴选择', '投资决策', '资源整合'
        ],
        score: 88
      },
      {
        title: 'Bounce 反弹',
        subtitle: '韧性与恢复',
        icon: 'fas fa-sync-alt',
        description: '面对挫折和挑战时的恢复能力，以及从失败中学习的韧性。',
        competencies: [
          '抗压能力', '危机管理', '快速恢复', '适应变化',
          '失败学习', '心理韧性', '团队激励', '持续优化'
        ],
        score: 81
      }
    ] 
   const processSteps = [
      {
        title: '能力评估',
        description: '通过360度评估全面了解当前5B能力水平',
        duration: '2-3周'
      },
      {
        title: '差距分析',
        description: '识别能力差距，明确发展重点和优先级',
        duration: '1周'
      },
      {
        title: '计划制定',
        description: '制定个性化的5B能力发展计划和学习路径',
        duration: '1-2周'
      },
      {
        title: '实施跟踪',
        description: '执行发展计划，持续跟踪进展和效果评估',
        duration: '持续进行'
      }
    ]

    const statistics = [
      { icon: 'fas fa-users', value: '1,200+', label: '参与领导者' },
      { icon: 'fas fa-chart-line', value: '89%', label: '能力提升率' },
      { icon: 'fas fa-trophy', value: '95%', label: '满意度' },
      { icon: 'fas fa-building', value: '200+', label: '合作企业' }
    ]

    const startAssessment = () => {
      router.push('/assessment')
    }

    const learnMore = () => {
      appStore.showModal({
        title: '5B框架详解',
        content: '5B框架是一个全面的领导力发展模型，涵盖Build（建设）、Bind（联结）、Borrow（借鉴）、Buy（购买）、Bounce（反弹）五个核心维度。',
        type: 'info'
      })
    }

    const showDimensionDetail = (dimension) => {
      appStore.showModal({
        title: `${dimension.title} - ${dimension.subtitle}`,
        content: `${dimension.description}\n\n核心能力包括：${dimension.competencies.join('、')}`,
        type: 'info'
      })
    }

    const createPlan = () => {
      appStore.showModal({
        title: '发展计划定制',
        content: '我们将根据您的评估结果，为您量身定制个性化的5B能力发展计划。',
        type: 'success'
      })
    }

    return {
      heroStats,
      fiveBDimensions,
      processSteps,
      statistics,
      startAssessment,
      learnMore,
      showDimensionDetail,
      createPlan
    }
  }
}
</script>

<style lang="scss" scoped>
.five-b-page {
  background: #ffffff;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

// Hero Section
.hero-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  
  .hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
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
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.1;
      color: #212529;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.6;
      color: #6c757d;
      margin-bottom: 40px;
      max-width: 500px;
    }
    
    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 60px;
    }
    
    .hero-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      
      .stat-item {
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 4px;
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

// Dimensions Section
.dimensions-section {
  padding: 120px 0;
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #212529;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    
    .section-description {
      font-size: 1.125rem;
      color: #6c757d;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .dimensions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
  }
  
  .dimension-card {
    background: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 32px;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      border-color: #dd2525;
      box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
      transform: translateY(-4px);
    }
    
    .dimension-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 24px;
    }
    
    .dimension-icon {
      width: 56px;
      height: 56px;
      background: #dd2525;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      i {
        font-size: 1.5rem;
        color: #ffffff;
      }
    }
    
    .dimension-info {
      flex: 1;
    }
    
    .dimension-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #212529;
      margin-bottom: 4px;
    }
    
    .dimension-subtitle {
      color: #6c757d;
      font-size: 0.875rem;
    }
    
    .dimension-content {
      .dimension-description {
        color: #6c757d;
        line-height: 1.6;
        margin-bottom: 24px;
      }
      
      .competencies-list {
        margin-bottom: 24px;
        
        h4 {
          color: #212529;
          font-size: 1rem;
          margin-bottom: 12px;
          font-weight: 600;
        }
        
        ul {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        
        li {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6c757d;
          font-size: 0.875rem;
          
          i {
            color: #dd2525;
            font-size: 0.75rem;
          }
        }
      }
      
      .dimension-score {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        background: #f8f9fa;
        border-radius: 8px;
        
        .score-label {
          color: #6c757d;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .score-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #dd2525;
        }
      }
    }
  }
}

// Process Section
.process-section {
  padding: 120px 0;
  background: #fafafa;
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #212529;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    
    .section-description {
      font-size: 1.125rem;
      color: #6c757d;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .process-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }
  
  .process-card {
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
    
    .process-number {
      width: 48px;
      height: 48px;
      background: #dd2525;
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 auto 24px;
    }
    
    .process-content {
      .process-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #212529;
        margin-bottom: 12px;
      }
      
      .process-description {
        color: #6c757d;
        line-height: 1.6;
        margin-bottom: 16px;
        font-size: 0.875rem;
      }
      
      .process-duration {
        font-size: 0.75rem;
        color: #dd2525;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }
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
        border-color: #007bff;
        box-shadow: 0 8px 25px rgba(0, 123, 255, 0.1);
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

// Button Styles
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  
  &.btn-primary {
    background: #dd2525;
    color: #ffffff;
    
    &:hover {
      background: #b91c1c;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
    }
  }
  
  &.btn-secondary {
    background: #ffffff;
    color: #dd2525;
    border: 2px solid #dd2525;
    
    &:hover {
      background: #5a6268;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
    }
  }
  
  i {
    font-size: 0.875rem;
  }
}

// Responsive Design
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
  
  .dimensions-grid {
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
  
  .dimensions-section,
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
  
  .dimensions-grid .dimension-card .competencies-list ul {
    grid-template-columns: 1fr;
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
  
  .dimensions-section,
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
</style>