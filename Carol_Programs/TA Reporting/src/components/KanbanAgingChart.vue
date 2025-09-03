<template>
  <div class="kanban-aging-chart">
    <div class="aging-header">
      <h4>Candidate Aging Chart</h4>
      <div class="aging-controls">
        <select v-model="selectedStage" @change="updateChart">
          <option value="all">All Stages</option>
          <option value="screening">Screening</option>
          <option value="interview">Interview</option>
          <option value="technical">Technical</option>
        </select>
      </div>
    </div>

    <div class="aging-chart">
      <div class="percentile-lines">
        <div v-for="line in percentileLines" :key="line.percentile" 
             class="percentile-line" 
             :style="{ left: `${line.position}%` }">
          <span class="percentile-label">P{{ line.percentile }}</span>
        </div>
      </div>
      
      <div class="candidate-bars">
        <div v-for="candidate in agingCandidates" :key="candidate.id" 
             class="candidate-bar" 
             :class="getAgingClass(candidate.daysInStage)">
          <div class="candidate-info">
            <span class="candidate-name">{{ candidate.name }}</span>
            <span class="candidate-stage">{{ candidate.stage }}</span>
          </div>
          <div class="aging-bar">
            <div class="bar-fill" 
                 :style="{ width: `${Math.min(candidate.daysInStage * 10, 100)}%` }">
              <span class="days-label">{{ candidate.daysInStage }}d</span>
            </div>
          </div>
          <div class="candidate-actions">
            <button @click="escalateCandidate(candidate)" class="action-btn escalate">
              Escalate
            </button>
            <button @click="moveCandidate(candidate)" class="action-btn move">
              Move
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="aging-legend">
      <div class="threshold-item green">
        <div class="threshold-color"></div>
        <span>&lt;3 days (Healthy)</span>
      </div>
      <div class="threshold-item yellow">
        <div class="threshold-color"></div>
        <span>3-7 days (Monitor)</span>
      </div>
      <div class="threshold-item red">
        <div class="threshold-color"></div>
        <span>&gt;7 days (Action Required)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedStage = ref('all')

const agingCandidates = ref([
  { id: 1, name: 'Sarah Johnson', stage: 'Interview', daysInStage: 12 },
  { id: 2, name: 'Mike Chen', stage: 'Screening', daysInStage: 5 },
  { id: 3, name: 'Emily Davis', stage: 'Technical', daysInStage: 2 },
  { id: 4, name: 'John Smith', stage: 'Interview', daysInStage: 9 },
  { id: 5, name: 'Lisa Wang', stage: 'Screening', daysInStage: 1 }
])

const percentileLines = computed(() => [
  { percentile: 50, position: 30 },
  { percentile: 75, position: 50 },
  { percentile: 90, position: 70 }
])

const getAgingClass = (days) => {
  if (days <= 3) return 'healthy'
  if (days <= 7) return 'monitor'
  return 'critical'
}

const escalateCandidate = (candidate) => {
  console.log('Escalating candidate:', candidate.name)
}

const moveCandidate = (candidate) => {
  console.log('Moving candidate:', candidate.name)
}

const updateChart = () => {
  console.log('Updating chart for stage:', selectedStage.value)
}
</script>

<style scoped>
.kanban-aging-chart {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.aging-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.aging-chart {
  position: relative;
  margin-bottom: 16px;
}

.percentile-lines {
  position: relative;
  height: 20px;
  margin-bottom: 8px;
}

.percentile-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #5e6c84;
  opacity: 0.5;
}

.percentile-label {
  position: absolute;
  top: -15px;
  left: -10px;
  font-size: 10px;
  color: #5e6c84;
}

.candidate-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.candidate-bar {
  display: grid;
  grid-template-columns: 150px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  border-left: 4px solid;
}

.candidate-bar.healthy {
  border-color: #36b37e;
  background: #f3fcf5;
}

.candidate-bar.monitor {
  border-color: #ff8b00;
  background: #fff8f0;
}

.candidate-bar.critical {
  border-color: #ff5630;
  background: #fff4f3;
}

.candidate-info {
  display: flex;
  flex-direction: column;
}

.candidate-name {
  font-weight: 600;
  color: #172b4d;
}

.candidate-stage {
  font-size: 12px;
  color: #5e6c84;
}

.aging-bar {
  position: relative;
  height: 20px;
  background: #f4f5f7;
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.3s ease;
}

.candidate-bar.healthy .bar-fill {
  background: #36b37e;
}

.candidate-bar.monitor .bar-fill {
  background: #ff8b00;
}

.candidate-bar.critical .bar-fill {
  background: #ff5630;
}

.days-label {
  color: white;
  font-size: 11px;
  font-weight: 600;
}

.candidate-actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 3px;
  font-size: 11px;
  cursor: pointer;
}

.action-btn.escalate {
  background: #ff8b00;
  color: white;
}

.action-btn.move {
  background: #0052cc;
  color: white;
}

.aging-legend {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.threshold-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

.threshold-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.threshold-item.green .threshold-color {
  background: #36b37e;
}

.threshold-item.yellow .threshold-color {
  background: #ff8b00;
}

.threshold-item.red .threshold-color {
  background: #ff5630;
}
</style>