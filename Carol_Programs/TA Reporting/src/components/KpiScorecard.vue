<template>
  <div class="kpi-scorecard">
    <div class="scorecard-header">
      <h3>KPI Scorecard</h3>
      <div class="period-selector">
        <select v-model="selectedPeriod">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>
    </div>

    <div class="kpi-grid">
      <div 
        v-for="kpi in kpiMetrics" 
        :key="kpi.id"
        class="kpi-widget"
        :class="getKpiStatus(kpi)"
      >
        <div class="kpi-header">
          <div class="kpi-icon">{{ kpi.icon }}</div>
          <div class="kpi-status-indicator" :class="getKpiStatus(kpi)"></div>
        </div>
        
        <div class="kpi-content">
          <div class="kpi-title">{{ kpi.title }}</div>
          <div class="kpi-value">
            {{ formatValue(kpi.current, kpi.unit) }}
          </div>
          <div class="kpi-target">
            Target: {{ formatValue(kpi.target, kpi.unit) }}
          </div>
        </div>

        <div class="kpi-progress">
          <div class="progress-bar">
            <div 
              class="progress-fill"
              :class="getKpiStatus(kpi)"
              :style="{ width: `${getProgressPercentage(kpi)}%` }"
            ></div>
          </div>
          <div class="progress-text">
            {{ getProgressPercentage(kpi) }}% of target
          </div>
        </div>

        <div class="kpi-trend">
          <span class="trend-icon" :class="getTrendClass(kpi.trend)">
            {{ getTrendIcon(kpi.trend) }}
          </span>
          <span class="trend-text">
            {{ Math.abs(kpi.trend) }}% vs last period
          </span>
        </div>
      </div>
    </div>

    <div class="scorecard-summary">
      <div class="summary-stats">
        <div class="stat-item">
          <span class="stat-count on-track">{{ onTrackCount }}</span>
          <span class="stat-label">On Track</span>
        </div>
        <div class="stat-item">
          <span class="stat-count caution">{{ cautionCount }}</span>
          <span class="stat-label">Caution</span>
        </div>
        <div class="stat-item">
          <span class="stat-count at-risk">{{ atRiskCount }}</span>
          <span class="stat-label">At Risk</span>
        </div>
      </div>
      
      <div class="overall-score">
        <div class="score-circle" :class="overallStatus">
          <span class="score-value">{{ overallScore }}%</span>
        </div>
        <div class="score-label">Overall Performance</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPeriod = ref('month')

const kpiMetrics = ref([
  {
    id: 'time-to-fill',
    title: 'Time to Fill',
    icon: '⏱️',
    current: 45,
    target: 60,
    unit: 'days',
    trend: -8,
    isReverse: true // Lower is better
  },
  {
    id: 'offer-acceptance',
    title: 'Offer Acceptance Rate',
    icon: '✅',
    current: 82,
    target: 75,
    unit: '%',
    trend: 5,
    isReverse: false // Higher is better
  },
  {
    id: 'quality-of-hire',
    title: 'Quality of Hire',
    icon: '⭐',
    current: 85,
    target: 80,
    unit: '%',
    trend: 3,
    isReverse: false
  },
  {
    id: 'cost-per-hire',
    title: 'Cost per Hire',
    icon: '💰',
    current: 4200,
    target: 5000,
    unit: '$',
    trend: -12,
    isReverse: true
  },
  {
    id: 'candidate-satisfaction',
    title: 'Candidate Satisfaction',
    icon: '😊',
    current: 78,
    target: 85,
    unit: '%',
    trend: 2,
    isReverse: false
  },
  {
    id: 'hiring-manager-satisfaction',
    title: 'Hiring Manager Satisfaction',
    icon: '👔',
    current: 88,
    target: 80,
    unit: '%',
    trend: 7,
    isReverse: false
  }
])

const getKpiStatus = (kpi) => {
  const percentage = getProgressPercentage(kpi)
  
  if (kpi.isReverse) {
    // For reverse KPIs (lower is better)
    if (percentage <= 80) return 'on-track'
    if (percentage <= 95) return 'caution'
    return 'at-risk'
  } else {
    // For normal KPIs (higher is better)
    if (percentage >= 100) return 'on-track'
    if (percentage >= 85) return 'caution'
    return 'at-risk'
  }
}

const getProgressPercentage = (kpi) => {
  if (kpi.isReverse) {
    // For reverse KPIs, calculate how close to or under target
    return Math.min((kpi.current / kpi.target) * 100, 120)
  } else {
    // For normal KPIs, calculate progress toward target
    return Math.min((kpi.current / kpi.target) * 100, 120)
  }
}

const getTrendClass = (trend) => {
  if (trend > 0) return 'positive'
  if (trend < 0) return 'negative'
  return 'neutral'
}

const getTrendIcon = (trend) => {
  if (trend > 0) return '↗️'
  if (trend < 0) return '↘️'
  return '➡️'
}

const formatValue = (value, unit) => {
  if (unit === '$') {
    return `$${value.toLocaleString()}`
  }
  if (unit === '%') {
    return `${value}%`
  }
  return `${value} ${unit}`
}

const onTrackCount = computed(() => {
  return kpiMetrics.value.filter(kpi => getKpiStatus(kpi) === 'on-track').length
})

const cautionCount = computed(() => {
  return kpiMetrics.value.filter(kpi => getKpiStatus(kpi) === 'caution').length
})

const atRiskCount = computed(() => {
  return kpiMetrics.value.filter(kpi => getKpiStatus(kpi) === 'at-risk').length
})

const overallScore = computed(() => {
  const totalKpis = kpiMetrics.value.length
  const onTrackWeight = onTrackCount.value * 100
  const cautionWeight = cautionCount.value * 70
  const atRiskWeight = atRiskCount.value * 30
  
  return Math.round((onTrackWeight + cautionWeight + atRiskWeight) / totalKpis)
})

const overallStatus = computed(() => {
  if (overallScore.value >= 85) return 'on-track'
  if (overallScore.value >= 70) return 'caution'
  return 'at-risk'
})
</script>

<style scoped>
.kpi-scorecard {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.scorecard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.scorecard-header h3 {
  margin: 0;
  color: #172b4d;
}

.period-selector select {
  padding: 6px 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: white;
  font-size: 14px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.kpi-widget {
  background: #f9fafc;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
}

.kpi-widget.on-track {
  border-color: #36b37e;
  background: #f3fcf5;
}

.kpi-widget.caution {
  border-color: #ff8b00;
  background: #fff8f0;
}

.kpi-widget.at-risk {
  border-color: #ff5630;
  background: #fff4f3;
}

.kpi-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.kpi-icon {
  font-size: 24px;
}

.kpi-status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.kpi-status-indicator.on-track {
  background: #36b37e;
}

.kpi-status-indicator.caution {
  background: #ff8b00;
}

.kpi-status-indicator.at-risk {
  background: #ff5630;
}

.kpi-content {
  margin-bottom: 16px;
}

.kpi-title {
  font-size: 14px;
  color: #5e6c84;
  margin-bottom: 8px;
  font-weight: 500;
}

.kpi-value {
  font-size: 32px;
  font-weight: 700;
  color: #172b4d;
  margin-bottom: 4px;
}

.kpi-target {
  font-size: 12px;
  color: #5e6c84;
}

.kpi-progress {
  margin-bottom: 12px;
}

.progress-bar {
  height: 6px;
  background: #f4f5f7;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-fill.on-track {
  background: #36b37e;
}

.progress-fill.caution {
  background: #ff8b00;
}

.progress-fill.at-risk {
  background: #ff5630;
}

.progress-text {
  font-size: 11px;
  color: #5e6c84;
  text-align: right;
}

.kpi-trend {
  display: flex;
  align-items: center;
  gap: 4px;
}

.trend-icon {
  font-size: 12px;
}

.trend-icon.positive {
  color: #36b37e;
}

.trend-icon.negative {
  color: #ff5630;
}

.trend-icon.neutral {
  color: #5e6c84;
}

.trend-text {
  font-size: 11px;
  color: #5e6c84;
}

.scorecard-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e1e5e9;
}

.summary-stats {
  display: flex;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-count {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-count.on-track {
  color: #36b37e;
}

.stat-count.caution {
  color: #ff8b00;
}

.stat-count.at-risk {
  color: #ff5630;
}

.stat-label {
  font-size: 12px;
  color: #5e6c84;
  text-transform: uppercase;
}

.overall-score {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid;
  margin-bottom: 8px;
}

.score-circle.on-track {
  background: #f3fcf5;
  border-color: #36b37e;
}

.score-circle.caution {
  background: #fff8f0;
  border-color: #ff8b00;
}

.score-circle.at-risk {
  background: #fff4f3;
  border-color: #ff5630;
}

.score-value {
  font-size: 18px;
  font-weight: 700;
  color: #172b4d;
}

.score-label {
  font-size: 12px;
  color: #5e6c84;
  text-align: center;
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
  
  .scorecard-summary {
    flex-direction: column;
    gap: 20px;
  }
  
  .summary-stats {
    justify-content: center;
  }
}
</style>