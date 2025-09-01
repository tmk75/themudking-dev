<template>
  <div class="lead-time-tracker">
    <div class="tracker-header">
      <h3>Lead Time Tracker</h3>
      <div class="tracker-controls">
        <select v-model="selectedSLE" @change="updateSLE">
          <option value="45">SLE: 45 days (85%)</option>
          <option value="60">SLE: 60 days (90%)</option>
          <option value="30">SLE: 30 days (75%)</option>
        </select>
        <select v-model="selectedDepartment" @change="updateData">
          <option value="all">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
    </div>

    <div class="tracker-grid">
      <!-- SLE Performance -->
      <div class="sle-performance">
        <h4>Service Level Performance</h4>
        <div class="sle-metrics">
          <div class="sle-gauge">
            <div class="gauge-container">
              <div 
                class="gauge-fill"
                :class="getSLEStatus(slePerformance.current)"
                :style="{ 
                  background: `conic-gradient(${getSLEColor(slePerformance.current)} ${slePerformance.current * 3.6}deg, #f4f5f7 0deg)`
                }"
              >
                <div class="gauge-center">
                  <div class="gauge-value">{{ slePerformance.current }}%</div>
                  <div class="gauge-label">Meeting SLE</div>
                </div>
              </div>
            </div>
            <div class="sle-target">Target: {{ slePerformance.target }}%</div>
          </div>
          
          <div class="sle-details">
            <div class="sle-stat">
              <span class="stat-label">Within SLE</span>
              <span class="stat-value success">{{ sleStats.withinSLE }}</span>
            </div>
            <div class="sle-stat">
              <span class="stat-label">Approaching SLE</span>
              <span class="stat-value warning">{{ sleStats.approaching }}</span>
            </div>
            <div class="sle-stat">
              <span class="stat-label">Breached SLE</span>
              <span class="stat-value danger">{{ sleStats.breached }}</span>
            </div>
            <div class="sle-stat">
              <span class="stat-label">Avg Lead Time</span>
              <span class="stat-value">{{ sleStats.avgLeadTime }}d</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Aging Chart -->
      <div class="aging-chart">
        <h4>Candidate Aging Distribution</h4>
        <div class="aging-buckets">
          <div 
            v-for="bucket in agingBuckets" 
            :key="bucket.range"
            class="aging-bucket"
            :class="bucket.status"
          >
            <div class="bucket-header">
              <span class="bucket-range">{{ bucket.range }}</span>
              <span class="bucket-count">{{ bucket.count }}</span>
            </div>
            <div class="bucket-bar">
              <div 
                class="bucket-fill"
                :style="{ 
                  height: `${(bucket.count / maxBucketCount) * 100}%`,
                  background: getBucketColor(bucket.status)
                }"
              ></div>
            </div>
            <div class="bucket-percentage">{{ bucket.percentage }}%</div>
          </div>
        </div>
      </div>

      <!-- Active Candidates -->
      <div class="active-candidates">
        <h4>Active Candidates by Lead Time</h4>
        <div class="candidates-list">
          <div 
            v-for="candidate in activeCandidates" 
            :key="candidate.id"
            class="candidate-row"
            :class="getLeadTimeStatus(candidate.leadTime)"
          >
            <div class="candidate-info">
              <div class="candidate-name">{{ candidate.name }}</div>
              <div class="candidate-role">{{ candidate.role }}</div>
            </div>
            
            <div class="candidate-stage">
              <span class="stage-name">{{ candidate.currentStage }}</span>
            </div>
            
            <div class="candidate-timing">
              <div class="lead-time">
                <span class="time-value">{{ candidate.leadTime }}d</span>
                <span class="time-label">Lead Time</span>
              </div>
              <div class="predicted-completion">
                <span class="prediction-value">{{ candidate.predictedCompletion }}d</span>
                <span class="prediction-label">Est. Total</span>
              </div>
            </div>
            
            <div class="candidate-progress">
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  :style="{ 
                    width: `${(candidate.leadTime / selectedSLE) * 100}%`,
                    background: getProgressColor(candidate.leadTime, selectedSLE)
                  }"
                ></div>
              </div>
              <div class="sle-indicator" :class="getSLEIndicator(candidate.predictedCompletion)">
                {{ getSLEIndicator(candidate.predictedCompletion) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Predictive Analytics -->
      <div class="predictive-analytics">
        <h4>Predictive Completion Analysis</h4>
        <div class="prediction-summary">
          <div class="prediction-metric">
            <span class="metric-label">Likely to Meet SLE</span>
            <span class="metric-value success">{{ predictions.likelyToMeet }}</span>
          </div>
          <div class="prediction-metric">
            <span class="metric-label">At Risk</span>
            <span class="metric-value warning">{{ predictions.atRisk }}</span>
          </div>
          <div class="prediction-metric">
            <span class="metric-label">Will Breach SLE</span>
            <span class="metric-value danger">{{ predictions.willBreach }}</span>
          </div>
        </div>
        
        <div class="prediction-chart">
          <div class="chart-header">Completion Forecast (Next 30 Days)</div>
          <div class="forecast-bars">
            <div 
              v-for="forecast in completionForecast" 
              :key="forecast.week"
              class="forecast-bar"
            >
              <div class="bar-container">
                <div 
                  class="bar-segment within-sle"
                  :style="{ height: `${(forecast.withinSLE / forecast.total) * 100}%` }"
                ></div>
                <div 
                  class="bar-segment breach-sle"
                  :style="{ height: `${(forecast.breachSLE / forecast.total) * 100}%` }"
                ></div>
              </div>
              <div class="bar-label">{{ forecast.week }}</div>
              <div class="bar-total">{{ forecast.total }}</div>
            </div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color within-sle"></div>
              <span>Within SLE</span>
            </div>
            <div class="legend-item">
              <div class="legend-color breach-sle"></div>
              <span>Breach SLE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedSLE = ref(45)
const selectedDepartment = ref('all')

const slePerformance = ref({
  current: 82,
  target: 85
})

const sleStats = ref({
  withinSLE: 156,
  approaching: 23,
  breached: 8,
  avgLeadTime: 38
})

const agingBuckets = ref([
  { range: '0-15d', count: 45, percentage: 24, status: 'good' },
  { range: '16-30d', count: 67, percentage: 36, status: 'good' },
  { range: '31-45d', count: 42, percentage: 22, status: 'warning' },
  { range: '46-60d', count: 25, percentage: 13, status: 'danger' },
  { range: '60+d', count: 8, percentage: 4, status: 'critical' }
])

const activeCandidates = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Engineer',
    currentStage: 'Technical Assessment',
    leadTime: 28,
    predictedCompletion: 42,
    department: 'engineering'
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Sales Manager',
    currentStage: 'Final Interview',
    leadTime: 35,
    predictedCompletion: 48,
    department: 'sales'
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Marketing Specialist',
    currentStage: 'Phone Screen',
    leadTime: 12,
    predictedCompletion: 32,
    department: 'marketing'
  },
  {
    id: 4,
    name: 'John Smith',
    role: 'DevOps Engineer',
    currentStage: 'Offer Process',
    leadTime: 41,
    predictedCompletion: 46,
    department: 'engineering'
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Product Manager',
    currentStage: 'Interview',
    leadTime: 52,
    predictedCompletion: 65,
    department: 'engineering'
  }
])

const predictions = ref({
  likelyToMeet: 142,
  atRisk: 31,
  willBreach: 14
})

const completionForecast = ref([
  { week: 'Week 1', total: 18, withinSLE: 15, breachSLE: 3 },
  { week: 'Week 2', total: 22, withinSLE: 18, breachSLE: 4 },
  { week: 'Week 3', total: 16, withinSLE: 12, breachSLE: 4 },
  { week: 'Week 4', total: 20, withinSLE: 16, breachSLE: 4 }
])

const maxBucketCount = computed(() => {
  return Math.max(...agingBuckets.value.map(b => b.count))
})

const getSLEStatus = (percentage) => {
  if (percentage >= 85) return 'excellent'
  if (percentage >= 75) return 'good'
  if (percentage >= 65) return 'warning'
  return 'critical'
}

const getSLEColor = (percentage) => {
  if (percentage >= 85) return '#36b37e'
  if (percentage >= 75) return '#00875a'
  if (percentage >= 65) return '#ff8b00'
  return '#ff5630'
}

const getBucketColor = (status) => {
  const colors = {
    good: '#36b37e',
    warning: '#ff8b00',
    danger: '#ff5630',
    critical: '#de350b'
  }
  return colors[status] || '#dfe1e6'
}

const getLeadTimeStatus = (leadTime) => {
  if (leadTime <= selectedSLE.value * 0.7) return 'on-track'
  if (leadTime <= selectedSLE.value * 0.9) return 'approaching'
  return 'at-risk'
}

const getProgressColor = (leadTime, sle) => {
  const percentage = (leadTime / sle) * 100
  if (percentage <= 70) return '#36b37e'
  if (percentage <= 90) return '#ff8b00'
  return '#ff5630'
}

const getSLEIndicator = (predictedCompletion) => {
  if (predictedCompletion <= selectedSLE.value) return 'SAFE'
  if (predictedCompletion <= selectedSLE.value * 1.1) return 'RISK'
  return 'BREACH'
}

const updateSLE = () => {
  console.log('Updated SLE to:', selectedSLE.value, 'days')
}

const updateData = () => {
  console.log('Updated department filter to:', selectedDepartment.value)
}
</script>

<style scoped>
.lead-time-tracker {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.tracker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.tracker-header h3 {
  margin: 0;
  color: #172b4d;
}

.tracker-controls {
  display: flex;
  gap: 12px;
}

.tracker-controls select {
  padding: 6px 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: white;
  font-size: 14px;
}

.tracker-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.sle-performance,
.aging-chart,
.active-candidates,
.predictive-analytics {
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
}

.active-candidates,
.predictive-analytics {
  grid-column: 1 / -1;
}

.sle-performance h4,
.aging-chart h4,
.active-candidates h4,
.predictive-analytics h4 {
  margin: 0 0 16px 0;
  color: #172b4d;
  font-size: 16px;
}

.sle-metrics {
  display: flex;
  gap: 24px;
  align-items: center;
}

.gauge-container {
  width: 120px;
  height: 120px;
  position: relative;
}

.gauge-fill {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gauge-center {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gauge-value {
  font-size: 20px;
  font-weight: 700;
  color: #172b4d;
}

.gauge-label {
  font-size: 10px;
  color: #5e6c84;
  text-transform: uppercase;
}

.sle-target {
  text-align: center;
  margin-top: 8px;
  font-size: 12px;
  color: #5e6c84;
}

.sle-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sle-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 12px;
  color: #5e6c84;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
}

.stat-value.success {
  color: #36b37e;
}

.stat-value.warning {
  color: #ff8b00;
}

.stat-value.danger {
  color: #ff5630;
}

.aging-buckets {
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 200px;
  padding: 0 10px;
}

.aging-bucket {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 60px;
}

.bucket-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.bucket-range {
  font-size: 10px;
  color: #5e6c84;
}

.bucket-count {
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
}

.bucket-bar {
  width: 20px;
  height: 120px;
  background: #f4f5f7;
  border-radius: 2px;
  display: flex;
  align-items: end;
  margin-bottom: 8px;
}

.bucket-fill {
  width: 100%;
  border-radius: 2px;
  transition: height 0.3s ease;
}

.bucket-percentage {
  font-size: 10px;
  color: #5e6c84;
}

.candidates-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
}

.candidate-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 16px;
  align-items: center;
  padding: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

.candidate-row.on-track {
  border-left: 4px solid #36b37e;
}

.candidate-row.approaching {
  border-left: 4px solid #ff8b00;
}

.candidate-row.at-risk {
  border-left: 4px solid #ff5630;
}

.candidate-name {
  font-weight: 600;
  color: #172b4d;
}

.candidate-role {
  font-size: 12px;
  color: #5e6c84;
}

.stage-name {
  font-size: 12px;
  color: #172b4d;
  background: #f4f5f7;
  padding: 4px 8px;
  border-radius: 3px;
}

.candidate-timing {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lead-time,
.predicted-completion {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-value,
.prediction-value {
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
}

.time-label,
.prediction-label {
  font-size: 10px;
  color: #5e6c84;
}

.candidate-progress {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.progress-bar {
  height: 6px;
  background: #f4f5f7;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.sle-indicator {
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  padding: 2px 4px;
  border-radius: 3px;
}

.sle-indicator.SAFE {
  background: #e3fcef;
  color: #006644;
}

.sle-indicator.RISK {
  background: #fff4e6;
  color: #974f00;
}

.sle-indicator.BREACH {
  background: #ffebe6;
  color: #bf2600;
}

.prediction-summary {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.prediction-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.metric-label {
  font-size: 12px;
  color: #5e6c84;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 20px;
  font-weight: 700;
}

.prediction-chart {
  border-top: 1px solid #e1e5e9;
  padding-top: 16px;
}

.chart-header {
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 12px;
}

.forecast-bars {
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 100px;
  margin-bottom: 12px;
}

.forecast-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 60px;
}

.bar-container {
  width: 30px;
  height: 80px;
  background: #f4f5f7;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-bottom: 4px;
}

.bar-segment {
  border-radius: 2px;
}

.bar-segment.within-sle {
  background: #36b37e;
}

.bar-segment.breach-sle {
  background: #ff5630;
}

.bar-label {
  font-size: 10px;
  color: #5e6c84;
  margin-bottom: 2px;
}

.bar-total {
  font-size: 12px;
  font-weight: 600;
  color: #172b4d;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #5e6c84;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.within-sle {
  background: #36b37e;
}

.legend-color.breach-sle {
  background: #ff5630;
}

@media (max-width: 768px) {
  .tracker-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .tracker-grid {
    grid-template-columns: 1fr;
  }
  
  .sle-metrics {
    flex-direction: column;
    gap: 16px;
  }
  
  .candidate-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>