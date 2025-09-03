import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLeadTimeStore = defineStore('leadTime', () => {
  // Service Level Expectations configuration
  const sleConfig = ref({
    target: 45, // days
    targetPercentage: 85 // 85% of candidates should be hired within 45 days
  })

  // Active candidates with lead time data
  const activeCandidates = ref([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Engineer',
      department: 'engineering',
      entryDate: new Date('2024-01-01'),
      currentStage: 'technical',
      stageHistory: [
        { stage: 'sourcing', enteredAt: new Date('2024-01-01'), exitedAt: new Date('2024-01-03') },
        { stage: 'screening', enteredAt: new Date('2024-01-03'), exitedAt: new Date('2024-01-06') },
        { stage: 'phone-screen', enteredAt: new Date('2024-01-06'), exitedAt: new Date('2024-01-07') },
        { stage: 'interview', enteredAt: new Date('2024-01-07'), exitedAt: new Date('2024-01-12') },
        { stage: 'technical', enteredAt: new Date('2024-01-12'), exitedAt: null }
      ]
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Sales Manager',
      department: 'sales',
      entryDate: new Date('2023-12-15'),
      currentStage: 'final-interview',
      stageHistory: [
        { stage: 'sourcing', enteredAt: new Date('2023-12-15'), exitedAt: new Date('2023-12-17') },
        { stage: 'screening', enteredAt: new Date('2023-12-17'), exitedAt: new Date('2023-12-20') },
        { stage: 'phone-screen', enteredAt: new Date('2023-12-20'), exitedAt: new Date('2023-12-21') },
        { stage: 'interview', enteredAt: new Date('2023-12-21'), exitedAt: new Date('2024-01-05') },
        { stage: 'technical', enteredAt: new Date('2024-01-05'), exitedAt: new Date('2024-01-08') },
        { stage: 'final-interview', enteredAt: new Date('2024-01-08'), exitedAt: null }
      ]
    }
  ])

  // Historical completion data for SLE calculation
  const completedCandidates = ref([
    { id: 101, leadTime: 32, completedAt: new Date('2024-01-15') },
    { id: 102, leadTime: 28, completedAt: new Date('2024-01-18') },
    { id: 103, leadTime: 45, completedAt: new Date('2024-01-20') },
    { id: 104, leadTime: 52, completedAt: new Date('2024-01-22') },
    { id: 105, leadTime: 38, completedAt: new Date('2024-01-25') }
  ])

  // Stage duration averages for prediction
  const stageAverages = ref({
    'sourcing': 2,
    'screening': 3,
    'phone-screen': 1,
    'interview': 5,
    'technical': 3,
    'final-interview': 4,
    'offer': 2
  })

  // Calculate current lead time for active candidates
  const candidatesWithLeadTime = computed(() => {
    return activeCandidates.value.map(candidate => {
      const now = new Date()
      const leadTime = Math.floor((now - candidate.entryDate) / (1000 * 60 * 60 * 24))
      
      // Predict completion time based on current stage and remaining stages
      const stageOrder = ['sourcing', 'screening', 'phone-screen', 'interview', 'technical', 'final-interview', 'offer']
      const currentStageIndex = stageOrder.indexOf(candidate.currentStage)
      const remainingStages = stageOrder.slice(currentStageIndex + 1)
      
      const predictedAdditionalTime = remainingStages.reduce((sum, stage) => {
        return sum + (stageAverages.value[stage] || 0)
      }, 0)
      
      const predictedCompletion = leadTime + predictedAdditionalTime
      
      return {
        ...candidate,
        leadTime,
        predictedCompletion,
        sleStatus: predictedCompletion <= sleConfig.value.target ? 'safe' : 'at-risk'
      }
    })
  })

  // Calculate SLE performance
  const slePerformance = computed(() => {
    const recentCompletions = completedCandidates.value.filter(c => {
      const daysSince = (new Date() - c.completedAt) / (1000 * 60 * 60 * 24)
      return daysSince <= 30 // Last 30 days
    })
    
    const withinSLE = recentCompletions.filter(c => c.leadTime <= sleConfig.value.target).length
    const total = recentCompletions.length
    const percentage = total > 0 ? Math.round((withinSLE / total) * 100) : 0
    
    return {
      current: percentage,
      target: sleConfig.value.targetPercentage,
      withinSLE,
      total,
      breached: total - withinSLE
    }
  })

  // Calculate aging buckets
  const agingBuckets = computed(() => {
    const buckets = [
      { range: '0-15d', min: 0, max: 15, count: 0, status: 'good' },
      { range: '16-30d', min: 16, max: 30, count: 0, status: 'good' },
      { range: '31-45d', min: 31, max: 45, count: 0, status: 'warning' },
      { range: '46-60d', min: 46, max: 60, count: 0, status: 'danger' },
      { range: '60+d', min: 61, max: Infinity, count: 0, status: 'critical' }
    ]
    
    candidatesWithLeadTime.value.forEach(candidate => {
      const bucket = buckets.find(b => 
        candidate.leadTime >= b.min && candidate.leadTime <= b.max
      )
      if (bucket) bucket.count++
    })
    
    const total = candidatesWithLeadTime.value.length
    buckets.forEach(bucket => {
      bucket.percentage = total > 0 ? Math.round((bucket.count / total) * 100) : 0
    })
    
    return buckets
  })

  // Predictive analytics
  const predictions = computed(() => {
    const safe = candidatesWithLeadTime.value.filter(c => c.sleStatus === 'safe').length
    const atRisk = candidatesWithLeadTime.value.filter(c => c.sleStatus === 'at-risk').length
    
    return {
      likelyToMeet: safe,
      atRisk: atRisk,
      willBreach: Math.floor(atRisk * 0.6) // Estimate 60% of at-risk will breach
    }
  })

  // Update SLE configuration
  const updateSLE = (days, percentage) => {
    sleConfig.value.target = days
    sleConfig.value.targetPercentage = percentage
  }

  // Add new candidate
  const addCandidate = (candidateData) => {
    const newCandidate = {
      ...candidateData,
      id: Date.now(),
      entryDate: new Date(),
      currentStage: 'sourcing',
      stageHistory: [{
        stage: 'sourcing',
        enteredAt: new Date(),
        exitedAt: null
      }]
    }
    activeCandidates.value.push(newCandidate)
  }

  // Move candidate to next stage
  const moveCandidate = (candidateId, newStage) => {
    const candidate = activeCandidates.value.find(c => c.id === candidateId)
    if (candidate) {
      // Close current stage
      const currentStageEntry = candidate.stageHistory.find(s => s.exitedAt === null)
      if (currentStageEntry) {
        currentStageEntry.exitedAt = new Date()
      }
      
      // Add new stage
      candidate.stageHistory.push({
        stage: newStage,
        enteredAt: new Date(),
        exitedAt: null
      })
      
      candidate.currentStage = newStage
    }
  }

  return {
    sleConfig,
    activeCandidates,
    completedCandidates,
    candidatesWithLeadTime,
    slePerformance,
    agingBuckets,
    predictions,
    updateSLE,
    addCandidate,
    moveCandidate
  }
})