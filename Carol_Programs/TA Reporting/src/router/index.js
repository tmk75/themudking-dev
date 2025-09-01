import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

const Dashboard = defineAsyncComponent(() => import('../views/Dashboard.vue'))
const KanbanBoard = defineAsyncComponent(() => import('../views/KanbanBoard.vue'))
const Metrics = defineAsyncComponent(() => import('../views/Metrics.vue'))
const PipelineHealth = defineAsyncComponent(() => import('../views/PipelineHealth.vue'))
const RiskIndicators = defineAsyncComponent(() => import('../views/RiskIndicators.vue'))

// Role-specific Kanban views
const RecruiterKanban = defineAsyncComponent(() => import('../views/kanban/RecruiterKanban.vue'))
const HiringManagerKanban = defineAsyncComponent(() => import('../views/kanban/HiringManagerKanban.vue'))
const ExecutiveKanban = defineAsyncComponent(() => import('../views/kanban/ExecutiveKanban.vue'))

// Department-specific views
const EngineeringKanban = defineAsyncComponent(() => import('../views/kanban/EngineeringKanban.vue'))
const SalesKanban = defineAsyncComponent(() => import('../views/kanban/SalesKanban.vue'))
const MarketingKanban = defineAsyncComponent(() => import('../views/kanban/MarketingKanban.vue'))

// Location-based views
const USKanban = defineAsyncComponent(() => import('../views/kanban/USKanban.vue'))
const EuropeKanban = defineAsyncComponent(() => import('../views/kanban/EuropeKanban.vue'))
const AsiaKanban = defineAsyncComponent(() => import('../views/kanban/AsiaKanban.vue'))

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard },
  { path: '/kanban', component: KanbanBoard },
  { path: '/metrics', component: Metrics },
  { path: '/pipeline-health', component: PipelineHealth },
  { path: '/risk-indicators', component: RiskIndicators },
  
  // Role-based routes
  { path: '/kanban/recruiter', component: RecruiterKanban },
  { path: '/kanban/hiring-manager', component: HiringManagerKanban },
  { path: '/kanban/executive', component: ExecutiveKanban },
  
  // Department routes
  { path: '/kanban/engineering', component: EngineeringKanban },
  { path: '/kanban/sales', component: SalesKanban },
  { path: '/kanban/marketing', component: MarketingKanban },
  
  // Location routes
  { path: '/kanban/us', component: USKanban },
  { path: '/kanban/europe', component: EuropeKanban },
  { path: '/kanban/asia', component: AsiaKanban }
]

export default createRouter({
  history: createWebHistory(),
  routes
})