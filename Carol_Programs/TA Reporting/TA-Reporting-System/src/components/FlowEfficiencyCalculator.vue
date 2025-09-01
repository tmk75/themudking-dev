<template>
  <div class="flow-efficiency-calculator">
    <div class="calculator-header">
      <h3>Flow Efficiency Calculator</h3>
      <div class="calculator-controls">
        <select v-model="selectedPeriod" @change="updateData">
          <option value="2weeks">Last 2 Weeks</option>
          <option value="4weeks">Last 4 Weeks</option>
          <option value="8weeks">Last 8 Weeks</option>
        </select>
        <select v-model="selectedDepartment" @change="updateData">
          <option value="all">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
    </div>

    <div class="calculator-grid">
      <!-- Overall Efficiency Metrics -->
      <div class="efficiency-overview">
        <h4>Flow Efficiency Overview</h4>
        <div class="efficiency-gauge">
          <div class="gauge-container">
            <div 
              class="gauge-fill"
              :style="{ 
                background: `conic-gradient(${getEfficiencyColor(overallEfficiency)} ${overallEfficiency * 3.6}deg, #f4f5f7 0deg)`
              }"
            >
              <div class="gauge-center">
                <div class="gauge-value">{{ overallEfficiency }}%</div>
                <div class="gauge-label">Flow Efficiency</div>
              </div>
            </div>
          </div>
          
          <div class="efficiency-breakdown">
            <div class="time-metric">
              <span class="metric-label">Work Time</span>
              <span class="metric-value work-time">{{ timeMetrics.workTime }}d</span>
            </div>
            <div class="time-metric">
              <span class="metric-label">Wait Time</span>
              <span class="metric-value wait-time">{{ timeMetrics.waitTime }}d</span>
            </div>
            <div class="time-metric">
              <span class="metric-label">Total Time</span>
              <span class="metric-value total-time">{{ timeMetrics.totalTime }}d</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stage Efficiency Breakdown -->
      <div class="stage-efficiency">
        <h4>Efficiency by Stage</h4>
        <div class="stage-list">
          <div 
            v-for="stage in stageEfficiency" 
            :key="stage.name"
            class="stage-item"
            :class="getStageEfficiencyClass(stage.efficiency)"
          >
            <div class="stage-header">
              <span class="stage-name">{{ stage.name }}</span>
              <span class="stage-efficiency-value">{{ stage.efficiency }}%</span>
            </div>
            
            <div class="stage-times">
              <div class="time-bar">
                <div 
                  class="work-portion"
                  :style="{ width: `${(stage.workTime / stage.totalTime) * 100}%` }"
                ></div>
                <div 
                  class="wait-portion"
                  :style="{ width: `${(stage.waitTime / stage.totalTime) * 100}%` }"
                ></div>
              </div>
              
              <div class="time-details">
                <span class="work-detail">Work: {{ stage.workTime }}d</span>
                <span class="wait-detail">Wait: {{ stage.waitTime }}d</span>
              </div>
            </div>
            
            <div v-if="stage.improvements.length > 0" class="stage-improvements">
              <div class="improvement-icon">💡</div>
              <div class="improvement-text">{{ stage.improvements[0] }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bi-weekly Trends -->
      <div class="efficiency-trends">
        <h4>Bi-weekly Efficiency Trends</h4>
        <div class="trend-chart">
          <div class="chart-area">
            <div 
              v-for="(period, index) in biweeklyTrends" 
              :key="index"
              class="trend-point"
              :style="{ 
                left: `${(index / (biweeklyTrends.length - 1)) * 100}%`,
                bottom: `${period.efficiency}%`
              }"
              :title="`${period.period}: ${period.efficiency}% efficiency`"
            >
              <div class="point-dot" :class="getTrendClass(period.trend)"></div>
            </div>
          </div>
          
          <div class="trend-labels">
            <div 
              v-for="(period, index) in biweeklyTrends" 
              :key="index"
              class="trend-label"
              :style="{ left: `${(index / (biweeklyTrends.length - 1)) * 100}%` }"
            >
              {{ period.period }}
            </div>
          </div>
        </div>
        
        <div class="trend-summary">
          <div class="trend-metric">
            <span class="trend-metric-label">Trend Direction</span>
            <span class="trend-metric-value" :class="getTrendDirectionClass(trendDirection)">
              {{ trendDirection > 0 ? '↗️ Improving' : trendDirection < 0 ? '↘️ Declining' : '➡️ Stable' }}
            </span>
          </div>
          <div class="trend-metric">
            <span class="trend-metric-label">Best Period</span>
            <span class="trend-metric-value">{{ bestPeriod.period }} ({{ bestPeriod.efficiency }}%)</span>
          </div>
        </div>
      </div>

      <!-- Process Improvements -->
      <div class="process-improvements">
        <h4>Recommended Process Improvements</h4>
        <div class="improvements-list">
          <div 
            v-for="improvement in processImprovements" 
            :key="improvement.id"
            class="improvement-item"
            :class="improvement.priority"
          >
            <div class="improvement-header">
              <span class="improvement-icon">{{ improvement.icon }}</span>
              <span class="improvement-title">{{ improvement.title }}</span>
              <span class="improvement-impact">+{{ improvement.impact }}% efficiency</span>
            </div>
            
            <div class="improvement-description">{{ improvement.description }}</div>
            
            <div class="improvement-actions">
              <span class="improvement-effort">{{ improvement.effort }} effort</span>
              <button class="implement-btn" @click="implementImprovement(improvement)">
                Implement
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Candidate Flow Analysis -->
      <div class="candidate-flow">
        <h4>Individual Candidate Analysis</h4>
        <div class="candidate-list">
          <div 
            v-for="candidate in candidateFlowData" 
            :key="candidate.id"
            class="candidate-flow-item"
          >
            <div class="candidate-info">
              <div class="candidate-name">{{ candidate.name }}</div>
              <div class="candidate-role">{{ candidate.role }}</div>
            </div>
            
            <div class="flow-timeline">
              <div 
                v-for="stage in candidate.stageFlow" 
                :key="stage.name"
                class="timeline-stage"
                :class="{ 'current-stage': stage.isCurrent }"
              >
                <div class="stage-dot"></div>
                <div class="stage-duration">{{ stage.duration }}d</div>
              </div>
            </div>
            
            <div class="candidate-efficiency">
              <span class="efficiency-label">Flow Efficiency:</span>
              <span class="efficiency-value" :class="getEfficiencyClass(candidate.efficiency)">
                {{ candidate.efficiency }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPeriod = ref('4weeks')
const selectedDepartment = ref('all')

const timeMetrics = ref({
  workTime: 12,
  waitTime: 26,
  totalTime: 38
})

const stageEfficiency = ref([
  {
    name: 'Screening',
    workTime: 3,
    waitTime: 2,
    totalTime: 5,
    efficiency: 60,
    improvements: ['Automate initial screening to reduce wait time']
  },
  {
    name: 'Phone Screen',
    workTime: 1,
    waitTime: 4,
    totalTime: 5,
    efficiency: 20,
    improvements: ['Increase interviewer availability', 'Implement self-scheduling']
  },
  {
    name: 'Interview',
    workTime: 2,
    waitTime: 8,
    totalTime: 10,
    efficiency: 20,
    improvements: ['Reduce scheduling conflicts', 'Add more interview slots']
  },
  {
    name: 'Technical',
    workTime: 3,
    waitTime: 2,
    totalTime: 5,
    efficiency: 60,
    improvements: []
  },
  {
    name: 'Final Interview',
    waitTime: 6,
    totalTime: 8,
    efficiency: 25,
    improvements: ['Executive calendar optimization']
  },
  {
    name: 'Offer',
    workTime: 2,
    waitTime: 4,
    totalTime: 6,
    efficiency: 33,
    improvements: ['Streamline approval process']
  }
])

const biweeklyTrends = ref([
  { period: 'W1-2', efficiency: 28, trend: 0 },
  { period: 'W3-4', efficiency: 32, trend: 4 },
  { period: 'W5-6', efficiency: 29, trend: -3 },
  { period: 'W7-8', efficiency: 35, trend: 6 },
  { period: 'W9-10', efficiency: 31, trend: -4 },
  { period: 'W11-12', efficiency: 38, trend: 7 }
])

const processImprovements = ref([
  {
    id: 1,
    title: 'Implement Self-Scheduling System',
    description: 'Allow candidates to book their own interview slots to reduce wait time',
    impact: 15,
    effort: 'Medium',
    priority: 'high',
    icon: '📅'
  },
  {
    id: 2,
    title: 'Automate Reference Checks',
    description: 'Use automated tools for reference verification to speed up process',
    impact: 8,
    effort: 'Low',
    priority: 'medium',
    icon: '🤖'
  },
  {
    id: 3,
    title: 'Parallel Processing for Technical Assessment',
    description: 'Run technical and cultural interviews in parallel instead of sequentially',
    impact: 12,
    effort: 'High',
    priority: 'high',
    icon: '⚡'
  },
  {
    id: 4,
    title: 'Executive Interview Batching',
    description: 'Batch final interviews to reduce executive calendar fragmentation',
    impact: 6,
    effort: 'Low',
    priority: 'low',
    icon: '📊'
  }
])

const candidateFlowData = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Engineer',
    efficiency: 45,
    stageFlow: [
      { name: 'Screening', duration: 2, isCurrent: false },
      { name: 'Phone', duration: 1, isCurrent: false },
      { name: 'Interview', duration: 5, isCurrent: true },
      { name: 'Technical', duration: 0, isCurrent: false },
      { name: 'Final', duration: 0, isCurrent: false }
    ]
  },
  {
    id: 2,
    name: 'Mike Chen',
    role: 'Sales Manager',
    efficiency: 62,
    stageFlow: [
      { name: 'Screening', duration: 1, isCurrent: false },
      { name: 'Phone', duration: 1, isCurrent: false },
      { name: 'Interview', duration: 3, isCurrent: false },
      { name: 'Final', duration: 2, isCurrent: true }
    ]
  }
])

const overallEfficiency = computed(() => {
  return Math.round((timeMetrics.value.workTime / timeMetrics.value.totalTime) * 100)
})

const trendDirection = computed(() => {
  const recent = biweeklyTrends.value.slice(-3)
  const avg = recent.reduce((sum, period) => sum + period.trend, 0) / recent.length
  return Math.round(avg)
})

const bestPeriod = computed(() => {
  return biweeklyTrends.value.reduce((best, current) => 
    current.efficiency > best.efficiency ? current : best
  )
})

const getEfficiencyColor = (efficiency) => {
  if (efficiency >= 70) return '#36b37e'
  if (efficiency >= 50) return '#ff8b00'
  if (efficiency >= 30) return '#ff7875'
  return '#ff5630'
}

const getStageEfficiencyClass = (efficiency) => {
  if (efficiency >= 60) return 'high-efficiency'
  if (efficiency >= 40) return 'medium-efficiency'
  return 'low-efficiency'
}

const getEfficiencyClass = (efficiency) => {
  if (efficiency >= 60) return 'high'
  if (efficiency >= 40) return 'medium'
  return 'low'
}

const getTrendClass = (trend) => {
  if (trend > 0) return 'positive'
  if (trend < 0) return 'negative'
  return 'neutral'
}

const getTrendDirectionClass = (direction) => {
  if (direction > 0) return 'improving'
  if (direction < 0) return 'declining'
  return 'stable'
}

const implementImprovement = (improvement) => {
  console.log('Implementing improvement:', improvement.title)
}

const updateData = () => {
  console.log('Updating data for period:', selectedPeriod.value, 'department:', selectedDepartment.value)
}
</script>

<style scoped>
.flow-efficiency-calculator {
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

.efficiency-overview,
.stage-efficiency,
.efficiency-trends,
.process-improvements,
.candidate-flow {
  padding: 20px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
}

.process-improvements,
.candidate-flow {
  grid-column: 1 / -1;
}

.efficiency-overview h4,
.stage-efficiency h4,
.efficiency-trends h4,
.process-improvements h4,
.candidate-flow h4 {
  margin: 0 0 16px 0;
  color: #172b4d;
  font-size: 16px;
}

.efficiency-gauge {
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

.efficiency-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.time-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-label {
  font-size: 12px;
  color: #5e6c84;
}

.metric-value {
  font-size: 14px;
  font-weight: 600;
}

.work-time {
  color: #36b37e;
}

.wait-time {
  color: #ff5630;
}

.total-time {
  color: #172b4d;
}

.stage-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stage-item {
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #e1e5e9;
}

.stage-item.high-efficiency {
  border-color: #36b37e;
  background: #f3fcf5;
}

.stage-item.medium-efficiency {
  border-color: #ff8b00;
  background: #fff8f0;
}

.stage-item.low-efficiency {
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

.stage-efficiency-value {
  font-weight: 600;
  font-size: 14px;
}

.time-bar {
  height: 8px;
  background: #f4f5f7;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  margin-bottom: 4px;
}

.work-portion {
  background: #36b37e;
}

.wait-portion {
  background: #ff5630;
}

.time-details {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
}

.work-detail {
  color: #36b37e;
}

.wait-detail {
  color: #ff5630;
}

.stage-improvements {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 8px;
  background: #e6f2ff;
  border-radius: 4px;
}

.improvement-icon {
  font-size: 14px;
}

.improvement-text {
  font-size: 12px;
  color: #0052cc;
}

.trend-chart {
  height: 150px;
  position: relative;
  margin-bottom: 16px;
}

.chart-area {
  position: relative;
  height: 100px;
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

.point-dot.positive {
  background: #36b37e;
}

.point-dot.negative {
  background: #ff5630;
}

.point-dot.neutral {
  background: #5e6c84;
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

.trend-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.trend-metric-label {
  font-size: 11px;
  color: #5e6c84;
  margin-bottom: 4px;
}

.trend-metric-value {
  font-size: 12px;
  font-weight: 600;
}

.trend-metric-value.improving {
  color: #36b37e;
}

.trend-metric-value.declining {
  color: #ff5630;
}

.trend-metric-value.stable {
  color: #5e6c84;
}

.improvements-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.improvement-item {
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #e1e5e9;
}

.improvement-item.high {
  border-color: #ff5630;
  background: #fff4f3;
}

.improvement-item.medium {
  border-color: #ff8b00;
  background: #fff8f0;
}

.improvement-item.low {
  border-color: #36b37e;
  background: #f3fcf5;
}

.improvement-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.improvement-title {
  flex: 1;
  font-weight: 600;
  color: #172b4d;
}

.improvement-impact {
  font-size: 12px;
  color: #36b37e;
  font-weight: 600;
}

.improvement-description {
  font-size: 14px;
  color: #5e6c84;
  margin-bottom: 8px;
}

.improvement-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.improvement-effort {
  font-size: 11px;
  color: #5e6c84;
}

.implement-btn {
  padding: 4px 12px;
  background: #0052cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
}

.implement-btn:hover {
  background: #0065ff;
}

.candidate-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.candidate-flow-item {
  display: grid;
  grid-template-columns: 150px 1fr auto;
  gap: 16px;
  align-items: center;
  padding: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

.candidate-name {
  font-weight: 600;
  color: #172b4d;
}

.candidate-role {
  font-size: 12px;
  color: #5e6c84;
}

.flow-timeline {
  display: flex;
  align-items: center;
  gap: 8px;
}

.timeline-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.timeline-stage.current-stage .stage-dot {
  background: #0052cc;
  border-color: #0052cc;
}

.stage-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dfe1e6;
  border: 2px solid #dfe1e6;
}

.stage-duration {
  font-size: 10px;
  color: #5e6c84;
}

.candidate-efficiency {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.efficiency-label {
  font-size: 10px;
  color: #5e6c84;
  margin-bottom: 2px;
}

.efficiency-value {
  font-size: 14px;
  font-weight: 600;
}

.efficiency-value.high {
  color: #36b37e;
}

.efficiency-value.medium {
  color: #ff8b00;
}

.efficiency-value.low {
  color: #ff5630;
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
  
  .efficiency-gauge {
    flex-direction: column;
    gap: 16px;
  }
  
  .candidate-flow-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>