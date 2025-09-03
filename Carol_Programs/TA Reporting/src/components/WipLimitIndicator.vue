<template>
  <div class="wip-indicator">
    <div 
      class="wip-count"
      :class="{
        'wip-exceeded': status.isExceeded,
        'wip-warning': status.isNearLimit,
        'wip-normal': !status.isNearLimit && !status.isExceeded
      }"
    >
      {{ status.count }}/{{ status.limit }}
    </div>
    
    <div class="wip-progress">
      <div 
        class="wip-progress-bar"
        :class="{
          'progress-exceeded': status.isExceeded,
          'progress-warning': status.isNearLimit
        }"
        :style="{ width: `${Math.min(status.percentage, 100)}%` }"
      ></div>
    </div>

    <Transition name="warning-pulse">
      <div 
        v-show="status.isNearLimit || status.isExceeded"
        class="wip-warning-badge"
        :class="{ 'exceeded': status.isExceeded }"
      >
        {{ status.isExceeded ? 'BLOCKED' : 'NEAR LIMIT' }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  status: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.wip-indicator {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 80px;
}

.wip-count {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
}

.wip-normal {
  background: #e3fcef;
  color: #006644;
}

.wip-warning {
  background: #fff4e6;
  color: #974f00;
  animation: pulse-warning 2s infinite;
}

.wip-exceeded {
  background: #ffebe6;
  color: #bf2600;
  animation: pulse-exceeded 1s infinite;
}

.wip-progress {
  height: 4px;
  background: #f4f5f7;
  border-radius: 2px;
  overflow: hidden;
}

.wip-progress-bar {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.progress-exceeded {
  background: #ff5630;
}

.progress-warning {
  background: #ff8b00;
}

.wip-progress-bar:not(.progress-warning):not(.progress-exceeded) {
  background: #36b37e;
}

.wip-warning-badge {
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 4px;
  border-radius: 4px;
  text-align: center;
  background: #ff8b00;
  color: white;
}

.wip-warning-badge.exceeded {
  background: #ff5630;
}

@keyframes pulse-warning {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes pulse-exceeded {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 86, 48, 0.4); }
  50% { transform: scale(1.1); box-shadow: 0 0 0 4px rgba(255, 86, 48, 0.2); }
}

.warning-pulse-enter-active,
.warning-pulse-leave-active {
  transition: all 0.3s ease;
}

.warning-pulse-enter-from,
.warning-pulse-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.8);
}
</style>