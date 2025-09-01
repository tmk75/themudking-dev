<template>
  <div class="pipeline-health">
    <div class="health-overview">
      <div class="health-score">
        <div class="score-circle" :class="healthClass">
          <span class="score-value">{{ overallHealth }}%</span>
        </div>
        <div class="score-label">Overall Pipeline Health</div>
      </div>
      
      <div class="health-indicators">
        <div 
          v-for="indicator in healthIndicators" 
          :key="indicator.id"
          class="health-indicator"
          :class="indicator.status"
        >
          <div class="indicator-icon">{{ indicator.icon }}</div>
          <div class="indicator-content">
            <div class="indicator-title">{{ indicator.title }}</div>
            <div class="indicator-value">{{ indicator.value }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="health-details">
      <div class="bottleneck-analysis">
        <h3>Bottleneck Analysis</h3>
        <div class="bottlenecks">
          <div 
            v-for="bottleneck in bottlenecks" 
            :key="bottleneck.stage"
            class="bottleneck-item"
            :class="bottleneck.severity"
          >
            <div class="bottleneck-stage">{{ bottleneck.stage }}</div>
            <div class="bottleneck-issue">{{ bottleneck.issue }}</div>
            <div class="bottleneck-impact">Impact: {{ bottleneck.impact }}</div>
            <div class="bottleneck-recommendation">{{ bottleneck.recommendation }}</div>
          </div>
        </div>
      </div>

      <div class="flow-analysis">
        <h3>Flow Efficiency</h3>
        <div class="flow-metrics">
          <div 
            v-for="flow in flowMetrics" 
            :key="flow.stage"
            class="flow-metric"
          >
            <div class="flow-stage">{{ flow.stage }}</div>
            <div class="flow-stats">
              <div class="flow-throughput">
                <span class="label">Throughput</span>
                <span class="value">{{ flow.throughput }}/day</span>
              </div>
              <div class="flow-cycle-time">
                <span class="label">Cycle Time</span>
                <span class="value">{{ flow.cycleTime }} days</span>
              </div>
              <div class="flow-efficiency">
                <span class="label">Efficiency</span>
                <span class="value" :class="getEfficiencyClass(flow.efficiency)">
                  {{ flow.efficiency }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="capacity-analysis">
        <h3>Capacity Utilization</h3>
        <div class="capacity-grid">
          <div 
            v-for="capacity in capacityData" 
            :key="capacity.resource"
            class="capacity-item"
          >
            <div class="capacity-resource">{{ capacity.resource }}</div>
            <div class="capacity-bar">
              <div 
                class="capacity-fill"
                :class="getCapacityClass(capacity.utilization)"
                :style="{ width: `${capacity.utilization}%` }"
              ></div>
            </div>
            <div class="capacity-percentage">{{ capacity.utilization }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWebSocket } from '../composables/useWebSocket.js'

const { data: wsData } = useWebSocket('ws://localhost:8080/pipeline-health')

const overallHealth = ref(87)

const healthIndicators = ref([
  { id: 'velocity', icon: '🚀', title: 'Velocity', value: 'Good', status: 'good' },
  { id: 'quality', icon: '✅', title: 'Quality', value: 'Excellent', status: 'excellent' },
  { id: 'predictability', icon: '📊', title: 'Predictability', value: 'Fair', status: 'warning' },
  { id: 'efficiency', icon: '⚡', title: 'Efficiency', value: 'Good', status: 'good' }
])

const bottlenecks = ref([
  {
    stage: 'Screening',
    issue: 'High volume causing delays',
    impact: 'High',
    severity: 'critical',
    recommendation: 'Add automated pre-screening'
  },
  {
    stage: 'Technical Assessment',
    issue: 'Limited interviewer availability',
    impact: 'Medium',
    severity: 'warning',
    recommendation: 'Expand interviewer pool'
  },
  {
    stage: 'Final Interview',
    issue: 'Executive calendar conflicts',
    impact: 'Medium',
    severity: 'warning',
    recommendation: 'Delegate to senior managers'
  }
])

const flowMetrics = ref([
  { stage: 'Sourcing', throughput: 12, cycleTime: 2, efficiency: 85 },
  { stage: 'Screening', throughput: 8, cycleTime: 4, efficiency: 65 },
  { stage: 'Phone Screen', throughput: 6, cycleTime: 1, efficiency: 90 },
  { stage: 'Interview', throughput: 5, cycleTime: 3, efficiency: 75 },
  { stage: 'Technical', throughput: 3, cycleTime: 2, efficiency: 80 },
  { stage: 'Final Interview', throughput: 2, cycleTime: 5, efficiency: 60 },
  { stage: 'Offer', throughput: 2, cycleTime: 3, efficiency: 95 }
])

const capacityData = ref([
  { resource: 'Recruiters', utilization: 95 },
  { resource: 'Hiring Managers', utilization: 78 },
  { resource: 'Technical Interviewers', utilization: 88 },
  { resource: 'Executive Team', utilization: 65 }
])

const healthClass = computed(() => {
  const health = overallHealth.value
  if (health >= 90) return 'excellent'
  if (health >= 75) return 'good'
  if (health >= 60) return 'warning'
  return 'critical'
})

const getEfficiencyClass = (efficiency) => {
  if (efficiency >= 85) return 'excellent'
  if (efficiency >= 70) return 'good'
  if (efficiency >= 55) return 'warning'
  return 'critical'
}

const getCapacityClass = (utilization) => {
  if (utilization >= 95) return 'critical'
  if (utilization >= 85) return 'warning'
  if (utilization >= 70) return 'good'
  return 'low'
}
</script>

<style scoped>
.pipeline-health {
  padding: 20px;
}

.health-overview {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 32px;
  margin-bottom: 32px;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.health-score {
  text-align: center;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  border: 8px solid;
}

.score-circle.excellent {
  border-color: #36b37e;
  background: #e3fcef;
}

.score-circle.good {
  border-color: #00875a;
  background: #e3fcef;
}

.score-circle.warning {
  border-color: #ff8b00;
  background: #fff4e6;
}

.score-circle.critical {
  border-color: #ff5630;
  background: #ffebe6;
}

.score-value {
  font-size: 24px;
  font-weight: 700;
  color: #172b4d;
}

.score-label {
  font-size: 14px;
  color: #5e6c84;
  font-weight: 500;
}

.health-indicators {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.health-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #e1e5e9;
}

.health-indicator.excellent {
  background: #e3fcef;
  border-color: #36b37e;
}

.health-indicator.good {
  background: #e3fcef;
  border-color: #00875a;
}

.health-indicator.warning {
  background: #fff4e6;
  border-color: #ff8b00;
}

.health-indicator.critical {
  background: #ffebe6;
  border-color: #ff5630;
}

.indicator-icon {
  font-size: 20px;
}

.indicator-title {
  font-size: 12px;
  color: #5e6c84;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.indicator-value {
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
}

.health-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.bottleneck-analysis,
.flow-analysis,
.capacity-analysis {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.capacity-analysis {
  grid-column: 1 / -1;
}

.bottleneck-analysis h3,
.flow-analysis h3,
.capacity-analysis h3 {
  margin: 0 0 16px 0;
  color: #172b4d;
}

.bottlenecks {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bottleneck-item {
  padding: 12px;
  border-radius: 6px;
  border-left: 4px solid;
}

.bottleneck-item.critical {
  background: #ffebe6;
  border-color: #ff5630;
}

.bottleneck-item.warning {
  background: #fff4e6;
  border-color: #ff8b00;
}

.bottleneck-stage {
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 4px;
}

.bottleneck-issue {
  font-size: 14px;
  color: #5e6c84;
  margin-bottom: 4px;
}

.bottleneck-impact {
  font-size: 12px;
  color: #ff5630;
  font-weight: 500;
  margin-bottom: 4px;
}

.bottleneck-recommendation {
  font-size: 12px;
  color: #0052cc;
  font-style: italic;
}

.flow-metrics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.flow-metric {
  padding: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
}

.flow-stage {
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 8px;
}

.flow-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.flow-throughput,
.flow-cycle-time,
.flow-efficiency {
  text-align: center;
}

.label {
  display: block;
  font-size: 10px;
  color: #5e6c84;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.value {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
}

.value.excellent {
  color: #36b37e;
}

.value.good {
  color: #00875a;
}

.value.warning {
  color: #ff8b00;
}

.value.critical {
  color: #ff5630;
}

.capacity-grid {
  display: grid;
  gap: 12px;
}

.capacity-item {
  display: grid;
  grid-template-columns: 150px 1fr 60px;
  gap: 12px;
  align-items: center;
}

.capacity-resource {
  font-weight: 500;
  color: #172b4d;
}

.capacity-bar {
  height: 8px;
  background: #f4f5f7;
  border-radius: 4px;
  overflow: hidden;
}

.capacity-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.capacity-fill.excellent {
  background: #36b37e;
}

.capacity-fill.good {
  background: #00875a;
}

.capacity-fill.warning {
  background: #ff8b00;
}

.capacity-fill.critical {
  background: #ff5630;
}

.capacity-fill.low {
  background: #6554c0;
}

.capacity-percentage {
  font-size: 12px;
  font-weight: 600;
  color: #172b4d;
  text-align: right;
}

@media (max-width: 768px) {
  .health-overview {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .health-details {
    grid-template-columns: 1fr;
  }
  
  .capacity-item {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>