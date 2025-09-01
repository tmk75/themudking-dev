import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCycleTimeStore = defineStore('cycleTime', () => {
  // Sample completed candidates data
  const completedCandidates = ref([
    {
      id: 1,
      name: 'John Smith',
      role: 'engineering',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-18'),
      stages: [
        { name: 'screening', duration: 3 },
        { name: 'phone-screen', duration: 1 },
        { name: 'interview', duration: 5 },
        { name: 'technical', duration: 3 },
        { name: 'final-interview', duration: 4 },
        { name: 'offer', duration: 2 }
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'sales',
      startDate: new Date('2024-01-05'),
      endDate: new Date('2024-01-20'),
      stages: [
        { name: 'screening', duration: 2 },
        { name: 'phone-screen', duration: 1 },
        { name: 'interview', duration: 4 },
        { name: 'technical', duration: 2 },
        { name: 'final-interview', duration: 3 },
        { name: 'offer', duration: 3 }
      ]
    }
    // Add more sample data as needed
  ])

  // Calculate cycle times
  const cycleTimesData = computed(() => {
    return completedCandidates.value.map(candidate => {
      const totalDays = Math.floor((candidate.endDate - candidate.startDate) / (1000 * 60 * 60 * 24))
      return {
        ...candidate,
        totalCycleTime: totalDays,
        stageDurations: candidate.stages
      }
    })
  })

  // Calculate percentiles
  const calculatePercentile = (data, percentile) => {
    const sorted = [...data].sort((a, b) => a - b)
    const index = Math.ceil((percentile / 100) * sorted.length) - 1
    return sorted[index] || 0
  }

  const cycleTimePercentiles = computed(() => {
    const times = cycleTimesData.value.map(c => c.totalCycleTime)
    return {
      p10: calculatePercentile(times, 10),
      p25: calculatePercentile(times, 25),
      p50: calculatePercentile(times, 50),
      p75: calculatePercentile(times, 75),
      p85: calculatePercentile(times, 85),
      p95: calculatePercentile(times, 95),
      p99: calculatePercentile(times, 99)
    }
  })

  // Calculate average by role
  const cycleTimeByRole = computed(() => {
    const roleGroups = {}
    
    cycleTimesData.value.forEach(candidate => {
      if (!roleGroups[candidate.role]) {
        roleGroups[candidate.role] = []
      }
      roleGroups[candidate.role].push(candidate.totalCycleTime)
    })

    return Object.entries(roleGroups).map(([role, times]) => ({
      role,
      average: Math.round(times.reduce((sum, time) => sum + time, 0) / times.length),
      count: times.length,
      median: calculatePercentile(times, 50)
    }))
  })

  // Calculate stage breakdown
  const stageBreakdown = computed(() => {
    const stageData = {}
    
    cycleTimesData.value.forEach(candidate => {
      candidate.stageDurations.forEach(stage => {
        if (!stageData[stage.name]) {
          stageData[stage.name] = []
        }
        stageData[stage.name].push(stage.duration)
      })
    })

    return Object.entries(stageData).map(([stageName, durations]) => ({
      name: stageName,
      average: Math.round(durations.reduce((sum, d) => sum + d, 0) / durations.length),
      min: Math.min(...durations),
      max: Math.max(...durations),
      median: calculatePercentile(durations, 50)
    }))
  })

  return {
    completedCandidates,
    cycleTimesData,
    cycleTimePercentiles,
    cycleTimeByRole,
    stageBreakdown
  }
})