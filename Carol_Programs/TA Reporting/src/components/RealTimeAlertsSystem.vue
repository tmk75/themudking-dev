<template>
  <div class="real-time-alerts-system">
    <div class="alerts-header">
      <h4>Real-Time Alerts</h4>
      <div class="alerts-controls">
        <button @click="toggleAlerts" :class="{ active: alertsEnabled }" class="toggle-btn">
          {{ alertsEnabled ? 'Alerts ON' : 'Alerts OFF' }}
        </button>
        <button @click="clearAllAlerts" class="clear-btn">Clear All</button>
      </div>
    </div>

    <div class="alerts-container">
      <div v-if="activeAlerts.length === 0" class="no-alerts">
        <span class="no-alerts-icon">✅</span>
        <span>No active alerts</span>
      </div>
      
      <div v-for="alert in activeAlerts" :key="alert.id" 
           class="alert-item" 
           :class="alert.severity">
        <div class="alert-icon">{{ getAlertIcon(alert.type) }}</div>
        
        <div class="alert-content">
          <div class="alert-title">{{ alert.title }}</div>
          <div class="alert-message">{{ alert.message }}</div>
          <div class="alert-timestamp">{{ formatTime(alert.timestamp) }}</div>
        </div>
        
        <div class="alert-actions">
          <button v-for="action in alert.suggestedActions" :key="action.id"
                  @click="executeAction(action, alert)"
                  class="action-btn">
            {{ action.label }}
          </button>
          <button @click="dismissAlert(alert.id)" class="dismiss-btn">×</button>
        </div>
      </div>
    </div>

    <div class="alert-badges">
      <div v-for="badge in alertBadges" :key="badge.stage" 
           class="alert-badge" 
           :class="badge.severity">
        <span class="badge-stage">{{ badge.stage }}</span>
        <span class="badge-count">{{ badge.count }}</span>
      </div>
    </div>

    <div class="notification-settings">
      <h5>Notification Settings</h5>
      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="emailNotifications" @change="updateSettings">
          Email Notifications
        </label>
      </div>
      <div class="setting-item">
        <label>
          <input type="checkbox" v-model="soundAlerts" @change="updateSettings">
          Sound Alerts
        </label>
      </div>
      <div class="setting-item">
        <label>WIP Limit Threshold:</label>
        <input type="number" v-model="wipThreshold" @change="updateSettings" min="80" max="100">%
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const alertsEnabled = ref(true)
const emailNotifications = ref(true)
const soundAlerts = ref(false)
const wipThreshold = ref(90)

const activeAlerts = ref([
  {
    id: 1,
    type: 'wip_breach',
    severity: 'critical',
    title: 'WIP Limit Exceeded',
    message: 'Screening stage has 18/15 candidates (120% capacity)',
    timestamp: new Date(),
    suggestedActions: [
      { id: 'add_screener', label: 'Add Screener' },
      { id: 'move_candidates', label: 'Move Candidates' }
    ]
  },
  {
    id: 2,
    type: 'aging',
    severity: 'warning',
    title: 'Candidates Aging',
    message: '3 candidates in Interview stage for >7 days',
    timestamp: new Date(Date.now() - 300000),
    suggestedActions: [
      { id: 'schedule_interviews', label: 'Schedule Interviews' },
      { id: 'escalate', label: 'Escalate' }
    ]
  },
  {
    id: 3,
    type: 'efficiency',
    severity: 'warning',
    title: 'Flow Efficiency Drop',
    message: 'Overall flow efficiency dropped to 35% (below 40% threshold)',
    timestamp: new Date(Date.now() - 600000),
    suggestedActions: [
      { id: 'analyze_bottlenecks', label: 'Analyze Bottlenecks' },
      { id: 'process_review', label: 'Process Review' }
    ]
  }
])

const alertBadges = computed(() => [
  { stage: 'Screening', count: 2, severity: 'critical' },
  { stage: 'Interview', count: 1, severity: 'warning' },
  { stage: 'Technical', count: 0, severity: 'normal' }
])

let alertInterval = null

onMounted(() => {
  if (alertsEnabled.value) {
    startAlertMonitoring()
  }
})

onUnmounted(() => {
  if (alertInterval) {
    clearInterval(alertInterval)
  }
})

const startAlertMonitoring = () => {
  alertInterval = setInterval(() => {
    checkForNewAlerts()
  }, 30000) // Check every 30 seconds
}

const checkForNewAlerts = () => {
  // Simulate new alert detection
  const alertTypes = ['wip_breach', 'aging', 'efficiency', 'cycle_time']
  const randomType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
  
  if (Math.random() < 0.1) { // 10% chance of new alert
    const newAlert = generateAlert(randomType)
    activeAlerts.value.unshift(newAlert)
    
    if (soundAlerts.value) {
      playAlertSound()
    }
    
    if (emailNotifications.value) {
      sendEmailNotification(newAlert)
    }
  }
}

const generateAlert = (type) => {
  const alertTemplates = {
    wip_breach: {
      title: 'WIP Limit Breach',
      message: 'Stage capacity exceeded',
      severity: 'critical',
      actions: [
        { id: 'add_capacity', label: 'Add Capacity' },
        { id: 'redistribute', label: 'Redistribute' }
      ]
    },
    aging: {
      title: 'Candidate Aging Alert',
      message: 'Candidates exceeding time thresholds',
      severity: 'warning',
      actions: [
        { id: 'expedite', label: 'Expedite' },
        { id: 'escalate', label: 'Escalate' }
      ]
    },
    efficiency: {
      title: 'Efficiency Alert',
      message: 'Flow efficiency below threshold',
      severity: 'warning',
      actions: [
        { id: 'optimize', label: 'Optimize Process' }
      ]
    },
    cycle_time: {
      title: 'Cycle Time Alert',
      message: 'Cycle time trending above SLE',
      severity: 'info',
      actions: [
        { id: 'review_sle', label: 'Review SLE' }
      ]
    }
  }
  
  const template = alertTemplates[type]
  return {
    id: Date.now(),
    type,
    ...template,
    timestamp: new Date(),
    suggestedActions: template.actions
  }
}

const getAlertIcon = (type) => {
  const icons = {
    wip_breach: '🚨',
    aging: '⏰',
    efficiency: '📉',
    cycle_time: '📊'
  }
  return icons[type] || '⚠️'
}

const formatTime = (timestamp) => {
  const now = new Date()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  return `${hours}h ago`
}

const executeAction = (action, alert) => {
  console.log('Executing action:', action.label, 'for alert:', alert.title)
  
  // Simulate action execution
  setTimeout(() => {
    dismissAlert(alert.id)
  }, 1000)
}

const dismissAlert = (alertId) => {
  activeAlerts.value = activeAlerts.value.filter(alert => alert.id !== alertId)
}

const clearAllAlerts = () => {
  activeAlerts.value = []
}

const toggleAlerts = () => {
  alertsEnabled.value = !alertsEnabled.value
  
  if (alertsEnabled.value) {
    startAlertMonitoring()
  } else if (alertInterval) {
    clearInterval(alertInterval)
    alertInterval = null
  }
}

const updateSettings = () => {
  console.log('Settings updated:', {
    email: emailNotifications.value,
    sound: soundAlerts.value,
    wipThreshold: wipThreshold.value
  })
}

const playAlertSound = () => {
  // Simulate sound alert
  console.log('🔊 Alert sound played')
}

const sendEmailNotification = (alert) => {
  // Simulate email notification
  console.log('📧 Email sent for alert:', alert.title)
}
</script>

<style scoped>
.real-time-alerts-system {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.alerts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.alerts-controls {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  padding: 6px 12px;
  border: 1px solid #dfe1e6;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.toggle-btn.active {
  background: #36b37e;
  color: white;
  border-color: #36b37e;
}

.clear-btn {
  padding: 6px 12px;
  background: #ff5630;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.alerts-container {
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.no-alerts {
  text-align: center;
  padding: 20px;
  color: #5e6c84;
}

.no-alerts-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
}

.alert-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 8px;
  border-left: 4px solid;
}

.alert-item.critical {
  background: #fff4f3;
  border-color: #ff5630;
}

.alert-item.warning {
  background: #fff8f0;
  border-color: #ff8b00;
}

.alert-item.info {
  background: #e6f2ff;
  border-color: #0052cc;
}

.alert-icon {
  font-size: 16px;
  margin-top: 2px;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 4px;
}

.alert-message {
  font-size: 14px;
  color: #5e6c84;
  margin-bottom: 4px;
}

.alert-timestamp {
  font-size: 11px;
  color: #8993a4;
}

.alert-actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.action-btn {
  padding: 4px 8px;
  background: #0052cc;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
}

.dismiss-btn {
  padding: 2px 6px;
  background: #5e6c84;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  cursor: pointer;
}

.alert-badges {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.alert-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.alert-badge.critical {
  background: #ffebe6;
  color: #bf2600;
}

.alert-badge.warning {
  background: #fff4e6;
  color: #974f00;
}

.alert-badge.normal {
  background: #e3fcef;
  color: #006644;
}

.badge-stage {
  font-size: 10px;
}

.badge-count {
  background: rgba(0,0,0,0.1);
  padding: 1px 4px;
  border-radius: 6px;
}

.notification-settings h5 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #172b4d;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
}

.setting-item input[type="checkbox"] {
  margin-right: 4px;
}

.setting-item input[type="number"] {
  width: 60px;
  padding: 2px 4px;
  border: 1px solid #dfe1e6;
  border-radius: 3px;
}
</style>