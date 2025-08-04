<template>
  <div class="reports-page">
    <!-- Hero Section with Reports Overview -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>报告管理中心</span>
          </div>
          
          <h1 class="hero-title">
            智能报告生成系统
          </h1>
          
          <p class="hero-subtitle">
            生成和管理各类评估报告，支持个人、团队和组织级报告。
            用专业的报告模板展示您的人才洞察和分析结果。
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="generateNewReport">
              <i class="fas fa-plus" :class="{ 'fa-spin': isGenerating }"></i>
              生成新报告
            </button>
            <button class="btn btn-secondary" @click="viewTemplates">
              <i class="fas fa-file-alt"></i>
              报告模板
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
              <div class="card-title">报告概览</div>
              <div class="card-status">活跃</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">总报告数</span>
                <span class="metric-value">{{ reportsData[0]?.value || '0' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">本月生成</span>
                <span class="metric-value">{{ reportsData[1]?.value || '0' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">下载次数</span>
                <span class="metric-value">{{ reportsData[2]?.value || '0' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Reports Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">报告类型</h2>
          <p class="section-description">
            多样化的报告类型满足不同层级的管理需求
          </p>
        </div>
        
        <div class="features-grid">
          <div 
            class="feature-card" 
            v-for="(report, index) in reportsData" 
            :key="index"
            @click="showReportDetail(report)"
          >
            <div class="feature-icon">
              <i :class="report.icon"></i>
            </div>
            
            <div class="feature-content">
              <h3 class="feature-title">{{ report.label }}</h3>
              <p class="feature-description">{{ report.description }}</p>
              
              <div class="feature-stat">
                <span class="stat-value">{{ report.value }}</span>
                <span class="stat-label">{{ report.trend.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Report Templates Section -->
    <section class="process-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">报告模板</h2>
          <p class="section-description">
            选择合适的模板快速生成专业报告
          </p>
          <div class="section-actions">
            <select v-model="selectedCategory" class="filter-select">
              <option value="all">所有模板</option>
              <option value="individual">个人报告</option>
              <option value="team">团队报告</option>
              <option value="organization">组织报告</option>
            </select>
          </div>
        </div>
        
        <div class="process-grid">
          <div 
            v-for="(template, index) in reportTemplates" 
            :key="index" 
            class="process-card"
            @click="selectTemplate(template)"
          >
            <div class="process-number" :class="template.status">{{ template.usage }}%</div>
            <div class="process-content">
              <h4 class="process-title">{{ template.title }}</h4>
              <p class="process-description">{{ template.description }}</p>
              <div class="process-duration">{{ template.category }}</div>
            </div>
            <div class="process-actions">
              <button class="btn btn-outline btn-sm" @click.stop="previewTemplate(template)">
                <i class="fas fa-eye"></i>
                预览模板
              </button>
              <button class="btn btn-primary btn-sm" @click.stop="useTemplate(template)">
                <i class="fas fa-plus"></i>
                使用模板
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Reports Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-content">
          <div class="stats-header">
            <h3 class="stats-title">最近生成的报告</h3>
            <p class="stats-subtitle">查看和管理最近创建的报告文档</p>
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
              <button class="btn btn-primary" @click="generateNewReport">
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
                <div class="stat-value">{{ report.pages }}</div>
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
              <i class="fas fa-file-alt"></i>
              <span>智能报告</span>
            </div>
            
            <h2 class="action-title">
              专业报告，精准洞察
            </h2>
            
            <p class="action-description">
              通过智能化的报告生成系统，将复杂的数据转化为
              清晰易懂的专业报告，为决策提供有力支撑。
            </p>
          </div>
          
          <div class="action-grid activities-action-grid">
            <div 
              v-for="feature in reportFeatures" 
              :key="feature.id"
              class="action-card activity-action-card"
            >
              <div class="card-header">
                <div class="card-icon">
                  <i :class="feature.icon"></i>
                </div>
                <h3 class="card-title">{{ feature.title }}</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  {{ feature.description }}
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>{{ feature.benefit1 }}</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-check"></i>
                    <span>{{ feature.benefit2 }}</span>
                  </div>
                </div>
                
                <button class="action-btn secondary" @click="exploreFeature(feature)">
                  <span>了解更多</span>
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
              <i class="fas fa-file-pdf"></i>
              <span>多格式导出</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-palette"></i>
              <span>自定义模板</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-cloud"></i>
              <span>云端存储</span>
            </div>
          </div>
          
          <div class="view-all-features">
            <button class="btn btn-primary" @click="viewAllFeatures">
              <span>查看所有功能</span>
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
  name: 'Reports',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()

    const isGenerating = ref(false)
    const selectedCategory = ref('all')
    const searchQuery = ref('')

    const heroStats = [
      { value: '156', label: '总报告数' },
      { value: '23', label: '本月生成' },
      { value: '1.2K', label: '下载次数' },
      { value: '95%', label: '满意度' }
    ]

    const reportsData = [
      {
        icon: 'fas fa-user',
        label: '个人报告',
        value: '89',
        description: '个人能力评估和发展建议报告',
        trend: { type: 'up', value: '↑ 12%' }
      },
      {
        icon: 'fas fa-users',
        label: '团队报告',
        value: '34',
        description: '团队协作和整体绩效分析报告',
        trend: { type: 'up', value: '↑ 8%' }
      },
      {
        icon: 'fas fa-building',
        label: '组织报告',
        value: '15',
        description: '组织级人才分布和战略分析报告',
        trend: { type: 'stable', value: '→ 0%' }
      },
      {
        icon: 'fas fa-chart-line',
        label: '分析报告',
        value: '28',
        description: '数据分析和趋势预测报告',
        trend: { type: 'up', value: '↑ 18%' }
      }
    ]

    const reportTemplates = [
      {
        status: 'green',
        title: '个人能力评估报告',
        description: '详细的个人能力分析和发展建议',
        usage: 85,
        category: '个人报告'
      },
      {
        status: 'yellow',
        title: '团队协作分析报告',
        description: '团队协作效率和改进建议',
        usage: 72,
        category: '团队报告'
      },
      {
        status: 'green',
        title: '组织人才地图报告',
        description: '组织级人才分布和继任规划',
        usage: 68,
        category: '组织报告'
      }
    ]

    const recentReports = ref([
      {
        id: 1,
        title: '2024年度人才评估',
        type: '年度报告',
        icon: 'fas fa-file-alt',
        status: 'completed',
        pages: 24,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 2,
        title: '销售团队分析',
        type: '团队报告',
        icon: 'fas fa-users',
        status: 'processing',
        pages: 16,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 3,
        title: '领导力发展报告',
        type: '个人报告',
        icon: 'fas fa-user',
        status: 'completed',
        pages: 12,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: 4,
        title: '组织能力地图',
        type: '组织报告',
        icon: 'fas fa-building',
        status: 'scheduled',
        pages: 32,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      }
    ])

    const reportFeatures = ref([
      {
        id: 1,
        title: '智能模板生成',
        icon: 'fas fa-magic',
        description: '基于AI技术自动生成专业报告模板，节省时间提高效率',
        benefit1: '自动化生成',
        benefit2: '专业模板'
      },
      {
        id: 2,
        title: '多格式导出',
        icon: 'fas fa-file-export',
        description: '支持PDF、Word、Excel等多种格式导出，满足不同需求',
        benefit1: '多种格式',
        benefit2: '灵活导出'
      },
      {
        id: 3,
        title: '数据可视化',
        icon: 'fas fa-chart-pie',
        description: '将复杂数据转化为直观的图表和可视化展示',
        benefit1: '图表展示',
        benefit2: '直观易懂'
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

    const generateNewReport = async () => {
      isGenerating.value = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        appStore.showModal({
          title: '生成新报告',
          content: '请选择要生成的报告类型和模板',
          type: 'info'
        })
      } catch (error) {
        appStore.showToast('生成失败', '报告生成失败，请重试', 'error')
      } finally {
        setTimeout(() => {
          isGenerating.value = false
        }, 1000)
      }
    }

    const viewTemplates = () => {
      appStore.showToast('查看模板', '跳转到报告模板页面', 'info')
    }

    const showReportDetail = (report) => {
      appStore.showModal({
        title: report.label,
        content: `${report.description}。当前数量: ${report.value}，趋势: ${report.trend.value}`,
        type: 'info'
      })
    }

    const selectTemplate = (template) => {
      appStore.showModal({
        title: template.title,
        content: `${template.description}。使用率: ${template.usage}%`,
        type: 'info'
      })
    }

    const previewTemplate = (template) => {
      appStore.showToast('预览模板', `正在加载${template.title}的预览`, 'info')
    }

    const useTemplate = (template) => {
      appStore.showToast('使用模板', `正在使用${template.title}创建报告`, 'info')
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

    const exploreFeature = (feature) => {
      appStore.showModal({
        title: feature.title,
        content: `${feature.description}。主要优势: ${feature.benefit1}、${feature.benefit2}`,
        type: 'info'
      })
    }

    const viewAllFeatures = () => {
      appStore.showToast('查看功能', '跳转到功能介绍页面', 'info')
    }

    onMounted(() => {
      // Initialize reports data
      console.log('Reports page loaded')
    })

    return {
      heroStats,
      isGenerating,
      selectedCategory,
      searchQuery,
      reportsData,
      reportTemplates,
      filteredReports,
      reportFeatures,
      generateNewReport,
      viewTemplates,
      showReportDetail,
      selectTemplate,
      previewTemplate,
      useTemplate,
      viewReport,
      downloadReport,
      shareReport,
      viewAllReports,
      exploreFeature,
      viewAllFeatures
    }
  }
}
</script>

<style lang="scss" scoped>
.reports-page {
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
    
    .view-all-features {
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