<template>
  <div class="assessment-page">
    <!-- Clean Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>评估中心</span>
          </div>
          
          <h1 class="hero-title">
            360° 全面评估
          </h1>
          
          <p class="hero-subtitle">
            Multi-dimensional leadership evaluation system providing comprehensive insights 
            into executive capabilities and development opportunities.
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="startNewAssessment">
              <i class="fas fa-plus"></i>
              开始评估
            </button>
            <button class="btn btn-secondary" @click="viewHistory">
              <i class="fas fa-history"></i>
              查看历史
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
              <div class="card-title">评估概览</div>
              <div class="card-status">Active</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">总评估数</span>
                <span class="metric-value">{{ overviewCards[0]?.value || '0' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">进行中</span>
                <span class="metric-value">{{ overviewCards[1]?.value || '0' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">完成率</span>
                <span class="metric-value">87%</span>
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
          <h2 class="section-title">评估概览</h2>
          <p class="section-description">
            实时洞察您的评估活动和进展
          </p>
        </div>
        
        <div class="features-grid">
          <div 
            class="feature-card" 
            v-for="(card, index) in overviewCards" 
            :key="index"
            @click="handleCardClick(card)"
          >
            <div class="feature-icon">
              <i :class="card.icon"></i>
            </div>
            
            <div class="feature-content">
              <h3 class="feature-title">{{ card.title }}</h3>
              <p class="feature-description">{{ card.description }}</p>
              
              <div class="feature-stat">
                <span class="stat-value">{{ card.value }}</span>
                <span class="stat-label">{{ card.type }}</span>
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
          <h2 class="section-title">评估类型</h2>
          <p class="section-description">
            选择合适的评估类型开始您的领导力发展之旅
          </p>
        </div>
        
        <div class="process-grid">
          <div 
            v-for="(type, index) in assessmentTypes" 
            :key="index" 
            class="process-card"
            @click="selectAssessmentType(type)"
          >
            <div class="process-number">{{ index + 1 }}</div>
            <div class="process-content">
              <h4 class="process-title">{{ type.title }}</h4>
              <p class="process-description">{{ type.description }}</p>
              <div class="process-duration">{{ type.duration }}</div>
            </div>
            <div class="assessment-preview">
              <div class="feature-tags">
                <span 
                  v-for="feature in type.features.slice(0, 2)" 
                  :key="feature"
                  class="feature-tag"
                >
                  {{ feature }}
                </span>
                <span v-if="type.features.length > 2" class="more-tag">
                  +{{ type.features.length - 2 }} more
                </span>
              </div>
              <div class="participants-preview">
                <span class="participants-count">{{ type.participants.length }} participants</span>
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
            <h3 class="stats-title">最近评估</h3>
            <p class="stats-subtitle">Current assessment activities and participant progress</p>
            <div class="stats-actions">
              <button class="btn btn-outline" @click="viewAllAssessments">
                <span>查看所有评估</span>
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          
          <div class="stats-grid">
            <div 
              v-for="assessment in recentAssessments.slice(0, 4)" 
              :key="assessment.id"
              class="stat-card assessment-stat-card"
              @click="viewAssessment(assessment)"
            >
              <div class="stat-icon assessment-avatar-icon">
                <img :src="assessment.avatar" :alt="assessment.name">
                <div class="assessment-status-dot" :class="assessment.status"></div>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ assessment.progress }}%</div>
                <div class="stat-label">{{ assessment.name }}</div>
                <div class="stat-sublabel">{{ assessment.role }}</div>
              </div>
              <div class="assessment-quick-actions">
                <button class="btn btn-outline btn-xs" @click.stop="viewAssessment(assessment)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-primary btn-xs" @click.stop="editAssessment(assessment)">
                  <i class="fas fa-edit"></i>
                </button>
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
              <span>评估分析</span>
            </div>
            
            <h2 class="action-title">
              通过评估推动卓越
            </h2>
            
            <p class="action-description">
              Transform your organization's leadership capabilities with comprehensive 
              360-degree assessments and data-driven development insights.
            </p>
          </div>
          
          <div class="action-grid">
            <div class="action-card primary-action">
              <div class="card-header">
                <div class="card-icon">
                  <i class="fas fa-play"></i>
                </div>
                <h3 class="card-title">开始新评估</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  Begin comprehensive leadership evaluation process
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>360° 多源反馈</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>50+ competency dimensions</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>Personalized insights</span>
                  </div>
                </div>
                
                <button class="action-btn primary" @click="startNewAssessment">
                  <span>创建评估</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
            
            <div class="action-card secondary-action">
              <div class="card-header">
                <div class="card-icon">
                  <i class="fas fa-chart-bar"></i>
                </div>
                <h3 class="card-title">分析仪表盘</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  查看全面的评估分析和趋势
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>Progress tracking</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>Comparative analysis</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>Trend insights</span>
                  </div>
                </div>
                
                <button class="action-btn secondary" @click="viewAnalytics">
                  <span>查看分析</span>
                  <i class="fas fa-chart-line"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="trust-indicators">
            <div class="trust-item">
              <i class="fas fa-shield-alt"></i>
              <span>安全保密</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-users"></i>
              <span>多源反馈</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-chart-line"></i>
              <span>数据驱动洞察</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-award"></i>
              <span>行业验证</span>
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
  name: 'Assessment',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()

    const heroStats = [
      { value: '156', label: '总评估数' },
      { value: '23', label: '进行中' },
      { value: '87%', label: '完成率' },
      { value: '95%', label: '满意度' }
    ]

    const overviewCards = [
      {
        type: 'total',
        icon: 'fas fa-clipboard-list',
        title: '总评估数',
        value: '156',
        description: '已完成的评估总数'
      },
      {
        type: 'active',
        icon: 'fas fa-play-circle',
        title: '进行中',
        value: '23',
        description: '当前正在进行的评估'
      },
      {
        type: 'pending',
        icon: 'fas fa-clock',
        title: '待开始',
        value: '8',
        description: '计划中但未开始的评估'
      },
      {
        type: 'completed',
        icon: 'fas fa-check-circle',
        title: '本月完成',
        value: '12',
        description: '本月已完成的评估'
      }
    ]

    const assessmentTypes = [
      {
        id: 'full-360',
        title: '完整360度评估',
        duration: '4-6周',
        estimatedTime: '20-25小时',
        icon: 'fas fa-users',
        description: '全方位、多角度的综合评估，包含自评、上级评估、同级评估和下级评估，涵盖所有50个核心能力维度。',
        features: [
          '50个核心能力维度评估',
          '多角度反馈收集',
          '详细分析报告',
          '个性化发展建议',
          '行动计划制定'
        ],
        participants: ['自评', '上级', '同级', '下级', '客户']
      },
      {
        id: 'quick-assessment',
        title: '快速评估',
        duration: '1-2周',
        estimatedTime: '8-10小时',
        icon: 'fas fa-tachometer-alt',
        description: '针对关键能力维度的快速评估，适合定期检查和跟踪发展进度。',
        features: [
          '20个关键能力维度',
          '简化评估流程',
          '快速反馈报告',
          '重点发展建议'
        ],
        participants: ['自评', '直接上级']
      },
      {
        id: 'leadership-focus',
        title: '领导力专项评估',
        duration: '3-4周',
        estimatedTime: '15-18小时',
        icon: 'fas fa-crown',
        description: '专注于领导力核心能力的深度评估，适合高级管理人员和领导岗位候选人。',
        features: [
          '领导力核心维度',
          '情境化评估',
          '领导风格分析',
          '团队影响力评估'
        ],
        participants: ['自评', '上级', '团队成员']
      },
      {
        id: 'team-assessment',
        title: '团队评估',
        duration: '2-3周',
        estimatedTime: '12-15小时',
        icon: 'fas fa-users-cog',
        description: '针对整个团队的协作能力和团队动力评估，了解团队整体表现。',
        features: [
          '团队协作能力',
          '沟通效率评估',
          '团队文化分析',
          '集体发展建议'
        ],
        participants: ['团队成员', '团队领导']
      }
    ]

    const recentAssessments = ref([
      {
        id: 1,
        name: 'Carol Wen',
        role: '销售总监',
        avatar: 'https://ui-avatars.com/api/?name=Carol+Wen&background=dd2525&color=fff&size=128',
        type: 'full-360',
        status: 'in-progress',
        progress: 75,
        createdAt: new Date('2024-01-15')
      },
      {
        id: 2,
        name: '李主管',
        role: '市场经理',
        avatar: '/avatars/li.jpg',
        type: 'quick-assessment',
        status: 'completed',
        progress: 100,
        createdAt: new Date('2024-01-10')
      },
      {
        id: 3,
        name: '王总监',
        role: '技术总监',
        avatar: '/avatars/wang.jpg',
        type: 'leadership-focus',
        status: 'pending',
        progress: 0,
        createdAt: new Date('2024-01-08')
      },
      {
        id: 4,
        name: '研发团队',
        role: '技术团队',
        avatar: '/avatars/team.jpg',
        type: 'team-assessment',
        status: 'in-progress',
        progress: 45,
        createdAt: new Date('2024-01-05')
      }
    ])

    const handleCardClick = (card) => {
      appStore.showToast('导航', `查看${card.title}详情`, 'info')
    }

    const startNewAssessment = () => {
      appStore.showModal({
        title: '新建评估',
        content: '请选择评估类型开始创建新的评估项目。',
        type: 'info'
      })
    }

    const viewHistory = () => {
      appStore.showToast('功能', '评估历史记录功能即将推出', 'info')
    }

    const selectAssessmentType = (type) => {
      appStore.showModal({
        title: `选择 ${type.title}`,
        content: `您选择了"${type.title}"，预计需要${type.duration}完成。是否继续创建评估？`,
        type: 'confirm',
        actions: [
          {
            text: '取消',
            type: 'default'
          },
          {
            text: '确认创建',
            type: 'primary',
            handler: () => {
              appStore.showToast('创建成功', `${type.title}评估已创建`, 'success')
            }
          }
        ]
      })
    }

    const getTypeLabel = (type) => {
      const labels = {
        'full-360': '360度评估',
        'quick-assessment': '快速评估',
        'leadership-focus': '领导力评估',
        'team-assessment': '团队评估'
      }
      return labels[type] || type
    }

    const getStatusLabel = (status) => {
      const labels = {
        'in-progress': '进行中',
        'completed': '已完成',
        'pending': '待开始',
        'cancelled': '已取消'
      }
      return labels[status] || status
    }

    const formatDate = (date) => {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }

    const viewAllAssessments = () => {
      appStore.showToast('导航', '跳转到评估列表页面', 'info')
    }

    const viewAssessment = (assessment) => {
      appStore.showToast('查看', `查看${assessment.name}的评估详情`, 'info')
    }

    const editAssessment = (assessment) => {
      appStore.showToast('编辑', `编辑${assessment.name}的评估`, 'info')
    }

    const deleteAssessment = (assessment) => {
      appStore.showModal({
        title: 'Confirm Delete',
        content: `Are you sure you want to delete ${assessment.name}'s assessment? This action cannot be undone.`,
        type: 'confirm',
        actions: [
          {
            text: 'Cancel',
            type: 'default'
          },
          {
            text: 'Confirm Delete',
            type: 'danger',
            handler: () => {
              const index = recentAssessments.value.findIndex(a => a.id === assessment.id)
              if (index > -1) {
                recentAssessments.value.splice(index, 1)
                appStore.showToast('Delete Success', 'Assessment deleted', 'success')
              }
            }
          }
        ]
      })
    }

    const viewAnalytics = () => {
      appStore.showToast('导航', '正在跳转到分析仪表盘', 'info')
    }

    return {
      heroStats,
      overviewCards,
      assessmentTypes,
      recentAssessments,
      handleCardClick,
      startNewAssessment,
      viewHistory,
      selectAssessmentType,
      getTypeLabel,
      getStatusLabel,
      formatDate,
      viewAllAssessments,
      viewAssessment,
      editAssessment,
      deleteAssessment,
      viewAnalytics
    }
  }
}
</script>

<style lang="scss" scoped>
.assessment-page {
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
    
    .assessment-preview {
      .feature-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        margin-bottom: 12px;
        
        .feature-tag {
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
      
      .participants-preview {
        .participants-count {
          color: #6c757d;
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
        margin: 0 auto 32px;
      }
      
      .stats-actions {
        display: flex;
        justify-content: center;
        gap: 16px;
        align-items: center;
        flex-wrap: wrap;
      }
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 40px;
      margin-bottom: 40px;
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
      
      &.assessment-stat-card {
        position: relative;
        
        .assessment-quick-actions {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover .assessment-quick-actions {
          opacity: 1;
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
        
        &.assessment-avatar-icon {
          position: relative;
          background: transparent;
          
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #f8f9fa;
          }
          
          .assessment-status-dot {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid #ffffff;

            &.in-progress { background: #ffc107; }
            &.completed { background: #28a745; }
            &.pending { background: #6c757d; }
          }
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
  
  &.btn-outline {
    background: transparent;
    color: #6c757d;
    border: 1px solid #e9ecef;
    
    &:hover {
      background: #f8f9fa;
      border-color: #dd2525;
      color: #dd2525;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.btn-xs {
    padding: 6px 12px;
    font-size: 0.7rem;
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

  .stats-section .stats-actions {
    flex-direction: column;
    gap: 16px;
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