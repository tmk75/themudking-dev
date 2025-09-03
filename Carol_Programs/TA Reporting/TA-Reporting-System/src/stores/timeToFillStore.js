import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTimeToFillStore = defineStore('timeToFill', () => {
  // Requisition and hire data
  const hireData = ref([
    {
      id: 1,
      requisitionOpenDate: new Date('2024-01-01'),
      hireDate: new Date('2024-02-15'),
      roleType: 'senior',
      department: 'engineering',
      kanbanStages: [
        { stage: 'sourcing', startDate: '2024-01-01', endDate: '2024-01-08', days: 7 },
        { stage: 'screening', startDate: '2024-01-08', endDate: '2024-01-12', days: 4 },
        { stage: 'phone-screen', startDate: '2024-01-12', endDate: '2024-01-15', days: 3 },
        { stage: 'interview', startDate: '2024-01-15', endDate: '2024-01-25', days: 10 },
        { stage: 'technical', startDate: '2024-01-25', endDate: '2024-02-01', days: 7 },
        { stage: 'final-interview', startDate: '2024-02-01', endDate: '2024-02-08', days: 7 },
        { stage: 'offer', startDate: '2024-02-08', endDate: '2024-02-15', days: 7 }
      ]
    },
    {
      id: 2,
      requisitionOpenDate: new Date('2024-01-15'),
      hireDate: new Date('2024-02-20'),
      roleType: 'mid',
      department: 'sales',
      kanbanStages: [
        { stage: 'sourcing', startDate: '2024-01-15', endDate: '2024-01-20', days: 5 },
        { stage: 'screening', startDate: '2024-01-20', endDate: '2024-01-25', days: 5 },
        { stage: 'phone-screen', startDate: '2024-01-25', endDate: '2024-01-27', days: 2 },
        { stage: 'interview', startDate: '2024-01-27', endDate: '2024-02-05', days: 9 },
        { stage: 'final-interview', startDate: '2024-02-05', endDate: '2024-02-12', days: 7 },
        { stage: 'offer', startDate: '2024-02-12', endDate: '2024-02-20', days: 8 }
      ]
    }
  ])

  // Monthly time-to-fill trends
  const monthlyTrends = ref([
    { month: 'Jan 2024', ttf: 45, hires: 12 },
    { month: 'Feb 2024', ttf: 42, hires: 15 },
    { month: 'Mar 2024', ttf: 38, hires: 18 },
    { month: 'Apr 2024', ttf: 41, hires: 14 },
    { month: 'May 2024', ttf: 39, hires: 16 },
    { month: 'Jun 2024', ttf: 36, hires: 20 },
    { month: 'Jul 2024', ttf: 40, hires: 13 },
    { month: 'Aug 2024', ttf: 43, hires: 11 },
    { month: 'Sep 2024', ttf: 41, hires: 17 },
    { month: 'Oct 2024', ttf: 38, hires: 19 },
    { month: 'Nov 2024', ttf: 42, hires: 14 },
    { month: 'Dec 2024', ttf: 40, hires: 16 }
  ])

  // Role type benchmarks (in days)
  const roleBenchmarks = ref({
    executive: 60,
    senior: 45,
    mid: 35,
    junior: 30,
    all: 45
  })

  // SLE targets by role type
  const sleTargets = ref({
    executive: { target: 60, percentage: 80 },
    senior: { target: 45, percentage: 85 },
    mid: { target: 35, percentage: 90 },
    junior: { target: 30, percentage: 90 },
    all: { target: 45, percentage: 85 }
  })

  // Calculate overall time-to-fill metrics
  const timeToFillMetrics = computed(() => {
    const ttfValues = hireData.value.map(hire => {
      const days = Math.floor((hire.hireDate - hire.requisitionOpenDate) / (1000 * 60 * 60 * 24))
      return days
    })

    const average = ttfValues.reduce((sum, ttf) => sum + ttf, 0) / ttfValues.length
    const sortedTTF = [...ttfValues].sort((a, b) => a - b)
    const median = sortedTTF[Math.floor(sortedTTF.length / 2)]
    const totalHires = hireData.value.length

    // Calculate SLE performance
    const sleTarget = sleTargets.value.all.target
    const withinSLE = ttfValues.filter(ttf => ttf <= sleTarget).length
    const slePerformance = Math.round((withinSLE / totalHires) * 100)

    return {
      average: Math.round(average),
      median,
      totalHires,
      slePerformance
    }
  })

  // Calculate Kanban stage breakdown
  const stageBreakdown = computed(() => {
    const stageData = {}
    
    hireData.value.forEach(hire => {
      hire.kanbanStages.forEach(stage => {
        if (!stageData[stage.stage]) {
          stageData[stage.stage] = []
        }
        stageData[stage.stage].push(stage.days)
      })
    })

    const stageNames = {
      sourcing: 'Sourcing',
      screening: 'Screening',
      'phone-screen': 'Phone Screen',
      interview: 'Interview',
      technical: 'Technical',
      'final-interview': 'Final Interview',
      offer: 'Offer'
    }

    return Object.entries(stageData).map(([stageName, days]) => {
      const avgDays = Math.round(days.reduce((sum, d) => sum + d, 0) / days.length)
      const minDays = Math.min(...days)
      const maxDays = Math.max(...days)
      
      // Identify bottlenecks (stages taking >20% of total time or >7 days average)
      const bottleneck = avgDays > 7 || avgDays > (timeToFillMetrics.value.average * 0.2)

      return {
        name: stageNames[stageName] || stageName,
        avgDays,
        minDays,
        maxDays,
        bottleneck
      }
    })
  })

  // Calculate cycle time vs lead time comparison
  const timeComparison = computed(() => {
    const avgTTF = timeToFillMetrics.value.average
    
    // Cycle time: First screening to hire (excluding sourcing)
    const cycleTimeStages = ['screening', 'phone-screen', 'interview', 'technical', 'final-interview', 'offer']
    const cycleTime = stageBreakdown.value
      .filter(stage => cycleTimeStages.some(s => stage.name.toLowerCase().includes(s.toLowerCase())))
      .reduce((sum, stage) => sum + stage.avgDays, 0)
    
    // Sourcing time: Requisition open to first candidate
    const sourcingTime = stageBreakdown.value
      .find(stage => stage.name.toLowerCase().includes('sourcing'))?.avgDays || 0

    return {
      leadTime: avgTTF, // Total time-to-fill
      cycleTime,
      sourcingTime
    }
  })

  // Calculate SLE tracking metrics
  const sleTracking = computed(() => {
    const sleTarget = sleTargets.value.all.target
    const ttfValues = hireData.value.map(hire => 
      Math.floor((hire.hireDate - hire.requisitionOpenDate) / (1000 * 60 * 60 * 24))
    )
    
    const withinSLE = ttfValues.filter(ttf => ttf <= sleTarget).length
    const exceededSLE = ttfValues.length - withinSLE
    const performance = Math.round((withinSLE / ttfValues.length) * 100)

    return {
      performance,
      withinSLE,
      exceededSLE,
      target: sleTarget
    }
  })

  // Calculate SLE distribution buckets
  const sleDistribution = computed(() => {
    const ttfValues = hireData.value.map(hire => 
      Math.floor((hire.hireDate - hire.requisitionOpenDate) / (1000 * 60 * 60 * 24))
    )

    const buckets = [
      { range: '0-30d', min: 0, max: 30, count: 0, status: 'excellent' },
      { range: '31-45d', min: 31, max: 45, count: 0, status: 'good' },
      { range: '46-60d', min: 46, max: 60, count: 0, status: 'warning' },
      { range: '61+d', min: 61, max: Infinity, count: 0, status: 'critical' }
    ]

    ttfValues.forEach(ttf => {
      const bucket = buckets.find(b => ttf >= b.min && ttf <= b.max)
      if (bucket) bucket.count++
    })

    return buckets
  })

  // Filter data by role type and department
  const getFilteredMetrics = (roleType = 'all', department = 'all') => {
    let filteredData = hireData.value

    if (roleType !== 'all') {
      filteredData = filteredData.filter(hire => hire.roleType === roleType)
    }

    if (department !== 'all') {
      filteredData = filteredData.filter(hire => hire.department === department)
    }

    const ttfValues = filteredData.map(hire => 
      Math.floor((hire.hireDate - hire.requisitionOpenDate) / (1000 * 60 * 60 * 24))
    )

    if (ttfValues.length === 0) return null

    const average = Math.round(ttfValues.reduce((sum, ttf) => sum + ttf, 0) / ttfValues.length)
    const sleTarget = sleTargets.value[roleType]?.target || sleTargets.value.all.target
    const withinSLE = ttfValues.filter(ttf => ttf <= sleTarget).length
    const slePerformance = Math.round((withinSLE / ttfValues.length) * 100)

    return {
      average,
      totalHires: filteredData.length,
      slePerformance,
      benchmark: roleBenchmarks.value[roleType] || roleBenchmarks.value.all
    }
  }

  // Add new hire data
  const addHireData = (requisitionDate, hireDate, roleType, department, stages) => {
    const newHire = {
      id: Date.now(),
      requisitionOpenDate: new Date(requisitionDate),
      hireDate: new Date(hireDate),
      roleType,
      department,
      kanbanStages: stages
    }
    
    hireData.value.push(newHire)
  }

  // Update monthly trend data
  const updateMonthlyTrend = (month, ttf, hires) => {
    const existingMonth = monthlyTrends.value.find(m => m.month === month)
    if (existingMonth) {
      existingMonth.ttf = ttf
      existingMonth.hires = hires
    } else {
      monthlyTrends.value.push({ month, ttf, hires })
    }
  }

  // Calculate trend direction
  const getTrendDirection = () => {
    const recent = monthlyTrends.value.slice(-3)
    const earlier = monthlyTrends.value.slice(-6, -3)
    
    if (recent.length < 3 || earlier.length < 3) return 0
    
    const recentAvg = recent.reduce((sum, m) => sum + m.ttf, 0) / recent.length
    const earlierAvg = earlier.reduce((sum, m) => sum + m.ttf, 0) / earlier.length
    
    return Math.round(recentAvg - earlierAvg)
  }

  return {
    hireData,
    monthlyTrends,
    roleBenchmarks,
    sleTargets,
    timeToFillMetrics,
    stageBreakdown,
    timeComparison,
    sleTracking,
    sleDistribution,
    getFilteredMetrics,
    addHireData,
    updateMonthlyTrend,
    getTrendDirection
  }
})