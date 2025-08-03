<template>
  <div class="framework-page">
    <!-- Clean Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>高管人才框架</span>
          </div>
          
          <h1 class="hero-title">
            全球人才管理框架
          </h1>
          
          <p class="hero-subtitle">
            基于现代领导力理论和最佳实践的综合性高管人才评估与发展系统，
            涵盖50个核心能力维度。
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="downloadFramework">
              <i class="fas fa-download"></i>
              下载框架
            </button>
            <button class="btn btn-secondary" @click="viewDemo">
              <i class="fas fa-play"></i>
              查看演示
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
              <div class="card-title">框架概览</div>
              <div class="card-status">活跃</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">核心维度</span>
                <span class="metric-value">5B</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">能力项</span>
                <span class="metric-value">50+</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">成功率</span>
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
          <h2 class="section-title">框架基础</h2>
          <p class="section-description">
            确保有效人才发展和评估的四大核心支柱
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
          <h2 class="section-title">5B核心框架</h2>
          <p class="section-description">
            高管人才发展的五个关键维度
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
              <div class="process-duration">{{ dimension.competencies.length }} 项能力</div>
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
                  +{{ dimension.competencies.length - 3 }} 更多
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
            <h3 class="stats-title">实施流程</h3>
            <p class="stats-subtitle">确保框架有效应用的标准化方法</p>
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
                <div class="stat-sublabel">{{ phase.deliverables.length }} 项交付物</div>
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
              <span>成功指标</span>
            </div>
            
            <h2 class="action-title">
              验证框架有效性
            </h2>
            
            <p class="action-description">
              通过关键绩效指标衡量框架实施效果，
              展示切实的业务影响和人才发展成功。
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
                    <span>验证结果</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-trending-up"></i>
                    <span>持续改进</span>
                  </div>
                </div>
                
                <button class="action-btn secondary" @click="viewMetricDetails(metric)">
                  <span>查看详情</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="trust-indicators">
            <div class="trust-item">
              <i class="fas fa-award"></i>
              <span>行业验证</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-users"></i>
              <span>企业验证</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-chart-bar"></i>
              <span>数据驱动</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-globe"></i>
              <span>全球应用</span>
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
      { value: '5B', label: '核心维度' },
      { value: '50+', label: '能力项' },
      { value: '85%', label: '成功率' },
      { value: '92%', label: '满意度' }
    ]

    const frameworkPillars = [
      {
        icon: 'fas fa-eye',
        title: '科学评估',
        description: '基于心理学和管理学理论，采用多维度评估方法，确保结果的客观性和准确性。',
        stat: { value: '360°', label: '评估' }
      },
      {
        icon: 'fas fa-user-cog',
        title: '个性化发展',
        description: '基于个人特点和组织需求，制定针对性的发展计划和学习路径。',
        stat: { value: '95%', label: '定制化' }
      },
      {
        icon: 'fas fa-sync-alt',
        title: '持续改进',
        description: '建立持续反馈机制，定期评估和调整发展策略，确保持续进步。',
        stat: { value: '24/7', label: '监控' }
      },
      {
        icon: 'fas fa-users',
        title: '组织协同',
        description: '将个人发展与组织目标相结合，实现个人成长与组织发展的双赢。',
        stat: { value: '100%', label: '一致性' }
      }
    ]

    const fiveBDimensions = [
      {
        letter: 'B',
        title: '商业敏锐度',
        subtitle: 'Business Acumen',
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
        title: '关系建立',
        subtitle: 'Building Relationships',
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
        title: '团队建设',
        subtitle: 'Building Teams',
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
        title: '自我建设',
        subtitle: 'Building Self',
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
        title: '业务建设',
        subtitle: 'Building the Business',
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
        title: '准备阶段',
        duration: '2-4周',
        description: '定义评估目标，准备评估工具，培训评估团队。',
        deliverables: [
          '评估计划',
          '评估工具包',
          '团队培训材料',
          '项目启动会议'
        ]
      },
      {
        title: '评估阶段',
        duration: '4-6周',
        description: '执行360度评估，收集多维度数据。',
        deliverables: [
          '评估数据收集',
          '数据质量检查',
          '初步分析报告',
          '反馈收集'
        ]
      },
      {
        title: '分析阶段',
        duration: '2-3周',
        description: '深入分析评估结果，生成个性化报告。',
        deliverables: [
          '个人评估报告',
          '团队分析报告',
          '发展建议',
          '行动计划模板'
        ]
      },
      {
        title: '发展阶段',
        duration: '6-12个月',
        description: '实施个性化发展计划，持续跟踪进度。',
        deliverables: [
          '发展计划执行',
          '进度跟踪报告',
          '定期评估',
          '调整优化方案'
        ]
      }
    ]

    const successMetrics = [
      {
        icon: 'fas fa-chart-line',
        title: '能力提升',
        value: '85%',
        description: '参与者核心能力平均提升85%'
      },
      {
        icon: 'fas fa-users',
        title: '参与满意度',
        value: '92%',
        description: '参与者对框架实施的满意度达到92%'
      },
      {
        icon: 'fas fa-trophy',
        title: '晋升成功率',
        value: '78%',
        description: '完成发展计划的参与者晋升成功率为78%'
      },
      {
        icon: 'fas fa-building',
        title: '组织效益',
        value: '65%',
        description: '整体组织绩效提升65%'
      }
    ]

    const downloadFramework = () => {
      appStore.showToast('下载', '全球人才管理框架文档下载已开始', 'success')
    }

    const viewDemo = () => {
      appStore.showModal({
        title: '框架演示',
        content: '交互式框架演示即将推出！',
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
        content: `${dimension.description}\n\n核心能力：${dimension.competencies.join('、')}`,
        type: 'info'
      })
    }

    const showPhaseDetail = (phase) => {
      appStore.showModal({
        title: phase.title,
        content: `${phase.description}\n\n关键交付物：${phase.deliverables.join('、')}`,
        type: 'info'
      })
    }

    const viewMetricDetails = (metric) => {
      appStore.showModal({
        title: metric.title,
        content: `${metric.description}\n\n当前表现：${metric.value}`,
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