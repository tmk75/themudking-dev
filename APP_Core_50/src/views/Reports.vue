<template>
  <div class="reports-page">
    <!-- Page Header -->
    <div class="page-header glass animate__animated animate__fadeInDown">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">
            <i class="fas fa-file-alt"></i>
            报告中心
          </h1>
          <p class="page-subtitle">生成和管理各类评估报告，支持个人、团队和组织级报告</p>
        </div>
        <div class="header-actions">
          <button class="btn primary">
            <i class="fas fa-plus"></i>
            生成新报告
          </button>
        </div>
      </div>
    </div>

    <!-- Coming Soon -->
    <section class="coming-soon glass">
      <div class="coming-soon-content">
        <div class="coming-soon-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <h2>报告中心功能即将推出</h2>
        <p>我们正在开发全面的报告生成和管理系统，支持多种报告类型和自定义模板。</p>
        <div class="features-preview">
          <div class="feature-item">
            <i class="fas fa-user"></i>
            <span>个人报告</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-users"></i>
            <span>团队报告</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-building"></i>
            <span>组织报告</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-file-pdf"></i>
            <span>PDF导出</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Reports'
}
</script>

<style lang="scss" scoped>
.reports-page {
  max-width: 1400px;
  margin: 0 auto;
}

.reports-page {
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
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
    grid-template-columns: 1fr;
  }
}
</style>