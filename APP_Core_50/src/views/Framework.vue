<template>
  <div class="framework-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          <i class="fas fa-compass"></i>
          Framework
        </h1>
        <p class="page-subtitle">Core concepts and implementation methods of the Global Talents Management executive talent development framework</p>
      </div>
      <div class="header-actions">
        <button class="btn btn-primary" @click="downloadFramework">
          <i class="fas fa-download"></i>
          Download Framework
        </button>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">
        <i class="fas fa-lightbulb"></i>
        Framework Introduction
      </h2>
      <p class="intro-text">
        The Global Talents Management framework is a comprehensive executive talent assessment and development system based on modern leadership theory and best practices, covering 50 core competency dimensions through scientific assessment methods and personalized development recommendations.
      </p>
      
      <div class="framework-pillars">
        <div class="pillar-item" v-for="(pillar, index) in frameworkPillars" :key="index">
          <div class="pillar-icon">
            <i :class="pillar.icon"></i>
          </div>
          <h3 class="pillar-title">{{ pillar.title }}</h3>
          <p class="pillar-description">{{ pillar.description }}</p>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">
        <i class="fas fa-star"></i>
        5B Core Framework
      </h2>
      <p class="section-description">
        Global Talents Management is built on the 5B framework, covering five key dimensions of executive talent development
      </p>

      <div class="five-b-grid">
        <div 
          v-for="(dimension, index) in fiveBDimensions" 
          :key="index"
          class="dimension-card"
          @click="showDimensionDetail(dimension)"
        >
          <div class="dimension-header">
            <div class="dimension-letter">{{ dimension.letter }}</div>
            <div class="dimension-info">
              <h3 class="dimension-title">{{ dimension.title }}</h3>
              <p class="dimension-subtitle">{{ dimension.subtitle }}</p>
            </div>
          </div>
          
          <div class="dimension-content">
            <p class="dimension-description">{{ dimension.description }}</p>
            
            <div class="competencies-list">
              <h4>Core Competencies</h4>
              <ul>
                <li v-for="competency in dimension.competencies" :key="competency">
                  {{ competency }}
                </li>
              </ul>
            </div>
          </div>

          <div class="dimension-footer">
            <span class="competency-count">{{ dimension.competencies.length }} competencies</span>
            <button class="detail-btn" @click.stop="showDimensionDetail(dimension)">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">
        <i class="fas fa-cogs"></i>
        Implementation Process
      </h2>
      <p class="section-description">
        Standardized implementation process ensures effective framework application
      </p>

      <div class="process-timeline">
        <div 
          v-for="(phase, index) in implementationPhases" 
          :key="index"
          class="timeline-item"
          :class="{ active: index === 0 }"
        >
          <div class="timeline-marker">
            <div class="marker-number">{{ index + 1 }}</div>
          </div>
          
          <div class="timeline-content">
            <div class="phase-header">
              <h3 class="phase-title">{{ phase.title }}</h3>
              <span class="phase-duration">{{ phase.duration }}</span>
            </div>
            
            <p class="phase-description">{{ phase.description }}</p>
            
            <div class="phase-deliverables">
              <h4>Key Deliverables</h4>
              <ul>
                <li v-for="deliverable in phase.deliverables" :key="deliverable">
                  {{ deliverable }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-section">
      <h2 class="section-title">
        <i class="fas fa-chart-line"></i>
        Success Metrics
      </h2>
      <p class="section-description">
        Measure framework implementation effectiveness through key indicators
      </p>

      <div class="metrics-grid">
        <div 
          v-for="(metric, index) in successMetrics" 
          :key="index"
          class="metric-card"
        >
          <div class="metric-icon">
            <i :class="metric.icon"></i>
          </div>
          <div class="metric-content">
            <h3 class="metric-title">{{ metric.title }}</h3>
            <div class="metric-value">{{ metric.value }}</div>
            <p class="metric-description">{{ metric.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'

export default {
  name: 'Framework',
  setup() {
    const appStore = useAppStore()

    const frameworkPillars = [
      {
        icon: 'fas fa-eye',
        title: 'Scientific Assessment',
        description: 'Based on psychology and management theory, using multi-dimensional assessment methods to ensure objectivity and accuracy of results.'
      },
      {
        icon: 'fas fa-user-cog',
        title: 'Personalized Development',
        description: 'Develop targeted development plans and learning paths based on individual characteristics and organizational needs.'
      },
      {
        icon: 'fas fa-sync-alt',
        title: 'Continuous Improvement',
        description: 'Establish continuous feedback mechanisms, regularly evaluate and adjust development strategies to ensure continuous progress.'
      },
      {
        icon: 'fas fa-users',
        title: 'Organizational Synergy',
        description: 'Combine individual development with organizational goals to achieve win-win personal growth and organizational development.'
      }
    ]

    const fiveBDimensions = [
      {
        letter: 'B',
        title: 'Business Acumen',
        subtitle: '商业敏锐度',
        description: '理解商业环境、市场动态和组织战略的能力，能够做出明智的商业决策。',
        competencies: [
          '战略思维',
          '市场洞察',
          '财务理解',
          '风险管理',
          '创新思维',
          '客户导向',
          '竞争分析',
          '商业模式理解'
        ]
      },
      {
        letter: 'B',
        title: 'Building Relationships',
        subtitle: '关系建立',
        description: '建立和维护有效关系的能力，包括内部协作和外部合作伙伴关系。',
        competencies: [
          '沟通技巧',
          '影响力',
          '谈判能力',
          '网络建设',
          '跨文化理解',
          '冲突解决',
          '团队协作',
          '利益相关者管理'
        ]
      },
      {
        letter: 'B',
        title: 'Building Teams',
        subtitle: '团队建设',
        description: '组建、发展和领导高效团队的能力，激发团队潜能实现共同目标。',
        competencies: [
          '团队领导',
          '人才识别',
          '授权赋能',
          '绩效管理',
          '教练辅导',
          '激励技巧',
          '文化塑造',
          '变革管理'
        ]
      },
      {
        letter: 'B',
        title: 'Building Self',
        subtitle: '自我建设',
        description: '持续自我发展和完善的能力，包括自我认知、学习能力和适应能力。',
        competencies: [
          '自我认知',
          '情绪管理',
          '学习敏锐度',
          '适应能力',
          '抗压能力',
          '时间管理',
          '决策能力',
          '职业规划'
        ]
      },
      {
        letter: 'B',
        title: 'Building the Business',
        subtitle: '业务建设',
        description: '推动业务增长和组织发展的能力，实现可持续的商业成功。',
        competencies: [
          '执行力',
          '项目管理',
          '流程优化',
          '质量管理',
          '数字化转型',
          '可持续发展',
          '合规管理',
          '价值创造'
        ]
      }
    ]

    const implementationPhases = [
      {
        title: 'Preparation Phase',
        duration: '2-4 weeks',
        description: 'Define assessment objectives, prepare assessment tools, train assessment team.',
        deliverables: [
          'Assessment Plan',
          'Assessment Toolkit',
          'Team Training Materials',
          'Project Kickoff Meeting'
        ]
      },
      {
        title: 'Assessment Phase',
        duration: '4-6 weeks',
        description: 'Execute 360-degree assessment, collect multi-dimensional data.',
        deliverables: [
          'Assessment Data Collection',
          'Data Quality Check',
          'Preliminary Analysis Report',
          'Feedback Collection'
        ]
      },
      {
        title: 'Analysis Phase',
        duration: '2-3 weeks',
        description: 'In-depth analysis of assessment results, generate personalized reports.',
        deliverables: [
          'Individual Assessment Report',
          'Team Analysis Report',
          'Development Recommendations',
          'Action Plan Template'
        ]
      },
      {
        title: 'Development Phase',
        duration: '6-12 months',
        description: 'Implement personalized development plans, continuously track progress.',
        deliverables: [
          'Development Plan Execution',
          'Progress Tracking Report',
          'Periodic Assessment',
          'Adjustment Optimization Plan'
        ]
      }
    ]

    const successMetrics = [
      {
        icon: 'fas fa-chart-line',
        title: 'Capability Enhancement',
        value: '85%',
        description: 'Participants average 85% improvement in core competencies'
      },
      {
        icon: 'fas fa-users',
        title: 'Participation Satisfaction',
        value: '92%',
        description: 'Participant satisfaction with framework implementation reaches 92%'
      },
      {
        icon: 'fas fa-trophy',
        title: 'Promotion Success Rate',
        value: '78%',
        description: '78% promotion success rate for participants completing development plans'
      },
      {
        icon: 'fas fa-building',
        title: 'Organizational Benefits',
        value: '65%',
        description: '65% improvement in overall organizational performance'
      }
    ]

    const downloadFramework = () => {
      appStore.showToast('下载', 'Global Talents Management 框架文档下载已开始', 'success')
    }

    const showDimensionDetail = (dimension) => {
      appStore.showModal({
        title: `${dimension.letter} - ${dimension.title}`,
        content: `${dimension.description}\n\n核心能力包括：${dimension.competencies.join('、')}`,
        type: 'info'
      })
    }

    return {
      frameworkPillars,
      fiveBDimensions,
      implementationPhases,
      successMetrics,
      downloadFramework,
      showDimensionDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.framework-page {
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

  .header-actions {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
}

.content-section {
  margin-bottom: 50px;

  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;

    i {
      font-size: 1.25rem;
      color: #dd2525;
    }
  }

  .section-description {
    font-size: 1rem;
    color: #6c757d;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  .intro-text {
    font-size: 1rem;
    color: #6c757d;
    line-height: 1.8;
    margin-bottom: 32px;
  }
}

.framework-pillars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.pillar-item {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #dd2525;
    box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
    transform: translateY(-4px);
  }

  .pillar-icon {
    font-size: 2.5rem;
    color: #dd2525;
    margin-bottom: 20px;
  }

  .pillar-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 12px;
  }

  .pillar-description {
    color: #6c757d;
    line-height: 1.6;
  }
}

.five-b-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.dimension-card {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 30px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #dd2525;
    box-shadow: 0 4px 12px rgba(221, 37, 37, 0.1);
  }

  .dimension-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }

  .dimension-letter {
    width: 60px;
    height: 60px;
    background: #dd2525;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 900;
    flex-shrink: 0;
  }

  .dimension-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }

  .dimension-subtitle {
    color: #dd2525;
    font-weight: 500;
    font-size: 0.9rem;
  }

  .dimension-description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .competencies-list {
    h4 {
      color: #333;
      font-size: 1rem;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    li {
      color: #666;
      font-size: 0.9rem;
      padding: 5px 0;
      position: relative;
      padding-left: 15px;

      &::before {
        content: '•';
        color: #dd2525;
        position: absolute;
        left: 0;
      }
    }
  }

  .dimension-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e5e5e5;
  }

  .competency-count {
    color: #999;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .detail-btn {
    background: rgba(221, 37, 37, 0.1);
    border: 1px solid rgba(221, 37, 37, 0.2);
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dd2525;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(221, 37, 37, 0.2);
      transform: scale(1.1);
    }
  }
}

.process-timeline {
  position: relative;
  padding-left: 40px;

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #dd2525;
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  padding-left: 40px;

  &.active .timeline-marker {
    background: #dd2525;
    box-shadow: 0 0 20px rgba(221, 37, 37, 0.4);
  }
}

.timeline-marker {
  position: absolute;
  left: -40px;
  top: 0;
  width: 40px;
  height: 40px;
  background: rgba(221, 37, 37, 0.2);
  border: 3px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.marker-number {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
}

.timeline-content {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.phase-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
}

.phase-duration {
  background: rgba(221, 37, 37, 0.1);
  color: #dd2525;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.phase-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.phase-deliverables {
  h4 {
    color: #333;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  li {
    color: #666;
    font-size: 0.9rem;
    padding: 5px 0;
    position: relative;
    padding-left: 15px;

    &::before {
      content: '✓';
      color: #dd2525;
      position: absolute;
      left: 0;
      font-weight: bold;
    }
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.metric-card {
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #dd2525;
    box-shadow: 0 4px 12px rgba(221, 37, 37, 0.1);
  }

  .metric-icon {
    font-size: 2.5rem;
    color: #dd2525;
    flex-shrink: 0;
  }

  .metric-content {
    flex: 1;
  }

  .metric-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }

  .metric-value {
    font-size: 2rem;
    font-weight: 800;
    color: #dd2525;
    margin-bottom: 5px;
  }

  .metric-description {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

.btn {
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  &.btn-primary {
    background: #dd2525;
    color: white;
    border-color: #dd2525;

    &:hover {
      background: #b91c1c;
      border-color: #b91c1c;
    }
  }
}

@media (max-width: 1024px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .five-b-grid {
    grid-template-columns: 1fr;
  }

  .competencies-list ul {
    grid-template-columns: 1fr;
  }

  .phase-deliverables ul {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .framework-page {
    padding: 15px;
  }

  .page-title {
    font-size: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .framework-pillars {
    grid-template-columns: 1fr;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .metric-card {
    flex-direction: column;
    text-align: center;
  }

  .process-timeline {
    padding-left: 30px;

    &::before {
      left: 15px;
    }
  }

  .timeline-marker {
    left: -30px;
    width: 30px;
    height: 30px;
  }

  .timeline-content {
    padding: 20px;
  }
}
</style>