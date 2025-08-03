<template>
  <div class="framework-page">
    <!-- Clean Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>Executive Talent Framework</span>
          </div>
          
          <h1 class="hero-title">
            Global Talents Management Framework
          </h1>
          
          <p class="hero-subtitle">
            Comprehensive executive talent assessment and development system based on modern 
            leadership theory and best practices, covering 50 core competency dimensions.
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="downloadFramework">
              <i class="fas fa-download"></i>
              Download Framework
            </button>
            <button class="btn btn-secondary" @click="viewDemo">
              <i class="fas fa-play"></i>
              View Demo
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
              <div class="card-title">Framework Overview</div>
              <div class="card-status">Active</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">Core Dimensions</span>
                <span class="metric-value">5B</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Competencies</span>
                <span class="metric-value">50+</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Success Rate</span>
                <span class="metric-value">85%</span>
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
          <h2 class="section-title">Framework Foundation</h2>
          <p class="section-description">
            Four core pillars that ensure effective talent development and assessment
          </p>
        </div>
        
        <div class="features-grid">
          <div 
            class="feature-card" 
            v-for="(pillar, index) in frameworkPillars" 
            :key="index"
            @click="showPillarDetail(pillar)"
          >
            <div class="feature-icon">
              <i :class="pillar.icon"></i>
            </div>
            
            <div class="feature-content">
              <h3 class="feature-title">{{ pillar.title }}</h3>
              <p class="feature-description">{{ pillar.description }}</p>
              
              <div class="feature-stat">
                <span class="stat-value">{{ pillar.stat?.value || '100%' }}</span>
                <span class="stat-label">{{ pillar.stat?.label || 'Effectiveness' }}</span>
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
          <h2 class="section-title">5B Core Framework</h2>
          <p class="section-description">
            Five key dimensions of executive talent development
          </p>
        </div>
        
        <div class="process-grid">
          <div 
            v-for="(dimension, index) in fiveBDimensions" 
            :key="index" 
            class="process-card"
            @click="showDimensionDetail(dimension)"
          >
            <div class="process-number">{{ dimension.letter }}</div>
            <div class="process-content">
              <h4 class="process-title">{{ dimension.title }}</h4>
              <p class="process-description">{{ dimension.description }}</p>
              <div class="process-duration">{{ dimension.competencies.length }} Competencies</div>
            </div>
            <div class="competencies-preview">
              <div class="competency-tags">
                <span 
                  v-for="competency in dimension.competencies.slice(0, 3)" 
                  :key="competency"
                  class="competency-tag"
                >
                  {{ competency }}
                </span>
                <span v-if="dimension.competencies.length > 3" class="more-tag">
                  +{{ dimension.competencies.length - 3 }} more
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
            <h3 class="stats-title">Implementation Process</h3>
            <p class="stats-subtitle">Standardized approach ensuring effective framework application</p>
          </div>
          
          <div class="stats-grid">
            <div 
              v-for="(phase, index) in implementationPhases" 
              :key="index" 
              class="stat-card implementation-card"
              @click="showPhaseDetail(phase)"
            >
              <div class="stat-icon">
                <div class="phase-number">{{ index + 1 }}</div>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ phase.duration }}</div>
                <div class="stat-label">{{ phase.title }}</div>
                <div class="stat-sublabel">{{ phase.deliverables.length }} deliverables</div>
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
              <i class="fas fa-chart-line"></i>
              <span>Success Metrics</span>
            </div>
            
            <h2 class="action-title">
              Proven Framework Effectiveness
            </h2>
            
            <p class="action-description">
              Measure framework implementation effectiveness through key performance indicators 
              that demonstrate tangible business impact and talent development success.
            </p>
          </div>
          
          <div class="action-grid">
            <div 
              v-for="(metric, index) in successMetrics" 
              :key="index"
              class="action-card metric-action-card"
            >
              <div class="card-header">
                <div class="card-icon">
                  <i :class="metric.icon"></i>
                </div>
                <h3 class="card-title">{{ metric.title }}</h3>
              </div>
              
              <div class="card-content">
                <div class="metric-showcase">
                  <div class="metric-value-large">{{ metric.value }}</div>
                  <p class="card-description">{{ metric.description }}</p>
                </div>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>Validated Results</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-trending-up"></i>
                    <span>Continuous Improvement</span>
                  </div>
                </div>
                
                <button class="action-btn secondary" @click="viewMetricDetails(metric)">
                  <span>View Details</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="trust-indicators">
            <div class="trust-item">
              <i class="fas fa-award"></i>
              <span>Industry Validated</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-users"></i>
              <span>Enterprise Proven</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-chart-bar"></i>
              <span>Data Driven</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-globe"></i>
              <span>Globally Applied</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

export default {
  name: 'Framework',
  setup() {
    const appStore = useAppStore()

    const heroStats = [
      { value: '5B', label: 'Core Dimensions' },
      { value: '50+', label: 'Competencies' },
      { value: '85%', label: 'Success Rate' },
      { value: '92%', label: 'Satisfaction' }
    ]

    const frameworkPillars = [
      {
        icon: 'fas fa-eye',
        title: 'Scientific Assessment',
        description: 'Based on psychology and management theory, using multi-dimensional assessment methods to ensure objectivity and accuracy of results.',
        stat: { value: '360°', label: 'Assessment' }
      },
      {
        icon: 'fas fa-user-cog',
        title: 'Personalized Development',
        description: 'Develop targeted development plans and learning paths based on individual characteristics and organizational needs.',
        stat: { value: '95%', label: 'Customization' }
      },
      {
        icon: 'fas fa-sync-alt',
        title: 'Continuous Improvement',
        description: 'Establish continuous feedback mechanisms, regularly evaluate and adjust development strategies to ensure continuous progress.',
        stat: { value: '24/7', label: 'Monitoring' }
      },
      {
        icon: 'fas fa-users',
        title: 'Organizational Synergy',
        description: 'Combine individual development with organizational goals to achieve win-win personal growth and organizational development.',
        stat: { value: '100%', label: 'Alignment' }
      }
    ]

    const fiveBDimensions = [
      {
        letter: 'B',
        title: 'Business Acumen',
        subtitle: '商业敏锐度',
        description: '理解商业环境、市场动态和组织战略的能力，能够做出明智的商业决策。',
        competencies: [
          '战略思维',
          '市场洞察',
          '财务理解',
          '风险管理',
          '创新思维',
          '客户导向',
          '竞争分析',
          '商业模式理解'
        ]
      },
      {
        letter: 'B',
        title: 'Building Relationships',
        subtitle: '关系建立',
        description: '建立和维护有效关系的能力，包括内部协作和外部合作伙伴关系。',
        competencies: [
          '沟通技巧',
          '影响力',
          '谈判能力',
          '网络建设',
          '跨文化理解',
          '冲突解决',
          '团队协作',
          '利益相关者管理'
        ]
      },
      {
        letter: 'B',
        title: 'Building Teams',
        subtitle: '团队建设',
        description: '组建、发展和领导高效团队的能力，激发团队潜能实现共同目标。',
        competencies: [
          '团队领导',
          '人才识别',
          '授权赋能',
          '绩效管理',
          '教练辅导',
          '激励技巧',
          '文化塑造',
          '变革管理'
        ]
      },
      {
        letter: 'B',
        title: 'Building Self',
        subtitle: '自我建设',
        description: '持续自我发展和完善的能力，包括自我认知、学习能力和适应能力。',
        competencies: [
          '自我认知',
          '情绪管理',
          '学习敏锐度',
          '适应能力',
          '抗压能力',
          '时间管理',
          '决策能力',
          '职业规划'
        ]
      },
      {
        letter: 'B',
        title: 'Building the Business',
        subtitle: '业务建设',
        description: '推动业务增长和组织发展的能力，实现可持续的商业成功。',
        competencies: [
          '执行力',
          '项目管理',
          '流程优化',
          '质量管理',
          '数字化转型',
          '可持续发展',
          '合规管理',
          '价值创造'
        ]
      }
    ]

    const implementationPhases = [
      {
        title: 'Preparation Phase',
        duration: '2-4 weeks',
        description: 'Define assessment objectives, prepare assessment tools, train assessment team.',
        deliverables: [
          'Assessment Plan',
          'Assessment Toolkit',
          'Team Training Materials',
          'Project Kickoff Meeting'
        ]
      },
      {
        title: 'Assessment Phase',
        duration: '4-6 weeks',
        description: 'Execute 360-degree assessment, collect multi-dimensional data.',
        deliverables: [
          'Assessment Data Collection',
          'Data Quality Check',
          'Preliminary Analysis Report',
          'Feedback Collection'
        ]
      },
      {
        title: 'Analysis Phase',
        duration: '2-3 weeks',
        description: 'In-depth analysis of assessment results, generate personalized reports.',
        deliverables: [
          'Individual Assessment Report',
          'Team Analysis Report',
          'Development Recommendations',
          'Action Plan Template'
        ]
      },
      {
        title: 'Development Phase',
        duration: '6-12 months',
        description: 'Implement personalized development plans, continuously track progress.',
        deliverables: [
          'Development Plan Execution',
          'Progress Tracking Report',
          'Periodic Assessment',
          'Adjustment Optimization Plan'
        ]
      }
    ]

    const successMetrics = [
      {
        icon: 'fas fa-chart-line',
        title: 'Capability Enhancement',
        value: '85%',
        description: 'Participants average 85% improvement in core competencies'
      },
      {
        icon: 'fas fa-users',
        title: 'Participation Satisfaction',
        value: '92%',
        description: 'Participant satisfaction with framework implementation reaches 92%'
      },
      {
        icon: 'fas fa-trophy',
        title: 'Promotion Success Rate',
        value: '78%',
        description: '78% promotion success rate for participants completing development plans'
      },
      {
        icon: 'fas fa-building',
        title: 'Organizational Benefits',
        value: '65%',
        description: '65% improvement in overall organizational performance'
      }
    ]

    const downloadFramework = () => {
      appStore.showToast('Download', 'Global Talents Management framework document download started', 'success')
    }

    const viewDemo = () => {
      appStore.showModal({
        title: 'Framework Demo',
        content: 'Interactive framework demo coming soon!',
        type: 'info'
      })
    }

    const showPillarDetail = (pillar) => {
      appStore.showModal({
        title: pillar.title,
        content: pillar.description,
        type: 'info'
      })
    }

    const showDimensionDetail = (dimension) => {
      appStore.showModal({
        title: `${dimension.letter} - ${dimension.title}`,
        content: `${dimension.description}\n\nCore competencies: ${dimension.competencies.join(', ')}`,
        type: 'info'
      })
    }

    const showPhaseDetail = (phase) => {
      appStore.showModal({
        title: phase.title,
        content: `${phase.description}\n\nKey deliverables: ${phase.deliverables.join(', ')}`,
        type: 'info'
      })
    }

    const viewMetricDetails = (metric) => {
      appStore.showModal({
        title: metric.title,
        content: `${metric.description}\n\nCurrent performance: ${metric.value}`,
        type: 'info'
      })
    }

    return {
      heroStats,
      frameworkPillars,
      fiveBDimensions,
      implementationPhases,
      successMetrics,
      downloadFramework,
      viewDemo,
      showPillarDetail,
      showDimensionDetail,
      showPhaseDetail,
      viewMetricDetails
    }
  }
}
</script>

<style lang="scss" scoped>
.framework-page {
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
    
    .competencies-preview {
      .competency-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        
        .competency-tag {
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
      
      &.implementation-card {
        .stat-icon {
          .phase-number {
            width: 56px;
            height: 56px;
            background: #dd2525;
            color: #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 700;
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
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
      margin-bottom: 60px;
    }
    
    .action-card {
      background: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 16px;
      padding: 32px;
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
      
      &.metric-action-card {
        .card-icon {
          background: #f8f9fa;
          color: #495057;
          border: 2px solid #e9ecef;
        }
        
        .metric-showcase {
          text-align: center;
          margin-bottom: 24px;
          
          .metric-value-large {
            font-size: 3rem;
            font-weight: 700;
            color: #dd2525;
            margin-bottom: 8px;
          }
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
          font-size: 1.25rem;
          font-weight: 600;
          color: #212529;
          margin: 0;
          line-height: 1.3;
        }
      }
      
      .card-content {
        .card-description {
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 24px;
          font-size: 0.875rem;
        }
        
        .card-features {
          margin-bottom: 24px;
          
          .feature-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
            
            i {
              color: #dd2525;
              font-size: 0.75rem;
              width: 12px;
            }
            
            span {
              color: #495057;
              font-size: 0.75rem;
              font-weight: 500;
            }
          }
        }
        
        .action-btn {
          width: 100%;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-transform: none;
          
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
            font-size: 0.75rem;
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