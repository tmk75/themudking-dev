<template>
  <div 
    class="candidate-card"
    :class="{ 
      urgent: isUrgent,
      'high-priority': candidate.priority === 'high',
      'medium-priority': candidate.priority === 'medium',
      'low-priority': candidate.priority === 'low'
    }"
  >
    <div class="card-header">
      <img 
        :src="candidate.photo || '/default-avatar.svg'" 
        :alt="candidate.name"
        class="candidate-photo"
      >
      <div class="candidate-info">
        <h3 class="candidate-name">{{ candidate.name }}</h3>
        <p class="candidate-role">{{ candidate.role }}</p>
      </div>
      <div class="priority-badge" :class="`priority-${candidate.priority}`">
        {{ candidate.priority?.toUpperCase() }}
      </div>
    </div>

    <div class="skills-section">
      <span 
        v-for="skill in candidate.skills" 
        :key="skill"
        class="skill-tag"
      >
        {{ skill }}
      </span>
    </div>

    <div class="card-footer">
      <span class="days-indicator" :class="{ urgent: isUrgent }">
        {{ daysInStage }} days in stage
      </span>
      <div class="card-actions">
        <button 
          @click="moveToNext"
          class="btn btn-primary"
          :disabled="!canMoveNext"
        >
          Next Stage
        </button>
        <button 
          @click="openNotesModal"
          class="btn btn-secondary"
        >
          Notes
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showNotesModal" class="modal-overlay" @click="closeNotesModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Notes for {{ candidate.name }}</h3>
            <button @click="closeNotesModal" class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            <textarea 
              v-model="noteText"
              placeholder="Add notes about this candidate..."
              class="notes-textarea"
            ></textarea>
          </div>
          <div class="modal-footer">
            <button @click="saveNote" class="btn btn-primary">Save Note</button>
            <button @click="closeNotesModal" class="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  candidate: {
    type: Object,
    required: true,
    validator: (candidate) => {
      return candidate.name && candidate.role && candidate.enteredAt
    }
  },
  canMoveNext: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['move-next', 'add-note'])

const showNotesModal = ref(false)
const noteText = ref('')

const daysInStage = computed(() => {
  const now = new Date()
  const entered = new Date(props.candidate.enteredAt)
  return Math.floor((now - entered) / (1000 * 60 * 60 * 24))
})

const isUrgent = computed(() => daysInStage.value > 7)

const moveToNext = () => {
  emit('move-next', props.candidate.id)
}

const openNotesModal = () => {
  noteText.value = props.candidate.notes || ''
  showNotesModal.value = true
}

const closeNotesModal = () => {
  showNotesModal.value = false
  noteText.value = ''
}

const saveNote = () => {
  emit('add-note', {
    candidateId: props.candidate.id,
    note: noteText.value,
    timestamp: new Date()
  })
  closeNotesModal()
}
</script>

<style scoped>
.candidate-card {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: grab;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.candidate-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

.candidate-card.urgent {
  border-left: 4px solid #ff5630;
  background: #fff4f3;
}

.candidate-card.high-priority {
  border-top: 3px solid #ff5630;
}

.candidate-card.medium-priority {
  border-top: 3px solid #ff8b00;
}

.candidate-card.low-priority {
  border-top: 3px solid #36b37e;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.candidate-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e1e5e9;
}

.candidate-info {
  flex: 1;
}

.candidate-name {
  font-size: 16px;
  font-weight: 600;
  color: #172b4d;
  margin: 0 0 4px 0;
}

.candidate-role {
  font-size: 14px;
  color: #5e6c84;
  margin: 0;
}

.priority-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.priority-high {
  background: #ffebe6;
  color: #bf2600;
}

.priority-medium {
  background: #fff4e6;
  color: #974f00;
}

.priority-low {
  background: #e3fcef;
  color: #006644;
}

.skills-section {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.skill-tag {
  background: #f4f5f7;
  color: #5e6c84;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #dfe1e6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.days-indicator {
  font-size: 12px;
  color: #5e6c84;
  font-weight: 500;
}

.days-indicator.urgent {
  color: #ff5630;
  font-weight: 600;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #0052cc;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0065ff;
}

.btn-primary:disabled {
  background: #dfe1e6;
  color: #a5adba;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f4f5f7;
  color: #5e6c84;
  border: 1px solid #dfe1e6;
}

.btn-secondary:hover {
  background: #ebecf0;
}

.modal-overlay {
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
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e1e5e9;
}

.modal-header h3 {
  margin: 0;
  color: #172b4d;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #5e6c84;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #172b4d;
}

.modal-body {
  padding: 20px;
}

.notes-textarea {
  width: 100%;
  min-height: 120px;
  padding: 12px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

.notes-textarea:focus {
  outline: none;
  border-color: #0052cc;
  box-shadow: 0 0 0 2px rgba(0,82,204,0.2);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #e1e5e9;
}
</style>