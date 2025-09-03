import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const useWipLimitsStore = defineStore('wipLimits', () => {
  // Default WIP limits for each stage
  const defaultLimits = {
    'sourcing': 20,
    'screening': 15,
    'phone-screen': 8,
    'interview': 5,
    'technical': 4,
    'final-interview': 3,
    'offer': 5,
    'hired': 999
  }

  // Persistent WIP limits with localStorage
  const wipLimits = useLocalStorage('wip-limits', defaultLimits)
  
  // Historical optimal levels tracking
  const optimalLevels = useLocalStorage('optimal-wip-levels', {})

  // Current candidate counts per stage
  const candidateCounts = ref({})

  // Update candidate count for a stage
  const updateCandidateCount = (stageId, count) => {
    candidateCounts.value[stageId] = count
  }

  // Computed properties for each stage status
  const getStageStatus = (stageId) => computed(() => {
    const count = candidateCounts.value[stageId] || 0
    const limit = wipLimits.value[stageId] || defaultLimits[stageId]
    const warningThreshold = Math.floor(limit * 0.8)
    
    return {
      count,
      limit,
      isExceeded: count > limit,
      isNearLimit: count >= warningThreshold && count <= limit,
      isBlocked: count > limit,
      percentage: Math.min((count / limit) * 100, 100)
    }
  })

  // Stage-specific computed properties
  const screeningStatus = getStageStatus('screening')
  const phoneScreenStatus = getStageStatus('phone-screen')
  const interviewStatus = getStageStatus('interview')
  const technicalStatus = getStageStatus('technical')
  const finalInterviewStatus = getStageStatus('final-interview')

  // Update WIP limit for a stage
  const updateWipLimit = (stageId, newLimit) => {
    wipLimits.value[stageId] = newLimit
  }

  // Track optimal level when stage performs well
  const trackOptimalLevel = (stageId, currentCount) => {
    if (!optimalLevels.value[stageId]) {
      optimalLevels.value[stageId] = []
    }
    
    optimalLevels.value[stageId].push({
      count: currentCount,
      timestamp: Date.now()
    })
    
    // Keep only last 10 records
    if (optimalLevels.value[stageId].length > 10) {
      optimalLevels.value[stageId] = optimalLevels.value[stageId].slice(-10)
    }
  }

  // Get suggested optimal limit based on historical data
  const getSuggestedLimit = (stageId) => {
    const history = optimalLevels.value[stageId]
    if (!history || history.length === 0) return wipLimits.value[stageId]
    
    const avgOptimal = history.reduce((sum, record) => sum + record.count, 0) / history.length
    return Math.ceil(avgOptimal * 1.2) // 20% buffer
  }

  return {
    wipLimits,
    candidateCounts,
    optimalLevels,
    updateCandidateCount,
    updateWipLimit,
    trackOptimalLevel,
    getSuggestedLimit,
    getStageStatus,
    screeningStatus,
    phoneScreenStatus,
    interviewStatus,
    technicalStatus,
    finalInterviewStatus
  }
})