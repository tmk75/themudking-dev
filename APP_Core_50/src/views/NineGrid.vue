<template>
  <div class="nine-grid-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">
            <span>九宫格人才矩阵</span>
          </div>
          
          <h1 class="hero-title">
            九宫格人才发展矩阵
          </h1>
          
          <p class="hero-subtitle">
            基于GE、诺华和麦肯锡最佳实践，构建全面的人才评估与发展体系
            - 绩效与潜力双维度精准定位人才发展路径
          </p>
          
          <div class="hero-actions">
            <button class="btn btn-primary" @click="startEvaluation">
              开始人才评估
            </button>
            <button class="btn btn-secondary" @click="viewMatrix">
              <i class="fas fa-th"></i>
              查看矩阵
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
          <div class="matrix-preview">
            <div class="matrix-header">
              <h3>九宫格人才矩阵</h3>
              <span class="matrix-status">实时数据</span>
            </div>
            <div class="matrix-grid">
              <div 
                v-for="(cell, index) in matrixPreview" 
                :key="index"
                class="matrix-cell"
                :class="cell.type"
              >
                <div class="cell-label">{{ cell.label }}</div>
                <div class="cell-count">{{ cell.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Matrix Overview Section -->
    <section class="matrix-overview-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">九宫格矩阵详解</h2>
          <p class="section-description">
            基于绩效表现和发展潜力两个维度，精准识别和分类人才类型
          </p>
        </div>
        
        <div class="matrix-container">
          <div class="matrix-axes">
            <div class="y-axis">
              <span class="axis-label">发展潜力</span>
              <div class="axis-scale">
                <span>高</span>
                <span>中</span>
                <span>低</span>
              </div>
            </div>
            
            <div class="matrix-main">
              <div class="matrix-grid-detailed">
                <div 
                  v-for="(cell, index) in nineGridMatrix" 
                  :key="index"
                  class="matrix-cell-detailed"
                  :class="cell.category"
                  @click="showCellDetail(cell)"
                >
                  <div class="cell-header">
                    <h4 class="cell-title">{{ cell.title }}</h4>
                    <span class="cell-percentage">{{ cell.percentage }}%</span>
                  </div>
                  <div class="cell-description">{{ cell.description }}</div>
                  <div class="cell-actions">
                    <span class="action-tag">{{ cell.action }}</span>
                  </div>
                </div>
              </div>
              
              <div class="x-axis">
                <span class="axis-label">绩效表现</span>
                <div class="axis-scale">
                  <span>低</span>
                  <span>中</span>
                  <span>高</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices Section -->
    <section class="best-practices-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">全球最佳实践</h2>
          <p class="section-description">
            汲取GE、诺华、麦肯锡三大标杆企业的人才管理精华
          </p>
        </div>
        
        <div class="practices-grid">
          <div 
            v-for="(practice, index) in bestPractices" 
            :key="index"
            class="practice-card"
          >
            <div class="practice-header">
              <div class="company-logo" :style="{ backgroundColor: practice.logoColor }">
                <span class="logo-text">{{ practice.logo }}</span>
              </div>
              <div class="company-info">
                <h3 class="company-name">{{ practice.company }}</h3>
                <p class="company-industry">{{ practice.industry }}</p>
              </div>
            </div>
            
            <div class="practice-content">
              <h4 class="practice-title">{{ practice.title }}</h4>
              <p class="practice-description">{{ practice.description }}</p>
              
              <div class="key-insights">
                <h5>核心洞察</h5>
                <ul>
                  <li v-for="insight in practice.insights" :key="insight">
                    <i class="fas fa-lightbulb"></i>
                    {{ insight }}
                  </li>
                </ul>
              </div>
              
              <div class="practice-metrics">
                <div class="metric" v-for="metric in practice.metrics" :key="metric.label">
                  <span class="metric-value">{{ metric.value }}</span>
                  <span class="metric-label">{{ metric.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Implementation Framework Section -->
    <section class="implementation-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">实施框架</h2>
          <p class="section-description">
            系统化的九宫格人才矩阵实施路径与方法论
          </p>
        </div>
        
        <div class="implementation-timeline">
          <div 
            v-for="(phase, index) in implementationPhases" 
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-marker">
              <span class="phase-number">{{ index + 1 }}</span>
            </div>
            
            <div class="timeline-content">
              <div class="phase-header">
                <h3 class="phase-title">{{ phase.title }}</h3>
                <span class="phase-duration">{{ phase.duration }}</span>
              </div>
              
              <p class="phase-description">{{ phase.description }}</p>
              
              <div class="phase-deliverables">
                <h4>关键交付物</h4>
                <div class="deliverables-grid">
                  <div 
                    v-for="deliverable in phase.deliverables" 
                    :key="deliverable"
                    class="deliverable-item"
                  >
                    <i class="fas fa-check-circle"></i>
                    {{ deliverable }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Action Section -->
    <section class="action-section">
      <div class="container">
        <div class="action-content">
          <div class="action-header">
            <div class="action-badge">
              <i class="fas fa-users"></i>
              <span>人才发展</span>
            </div>
            
            <h2 class="action-title">
              构建您的九宫格人才矩阵
            </h2>
            
            <p class="action-description">
              运用全球领先企业的成功经验，建立科学的人才评估与发展体系，
              精准识别高潜人才，制定个性化发展路径。
            </p>
          </div>
          
          <div class="action-cards">
            <div class="action-card primary">
              <div class="card-icon">
                <i class="fas fa-chart-bar"></i>
              </div>
              <h3 class="card-title">人才评估</h3>
              <p class="card-description">
                全面评估员工绩效表现与发展潜力
              </p>
              <button class="action-btn" @click="startEvaluation">
                开始评估
              </button>
            </div>
            
            <div class="action-card secondary">
              <div class="card-icon">
                <i class="fas fa-route"></i>
              </div>
              <h3 class="card-title">发展规划</h3>
              <p class="card-description">
                制定个性化的人才发展路径
              </p>
              <button class="action-btn" @click="createPlan">
                制定计划
              </button>
            </div>
            
            <div class="action-card tertiary">
              <div class="card-icon">
                <i class="fas fa-analytics"></i>
              </div>
              <h3 class="card-title">数据分析</h3>
              <p class="card-description">
                深度分析人才分布与发展趋势
              </p>
              <button class="action-btn" @click="viewAnalytics">
                查看分析
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default {
  name: 'NineGrid',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()

    const heroStats = [
      { value: '9', label: '人才类型' },
      { value: '2', label: '评估维度' },
      { value: '98%', label: '准确率' },
      { value: '500+', label: '企业应用' }
    ]

    const matrixPreview = [
      { label: '明星', count: '12', type: 'star' },
      { label: '高潜', count: '18', type: 'high-potential' },
      { label: '专家', count: '15', type: 'expert' },
      { label: '核心', count: '25', type: 'core' },
      { label: '骨干', count: '32', type: 'backbone' },
      { label: '新秀', count: '28', type: 'rising' },
      { label: '问题', count: '8', type: 'problem' },
      { label: '观察', count: '14', type: 'watch' },
      { label: '淘汰', count: '5', type: 'eliminate' }
    ]

    const nineGridMatrix = [
      {
        title: '明星员工',
        description: '高绩效、高潜力的顶尖人才',
        percentage: 8,
        category: 'star',
        action: '重点培养'
      },
      {
        title: '高潜人才',
        description: '绩效良好、潜力巨大',
        percentage: 12,
        category: 'high-potential',
        action: '加速发展'
      },
      {
        title: '专业专家',
        description: '高绩效、专业能力强',
        percentage: 10,
        category: 'expert',
        action: '专业深化'
      },
      {
        title: '核心骨干',
        description: '绩效稳定、潜力中等',
        percentage: 18,
        category: 'core',
        action: '持续激励'
      },
      {
        title: '稳定骨干',
        description: '绩效中等、潜力中等',
        percentage: 25,
        category: 'backbone',
        action: '技能提升'
      },
      {
        title: '潜力新秀',
        description: '绩效待提升、潜力较高',
        percentage: 15,
        category: 'rising',
        action: '重点培训'
      },
      {
        title: '问题员工',
        description: '低绩效、低潜力',
        percentage: 5,
        category: 'problem',
        action: '绩效改进'
      },
      {
        title: '观察对象',
        description: '绩效中等、潜力较低',
        percentage: 10,
        category: 'watch',
        action: '密切关注'
      },
      {
        title: '待优化',
        description: '高潜力但绩效不佳',
        percentage: 7,
        category: 'eliminate',
        action: '转岗考虑'
      }
    ]

    const bestPractices = [
      {
        company: 'GE通用电气',
        industry: '工业制造',
        logo: 'GE',
        logoColor: '#005eb8',
        title: '活力曲线与人才分级',
        description: 'GE创新性地将员工分为A、B、C三个等级，通过强制分布和持续校准，确保人才评估的客观性和准确性。',
        insights: [
          '强制分布法则：20%优秀、70%良好、10%待改进',
          '年度校准会议确保评估标准一致性',
          '将人才发展与业务战略紧密结合',
          '建立内部人才市场促进流动'
        ],
        metrics: [
          { value: '20%', label: 'A级人才比例' },
          { value: '95%', label: '内部晋升率' },
          { value: '85%', label: '人才保留率' }
        ]
      },
      {
        company: '诺华制药',
        industry: '生物医药',
        logo: 'N',
        logoColor: '#0460a9',
        title: '科学化人才评估体系',
        description: '诺华建立了基于胜任力模型的科学评估体系，结合行为面试、360度反馈和心理测评，全方位评估人才潜力。',
        insights: [
          '基于胜任力的行为化评估标准',
          '多维度评估工具组合运用',
          '个性化发展计划制定',
          '全球统一的人才标准'
        ],
        metrics: [
          { value: '12', label: '核心胜任力' },
          { value: '360°', label: '全方位反馈' },
          { value: '92%', label: '评估准确率' }
        ]
      },
      {
        company: '麦肯锡咨询',
        industry: '管理咨询',
        logo: 'M',
        logoColor: '#1f4788',
        title: 'Up or Out人才发展模式',
        description: '麦肯锡的"向上或离开"模式通过严格的绩效评估和快速晋升通道，确保组织始终保持高素质人才队伍。',
        insights: [
          '严格的绩效评估与快速淘汰机制',
          '基于项目的实战能力评估',
          '导师制度与知识传承',
          '全球化人才流动与发展'
        ],
        metrics: [
          { value: '2-3年', label: '平均晋升周期' },
          { value: '15%', label: '年度淘汰率' },
          { value: '90%', label: '客户满意度' }
        ]
      }
    ]

    const implementationPhases = [
      {
        title: '评估体系设计',
        duration: '4-6周',
        description: '建立科学的人才评估标准和流程，确定绩效与潜力的评估维度和权重。',
        deliverables: [
          '胜任力模型设计',
          '评估标准制定',
          '评估工具开发',
          '评估流程设计'
        ]
      },
      {
        title: '试点实施',
        duration: '6-8周',
        description: '选择关键部门进行试点，验证评估体系的有效性，收集反馈并优化。',
        deliverables: [
          '试点部门选择',
          '评估执行',
          '数据收集分析',
          '体系优化调整'
        ]
      },
      {
        title: '全面推广',
        duration: '8-12周',
        description: '在全组织范围内推广九宫格人才矩阵，建立标准化的评估和发展流程。',
        deliverables: [
          '培训体系建立',
          '系统平台搭建',
          '全员评估执行',
          '矩阵结果分析'
        ]
      },
      {
        title: '持续优化',
        duration: '持续进行',
        description: '建立定期校准机制，持续优化评估标准，确保人才矩阵的准确性和有效性。',
        deliverables: [
          '定期校准会议',
          '数据分析报告',
          '发展计划跟踪',
          '体系持续改进'
        ]
      }
    ]

    const startEvaluation = () => {
      router.push('/assessment')
    }

    const viewMatrix = () => {
      appStore.showModal({
        title: '九宫格人才矩阵',
        content: '基于绩效表现和发展潜力两个维度，将人才分为9个类别，为每个类别制定相应的发展策略。',
        type: 'info'
      })
    }

    const showCellDetail = (cell) => {
      appStore.showModal({
        title: `${cell.title} - ${cell.action}`,
        content: `${cell.description}\n\n占比：${cell.percentage}%\n发展策略：${cell.action}`,
        type: 'info'
      })
    }

    const createPlan = () => {
      appStore.showModal({
        title: '发展计划制定',
        content: '基于九宫格评估结果，我们将为每位员工制定个性化的发展计划和学习路径。',
        type: 'success'
      })
    }

    const viewAnalytics = () => {
      router.push('/analytics')
    }

    return {
      heroStats,
      matrixPreview,
      nineGridMatrix,
      bestPractices,
      implementationPhases,
      startEvaluation,
      viewMatrix,
      showCellDetail,
      createPlan,
      viewAnalytics
    }
  }
}
</script>

<style lang="scss" scoped>
.nine-grid-page {
  background: #ffffff;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

// Hero Section
.hero-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  
  .hero-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }
  
  .hero-content {
    .hero-badge {
      display: inline-block;
      padding: 8px 16px;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 500;
      color: #6c757d;
      margin-bottom: 32px;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.1;
      color: #212529;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      line-height: 1.6;
      color: #6c757d;
      margin-bottom: 40px;
      max-width: 500px;
    }
    
    .hero-actions {
      display: flex;
      gap: 16px;
      margin-bottom: 60px;
    }
    
    .hero-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      
      .stat-item {
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #212529;
          margin-bottom: 4px;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #6c757d;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      }
    }
  }
  
  .hero-visual {
    .matrix-preview {
      background: #ffffff;
      border: 1px solid #e9ecef;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      
      .matrix-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        
        h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #212529;
          margin: 0;
        }
        
        .matrix-status {
          padding: 4px 12px;
          background: #d1ecf1;
          color: #0c5460;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 500;
        }
      }
      
      .matrix-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        
        .matrix-cell {
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          transition: all 0.3s ease;
          
          &.star { background: #d4edda; color: #155724; }
          &.high-potential { background: #cce5ff; color: #004085; }
          &.expert { background: #fff3cd; color: #856404; }
          &.core { background: #e2e3e5; color: #383d41; }
          &.backbone { background: #f8f9fa; color: #495057; }
          &.rising { background: #d1ecf1; color: #0c5460; }
          &.problem { background: #f8d7da; color: #721c24; }
          &.watch { background: #ffeaa7; color: #6c5ce7; }
          &.eliminate { background: #fdcb6e; color: #e17055; }
          
          .cell-label {
            font-size: 0.75rem;
            font-weight: 500;
            margin-bottom: 4px;
          }
          
          .cell-count {
            font-size: 1.25rem;
            font-weight: 700;
          }
        }
      }
    }
  }
}

// Matrix Overview Section
.matrix-overview-section {
  padding: 120px 0;
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #212529;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    
    .section-description {
      font-size: 1.125rem;
      color: #6c757d;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .matrix-container {
    max-width: 900px;
    margin: 0 auto;
  }
  
  .matrix-axes {
    display: flex;
    gap: 40px;
    
    .y-axis {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
      .axis-label {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        font-weight: 600;
        color: #495057;
        margin-bottom: 20px;
      }
      
      .axis-scale {
        display: flex;
        flex-direction: column;
        gap: 60px;
        font-size: 0.875rem;
        color: #6c757d;
      }
    }
    
    .matrix-main {
      flex: 1;
      
      .matrix-grid-detailed {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-bottom: 20px;
        
        .matrix-cell-detailed {
          background: #ffffff;
          border: 2px solid #e9ecef;
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-height: 160px;
          
          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }
          
          &.star { border-color: #dd2525; }
          &.high-potential { border-color: #dd2525; }
          &.expert { border-color: #dd2525; }
          &.core { border-color: #dd2525; }
          &.backbone { border-color: #dd2525; }
          &.rising { border-color: #dd2525; }
          &.problem { border-color: #dd2525; }
          &.watch { border-color: #dd2525; }
          &.eliminate { border-color: #dd2525; }
          
          .cell-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
            
            .cell-title {
              font-size: 1rem;
              font-weight: 600;
              color: #212529;
              margin: 0;
            }
            
            .cell-percentage {
              font-size: 0.875rem;
              font-weight: 600;
              color: #dd2525;
            }
          }
          
          .cell-description {
            font-size: 0.875rem;
            color: #6c757d;
            line-height: 1.5;
            margin-bottom: 16px;
          }
          
          .cell-actions {
            .action-tag {
              display: inline-block;
              padding: 4px 12px;
              background: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 16px;
              font-size: 0.75rem;
              font-weight: 500;
              color: #495057;
            }
          }
        }
      }
      
      .x-axis {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .axis-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 12px;
        }
        
        .axis-scale {
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-size: 0.875rem;
          color: #6c757d;
        }
      }
    }
  }
}

// Best Practices Section
.best-practices-section {
  padding: 120px 0;
  background: #fafafa;
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #212529;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    
    .section-description {
      font-size: 1.125rem;
      color: #6c757d;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
    gap: 40px;
  }
  
  .practice-card {
    background: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 16px;
    padding: 40px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      border-color: #dd2525;
    }
    
    .practice-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 32px;
      
      .company-logo {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        
        .logo-text {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }
      }
      
      .company-info {
        .company-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #212529;
          margin: 0 0 4px 0;
        }
        
        .company-industry {
          font-size: 0.875rem;
          color: #6c757d;
          margin: 0;
        }
      }
    }
    
    .practice-content {
      .practice-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #212529;
        margin-bottom: 16px;
      }
      
      .practice-description {
        color: #6c757d;
        line-height: 1.6;
        margin-bottom: 24px;
      }
      
      .key-insights {
        margin-bottom: 32px;
        
        h5 {
          font-size: 1rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 16px;
        }
        
        ul {
          list-style: none;
          padding: 0;
          
          li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 12px;
            font-size: 0.875rem;
            color: #495057;
            line-height: 1.5;
            
            i {
              color: #ffc107;
              margin-top: 2px;
              flex-shrink: 0;
            }
          }
        }
      }
      
      .practice-metrics {
        display: flex;
        gap: 24px;
        
        .metric {
          text-align: center;
          
          .metric-value {
            display: block;
            font-size: 1.5rem;
            font-weight: 700;
            color: #dd2525;
            margin-bottom: 4px;
          }
          
          .metric-label {
            font-size: 0.75rem;
            color: #6c757d;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
        }
      }
    }
  }
}

// Implementation Section
.implementation-section {
  padding: 120px 0;
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #212529;
      margin-bottom: 16px;
      letter-spacing: -0.02em;
    }
    
    .section-description {
      font-size: 1.125rem;
      color: #6c757d;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .implementation-timeline {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 30px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #e9ecef;
    }
    
    .timeline-item {
      display: flex;
      gap: 40px;
      margin-bottom: 60px;
      position: relative;
      
      .timeline-marker {
        position: relative;
        z-index: 2;
        
        .phase-number {
          width: 60px;
          height: 60px;
          background: #dd2525;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
        }
      }
      
      .timeline-content {
        flex: 1;
        background: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 12px;
        padding: 32px;
        
        .phase-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          
          .phase-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #212529;
            margin: 0;
          }
          
          .phase-duration {
            font-size: 0.875rem;
            color: #dd2525;
            font-weight: 600;
            padding: 4px 12px;
            background: #f8f9ff;
            border-radius: 16px;
          }
        }
        
        .phase-description {
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        
        .phase-deliverables {
          h4 {
            font-size: 1rem;
            font-weight: 600;
            color: #212529;
            margin-bottom: 16px;
          }
          
          .deliverables-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            
            .deliverable-item {
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 0.875rem;
              color: #495057;
              
              i {
                color: #dd2525;
                font-size: 0.75rem;
              }
            }
          }
        }
      }
    }
  }
}

// Action Section
.action-section {
  padding: 120px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  
  .action-content {
    max-width: 1000px;
    margin: 0 auto;
    
    .action-header {
      text-align: center;
      margin-bottom: 80px;
      
      .action-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 20px;
        background: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 24px;
        font-size: 14px;
        font-weight: 600;
        color: #495057;
        margin-bottom: 32px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        
        i {
          color: #dd2525;
          font-size: 12px;
        }
      }
      
      .action-title {
        font-size: 2.75rem;
        font-weight: 700;
        color: #212529;
        margin-bottom: 24px;
        letter-spacing: -0.02em;
        line-height: 1.2;
      }
      
      .action-description {
        font-size: 1.125rem;
        color: #6c757d;
        line-height: 1.6;
        max-width: 700px;
        margin: 0 auto;
      }
    }
    
    .action-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      
      .action-card {
        background: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 16px;
        padding: 40px;
        text-align: center;
        transition: all 0.3s ease;
        
        &:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        
        &.primary {
          border-color: #dd2525;
          background: linear-gradient(135deg, #ffffff 0%, #fff8f8 100%);
          
          .card-icon {
            background: #dd2525;
            color: #ffffff;
          }
        }
        
        &.secondary {
          border-color: #dd2525;
          background: linear-gradient(135deg, #ffffff 0%, #fff8f8 100%);
          
          .card-icon {
            background: #dd2525;
            color: #ffffff;
          }
        }
        
        &.tertiary {
          border-color: #ffc107;
          background: linear-gradient(135deg, #ffffff 0%, #fffef8 100%);
          
          .card-icon {
            background: #ffc107;
            color: #212529;
          }
        }
        
        .card-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 24px;
        }
        
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #212529;
          margin-bottom: 16px;
        }
        
        .card-description {
          color: #6c757d;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        
        .action-btn {
          width: 100%;
          padding: 12px 24px;
          background: #dd2525;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          
          &:hover {
            background: #b91c1c;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
          }
        }
      }
    }
  }
}

// Button Styles
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
  
  &.btn-primary {
    background: #dd2525;
    color: #ffffff;
    
    &:hover {
      background: #b91c1c;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
    }
  }
  
  &.btn-secondary {
    background: #ffffff;
    color: #dd2525;
    border: 2px solid #dd2525;
    
    &:hover {
      background: #5a6268;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
    }
  }
  
  i {
    font-size: 0.875rem;
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .hero-section .hero-container {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  
  .matrix-axes {
    flex-direction: column;
    gap: 20px;
    
    .y-axis {
      flex-direction: row;
      
      .axis-label {
        writing-mode: initial;
        text-orientation: initial;
        margin-bottom: 0;
        margin-right: 20px;
      }
      
      .axis-scale {
        flex-direction: row;
        gap: 40px;
      }
    }
  }
  
  .practices-grid {
    grid-template-columns: 1fr;
  }
  
  .action-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-content .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .matrix-grid-detailed {
    grid-template-columns: 1fr;
  }
  
  .timeline-item {
    flex-direction: column;
    gap: 20px;
    
    .timeline-marker {
      align-self: flex-start;
    }
  }
  
  .implementation-timeline::before {
    display: none;
  }
}
</style>