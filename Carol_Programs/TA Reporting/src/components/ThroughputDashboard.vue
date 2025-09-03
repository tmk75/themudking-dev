<template>
  <div class="throughput-dashboard">
    <div class="dashboard-header">
      <h3>Throughput Dashboard</h3>
      <div class="dashboard-controls">
        <select v-model="selectedPeriod" @change="updateData">
          <option value="daily">Daily View</option>
          <option value="weekly">Weekly View</option>
          <option value="monthly">Monthly View</option>
        </select>
        <select v-model="selectedTeam" @change="updateData">
          <option value="all">All Teams</option>
          <option value="engineering">Engineering</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
    </div>

    <div class="dashboard-grid">
      <!-- Current Throughput Metrics -->
      <div class="throughput-metrics">
        <h4>Current Throughput</h4>
        <div class="metric-cards">
          <div class="metric-card">
            <div class="metric-label">{{ selectedPeriod === 'daily' ? 'Today' : selectedPeriod === 'weekly' ? 'This Week' : 'This Month' }}</div>
            <div class="metric-value">{{ currentThroughput.current }}</div>
            <div class="metric-trend" :class="getTrendClass(currentThroughput.trend)">
              {{ currentThroughput.trend > 0 ? '+' : '' }}{{ currentThroughput.trend }}% vs last period
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Average Throughput</div>
            <div class="metric-value">{{ currentThroughput.average }}</div>
            <div class="metric-subtitle">per {{ selectedPeriod.slice(0, -2) }}</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Peak Throughput</div>
            <div class="metric-value">{{ currentThroughput.peak }}</div>
            <div class="metric-subtitle">highest {{ selectedPeriod.slice(0, -2) }}</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Throughput Efficiency</div>
            <div class="metric-value" :class="getEfficiencyClass(currentThroughput.efficiency)">
              {{ currentThroughput.efficiency }}%
            </div>
            <div class="metric-subtitle">vs capacity</div>
          </div>
        </div>
      </div>

      <!-- Throughput Chart -->
      <div class="throughput-chart">
        <h4>Throughput Trend</h4>
        <div class="chart-container">
          <div class="chart-area">
            <div 
              v-for="(point, index) in throughputData" 
              :key="index"
              class="chart-bar"
              :style="{ 
                height: `${(point.completed / maxThroughput) * 100}%`,
                background: getBarColor(point.completed, point.capacity)
              }"
              :title="`${point.period}: ${point.completed} completed (${point.capacity} capacity)`"
            >
              <div class="bar-value">{{ point.completed }}</div>
            </div>
          </div>
          <div class="chart-labels">
            <div 
              v-for="(point, index) in throughputData" 
              :key="index"
              class="chart-label"
            >
              {{ point.period }}
            </div>
          </div>
        </div>
      </div>

      <!-- Capacity Planning -->
      <div class="capacity-planning">
        <h4>Capacity Planning</h4>
        <div class="capacity-analysis">
          <div class="capacity-overview">
            <div class="capacity-metric">
              <span class="capacity-label">Current Capacity</span>
              <span class="capacity-value">{{ capacityData.current }}</span>
            </div>
            <div class="capacity-metric">
              <span class="capacity-label">Utilization</span>
              <span class="capacity-value" :class="getUtilizationClass(capacityData.utilization)">
                {{ capacityData.utilization }}%
              </span>
            </div>
            <div class="capacity-metric">
              <span class="capacity-label">Optimal Capacity</span>
              <span class="capacity-value">{{ capacityData.optimal }}</span>
            </div>
          </div>
          
          <div class="capacity-breakdown">
            <div 
              v-for="resource in capacityBreakdown" 
              :key="resource.type"
              class="resource-item"
            >
              <div class="resource-header">
                <span class="resource-name">{{ resource.name }}</span>
                <span class="resource-count">{{ resource.available }}/{{ resource.total }}</span>
              </div>
              <div class="resource-bar">
                <div 
                  class="resource-fill"
                  :style="{ 
                    width: `${(resource.available / resource.total) * 100}%`,
                    background: getResourceColor(resource.utilization)
                  }"
                ></div>
              </div>
              <div class="resource-utilization">{{ resource.utilization }}% utilized</div>
            </div>
          </div>
        </div>
      </div>

      <!-- WIP Correlation -->
      <div class="wip-correlation">
        <h4>WIP Limits vs Throughput</h4>
        <div class="correlation-chart">
          <div 
            v-for="stage in wipCorrelation" 
            :key="stage.name"
            class="correlation-item"
          >
            <div class="stage-info">
              <div class="stage-name">{{ stage.name }}</div>
              <div class="stage-metrics">
                <span class="wip-current">WIP: {{ stage.currentWIP }}/{{ stage.wipLimit }}</span>
                <span class="throughput-rate">{{ stage.throughput }}/day</span>
              </div>
            </div>
            <div class="correlation-visual">
              <div class="wip-bar">
                <div 
                  class="wip-fill"
                  :style="{ 
                    width: `${(stage.currentWIP / stage.wipLimit) * 100}%`,
                    background: getWIPColor(stage.currentWIP, stage.wipLimit)
                  }"
                ></div>
              </div>
              <div class="throughput-indicator" :class="getThroughputStatus(stage.throughput, stage.expectedThroughput)">
                {{ stage.throughput > stage.expectedThroughput ? '↗️' : stage.throughput < stage.expectedThroughput ? '↘️' : '➡️' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Forecasting -->
      <div class="forecasting">
        <h4>Hiring Forecast</h4>
        <div class="forecast-controls">
          <div class="forecast-input">
            <label>Target Hires:</label>
            <input v-model.number="forecastTarget" type="number" min="1" @input="updateForecast">
          </div>
          <div class="forecast-input">
            <label>Time Frame:</label>
            <select v-model="forecastTimeframe" @change="updateForecast">
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
            </select>
          </div>
        </div>
        
        <div class="forecast-results">
          <div class="forecast-metric">
            <span class="forecast-label">Predicted Completions</span>
            <span class="forecast-value">{{ forecastResults.predicted }}</span>
          </div>
          <div class="forecast-metric">
            <span class="forecast-label">Capacity Needed</span>
            <span class="forecast-value" :class="getCapacityNeedClass(forecastResults.capacityGap)">
              {{ forecastResults.capacityNeeded }}
            </span>
          </div>
          <div class="forecast-metric">
            <span class="forecast-label">Success Probability</span>
            <span class="forecast-value" :class="getProbabilityClass(forecastResults.probability)">
              {{ forecastResults.probability }}%
            </span>
          </div>
        </div>
        
        <div class="forecast-recommendations">
          <div v-if="forecastResults.capacityGap > 0" class="recommendation warning">
            ⚠️ Need {{ forecastResults.capacityGap }} additional capacity to meet target
          </div>
          <div v-else-if="forecastResults.capacityGap < -5" class="recommendation info">
            ℹ️ Current capacity exceeds target by {{ Math.abs(forecastResults.capacityGap) }}
          </div>
          <div v-else class="recommendation success">
            ✅ Current capacity sufficient to meet target
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPeriod = ref('weekly')
const selectedTeam = ref('all')
const forecastTarget = ref(50)
const forecastTimeframe = ref(60)

const currentThroughput = ref({
  current: 12,
  average: 15,
  peak: 22,
  efficiency: 78,
  trend: -8
})

const throughputData = ref([
  { period: 'W1', completed: 18, capacity: 25 },
  { period: 'W2', completed: 22, capacity: 25 },
  { period: 'W3', completed: 15, capacity: 25 },
  { period: 'W4', completed: 19, capacity: 25 },
  { period: 'W5', completed: 12, capacity: 25 },
  { period: 'W6', completed: 16, capacity: 25 },
  { period: 'W7', completed: 20, capacity: 25 },
  { period: 'W8', completed: 14, capacity: 25 }
])

const capacityData = ref({
  current: 25,
  utilization: 78,
  optimal: 28
})

const capacityBreakdown = ref([
  { type: 'recruiters', name: 'Recruiters', available: 8, total: 10, utilization: 85 },
  { type: 'interviewers', name: 'Interviewers', available: 12, total: 15, utilization: 72 },
  { type: 'managers', name: 'Hiring Managers', available: 6, total: 8, utilization: 90 }
])

const wipCorrelation = ref([
  { name: 'Screening', currentWIP: 15, wipLimit: 15, throughput: 8, expectedThroughput: 10 },
  { name: 'Interview', currentWIP: 8, wipLimit: 10, throughput: 6, expectedThroughput: 7 },
  { name: 'Technical', currentWIP: 5, wipLimit: 8, throughput: 4, expectedThroughput: 5 },
  { name: 'Final', currentWIP: 3, wipLimit: 5, throughput: 3, expectedThroughput: 3 }
])

const maxThroughput = computed(() => {
  return Math.max(...throughputData.value.map(d => d.completed))
})

const forecastResults = computed(() => {
  const avgThroughput = currentThroughput.value.average
  const timeframeDays = forecastTimeframe.value
  const periods = selectedPeriod.value === 'daily' ? timeframeDays : 
                 selectedPeriod.value === 'weekly' ? Math.ceil(timeframeDays / 7) : 
                 Math.ceil(timeframeDays / 30)
  
  const predicted = Math.round(avgThroughput * periods)
  const capacityNeeded = Math.ceil(forecastTarget.value / periods)
  const capacityGap = capacityNeeded - avgThroughput
  const probability = Math.min(100, Math.max(0, 100 - (capacityGap * 10)))
  
  return {
    predicted,
    capacityNeeded,
    capacityGap,
    probability
  }
})

const getTrendClass = (trend) => {
  if (trend > 0) return 'positive'
  if (trend < 0) return 'negative'
  return 'neutral'
}

const getEfficiencyClass = (efficiency) => {
  if (efficiency >= 85) return 'excellent'
  if (efficiency >= 70) return 'good'
  if (efficiency >= 55) return 'warning'
  return 'poor'
}

const getBarColor = (completed, capacity) => {
  const ratio = completed / capacity
  if (ratio >= 0.9) return '#36b37e'
  if (ratio >= 0.7) return '#ff8b00'
  return '#ff5630'
}

const getUtilizationClass = (utilization) => {
  if (utilization >= 95) return 'critical'
  if (utilization >= 85) return 'warning'
  if (utilization >= 70) return 'good'
  return 'low'
}

const getResourceColor = (utilization) => {
  if (utilization >= 95) return '#ff5630'
  if (utilization >= 85) return '#ff8b00'
  if (utilization >= 70) return '#36b37e'
  return '#0052cc'
}

const getWIPColor = (current, limit) => {
  const ratio = current / limit
  if (ratio >= 1) return '#ff5630'
  if (ratio >= 0.8) return '#ff8b00'
  return '#36b37e'
}

const getThroughputStatus = (actual, expected) => {
  if (actual > expected) return 'above'
  if (actual < expected) return 'below'
  return 'on-target'
}

const getCapacityNeedClass = (gap) => {
  if (gap > 5) return 'critical'
  if (gap > 0) return 'warning'
  return 'good'
}

const getProbabilityClass = (probability) => {
  if (probability >= 80) return 'high'
  if (probability >= 60) return 'medium'
  return 'low'
}

const updateData = () => {
  console.log('Updating data for period:', selectedPeriod.value, 'team:', selectedTeam.value)
}

const updateForecast = () => {
  console.log('Updating forecast for target:', forecastTarget.value, 'timeframe:', forecastTimeframe.value)
}
</script>

<style scoped>
.throughput-dashboard {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-header h3 {
  margin: 0;
  color: #172b4d;
}

.dashboard-controls {
  display: flex;
  gap: 12px;
}

.dashboard-controls select {
  padding: 6px 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: white;
  font-size: 14px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.throughput-metrics,
.throughput-chart,
.capacity-planning,
.wip-correlation,
.forecasting {
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
}

.forecasting {
  grid-column: 1 / -1;
}

.throughput-metrics h4,
.throughput-chart h4,
.capacity-planning h4,
.wip-correlation h4,
.forecasting h4 {
  margin: 0 0 16px 0;
  color: #172b4d;
  font-size: 16px;
}

.metric-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.metric-card {
  text-align: center;
  padding: 12px;
  background: #f9fafc;
  border-radius: 4px;
}

.metric-label {
  font-size: 11px;
  color: #5e6c84;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.metric-value {
  font-size: 20px;
  font-weight: 700;
  color: #172b4d;
  margin-bottom: 2px;
}

.metric-subtitle {
  font-size: 10px;
  color: #5e6c84;
}

.metric-trend {
  font-size: 10px;
  font-weight: 500;
}

.metric-trend.positive {
  color: #36b37e;
}

.metric-trend.negative {
  color: #ff5630;
}

.metric-value.excellent {
  color: #36b37e;
}

.metric-value.good {
  color: #00875a;
}

.metric-value.warning {
  color: #ff8b00;
}

.metric-value.poor {
  color: #ff5630;
}

.chart-container {
  height: 200px;
}

.chart-area {
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 160px;
  padding: 0 10px;
}

.chart-bar {
  flex: 1;
  max-width: 30px;
  margin: 0 2px;
  border-radius: 2px;
  display: flex;
  align-items: end;
  justify-content: center;
  transition: height 0.3s ease;
  position: relative;
}

.bar-value {
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 0 10px;
}

.chart-label {
  font-size: 10px;
  color: #5e6c84;
  text-align: center;
  flex: 1;
}

.capacity-analysis {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.capacity-overview {
  display: flex;
  justify-content: space-between;
}

.capacity-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.capacity-label {
  font-size: 11px;
  color: #5e6c84;
  margin-bottom: 4px;
}

.capacity-value {
  font-size: 16px;
  font-weight: 600;
  color: #172b4d;
}

.capacity-value.critical {
  color: #ff5630;
}

.capacity-value.warning {
  color: #ff8b00;
}

.capacity-value.good {
  color: #36b37e;
}

.capacity-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.resource-item {
  padding: 8px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

.resource-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.resource-name {
  font-size: 12px;
  font-weight: 500;
  color: #172b4d;
}

.resource-count {
  font-size: 11px;
  color: #5e6c84;
}

.resource-bar {
  height: 6px;
  background: #f4f5f7;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
}

.resource-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.resource-utilization {
  font-size: 10px;
  color: #5e6c84;
  text-align: right;
}

.correlation-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.correlation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

.stage-info {
  flex: 1;
}

.stage-name {
  font-size: 12px;
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 2px;
}

.stage-metrics {
  display: flex;
  gap: 8px;
}

.wip-current,
.throughput-rate {
  font-size: 10px;
  color: #5e6c84;
}

.correlation-visual {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wip-bar {
  width: 60px;
  height: 6px;
  background: #f4f5f7;
  border-radius: 3px;
  overflow: hidden;
}

.wip-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.throughput-indicator {
  font-size: 12px;
}

.throughput-indicator.above {
  color: #36b37e;
}

.throughput-indicator.below {
  color: #ff5630;
}

.throughput-indicator.on-target {
  color: #5e6c84;
}

.forecast-controls {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.forecast-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.forecast-input label {
  font-size: 12px;
  color: #5e6c84;
  font-weight: 500;
}

.forecast-input input,
.forecast-input select {
  padding: 6px 8px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  font-size: 14px;
}

.forecast-results {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
}

.forecast-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.forecast-label {
  font-size: 11px;
  color: #5e6c84;
  margin-bottom: 4px;
}

.forecast-value {
  font-size: 18px;
  font-weight: 700;
  color: #172b4d;
}

.forecast-value.critical {
  color: #ff5630;
}

.forecast-value.warning {
  color: #ff8b00;
}

.forecast-value.good {
  color: #36b37e;
}

.forecast-value.high {
  color: #36b37e;
}

.forecast-value.medium {
  color: #ff8b00;
}

.forecast-value.low {
  color: #ff5630;
}

.forecast-recommendations {
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
}

.recommendation.success {
  background: #e3fcef;
  color: #006644;
  border: 1px solid #36b37e;
}

.recommendation.warning {
  background: #fff4e6;
  color: #974f00;
  border: 1px solid #ff8b00;
}

.recommendation.info {
  background: #e6f2ff;
  color: #0052cc;
  border: 1px solid #0065ff;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .metric-cards {
    grid-template-columns: 1fr;
  }
  
  .forecast-controls {
    flex-direction: column;
  }
  
  .forecast-results {
    flex-direction: column;
    gap: 12px;
  }
}
</style>