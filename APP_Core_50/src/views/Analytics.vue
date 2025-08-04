<template>
  <div class="analytics-page">
    <!-- Hero Section with Analytics Overview -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>数据分析中心</span>
          </div>
          
          <h1 class="hero-title">
            数据分析仪表盘
          </h1>
          
          <p class="hero-subtitle">
            深入分析团队能力分布、发展趋势和关键指标。
            用数据驱动的洞察优化您的人才管理策略。
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="refreshAnalytics">
              <i class="fas fa-sync-alt" :class="{ 'fa-spin': isRefreshing }"></i>
              刷新数据
            </button>
            <button class="btn btn-secondary" @click="exportReport">
              <i class="fas fa-download"></i>
              导出报告
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
              <div class="card-title">分析概览</div>
              <div class="card-status">实时</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">数据点</span>
                <span class="metric-value">{{ analyticsData[0]?.value || '0' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">趋势分析</span>
                <span class="metric-value">{{ analyticsData[1]?.value || '0' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">准确率</span>
                <span class="metric-value">95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Analytics Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">分析指标</h2>
          <p class="section-description">
            团队能力和绩效的深度数据洞察
          </p>
        </div>
        
        <div class="features-grid">
          <div 
            class="feature-card" 
            v-for="(metric, index) in analyticsData" 
            :key="index"
            @click="showAnalyticsDetail(metric)"
          >
            <div class="feature-icon">
              <i :class="metric.icon"></i>
            </div>
            
            <div class="feature-content">
              <h3 class="feature-title">{{ metric.label }}</h3>
              <p class="feature-description">{{ metric.description }}</p>
              
              <div class="feature-stat">
                <span class="stat-value">{{ metric.value }}</span>
                <span class="stat-label">{{ metric.trend.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Analytics Types Section -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">分析类型</h2>
          <p class="section-description">
            选择不同的分析维度深入了解团队状况
          </p>
          <div class="section-actions">
            <select v-model="selectedTimeRange" class="filter-select">
              <option value="week">本周</option>
              <option value="month">本月</option>
              <option value="quarter">本季度</option>
              <option value="year">本年度</option>
            </select>
          </div>
        </div>
        
        <div class="process-grid">
          <div 
            v-for="(analysis, index) in analysisTypes" 
            :key="index" 
            class="process-card"
            @click="selectAnalysisType(analysis)"
          >
            <div class="process-number" :class="analysis.status">{{ analysis.percentage }}%</div>
            <div class="process-content">
              <h4 class="process-title">{{ analysis.title }}</h4>
              <p class="process-description">{{ analysis.description }}</p>
              <div class="process-duration">{{ analysis.priority }}</div>
            </div>
            <div class="process-actions">
              <button class="btn btn-outline btn-sm" @click.stop="viewAnalysisDetails(analysis)">
                <i class="fas fa-eye"></i>
                查看详情
              </button>
              <button class="btn btn-primary btn-sm" @click.stop="generateReport(analysis)">
                <i class="fas fa-chart-bar"></i>
                生成报告
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Analytics Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-content">
          <div class="stats-header">
            <h3 class="stats-title">最新分析报告</h3>
            <p class="stats-subtitle">最近生成的数据分析和洞察报告</p>
            <div class="stats-actions">
              <div class="search-box">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="搜索报告..."
                  class="search-input"
                >
                <i class="fas fa-search"></i>
              </div>
              <button class="btn btn-primary" @click="createNewReport">
                <i class="fas fa-plus"></i>
                新建报告
              </button>
            </div>
          </div>
          
          <div class="stats-grid">
            <div 
              v-for="report in filteredReports.slice(0, 4)" 
              :key="report.id"
              class="stat-card report-stat-card"
              @click="viewReport(report)"
            >
              <div class="stat-icon report-icon">
                <i :class="report.icon"></i>
                <div class="report-status-dot" :class="report.status"></div>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ report.score }}%</div>
                <div class="stat-label">{{ report.title }}</div>
                <div class="stat-sublabel">{{ report.type }}</div>
              </div>
              <div class="report-quick-actions">
                <button class="btn btn-outline btn-xs" @click.stop="downloadReport(report)">
                  <i class="fas fa-download"></i>
                </button>
                <button class="btn btn-primary btn-xs" @click.stop="shareReport(report)">
                  <i class="fas fa-share"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="view-all-reports">
            <button class="btn btn-outline" @click="viewAllReports">
              <span>查看所有 {{ filteredReports.length }} 个报告</span>
              <i class="fas fa-arrow-right"></i>
            </button>
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
              <span>智能洞察</span>
            </div>
            
            <h2 class="action-title">
              数据驱动的决策支持
            </h2>
            
            <p class="action-description">
              通过先进的数据分析和机器学习算法，为您的人才管理
              决策提供科学依据和预测性洞察。
            </p>
          </div>
          
          <div class="action-grid activities-action-grid">
            <div 
              v-for="insight in analyticsInsights" 
              :key="insight.id"
              class="action-card activity-action-card"
            >
              <div class="card-header">
                <div class="card-icon">
                  <i :class="insight.icon"></i>
                </div>
                <h3 class="card-title">{{ insight.title }}</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  {{ insight.description }}
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-chart-line"></i>
                    <span>{{ insight.accuracy }}% 准确率</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ insight.updateTime }}</span>
                  </div>
                </div>
                
                <button class="action-btn secondary" @click="viewInsight(insight)">
                  <span>查看详情</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="trust-indicators">
            <div class="trust-item">
              <i class="fas fa-shield-alt"></i>
              <span>数据安全</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-chart-line"></i>
              <span>实时分析</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-brain"></i>
              <span>AI 驱动</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-target"></i>
              <span>精准预测</span>
            </div>
          </div>
          
          <div class="view-all-insights">
            <button class="btn btn-primary" @click="viewAllInsights">
              <span>查看所有洞察</span>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'Analytics',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()

    const isRefreshing = ref(false)
    const selectedTimeRange = ref('month')
    const searchQuery = ref('')

    const heroStats = [
      { value: '1.2K', label: '数据点' },
      { value: '15', label: '分析模型' },
      { value: '95%', label: '准确率' },
      { value: '24/7', label: '实时监控' }
    ]

    const analyticsData = [
      {
        icon: 'fas fa-chart-pie',
        label: '能力分布',
        value: '856',
        description: '团队成员能力分布分析和可视化',
        trend: { type: 'up', value: '↑ 8%' }
      },
      {
        icon: 'fas fa-trending-up',
        label: '发展趋势',
        value: '23',
        description: '人才发展趋势预测和分析',
        trend: { type: 'up', value: '↑ 15%' }
      },
      {
        icon: 'fas fa-bullseye',
        label: '关键指标',
        value: '12',
        description: '核心绩效指标监控和跟踪',
        trend: { type: 'stable', value: '→ 0%' }
      },
      {
        icon: 'fas fa-brain',
        label: 'AI 洞察',
        value: '8',
        description: '智能分析和预测性洞察',
        trend: { type: 'up', value: '↑ 25%' }
      }
    ]

    const analysisTypes = [
      {
        status: 'green',
        title: '能力分布分析',
        description: '分析团队成员在各个能力维度上的分布情况',
        percentage: 85,
        priority: '高优先级'
      },
      {
        status: 'yellow',
        title: '发展趋势预测',
        description: '基于历史数据预测团队发展趋势和潜在风险',
        percentage: 72,
        priority: '中优先级'
      },
      {
        status: 'red',
        title: '绩效关联分析',
        description: '分析能力评估结果与实际绩效表现的关联性',
        percentage: 68,
        priority: '高优先级'
      }
    ]

    const recentReports = ref([
      {
        id: 1,
        title: '月度能力分析',
        type: '能力分布报告',
        icon: 'fas fa-chart-pie',
        status: 'completed',
        score: 92,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 2,
        title: '团队发展趋势',
        type: '趋势分析报告',
        icon: 'fas fa-trending-up',
        status: 'processing',
        score: 88,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 3,
        title: '绩效关联分析',
        type: '关联性报告',
        icon: 'fas fa-link',
        status: 'completed',
        score: 95,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: 4,
        title: 'AI 预测洞察',
        type: '预测分析报告',
        icon: 'fas fa-brain',
        status: 'scheduled',
        score: 90,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      }
    ])

    const analyticsInsights = ref([
      {
        id: 1,
        title: '人才流失风险预警',
        icon: 'fas fa-exclamation-triangle',
        description: '基于历史数据和行为模式，预测可能的人才流失风险',
        accuracy: 87,
        updateTime: '2小时前'
      },
      {
        id: 2,
        title: '能力发展建议',
        icon: 'fas fa-lightbulb',
        description: '根据能力评估结果，为团队成员提供个性化发展建议',
        accuracy: 92,
        updateTime: '4小时前'
      },
      {
        id: 3,
        title: '团队协作优化',
        icon: 'fas fa-users-cog',
        description: '分析团队协作模式，提供优化建议提升整体效率',
        accuracy: 89,
        updateTime: '6小时前'
      }
    ])

    const filteredReports = computed(() => {
      let reports = recentReports.value
      
      if (searchQuery.value) {
        reports = reports.filter(report =>
          report.title.includes(searchQuery.value) ||
          report.type.includes(searchQuery.value)
        )
      }
      
      return reports
    })

    const refreshAnalytics = async () => {
      isRefreshing.value = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        appStore.showToast('数据刷新', '分析数据已更新', 'success')
      } catch (error) {
        appStore.showToast('刷新失败', '数据刷新失败，请重试', 'error')
      } finally {
        setTimeout(() => {
          isRefreshing.value = false
        }, 1000)
      }
    }

    const exportReport = () => {
      appStore.showToast('导出报告', '分析报告导出功能即将推出', 'info')
    }

    const showAnalyticsDetail = (metric) => {
      appStore.showModal({
        title: metric.label,
        content: `${metric.description}。当前数值: ${metric.value}，趋势: ${metric.trend.value}`,
        type: 'info'
      })
    }

    const selectAnalysisType = (analysis) => {
      appStore.showModal({
        title: analysis.title,
        content: `${analysis.description}。完成度: ${analysis.percentage}%`,
        type: 'info'
      })
    }

    const viewAnalysisDetails = (analysis) => {
      appStore.showToast('查看详情', `正在加载${analysis.title}的详细分析`, 'info')
    }

    const generateReport = (analysis) => {
      appStore.showToast('生成报告', `正在为${analysis.title}生成分析报告`, 'info')
    }

    const createNewReport = () => {
      appStore.showModal({
        title: '新建分析报告',
        content: '请选择要创建的分析报告类型',
        type: 'info'
      })
    }

    const viewReport = (report) => {
      appStore.showToast('查看报告', `正在打开${report.title}`, 'info')
    }

    const downloadReport = (report) => {
      appStore.showToast('下载报告', `正在下载${report.title}`, 'info')
    }

    const shareReport = (report) => {
      appStore.showToast('分享报告', `正在分享${report.title}`, 'info')
    }

    const viewAllReports = () => {
      appStore.showToast('查看全部', '跳转到报告列表页面', 'info')
    }

    const viewInsight = (insight) => {
      appStore.showModal({
        title: insight.title,
        content: `${insight.description}。准确率: ${insight.accuracy}%，更新时间: ${insight.updateTime}`,
        type: 'info'
      })
    }

    const viewAllInsights = () => {
      appStore.showToast('查看全部', '跳转到洞察列表页面', 'info')
    }

    onMounted(() => {
      // Initialize analytics data
      console.log('Analytics page loaded')
    })

    return {
      heroStats,
      isRefreshing,
      selectedTimeRange,
      searchQuery,
      analyticsData,
      analysisTypes,
      filteredReports,
      analyticsInsights,
      refreshAnalytics,
      exportReport,
      showAnalyticsDetail,
      selectAnalysisType,
      viewAnalysisDetails,
      generateReport,
      createNewReport,
      viewReport,
      downloadReport,
      shareReport,
      viewAllReports,
      viewInsight,
      viewAllInsights
    }
  }
}
</script>

<style lang="scss" scoped>
.analytics-page {
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
    position: relative;
    
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
      margin: 0 auto 32px;
    }
    
    .section-actions {
      display: flex;
      justify-content: center;
      
      .filter-select {
        padding: 8px 16px;
        background: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 6px;
        color: #212529;
        font-size: 0.875rem;
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: #dd2525;
        }
      }
    }
  }
  
  .process-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 auto 24px;
      color: #ffffff;
      
      &.red {
        background: #dc3545;
      }
      
      &.yellow {
        background: #ffc107;
      }
      
      &.green {
        background: #28a745;
      }
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
    
    .process-actions {
      display: flex;
      gap: 8px;
      justify-content: center;
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
      
      &.report-stat-card {
        position: relative;
        
        .report-quick-actions {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover .report-quick-actions {
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
        
        &.report-icon {
          position: relative;
          
          .report-status-dot {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid #ffffff;

            &.completed { background: #28a745; }
            &.processing { background: #ffc107; }
            &.scheduled { background: #6c757d; }
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
    
    .view-all-reports {
      text-align: center;
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
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      margin-bottom: 60px;
      
      &.activities-action-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .action-card {
      background: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 16px;
      padding: 32px;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #dd2525;
        box-shadow: 0 12px 40px rgba(221, 37, 37, 0.1);
        transform: translateY(-4px);
      }
      
      &.activity-action-card {
        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
          
          .card-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #dd2525 0%, #b91c1c 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            
            i {
              font-size: 1.25rem;
              color: #ffffff;
            }
          }
          
          .card-title {
            font-size: 1.125rem;
            font-weight: 600;
            color: #212529;
            line-height: 1.3;
            margin: 0;
          }
        }
        
        .card-content {
          .card-description {
            color: #6c757d;
            line-height: 1.6;
            margin-bottom: 20px;
            font-size: 0.875rem;
          }
          
          .card-features {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 24px;
            
            .feature-item {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 0.75rem;
              color: #6c757d;
              
              i {
                color: #dd2525;
                font-size: 0.75rem;
              }
            }
          }
          
          .action-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: transparent;
            border: 1px solid #e9ecef;
            border-radius: 6px;
            color: #495057;
            font-size: 0.75rem;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.3s ease;
            cursor: pointer;
            
            &:hover {
              border-color: #dd2525;
              color: #dd2525;
              background: rgba(221, 37, 37, 0.05);
            }
            
            &.secondary {
              border-color: #dd2525;
              color: #dd2525;
              
              &:hover {
                background: #dd2525;
                color: #ffffff;
              }
            }
            
            i {
              font-size: 0.75rem;
            }
          }
        }
      }
    }
    
    .trust-indicators {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-bottom: 40px;
      flex-wrap: wrap;
      
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
    
    .view-all-insights {
      text-align: center;
    }
  }
}

// Search Box
.search-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  
  .search-input {
    padding: 8px 40px 8px 16px;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    font-size: 0.875rem;
    width: 200px;
    
    &:focus {
      outline: none;
      border-color: #dd2525;
    }
  }
  
  i {
    position: absolute;
    right: 12px;
    color: #6c757d;
    font-size: 0.875rem;
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
    background: #6c757d;
    color: #ffffff;
    
    &:hover {
      background: #5a6268;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
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
      box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
    }
  }
  
  &.btn-sm {
    padding: 6px 12px;
    font-size: 0.75rem;
  }
  
  &.btn-xs {
    padding: 4px 8px;
    font-size: 0.75rem;
  }
  
  i {
    font-size: 0.875rem;
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .process-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-grid {
    grid-template-columns: 1fr;
    
    &.activities-action-grid {
      grid-template-columns: 1fr;
    }
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 0;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
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
  
  .process-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .trust-indicators {
    gap: 20px;
  }
  
  .stats-actions {
    flex-direction: column;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .feature-card,
  .process-card,
  .stat-card {
    padding: 24px;
  }
  
  .trust-indicators {
    flex-direction: column;
    gap: 16px;
  }
}
</style>