<template>
  <div class="trend-visualization-charts">
    <div class="trends-header">
      <h4>Trend Visualization</h4>
      <div class="trends-controls">
        <select v-model="selectedMetric" @change="updateChart">
          <option value="time-to-fill">Time-to-Fill</option>
          <option value="cycle-time">Cycle Time</option>
          <option value="throughput">Throughput</option>
          <option value="efficiency">Flow Efficiency</option>
        </select>
        <select v-model="selectedPeriod" @change="updateChart">
          <option value="bi-weekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
        <button @click="exportToPDF" class="export-btn">📄 PDF</button>
        <button @click="exportToExcel" class="export-btn">📊 Excel</button>
      </div>
    </div>

    <div class="trend-chart">
      <svg :width="chartWidth" :height="chartHeight" class="chart-svg">
        <!-- Grid lines -->
        <g class="grid">
          <line v-for="i in 5" :key="`h-${i}`"
                :x1="50" :y1="50 + i * 60" 
                :x2="chartWidth - 50" :y2="50 + i * 60"
                stroke="#f4f5f7" stroke-width="1" />
          <line v-for="i in 6" :key="`v-${i}`"
                :x1="50 + i * 100" :y1="50" 
                :x2="50 + i * 100" :y2="chartHeight - 50"
                stroke="#f4f5f7" stroke-width="1" />
        </g>
        
        <!-- Actual data line -->
        <polyline :points="actualDataPoints" 
                  fill="none" stroke="#0052cc" stroke-width="3" />
        
        <!-- Rolling average line -->
        <polyline :points="rollingAveragePoints" 
                  fill="none" stroke="#36b37e" stroke-width="2" stroke-dasharray="5,5" />
        
        <!-- Seasonal pattern -->
        <polyline :points="seasonalPatternPoints" 
                  fill="none" stroke="#ff8b00" stroke-width="2" opacity="0.7" />
        
        <!-- Forecast line -->
        <polyline :points="forecastPoints" 
                  fill="none" stroke="#6554c0" stroke-width="2" stroke-dasharray="10,5" />
        
        <!-- Data points -->
        <g v-for="(point, index) in chartData" :key="index">
          <circle :cx="getX(index)" :cy="getY(point.actual)" 
                  r="4" fill="#0052cc" />
          <text :x="getX(index)" :y="chartHeight - 30" 
                class="x-label" text-anchor="middle">
            {{ point.period }}
          </text>
        </g>
        
        <!-- Y-axis labels -->
        <g class="y-labels">
          <text v-for="i in 6" :key="i"
                x="40" :y="50 + i * 50"
                class="y-label" text-anchor="end">
            {{ getYLabel(i) }}
          </text>
        </g>
      </svg>
    </div>

    <div class="trend-analysis">
      <div class="analysis-section">
        <h5>Trend Analysis</h5>
        <div class="trend-stats">
          <div class="stat-item">
            <span class="stat-label">Direction:</span>
            <span :class="trendDirectionClass">{{ trendDirection }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Change Rate:</span>
            <span>{{ changeRate }}% per period</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Volatility:</span>
            <span>{{ volatility }}%</span>
          </div>
        </div>
      </div>
      
      <div class="analysis-section">
        <h5>Seasonal Patterns</h5>
        <div class="seasonal-stats">
          <div class="stat-item">
            <span class="stat-label">Peak Period:</span>
            <span>{{ seasonalPeak.period }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Low Period:</span>
            <span>{{ seasonalLow.period }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Seasonality:</span>
            <span>{{ seasonalityStrength }}%</span>
          </div>
        </div>
      </div>
      
      <div class="analysis-section">
        <h5>Forecast</h5>
        <div class="forecast-stats">
          <div class="stat-item">
            <span class="stat-label">Next Period:</span>
            <span>{{ nextPeriodForecast }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Confidence:</span>
            <span>{{ forecastConfidence }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Range:</span>
            <span>{{ forecastRange.min }} - {{ forecastRange.max }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-legend">
      <div class="legend-item">
        <div class="legend-line actual"></div>
        <span>Actual Data</span>
      </div>
      <div class="legend-item">
        <div class="legend-line rolling"></div>
        <span>Rolling Average</span>
      </div>
      <div class="legend-item">
        <div class="legend-line seasonal"></div>
        <span>Seasonal Pattern</span>
      </div>
      <div class="legend-item">
        <div class="legend-line forecast"></div>
        <span>Forecast</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedMetric = ref('time-to-fill')
const selectedPeriod = ref('bi-weekly')
const chartWidth = 700
const chartHeight = 400

const chartData = ref([
  { period: 'W1-2', actual: 45, rolling: 43, seasonal: 44, forecast: null },
  { period: 'W3-4', actual: 42, rolling: 42, seasonal: 41, forecast: null },
  { period: 'W5-6', actual: 38, rolling: 41, seasonal: 39, forecast: null },
  { period: 'W7-8', actual: 41, rolling: 40, seasonal: 42, forecast: null },
  { period: 'W9-10', actual: 39, rolling: 39, seasonal: 40, forecast: null },
  { period: 'W11-12', actual: 36, rolling: 38, seasonal: 37, forecast: null },
  { period: 'W13-14', actual: null, rolling: null, seasonal: 38, forecast: 37 },
  { period: 'W15-16', actual: null, rolling: null, seasonal: 39, forecast: 38 }
])

const actualDataPoints = computed(() => {
  return chartData.value
    .filter(d => d.actual !== null)
    .map((d, i) => `${getX(i)},${getY(d.actual)}`)
    .join(' ')
})

const rollingAveragePoints = computed(() => {
  return chartData.value
    .filter(d => d.rolling !== null)
    .map((d, i) => `${getX(i)},${getY(d.rolling)}`)
    .join(' ')
})

const seasonalPatternPoints = computed(() => {
  return chartData.value
    .map((d, i) => `${getX(i)},${getY(d.seasonal)}`)
    .join(' ')
})

const forecastPoints = computed(() => {
  return chartData.value
    .filter(d => d.forecast !== null)
    .map((d, i) => {
      const actualIndex = chartData.value.findIndex(item => item === d)
      return `${getX(actualIndex)},${getY(d.forecast)}`
    })
    .join(' ')
})

const trendDirection = computed(() => {
  const actualData = chartData.value.filter(d => d.actual !== null)
  const first = actualData[0]?.actual || 0
  const last = actualData[actualData.length - 1]?.actual || 0
  
  if (last > first * 1.05) return 'Increasing'
  if (last < first * 0.95) return 'Decreasing'
  return 'Stable'
})

const trendDirectionClass = computed(() => ({
  'trend-increasing': trendDirection.value === 'Increasing',
  'trend-decreasing': trendDirection.value === 'Decreasing',
  'trend-stable': trendDirection.value === 'Stable'
}))

const changeRate = computed(() => {
  const actualData = chartData.value.filter(d => d.actual !== null)
  if (actualData.length < 2) return 0
  
  const first = actualData[0].actual
  const last = actualData[actualData.length - 1].actual
  const periods = actualData.length - 1
  
  return Math.round(((last - first) / first / periods) * 100)
})

const volatility = computed(() => 15) // Simplified calculation

const seasonalPeak = computed(() => ({ period: 'W7-8' }))
const seasonalLow = computed(() => ({ period: 'W11-12' }))
const seasonalityStrength = computed(() => 12)

const nextPeriodForecast = computed(() => '37 days')
const forecastConfidence = computed(() => 85)
const forecastRange = computed(() => ({ min: 34, max: 40 }))

const getX = (index) => {
  return 50 + (index / (chartData.value.length - 1)) * (chartWidth - 100)
}

const getY = (value) => {
  const maxValue = 50
  const minValue = 30
  return chartHeight - 50 - ((value - minValue) / (maxValue - minValue)) * (chartHeight - 100)
}

const getYLabel = (index) => {
  return 50 - (index * 4)
}

const updateChart = () => {
  console.log('Updating chart:', selectedMetric.value, selectedPeriod.value)
}

const exportToPDF = () => {
  console.log('Exporting to PDF...')
  // Simulate PDF export
  const link = document.createElement('a')
  link.download = `trend-analysis-${selectedMetric.value}.pdf`
  link.click()
}

const exportToExcel = () => {
  console.log('Exporting to Excel...')
  // Simulate Excel export
  const csvContent = chartData.value
    .map(d => `${d.period},${d.actual || ''},${d.rolling || ''},${d.seasonal},${d.forecast || ''}`)
    .join('\n')
  
  const blob = new Blob([`Period,Actual,Rolling Average,Seasonal,Forecast\n${csvContent}`], 
                       { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `trend-analysis-${selectedMetric.value}.csv`
  link.click()
}
</script>

<style scoped>
.trend-visualization-charts {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.trends-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.trends-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.export-btn {
  padding: 6px 12px;
  background: #0052cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.chart-svg {
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

.x-label,
.y-label {
  font-size: 10px;
  fill: #5e6c84;
}

.trend-analysis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;
}

.analysis-section h5 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #172b4d;
}

.trend-stats,
.seasonal-stats,
.forecast-stats {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.stat-label {
  color: #5e6c84;
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

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.legend-line {
  width: 20px;
  height: 3px;
  border-radius: 2px;
}

.legend-line.actual {
  background: #0052cc;
}

.legend-line.rolling {
  background: #36b37e;
}

.legend-line.seasonal {
  background: #ff8b00;
}

.legend-line.forecast {
  background: #6554c0;
}
</style>