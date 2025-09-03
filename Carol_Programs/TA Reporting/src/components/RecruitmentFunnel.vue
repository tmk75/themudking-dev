<template>
  <div class="recruitment-funnel">
    <div class="funnel-header">
      <h3>Recruitment Funnel</h3>
      <div class="funnel-controls">
        <select v-model="selectedPeriod" @change="updateData">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>
    </div>

    <div class="funnel-container">
      <div class="funnel-stages">
        <div 
          v-for="(stage, index) in funnelStages" 
          :key="stage.id"
          class="funnel-stage"
          :class="{ 
            'bottleneck': stage.isBottleneck,
            'efficient': stage.efficiency > 85 
          }"
          @click="drillDown(stage)"
          @mouseenter="showTooltip(stage, $event)"
          @mouseleave="hideTooltip"
        >
          <div class="stage-visual">
            <div 
              class="stage-bar"
              :style="{ 
                width: `${stage.width}%`,
                background: getStageColor(stage)
              }"
            >
              <div class="stage-count">{{ stage.count }}</div>
            </div>
          </div>
          
          <div class="stage-info">
            <div class="stage-name">{{ stage.name }}</div>
            <div class="stage-metrics">
              <span class="conversion-rate" :class="getConversionClass(stage.conversionRate)">
                {{ stage.conversionRate }}% conversion
              </span>
              <span class="avg-time">{{ stage.avgTime }}d avg</span>
            </div>
          </div>

          <div v-if="index < funnelStages.length - 1" class="flow-arrow">
            <div class="arrow-line"></div>
            <div class="flow-rate">{{ getFlowRate(index) }}/day</div>
          </div>
        </div>
      </div>

      <div class="funnel-summary">
        <div class="summary-metrics">
          <div class="metric">
            <span class="metric-label">Overall Conversion</span>
            <span class="metric-value">{{ overallConversion }}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Avg Time to Hire</span>
            <span class="metric-value">{{ avgTimeToHire }}d</span>
          </div>
          <div class="metric">
            <span class="metric-label">Flow Efficiency</span>
            <span class="metric-value" :class="getEfficiencyClass(flowEfficiency)">
              {{ flowEfficiency }}%
            </span>
          </div>
        </div>

        <div class="bottleneck-alerts" v-if="bottlenecks.length > 0">
          <h4>Bottleneck Alerts</h4>
          <div 
            v-for="bottleneck in bottlenecks" 
            :key="bottleneck.stage"
            class="bottleneck-alert"
          >
            <span class="alert-icon">⚠️</span>
            <span class="alert-text">{{ bottleneck.message }}</span>
            <button @click="drillDown(bottleneck)" class="alert-action">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tooltip -->
    <div 
      v-if="tooltip.visible"
      class="funnel-tooltip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <div class="tooltip-header">{{ tooltip.stage?.name }}</div>
      <div class="tooltip-content">
        <div class="tooltip-row">
          <span>Candidates:</span>
          <span>{{ tooltip.stage?.count }}</span>
        </div>
        <div class="tooltip-row">
          <span>Conversion Rate:</span>
          <span>{{ tooltip.stage?.conversionRate }}%</span>
        </div>
        <div class="tooltip-row">
          <span>Average Time:</span>
          <span>{{ tooltip.stage?.avgTime }} days</span>
        </div>
        <div class="tooltip-row">
          <span>Efficiency:</span>
          <span>{{ tooltip.stage?.efficiency }}%</span>
        </div>
        <div class="tooltip-row">
          <span>Throughput:</span>
          <span>{{ tooltip.stage?.throughput }}/day</span>
        </div>
      </div>
      <div class="tooltip-footer">Click to drill down</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['drill-down'])

const selectedPeriod = ref('month')

const funnelStages = ref([
  {
    id: 'sourced',
    name: 'Sourced',
    count: 1000,
    conversionRate: 45,
    avgTime: 2,
    efficiency: 88,
    throughput: 25,
    isBottleneck: false
  },
  {
    id: 'screened',
    name: 'Screened',
    count: 450,
    conversionRate: 62,
    avgTime: 3,
    efficiency: 72,
    throughput: 18,
    isBottleneck: true
  },
  {
    id: 'phone-screen',
    name: 'Phone Screen',
    count: 279,
    conversionRate: 58,
    avgTime: 1,
    efficiency: 92,
    throughput: 15,
    isBottleneck: false
  },
  {
    id: 'interviewed',
    name: 'Interviewed',
    count: 162,
    conversionRate: 74,
    avgTime: 5,
    efficiency: 65,
    throughput: 12,
    isBottleneck: true
  },
  {
    id: 'technical',
    name: 'Technical',
    count: 120,
    conversionRate: 67,
    avgTime: 3,
    efficiency: 78,
    throughput: 8,
    isBottleneck: false
  },
  {
    id: 'offered',
    name: 'Offered',
    count: 80,
    conversionRate: 85,
    avgTime: 4,
    efficiency: 95,
    throughput: 6,
    isBottleneck: false
  },
  {
    id: 'hired',
    name: 'Hired',
    count: 68,
    conversionRate: 100,
    avgTime: 0,
    efficiency: 100,
    throughput: 5,
    isBottleneck: false
  }
])

const tooltip = ref({
  visible: false,
  x: 0,
  y: 0,
  stage: null
})

// Computed properties
const overallConversion = computed(() => {
  const first = funnelStages.value[0]?.count || 1
  const last = funnelStages.value[funnelStages.value.length - 1]?.count || 0
  return Math.round((last / first) * 100)
})

const avgTimeToHire = computed(() => {
  return funnelStages.value.reduce((sum, stage) => sum + stage.avgTime, 0)
})

const flowEfficiency = computed(() => {
  const totalEfficiency = funnelStages.value.reduce((sum, stage) => sum + stage.efficiency, 0)
  return Math.round(totalEfficiency / funnelStages.value.length)
})

const bottlenecks = computed(() => {
  return funnelStages.value
    .filter(stage => stage.isBottleneck)
    .map(stage => ({
      stage: stage.id,
      message: `${stage.name} stage showing reduced flow (${stage.efficiency}% efficiency)`,
      ...stage
    }))
})

// Calculate stage widths for visual representation
onMounted(() => {
  const maxCount = Math.max(...funnelStages.value.map(s => s.count))
  funnelStages.value.forEach(stage => {
    stage.width = (stage.count / maxCount) * 100
  })
})

const getStageColor = (stage) => {
  if (stage.isBottleneck) return '#ff5630'
  if (stage.efficiency > 85) return '#36b37e'
  if (stage.efficiency > 70) return '#ff8b00'
  return '#0052cc'
}

const getConversionClass = (rate) => {
  if (rate >= 80) return 'excellent'
  if (rate >= 65) return 'good'
  if (rate >= 50) return 'fair'
  return 'poor'
}

const getEfficiencyClass = (efficiency) => {
  if (efficiency >= 85) return 'excellent'
  if (efficiency >= 70) return 'good'
  if (efficiency >= 55) return 'fair'
  return 'poor'
}

const getFlowRate = (index) => {
  if (index >= funnelStages.value.length - 1) return 0
  return funnelStages.value[index + 1].throughput
}

const showTooltip = (stage, event) => {
  tooltip.value = {
    visible: true,
    x: event.clientX + 10,
    y: event.clientY - 10,
    stage
  }
}

const hideTooltip = () => {
  tooltip.value.visible = false
}

const drillDown = (stage) => {
  emit('drill-down', stage)
  // Navigate to specific Kanban view
  router.push(`/kanban?stage=${stage.id}&period=${selectedPeriod.value}`)
}

const updateData = () => {
  // Simulate data update based on period
  console.log('Updating funnel data for period:', selectedPeriod.value)
}
</script>

<style scoped>
.recruitment-funnel {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.funnel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.funnel-header h3 {
  margin: 0;
  color: #172b4d;
}

.funnel-controls select {
  padding: 6px 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: white;
  font-size: 14px;
}

.funnel-container {
  display: grid;
  gap: 24px;
}

.funnel-stages {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.funnel-stage {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e1e5e9;
}

.funnel-stage:hover {
  background: #f4f5f7;
  transform: translateX(4px);
}

.funnel-stage.bottleneck {
  border-color: #ff5630;
  background: #fff4f3;
}

.funnel-stage.efficient {
  border-color: #36b37e;
  background: #f3fcf5;
}

.stage-visual {
  display: flex;
  align-items: center;
  min-height: 40px;
}

.stage-bar {
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  position: relative;
  transition: all 0.3s ease;
}

.stage-count {
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.stage-info {
  min-width: 120px;
}

.stage-name {
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 4px;
}

.stage-metrics {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.conversion-rate,
.avg-time {
  font-size: 12px;
}

.conversion-rate.excellent {
  color: #36b37e;
}

.conversion-rate.good {
  color: #00875a;
}

.conversion-rate.fair {
  color: #ff8b00;
}

.conversion-rate.poor {
  color: #ff5630;
}

.avg-time {
  color: #5e6c84;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 8px 0;
}

.arrow-line {
  width: 2px;
  height: 20px;
  background: #dfe1e6;
  position: relative;
}

.arrow-line::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: -3px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #dfe1e6;
}

.flow-rate {
  font-size: 10px;
  color: #5e6c84;
  background: #f4f5f7;
  padding: 2px 6px;
  border-radius: 3px;
}

.funnel-summary {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid #e1e5e9;
}

.summary-metrics {
  display: flex;
  gap: 24px;
}

.metric {
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
  color: #172b4d;
}

.metric-value.excellent {
  color: #36b37e;
}

.metric-value.good {
  color: #00875a;
}

.metric-value.fair {
  color: #ff8b00;
}

.metric-value.poor {
  color: #ff5630;
}

.bottleneck-alerts h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #172b4d;
}

.bottleneck-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #fff4f3;
  border: 1px solid #ff5630;
  border-radius: 4px;
  margin-bottom: 4px;
}

.alert-icon {
  font-size: 14px;
}

.alert-text {
  flex: 1;
  font-size: 12px;
  color: #172b4d;
}

.alert-action {
  padding: 4px 8px;
  background: #ff5630;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 11px;
  cursor: pointer;
}

.alert-action:hover {
  background: #de350b;
}

.funnel-tooltip {
  position: fixed;
  background: #172b4d;
  color: white;
  padding: 12px;
  border-radius: 6px;
  font-size: 12px;
  z-index: 1000;
  max-width: 200px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.tooltip-header {
  font-weight: 600;
  margin-bottom: 8px;
  border-bottom: 1px solid #344563;
  padding-bottom: 4px;
}

.tooltip-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
}

.tooltip-footer {
  margin-top: 8px;
  padding-top: 4px;
  border-top: 1px solid #344563;
  font-style: italic;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .funnel-stage {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .funnel-summary {
    grid-template-columns: 1fr;
  }
  
  .summary-metrics {
    flex-direction: column;
    gap: 16px;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
    margin: 0 8px;
  }
}
</style>