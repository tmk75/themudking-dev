<template>
  <div class="cycle-time-analysis">
    <div class="analysis-header">
      <h3>Cycle Time Analysis</h3>
      <div class="analysis-controls">
        <select v-model="selectedPeriod" @change="updateAnalysis">
          <option value="30">Last 30 Days</option>
          <option value="60">Last 60 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
        <select v-model="selectedRole" @change="updateAnalysis">
          <option value="all">All Roles</option>
          <option value="engineering">Engineering</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
    </div>

    <div class="analysis-grid">
      <!-- Key Metrics -->
      <div class="metrics-section">
        <h4>Key Metrics</h4>
        <div class="metric-cards">
          <div class="metric-card">
            <div class="metric-label">Average Cycle Time</div>
            <div class="metric-value">{{ cycleTimeMetrics.average }} days</div>
            <div class="metric-trend" :class="getTrendClass(cycleTimeMetrics.trend)">
              {{ cycleTimeMetrics.trend > 0 ? '+' : '' }}{{ cycleTimeMetrics.trend }}% vs last period
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Median (50th %ile)</div>
            <div class="metric-value">{{ cycleTimeMetrics.p50 }} days</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">85th Percentile</div>
            <div class="metric-value">{{ cycleTimeMetrics.p85 }} days</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">95th Percentile</div>
            <div class="metric-value">{{ cycleTimeMetrics.p95 }} days</div>
          </div>
        </div>
      </div>

      <!-- Percentile Distribution -->
      <div class="distribution-section">
        <h4>Cycle Time Distribution</h4>
        <div class="distribution-chart">
          <div class="percentile-bars">
            <div 
              v-for="percentile in percentileData" 
              :key="percentile.label"
              class="percentile-bar"
            >
              <div class="bar-container">
                <div 
                  class="bar-fill"
                  :style="{ 
                    height: `${(percentile.value / maxPercentileValue) * 100}%`,
                    background: getPercentileColor(percentile.label)
                  }"
                ></div>
              </div>
              <div class="bar-label">{{ percentile.label }}</div>
              <div class="bar-value">{{ percentile.value }}d</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Trend Analysis -->
      <div class="trend-section">
        <h4>Cycle Time Trends</h4>
        <div class="trend-chart">
          <div class="trend-line">
            <div 
              v-for="(point, index) in trendData" 
              :key="index"
              class="trend-point"
              :style="{ 
                left: `${(index / (trendData.length - 1)) * 100}%`,
                bottom: `${(point.value / maxTrendValue) * 100}%`
              }"
              :title="`${point.period}: ${point.value} days`"
            >
              <div class="point-dot"></div>
            </div>
          </div>
          <div class="trend-labels">
            <div 
              v-for="(point, index) in trendData" 
              :key="index"
              class="trend-label"
              :style="{ left: `${(index / (trendData.length - 1)) * 100}%` }"
            >
              {{ point.period }}
            </div>
          </div>
        </div>
      </div>

      <!-- Role Comparison -->
      <div class="role-comparison-section">
        <h4>Cycle Time by Role</h4>
        <div class="role-comparison">
          <div 
            v-for="role in roleComparison" 
            :key="role.type"
            class="role-item"
          >
            <div class="role-header">
              <span class="role-name">{{ role.name }}</span>
              <span class="role-count">{{ role.count }} hires</span>
            </div>
            <div class="role-metrics">
              <div class="role-bar">
                <div 
                  class="role-bar-fill"
                  :style="{ 
                    width: `${(role.average / maxRoleAverage) * 100}%`,
                    background: getRoleColor(role.type)
                  }"
                ></div>
              </div>
              <div class="role-average">{{ role.average }} days avg</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stage Breakdown -->
      <div class="stage-breakdown-section">
        <h4>Cycle Time by Stage</h4>
        <div class="stage-breakdown">
          <div 
            v-for="stage in stageBreakdown" 
            :key="stage.id"
            class="stage-item"
            :class="{ 'bottleneck': stage.isBottleneck }"
          >
            <div class="stage-header">
              <span class="stage-name">{{ stage.name }}</span>
              <span v-if="stage.isBottleneck" class="bottleneck-badge">Bottleneck</span>
            </div>
            <div class="stage-metrics">
              <div class="stage-time">
                <span class="time-label">Avg Time:</span>
                <span class="time-value">{{ stage.avgTime }} days</span>
              </div>
              <div class="stage-range">
                <span class="range-label">Range:</span>
                <span class="range-value">{{ stage.minTime }}-{{ stage.maxTime }} days</span>
              </div>
              <div class="stage-progress">
                <div 
                  class="progress-bar"
                  :style="{ 
                    width: `${(stage.avgTime / maxStageTime) * 100}%`,
                    background: stage.isBottleneck ? '#ff5630' : '#36b37e'
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCycleTimeStore } from '../stores/cycleTimeStore.js'

const cycleTimeStore = useCycleTimeStore()

const selectedPeriod = ref('60')
const selectedRole = ref('all')

const cycleTimeMetrics = computed(() => {
  const percentiles = cycleTimeStore.cycleTimePercentiles
  const times = cycleTimeStore.cycleTimesData.map(c => c.totalCycleTime)
  const average = times.length > 0 ? Math.round(times.reduce((sum, t) => sum + t, 0) / times.length) : 0
  
  return {
    average,
    p50: percentiles.p50,
    p85: percentiles.p85,
    p95: percentiles.p95,
    trend: -8 // This would come from historical comparison
  }
})

const percentileData = computed(() => {
  const percentiles = cycleTimeStore.cycleTimePercentiles
  return [
    { label: 'P10', value: percentiles.p10 },
    { label: 'P25', value: percentiles.p25 },
    { label: 'P50', value: percentiles.p50 },
    { label: 'P75', value: percentiles.p75 },
    { label: 'P85', value: percentiles.p85 },
    { label: 'P95', value: percentiles.p95 },
    { label: 'P99', value: percentiles.p99 }
  ]
})

const trendData = ref([
  { period: 'Week 1', value: 22 },
  { period: 'Week 2', value: 20 },
  { period: 'Week 3', value: 19 },
  { period: 'Week 4', value: 18 },
  { period: 'Week 5', value: 16 },
  { period: 'Week 6', value: 17 },
  { period: 'Week 7', value: 15 },
  { period: 'Week 8', value: 18 }
])

const roleComparison = computed(() => {
  const roleData = cycleTimeStore.cycleTimeByRole
  const roleNames = {
    engineering: 'Engineering',
    sales: 'Sales', 
    marketing: 'Marketing',
    operations: 'Operations'
  }
  
  return roleData.map(role => ({
    type: role.role,
    name: roleNames[role.role] || role.role,
    average: role.average,
    count: role.count
  }))
})

const stageBreakdown = computed(() => {
  const stages = cycleTimeStore.stageBreakdown
  const stageNames = {
    'screening': 'Screening',
    'phone-screen': 'Phone Screen', 
    'interview': 'Interview',
    'technical': 'Technical Assessment',
    'final-interview': 'Final Interview',
    'offer': 'Offer Process'
  }
  
  return stages.map(stage => ({
    id: stage.name,
    name: stageNames[stage.name] || stage.name,
    avgTime: stage.average,
    minTime: stage.min,
    maxTime: stage.max,
    isBottleneck: stage.average > 4 // Simple bottleneck detection
  }))
})

const maxPercentileValue = computed(() => {
  return Math.max(...percentileData.value.map(p => p.value))
})

const maxTrendValue = computed(() => {
  return Math.max(...trendData.value.map(t => t.value))
})

const maxRoleAverage = computed(() => {
  return Math.max(...roleComparison.value.map(r => r.average))
})

const maxStageTime = computed(() => {
  return Math.max(...stageBreakdown.value.map(s => s.avgTime))
})

const getTrendClass = (trend) => {
  if (trend > 0) return 'negative'
  if (trend < 0) return 'positive'
  return 'neutral'
}

const getPercentileColor = (label) => {
  const colors = {
    'P10': '#36b37e',
    'P25': '#57d9a3',
    'P50': '#79f2c0',
    'P75': '#ff8b00',
    'P85': '#ff7875',
    'P95': '#ff5630',
    'P99': '#de350b'
  }
  return colors[label] || '#dfe1e6'
}

const getRoleColor = (type) => {
  const colors = {
    'engineering': '#0052cc',
    'sales': '#36b37e',
    'marketing': '#6554c0',
    'operations': '#ff8b00'
  }
  return colors[type] || '#5e6c84'
}

const updateAnalysis = () => {
  console.log('Updating analysis for period:', selectedPeriod.value, 'role:', selectedRole.value)
  // Simulate data update based on filters
}

onMounted(() => {
  updateAnalysis()
})
</script>

<style scoped>
.cycle-time-analysis {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.analysis-header h3 {
  margin: 0;
  color: #172b4d;
}

.analysis-controls {
  display: flex;
  gap: 12px;
}

.analysis-controls select {
  padding: 6px 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: white;
  font-size: 14px;
}

.analysis-grid {
  display: grid;
  gap: 24px;
}

.metrics-section,
.distribution-section,
.trend-section,
.role-comparison-section,
.stage-breakdown-section {
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
}

.metrics-section h4,
.distribution-section h4,
.trend-section h4,
.role-comparison-section h4,
.stage-breakdown-section h4 {
  margin: 0 0 16px 0;
  color: #172b4d;
  font-size: 16px;
}

.metric-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.metric-card {
  text-align: center;
  padding: 16px;
  background: #f9fafc;
  border-radius: 6px;
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

.distribution-chart {
  height: 200px;
}

.percentile-bars {
  display: flex;
  align-items: end;
  justify-content: space-between;
  height: 160px;
  padding: 0 20px;
}

.percentile-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 60px;
}

.bar-container {
  height: 120px;
  width: 20px;
  background: #f4f5f7;
  border-radius: 2px;
  display: flex;
  align-items: end;
  margin-bottom: 8px;
}

.bar-fill {
  width: 100%;
  border-radius: 2px;
  transition: height 0.3s ease;
}

.bar-label {
  font-size: 10px;
  color: #5e6c84;
  margin-bottom: 2px;
}

.bar-value {
  font-size: 12px;
  font-weight: 600;
  color: #172b4d;
}

.trend-chart {
  height: 200px;
  position: relative;
  padding: 20px;
}

.trend-line {
  position: relative;
  height: 140px;
}

.trend-point {
  position: absolute;
  transform: translate(-50%, 50%);
}

.point-dot {
  width: 8px;
  height: 8px;
  background: #0052cc;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.trend-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  position: relative;
}

.trend-label {
  font-size: 10px;
  color: #5e6c84;
  position: absolute;
  transform: translateX(-50%);
}

.role-comparison {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.role-item {
  padding: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

.role-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.role-name {
  font-weight: 600;
  color: #172b4d;
}

.role-count {
  font-size: 12px;
  color: #5e6c84;
}

.role-metrics {
  display: flex;
  align-items: center;
  gap: 12px;
}

.role-bar {
  flex: 1;
  height: 8px;
  background: #f4f5f7;
  border-radius: 4px;
  overflow: hidden;
}

.role-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.role-average {
  font-size: 12px;
  font-weight: 600;
  color: #172b4d;
  min-width: 70px;
  text-align: right;
}

.stage-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stage-item {
  padding: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

.stage-item.bottleneck {
  border-color: #ff5630;
  background: #fff4f3;
}

.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.stage-name {
  font-weight: 600;
  color: #172b4d;
}

.bottleneck-badge {
  background: #ff5630;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  text-transform: uppercase;
}

.stage-metrics {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 16px;
  align-items: center;
}

.stage-time,
.stage-range {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.time-label,
.range-label {
  font-size: 10px;
  color: #5e6c84;
  text-transform: uppercase;
}

.time-value,
.range-value {
  font-size: 12px;
  font-weight: 600;
  color: #172b4d;
}

.stage-progress {
  height: 6px;
  background: #f4f5f7;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .analysis-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .analysis-controls {
    justify-content: center;
  }
  
  .metric-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .percentile-bars {
    padding: 0 10px;
  }
  
  .stage-metrics {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>