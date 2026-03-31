<template>
  <div class="result-summary">
    <a-card style="max-width: 1000px; margin: 0 auto">
      <h1 class="result-title">🎉 你的IP角色设计完成！</h1>
      
      <div class="project-info">
        <h2>项目信息</h2>
        <a-descriptions bordered :column="2">
          <a-descriptions-item label="项目名称">
            {{ store.currentProject?.name }}
          </a-descriptions-item>
          <a-descriptions-item label="风格偏好">
            {{ store.currentProject?.style }}
          </a-descriptions-item>
          <a-descriptions-item label="目标受众">
            {{ store.currentProject?.target_audience }}
          </a-descriptions-item>
          <a-descriptions-item label="详细描述">
            {{ store.currentProject?.description }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
      
      <div class="design-steps">
        <h2>设计步骤</h2>
        <a-timeline>
          <a-timeline-item
            v-for="([stepNumber, option]) in store.selectedOptions"
            :key="stepNumber"
          >
            <div class="step-item">
              <div class="step-number">步骤{{ stepNumber }}</div>
              <div class="step-option">{{ option.description }}</div>
            </div>
          </a-timeline-item>
        </a-timeline>
      </div>
      
      <div class="action-buttons">
        <a-space>
          <a-button type="primary" size="large" @click="handleRestart">
            重新设计
          </a-button>
          <a-button size="large" @click="handleExport">
            导出设计
          </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/stores/project';

const router = useRouter();
const store = useProjectStore();

const handleRestart = () => {
  store.resetProject();
  router.push('/create');
};

const handleExport = () => {
  alert('导出功能开发中...');
};
</script>

<style scoped>
.result-summary {
  padding: 20px;
}

.result-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: #1890ff;
}

.project-info {
  margin-bottom: 40px;
}

.project-info h2 {
  margin-bottom: 20px;
  color: #333;
}

.design-steps {
  margin-bottom: 40px;
}

.design-steps h2 {
  margin-bottom: 20px;
  color: #333;
}

.step-item {
  display: flex;
  gap: 16px;
  align-items: center;
}

.step-number {
  font-weight: bold;
  color: #1890ff;
  min-width: 100px;
}

.step-option {
  flex: 1;
  color: #666;
}

.action-buttons {
  text-align: center;
}
</style>
