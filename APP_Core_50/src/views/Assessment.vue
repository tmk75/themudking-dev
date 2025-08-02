<template>
  <div class="assessment-page">
    <!-- Page Header -->
    <div class="page-header glass animate__animated animate__fadeInDown">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">
            <i class="fas fa-clipboard-check"></i>
            评估中心
          </h1>
          <p class="page-subtitle">360度综合评估，全方位了解领导力现状</p>
        </div>
        <div class="header-actions">
          <button class="btn primary" @click="startNewAssessment">
            <i class="fas fa-plus"></i>
            新建评估
          </button>
          <button class="btn outline" @click="viewHistory">
            <i class="fas fa-history"></i>
            历史记录
          </button>
        </div>
      </div>
    </div>

    <!-- Assessment Overview -->
    <section class="overview-section">
      <div class="overview-cards">
        <div 
          v-for="(card, index) in overviewCards" 
          :key="index"
          class="overview-card glass"
          @click="handleCardClick(card)"
        >
          <div class="card-icon" :class="card.type">
            <i :class="card.icon"></i>
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ card.title }}</h3>
            <div class="card-value">{{ card.value }}</div>
            <p class="card-description">{{ card.description }}</p>
          </div>
          <div class="card-action">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Assessment Types -->
    <section class="types-section glass">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-list-check"></i>
          评估类型
        </h2>
        <p class="section-description">
          选择适合的评估类型，开始您的领导力发展之旅
        </p>
      </div>

      <div class="assessment-types">
        <div 
          v-for="(type, index) in assessmentTypes" 
          :key="index"
          class="type-card"
          @click="selectAssessmentType(type)"
        >
          <div class="type-header">
            <div class="type-icon">
              <i :class="type.icon"></i>
            </div>
            <div class="type-info">
              <h3 class="type-title">{{ type.title }}</h3>
              <span class="type-duration">{{ type.duration }}</span>
            </div>
          </div>

          <div class="type-content">
            <p class="type-description">{{ type.description }}</p>
            
            <div class="type-features">
              <h4>评估内容</h4>
              <ul>
                <li v-for="feature in type.features" :key="feature">
                  <i class="fas fa-check"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="type-participants">
              <h4>参与人员</h4>
              <div class="participants-list">
                <span 
                  v-for="participant in type.participants" 
                  :key="participant"
                  class="participant-tag"
                >
                  {{ participant }}
                </span>
              </div>
            </div>
          </div>

          <div class="type-footer">
            <div class="type-price">
              <span class="price-label">预估时间</span>
              <span class="price-value">{{ type.estimatedTime }}</span>
            </div>
            <button class="select-btn" @click.stop="selectAssessmentType(type)">
              选择此类型
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Assessments -->
    <section class="recent-section glass">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-clock"></i>
          最近评估
        </h2>
        <button class="view-all-btn" @click="viewAllAssessments">
          查看全部
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>

      <div class="assessments-table">
        <div class="table-header">
          <div class="header-cell">评估对象</div>
          <div class="header-cell">评估类型</div>
          <div class="header-cell">状态</div>
          <div class="header-cell">完成度</div>
          <div class="header-cell">创建时间</div>
          <div class="header-cell">操作</div>
        </div>

        <div class="table-body">
          <div 
            v-for="assessment in recentAssessments" 
            :key="assessment.id"
            class="table-row"
            @click="viewAssessment(assessment)"
          >
            <div class="table-cell">
              <div class="participant-info">
                <img :src="assessment.avatar" :alt="assessment.name" class="participant-avatar">
                <div class="participant-details">
                  <div class="participant-name">{{ assessment.name }}</div>
                  <div class="participant-role">{{ assessment.role }}</div>
                </div>
              </div>
            </div>
            
            <div class="table-cell">
              <span class="assessment-type-badge" :class="assessment.type">
                {{ getTypeLabel(assessment.type) }}
              </span>
            </div>
            
            <div class="table-cell">
              <span class="status-badge" :class="assessment.status">
                {{ getStatusLabel(assessment.status) }}
              </span>
            </div>
            
            <div class="table-cell">
              <div class="progress-container">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: assessment.progress + '%' }"
                  ></div>
                </div>
                <span class="progress-text">{{ assessment.progress }}%</span>
              </div>
            </div>
            
            <div class="table-cell">
              <span class="date-text">{{ formatDate(assessment.createdAt) }}</span>
            </div>
            
            <div class="table-cell">
              <div class="action-buttons">
                <button 
                  class="action-btn" 
                  @click.stop="viewAssessment(assessment)"
                  title="查看详情"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <button 
                  class="action-btn" 
                  @click.stop="editAssessment(assessment)"
                  title="编辑"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button 
                  class="action-btn danger" 
                  @click.stop="deleteAssessment(assessment)"
                  title="删除"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
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
  name: 'Assessment',
  setup() {
    const router = useRouter()
    const appStore = useAppStore()

    const overviewCards = [
      {
        type: 'total',
        icon: 'fas fa-clipboard-list',
        title: '总评估数',
        value: '156',
        description: '已完成的评估总数'
      },
      {
        type: 'active',
        icon: 'fas fa-play-circle',
        title: '进行中',
        value: '23',
        description: '当前正在进行的评估'
      },
      {
        type: 'pending',
        icon: 'fas fa-clock',
        title: '待开始',
        value: '8',
        description: '计划中但未开始的评估'
      },
      {
        type: 'completed',
        icon: 'fas fa-check-circle',
        title: '本月完成',
        value: '12',
        description: '本月已完成的评估'
      }
    ]

    const assessmentTypes = [
      {
        id: 'full-360',
        title: '完整360度评估',
        duration: '4-6周',
        estimatedTime: '20-25小时',
        icon: 'fas fa-users',
        description: '全方位、多角度的综合评估，包含自评、上级评估、同级评估和下级评估，涵盖所有50个核心能力维度。',
        features: [
          '50个核心能力维度评估',
          '多角度反馈收集',
          '详细分析报告',
          '个性化发展建议',
          '行动计划制定'
        ],
        participants: ['自评', '上级', '同级', '下级', '客户']
      },
      {
        id: 'quick-assessment',
        title: '快速评估',
        duration: '1-2周',
        estimatedTime: '8-10小时',
        icon: 'fas fa-tachometer-alt',
        description: '针对关键能力维度的快速评估，适合定期检查和跟踪发展进度。',
        features: [
          '20个关键能力维度',
          '简化评估流程',
          '快速反馈报告',
          '重点发展建议'
        ],
        participants: ['自评', '直接上级']
      },
      {
        id: 'leadership-focus',
        title: '领导力专项评估',
        duration: '3-4周',
        estimatedTime: '15-18小时',
        icon: 'fas fa-crown',
        description: '专注于领导力核心能力的深度评估，适合高级管理人员和领导岗位候选人。',
        features: [
          '领导力核心维度',
          '情境化评估',
          '领导风格分析',
          '团队影响力评估'
        ],
        participants: ['自评', '上级', '团队成员']
      },
      {
        id: 'team-assessment',
        title: '团队评估',
        duration: '2-3周',
        estimatedTime: '12-15小时',
        icon: 'fas fa-users-cog',
        description: '针对整个团队的协作能力和团队动力评估，了解团队整体表现。',
        features: [
          '团队协作能力',
          '沟通效率评估',
          '团队文化分析',
          '集体发展建议'
        ],
        participants: ['团队成员', '团队领导']
      }
    ]

    const recentAssessments = ref([
      {
        id: 1,
        name: 'Carol Wen',
        role: '销售总监',
        avatar: 'https://ui-avatars.com/api/?name=Carol+Wen&background=dd2525&color=fff&size=128',
        type: 'full-360',
        status: 'in-progress',
        progress: 75,
        createdAt: new Date('2024-01-15')
      },
      {
        id: 2,
        name: '李主管',
        role: '市场经理',
        avatar: '/avatars/li.jpg',
        type: 'quick-assessment',
        status: 'completed',
        progress: 100,
        createdAt: new Date('2024-01-10')
      },
      {
        id: 3,
        name: '王总监',
        role: '技术总监',
        avatar: '/avatars/wang.jpg',
        type: 'leadership-focus',
        status: 'pending',
        progress: 0,
        createdAt: new Date('2024-01-08')
      },
      {
        id: 4,
        name: '研发团队',
        role: '技术团队',
        avatar: '/avatars/team.jpg',
        type: 'team-assessment',
        status: 'in-progress',
        progress: 45,
        createdAt: new Date('2024-01-05')
      }
    ])

    const handleCardClick = (card) => {
      appStore.showToast('导航', `查看${card.title}详情`, 'info')
    }

    const startNewAssessment = () => {
      appStore.showModal({
        title: '新建评估',
        content: '请选择评估类型开始创建新的评估项目。',
        type: 'info'
      })
    }

    const viewHistory = () => {
      appStore.showToast('功能', '评估历史记录功能即将推出', 'info')
    }

    const selectAssessmentType = (type) => {
      appStore.showModal({
        title: `选择 ${type.title}`,
        content: `您选择了"${type.title}"，预计需要${type.duration}完成。是否继续创建评估？`,
        type: 'confirm',
        actions: [
          {
            text: '取消',
            type: 'default'
          },
          {
            text: '确认创建',
            type: 'primary',
            handler: () => {
              appStore.showToast('创建成功', `${type.title}评估已创建`, 'success')
            }
          }
        ]
      })
    }

    const getTypeLabel = (type) => {
      const labels = {
        'full-360': '360度评估',
        'quick-assessment': '快速评估',
        'leadership-focus': '领导力评估',
        'team-assessment': '团队评估'
      }
      return labels[type] || type
    }

    const getStatusLabel = (status) => {
      const labels = {
        'in-progress': '进行中',
        'completed': '已完成',
        'pending': '待开始',
        'cancelled': '已取消'
      }
      return labels[status] || status
    }

    const formatDate = (date) => {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }

    const viewAllAssessments = () => {
      appStore.showToast('导航', '跳转到评估列表页面', 'info')
    }

    const viewAssessment = (assessment) => {
      appStore.showToast('查看', `查看${assessment.name}的评估详情`, 'info')
    }

    const editAssessment = (assessment) => {
      appStore.showToast('编辑', `编辑${assessment.name}的评估`, 'info')
    }

    const deleteAssessment = (assessment) => {
      appStore.showModal({
        title: '确认删除',
        content: `确定要删除${assessment.name}的评估吗？此操作不可撤销。`,
        type: 'confirm',
        actions: [
          {
            text: '取消',
            type: 'default'
          },
          {
            text: '确认删除',
            type: 'danger',
            handler: () => {
              const index = recentAssessments.value.findIndex(a => a.id === assessment.id)
              if (index > -1) {
                recentAssessments.value.splice(index, 1)
                appStore.showToast('删除成功', '评估已删除', 'success')
              }
            }
          }
        ]
      })
    }

    return {
      overviewCards,
      assessmentTypes,
      recentAssessments,
      handleCardClick,
      startNewAssessment,
      viewHistory,
      selectAssessmentType,
      getTypeLabel,
      getStatusLabel,
      formatDate,
      viewAllAssessments,
      viewAssessment,
      editAssessment,
      deleteAssessment
    }
  }
}
</script>

<style lang="scss" scoped>
.assessment-page {
  max-width: 1400px;
  margin: 0 auto;
}

.assessment-page {
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
    gap: 12px;
    flex-wrap: wrap;
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

.header-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.overview-section {
  margin-bottom: 60px;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.overview-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #dd2525;
    box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
    transform: translateY(-4px);
  }
}

.card-icon {
  width: 56px;
  height: 56px;
  background: #dd2525;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 4px;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  color: #dd2525;
  margin-bottom: 4px;
}

.card-description {
  color: #6c757d;
  font-size: 0.875rem;
}

.card-action {
  color: #dd2525;
  font-size: 1.2rem;
  opacity: 0.7;
  transition: all 0.3s ease;

  .overview-card:hover & {
    opacity: 1;
    transform: translateX(5px);
  }
}

.types-section {
  margin-bottom: 60px;
}

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

.assessment-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.assessment-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.type-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #dd2525;
    box-shadow: 0 8px 25px rgba(221, 37, 37, 0.1);
    transform: translateY(-4px);
  }
}

.type-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.type-icon {
  width: 60px;
  height: 60px;
  background: #dd2525;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.type-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.type-duration {
  background: rgba(221, 37, 37, 0.1);
  color: #dd2525;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.type-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.type-features {
  margin-bottom: 20px;

  h4 {
    color: #333;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 8px;

    i {
      color: #28a745;
      font-size: 0.8rem;
    }
  }
}

.type-participants {
  margin-bottom: 25px;

  h4 {
    color: #333;
    font-size: 1rem;
    margin-bottom: 10px;
  }
}

.participants-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.participant-tag {
  background: rgba(221, 37, 37, 0.1);
  color: #dd2525;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.type-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid rgba(221, 37, 37, 0.1);
}

.type-price {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.price-label {
  color: #999;
  font-size: 0.8rem;
}

.price-value {
  color: #dd2525;
  font-weight: 600;
  font-size: 1rem;
}

.select-btn {
  background: #dd2525;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #b91c1c;
  }
}

.recent-section {
  margin-bottom: 60px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.view-all-btn {
  background: transparent;
  border: 1px solid rgba(221, 37, 37, 0.3);
  color: #dd2525;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(221, 37, 37, 0.1);
    transform: translateY(-2px);
  }
}

.assessments-table {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr 1fr;
  background: rgba(221, 37, 37, 0.1);
  padding: 20px;
  gap: 20px;
}

.header-cell {
  color: #dd2525;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr 1fr;
  padding: 20px;
  gap: 20px;
  border-bottom: 1px solid rgba(221, 37, 37, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(221, 37, 37, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
}

.table-cell {
  display: flex;
  align-items: center;
}

.participant-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.participant-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(221, 37, 37, 0.2);
}

.participant-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.participant-role {
  color: #666;
  font-size: 0.8rem;
}

.assessment-type-badge {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;

  &.full-360 {
    background: rgba(23, 162, 184, 0.2);
    color: #17a2b8;
  }

  &.quick-assessment {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
  }

  &.leadership-focus {
    background: rgba(221, 37, 37, 0.2);
    color: #dd2525;
  }

  &.team-assessment {
    background: rgba(40, 167, 69, 0.2);
    color: #28a745;
  }
}

.status-badge {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;

  &.in-progress {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
  }

  &.completed {
    background: rgba(40, 167, 69, 0.2);
    color: #28a745;
  }

  &.pending {
    background: rgba(108, 117, 125, 0.2);
    color: #6c757d;
  }
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(221, 37, 37, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #dd2525, #b91c1c);
  transition: width 0.3s ease;
}

.progress-text {
  color: #666;
  font-size: 0.8rem;
  font-weight: 600;
  min-width: 35px;
}

.date-text {
  color: #666;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(221, 37, 37, 0.2);
  background: rgba(221, 37, 37, 0.1);
  color: #dd2525;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;

  &:hover {
    background: rgba(221, 37, 37, 0.2);
    transform: scale(1.1);
  }

  &.danger {
    border-color: rgba(220, 53, 69, 0.2);
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;

    &:hover {
      background: rgba(220, 53, 69, 0.2);
    }
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
  
  &.outline {
    background: transparent;
    color: #dd2525;
    border: 1px solid #dd2525;
    
    &:hover {
      background: #dd2525;
      color: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(221, 37, 37, 0.3);
    }
  }
  
  i {
    font-size: 0.875rem;
  }
}

// Responsive Design
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

.type-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.type-icon {
  width: 56px;
  height: 56px;
  background: #dd2525;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  flex-shrink: 0;
}

.type-info {
  flex: 1;
}

.type-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin-bottom: 4px;
}

.type-duration {
  background: rgba(221, 37, 37, 0.1);
  color: #dd2525;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.type-content {
  margin-bottom: 24px;
}

.type-description {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 20px;
}

.type-features {
  margin-bottom: 20px;

  h4 {
    color: #212529;
    font-size: 1rem;
    margin-bottom: 12px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6c757d;
    font-size: 0.875rem;
    margin-bottom: 8px;

    i {
      color: #28a745;
      font-size: 0.75rem;
    }
  }
}

.type-participants {
  margin-bottom: 24px;

  h4 {
    color: #212529;
    font-size: 1rem;
    margin-bottom: 12px;
  }
}

.participants-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.participant-tag {
  background: rgba(221, 37, 37, 0.1);
  color: #dd2525;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.type-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.type-price {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price-label {
  color: #6c757d;
  font-size: 0.75rem;
}

.price-value {
  color: #dd2525;
  font-weight: 600;
  font-size: 0.875rem;
}

.select-btn {
  background: #dd2525;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #b91c1c;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.view-all-btn {
  background: transparent;
  border: 1px solid #dd2525;
  color: #dd2525;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;

  &:hover {
    background: #dd2525;
    color: white;
    transform: translateY(-1px);
  }
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr 1fr;
  background: #f8f9fa;
  padding: 16px 20px;
  gap: 20px;
  border-bottom: 1px solid #e9ecef;
}

.header-cell {
  color: #212529;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr 1fr 1fr;
  padding: 16px 20px;
  gap: 20px;
  border-bottom: 1px solid #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
}

.table-cell {
  display: flex;
  align-items: center;
}

.participant-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.participant-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e9ecef;
}

.participant-name {
  font-weight: 600;
  color: #212529;
  margin-bottom: 2px;
}

.participant-role {
  color: #6c757d;
  font-size: 0.75rem;
}

.assessment-type-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;

  &.full-360 {
    background: rgba(23, 162, 184, 0.1);
    color: #17a2b8;
  }

  &.quick-assessment {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
  }

  &.leadership-focus {
    background: rgba(221, 37, 37, 0.1);
    color: #dd2525;
  }

  &.team-assessment {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  }
}

.status-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;

  &.in-progress {
    background: rgba(255, 193, 7, 0.1);
    color: #ffc107;
  }

  &.completed {
    background: rgba(40, 167, 69, 0.1);
    color: #28a745;
  }

  &.pending {
    background: rgba(108, 117, 125, 0.1);
    color: #6c757d;
  }
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #f8f9fa;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #dd2525;
  transition: width 0.3s ease;
}

.progress-text {
  color: #6c757d;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 35px;
}

.date-text {
  color: #6c757d;
  font-size: 0.875rem;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e9ecef;
  background: #ffffff;
  color: #6c757d;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.75rem;

  &:hover {
    border-color: #dd2525;
    color: #dd2525;
    background: rgba(221, 37, 37, 0.05);
  }

  &.danger {
    &:hover {
      border-color: #dc3545;
      color: #dc3545;
      background: rgba(220, 53, 69, 0.05);
    }
  }
}

@media (max-width: 1024px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .assessment-types {
    grid-template-columns: 1fr;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .table-cell {
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f8f9fa;

    &:last-child {
      border-bottom: none;
    }
  }
}

@media (max-width: 768px) {
  .assessment-page {
    padding: 16px;
  }

  .page-title {
    font-size: 2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .overview-cards {
    grid-template-columns: 1fr;
  }

  .overview-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .type-footer {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .select-btn {
    width: 100%;
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

  .types-section,
  .recent-section {
    padding: 30px 20px;
  }

  .overview-cards {
    grid-template-columns: 1fr;
  }

  .overview-card {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .type-footer {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .select-btn {
    width: 100%;
  }
}
</style>