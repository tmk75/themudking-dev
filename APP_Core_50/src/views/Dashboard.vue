<template>
  <div class="dashboard-page">
    <!-- Dashboard Header -->
    <div class="dashboard-header glass animate__animated animate__fadeInDown">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">
            <i class="fas fa-tachometer-alt"></i>
            仪表盘
          </h1>
          <p class="page-subtitle">实时监控团队发展状况和关键指标</p>
        </div>
        <div class="header-actions">
          <button class="btn primary" @click="refreshData">
            <i class="fas fa-sync-alt" :class="{ 'fa-spin': isRefreshing }"></i>
            刷新数据
          </button>
          <button class="btn outline" @click="exportReport">
            <i class="fas fa-download"></i>
            导出报告
          </button>
        </div>
      </div>
    </div>

    <!-- Metrics Overview -->
    <section class="metrics-section">
      <div class="metrics-grid">
        <div 
          v-for="(metric, index) in metricsData" 
          :key="index"
          class="metric-card glass animate__animated animate__zoomIn"
          :class="metric.type"
          :style="{ animationDelay: (index * 0.1) + 's' }"
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
          <div class="metric-chart">
            <canvas :ref="'chart-' + index" width="60" height="40"></canvas>
          </div>
        </div>
      </div>
    </section>

    <!-- Traffic Light System -->
    <section class="traffic-lights-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-traffic-light"></i>
          人才状态概览
        </h2>
        <div class="section-actions">
          <select v-model="selectedDepartment" class="filter-select">
            <option value="all">全部部门</option>
            <option value="sales">销售部</option>
            <option value="marketing">市场部</option>
            <option value="tech">技术部</option>
            <option value="hr">人力资源部</option>
          </select>
        </div>
      </div>

      <div class="traffic-lights">
        <div 
          v-for="(light, index) in trafficLightsData" 
          :key="index"
          class="traffic-light glass animate__animated animate__fadeInUp"
          :class="light.status + '-light'"
          :style="{ animationDelay: (index * 0.2) + 's' }"
          @click="showLightDetail(light)"
        >
          <div class="light-header">
            <span class="light-emoji">{{ light.emoji }}</span>
            <div class="light-info">
              <h3 class="light-title">{{ light.title }}</h3>
              <span class="urgency-badge" :class="light.urgency">{{ light.urgencyText }}</span>
            </div>
          </div>
          
          <div class="light-metrics">
            <div class="light-percentage">{{ light.percentage }}%</div>
            <div class="percentage-label">{{ light.count }} 人</div>
          </div>

          <div class="progress-container">
            <div 
              class="progress-bar" 
              :class="light.status"
              :style="{ width: light.percentage + '%' }"
            >
              <span class="progress-label">{{ light.percentage }}%</span>
            </div>
          </div>

          <div class="light-actions">
            <button class="action-btn" @click.stop="viewDetails(light)">
              <i class="fas fa-eye"></i>
              查看详情
            </button>
            <button class="action-btn" @click.stop="takeAction(light)">
              <i class="fas fa-play"></i>
              采取行动
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Members -->
    <section class="team-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-users"></i>
          团队成员
        </h2>
        <div class="section-actions">
          <div class="search-box">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索成员..."
              class="search-input"
            >
            <i class="fas fa-search"></i>
          </div>
          <button class="btn primary" @click="addMember">
            <i class="fas fa-plus"></i>
            添加成员
          </button>
        </div>
      </div>

      <div class="team-grid">
        <div 
          v-for="member in filteredMembers" 
          :key="member.id"
          class="member-card glass animate__animated animate__fadeInUp"
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
            <div class="score-circle" :class="getScoreClass(member.score)">
              <span class="score-value">{{ member.score }}</span>
            </div>
            <div class="score-label">综合评分</div>
          </div>

          <div class="member-actions">
            <button class="action-btn" @click.stop="startAssessment(member)">
              <i class="fas fa-clipboard-check"></i>
              评估
            </button>
            <button class="action-btn" @click.stop="viewProgress(member)">
              <i class="fas fa-chart-line"></i>
              进度
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Activities -->
    <section class="activities-section glass">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-clock"></i>
          最近活动
        </h2>
        <button class="btn outline small" @click="viewAllActivities">
          查看全部
        </button>
      </div>

      <div class="activities-list">
        <div 
          v-for="activity in recentActivities" 
          :key="activity.id"
          class="activity-item"
        >
          <div class="activity-icon" :class="activity.type">
            <i :class="activity.icon"></i>
          </div>
          <div class="activity-content">
            <h4 class="activity-title">{{ activity.title }}</h4>
            <p class="activity-description">{{ activity.description }}</p>
            <span class="activity-time">{{ formatTime(activity.timestamp) }}</span>
          </div>
          <div class="activity-actions">
            <button class="action-btn small" @click="viewActivity(activity)">
              查看
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
        label: '需要关注',
        value: dashboardStore.metrics.critical,
        type: 'critical',
        trend: { type: 'down', value: '↓ 5%' }
      },
      {
        icon: 'fas fa-clock',
        label: '发展中',
        value: dashboardStore.metrics.development,
        type: 'warning',
        trend: { type: 'up', value: '↑ 12%' }
      },
      {
        icon: 'fas fa-check-circle',
        label: '已就绪',
        value: dashboardStore.metrics.ready,
        type: 'success',
        trend: { type: 'up', value: '↑ 8%' }
      },
      {
        icon: 'fas fa-users',
        label: '总人数',
        value: dashboardStore.metrics.total,
        type: 'info',
        trend: { type: 'stable', value: '→ 0%' }
      }
    ])

    const trafficLightsData = computed(() => [
      {
        status: 'red',
        emoji: '🔴',
        title: '需要立即关注',
        urgency: 'high',
        urgencyText: '高优先级',
        percentage: dashboardStore.trafficLights.red,
        count: Math.round(dashboardStore.metrics.total * dashboardStore.trafficLights.red / 100)
      },
      {
        status: 'yellow',
        emoji: '🟡',
        title: '持续发展中',
        urgency: 'moderate',
        urgencyText: '中等优先级',
        percentage: dashboardStore.trafficLights.yellow,
        count: Math.round(dashboardStore.metrics.total * dashboardStore.trafficLights.yellow / 100)
      },
      {
        status: 'green',
        emoji: '🟢',
        title: '表现优秀',
        urgency: 'low',
        urgencyText: '低优先级',
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
        title: '张三完成了360度评估',
        description: '销售部高级经理张三完成了本季度的360度评估',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 2,
        type: 'development',
        icon: 'fas fa-graduation-cap',
        title: '李四开始了领导力培训',
        description: '市场部总监李四参加了为期3个月的领导力提升培训',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000)
      },
      {
        id: 3,
        type: 'achievement',
        icon: 'fas fa-trophy',
        title: '王五获得了优秀表现认证',
        description: '技术部项目经理王五在能力评估中获得优秀等级',
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
      
      if (diff < 60000) return '刚刚'
      if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
      if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
      return `${Math.floor(diff / 86400000)}天前`
    }

    const refreshData = async () => {
      isRefreshing.value = true
      try {
        await dashboardStore.loadDashboardData()
        appStore.showToast('数据刷新', '仪表盘数据已更新', 'success')
      } catch (error) {
        appStore.showToast('刷新失败', '数据刷新失败，请重试', 'error')
      } finally {
        setTimeout(() => {
          isRefreshing.value = false
        }, 1000)
      }
    }

    const exportReport = () => {
      appStore.showToast('导出报告', '报告导出功能即将推出', 'info')
    }

    const showMetricDetail = (metric) => {
      appStore.showModal({
        title: metric.label,
        content: `当前有 ${metric.value} 名员工处于"${metric.label}"状态。趋势：${metric.trend.value}`,
        type: 'info'
      })
    }

    const showLightDetail = (light) => {
      appStore.showModal({
        title: light.title,
        content: `${light.count} 名员工（${light.percentage}%）当前处于"${light.title}"状态。建议采取相应的发展措施。`,
        type: 'info'
      })
    }

    const viewDetails = (light) => {
      router.push(`/analytics?filter=${light.status}`)
    }

    const takeAction = (light) => {
      appStore.showToast('操作', `正在为"${light.title}"状态的员工制定行动计划`, 'info')
    }

    const viewMemberProfile = (member) => {
      router.push(`/profile/${member.id}`)
    }

    const addMember = () => {
      appStore.showModal({
        title: '添加团队成员',
        content: '添加新成员功能即将推出，敬请期待！',
        type: 'info'
      })
    }

    const startAssessment = (member) => {
      appStore.showToast('评估', `正在为 ${member.name} 启动评估流程`, 'info')
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

    onMounted(async () => {
      try {
        await dashboardStore.loadDashboardData()
      } catch (error) {
        appStore.showToast('加载失败', '仪表盘数据加载失败', 'error')
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
  max-width: 1400px;
  margin: 0 auto;
}

// Dashboard Header
.dashboard-header {
  padding: 30px 40px;
  margin-bottom: 40px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;

  i {
    font-size: 2.2rem;
    color: #dd2525;
  }
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.5;
}

.header-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

// Metrics Section
.metrics-section {
  margin-bottom: 50px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.metric-card {
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  border-left: 4px solid transparent;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);

    &::before {
      left: 100%;
    }
  }

  &.critical { border-left-color: #dc3545; }
  &.warning { border-left-color: #ffc107; }
  &.success { border-left-color: #28a745; }
  &.info { border-left-color: #17a2b8; }
}

.metric-icon {
  font-size: 2.5rem;
  color: #dd2525;
  opacity: 0.8;
  flex-shrink: 0;
}

.metric-content {
  flex: 1;
}

.metric-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: #dd2525;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  margin-bottom: 8px;
}

.metric-trend {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &.up {
    background: rgba(40, 167, 69, 0.2);
    color: #28a745;
  }

  &.down {
    background: rgba(220, 53, 69, 0.2);
    color: #dc3545;
  }

  &.stable {
    background: rgba(108, 117, 125, 0.2);
    color: #6c757d;
  }
}

.metric-chart {
  width: 60px;
  height: 40px;
  flex-shrink: 0;
}

// Traffic Lights Section
.traffic-lights-section {
  margin-bottom: 50px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
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

.traffic-lights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
}

.traffic-light {
  padding: 30px;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: all 0.6s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);

    &::before {
      left: 100%;
    }
  }

  &.red-light { border-left: 5px solid #dc3545; }
  &.yellow-light { border-left: 5px solid #ffc107; }
  &.green-light { border-left: 5px solid #28a745; }
}

.light-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.light-emoji {
  font-size: 2.5rem;
}

.light-info {
  flex: 1;
}

.light-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.urgency-badge {
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 600;

  &.high {
    background: rgba(220, 53, 69, 0.2);
    color: #dc3545;
  }

  &.moderate {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
  }

  &.low {
    background: rgba(40, 167, 69, 0.2);
    color: #28a745;
  }
}

.light-metrics {
  text-align: center;
  margin-bottom: 20px;
}

.light-percentage {
  font-size: 2.5rem;
  font-weight: 900;
  color: #dd2525;
  margin-bottom: 5px;
}

.percentage-label {
  color: #666;
  font-size: 0.9rem;
}

.progress-container {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  height: 20px;
  margin: 20px 0;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  border-radius: 10px;
  position: relative;
  transition: width 1.5s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &.red {
    background: linear-gradient(90deg, #dc3545, #c82333);
  }

  &.yellow {
    background: linear-gradient(90deg, #ffc107, #e0a800);
  }

  &.green {
    background: linear-gradient(90deg, #28a745, #218838);
  }
}

.progress-label {
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.light-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

// Team Section
.team-section {
  margin-bottom: 50px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px 40px 8px 15px;
  background: white;
  border: 1px solid rgba(221, 37, 37, 0.2);
  border-radius: 20px;
  color: #333;
  font-size: 14px;
  width: 200px;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    background: white;
    border-color: #dd2525;
  }
}

.search-box i {
  position: absolute;
  right: 15px;
  color: #999;
  pointer-events: none;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.member-card {
  padding: 25px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
}

.member-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255, 255, 255, 0.3);
  }

  .member-status {
    position: absolute;
    bottom: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid white;

    &.ready { background: #6bcf7f; }
    &.development { background: #ffd93d; }
    &.critical { background: #ff6b6b; }
  }
}

.member-info {
  margin-bottom: 20px;
}

.member-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.member-position {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 3px;
}

.member-department {
  color: #999;
  font-size: 0.8rem;
}

.member-score {
  margin-bottom: 20px;
}

.score-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
  border: 3px solid;

  &.excellent {
    background: rgba(40, 167, 69, 0.2);
    border-color: #28a745;
  }

  &.good {
    background: rgba(255, 193, 7, 0.2);
    border-color: #ffc107;
  }

  &.average {
    background: rgba(255, 165, 2, 0.2);
    border-color: #fd7e14;
  }

  &.poor {
    background: rgba(220, 53, 69, 0.2);
    border-color: #dc3545;
  }
}

.score-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #dd2525;
}

.score-label {
  color: #666;
  font-size: 0.8rem;
}

.member-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

// Activities Section
.activities-section {
  padding: 30px 40px;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
}

.activity-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  flex-shrink: 0;

  &.assessment {
    background: rgba(255, 193, 7, 0.2);
    border: 2px solid #ffc107;
  }

  &.development {
    background: rgba(23, 162, 184, 0.2);
    border: 2px solid #17a2b8;
  }

  &.achievement {
    background: rgba(40, 167, 69, 0.2);
    border: 2px solid #28a745;
  }
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.activity-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

.activity-time {
  color: #999;
  font-size: 0.8rem;
}

.activity-actions {
  flex-shrink: 0;
}

// Buttons
.btn {
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  backdrop-filter: blur(10px);

  &.primary {
    background: linear-gradient(135deg, #dd2525, #b91c1c);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #c41e1e, #991b1b);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(221, 37, 37, 0.3);
    }
  }

  &.outline {
    background: transparent;
    color: #dd2525;
    border-color: rgba(221, 37, 37, 0.5);

    &:hover {
      background: rgba(221, 37, 37, 0.1);
      transform: translateY(-2px);
    }
  }

  &.small {
    padding: 8px 16px;
    font-size: 12px;
  }

  i {
    font-size: 1em;
  }
}

.action-btn {
  padding: 8px 16px;
  background: rgba(221, 37, 37, 0.1);
  border: 1px solid rgba(221, 37, 37, 0.2);
  border-radius: 20px;
  color: #dd2525;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(221, 37, 37, 0.2);
    transform: translateY(-1px);
  }

  &.small {
    padding: 6px 12px;
    font-size: 11px;
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .section-actions {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 20px;
  }

  .page-title {
    font-size: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .traffic-lights {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: 1fr;
  }

  .activities-section {
    padding: 20px;
  }

  .activity-item {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .activity-content {
    text-align: center;
  }

  .search-input {
    width: 150px;
  }
}

@media (max-width: 480px) {
  .metric-card {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .metric-content {
    text-align: center;
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