<template>
  <div class="dashboard-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <i class="fas fa-tachometer-alt"></i>
          Dashboard
        </h1>
        <p class="page-subtitle">Real-time monitoring of team development status and key metrics</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="refreshData">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': isRefreshing }"></i>
          Refresh Data
        </button>
        <button class="btn btn-outline" @click="exportReport">
          <i class="fas fa-download"></i>
          Export Report
        </button>
      </div>
    </div>

    <div class="metrics-grid">
      <div 
        v-for="(metric, index) in metricsData" 
        :key="index"
        class="metric-card"
        @click="showMetricDetail(metric)"
      >
        <div class="metric-icon">
          <i :class="metric.icon"></i>
        </div>
        <div class="metric-content">
          <div class="metric-value">{{ metric.value }}</div>
          <div class="metric-label">{{ metric.label }}</div>
          <div class="metric-trend" :class="metric.trend.type">
            <i :class="getTrendIcon(metric.trend.type)"></i>
            {{ metric.trend.value }}
          </div>
        </div>
      </div>
    </div>

    <div class="section-header">
      <h2 class="section-title">Talent Status Overview</h2>
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

    <div class="traffic-lights-grid">
      <div 
        v-for="(light, index) in trafficLightsData" 
        :key="index"
        class="traffic-light-card"
        @click="showLightDetail(light)"
      >
        <div class="light-header">
          <div class="light-icon">
            <i class="fas fa-circle" :class="`text-${light.status}`"></i>
          </div>
          <div class="light-info">
            <h3 class="light-title">{{ light.title }}</h3>
            <span class="urgency-badge" :class="light.urgency">{{ light.urgencyText }}</span>
          </div>
        </div>
        
        <div class="light-metrics">
          <div class="light-percentage">{{ light.percentage }}%</div>
          <div class="percentage-label">{{ light.count }} people</div>
        </div>

        <div class="progress-container">
          <div class="progress-track">
            <div 
              class="progress-fill" 
              :class="light.status"
              :style="{ width: light.percentage + '%' }"
            ></div>
          </div>
        </div>

        <div class="light-actions">
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

    <div class="section-header">
      <h2 class="section-title">Team Members</h2>
      <div class="section-actions">
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

    <div class="team-grid">
      <div 
        v-for="member in filteredMembers" 
        :key="member.id"
        class="member-card"
        @click="viewMemberProfile(member)"
      >
        <div class="member-avatar">
          <img :src="member.avatar" :alt="member.name">
          <div class="member-status" :class="member.status"></div>
        </div>
        
        <div class="member-info">
          <h4 class="member-name">{{ member.name }}</h4>
          <p class="member-position">{{ member.position }}</p>
          <p class="member-department">{{ member.department }}</p>
        </div>

        <div class="member-score">
          <div class="score-display">
            <span class="score-value">{{ member.score }}</span>
            <span class="score-label">Overall Score</span>
          </div>
        </div>

        <div class="member-actions">
          <button class="btn btn-outline btn-sm" @click.stop="startAssessment(member)">
            <i class="fas fa-clipboard-check"></i>
            Assess
          </button>
          <button class="btn btn-primary btn-sm" @click.stop="viewProgress(member)">
            <i class="fas fa-chart-line"></i>
            Progress
          </button>
        </div>
      </div>
    </div>

    <div class="activities-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-clock"></i>
          Recent Activities
        </h2>
        <button class="btn btn-outline" @click="viewAllActivities">
          View All
        </button>
      </div>

      <div class="activities-container">
        <div class="activities-list">
          <div 
            v-for="activity in recentActivities" 
            :key="activity.id"
            class="activity-item"
          >
            <div class="activity-icon">
              <i :class="activity.icon"></i>
            </div>
            <div class="activity-content">
              <h4 class="activity-title">{{ activity.title }}</h4>
              <p class="activity-description">{{ activity.description }}</p>
              <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
            </div>
            <div class="activity-actions">
              <button class="btn btn-outline btn-sm" @click="viewActivity(activity)">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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

    return {
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
      viewActivity
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  background: #ffffff;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  gap: 20px;

  .header-content {
    flex: 1;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #212529;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 16px;
    letter-spacing: -0.02em;

    i {
      font-size: 2rem;
      color: #dd2525;
    }
  }

  .page-subtitle {
    font-size: 1.125rem;
    color: #6c757d;
    line-height: 1.5;
  }

  .header-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.metric-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 20px;

  &:hover {
    border-color: #dd2525;
    box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
    transform: translateY(-4px);
  }

  .metric-icon {
    width: 56px;
    height: 56px;
    background: #dd2525;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    i {
      font-size: 1.5rem;
      color: #ffffff;
    }
  }

  .metric-content {
    flex: 1;
  }

  .metric-value {
    font-size: 2rem;
    font-weight: 700;
    color: #212529;
    margin-bottom: 4px;
  }

  .metric-label {
    font-size: 0.875rem;
    color: #6c757d;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .metric-trend {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    gap: 4px;

    &.up {
      color: #10b981;
      background: rgba(16, 185, 129, 0.1);
    }

    &.down {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    &.stable {
      color: #6b7280;
      background: rgba(107, 114, 128, 0.1);
    }
  }
}

// Clean McKinsey-Style Metrics - No Excessive Animations

// Section Headers
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 15px;

  i {
    font-size: 1.8rem;
    color: #dd2525;
  }
}

.section-actions {
  display: flex;
  gap: 15px;
  align-items: center;
}

.filter-select {
  padding: 8px 15px;
  background: white;
  border: 1px solid rgba(221, 37, 37, 0.2);
  border-radius: 20px;
  color: #333;
  font-size: 14px;
  cursor: pointer;

  option {
    background: white;
    color: #333;
  }
}

.traffic-lights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}

.traffic-light-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #007bff;
  }

  .light-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .light-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .text-red {
      color: #dc3545;
    }
    
    .text-yellow {
      color: #ffc107;
    }
    
    .text-green {
      color: #28a745;
    }
    
    i {
      font-size: 1.5rem;
    }
  }

  .light-info {
    flex: 1;
  }

  .light-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 8px;
  }

  .urgency-badge {
    font-size: 0.75rem;
    padding: 4px 12px;
    border-radius: 16px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &.high {
      background: rgba(220, 53, 69, 0.1);
      color: #dc3545;
    }

    &.moderate {
      background: rgba(255, 193, 7, 0.1);
      color: #ffc107;
    }

    &.low {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
    }
  }

  .light-metrics {
    text-align: center;
    margin-bottom: 24px;
  }

  .light-percentage {
    font-size: 2.5rem;
    font-weight: 700;
    color: #212529;
    margin-bottom: 4px;
  }

  .percentage-label {
    color: #6c757d;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .progress-container {
    margin: 24px 0;
  }

  .progress-track {
    background: #f8f9fa;
    border-radius: 8px;
    height: 8px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 8px;
    transition: width 1s ease;

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

  .light-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}

.member-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    transform: translateY(-4px);
    border-color: #007bff;
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.1);
  }

  .member-avatar {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #f8f9fa;
    }

    .member-status {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid #ffffff;

      &.ready { background: #28a745; }
      &.development { background: #ffc107; }
      &.critical { background: #dc3545; }
    }
  }

  .member-info {
    margin-bottom: 24px;
  }

  .member-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 8px;
  }

  .member-position {
    color: #6c757d;
    font-size: 0.875rem;
    margin-bottom: 4px;
    font-weight: 500;
  }

  .member-department {
    color: #adb5bd;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .member-score {
    margin-bottom: 24px;
  }

  .score-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .score-value {
    font-size: 2rem;
    font-weight: 700;
    color: #007bff;
  }

  .score-label {
    color: #6c757d;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .member-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
}

.activities-section {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 32px;

  .activities-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: #f8f9fa;
    border-radius: 12px;
    transition: all 0.3s ease;

    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  }

  .activity-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #ffffff;
    flex-shrink: 0;

    i {
      &.fa-clipboard-check {
        background: #007bff;
      }
      
      &.fa-graduation-cap {
        background: #17a2b8;
      }
      
      &.fa-trophy {
        background: #28a745;
      }
    }
  }

  .activity-content {
    flex: 1;
  }

  .activity-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 8px;
  }

  .activity-description {
    color: #6c757d;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 8px;
  }

  .activity-time {
    color: #adb5bd;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .activity-actions {
    flex-shrink: 0;
  }
}

// Search Box
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  
  input {
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

// Responsive Design
@media (max-width: 1024px) {
  .dashboard-page {
    padding: 20px;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .traffic-lights-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 15px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-title {
    font-size: 2rem;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .traffic-lights-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .section-actions {
    width: 100%;
    justify-content: space-between;
  }

  .search-box input {
    width: 150px;
    
    &:focus {
      width: 200px;
    }
  }
}

@media (max-width: 480px) {
  .dashboard-page {
    padding: 10px;
  }

  .page-title {
    font-size: 1.8rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .metric-card {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .traffic-light-card {
    padding: 20px;
  }

  .member-card {
    padding: 20px;
  }

  .activities-section {
    padding: 20px;
  }

  .search-box {
    display: none;
  }
}

// Removed duplicate search-input styles - using the ones below

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  
  &.btn-primary {
    background: #007bff;
    color: #ffffff;
    
    &:hover {
      background: #0056b3;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }
  }
  
  &.btn-outline {
    background: transparent;
    color: #6c757d;
    border: 1px solid #e9ecef;
    
    &:hover {
      background: #f8f9fa;
      border-color: #007bff;
      color: #007bff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
  
  &.btn-sm {
    padding: 8px 16px;
    font-size: 0.75rem;
  }
  
  i {
    font-size: 0.875rem;
  }
}

// Removed duplicate action-btn styles - using btn classes instead

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #212529;
  display: flex;
  align-items: center;
  gap: 12px;

  i {
    font-size: 1.25rem;
    color: #007bff;
  }
}

.section-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

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
    border-color: #007bff;
  }
}

.traffic-lights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.traffic-light-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.1);
    transform: translateY(-4px);
  }

  .light-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }

  .light-icon {
    font-size: 1.5rem;

    .text-red { color: #dc3545; }
    .text-yellow { color: #ffc107; }
    .text-green { color: #28a745; }
  }

  .light-info {
    flex: 1;
  }

  .light-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 4px;
  }

  .urgency-badge {
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 12px;
    font-weight: 600;
    text-transform: uppercase;

    &.high {
      background: rgba(220, 53, 69, 0.1);
      color: #dc3545;
    }

    &.moderate {
      background: rgba(255, 193, 7, 0.1);
      color: #ffc107;
    }

    &.low {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
    }
  }

  .light-metrics {
    text-align: center;
    margin-bottom: 24px;
  }

  .light-percentage {
    font-size: 2.5rem;
    font-weight: 700;
    color: #212529;
    margin-bottom: 4px;
  }

  .percentage-label {
    color: #6c757d;
    font-size: 0.875rem;
  }

  .progress-container {
    margin-bottom: 24px;
  }

  .progress-track {
    background: #f8f9fa;
    border-radius: 8px;
    height: 8px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 8px;
    transition: width 0.3s ease;

    &.red { background: #dc3545; }
    &.yellow { background: #ffc107; }
    &.green { background: #28a745; }
  }

  .light-actions {
    display: flex;
    gap: 8px;
    justify-content: center;
  }
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px 40px 8px 16px;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  color: #212529;
  font-size: 0.875rem;
  width: 200px;

  &::placeholder {
    color: #6c757d;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
}

.search-box i {
  position: absolute;
  right: 12px;
  color: #6c757d;
  pointer-events: none;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.member-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: #007bff;
    box-shadow: 0 8px 25px rgba(0, 123, 255, 0.1);
    transform: translateY(-4px);
  }

  .member-avatar {
    position: relative;
    width: 64px;
    height: 64px;
    margin: 0 auto 16px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #e9ecef;
    }

    .member-status {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;

      &.ready { background: #28a745; }
      &.development { background: #ffc107; }
      &.critical { background: #dc3545; }
    }
  }

  .member-info {
    margin-bottom: 16px;
  }

  .member-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 4px;
  }

  .member-position {
    color: #6c757d;
    font-size: 0.875rem;
    margin-bottom: 2px;
  }

  .member-department {
    color: #6c757d;
    font-size: 0.75rem;
  }

  .member-score {
    margin-bottom: 16px;
  }

  .score-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .score-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #007bff;
  }

  .score-label {
    color: #6c757d;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .member-actions {
    display: flex;
    gap: 8px;
    justify-content: center;
  }
}

.activities-section {
  margin-bottom: 40px;
}

.activities-container {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 24px;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
  }

  .activity-icon {
    width: 40px;
    height: 40px;
    background: #007bff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;

    i {
      font-size: 1rem;
    }
  }

  .activity-content {
    flex: 1;
  }

  .activity-title {
    font-size: 1rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 4px;
  }

  .activity-description {
    color: #6c757d;
    font-size: 0.875rem;
    line-height: 1.4;
    margin-bottom: 4px;
  }

  .activity-time {
    color: #6c757d;
    font-size: 0.75rem;
  }

  .activity-actions {
    flex-shrink: 0;
  }
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.75rem;
}

@media (max-width: 1024px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .metrics-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .section-actions {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 16px;
  }

  .page-title {
    font-size: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .metric-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .traffic-lights-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .team-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .activity-item {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .search-input {
    width: 150px;
  }
}

// Removed duplicate 768px media query - using the one above

@media (max-width: 480px) {
  .metric-card {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .light-header {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .light-actions {
    flex-direction: column;
  }

  .member-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>