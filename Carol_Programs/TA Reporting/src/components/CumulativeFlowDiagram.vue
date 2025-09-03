<template>
  <div class="cumulative-flow-diagram">
    <div class="cfd-header">
      <h4>Cumulative Flow Diagram</h4>
      <div class="cfd-controls">
        <select v-model="selectedPeriod" @change="updateData">
          <option value="30">Last 30 Days</option>
          <option value="60">Last 60 Days</option>
          <option value="90">Last 90 Days</option>
        </select>
        <button @click="addEvent" class="add-event-btn">Add Event</button>
      </div>
    </div>

    <div class="cfd-chart">
      <svg :width="chartWidth" :height="chartHeight" class="flow-chart">
        <!-- Stage areas -->
        <g v-for="(stage, index) in stages" :key="stage.name">
          <path 
            :d="getAreaPath(stage, index)"
            :fill="stage.color"
            :opacity="0.7"
            class="stage-area"
          />
          <text 
            :x="chartWidth - 10" 
            :y="getStageY(stage, index) - 5"
            class="stage-label"
            text-anchor="end"
          >
            {{ stage.name }}
          </text>
        </g>
        
        <!-- Event markers -->
        <g v-for="event in events" :key="event.id">
          <line 
            :x1="getEventX(event.date)" 
            :y1="0" 
            :x2="getEventX(event.date)" 
            :y2="chartHeight - 40"
            stroke="#ff5630" 
            stroke-width="2" 
            stroke-dasharray="5,5"
          />
          <text 
            :x="getEventX(event.date)" 
            :y="15"
            class="event-label"
            text-anchor="middle"
          >
            {{ event.name }}
          </text>
        </g>
        
        <!-- Bottleneck indicators -->
        <g v-for="bottleneck in bottlenecks" :key="bottleneck.id">
          <rect 
            :x="bottleneck.x" 
            :y="bottleneck.y" 
            :width="bottleneck.width" 
            :height="20"
            fill="rgba(255, 86, 48, 0.3)"
            class="bottleneck-indicator"
          />
        </g>
      </svg>
    </div>

    <div class="cfd-legend">
      <div v-for="stage in stages" :key="stage.name" class="legend-item">
        <div class="legend-color" :style="{ background: stage.color }"></div>
        <span>{{ stage.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPeriod = ref(30)
const chartWidth = 800
const chartHeight = 400

const stages = ref([
  { name: 'Sourcing', color: '#0052cc', data: [10, 15, 20, 25, 30, 35, 40] },
  { name: 'Screening', color: '#36b37e', data: [8, 12, 18, 22, 28, 32, 38] },
  { name: 'Interview', color: '#ff8b00', data: [5, 8, 12, 15, 20, 25, 30] },
  { name: 'Technical', color: '#6554c0', data: [3, 5, 8, 10, 15, 18, 22] },
  { name: 'Offer', color: '#ff5630', data: [1, 2, 4, 6, 8, 10, 12] }
])

const events = ref([
  { id: 1, name: 'Hiring Freeze', date: new Date('2024-01-15'), type: 'freeze' },
  { id: 2, name: 'Market Shift', date: new Date('2024-02-01'), type: 'market' }
])

const bottlenecks = computed(() => [
  { id: 1, x: 200, y: 150, width: 100 },
  { id: 2, x: 400, y: 200, width: 80 }
])

const getAreaPath = (stage, index) => {
  const points = stage.data.map((value, i) => {
    const x = (i / (stage.data.length - 1)) * (chartWidth - 100) + 50
    const y = chartHeight - 60 - (value * 2)
    return `${x},${y}`
  })
  
  const bottomPoints = stage.data.map((_, i) => {
    const x = (i / (stage.data.length - 1)) * (chartWidth - 100) + 50
    const y = chartHeight - 60
    return `${x},${y}`
  }).reverse()
  
  return `M${points.join('L')}L${bottomPoints.join('L')}Z`
}

const getStageY = (stage, index) => {
  return chartHeight - 60 - (stage.data[stage.data.length - 1] * 2)
}

const getEventX = (date) => {
  return 200 // Simplified positioning
}

const updateData = () => {
  console.log('Updating CFD for period:', selectedPeriod.value)
}

const addEvent = () => {
  const name = prompt('Event name:')
  if (name) {
    events.value.push({
      id: Date.now(),
      name,
      date: new Date(),
      type: 'custom'
    })
  }
}
</script>

<style scoped>
.cumulative-flow-diagram {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.cfd-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.cfd-controls {
  display: flex;
  gap: 8px;
}

.add-event-btn {
  padding: 4px 8px;
  background: #0052cc;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.flow-chart {
  border: 1px solid #e1e5e9;
  border-radius: 4px;
}

.stage-area {
  transition: opacity 0.2s;
}

.stage-area:hover {
  opacity: 0.9;
}

.stage-label {
  font-size: 12px;
  fill: #172b4d;
}

.event-label {
  font-size: 10px;
  fill: #ff5630;
  font-weight: 600;
}

.bottleneck-indicator {
  cursor: pointer;
}

.cfd-legend {
  display: flex;
  gap: 16px;
  margin-top: 12px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}
</style>