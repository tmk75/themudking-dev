<template>
  <div class="time-to-fill-calculator">
    <div class="calculator-header">
      <h3>Time-to-Fill Calculator</h3>
      <div class="calculator-controls">
        <select v-model="selectedRoleType" @change="updateCalculations">
          <option value="all">All Roles</option>
          <option value="executive">Executive</option>
          <option value="senior">Senior</option>
          <option value="mid">Mid-Level</option>
          <option value="junior">Junior</option>
        </select>
        <select v-model="selectedDepartment" @change="updateCalculations">
          <option value="all">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
    </div>

    <div class="calculator-grid">
      <!-- Time-to-Fill Overview -->
      <div class="ttf-overview">
        <h4>Time-to-Fill Metrics</h4>
        <div class="ttf-metrics">
          <div class="metric-card primary">
            <div class="metric-label">Average Time-to-Fill</div>
            <div class="metric-value">{{ timeToFillMetrics.average }} days</div>
            <div class="metric-benchmark" :class="getBenchmarkStatus(timeToFillMetrics.average)">
              Benchmark: {{ getBenchmark(selectedRoleType) }} days
            </div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Median TTF</div>
            <div class="metric-value">{{ timeToFillMetrics.median }} days</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">Total Hires</div>
            <div class="metric-value">{{ timeToFillMetrics.totalHires }}</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-label">SLE Performance</div>
            <div class="metric-value" :class="getSLEClass(timeToFillMetrics.slePerformance)">
              {{ timeToFillMetrics.slePerformance }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Kanban Stage Breakdown -->
      <div class="stage-breakdown">
        <h4>Time Breakdown by Kanban Stage</h4>
        <div class="stage-chart">
          <div 
            v-for="stage in stageBreakdown" 
            :key="stage.name"
            class="stage-segment"
            :style="{ 
              width: `${(stage.avgDays / totalStageTime) * 100}%`,
              background: getStageColor(stage.name)
            }"
            :title="`${stage.name}: ${stage.avgDays} days (${Math.round((stage.avgDays / totalStageTime) * 100)}%)`"
          >
            <div class="stage-label">{{ stage.name }}</div>
            <div class="stage-days">{{ stage.avgDays }}d</div>
          </div>
        </div>
        
        <div class="stage-details">
          <div 
            v-for="stage in stageBreakdown" 
            :key="stage.name"
            class="stage-detail"
          >
            <div class="stage-info">
              <span class="stage-name">{{ stage.name }}</span>
              <span class="stage-time">{{ stage.avgDays }} days</span>
            </div>
            <div class="stage-range">
              Range: {{ stage.minDays }}-{{ stage.maxDays }} days
            </div>
            <div v-if="stage.bottleneck" class="bottleneck-indicator">
              🚧 Bottleneck detected
            </div>
          </div>
        </div>
      </div>

      <!-- Cycle Time vs Lead Time -->
      <div class="time-comparison">
        <h4>Cycle Time vs Lead Time</h4>
        <div class="comparison-metrics">
          <div class="time-metric">
            <div class="time-type">Cycle Time</div>
            <div class="time-value">{{ timeComparison.cycleTime }} days</div>
            <div class="time-description">Screening → Hired</div>
          </div>
          
          <div class="time-metric">
            <div class="time-type">Lead Time</div>
            <div class="time-value">{{ timeComparison.leadTime }} days</div>
            <div class="time-description">Requisition → Hired</div>
          </div>
          
          <div class="time-metric">
            <div class="time-type">Sourcing Time</div>
            <div class="time-value">{{ timeComparison.sourcingTime }} days</div>
            <div class="time-description">Req Open → First Candidate</div>
          </div>
        </div>
        
        <div class="comparison-chart">
          <div class="chart-bar">
            <div class="sourcing-portion" :style="{ width: `${(timeComparison.sourcingTime / timeComparison.leadTime) * 100}%` }"></div>
            <div class="cycle-portion" :style="{ width: `${(timeComparison.cycleTime / timeComparison.leadTime) * 100}%` }"></div>
          </div>
          <div class="chart-legend">
            <div class="legend-item">
              <div class="legend-color sourcing"></div>
              <span>Sourcing Time</span>
            </div>
            <div class="legend-item">
              <div class="legend-color cycle"></div>
              <span>Cycle Time</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 12-Month Trend -->
      <div class="trend-visualization">
        <h4>12-Month Time-to-Fill Trend</h4>
        <div class="trend-chart">
          <div class="chart-area">
            <div 
              v-for="(month, index) in monthlyTrends" 
              :key="index"
              class="trend-point"
              :style="{ 
                left: `${(index / (monthlyTrends.length - 1)) * 100}%`,
                bottom: `${(month.ttf / maxTrendValue) * 100}%`
              }"
              :title="`${month.month}: ${month.ttf} days`"
            >
              <div class="point-dot" :class="getTrendStatus(month.ttf)"></div>
            </div>
            
            <!-- Benchmark line -->
            <div 
              class="benchmark-line"
              :style="{ bottom: `${(getBenchmark(selectedRoleType) / maxTrendValue) * 100}%` }"
            ></div>
          </div>
          
          <div class="trend-labels">
            <div 
              v-for="(month, index) in monthlyTrends" 
              :key="index"
              class="trend-label"
              :style="{ left: `${(index / (monthlyTrends.length - 1)) * 100}%` }"
            >
              {{ month.month }}
            </div>
          </div>
        </div>
        
        <div class="trend-summary">
          <div class="trend-stat">
            <span class="stat-label">Trend Direction</span>
            <span class="stat-value" :class="getTrendDirectionClass(trendDirection)">
              {{ trendDirection > 0 ? '↗️ Increasing' : trendDirection < 0 ? '↘️ Decreasing' : '➡️ Stable' }}
            </span>
          </div>
          <div class="trend-stat">
            <span class="stat-label">Best Month</span>
            <span class="stat-value">{{ bestMonth.month }} ({{ bestMonth.ttf }}d)</span>
          </div>
          <div class="trend-stat">
            <span class="stat-label">Worst Month</span>
            <span class="stat-value">{{ worstMonth.month }} ({{ worstMonth.ttf }}d)</span>
          </div>
        </div>
      </div>

      <!-- SLE Tracking -->
      <div class="sle-tracking">
        <h4>Service Level Expectations (SLE)</h4>
        <div class="sle-performance">
          <div class="sle-gauge">
            <div 
              class="gauge-fill"
              :style="{ 
                background: `conic-gradient(${getSLEColor(sleTracking.performance)} ${sleTracking.performance * 3.6}deg, #f4f5f7 0deg)`
              }"
            >
              <div class="gauge-center">
                <div class="gauge-value">{{ sleTracking.performance }}%</div>
                <div class="gauge-label">Meeting SLE</div>
              </div>
            </div>
          </div>
          
          <div class="sle-breakdown">
            <div class="sle-metric">
              <span class="sle-label">Within SLE</span>
              <span class="sle-value success">{{ sleTracking.withinSLE }}</span>
            </div>
            <div class="sle-metric">
              <span class="sle-label">Exceeded SLE</span>
              <span class="sle-value danger">{{ sleTracking.exceededSLE }}</span>
            </div>
            <div class="sle-metric">
              <span class="sle-label">Current SLE Target</span>
              <span class="sle-value">{{ sleTracking.target }} days</span>
            </div>
          </div>
        </div>
        
        <div class="sle-distribution">
          <div 
            v-for="bucket in sleDistribution" 
            :key="bucket.range"
            class="distribution-bucket"
          >
            <div class="bucket-bar">
              <div 
                class="bucket-fill"
                :style="{ 
                  height: `${(bucket.count / maxBucketCount) * 100}%`,
                  background: getBucketColor(bucket.status)
                }"
              ></div>
            </div>
            <div class="bucket-label">{{ bucket.range }}</div>
            <div class="bucket-count">{{ bucket.count }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedRoleType = ref('all')
const selectedDepartment = ref('all')

const timeToFillMetrics = ref({
  average: 42,
  median: 38,
  totalHires: 156,
  slePerformance: 78
})

const stageBreakdown = ref([
  { name: 'Sourcing', avgDays: 8, minDays: 3, maxDays: 15, bottleneck: false },
  { name: 'Screening', avgDays: 5, minDays: 2, maxDays: 10, bottleneck: true },
  { name: 'Phone Screen', avgDays: 3, minDays: 1, maxDays: 7, bottleneck: false },
  { name: 'Interview', avgDays: 12, minDays: 5, maxDays: 20, bottleneck: true },
  { name: 'Technical', avgDays: 6, minDays: 3, maxDays: 12, bottleneck: false },
  { name: 'Final Interview', avgDays: 5, minDays: 2, maxDays: 10, bottleneck: false },
  { name: 'Offer', avgDays: 3, minDays: 1, maxDays: 8, bottleneck: false }
])

const timeComparison = ref({
  cycleTime: 34,
  leadTime: 42,
  sourcingTime: 8
})

const monthlyTrends = ref([
  { month: 'Jan', ttf: 45 },
  { month: 'Feb', ttf: 42 },
  { month: 'Mar', ttf: 38 },
  { month: 'Apr', ttf: 41 },
  { month: 'May', ttf: 39 },
  { month: 'Jun', ttf: 36 },
  { month: 'Jul', ttf: 40 },
  { month: 'Aug', ttf: 43 },
  { month: 'Sep', ttf: 41 },
  { month: 'Oct', ttf: 38 },
  { month: 'Nov', ttf: 42 },
  { month: 'Dec', ttf: 40 }
])

const sleTracking = ref({
  performance: 78,
  withinSLE: 122,
  exceededSLE: 34,
  target: 45
})

const sleDistribution = ref([
  { range: '0-30d', count: 45, status: 'excellent' },
  { range: '31-45d', count: 77, status: 'good' },
  { range: '46-60d', count: 28, status: 'warning' },
  { range: '61+d', count: 6, status: 'critical' }
])

const totalStageTime = computed(() => {
  return stageBreakdown.value.reduce((sum, stage) => sum + stage.avgDays, 0)
})

const maxTrendValue = computed(() => {
  return Math.max(...monthlyTrends.value.map(m => m.ttf), getBenchmark(selectedRoleType.value))
})

const maxBucketCount = computed(() => {
  return Math.max(...sleDistribution.value.map(b => b.count))
})

const trendDirection = computed(() => {
  const recent = monthlyTrends.value.slice(-3)
  const earlier = monthlyTrends.value.slice(-6, -3)
  const recentAvg = recent.reduce((sum, m) => sum + m.ttf, 0) / recent.length
  const earlierAvg = earlier.reduce((sum, m) => sum + m.ttf, 0) / earlier.length
  return Math.round(recentAvg - earlierAvg)
})

const bestMonth = computed(() => {
  return monthlyTrends.value.reduce((best, current) => 
    current.ttf < best.ttf ? current : best
  )
})

const worstMonth = computed(() => {
  return monthlyTrends.value.reduce((worst, current) => 
    current.ttf > worst.ttf ? current : worst
  )
})

const getBenchmark = (roleType) => {
  const benchmarks = {
    executive: 60,
    senior: 45,
    mid: 35,
    junior: 30,
    all: 45
  }
  return benchmarks[roleType] || 45
}

const getBenchmarkStatus = (ttf) => {
  const benchmark = getBenchmark(selectedRoleType.value)
  if (ttf <= benchmark * 0.8) return 'excellent'
  if (ttf <= benchmark) return 'good'
  if (ttf <= benchmark * 1.2) return 'warning'
  return 'critical'
}

const getSLEClass = (performance) => {
  if (performance >= 85) return 'excellent'
  if (performance >= 70) return 'good'
  if (performance >= 55) return 'warning'
  return 'critical'
}

const getStageColor = (stageName) => {
  const colors = {
    'Sourcing': '#0052cc',
    'Screening': '#36b37e',
    'Phone Screen': '#ff8b00',
    'Interview': '#6554c0',
    'Technical': '#ff5630',
    'Final Interview': '#00875a',
    'Offer': '#974f00'
  }
  return colors[stageName] || '#5e6c84'
}

const getTrendStatus = (ttf) => {
  const benchmark = getBenchmark(selectedRoleType.value)
  if (ttf <= benchmark * 0.8) return 'excellent'
  if (ttf <= benchmark) return 'good'
  return 'warning'
}

const getTrendDirectionClass = (direction) => {
  if (direction < -2) return 'improving'
  if (direction > 2) return 'declining'
  return 'stable'
}

const getSLEColor = (performance) => {
  if (performance >= 85) return '#36b37e'
  if (performance >= 70) return '#ff8b00'
  return '#ff5630'
}

const getBucketColor = (status) => {
  const colors = {
    excellent: '#36b37e',
    good: '#00875a',
    warning: '#ff8b00',
    critical: '#ff5630'
  }
  return colors[status] || '#5e6c84'
}

const updateCalculations = () => {
  console.log('Updating calculations for role:', selectedRoleType.value, 'department:', selectedDepartment.value)
}
</script>

<style scoped>
.time-to-fill-calculator {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.calculator-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.calculator-header h3 {
  margin: 0;
  color: #172b4d;
}

.calculator-controls {
  display: flex;
  gap: 12px;
}

.calculator-controls select {
  padding: 6px 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: white;
  font-size: 14px;
}

.calculator-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.ttf-overview,
.stage-breakdown,
.time-comparison,
.trend-visualization,
.sle-tracking {
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
}

.trend-visualization,
.sle-tracking {
  grid-column: 1 / -1;
}

.ttf-overview h4,
.stage-breakdown h4,
.time-comparison h4,
.trend-visualization h4,
.sle-tracking h4 {
  margin: 0 0 16px 0;
  color: #172b4d;
  font-size: 16px;
}

.ttf-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.metric-card {
  text-align: center;
  padding: 16px;
  background: #f9fafc;
  border-radius: 6px;
}

.metric-card.primary {
  background: #e6f2ff;
  border: 1px solid #0052cc;
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

.metric-benchmark {
  font-size: 11px;
  font-weight: 500;
}

.metric-benchmark.excellent {
  color: #36b37e;
}

.metric-benchmark.good {
  color: #00875a;
}

.metric-benchmark.warning {
  color: #ff8b00;
}

.metric-benchmark.critical {
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

.metric-value.critical {
  color: #ff5630;
}

.stage-chart {
  display: flex;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 16px;
}

.stage-segment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.stage-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stage-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #f9fafc;
  border-radius: 4px;
}

.stage-info {
  display: flex;
  justify-content: space-between;
  flex: 1;
}

.stage-name {
  font-weight: 600;
  color: #172b4d;
}

.stage-time {
  color: #5e6c84;
}

.stage-range {
  font-size: 11px;
  color: #5e6c84;
  margin: 0 12px;
}

.bottleneck-indicator {
  font-size: 11px;
  color: #ff5630;
  font-weight: 600;
}

.comparison-metrics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.time-metric {
  text-align: center;
  flex: 1;
}

.time-type {
  font-size: 12px;
  color: #5e6c84;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.time-value {
  font-size: 20px;
  font-weight: 700;
  color: #172b4d;
  margin-bottom: 2px;
}

.time-description {
  font-size: 10px;
  color: #5e6c84;
}

.comparison-chart {
  margin-top: 16px;
}

.chart-bar {
  height: 20px;
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.sourcing-portion {
  background: #0052cc;
}

.cycle-portion {
  background: #36b37e;
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

.legend-color.sourcing {
  background: #0052cc;
}

.legend-color.cycle {
  background: #36b37e;
}

.trend-chart {
  height: 200px;
  position: relative;
  margin-bottom: 16px;
}

.chart-area {
  position: relative;
  height: 160px;
  border-bottom: 1px solid #e1e5e9;
}

.trend-point {
  position: absolute;
  transform: translate(-50%, 50%);
}

.point-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.point-dot.excellent {
  background: #36b37e;
}

.point-dot.good {
  background: #00875a;
}

.point-dot.warning {
  background: #ff8b00;
}

.benchmark-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #ff5630;
  border-radius: 1px;
}

.benchmark-line::before {
  content: 'Benchmark';
  position: absolute;
  right: 0;
  top: -20px;
  font-size: 10px;
  color: #ff5630;
  background: white;
  padding: 2px 4px;
}

.trend-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  position: relative;
}

.trend-label {
  font-size: 10px;
  color: #5e6c84;
  position: absolute;
  transform: translateX(-50%);
}

.trend-summary {
  display: flex;
  justify-content: space-between;
}

.trend-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 11px;
  color: #5e6c84;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 12px;
  font-weight: 600;
}

.stat-value.improving {
  color: #36b37e;
}

.stat-value.declining {
  color: #ff5630;
}

.stat-value.stable {
  color: #5e6c84;
}

.sle-performance {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 24px;
}

.sle-gauge {
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
  font-size: 18px;
  font-weight: 700;
  color: #172b4d;
}

.gauge-label {
  font-size: 10px;
  color: #5e6c84;
  text-transform: uppercase;
}

.sle-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sle-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sle-label {
  font-size: 12px;
  color: #5e6c84;
}

.sle-value {
  font-size: 14px;
  font-weight: 600;
}

.sle-value.success {
  color: #36b37e;
}

.sle-value.danger {
  color: #ff5630;
}

.sle-distribution {
  display: flex;
  justify-content: space-between;
  align-items: end;
  height: 120px;
}

.distribution-bucket {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  max-width: 80px;
}

.bucket-bar {
  width: 30px;
  height: 80px;
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

.bucket-label {
  font-size: 10px;
  color: #5e6c84;
  margin-bottom: 2px;
}

.bucket-count {
  font-size: 12px;
  font-weight: 600;
  color: #172b4d;
}

@media (max-width: 768px) {
  .calculator-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .calculator-grid {
    grid-template-columns: 1fr;
  }
  
  .ttf-metrics {
    grid-template-columns: 1fr;
  }
  
  .comparison-metrics {
    flex-direction: column;
    gap: 12px;
  }
  
  .sle-performance {
    flex-direction: column;
    gap: 16px;
  }
}
</style>