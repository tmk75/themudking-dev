import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThroughputStore = defineStore('throughput', () => {
  // Historical throughput data
  const throughputHistory = ref([
    { date: '2024-01-01', completed: 18, capacity: 25, team: 'all' },
    { date: '2024-01-08', completed: 22, capacity: 25, team: 'all' },
    { date: '2024-01-15', completed: 15, capacity: 25, team: 'all' },
    { date: '2024-01-22', completed: 19, capacity: 25, team: 'all' },
    { date: '2024-01-29', completed: 12, capacity: 25, team: 'all' },
    { date: '2024-02-05', completed: 16, capacity: 25, team: 'all' },
    { date: '2024-02-12', completed: 20, capacity: 25, team: 'all' },
    { date: '2024-02-19', completed: 14, capacity: 25, team: 'all' }
  ])

  // Team capacity data
  const teamCapacity = ref({
    recruiters: { available: 8, total: 10, utilization: 85 },
    interviewers: { available: 12, total: 15, utilization: 72 },
    managers: { available: 6, total: 8, utilization: 90 }
  })

  // WIP limits and current WIP by stage
  const wipData = ref({
    screening: { current: 15, limit: 15, throughput: 8, expected: 10 },
    interview: { current: 8, limit: 10, throughput: 6, expected: 7 },
    technical: { current: 5, limit: 8, throughput: 4, expected: 5 },
    final: { current: 3, limit: 5, throughput: 3, expected: 3 }
  })

  // Calculate current throughput metrics
  const currentThroughputMetrics = computed(() => {
    const recent = throughputHistory.value.slice(-4) // Last 4 periods
    const current = recent[recent.length - 1]?.completed || 0
    const previous = recent[recent.length - 2]?.completed || 0
    
    const average = recent.reduce((sum, item) => sum + item.completed, 0) / recent.length
    const peak = Math.max(...recent.map(item => item.completed))
    const totalCapacity = recent[recent.length - 1]?.capacity || 25
    const efficiency = Math.round((average / totalCapacity) * 100)
    const trend = previous > 0 ? Math.round(((current - previous) / previous) * 100) : 0

    return {
      current,
      average: Math.round(average),
      peak,
      efficiency,
      trend
    }
  })

  // Calculate capacity utilization
  const capacityUtilization = computed(() => {
    const totalAvailable = Object.values(teamCapacity.value).reduce((sum, team) => sum + team.available, 0)
    const totalCapacity = Object.values(teamCapacity.value).reduce((sum, team) => sum + team.total, 0)
    const avgUtilization = Object.values(teamCapacity.value).reduce((sum, team) => sum + team.utilization, 0) / Object.keys(teamCapacity.value).length

    return {
      current: totalAvailable,
      total: totalCapacity,
      utilization: Math.round(avgUtilization),
      optimal: Math.ceil(totalCapacity * 0.85) // 85% utilization is optimal
    }
  })

  // Forecast hiring based on current throughput
  const calculateForecast = (targetHires, timeframeDays) => {
    const avgThroughput = currentThroughputMetrics.value.average
    const weeksInTimeframe = Math.ceil(timeframeDays / 7)
    
    const predicted = Math.round(avgThroughput * weeksInTimeframe)
    const capacityNeeded = Math.ceil(targetHires / weeksInTimeframe)
    const capacityGap = capacityNeeded - avgThroughput
    
    // Calculate probability based on historical variance
    const variance = throughputHistory.value.reduce((sum, item, index, arr) => {
      if (index === 0) return 0
      const diff = Math.abs(item.completed - arr[index - 1].completed)
      return sum + diff
    }, 0) / (throughputHistory.value.length - 1)
    
    const probability = Math.min(100, Math.max(0, 100 - (Math.abs(capacityGap) * 15) - (variance * 2)))

    return {
      predicted,
      capacityNeeded,
      capacityGap,
      probability: Math.round(probability)
    }
  }

  // Analyze WIP correlation with throughput
  const wipCorrelationAnalysis = computed(() => {
    return Object.entries(wipData.value).map(([stage, data]) => {
      const utilizationRatio = data.current / data.limit
      const throughputRatio = data.throughput / data.expected
      
      return {
        stage,
        ...data,
        utilizationRatio,
        throughputRatio,
        isBottleneck: utilizationRatio > 0.9 && throughputRatio < 0.8,
        isOptimal: utilizationRatio >= 0.7 && utilizationRatio <= 0.9 && throughputRatio >= 0.9
      }
    })
  })

  // Add new throughput data point
  const addThroughputData = (date, completed, capacity, team = 'all') => {
    throughputHistory.value.push({
      date,
      completed,
      capacity,
      team
    })
    
    // Keep only last 12 data points
    if (throughputHistory.value.length > 12) {
      throughputHistory.value = throughputHistory.value.slice(-12)
    }
  }

  // Update team capacity
  const updateTeamCapacity = (team, available, total) => {
    if (teamCapacity.value[team]) {
      teamCapacity.value[team].available = available
      teamCapacity.value[team].total = total
      teamCapacity.value[team].utilization = Math.round((available / total) * 100)
    }
  }

  // Update WIP data
  const updateWIPData = (stage, current, throughput) => {
    if (wipData.value[stage]) {
      wipData.value[stage].current = current
      wipData.value[stage].throughput = throughput
    }
  }

  return {
    throughputHistory,
    teamCapacity,
    wipData,
    currentThroughputMetrics,
    capacityUtilization,
    wipCorrelationAnalysis,
    calculateForecast,
    addThroughputData,
    updateTeamCapacity,
    updateWIPData
  }
})