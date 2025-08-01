<template>
  <div class="framework-page">
    <!-- Page Header -->
    <div class="page-header glass animate__animated animate__fadeInDown">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">
            <i class="fas fa-compass"></i>
            框架概述
          </h1>
          <p class="page-subtitle">Global Talents Management 高管人才发展框架的核心理念与实施方法</p>
        </div>
        <div class="header-actions">
          <button class="btn primary" @click="downloadFramework">
            <i class="fas fa-download"></i>
            下载框架
          </button>
        </div>
      </div>
    </div>

    <!-- Framework Introduction -->
    <section class="intro-section glass">
      <div class="intro-content">
        <h2 class="section-title">
          <i class="fas fa-lightbulb"></i>
          框架介绍
        </h2>
        <p class="intro-text">
          Global Talents Management 框架是一个综合性的高管人才评估与发展体系，基于现代领导力理论和最佳实践，
          涵盖50个核心能力维度，通过科学的评估方法和个性化的发展建议，帮助组织培养卓越的领导人才。
        </p>
        
        <div class="framework-pillars">
          <div class="pillar-card" v-for="(pillar, index) in frameworkPillars" :key="index">
            <div class="pillar-icon">
              <i :class="pillar.icon"></i>
            </div>
            <h3 class="pillar-title">{{ pillar.title }}</h3>
            <p class="pillar-description">{{ pillar.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5B Framework -->
    <section class="five-b-section glass">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-star"></i>
          5B 核心框架
        </h2>
        <p class="section-description">
          Global Talents Management 基于5B框架构建，涵盖高管人才发展的五个关键维度
        </p>
      </div>

      <div class="five-b-grid">
        <div 
          v-for="(dimension, index) in fiveBDimensions" 
          :key="index"
          class="dimension-card glass-subtle"
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
              <h4>核心能力</h4>
              <ul>
                <li v-for="competency in dimension.competencies" :key="competency">
                  {{ competency }}
                </li>
              </ul>
            </div>
          </div>

          <div class="dimension-footer">
            <span class="competency-count">{{ dimension.competencies.length }} 项能力</span>
            <button class="detail-btn" @click.stop="showDimensionDetail(dimension)">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Implementation Process -->
    <section class="process-section glass">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-cogs"></i>
          实施流程
        </h2>
        <p class="section-description">
          标准化的实施流程确保框架的有效应用
        </p>
      </div>

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
              <h4>主要交付物</h4>
              <ul>
                <li v-for="deliverable in phase.deliverables" :key="deliverable">
                  {{ deliverable }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Metrics -->
    <section class="metrics-section glass">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-chart-line"></i>
          成功指标
        </h2>
        <p class="section-description">
          通过关键指标衡量框架实施效果
        </p>
      </div>

      <div class="metrics-grid">
        <div 
          v-for="(metric, index) in successMetrics" 
          :key="index"
          class="metric-item"
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
    </section>
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
        title: '科学评估',
        description: '基于心理学和管理学理论，采用多维度评估方法，确保评估结果的客观性和准确性。'
      },
      {
        icon: 'fas fa-user-cog',
        title: '个性化发展',
        description: '根据个人特点和组织需求，制定针对性的发展计划和学习路径。'
      },
      {
        icon: 'fas fa-sync-alt',
        title: '持续改进',
        description: '建立持续的反馈机制，定期评估和调整发展策略，确保持续进步。'
      },
      {
        icon: 'fas fa-users',
        title: '组织协同',
        description: '将个人发展与组织目标相结合，实现个人成长与组织发展的双赢。'
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
        title: '准备阶段',
        duration: '2-4周',
        description: '明确评估目标，准备评估工具，培训评估团队。',
        deliverables: [
          '评估计划书',
          '评估工具包',
          '团队培训材料',
          '项目启动会议'
        ]
      },
      {
        title: '评估阶段',
        duration: '4-6周',
        description: '执行360度评估，收集多维度数据。',
        deliverables: [
          '评估数据收集',
          '数据质量检查',
          '初步分析报告',
          '反馈收集'
        ]
      },
      {
        title: '分析阶段',
        duration: '2-3周',
        description: '深入分析评估结果，生成个性化报告。',
        deliverables: [
          '个人评估报告',
          '团队分析报告',
          '发展建议书',
          '行动计划模板'
        ]
      },
      {
        title: '发展阶段',
        duration: '6-12个月',
        description: '实施个性化发展计划，持续跟踪进展。',
        deliverables: [
          '发展计划执行',
          '进度跟踪报告',
          '阶段性评估',
          '调整优化方案'
        ]
      }
    ]

    const successMetrics = [
      {
        icon: 'fas fa-chart-line',
        title: '能力提升',
        value: '85%',
        description: '参与者在核心能力方面平均提升85%'
      },
      {
        icon: 'fas fa-users',
        title: '参与满意度',
        value: '92%',
        description: '参与者对框架实施过程满意度达92%'
      },
      {
        icon: 'fas fa-trophy',
        title: '晋升成功率',
        value: '78%',
        description: '完成发展计划的参与者晋升成功率78%'
      },
      {
        icon: 'fas fa-building',
        title: '组织效益',
        value: '65%',
        description: '组织整体绩效提升65%'
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
  max-width: 1400px;
  margin: 0 auto;
}

// Page Header
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

// Section Styling
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;

  i {
    font-size: 1.8rem;
    color: #dd2525;
  }
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

// Introduction Section
.intro-section {
  padding: 40px;
  margin-bottom: 50px;
}

.intro-text {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 40px;
}

.framework-pillars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.pillar-card {
  padding: 30px;
  background: rgba(221, 37, 37, 0.05);
  border: 1px solid rgba(221, 37, 37, 0.1);
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(221, 37, 37, 0.15);
  }
}

.pillar-icon {
  font-size: 3rem;
  color: #dd2525;
  margin-bottom: 20px;
}

.pillar-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.pillar-description {
  color: #666;
  line-height: 1.6;
}

// 5B Framework Section
.five-b-section {
  padding: 40px;
  margin-bottom: 50px;
}

.five-b-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.dimension-card {
  padding: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(221, 37, 37, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(221, 37, 37, 0.15);
    border-color: rgba(221, 37, 37, 0.2);
  }
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
  background: linear-gradient(135deg, #dd2525, #b91c1c);
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
  border-top: 1px solid rgba(221, 37, 37, 0.1);
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

// Process Section
.process-section {
  padding: 40px;
  margin-bottom: 50px;
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
    background: linear-gradient(180deg, #dd2525, rgba(221, 37, 37, 0.3));
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
  background: rgba(255, 255, 255, 0.8);
  padding: 25px;
  border-radius: 15px;
  border: 1px solid rgba(221, 37, 37, 0.1);
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

// Metrics Section
.metrics-section {
  padding: 40px;
  margin-bottom: 50px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: rgba(221, 37, 37, 0.05);
  border: 1px solid rgba(221, 37, 37, 0.1);
  border-radius: 15px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(221, 37, 37, 0.15);
  }
}

.metric-icon {
  font-size: 2.5rem;
  color: #dd2525;
  flex-shrink: 0;
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

// Buttons
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
  text-decoration: none;

  &.primary {
    background: linear-gradient(135deg, #dd2525, #b91c1c);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #c41e1e, #991b1b);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(221, 37, 37, 0.3);
    }
  }
}

// Responsive Design
@media (max-width: 1024px) {
  .header-content {
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
  .page-header {
    padding: 20px;
  }

  .page-title {
    font-size: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .intro-section,
  .five-b-section,
  .process-section,
  .metrics-section {
    padding: 30px 20px;
  }

  .framework-pillars {
    grid-template-columns: 1fr;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .metric-item {
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