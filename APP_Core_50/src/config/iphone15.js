// iPhone 15 Plus/Pro Max Specific Configuration
export const iPhone15Config = {
  // Screen specifications
  screen: {
    width: 430,
    height: 932,
    pixelRatio: 3,
    ppi: 460,
    diagonal: 6.7
  },
  
  // Safe areas
  safeAreas: {
    top: 44, // Dynamic Island area
    bottom: 34, // Home indicator area
    left: 0,
    right: 0
  },
  
  // Touch targets (iOS Human Interface Guidelines)
  touchTargets: {
    minimum: 44, // 44pt minimum touch target
    recommended: 48, // 48pt recommended
    comfortable: 52 // 52pt comfortable
  },
  
  // Typography scaling for iPhone 15
  typography: {
    baseSize: 14, // Base font size in px
    scaleRatio: 1.125, // Scaling ratio
    lineHeight: 1.4, // Optimized line height
    letterSpacing: -0.01 // Slight negative letter spacing
  },
  
  // Layout spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24
  },
  
  // Animation preferences
  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  },
  
  // Breakpoints specific to iPhone 15 Plus/Pro Max
  breakpoints: {
    portrait: '(max-width: 430px) and (max-height: 932px)',
    landscape: '(max-width: 932px) and (max-height: 430px) and (orientation: landscape)',
    device: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)'
  }
}

// Comprehensive device detection utilities
export const DeviceDetection = {
  // Get comprehensive device information
  getDeviceInfo() {
    const { innerWidth, innerHeight, screen, devicePixelRatio } = window
    const { userAgent } = navigator
    
    return {
      width: innerWidth,
      height: innerHeight,
      screenWidth: screen.width,
      screenHeight: screen.height,
      pixelRatio: devicePixelRatio,
      userAgent,
      isMobile: /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
      isIOS: /iPad|iPhone|iPod/.test(userAgent),
      isAndroid: /Android/.test(userAgent),
      isTablet: /iPad|Android(?=.*Mobile)/.test(userAgent) && !/Mobile/.test(userAgent),
      isDesktop: !/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    }
  },
  
  // Detect specific iPhone models
  getIPhoneModel() {
    const { screen, devicePixelRatio } = window
    const { userAgent } = navigator
    
    if (!this.getDeviceInfo().isIOS) return null
    
    // iPhone 15 Plus/Pro Max detection (430x932)
    if ((screen.width === 430 && screen.height === 932) || 
        (screen.width === 932 && screen.height === 430)) {
      if (devicePixelRatio === 3) {
        if (userAgent.includes('Pro')) {
          return 'iPhone15ProMax'
        }
        return 'iPhone15Plus'
      }
    }
    
    // iPhone 15/Pro detection (393x852)
    if ((screen.width === 393 && screen.height === 852) || 
        (screen.width === 852 && screen.height === 393)) {
      if (devicePixelRatio === 3) {
        if (userAgent.includes('Pro')) {
          return 'iPhone15Pro'
        }
        return 'iPhone15'
      }
    }
    
    // iPhone 14 series
    if ((screen.width === 390 && screen.height === 844) || 
        (screen.width === 844 && screen.height === 390)) {
      return 'iPhone14'
    }
    
    // iPhone 13 series
    if ((screen.width === 390 && screen.height === 844) || 
        (screen.width === 844 && screen.height === 390)) {
      return 'iPhone13'
    }
    
    return 'iPhoneOther'
  },
  
  // Apply device-specific classes
  applyDeviceClasses() {
    const deviceInfo = this.getDeviceInfo()
    const iPhoneModel = this.getIPhoneModel()
    const body = document.body
    const html = document.documentElement
    
    // Remove existing classes
    body.className = body.className.replace(/\b(mobile|desktop|tablet|ios|android|iphone\d+)\b/g, '')
    
    // Apply device type classes
    if (deviceInfo.isMobile) {
      body.classList.add('mobile-layout', 'mobile-device')
    } else if (deviceInfo.isTablet) {
      body.classList.add('tablet-layout', 'tablet-device')
    } else {
      body.classList.add('desktop-layout', 'desktop-device')
    }
    
    // Apply OS classes
    if (deviceInfo.isIOS) {
      body.classList.add('ios-device')
      html.classList.add('ios')
    } else if (deviceInfo.isAndroid) {
      body.classList.add('android-device')
      html.classList.add('android')
    }
    
    // Apply iPhone model classes
    if (iPhoneModel) {
      body.classList.add(`${iPhoneModel.toLowerCase()}-device`)
      html.classList.add(iPhoneModel.toLowerCase())
    }
    
    // Apply screen size classes
    if (deviceInfo.width <= 480) {
      body.classList.add('small-screen')
    } else if (deviceInfo.width <= 768) {
      body.classList.add('medium-screen')
    } else if (deviceInfo.width <= 1024) {
      body.classList.add('large-screen')
    } else {
      body.classList.add('xlarge-screen')
    }
    
    // Apply pixel ratio classes
    if (deviceInfo.pixelRatio >= 3) {
      body.classList.add('high-dpi')
    } else if (deviceInfo.pixelRatio >= 2) {
      body.classList.add('medium-dpi')
    } else {
      body.classList.add('low-dpi')
    }
    
    return deviceInfo
  }
}

// Utility functions for iPhone 15 detection (backward compatibility)
export const iPhone15Utils = {
  // Detect if current device is iPhone 15 Plus/Pro Max
  isIPhone15() {
    const model = DeviceDetection.getIPhoneModel()
    return model === 'iPhone15Plus' || model === 'iPhone15ProMax'
  },
  
  // Get safe area insets
  getSafeAreaInsets() {
    const style = getComputedStyle(document.documentElement)
    
    return {
      top: parseInt(style.getPropertyValue('env(safe-area-inset-top)')) || iPhone15Config.safeAreas.top,
      bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)')) || iPhone15Config.safeAreas.bottom,
      left: parseInt(style.getPropertyValue('env(safe-area-inset-left)')) || iPhone15Config.safeAreas.left,
      right: parseInt(style.getPropertyValue('env(safe-area-inset-right)')) || iPhone15Config.safeAreas.right
    }
  },
  
  // Apply iPhone 15 specific styles
  applyIPhone15Styles() {
    if (this.isIPhone15()) {
      document.documentElement.classList.add('iphone-15')
      
      // Set CSS custom properties
      const root = document.documentElement
      root.style.setProperty('--iphone15-safe-top', `${iPhone15Config.safeAreas.top}px`)
      root.style.setProperty('--iphone15-safe-bottom', `${iPhone15Config.safeAreas.bottom}px`)
      root.style.setProperty('--iphone15-touch-target', `${iPhone15Config.touchTargets.minimum}px`)
      root.style.setProperty('--iphone15-base-font', `${iPhone15Config.typography.baseSize}px`)
    }
  },
  
  // Optimize touch targets for iPhone 15
  optimizeTouchTargets() {
    if (this.isIPhone15()) {
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]')
      
      interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect()
        if (rect.width < iPhone15Config.touchTargets.minimum || rect.height < iPhone15Config.touchTargets.minimum) {
          element.classList.add('touch-target-optimized')
        }
      })
    }
  }
}

// CSS custom properties for iPhone 15 Plus/Pro Max
export const iPhone15CSSProperties = {
  '--iphone15-width': '430px',
  '--iphone15-height': '932px',
  '--iphone15-safe-top': '44px',
  '--iphone15-safe-bottom': '34px',
  '--iphone15-touch-min': '44px',
  '--iphone15-font-base': '15px', // Slightly larger for bigger screen
  '--iphone15-line-height': '1.4',
  '--iphone15-border-radius': '12px',
  '--iphone15-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)'
}