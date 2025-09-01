<template>
  <div class="interactive-pipeline-heatmap">
    <div class="heatmap-header">
      <h4>Pipeline Flow Heatmap</h4>
      <div class="heatmap-controls">
        <select v-model="selectedView" @change="updateHeatmap">
          <option value="efficiency">Flow Efficiency</option>
          <option value="bottlenecks">Bottleneck Severity</option>
          <option value="aging">Candidate Aging</option>
        </select>
      </div>
    </div>

    <div class="heatmap-grid">
      <div class="stage-headers">
        <div v-for="stage in stages" :key="stage" class="stage-header">
          {{ stage }}
        </div>
      </div>
      
      <div class="role-rows">
        <div v-for="role in roles" :key="role.name" class="role-row">
          <div class="role-label">{{ role.name }}</div>
          <div class="role-cells">
            <div v-for="(cell, stageIndex) in role.cells" :key="stageIndex"
                 class="heatmap-cell"
                 :class="getHeatmapClass(cell)"
                 @click="drillDown(role, stageIndex)"
                 :title="getCellTooltip(cell, role.name, stages[stageIndex])">
              <span class="cell-count">{{ cell.count }}</span>
              <div v-if="cell.blocked" class="blocked-indicator">🚫</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="heatmap-legend">
      <div class="legend-title">{{ selectedView === 'efficiency' ? 'Flow Efficiency' : 
                                     selectedView === 'bottlenecks' ? 'Bottleneck Severity' : 
                                     'Aging Status' }}</div>
      <div class="legend-scale">
        <div class="scale-item healthy">
          <div class="scale-color"></div>
          <span>{{ selectedView === 'efficiency' ? '>80%' : 
                   selectedView === 'bottlenecks' ? 'No Issues' : 
                   '<3 days' }}</span>
        </div>
        <div class="scale-item warning">
          <div class="scale-color"></div>
          <span>{{ selectedView === 'efficiency' ? '60-80%' : 
                   selectedView === 'bottlenecks' ? 'Minor Issues' : 
                   '3-7 days' }}</span>
        </div>
        <div class="scale-item critical">
          <div class="scale-color"></div>
          <span>{{ selectedView === 'efficiency' ? '<60%' : 
                   selectedView === 'bottlenecks' ? 'Major Issues' : 
                   '>7 days' }}</span>
        </div>
      </div>
    </div>

    <!-- Drill-down modal -->
    <div v-if="showDrillDown" class="drill-down-modal" @click="closeDrillDown">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h5>{{ drillDownData.role }} - {{ drillDownData.stage }}</h5>
          <button @click="closeDrillDown" class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <div v-for="candidate in drillDownData.candidates" :key="candidate.id" 
               class="candidate-item">
            <div class="candidate-info">
              <span class="candidate-name">{{ candidate.name }}</span>
              <span class="candidate-days">{{ candidate.daysInStage }} days</span>
            </div>
            <div class="candidate-actions">
              <button @click="moveCandidate(candidate)" class="action-btn">Move</button>
              <button @click="escalateCandidate(candidate)" class="action-btn escalate">Escalate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedView = ref('efficiency')
const showDrillDown = ref(false)
const drillDownData = ref({})

const stages = ['Sourcing', 'Screening', 'Interview', 'Technical', 'Offer']

const roles = ref([
  {
    name: 'Senior Engineer',
    cells: [
      { count: 5, efficiency: 85, bottleneck: 'none', avgAging: 2, blocked: false },
      { count: 8, efficiency: 65, bottleneck: 'minor', avgAging: 5, blocked: false },
      { count: 3, efficiency: 45, bottleneck: 'major', avgAging: 9, blocked: true },
      { count: 2, efficiency: 90, bottleneck: 'none', avgAging: 1, blocked: false },
      { count: 1, efficiency: 95, bottleneck: 'none', avgAging: 2, blocked: false }
    ]
  },
  {
    name: 'Sales Manager',
    cells: [
      { count: 3, efficiency: 90, bottleneck: 'none', avgAging: 1, blocked: false },
      { count: 4, efficiency: 75, bottleneck: 'minor', avgAging: 4, blocked: false },
      { count: 6, efficiency: 55, bottleneck: 'major', avgAging: 8, blocked: true },
      { count: 2, efficiency: 80, bottleneck: 'none', avgAging: 3, blocked: false },
      { count: 1, efficiency: 85, bottleneck: 'none', avgAging: 2, blocked: false }
    ]
  },
  {
    name: 'Marketing Specialist',
    cells: [
      { count: 4, efficiency: 80, bottleneck: 'none', avgAging: 2, blocked: false },
      { count: 2, efficiency: 70, bottleneck: 'minor', avgAging: 6, blocked: false },
      { count: 1, efficiency: 85, bottleneck: 'none', avgAging: 3, blocked: false },
      { count: 3, efficiency: 60, bottleneck: 'minor', avgAging: 7, blocked: false },
      { count: 2, efficiency: 90, bottleneck: 'none', avgAging: 1, blocked: false }
    ]
  }
])

const getHeatmapClass = (cell) => {
  let value
  if (selectedView.value === 'efficiency') {
    value = cell.efficiency
    if (value >= 80) return 'cell-healthy'
    if (value >= 60) return 'cell-warning'
    return 'cell-critical'
  } else if (selectedView.value === 'bottlenecks') {
    if (cell.bottleneck === 'none') return 'cell-healthy'
    if (cell.bottleneck === 'minor') return 'cell-warning'
    return 'cell-critical'
  } else {
    value = cell.avgAging
    if (value < 3) return 'cell-healthy'
    if (value <= 7) return 'cell-warning'
    return 'cell-critical'
  }
}

const getCellTooltip = (cell, roleName, stageName) => {
  return `${roleName} - ${stageName}\nCount: ${cell.count}\nEfficiency: ${cell.efficiency}%\nAvg Aging: ${cell.avgAging} days`
}

const drillDown = (role, stageIndex) => {
  drillDownData.value = {
    role: role.name,
    stage: stages[stageIndex],
    candidates: [
      { id: 1, name: 'John Doe', daysInStage: 5 },
      { id: 2, name: 'Jane Smith', daysInStage: 8 },
      { id: 3, name: 'Bob Johnson', daysInStage: 3 }
    ]
  }
  showDrillDown.value = true
}

const closeDrillDown = () => {
  showDrillDown.value = false
}

const moveCandidate = (candidate) => {
  console.log('Moving candidate:', candidate.name)
  closeDrillDown()
}

const escalateCandidate = (candidate) => {
  console.log('Escalating candidate:', candidate.name)
  closeDrillDown()
}

const updateHeatmap = () => {
  console.log('Updating heatmap view:', selectedView.value)
}
</script>

<style scoped>
.interactive-pipeline-heatmap {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.heatmap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.heatmap-grid {
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  overflow: hidden;
}

.stage-headers {
  display: grid;
  grid-template-columns: 150px repeat(5, 1fr);
  background: #f4f5f7;
}

.stage-header {
  padding: 8px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #172b4d;
  border-right: 1px solid #e1e5e9;
}

.role-row {
  display: grid;
  grid-template-columns: 150px repeat(5, 1fr);
  border-bottom: 1px solid #e1e5e9;
}

.role-label {
  padding: 12px 8px;
  background: #f9fafc;
  font-size: 12px;
  font-weight: 600;
  color: #172b4d;
  border-right: 1px solid #e1e5e9;
  display: flex;
  align-items: center;
}

.role-cells {
  display: contents;
}

.heatmap-cell {
  padding: 12px 8px;
  text-align: center;
  cursor: pointer;
  border-right: 1px solid #e1e5e9;
  position: relative;
  transition: all 0.2s ease;
}

.heatmap-cell:hover {
  transform: scale(1.05);
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.cell-healthy {
  background: #e3fcef;
  color: #006644;
}

.cell-warning {
  background: #fff4e6;
  color: #974f00;
}

.cell-critical {
  background: #ffebe6;
  color: #bf2600;
}

.cell-count {
  font-size: 16px;
  font-weight: 700;
}

.blocked-indicator {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 10px;
}

.heatmap-legend {
  margin-top: 16px;
  text-align: center;
}

.legend-title {
  font-size: 12px;
  color: #5e6c84;
  margin-bottom: 8px;
}

.legend-scale {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.scale-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
}

.scale-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.scale-item.healthy .scale-color {
  background: #36b37e;
}

.scale-item.warning .scale-color {
  background: #ff8b00;
}

.scale-item.critical .scale-color {
  background: #ff5630;
}

.drill-down-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
}

.modal-header h5 {
  margin: 0;
  color: #172b4d;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #5e6c84;
}

.modal-body {
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.candidate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  margin-bottom: 8px;
}

.candidate-info {
  display: flex;
  flex-direction: column;
}

.candidate-name {
  font-weight: 600;
  color: #172b4d;
}

.candidate-days {
  font-size: 12px;
  color: #5e6c84;
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
  background: #0052cc;
  color: white;
}

.action-btn.escalate {
  background: #ff8b00;
}
</style>