<template>
  <div class="profile-page">
    <!-- Page Header -->
    <div class="page-header glass animate__animated animate__fadeInDown">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">
            <i class="fas fa-user"></i>
            个人档案
          </h1>
          <p class="page-subtitle">查看和管理个人评估档案和发展记录</p>
        </div>
        <div class="header-actions">
          <button class="btn primary">
            <i class="fas fa-edit"></i>
            编辑档案
          </button>
        </div>
      </div>
    </div>

    <!-- Coming Soon -->
    <section class="coming-soon glass">
      <div class="coming-soon-content">
        <div class="coming-soon-icon">
          <i class="fas fa-user"></i>
        </div>
        <h2>个人档案功能即将推出</h2>
        <p>我们正在开发完整的个人档案管理系统，包括评估历史、发展轨迹和个性化建议。</p>
        <div class="features-preview">
          <div class="feature-item">
            <i class="fas fa-chart-line"></i>
            <span>发展轨迹</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-history"></i>
            <span>评估历史</span>
          </div>
          <div class="feature-item">
            <i class="fas fa-target"></i>
            <span>发展目标</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Profile'
}
</script>

<style lang="scss" scoped>
.profile-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  padding: 30px 40px;
  margin-bottom: 40px;
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
  padding: 80px 40px;
  text-align: center;
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
  gap: 10px;
  padding: 20px;
  background: rgba(221, 37, 37, 0.05);
  border-radius: 15px;
  min-width: 120px;

  i {
    font-size: 2rem;
    color: #dd2525;
  }

  span {
    color: #333;
    font-weight: 500;
    font-size: 0.9rem;
  }
}

.btn {
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &.primary {
    background: linear-gradient(135deg, #dd2525, #b91c1c);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #c41e1e, #991b1b);
      transform: translateY(-2px);
    }
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