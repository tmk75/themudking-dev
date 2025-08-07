import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/main.scss'
import { iPhone15Utils, iPhone15CSSProperties, DeviceDetection } from './config/iphone15.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Device detection and responsive styling
const deviceInfo = {
  width: window.innerWidth,
  height: window.innerHeight,
  userAgent: navigator.userAgent,
  isMobile: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
}

// Apply corresponding styles immediately
if (deviceInfo.isMobile) {
  document.body.classList.add('mobile-layout')
} else {
  document.body.classList.add('desktop-layout')
}

// Initialize comprehensive device optimizations
document.addEventListener('DOMContentLoaded', () => {
  // Apply comprehensive device detection and classes
  const detectedDevice = DeviceDetection.applyDeviceClasses()
  
  // Apply iPhone 15 specific styles if detected
  if (iPhone15Utils.isIPhone15()) {
    iPhone15Utils.applyIPhone15Styles()
  }
  
  // Set CSS custom properties
  const root = document.documentElement
  Object.entries(iPhone15CSSProperties).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
  
  // Set device-specific CSS properties
  root.style.setProperty('--device-width', `${detectedDevice.width}px`)
  root.style.setProperty('--device-height', `${detectedDevice.height}px`)
  root.style.setProperty('--device-pixel-ratio', detectedDevice.pixelRatio.toString())
  
  // Optimize touch targets after initial render
  setTimeout(() => {
    iPhone15Utils.optimizeTouchTargets()
  }, 100)
  
  // Log device information for debugging
  console.log('Device Detection:', {
    ...detectedDevice,
    iPhoneModel: DeviceDetection.getIPhoneModel(),
    classes: document.body.className
  })
})

// Handle window resize for responsive updates
window.addEventListener('resize', () => {
  const newDeviceInfo = DeviceDetection.getDeviceInfo()
  const root = document.documentElement
  
  // Update CSS properties on resize
  root.style.setProperty('--device-width', `${newDeviceInfo.width}px`)
  root.style.setProperty('--device-height', `${newDeviceInfo.height}px`)
  
  // Re-optimize touch targets if needed
  setTimeout(() => {
    iPhone15Utils.optimizeTouchTargets()
  }, 100)
})

app.mount('#app')