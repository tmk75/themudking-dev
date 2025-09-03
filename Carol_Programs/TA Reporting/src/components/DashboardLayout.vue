<template>
  <div class="dashboard-layout" :class="{ 'mobile': isMobile }">
    <nav class="sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <h2 v-show="!sidebarCollapsed">RPO Dashboard</h2>
        <button @click="toggleSidebar" class="sidebar-toggle">
          {{ sidebarCollapsed ? '→' : '←' }}
        </button>
      </div>
      
      <ul class="nav-menu">
        <li>
          <router-link to="/dashboard" class="nav-item">
            <span class="nav-icon">📊</span>
            <span v-show="!sidebarCollapsed" class="nav-text">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/kanban" class="nav-item">
            <span class="nav-icon">📋</span>
            <span v-show="!sidebarCollapsed" class="nav-text">Kanban</span>
          </router-link>
        </li>
        <li>
          <router-link to="/metrics" class="nav-item">
            <span class="nav-icon">📈</span>
            <span v-show="!sidebarCollapsed" class="nav-text">Metrics</span>
          </router-link>
        </li>
        <li>
          <router-link to="/pipeline-health" class="nav-item">
            <span class="nav-icon">🏥</span>
            <span v-show="!sidebarCollapsed" class="nav-text">Pipeline Health</span>
          </router-link>
        </li>
        <li>
          <router-link to="/risk-indicators" class="nav-item">
            <span class="nav-icon">⚠️</span>
            <span v-show="!sidebarCollapsed" class="nav-text">Risk Indicators</span>
          </router-link>
        </li>
      </ul>

      <div v-show="!sidebarCollapsed" class="nav-section">
        <h3>Role Views</h3>
        <ul class="nav-submenu">
          <li><router-link to="/kanban/recruiter">Recruiter</router-link></li>
          <li><router-link to="/kanban/hiring-manager">Hiring Manager</router-link></li>
          <li><router-link to="/kanban/executive">Executive</router-link></li>
        </ul>
      </div>

      <div v-show="!sidebarCollapsed" class="nav-section">
        <h3>Departments</h3>
        <ul class="nav-submenu">
          <li><router-link to="/kanban/engineering">Engineering</router-link></li>
          <li><router-link to="/kanban/sales">Sales</router-link></li>
          <li><router-link to="/kanban/marketing">Marketing</router-link></li>
        </ul>
      </div>

      <div v-show="!sidebarCollapsed" class="nav-section">
        <h3>Locations</h3>
        <ul class="nav-submenu">
          <li><router-link to="/kanban/us">US</router-link></li>
          <li><router-link to="/kanban/europe">Europe</router-link></li>
          <li><router-link to="/kanban/asia">Asia</router-link></li>
        </ul>
      </div>
    </nav>

    <main class="main-content">
      <header class="top-bar">
        <div class="breadcrumb">
          <span>{{ currentPageTitle }}</span>
        </div>
        <div class="connection-status">
          <span 
            class="status-indicator"
            :class="{ 'connected': isConnected, 'disconnected': !isConnected }"
          >
            {{ isConnected ? '🟢 Live' : '🔴 Offline' }}
          </span>
        </div>
      </header>

      <div class="content-area">
        <Transition name="page" mode="out-in">
          <router-view />
        </Transition>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBreakpoints } from '@vueuse/core'
import { useWebSocket } from '../composables/useWebSocket.js'

const route = useRoute()
const breakpoints = useBreakpoints({
  mobile: 768,
  tablet: 1024,
  desktop: 1280
})

const isMobile = breakpoints.smaller('tablet')
const sidebarCollapsed = ref(false)

// WebSocket connection for real-time updates
const { isConnected } = useWebSocket('ws://localhost:8080/ws')

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const currentPageTitle = computed(() => {
  const titles = {
    '/dashboard': 'Dashboard Overview',
    '/kanban': 'Kanban Board',
    '/metrics': 'Summary Metrics',
    '/pipeline-health': 'Pipeline Health',
    '/risk-indicators': 'Risk Indicators',
    '/kanban/recruiter': 'Recruiter View',
    '/kanban/hiring-manager': 'Hiring Manager View',
    '/kanban/executive': 'Executive View',
    '/kanban/engineering': 'Engineering Department',
    '/kanban/sales': 'Sales Department',
    '/kanban/marketing': 'Marketing Department',
    '/kanban/us': 'US Locations',
    '/kanban/europe': 'Europe Locations',
    '/kanban/asia': 'Asia Locations'
  }
  return titles[route.path] || 'RPO Dashboard'
})
</script>

<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  height: 100vh;
  transition: grid-template-columns 0.3s ease;
}

.dashboard-layout.mobile {
  grid-template-columns: 1fr;
}

.dashboard-layout .sidebar.collapsed {
  width: 60px;
}

.dashboard-layout:has(.sidebar.collapsed) {
  grid-template-columns: 60px 1fr;
}

.sidebar {
  background: #2c3e50;
  color: white;
  padding: 20px 0;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
}

.nav-menu {
  list-style: none;
  padding: 20px 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-item:hover,
.nav-item.router-link-active {
  background: #34495e;
  color: white;
}

.nav-icon {
  margin-right: 12px;
  font-size: 16px;
}

.nav-section {
  padding: 20px;
  border-top: 1px solid #34495e;
}

.nav-section h3 {
  margin: 0 0 10px 0;
  font-size: 12px;
  text-transform: uppercase;
  color: #7f8c8d;
}

.nav-submenu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-submenu li {
  margin-bottom: 5px;
}

.nav-submenu a {
  color: #bdc3c7;
  text-decoration: none;
  font-size: 14px;
  padding: 5px 0;
  display: block;
  transition: color 0.2s ease;
}

.nav-submenu a:hover,
.nav-submenu a.router-link-active {
  color: white;
}

.main-content {
  display: grid;
  grid-template-rows: 60px 1fr;
  overflow: hidden;
}

.top-bar {
  background: white;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.breadcrumb {
  font-weight: 600;
  color: #172b4d;
}

.connection-status {
  display: flex;
  align-items: center;
}

.status-indicator {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.status-indicator.connected {
  background: #e3fcef;
  color: #006644;
}

.status-indicator.disconnected {
  background: #ffebe6;
  color: #bf2600;
}

.content-area {
  overflow: auto;
  padding: 20px;
  background: #f5f7fa;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

@media (max-width: 768px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(-100%);
  }
  
  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }
}
</style>