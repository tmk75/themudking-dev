<template>
  <div class="swimlane" :class="swimlaneClass">
    <div class="swimlane-header">
      <slot name="header" :swimlane="swimlane">
        <h3 class="swimlane-title">{{ swimlane.title }}</h3>
        <span class="swimlane-count">{{ swimlane.count || 0 }}</span>
      </slot>
    </div>
    
    <div class="swimlane-content">
      <div class="swimlane-columns">
        <div 
          v-for="column in columns" 
          :key="column.id"
          class="swimlane-column"
        >
          <div class="column-header">
            <slot name="column-header" :column="column" :swimlane="swimlane">
              <span class="column-title">{{ column.title }}</span>
            </slot>
          </div>
          
          <div class="column-content">
            <slot 
              name="column-content" 
              :column="column" 
              :swimlane="swimlane"
              :items="getColumnItems(column.id)"
            >
              <div 
                v-for="item in getColumnItems(column.id)" 
                :key="item.id"
                class="swimlane-item"
              >
                <slot name="item" :item="item" :column="column" :swimlane="swimlane">
                  {{ item.name }}
                </slot>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  swimlane: {
    type: Object,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'priority', 'department', 'location'].includes(value)
  }
})

const swimlaneClass = computed(() => ({
  [`swimlane--${props.variant}`]: true,
  [`swimlane--${props.swimlane.priority}`]: props.swimlane.priority,
  'swimlane--collapsed': props.swimlane.collapsed
}))

const getColumnItems = (columnId) => {
  return props.items.filter(item => 
    item.columnId === columnId && 
    item.swimlaneId === props.swimlane.id
  )
}
</script>

<style scoped>
.swimlane {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  margin-bottom: 16px;
  background: white;
  overflow: hidden;
}

.swimlane--priority.swimlane--high {
  border-left: 4px solid #ff5630;
}

.swimlane--priority.swimlane--medium {
  border-left: 4px solid #ff8b00;
}

.swimlane--priority.swimlane--low {
  border-left: 4px solid #36b37e;
}

.swimlane--department {
  border-top: 3px solid #0052cc;
}

.swimlane--location {
  border-top: 3px solid #6554c0;
}

.swimlane-header {
  background: #f4f5f7;
  padding: 12px 16px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.swimlane-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
}

.swimlane-count {
  background: #dfe1e6;
  color: #5e6c84;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.swimlane-content {
  padding: 16px;
}

.swimlane-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.swimlane-column {
  min-height: 120px;
}

.column-header {
  padding: 8px 0;
  border-bottom: 1px solid #f4f5f7;
  margin-bottom: 8px;
}

.column-title {
  font-size: 12px;
  font-weight: 600;
  color: #5e6c84;
  text-transform: uppercase;
}

.column-content {
  min-height: 80px;
}

.swimlane-item {
  background: #f9fafc;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 4px;
  font-size: 12px;
  color: #172b4d;
}

.swimlane--collapsed .swimlane-content {
  display: none;
}

@media (max-width: 768px) {
  .swimlane-columns {
    grid-template-columns: 1fr;
  }
}
</style>