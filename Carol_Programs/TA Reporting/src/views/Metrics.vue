<template>
  <div class="metrics-dashboard">
    <div class="metrics-header">
      <h2>Summary Metrics</h2>
      <div class="time-selector">
        <select v-model="selectedPeriod">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>
    </div>

    <div class="metrics-grid">
      <div class="metric-section">
        <h3>Pipeline Metrics</h3>
        <div class="metric-cards">
          <div class="metric-card">
            <div class="metric-label">Total Candidates</div>
            <div class="metric-value">{{ metrics.totalCandidates }}</div>
            <div class="metric-trend positive">+15% vs last period</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Active Positions</div>
            <div class="metric-value">{{ metrics.activePositions }}</div>
            <div class="metric-trend neutral">Same as last period</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Conversion Rate</div>
            <div class="metric-value">{{ metrics.conversionRate }}%</div>
            <div class="metric-trend positive">+3% improvement</div>
          </div>
        </div>
      </div>

      <div class="metric-section">
        <h3>Time Metrics</h3>
        <div class="metric-cards">
          <div class="metric-card">
            <div class="metric-label">Avg Time to Hire</div>
            <div class="metric-value">{{ metrics.avgTimeToHire }} days</div>
            <div class="metric-trend negative">+2 days slower</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Time in Screening</div>
            <div class="metric-value">{{ metrics.timeInScreening }} days</div>
            <div class="metric-trend positive">-1 day faster</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Time to First Interview</div>
            <div class="metric-value">{{ metrics.timeToInterview }} days</div>
            <div class="metric-trend neutral">No change</div>
          </div>
        </div>
      </div>

      <div class="metric-section full-width">
        <h3>Stage Performance</h3>
        <div class="stage-metrics">
          <div 
            v-for="stage in stageMetrics" 
            :key="stage.id"
            class="stage-metric"
          >
            <div class="stage-name">{{ stage.name }}</div>
            <div class="stage-stats">
              <div class="stat">
                <span class="stat-label">Count</span>
                <span class="stat-value">{{ stage.count }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Avg Days</span>
                <span class="stat-value">{{ stage.avgDays }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Success Rate</span>
                <span class="stat-value">{{ stage.successRate }}%</span>
              </div>
            </div>
            <div class="stage-progress">
              <div 
                class="progress-bar"
                :style="{ width: `${stage.successRate}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="lead-time-section">
      <LeadTimeTracker />
    </div>
    
    <div class="throughput-section">
      <ThroughputDashboard />
    </div>
    
    <div class="time-to-fill-section">
      <TimeToFillCalculator />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useWebSocket } from '../composables/useWebSocket.js'
import LeadTimeTracker from '../components/LeadTimeTracker.vue'
import ThroughputDashboard from '../components/ThroughputDashboard.vue'
import TimeToFillCalculator from '../components/TimeToFillCalculator.vue'

const { data: wsData } = useWebSocket('ws://localhost:8080/metrics')

const selectedPeriod = ref('month')

const metrics = ref({
  totalCandidates: 247,
  activePositions: 34,
  conversionRate: 23,
  avgTimeToHire: 18,
  timeInScreening: 3,
  timeToInterview: 7
})

const stageMetrics = ref([
  { id: 'sourcing', name: 'Sourcing', count: 45, avgDays: 2, successRate: 85 },
  { id: 'screening', name: 'Screening', count: 32, avgDays: 3, successRate: 78 },
  { id: 'phone-screen', name: 'Phone Screen', count: 18, avgDays: 1, successRate: 72 },
  { id: 'interview', name: 'Interview', count: 24, avgDays: 5, successRate: 65 },
  { id: 'technical', name: 'Technical', count: 12, avgDays: 3, successRate: 58 },
  { id: 'final-interview', name: 'Final Interview', count: 8, avgDays: 2, successRate: 75 },
  { id: 'offer', name: 'Offer', count: 6, avgDays: 4, successRate: 90 },
  { id: 'hired', name: 'Hired', count: 15, avgDays: 0, successRate: 100 }
])

watch(wsData, (newData) => {
  if (newData && newData.metrics) {
    Object.assign(metrics.value, newData.metrics)
  }
  if (newData && newData.stageMetrics) {
    stageMetrics.value = newData.stageMetrics
  }
})

watch(selectedPeriod, () => {
  // Fetch new data for selected period
  console.log('Fetching metrics for period:', selectedPeriod.value)
})
</script>

<style scoped>
.metrics-dashboard {
  padding: 20px;
}

.metrics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.metrics-header h2 {
  margin: 0;
  color: #172b4d;
}

.time-selector select {
  padding: 8px 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: white;
  font-size: 14px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.metric-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.metric-section.full-width,
.lead-time-section,
.throughput-section,
.time-to-fill-section {
  grid-column: 1 / -1;
}

.metric-section h3 {
  margin: 0 0 16px 0;
  color: #172b4d;
  font-size: 16px;
}

.metric-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.metric-card {
  padding: 16px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  text-align: center;
}

.metric-label {
  font-size: 12px;
  color: #5e6c84;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: #172b4d;
  margin-bottom: 4px;
}

.metric-trend {
  font-size: 11px;
  font-weight: 500;
}

.metric-trend.positive {
  color: #36b37e;
}

.metric-trend.negative {
  color: #ff5630;
}

.metric-trend.neutral {
  color: #5e6c84;
}

.stage-metrics {
  display: grid;
  gap: 16px;
}

.stage-metric {
  padding: 16px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
}

.stage-name {
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 12px;
}

.stage-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 12px;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 11px;
  color: #5e6c84;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.stat-value {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #172b4d;
}

.stage-progress {
  height: 4px;
  background: #f4f5f7;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #36b37e;
  border-radius: 2px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .metrics-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .stage-stats {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>