import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFlowEfficiencyStore = defineStore('flowEfficiency', () => {
  // Candidate flow data with work and wait times
  const candidateFlows = ref([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Engineer',
      department: 'engineering',
      stages: [
        { name: 'screening', workTime: 3, waitTime: 2, startDate: '2024-01-01', endDate: '2024-01-06' },
        { name: 'phone-screen', workTime: 1, waitTime: 4, startDate: '2024-01-06', endDate: '2024-01-11' },
        { name: 'interview', workTime: 2, waitTime: 8, startDate: '2024-01-11', endDate: '2024-01-21' },
        { name: 'technical', workTime: 3, waitTime: 2, startDate: '2024-01-21', endDate: '2024-01-26' }
      ]
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Sales Manager',
      department: 'sales',
      stages: [
        { name: 'screening', workTime: 2, waitTime: 1, startDate: '2024-01-03', endDate: '2024-01-06' },
        { name: 'phone-screen', workTime: 1, waitTime: 2, startDate: '2024-01-06', endDate: '2024-01-09' },
        { name: 'interview', workTime: 2, waitTime: 3, startDate: '2024-01-09', endDate: '2024-01-14' },
        { name: 'final-interview', workTime: 2, waitTime: 6, startDate: '2024-01-14', endDate: '2024-01-22' }
      ]
    }
  ])

  // Bi-weekly efficiency tracking
  const biweeklyEfficiency = ref([
    { period: 'W1-2', workTime: 10, waitTime: 25, efficiency: 28.6, date: '2024-01-01' },
    { period: 'W3-4', workTime: 12, waitTime: 26, efficiency: 31.6, date: '2024-01-15' },
    { period: 'W5-6', workTime: 11, waitTime: 27, efficiency: 28.9, date: '2024-01-29' },
    { period: 'W7-8', workTime: 14, waitTime: 26, efficiency: 35.0, date: '2024-02-12' },
    { period: 'W9-10', workTime: 12, waitTime: 27, efficiency: 30.8, date: '2024-02-26' },
    { period: 'W11-12', workTime: 15, waitTime: 24, efficiency: 38.5, date: '2024-03-11' }
  ])

  // Stage-specific efficiency data
  const stageEfficiencyData = ref({
    screening: { workTime: 3, waitTime: 2, improvements: ['Automate initial screening'] },
    'phone-screen': { workTime: 1, waitTime: 4, improvements: ['Self-scheduling system', 'Increase interviewer availability'] },
    interview: { workTime: 2, waitTime: 8, improvements: ['Reduce scheduling conflicts', 'Add more interview slots'] },
    technical: { workTime: 3, waitTime: 2, improvements: [] },
    'final-interview': { workTime: 2, waitTime: 6, improvements: ['Executive calendar optimization'] },
    offer: { workTime: 2, waitTime: 4, improvements: ['Streamline approval process'] }
  })

  // Calculate overall flow efficiency
  const overallFlowEfficiency = computed(() => {
    const totalWorkTime = Object.values(stageEfficiencyData.value).reduce((sum, stage) => sum + stage.workTime, 0)
    const totalWaitTime = Object.values(stageEfficiencyData.value).reduce((sum, stage) => sum + stage.waitTime, 0)
    const totalTime = totalWorkTime + totalWaitTime
    
    return {
      workTime: totalWorkTime,
      waitTime: totalWaitTime,
      totalTime,
      efficiency: totalTime > 0 ? Math.round((totalWorkTime / totalTime) * 100) : 0
    }
  })

  // Calculate stage efficiency breakdown
  const stageEfficiencyBreakdown = computed(() => {
    return Object.entries(stageEfficiencyData.value).map(([stageName, data]) => {
      const totalTime = data.workTime + data.waitTime
      const efficiency = totalTime > 0 ? Math.round((data.workTime / totalTime) * 100) : 0
      
      return {
        name: stageName.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        workTime: data.workTime,
        waitTime: data.waitTime,
        totalTime,
        efficiency,
        improvements: data.improvements
      }
    })
  })

  // Calculate individual candidate efficiency
  const candidateEfficiencyData = computed(() => {
    return candidateFlows.value.map(candidate => {
      const totalWorkTime = candidate.stages.reduce((sum, stage) => sum + stage.workTime, 0)
      const totalWaitTime = candidate.stages.reduce((sum, stage) => sum + stage.waitTime, 0)
      const totalTime = totalWorkTime + totalWaitTime
      const efficiency = totalTime > 0 ? Math.round((totalWorkTime / totalTime) * 100) : 0
      
      return {
        ...candidate,
        totalWorkTime,
        totalWaitTime,
        totalTime,
        efficiency,
        stageFlow: candidate.stages.map(stage => ({
          name: stage.name,
          duration: stage.workTime + stage.waitTime,
          isCurrent: false // This would be determined by current status
        }))
      }
    })
  })

  // Calculate efficiency trends
  const efficiencyTrends = computed(() => {
    return biweeklyEfficiency.value.map((period, index, arr) => {
      const previousPeriod = arr[index - 1]
      const trend = previousPeriod ? period.efficiency - previousPeriod.efficiency : 0
      
      return {
        ...period,
        trend: Math.round(trend * 10) / 10
      }
    })
  })

  // Identify process improvement opportunities
  const processImprovementOpportunities = computed(() => {
    const improvements = []
    
    // Analyze each stage for improvement potential
    stageEfficiencyBreakdown.value.forEach(stage => {
      if (stage.efficiency < 40 && stage.waitTime > stage.workTime) {
        const potentialImprovement = Math.round((stage.waitTime / stage.totalTime) * 50) // 50% of wait time could be improved
        
        improvements.push({
          stage: stage.name,
          currentEfficiency: stage.efficiency,
          potentialImprovement,
          waitTimeReduction: Math.round(stage.waitTime * 0.5),
          recommendations: stage.improvements
        })
      }
    })
    
    return improvements.sort((a, b) => b.potentialImprovement - a.potentialImprovement)
  })

  // Update stage efficiency data
  const updateStageEfficiency = (stageName, workTime, waitTime) => {
    if (stageEfficiencyData.value[stageName]) {
      stageEfficiencyData.value[stageName].workTime = workTime
      stageEfficiencyData.value[stageName].waitTime = waitTime
    }
  }

  // Add new bi-weekly efficiency data
  const addBiweeklyData = (period, workTime, waitTime) => {
    const efficiency = Math.round((workTime / (workTime + waitTime)) * 100)
    
    biweeklyEfficiency.value.push({
      period,
      workTime,
      waitTime,
      efficiency,
      date: new Date().toISOString().split('T')[0]
    })
    
    // Keep only last 12 periods
    if (biweeklyEfficiency.value.length > 12) {
      biweeklyEfficiency.value = biweeklyEfficiency.value.slice(-12)
    }
  }

  // Calculate flow efficiency for a specific time period
  const calculatePeriodEfficiency = (startDate, endDate) => {
    const periodCandidates = candidateFlows.value.filter(candidate => {
      const candidateStart = new Date(candidate.stages[0].startDate)
      return candidateStart >= new Date(startDate) && candidateStart <= new Date(endDate)
    })
    
    const totalWorkTime = periodCandidates.reduce((sum, candidate) => 
      sum + candidate.stages.reduce((stageSum, stage) => stageSum + stage.workTime, 0), 0
    )
    
    const totalWaitTime = periodCandidates.reduce((sum, candidate) => 
      sum + candidate.stages.reduce((stageSum, stage) => stageSum + stage.waitTime, 0), 0
    )
    
    const totalTime = totalWorkTime + totalWaitTime
    const efficiency = totalTime > 0 ? Math.round((totalWorkTime / totalTime) * 100) : 0
    
    return {
      workTime: totalWorkTime,
      waitTime: totalWaitTime,
      totalTime,
      efficiency,
      candidateCount: periodCandidates.length
    }
  }

  return {
    candidateFlows,
    biweeklyEfficiency,
    stageEfficiencyData,
    overallFlowEfficiency,
    stageEfficiencyBreakdown,
    candidateEfficiencyData,
    efficiencyTrends,
    processImprovementOpportunities,
    updateStageEfficiency,
    addBiweeklyData,
    calculatePeriodEfficiency
  }
})