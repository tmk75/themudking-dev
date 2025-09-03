<template>
  <div class="dashboard-grid">
    <div class="metrics-overview">
      <div class="metric-card">
        <h3>Active Candidates</h3>
        <div class="metric-value">{{ metrics.activeCandidates }}</div>
        <div class="metric-change positive">+12% this week</div>
      </div>
      
      <div class="metric-card">
        <h3>Time to Hire</h3>
        <div class="metric-value">{{ metrics.timeToHire }} days</div>
        <div class="metric-change negative">+2 days vs last month</div>
      </div>
      
      <div class="metric-card">
        <h3>Pipeline Health</h3>
        <div class="metric-value">{{ metrics.pipelineHealth }}%</div>
        <div class="metric-change positive">+5% improvement</div>
      </div>
      
      <div class="metric-card">
        <h3>Risk Score</h3>
        <div class="metric-value">{{ metrics.riskScore }}</div>
        <div class="metric-change" :class="riskClass">{{ riskStatus }}</div>
      </div>
    </div>

    <div class="quick-actions">
      <h3>Quick Actions</h3>
      <div class="action-buttons">
        <router-link to="/kanban" class="action-btn primary">
          View Kanban Board
        </router-link>
        <router-link to="/metrics" class="action-btn secondary">
          Detailed Metrics
        </router-link>
        <router-link to="/pipeline-health" class="action-btn secondary">
          Pipeline Analysis
        </router-link>
      </div>
    </div>

    <div class="recent-activity">
      <h3>Recent Activity</h3>
      <div class="activity-list">
        <div 
          v-for="activity in recentActivities" 
          :key="activity.id"
          class="activity-item"
        >
          <div class="activity-icon">{{ activity.icon }}</div>
          <div class="activity-content">
            <div class="activity-text">{{ activity.text }}</div>
            <div class="activity-time">{{ formatTime(activity.timestamp) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="pipeline-snapshot">
      <RecruitmentFunnel @drill-down="handleFunnelDrillDown" />
    </div>
    
    <div class="kpi-section">
      <KpiScorecard />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWebSocket } from '../composables/useWebSocket.js'
import RecruitmentFunnel from '../components/RecruitmentFunnel.vue'
import KpiScorecard from '../components/KpiScorecard.vue'

const router = useRouter()

const { data: wsData } = useWebSocket('ws://localhost:8080/dashboard')

const metrics = ref({
  activeCandidates: 247,
  timeToHire: 18,
  pipelineHealth: 87,
  riskScore: 'Medium'
})

const recentActivities = ref([
  { id: 1, icon: '👤', text: 'New candidate added to Engineering pipeline', timestamp: Date.now() - 300000 },
  { id: 2, icon: '📞', text: 'Phone screen completed for Sarah Johnson', timestamp: Date.now() - 600000 },
  { id: 3, icon: '✅', text: 'Offer accepted by Mike Chen', timestamp: Date.now() - 900000 },
  { id: 4, icon: '⚠️', text: 'WIP limit exceeded in Screening stage', timestamp: Date.now() - 1200000 }
])

const pipelineStages = ref([
  { id: 'sourcing', name: 'Sourcing', count: 45, trend: 'up' },
  { id: 'screening', name: 'Screening', count: 32, trend: 'stable' },
  { id: 'phone-screen', name: 'Phone Screen', count: 18, trend: 'down' },
  { id: 'interview', name: 'Interview', count: 24, trend: 'up' },
  { id: 'technical', name: 'Technical', count: 12, trend: 'stable' },
  { id: 'final-interview', name: 'Final', count: 8, trend: 'up' },
  { id: 'offer', name: 'Offer', count: 6, trend: 'stable' },
  { id: 'hired', name: 'Hired', count: 15, trend: 'up' }
])

const riskClass = computed(() => {
  const risk = metrics.value.riskScore.toLowerCase()
  return {
    'positive': risk === 'low',
    'neutral': risk === 'medium',
    'negative': risk === 'high'
  }
})

const riskStatus = computed(() => {
  const risk = metrics.value.riskScore.toLowerCase()
  return risk === 'low' ? 'Low Risk' : risk === 'medium' ? 'Monitor' : 'Action Required'
})

const formatTime = (timestamp) => {
  const diff = Date.now() - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  
  if (hours > 0) return `${hours}h ago`
  return `${minutes}m ago`
}

const handleFunnelDrillDown = (stage) => {
  console.log('Drilling down into stage:', stage.name)
  router.push(`/kanban?stage=${stage.id}`)
}

onMounted(() => {
  // Update metrics from WebSocket data
  if (wsData.value) {
    Object.assign(metrics.value, wsData.value.metrics)
  }
})
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  height: 100%;
}

.metrics-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  grid-column: 1 / -1;
}

.metric-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.metric-card h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #5e6c84;
  font-weight: 500;
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  color: #172b4d;
  margin-bottom: 4px;
}

.metric-change {
  font-size: 12px;
  font-weight: 500;
}

.metric-change.positive {
  color: #36b37e;
}

.metric-change.negative {
  color: #ff5630;
}

.metric-change.neutral {
  color: #ff8b00;
}

.quick-actions,
.recent-activity,
.pipeline-snapshot,
.kpi-section {
  grid-column: 1 / -1;
}

.quick-actions h3,
.recent-activity h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #172b4d;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-btn {
  padding: 12px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s ease;
}

.action-btn.primary {
  background: #0052cc;
  color: white;
}

.action-btn.primary:hover {
  background: #0065ff;
}

.action-btn.secondary {
  background: #f4f5f7;
  color: #172b4d;
  border: 1px solid #dfe1e6;
}

.action-btn.secondary:hover {
  background: #ebecf0;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.activity-icon {
  font-size: 16px;
  width: 24px;
  text-align: center;
}

.activity-content {
  flex: 1;
}

.activity-text {
  font-size: 14px;
  color: #172b4d;
  margin-bottom: 2px;
}

.activity-time {
  font-size: 12px;
  color: #5e6c84;
}



@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .metrics-overview {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  

}
</style>