<template>
  <div class="analytics-page">
    <!-- Page Header -->
    <div class="page-header glass animate__animated animate__fadeInDown">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">
            <i class="fas fa-chart-line"></i>
            数据分析
          </h1>
          <p class="page-subtitle">深入分析团队能力分布、发展趋势和关键指标</p>
        </div>
        <div class="header-actions">
          <button class="btn primary">
            <i class="fas fa-download"></i>
            导出分析报告
          </button>
        </div>
      </div>
    </div>

    <!-- Coming Soon -->
    <section class="coming-soon glass">
      <div class="coming-soon-content">
        <div class="coming-soon-icon">
          <i class="fas fa-chart-line"></i>
        </div>
        <h2>数据分析功能即将推出</h2>
        <p>我们正在开发强大的数据分析功能，包括能力分布图表、发展趋势分析和预测模型。</p>
        <div class="features-preview">
          <div class="feature-item">
            <i class="fas fa-chart-pie"></i>
            <span>能力分布分析</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-trending-up"></i>
            <span>发展趋势预测</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-bullseye"></i>
            <span>关键指标监控</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Analytics'
}
</script>

<style lang="scss" scoped>
.analytics-page {
  max-width: 1400px;
  margin: 0 auto;
}

.analytics-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  gap: 20px;

  .header-content {
    flex: 1;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #212529;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 16px;
    letter-spacing: -0.02em;

    i {
      font-size: 2rem;
      color: #dd2525;
    }
  }

  .page-subtitle {
    font-size: 1.125rem;
    color: #6c757d;
    line-height: 1.5;
  }
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 15px;

  i {
    font-size: 2.2rem;
    color: #dd2525;
  }
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.5;
}

.coming-soon {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 80px 40px;
  text-align: center;
  margin-top: 40px;
}

.coming-soon-content {
  max-width: 600px;
  margin: 0 auto;
}

.coming-soon-icon {
  font-size: 4rem;
  color: #dd2525;
  margin-bottom: 30px;
}

.coming-soon h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.coming-soon p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 40px;
}

.features-preview {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  min-width: 140px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #dd2525;
    box-shadow: 0 4px 12px rgba(221, 37, 37, 0.1);
    transform: translateY(-2px);
  }

  i {
    font-size: 2rem;
    color: #dd2525;
  }

  span {
    color: #212529;
    font-weight: 600;
    font-size: 0.875rem;
    text-align: center;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  
  &.primary {
    background: #dd2525;
    color: #ffffff;
    
    &:hover {
      background: #c41e1e;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
    }
  }
  
  i {
    font-size: 0.875rem;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-title {
    font-size: 2rem;
  }

  .coming-soon {
    padding: 60px 20px;
  }

  .features-preview {
    flex-direction: column;
    align-items: center;
  }
}
</style>