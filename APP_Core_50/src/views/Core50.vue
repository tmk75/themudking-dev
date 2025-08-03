<template>
  <div class="core50-page">
    <!-- Clean Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>核心50计划</span>
          </div>
          
          <h1 class="hero-title">
            Core 50 关键岗位计划
          </h1>
          
          <p class="hero-subtitle">
            识别和发展组织中最关键的50个岗位，确保关键人才供应链的稳定性和可持续性，
            为企业战略目标的实现提供强有力的人才保障。
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="startPositionMapping">
              开始岗位识别
            </button>
            <button class="btn btn-secondary" @click="viewMethodology">
              <i class="fas fa-book"></i>
              查看方法论
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
              <div class="card-title">关键岗位分布</div>
              <div class="card-status">实时</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">战略岗位</span>
                <span class="metric-value">15</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">运营岗位</span>
                <span class="metric-value">25</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">支持岗位</span>
                <span class="metric-value">10</span>
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
          <h2 class="section-title">Core 50 核心要素</h2>
          <p class="section-description">
            基于业务影响力和人才稀缺性的关键岗位识别与管理体系
          </p>
        </div>
        
        <div class="features-grid">
          <div 
            class="feature-card" 
            v-for="(element, index) in coreElements" 
            :key="index"
            @click="showElementDetail(element)"
          >
            <div class="feature-icon">
              <i :class="element.icon"></i>
            </div>
            
            <div class="feature-content">
              <h3 class="feature-title">{{ element.title }}</h3>
              <p class="feature-description">{{ element.description }}</p>
              
              <div class="feature-stat">
                <span class="stat-value">{{ element.stat.value }}</span>
                <span class="stat-label">{{ element.stat.label }}</span>
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
          <h2 class="section-title">岗位识别方法论</h2>
          <p class="section-description">
            科学的关键岗位识别和评估流程
          </p>
        </div>
        
        <div class="process-grid">
          <div 
            v-for="(step, index) in identificationSteps" 
            :key="index" 
            class="process-card"
            @click="showStepDetail(step)"
          >
            <div class="process-number">{{ index + 1 }}</div>
            <div class="process-content">
              <h4 class="process-title">{{ step.title }}</h4>
              <p class="process-description">{{ step.description }}</p>
              <div class="process-duration">{{ step.criteria }}</div>
            </div>
            <div class="step-preview">
              <div class="criteria-tags">
                <span 
                  v-for="criterion in step.keyFactors.slice(0, 2)" 
                  :key="criterion"
                  class="criteria-tag"
                >
                  {{ criterion }}
                </span>
                <span v-if="step.keyFactors.length > 2" class="more-tag">
                  +{{ step.keyFactors.length - 2 }} 更多
                </span>
              </div>
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
            <h3 class="stats-title">岗位分类体系</h3>
            <p class="stats-subtitle">基于业务影响和人才稀缺性的四象限分类</p>
          </div>
          
          <div class="stats-grid">
            <div 
              v-for="(category, index) in positionCategories" 
              :key="index" 
              class="stat-card category-card"
              @click="showCategoryDetail(category)"
            >
              <div class="stat-icon">
                <div class="category-icon" :class="category.type">
                  <i :class="category.icon"></i>
                </div>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ category.count }}</div>
                <div class="stat-label">{{ category.title }}</div>
                <div class="stat-sublabel">{{ category.description }}</div>
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
              <i class="fas fa-target"></i>
              <span>实施策略</span>
            </div>
            
            <h2 class="action-title">
              构建关键岗位人才供应链
            </h2>
            
            <p class="action-description">
              通过系统性的关键岗位识别和人才发展策略，
              确保组织核心业务的人才供应链稳定性和可持续性。
            </p>
          </div>
          
          <div class="action-grid">
            <div class="action-card primary-action">
              <div class="card-header">
                <div class="card-icon">
                  <i class="fas fa-search"></i>
                </div>
                <h3 class="card-title">岗位识别评估</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  开始系统性的关键岗位识别和评估流程
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>业务影响力分析</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>人才稀缺性评估</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>继任风险分析</span>
                  </div>
                </div>
                
                <button class="action-btn primary" @click="startPositionMapping">
                  <span>开始评估</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
            
            <div class="action-card secondary-action">
              <div class="card-header">
                <div class="card-icon">
                  <i class="fas fa-users-cog"></i>
                </div>
                <h3 class="card-title">人才发展计划</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  为关键岗位制定针对性的人才发展策略
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>继任者培养</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>能力发展路径</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>风险缓解措施</span>
                  </div>
                </div>
                
                <button class="action-btn secondary" @click="viewDevelopmentPlan">
                  <span>查看计划</span>
                  <i class="fas fa-chart-line"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="trust-indicators">
            <div class="trust-item">
              <i class="fas fa-shield-alt"></i>
              <span>风险管控</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-chart-bar"></i>
              <span>数据驱动</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-sync-alt"></i>
              <span>持续优化</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-award"></i>
              <span>最佳实践</span>
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
  name: 'Core50',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()

    const heroStats = [
      { value: '50', label: '关键岗位' },
      { value: '4', label: '分类维度' },
      { value: '90%', label: '覆盖率' },
      { value: '85%', label: '准确性' }
    ]

    const coreElements = [
      {
        icon: 'fas fa-bullseye',
        title: '业务影响力',
        description: '评估岗位对组织战略目标实现和业务成果的直接影响程度',
        stat: { value: '高影响', label: '战略关键' }
      },
      {
        icon: 'fas fa-gem',
        title: '人才稀缺性',
        description: '分析岗位所需技能的市场稀缺程度和替代难度',
        stat: { value: '稀缺技能', label: '难以替代' }
      },
      {
        icon: 'fas fa-network-wired',
        title: '组织网络',
        description: '考量岗位在组织网络中的连接度和影响范围',
        stat: { value: '网络中心', label: '关键节点' }
      },
      {
        icon: 'fas fa-clock',
        title: '继任风险',
        description: '评估岗位空缺对业务连续性的影响和继任准备情况',
        stat: { value: '高风险', label: '需要关注' }
      }
    ]

    const identificationSteps = [
      {
        title: '业务分析',
        description: '分析组织战略、业务模式和价值链，识别关键业务环节',
        criteria: '战略一致性',
        keyFactors: ['战略目标', '价值创造', '业务流程', '核心能力']
      },
      {
        title: '岗位映射',
        description: '将业务关键环节映射到具体岗位，建立岗位-业务关联矩阵',
        criteria: '业务关联度',
        keyFactors: ['职责范围', '决策权限', '业务贡献', '影响范围']
      },
      {
        title: '影响评估',
        description: '评估每个岗位对业务成果的直接和间接影响程度',
        criteria: '影响程度',
        keyFactors: ['收入影响', '成本影响', '风险影响', '创新影响']
      },
      {
        title: '稀缺性分析',
        description: '分析岗位所需技能的市场供给情况和获取难度',
        criteria: '获取难度',
        keyFactors: ['技能稀缺性', '经验要求', '培养周期', '市场竞争']
      },
      {
        title: '综合评定',
        description: '综合业务影响和人才稀缺性，确定最终的Core 50岗位清单',
        criteria: '综合评分',
        keyFactors: ['影响权重', '稀缺权重', '风险评估', '优先级排序']
      }
    ]

    const positionCategories = [
      {
        type: 'strategic',
        icon: 'fas fa-crown',
        title: '战略核心岗位',
        description: '高影响 + 高稀缺',
        count: '15',
        priority: '最高优先级'
      },
      {
        type: 'operational',
        icon: 'fas fa-cogs',
        title: '运营关键岗位',
        description: '高影响 + 中稀缺',
        count: '20',
        priority: '高优先级'
      },
      {
        type: 'specialist',
        icon: 'fas fa-user-graduate',
        title: '专业稀缺岗位',
        description: '中影响 + 高稀缺',
        count: '10',
        priority: '中优先级'
      },
      {
        type: 'support',
        icon: 'fas fa-hands-helping',
        title: '重要支持岗位',
        description: '中影响 + 中稀缺',
        count: '5',
        priority: '关注岗位'
      }
    ]

    const startPositionMapping = () => {
      appStore.showModal({
        title: '开始岗位识别',
        content: '即将启动Core 50关键岗位识别流程，这将帮助您系统性地识别组织中最关键的50个岗位。',
        type: 'info'
      })
    }

    const viewMethodology = () => {
      appStore.showModal({
        title: '方法论详情',
        content: 'Core 50方法论基于业务影响力和人才稀缺性两个维度，通过科学的评估流程识别关键岗位。',
        type: 'info'
      })
    }

    const showElementDetail = (element) => {
      appStore.showModal({
        title: element.title,
        content: element.description,
        type: 'info'
      })
    }

    const showStepDetail = (step) => {
      appStore.showModal({
        title: step.title,
        content: `${step.description}\n\n关键因素：${step.keyFactors.join('、')}`,
        type: 'info'
      })
    }

    const showCategoryDetail = (category) => {
      appStore.showModal({
        title: category.title,
        content: `${category.description}\n\n岗位数量：${category.count}\n优先级：${category.priority}`,
        type: 'info'
      })
    }

    const viewDevelopmentPlan = () => {
      appStore.showToast('导航', '跳转到人才发展计划页面', 'info')
    }

    return {
      heroStats,
      coreElements,
      identificationSteps,
      positionCategories,
      startPositionMapping,
      viewMethodology,
      showElementDetail,
      showStepDetail,
      showCategoryDetail,
      viewDevelopmentPlan
    }
  }
}
</script>

<style lang="scss" scoped>
.core50-page {
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
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  
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

// Features Section
.features-section {
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
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  
  .feature-card {
    background: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 40px;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      border-color: #dd2525;
      box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
      transform: translateY(-4px);
    }
    
    .feature-icon {
      width: 56px;
      height: 56px;
      background: #dd2525;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      
      i {
        font-size: 1.5rem;
        color: #ffffff;
      }
    }
    
    .feature-content {
      .feature-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #212529;
        margin-bottom: 12px;
      }
      
      .feature-description {
        color: #6c757d;
        line-height: 1.6;
        margin-bottom: 24px;
      }
      
      .feature-stat {
        display: flex;
        align-items: baseline;
        gap: 8px;
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #dd2525;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #6c757d;
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 32px;
  }
  
  .process-card {
    background: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 32px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      border-color: #dd2525;
      box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
      transform: translateY(-4px);
    }
    
    .process-number {
      width: 64px;
      height: 64px;
      background: #dd2525;
      color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 auto 24px;
    }
    
    .process-content {
      margin-bottom: 24px;
      
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
    
    .step-preview {
      .criteria-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        
        .criteria-tag {
          background: #f8f9fa;
          color: #495057;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .more-tag {
          background: #dd2525;
          color: #ffffff;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
        }
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
      cursor: pointer;
      
      &:hover {
        border-color: #dd2525;
        box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
        transform: translateY(-4px);
      }
      
      &.category-card {
        .stat-icon {
          .category-icon {
            width: 56px;
            height: 56px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: #ffffff;
            
            &.strategic {
              background: #dd2525;
            }
            
            &.operational {
              background: #28a745;
            }
            
            &.specialist {
              background: #17a2b8;
            }
            
            &.support {
              background: #ffc107;
              color: #212529;
            }
          }
        }
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
          margin-bottom: 4px;
        }
        
        .stat-sublabel {
          font-size: 0.75rem;
          color: #adb5bd;
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
      background: #c41e1e;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
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
      box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
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

  .features-section .features-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .process-section .process-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .stats-section .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  .executive-action-section .action-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 0;
    
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
  }

  .features-section,
  .process-section,
  .stats-section,
  .executive-action-section {
    padding: 80px 0;
  }

  .section-title,
  .stats-title,
  .action-title {
    font-size: 2rem;
  }

  .process-section .process-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .stats-section .stats-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .executive-action-section .trust-indicators {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 0;
    
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-stats {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .hero-actions {
      flex-direction: column;
      width: 100%;
      
      .btn {
        width: 100%;
        justify-content: center;
      }
    }
  }

  .features-section,
  .process-section,
  .stats-section,
  .executive-action-section {
    padding: 60px 0;
  }

  .container {
    padding: 0 16px;
  }

  .section-title,
  .stats-title,
  .action-title {
    font-size: 1.75rem;
  }

  .feature-card,
  .process-card,
  .stat-card,
  .action-card {
    padding: 24px;
  }

  .executive-action-section .trust-indicators {
    grid-template-columns: 1fr;
    gap: 16px;
    text-align: center;
  }
}
</style>