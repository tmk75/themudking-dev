<template>
  <div class="risk-indicators">
    <div class="risk-summary">
      <div class="risk-score-card">
        <div class="risk-score" :class="overallRiskClass">
          {{ overallRiskScore }}
        </div>
        <div class="risk-label">Overall Risk Level</div>
      </div>
      
      <div class="risk-breakdown">
        <div 
          v-for="category in riskCategories" 
          :key="category.id"
          class="risk-category"
          :class="category.level"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <div class="category-info">
            <div class="category-name">{{ category.name }}</div>
            <div class="category-score">{{ category.score }}/10</div>
          </div>
        </div>
      </div>
    </div>

    <div class="risk-details">
      <div class="active-risks">
        <h3>Active Risk Alerts</h3>
        <div class="risk-alerts">
          <div 
            v-for="alert in activeAlerts" 
            :key="alert.id"
            class="risk-alert"
            :class="alert.severity"
          >
            <div class="alert-header">
              <span class="alert-icon">{{ alert.icon }}</span>
              <span class="alert-title">{{ alert.title }}</span>
              <span class="alert-severity">{{ alert.severity.toUpperCase() }}</span>
            </div>
            <div class="alert-description">{{ alert.description }}</div>
            <div class="alert-impact">Impact: {{ alert.impact }}</div>
            <div class="alert-actions">
              <button 
                v-for="action in alert.actions" 
                :key="action.id"
                class="action-btn"
                @click="executeAction(action)"
              >
                {{ action.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="risk-trends">
        <h3>Risk Trends</h3>
        <div class="trend-chart">
          <div 
            v-for="trend in riskTrends" 
            :key="trend.period"
            class="trend-item"
          >
            <div class="trend-period">{{ trend.period }}</div>
            <div class="trend-bars">
              <div 
                v-for="risk in trend.risks" 
                :key="risk.type"
                class="trend-bar"
                :class="risk.level"
                :style="{ height: `${risk.value * 10}px` }"
                :title="`${risk.type}: ${risk.value}/10`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="predictive-risks">
        <h3>Predictive Risk Analysis</h3>
        <div class="predictions">
          <div 
            v-for="prediction in riskPredictions" 
            :key="prediction.id"
            class="prediction-item"
          >
            <div class="prediction-header">
              <span class="prediction-title">{{ prediction.title }}</span>
              <span class="prediction-probability">{{ prediction.probability }}% likely</span>
            </div>
            <div class="prediction-timeline">Expected in {{ prediction.timeline }}</div>
            <div class="prediction-mitigation">
              <strong>Mitigation:</strong> {{ prediction.mitigation }}
            </div>
          </div>
        </div>
      </div>

      <div class="risk-mitigation">
        <h3>Risk Mitigation Strategies</h3>
        <div class="mitigation-strategies">
          <div 
            v-for="strategy in mitigationStrategies" 
            :key="strategy.id"
            class="strategy-item"
          >
            <div class="strategy-title">{{ strategy.title }}</div>
            <div class="strategy-description">{{ strategy.description }}</div>
            <div class="strategy-effectiveness">
              Effectiveness: 
              <span class="effectiveness-score" :class="getEffectivenessClass(strategy.effectiveness)">
                {{ strategy.effectiveness }}%
              </span>
            </div>
            <div class="strategy-effort">Implementation Effort: {{ strategy.effort }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWebSocket } from '../composables/useWebSocket.js'

const { data: wsData } = useWebSocket('ws://localhost:8080/risk-indicators')

const overallRiskScore = ref('Medium')

const riskCategories = ref([
  { id: 'pipeline', name: 'Pipeline Stagnation', score: 6, level: 'medium', icon: '🚧' },
  { id: 'capacity', name: 'Capacity Overload', score: 8, level: 'high', icon: '⚡' },
  { id: 'quality', name: 'Quality Degradation', score: 3, level: 'low', icon: '✅' },
  { id: 'timeline', name: 'Timeline Delays', score: 7, level: 'high', icon: '⏰' },
  { id: 'attrition', name: 'Candidate Attrition', score: 5, level: 'medium', icon: '👥' }
])

const activeAlerts = ref([
  {
    id: 1,
    title: 'Screening Stage Bottleneck',
    severity: 'critical',
    icon: '🚨',
    description: 'Screening stage has 32 candidates, exceeding WIP limit by 113%',
    impact: 'Delays in entire pipeline, increased time-to-hire',
    actions: [
      { id: 'add-screener', label: 'Add Screener' },
      { id: 'automate', label: 'Enable Auto-Screening' }
    ]
  },
  {
    id: 2,
    title: 'High-Priority Candidate Aging',
    severity: 'warning',
    icon: '⚠️',
    description: '3 high-priority candidates have been in Interview stage for >10 days',
    impact: 'Risk of losing top talent to competitors',
    actions: [
      { id: 'expedite', label: 'Expedite Process' },
      { id: 'escalate', label: 'Escalate to Manager' }
    ]
  },
  {
    id: 3,
    title: 'Interviewer Availability Crisis',
    severity: 'warning',
    icon: '👨‍💼',
    description: 'Technical interviewers at 95% capacity utilization',
    impact: 'Scheduling delays, candidate experience degradation',
    actions: [
      { id: 'expand-pool', label: 'Expand Interviewer Pool' },
      { id: 'reschedule', label: 'Optimize Scheduling' }
    ]
  }
])

const riskTrends = ref([
  {
    period: 'Week 1',
    risks: [
      { type: 'Pipeline', value: 4, level: 'low' },
      { type: 'Capacity', value: 6, level: 'medium' },
      { type: 'Quality', value: 3, level: 'low' },
      { type: 'Timeline', value: 5, level: 'medium' }
    ]
  },
  {
    period: 'Week 2',
    risks: [
      { type: 'Pipeline', value: 5, level: 'medium' },
      { type: 'Capacity', value: 7, level: 'high' },
      { type: 'Quality', value: 3, level: 'low' },
      { type: 'Timeline', value: 6, level: 'medium' }
    ]
  },
  {
    period: 'Week 3',
    risks: [
      { type: 'Pipeline', value: 6, level: 'medium' },
      { type: 'Capacity', value: 8, level: 'high' },
      { type: 'Quality', value: 4, level: 'low' },
      { type: 'Timeline', value: 7, level: 'high' }
    ]
  },
  {
    period: 'Week 4',
    risks: [
      { type: 'Pipeline', value: 6, level: 'medium' },
      { type: 'Capacity', value: 8, level: 'high' },
      { type: 'Quality', value: 3, level: 'low' },
      { type: 'Timeline', value: 7, level: 'high' }
    ]
  }
])

const riskPredictions = ref([
  {
    id: 1,
    title: 'Pipeline Breakdown in Engineering',
    probability: 78,
    timeline: '2-3 weeks',
    mitigation: 'Increase sourcing efforts and add automated screening'
  },
  {
    id: 2,
    title: 'Candidate Experience Degradation',
    probability: 65,
    timeline: '1-2 weeks',
    mitigation: 'Improve communication cadence and reduce wait times'
  },
  {
    id: 3,
    title: 'Q1 Hiring Target Miss',
    probability: 45,
    timeline: '6-8 weeks',
    mitigation: 'Reallocate resources and adjust expectations'
  }
])

const mitigationStrategies = ref([
  {
    id: 1,
    title: 'Automated Pre-Screening',
    description: 'Implement AI-powered resume screening to reduce manual workload',
    effectiveness: 85,
    effort: 'Medium'
  },
  {
    id: 2,
    title: 'Interviewer Pool Expansion',
    description: 'Train additional team members as technical interviewers',
    effectiveness: 75,
    effort: 'High'
  },
  {
    id: 3,
    title: 'Process Optimization',
    description: 'Streamline interview process and reduce redundant steps',
    effectiveness: 65,
    effort: 'Low'
  },
  {
    id: 4,
    title: 'Capacity Planning',
    description: 'Implement predictive capacity planning based on historical data',
    effectiveness: 80,
    effort: 'Medium'
  }
])

const overallRiskClass = computed(() => {
  const risk = overallRiskScore.value.toLowerCase()
  return {
    'low': risk === 'low',
    'medium': risk === 'medium',
    'high': risk === 'high',
    'critical': risk === 'critical'
  }
})

const getEffectivenessClass = (effectiveness) => {
  if (effectiveness >= 80) return 'high'
  if (effectiveness >= 60) return 'medium'
  return 'low'
}

const executeAction = (action) => {
  console.log('Executing action:', action.label)
  // Implement action execution logic
}
</script>

<style scoped>
.risk-indicators {
  padding: 20px;
}

.risk-summary {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 24px;
  margin-bottom: 24px;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.risk-score-card {
  text-align: center;
}

.risk-score {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.risk-score.low {
  background: #e3fcef;
  color: #006644;
  border: 4px solid #36b37e;
}

.risk-score.medium {
  background: #fff4e6;
  color: #974f00;
  border: 4px solid #ff8b00;
}

.risk-score.high {
  background: #ffebe6;
  color: #bf2600;
  border: 4px solid #ff5630;
}

.risk-score.critical {
  background: #ffebe6;
  color: #bf2600;
  border: 4px solid #de350b;
}

.risk-label {
  font-size: 12px;
  color: #5e6c84;
  font-weight: 500;
}

.risk-breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.risk-category {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e1e5e9;
}

.risk-category.low {
  background: #e3fcef;
  border-color: #36b37e;
}

.risk-category.medium {
  background: #fff4e6;
  border-color: #ff8b00;
}

.risk-category.high {
  background: #ffebe6;
  border-color: #ff5630;
}

.category-icon {
  font-size: 20px;
}

.category-name {
  font-size: 12px;
  color: #5e6c84;
  margin-bottom: 2px;
}

.category-score {
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
}

.risk-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.active-risks,
.risk-trends,
.predictive-risks,
.risk-mitigation {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.predictive-risks,
.risk-mitigation {
  grid-column: 1 / -1;
}

.active-risks h3,
.risk-trends h3,
.predictive-risks h3,
.risk-mitigation h3 {
  margin: 0 0 16px 0;
  color: #172b4d;
}

.risk-alerts {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.risk-alert {
  padding: 16px;
  border-radius: 6px;
  border-left: 4px solid;
}

.risk-alert.critical {
  background: #ffebe6;
  border-color: #ff5630;
}

.risk-alert.warning {
  background: #fff4e6;
  border-color: #ff8b00;
}

.alert-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.alert-title {
  flex: 1;
  font-weight: 600;
  color: #172b4d;
}

.alert-severity {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  background: rgba(0,0,0,0.1);
  color: #172b4d;
}

.alert-description {
  font-size: 14px;
  color: #5e6c84;
  margin-bottom: 4px;
}

.alert-impact {
  font-size: 12px;
  color: #ff5630;
  margin-bottom: 8px;
}

.alert-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 4px 8px;
  border: 1px solid #0052cc;
  background: white;
  color: #0052cc;
  border-radius: 3px;
  font-size: 11px;
  cursor: pointer;
}

.action-btn:hover {
  background: #0052cc;
  color: white;
}

.trend-chart {
  display: flex;
  gap: 16px;
  align-items: end;
  height: 120px;
}

.trend-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.trend-period {
  font-size: 10px;
  color: #5e6c84;
}

.trend-bars {
  display: flex;
  gap: 2px;
  align-items: end;
}

.trend-bar {
  width: 8px;
  border-radius: 2px;
  min-height: 4px;
}

.trend-bar.low {
  background: #36b37e;
}

.trend-bar.medium {
  background: #ff8b00;
}

.trend-bar.high {
  background: #ff5630;
}

.predictions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prediction-item {
  padding: 16px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
}

.prediction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.prediction-title {
  font-weight: 600;
  color: #172b4d;
}

.prediction-probability {
  font-size: 12px;
  color: #ff8b00;
  font-weight: 500;
}

.prediction-timeline {
  font-size: 12px;
  color: #5e6c84;
  margin-bottom: 8px;
}

.prediction-mitigation {
  font-size: 14px;
  color: #172b4d;
}

.mitigation-strategies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.strategy-item {
  padding: 16px;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
}

.strategy-title {
  font-weight: 600;
  color: #172b4d;
  margin-bottom: 8px;
}

.strategy-description {
  font-size: 14px;
  color: #5e6c84;
  margin-bottom: 8px;
}

.strategy-effectiveness,
.strategy-effort {
  font-size: 12px;
  color: #172b4d;
  margin-bottom: 4px;
}

.effectiveness-score.high {
  color: #36b37e;
  font-weight: 600;
}

.effectiveness-score.medium {
  color: #ff8b00;
  font-weight: 600;
}

.effectiveness-score.low {
  color: #ff5630;
  font-weight: 600;
}

@media (max-width: 768px) {
  .risk-summary {
    grid-template-columns: 1fr;
  }
  
  .risk-details {
    grid-template-columns: 1fr;
  }
  
  .trend-chart {
    height: 80px;
  }
}
</style>