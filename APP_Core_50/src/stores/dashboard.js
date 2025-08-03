import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const metrics = ref({
    critical: 12,
    development: 28,
    ready: 35,
    total: 75
  })

  const trafficLights = ref({
    red: 16,
    yellow: 37,
    green: 47
  })

  const assessmentData = ref([
    { name: '战略思维', score: 85, category: 'leadership' },
    { name: '团队管理', score: 78, category: 'management' },
    { name: '沟通协调', score: 92, category: 'communication' },
    { name: '创新能力', score: 73, category: 'innovation' },
    { name: '执行力', score: 88, category: 'execution' },
    { name: '决策能力', score: 81, category: 'decision' }
  ])

  const teamMembers = ref([
    {
      id: 1,
      name: '张三',
      position: '高级经理',
      department: '销售部',
      score: 85,
      status: 'ready',
      avatar: '/avatars/zhang.jpg',
      lastAssessment: '2024-01-15'
    },
    {
      id: 2,
      name: '李四',
      position: '部门总监',
      department: '市场部',
      score: 72,
      status: 'development',
      avatar: '/avatars/li.jpg',
      lastAssessment: '2024-01-10'
    },
    {
      id: 3,
      name: '王五',
      position: '项目经理',
      department: '技术部',
      score: 58,
      status: 'critical',
      avatar: '/avatars/wang.jpg',
      lastAssessment: '2024-01-08'
    }
  ])

  const developmentPlans = ref([
    {
      id: 1,
      title: '领导力提升计划',
      description: '针对高级管理人员的综合领导力发展项目',
      participants: 15,
      progress: 65,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      status: 'active'
    },
    {
      id: 2,
      title: '沟通技能强化',
      description: '提升跨部门沟通协调能力的专项培训',
      participants: 23,
      progress: 40,
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      status: 'active'
    }
  ])

  // Getters
  const totalScore = computed(() => {
    return assessmentData.value.reduce((sum, item) => sum + item.score, 0)
  })

  const averageScore = computed(() => {
    return Math.round(totalScore.value / assessmentData.value.length)
  })

  const criticalMembers = computed(() => {
    return teamMembers.value.filter(member => member.status === 'critical')
  })

  const readyMembers = computed(() => {
    return teamMembers.value.filter(member => member.status === 'ready')
  })

  const activePlans = computed(() => {
    return developmentPlans.value.filter(plan => plan.status === 'active')
  })

  // Actions
  const updateMetrics = (newMetrics) => {
    metrics.value = { ...metrics.value, ...newMetrics }
  }

  const updateTrafficLights = (newData) => {
    trafficLights.value = { ...trafficLights.value, ...newData }
  }

  const addTeamMember = (member) => {
    teamMembers.value.push({
      id: Date.now(),
      ...member
    })
  }

  const updateTeamMember = (id, updates) => {
    const index = teamMembers.value.findIndex(member => member.id === id)
    if (index > -1) {
      teamMembers.value[index] = { ...teamMembers.value[index], ...updates }
    }
  }

  const removeTeamMember = (id) => {
    const index = teamMembers.value.findIndex(member => member.id === id)
    if (index > -1) {
      teamMembers.value.splice(index, 1)
    }
  }

  const addDevelopmentPlan = (plan) => {
    developmentPlans.value.push({
      id: Date.now(),
      status: 'active',
      ...plan
    })
  }

  const updateDevelopmentPlan = (id, updates) => {
    const index = developmentPlans.value.findIndex(plan => plan.id === id)
    if (index > -1) {
      developmentPlans.value[index] = { ...developmentPlans.value[index], ...updates }
    }
  }

  const loadDashboardData = async () => {
    try {
      // Simulate API calls
      await Promise.all([
        loadMetrics(),
        loadTrafficLights(),
        loadAssessmentData(),
        loadTeamMembers(),
        loadDevelopmentPlans()
      ])
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      throw error
    }
  }

  const loadMetrics = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    // Data is already set in initial state
  }

  const loadTrafficLights = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200))
    // Data is already set in initial state
  }

  const loadAssessmentData = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400))
    // Data is already set in initial state
  }

  const loadTeamMembers = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 350))
    // Data is already set in initial state
  }

  const loadDevelopmentPlans = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 250))
    // Data is already set in initial state
  }

  return {
    // State
    metrics,
    trafficLights,
    assessmentData,
    teamMembers,
    developmentPlans,

    // Getters
    totalScore,
    averageScore,
    criticalMembers,
    readyMembers,
    activePlans,

    // Actions
    updateMetrics,
    updateTrafficLights,
    addTeamMember,
    updateTeamMember,
    removeTeamMember,
    addDevelopmentPlan,
    updateDevelopmentPlan,
    loadDashboardData
  }
})