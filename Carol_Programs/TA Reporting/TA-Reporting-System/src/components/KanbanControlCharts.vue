<template>
  <div class="kanban-control-charts">
    <div class="control-header">
      <h4>Kanban Control Charts</h4>
      <div class="control-tabs">
        <button v-for="metric in metrics" :key="metric" 
                @click="selectedMetric = metric"
                :class="{ active: selectedMetric === metric }"
                class="tab-btn">
          {{ metric }}
        </button>
      </div>
    </div>

    <div class="control-chart">
      <svg :width="chartWidth" :height="chartHeight" class="chart-svg">
        <!-- Control limits -->
        <line :x1="50" :y1="getY(controlLimits.ucl)" 
              :x2="chartWidth - 50" :y2="getY(controlLimits.ucl)"
              stroke="#ff5630" stroke-width="2" stroke-dasharray="5,5" />
        <line :x1="50" :y1="getY(controlLimits.centerLine)" 
              :x2="chartWidth - 50" :y2="getY(controlLimits.centerLine)"
              stroke="#172b4d" stroke-width="2" />
        <line :x1="50" :y1="getY(controlLimits.lcl)" 
              :x2="chartWidth - 50" :y2="getY(controlLimits.lcl)"
              stroke="#ff5630" stroke-width="2" stroke-dasharray="5,5" />
        
        <!-- Data points -->
        <g v-for="(point, index) in chartData" :key="index">
          <circle :cx="getX(index)" :cy="getY(point.value)" 
                  :r="4" :fill="getPointColor(point)" />
          <line v-if="index > 0" 
                :x1="getX(index - 1)" :y1="getY(chartData[index - 1].value)"
                :x2="getX(index)" :y2="getY(point.value)"
                stroke="#0052cc" stroke-width="2" />
        </g>
        
        <!-- Labels -->
        <text x="20" :y="getY(controlLimits.ucl)" class="limit-label">UCL</text>
        <text x="20" :y="getY(controlLimits.centerLine)" class="limit-label">CL</text>
        <text x="20" :y="getY(controlLimits.lcl)" class="limit-label">LCL</text>
      </svg>
    </div>

    <div class="control-analysis">
      <div class="stability-indicator">
        <span class="indicator-label">Process Stability:</span>
        <span :class="stabilityClass">{{ stabilityStatus }}</span>
      </div>
      
      <div class="special-causes">
        <h5>Special Cause Variations:</h5>
        <div v-for="cause in specialCauses" :key="cause.id" class="cause-item">
          <span class="cause-point">Point {{ cause.point }}</span>
          <span class="cause-reason">{{ cause.reason }}</span>
        </div>
      </div>
      
      <div class="trend-analysis">
        <h5>Trend Analysis:</h5>
        <div class="trend-item">
          <span class="trend-label">Direction:</span>
          <span :class="trendClass">{{ trendDirection }}</span>
        </div>
        <div class="trend-item">
          <span class="trend-label">Runs:</span>
          <span>{{ runsCount }} consecutive points</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMetric = ref('Cycle Time')
const metrics = ['Cycle Time', 'Lead Time', 'Throughput']
const chartWidth = 600
const chartHeight = 300

const chartData = ref([
  { value: 15, date: '2024-01-01', inControl: true },
  { value: 18, date: '2024-01-02', inControl: true },
  { value: 22, date: '2024-01-03', inControl: false },
  { value: 16, date: '2024-01-04', inControl: true },
  { value: 19, date: '2024-01-05', inControl: true },
  { value: 14, date: '2024-01-06', inControl: true },
  { value: 25, date: '2024-01-07', inControl: false }
])

const controlLimits = computed(() => ({
  ucl: 24,
  centerLine: 17,
  lcl: 10
}))

const specialCauses = computed(() => [
  { id: 1, point: 3, reason: 'Point above UCL' },
  { id: 2, point: 7, reason: 'Point above UCL' }
])

const stabilityStatus = computed(() => {
  const outOfControl = chartData.value.filter(p => !p.inControl).length
  return outOfControl === 0 ? 'Stable' : 'Unstable'
})

const stabilityClass = computed(() => ({
  'status-stable': stabilityStatus.value === 'Stable',
  'status-unstable': stabilityStatus.value === 'Unstable'
}))

const trendDirection = computed(() => {
  const recent = chartData.value.slice(-3)
  const increasing = recent.every((point, i) => i === 0 || point.value > recent[i - 1].value)
  const decreasing = recent.every((point, i) => i === 0 || point.value < recent[i - 1].value)
  
  if (increasing) return 'Increasing'
  if (decreasing) return 'Decreasing'
  return 'Stable'
})

const trendClass = computed(() => ({
  'trend-increasing': trendDirection.value === 'Increasing',
  'trend-decreasing': trendDirection.value === 'Decreasing',
  'trend-stable': trendDirection.value === 'Stable'
}))

const runsCount = computed(() => 3) // Simplified calculation

const getX = (index) => {
  return 50 + (index / (chartData.value.length - 1)) * (chartWidth - 100)
}

const getY = (value) => {
  const maxValue = Math.max(...chartData.value.map(p => p.value), controlLimits.value.ucl)
  const minValue = Math.min(...chartData.value.map(p => p.value), controlLimits.value.lcl)
  return chartHeight - 50 - ((value - minValue) / (maxValue - minValue)) * (chartHeight - 100)
}

const getPointColor = (point) => {
  return point.inControl ? '#36b37e' : '#ff5630'
}
</script>

<style scoped>
.kanban-control-charts {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.control-tabs {
  display: flex;
  gap: 4px;
}

.tab-btn {
  padding: 6px 12px;
  border: 1px solid #dfe1e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.tab-btn.active {
  background: #0052cc;
  color: white;
  border-color: #0052cc;
}

.chart-svg {
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

.limit-label {
  font-size: 10px;
  fill: #5e6c84;
}

.control-analysis {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stability-indicator {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.indicator-label {
  font-size: 12px;
  color: #5e6c84;
}

.status-stable {
  color: #36b37e;
  font-weight: 600;
}

.status-unstable {
  color: #ff5630;
  font-weight: 600;
}

.special-causes h5,
.trend-analysis h5 {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #172b4d;
}

.cause-item,
.trend-item {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin-bottom: 4px;
}

.cause-point {
  color: #ff5630;
  font-weight: 600;
}

.trend-increasing {
  color: #ff5630;
}

.trend-decreasing {
  color: #36b37e;
}

.trend-stable {
  color: #5e6c84;
}
</style>