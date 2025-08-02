<template>
  <div class="project-setup-page">
    <!-- Clean Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>开发环境配置</span>
          </div>
          
          <h1 class="hero-title">
            项目环境搭建
          </h1>
          
          <p class="hero-subtitle">
            按照以下步骤配置开发环境，确保项目能够顺利运行和开发。
            包含代码编辑器、扩展插件、工作区配置等完整设置流程。
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="startSetup">
              开始配置
            </button>
            <button class="btn btn-secondary" @click="downloadGuide">
              <i class="fas fa-download"></i>
              下载指南
            </button>
          </div>

          <div class="hero-stats">
            <div class="stat-item" v-for="(stat, index) in heroStats" :key="index">
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
        
        <div class="hero-visual">
          <div class="visual-card">
            <div class="card-header">
              <div class="card-title">配置进度</div>
              <div class="card-status">实时</div>
            </div>
            <div class="card-content">
              <div class="metric-row">
                <span class="metric-label">VS Code 配置</span>
                <span class="metric-value">完成</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">扩展安装</span>
                <span class="metric-value">进行中</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">工作区设置</span>
                <span class="metric-value">待开始</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>