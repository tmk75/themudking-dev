<template>
  <div class="dashboard-page">
    <!-- Hero Section with Dashboard Overview -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>Executive Dashboard</span>
          </div>
          
          <h1 class="hero-title">
            Talent Management Dashboard
          </h1>
          
          <p class="hero-subtitle">
            Real-time monitoring of team development status and key performance metrics. 
            Transform your organization with data-driven talent insights.
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="refreshData">
              <i class="fas fa-sync-alt" :class="{ 'fa-spin': isRefreshing }"></i>
              Refresh Data
            </button>
            <button class="btn btn-secondary" @click="exportReport">
              <i class="fas fa-download"></i>
              Export Report
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
              <div class="card-title">Live Metrics</div>
              <div class="card-status">Active</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">Team Performance</span>
                <span class="metric-value">{{ metricsData[2]?.value || '0' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">In Development</span>
                <span class="metric-value">{{ metricsData[1]?.value || '0' }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Success Rate</span>
                <span class="metric-value">87%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Capabilities Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Performance Metrics</h2>
          <p class="section-description">
            Real-time insights into your team's development and performance
          </p>
        </div>
        
        <div class="features-grid">
          <div 
            class="feature-card" 
            v-for="(metric, index) in metricsData" 
            :key="index"
            @click="showMetricDetail(metric)"
          >
            <div class="feature-icon">
              <i :class="metric.icon"></i>
            </div>
            
            <div class="feature-content">
              <h3 class="feature-title">{{ metric.label }}</h3>
              <p class="feature-description">Monitor and track {{ metric.label.toLowerCase() }} across your organization</p>
              
              <div class="feature-stat">
                <span class="stat-value">{{ metric.value }}</span>
                <span class="stat-label">{{ metric.trend.value }}</span>
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
          <h2 class="section-title">Talent Status Overview</h2>
          <p class="section-description">
            Current status distribution across your organization
          </p>
          <div class="section-actions">
            <select v-model="selectedDepartment" class="filter-select">
              <option value="all">All Departments</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="tech">Technology</option>
              <option value="hr">Human Resources</option>
            </select>
          </div>
        </div>
        
        <div class="process-grid">
          <div 
            v-for="(light, index) in trafficLightsData" 
            :key="index" 
            class="process-card"
            @click="showLightDetail(light)"
          >
            <div class="process-number" :class="light.status">{{ light.percentage }}%</div>
            <div class="process-content">
              <h4 class="process-title">{{ light.title }}</h4>
              <p class="process-description">{{ light.count }} team members currently in this status</p>
              <div class="process-duration">{{ light.urgencyText }}</div>
            </div>
            <div class="process-actions">
              <button class="btn btn-outline btn-sm" @click.stop="viewDetails(light)">
                <i class="fas fa-eye"></i>
                View Details
              </button>
              <button class="btn btn-primary btn-sm" @click.stop="takeAction(light)">
                <i class="fas fa-play"></i>
                Take Action
              </button>
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
            <h3 class="stats-title">Team Members Overview</h3>
            <p class="stats-subtitle">Current team composition and performance metrics</p>
            <div class="stats-actions">
              <div class="search-box">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search members..."
                  class="search-input"
                >
                <i class="fas fa-search"></i>
              </div>
              <button class="btn btn-primary" @click="addMember">
                <i class="fas fa-plus"></i>
                Add Member
              </button>
            </div>
          </div>
          
          <div class="stats-grid">
            <div 
              v-for="member in filteredMembers.slice(0, 4)" 
              :key="member.id"
              class="stat-card member-stat-card"
              @click="viewMemberProfile(member)"
            >
              <div class="stat-icon member-avatar-icon">
                <img :src="member.avatar" :alt="member.name">
                <div class="member-status-dot" :class="member.status"></div>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ member.score }}</div>
                <div class="stat-label">{{ member.name }}</div>
                <div class="stat-sublabel">{{ member.position }}</div>
              </div>
              <div class="member-quick-actions">
                <button class="btn btn-outline btn-xs" @click.stop="startAssessment(member)">
                  <i class="fas fa-clipboard-check"></i>
                </button>
                <button class="btn btn-primary btn-xs" @click.stop="viewProgress(member)">
                  <i class="fas fa-chart-line"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="view-all-members">
            <button class="btn btn-outline" @click="viewAllMembers">
              <span>View All {{ filteredMembers.length }} Members</span>
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
              <i class="fas fa-clock"></i>
              <span>Recent Activities</span>
            </div>
            
            <h2 class="action-title">
              Stay Updated with Latest Progress
            </h2>
            
            <p class="action-description">
              Monitor real-time activities and take immediate action to optimize your team's 
              performance and development trajectory.
            </p>
          </div>
          
          <div class="action-grid activities-action-grid">
            <div 
              v-for="activity in recentActivities" 
              :key="activity.id"
              class="action-card activity-action-card"
            >
              <div class="card-header">
                <div class="card-icon">
                  <i :class="activity.icon"></i>
                </div>
                <h3 class="card-title">{{ activity.title }}</h3>
              </div>
              
              <div class="card-content">
                <p class="card-description">
                  {{ activity.description }}
                </p>
                
                <div class="card-features">
                  <div class="feature-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ formatTime(activity.timestamp) }}</span>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-tag"></i>
                    <span>{{ activity.type }}</span>
                  </div>
                </div>
                
                <button class="action-btn secondary" @click="viewActivity(activity)">
                  <span>View Details</span>
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="trust-indicators">
            <div class="trust-item">
              <i class="fas fa-shield-alt"></i>
              <span>Real-time Updates</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-chart-line"></i>
              <span>Performance Tracking</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-users"></i>
              <span>Team Collaboration</span>
            </div>
            <div class="trust-item">
              <i class="fas fa-bell"></i>
              <span>Smart Notifications</span>
            </div>
          </div>
          
          <div class="view-all-activities">
            <button class="btn btn-primary" @click="viewAllActivities">
              <span>View All Activities</span>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useDashboardStore } from '@/stores/dashboard'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    const dashboardStore = useDashboardStore()

    const isRefreshing = ref(false)
    const selectedDepartment = ref('all')
    const searchQuery = ref('')

    const heroStats = [
      { value: '87%', label: 'Success Rate' },
      { value: '24/7', label: 'Monitoring' },
      { value: '95%', label: 'Satisfaction' },
      { value: '100+', label: 'Active Users' }
    ]

    const metricsData = computed(() => [
      {
        icon: 'fas fa-exclamation-triangle',
        label: 'Needs Attention',
        value: dashboardStore.metrics.critical,
        color: 'secondary',
        trend: { type: 'down', value: '↓ 5%' }
      },
      {
        icon: 'fas fa-clock',
        label: 'In Development',
        value: dashboardStore.metrics.development,
        color: 'red',
        trend: { type: 'up', value: '↑ 12%' }
      },
      {
        icon: 'fas fa-check-circle',
        label: 'Ready',
        value: dashboardStore.metrics.ready,
        color: 'green',
        trend: { type: 'up', value: '↑ 8%' }
      },
      {
        icon: 'fas fa-users',
        label: 'Total People',
        value: dashboardStore.metrics.total,
        color: 'purple',
        trend: { type: 'stable', value: '→ 0%' }
      }
    ])

    const trafficLightsData = computed(() => [
      {
        status: 'red',
        emoji: '🔴',
        title: 'Needs Immediate Attention',
        urgency: 'high',
        urgencyText: 'High Priority',
        percentage: dashboardStore.trafficLights.red,
        count: Math.round(dashboardStore.metrics.total * dashboardStore.trafficLights.red / 100)
      },
      {
        status: 'yellow',
        emoji: '🟡',
        title: 'In Development',
        urgency: 'moderate',
        urgencyText: 'Medium Priority',
        percentage: dashboardStore.trafficLights.yellow,
        count: Math.round(dashboardStore.metrics.total * dashboardStore.trafficLights.yellow / 100)
      },
      {
        status: 'green',
        emoji: '🟢',
        title: 'Excellent Performance',
        urgency: 'low',
        urgencyText: 'Low Priority',
        percentage: dashboardStore.trafficLights.green,
        count: Math.round(dashboardStore.metrics.total * dashboardStore.trafficLights.green / 100)
      }
    ])

    const filteredMembers = computed(() => {
      let members = dashboardStore.teamMembers
      
      if (selectedDepartment.value !== 'all') {
        members = members.filter(member => 
          member.department.includes(selectedDepartment.value)
        )
      }
      
      if (searchQuery.value) {
        members = members.filter(member =>
          member.name.includes(searchQuery.value) ||
          member.position.includes(searchQuery.value) ||
          member.department.includes(searchQuery.value)
        )
      }
      
      return members
    })

    const recentActivities = ref([
      {
        id: 1,
        type: 'assessment',
        icon: 'fas fa-clipboard-check',
        title: 'Carol Wen completed 360-degree assessment',
        description: 'Sales Director Carol Wen completed this quarter\'s 360-degree assessment',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 2,
        type: 'development',
        icon: 'fas fa-graduation-cap',
        title: 'John Smith started leadership training',
        description: 'Marketing Director John Smith joined a 3-month leadership enhancement program',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: 3,
        type: 'achievement',
        icon: 'fas fa-trophy',
        title: 'Jane Doe received excellence certification',
        description: 'Tech Project Manager Jane Doe achieved excellent rating in capability assessment',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
      }
    ])

    const getTrendIcon = (type) => {
      const icons = {
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        stable: 'fas fa-minus'
      }
      return icons[type] || icons.stable
    }

    const getScoreClass = (score) => {
      if (score >= 80) return 'excellent'
      if (score >= 70) return 'good'
      if (score >= 60) return 'average'
      return 'poor'
    }

    const formatTime = (timestamp) => {
      const now = new Date()
      const time = new Date(timestamp)
      const diff = now - time
      
      if (diff < 60000) return 'Just now'
      if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
      return `${Math.floor(diff / 86400000)}d ago`
    }

    const refreshData = async () => {
      isRefreshing.value = true
      try {
        await dashboardStore.loadDashboardData()
        appStore.showToast('Data Refresh', 'Dashboard data updated', 'success')
      } catch (error) {
        appStore.showToast('Refresh Failed', 'Failed to refresh data, please try again', 'error')
      } finally {
        setTimeout(() => {
          isRefreshing.value = false
        }, 1000)
      }
    }

    const exportReport = () => {
      appStore.showToast('Export Report', 'Report export feature coming soon', 'info')
    }

    const showMetricDetail = (metric) => {
      appStore.showModal({
        title: metric.label,
        content: `Currently ${metric.value} employees are in "${metric.label}" status. Trend: ${metric.trend.value}`,
        type: 'info'
      })
    }

    const showLightDetail = (light) => {
      appStore.showModal({
        title: light.title,
        content: `${light.count} employees (${light.percentage}%) are currently in "${light.title}" status. Consider taking appropriate development measures.`,
        type: 'info'
      })
    }

    const viewDetails = (light) => {
      router.push(`/analytics?filter=${light.status}`)
    }

    const takeAction = (light) => {
      appStore.showToast('Action', `Creating action plan for employees in "${light.title}" status`, 'info')
    }

    const viewMemberProfile = (member) => {
      router.push(`/profile/${member.id}`)
    }

    const addMember = () => {
      appStore.showModal({
        title: 'Add Team Member',
        content: 'Add new member feature coming soon!',
        type: 'info'
      })
    }

    const startAssessment = (member) => {
      appStore.showToast('Assessment', `Starting assessment process for ${member.name}`, 'info')
    }

    const viewProgress = (member) => {
      router.push(`/profile/${member.id}?tab=progress`)
    }

    const viewAllActivities = () => {
      router.push('/activities')
    }

    const viewActivity = (activity) => {
      appStore.showModal({
        title: activity.title,
        content: activity.description,
        type: 'info'
      })
    }

    const animateMetric = (index) => {
      // Add metric animation logic
      console.log(`Animating metric ${index}`)
    }

    onMounted(async () => {
      // Initialize AOS
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
      })

      try {
        await dashboardStore.loadDashboardData()
      } catch (error) {
        appStore.showToast('Load Failed', 'Failed to load dashboard data', 'error')
      }
    })

    const viewAllMembers = () => {
      router.push('/team')
    }

    return {
      heroStats,
      isRefreshing,
      selectedDepartment,
      searchQuery,
      metricsData,
      trafficLightsData,
      filteredMembers,
      recentActivities,
      getTrendIcon,
      getScoreClass,
      formatTime,
      animateMetric,
      refreshData,
      exportReport,
      showMetricDetail,
      showLightDetail,
      viewDetails,
      takeAction,
      viewMemberProfile,
      addMember,
      startAssessment,
      viewProgress,
      viewAllActivities,
      viewActivity,
      viewAllMembers
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
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
      
      &.member-stat-card {
        position: relative;
        
        .member-quick-actions {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover .member-quick-actions {
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
        
        &.member-avatar-icon {
          position: relative;
          background: transparent;
          
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #f8f9fa;
          }
          
          .member-status-dot {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid #ffffff;

            &.ready { background: #28a745; }
            &.development { background: #ffc107; }
            &.critical { background: #dc3545; }
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
    
    .view-all-members {
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
      
      &.activity-action-card {
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
          font-size: 1.125rem;
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
      margin-bottom: 32px;
      
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
    
    .view-all-activities {
      text-align: center;
    }
  }
}

// Search Box
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  
  .search-input {
    width: 200px;
    padding: 8px 40px 8px 15px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(221, 37, 37, 0.2);
    border-radius: 20px;
    color: #333;
    font-size: 14px;
    transition: all 0.3s ease;

    &::placeholder {
      color: #999;
    }

    &:focus {
      outline: none;
      background: white;
      border-color: #dd2525;
      width: 250px;
    }
  }

  i {
    position: absolute;
    right: 15px;
    color: #999;
    pointer-events: none;
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
  
  &.btn-sm {
    padding: 8px 16px;
    font-size: 0.75rem;
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

  .search-box .search-input {
    width: 100%;
    max-width: 300px;
    
    &:focus {
      width: 100%;
    }
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

  .search-box {
    width: 100%;
  }
}
</style>