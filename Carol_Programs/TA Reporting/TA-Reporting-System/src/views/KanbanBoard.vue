<template>
  <div class="kanban-view">
    <div class="view-controls">
      <div class="view-selector">
        <select v-model="selectedView" @change="changeView">
          <option value="default">Default View</option>
          <option value="department">By Department</option>
          <option value="priority">By Priority</option>
          <option value="location">By Location</option>
        </select>
      </div>
      
      <div class="filter-controls">
        <input 
          v-model="searchQuery" 
          placeholder="Search candidates..."
          class="search-input"
        >
      </div>
    </div>

    <div v-if="selectedView === 'default'" class="default-kanban">
      <div class="kanban-board">
        <div 
          v-for="column in columns" 
          :key="column.id" 
          class="column"
        >
          <div class="column-header">
            <span class="column-title">{{ column.title }}</span>
            <WipLimitIndicator :status="wipStore.getStageStatus(column.id).value" />
          </div>
          
          <div class="column-content">
            <draggable
              v-model="column.candidates"
              group="candidates"
              item-key="id"
              @start="onDragStart"
              @end="onDragEnd"
            >
              <template #item="{ element }">
                <CandidateCard
                  :candidate="element"
                  :can-move-next="canMoveToNext(column.id)"
                  @move-next="moveToNextStage"
                  @add-note="addNote"
                />
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="swimlane-view">
      <KanbanSwimlane
        v-for="swimlane in swimlanes"
        :key="swimlane.id"
        :swimlane="swimlane"
        :columns="columns"
        :items="filteredCandidates"
        :variant="selectedView"
      >
        <template #item="{ item, column, swimlane }">
          <CandidateCard
            :candidate="item"
            :can-move-next="canMoveToNext(column.id)"
            @move-next="moveToNextStage"
            @add-note="addNote"
          />
        </template>
      </KanbanSwimlane>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import draggable from 'vuedraggable'
import CandidateCard from '../components/CandidateCard.vue'
import WipLimitIndicator from '../components/WipLimitIndicator.vue'
import KanbanSwimlane from '../components/KanbanSwimlane.vue'
import { useWipLimitsStore } from '../stores/wipLimits.js'
import { useWebSocket } from '../composables/useWebSocket.js'

const wipStore = useWipLimitsStore()
const { data: wsData } = useWebSocket('ws://localhost:8080/kanban')

const selectedView = ref('default')
const searchQuery = ref('')

const columns = ref([
  { id: 'sourcing', title: 'Sourcing', candidates: [] },
  { id: 'screening', title: 'Screening', candidates: [] },
  { id: 'phone-screen', title: 'Phone Screen', candidates: [] },
  { id: 'interview', title: 'Interview', candidates: [] },
  { id: 'technical', title: 'Technical Assessment', candidates: [] },
  { id: 'final-interview', title: 'Final Interview', candidates: [] },
  { id: 'offer', title: 'Offer', candidates: [] },
  { id: 'hired', title: 'Hired', candidates: [] }
])

const swimlanes = computed(() => {
  switch (selectedView.value) {
    case 'department':
      return [
        { id: 'engineering', title: 'Engineering', count: 45 },
        { id: 'sales', title: 'Sales', count: 23 },
        { id: 'marketing', title: 'Marketing', count: 18 }
      ]
    case 'priority':
      return [
        { id: 'high', title: 'High Priority', priority: 'high', count: 12 },
        { id: 'medium', title: 'Medium Priority', priority: 'medium', count: 34 },
        { id: 'low', title: 'Low Priority', priority: 'low', count: 20 }
      ]
    case 'location':
      return [
        { id: 'us', title: 'United States', count: 89 },
        { id: 'europe', title: 'Europe', count: 45 },
        { id: 'asia', title: 'Asia Pacific', count: 32 }
      ]
    default:
      return []
  }
})

const filteredCandidates = computed(() => {
  const allCandidates = columns.value.flatMap(col => 
    col.candidates.map(candidate => ({
      ...candidate,
      columnId: col.id,
      swimlaneId: getSwimlaneId(candidate)
    }))
  )
  
  if (!searchQuery.value) return allCandidates
  
  return allCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const getSwimlaneId = (candidate) => {
  switch (selectedView.value) {
    case 'department':
      return candidate.department || 'engineering'
    case 'priority':
      return candidate.priority || 'medium'
    case 'location':
      return candidate.location || 'us'
    default:
      return 'default'
  }
}

const changeView = () => {
  // Trigger re-render of swimlanes
}

const onDragStart = () => {
  document.body.style.cursor = 'grabbing'
}

const onDragEnd = () => {
  document.body.style.cursor = 'default'
  updateWipCounts()
}

const canMoveToNext = (currentColumnId) => {
  const columnIndex = columns.value.findIndex(c => c.id === currentColumnId)
  return columnIndex < columns.value.length - 1
}

const moveToNextStage = (candidateId) => {
  let candidate = null
  let currentColumnIndex = -1
  
  for (let i = 0; i < columns.value.length; i++) {
    const foundCandidate = columns.value[i].candidates.find(c => c.id === candidateId)
    if (foundCandidate) {
      candidate = foundCandidate
      currentColumnIndex = i
      break
    }
  }
  
  if (candidate && currentColumnIndex < columns.value.length - 1) {
    columns.value[currentColumnIndex].candidates = columns.value[currentColumnIndex].candidates.filter(c => c.id !== candidateId)
    candidate.enteredAt = new Date()
    columns.value[currentColumnIndex + 1].candidates.push(candidate)
    updateWipCounts()
  }
}

const addNote = ({ candidateId, note, timestamp }) => {
  for (const column of columns.value) {
    const candidate = column.candidates.find(c => c.id === candidateId)
    if (candidate) {
      candidate.notes = note
      candidate.lastNoteAt = timestamp
      break
    }
  }
}

const updateWipCounts = () => {
  columns.value.forEach(column => {
    wipStore.updateCandidateCount(column.id, column.candidates.length)
  })
}

watch(wsData, (newData) => {
  if (newData && newData.candidates) {
    // Update candidates from WebSocket data
    newData.candidates.forEach(update => {
      const column = columns.value.find(c => c.id === update.columnId)
      if (column) {
        const existingIndex = column.candidates.findIndex(c => c.id === update.candidate.id)
        if (existingIndex >= 0) {
          column.candidates[existingIndex] = update.candidate
        } else {
          column.candidates.push(update.candidate)
        }
      }
    })
    updateWipCounts()
  }
})

onMounted(() => {
  // Initialize with sample data
  columns.value[0].candidates = [
    { 
      id: 1, 
      name: 'John Smith', 
      role: 'Frontend Developer', 
      enteredAt: new Date('2024-01-15'), 
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      priority: 'high',
      department: 'engineering',
      location: 'us',
      skills: ['React', 'TypeScript', 'CSS'],
      notes: 'Strong technical background'
    }
  ]
  
  updateWipCounts()
})
</script>

<style scoped>
.kanban-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.view-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
}

.view-selector select {
  padding: 8px 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: white;
  font-size: 14px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  font-size: 14px;
  min-width: 200px;
}

.default-kanban {
  flex: 1;
  overflow: hidden;
}

.kanban-board {
  display: flex;
  gap: 16px;
  height: 100%;
  overflow-x: auto;
  padding-bottom: 20px;
}

.column {
  min-width: 280px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.column-header {
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-title {
  font-weight: 600;
  color: #172b4d;
}

.column-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.swimlane-view {
  flex: 1;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .view-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-input {
    min-width: auto;
  }
  
  .kanban-board {
    flex-direction: column;
    height: auto;
  }
  
  .column {
    min-width: auto;
  }
}
</style>