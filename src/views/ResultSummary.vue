<template>
  <div class="result-summary">
    <a-card style="max-width: 1000px; margin: 0 auto">
      <h1 class="result-title">🎉 你的IP角色设计完成！</h1>
      
      <!-- AI 生成的角色图片 -->
      <div class="character-image-section">
        <h2>角色概念图</h2>
        <div class="image-container">
          <div v-if="isGeneratingImage" class="image-loading">
            <a-spin size="large" />
            <p>AI 正在生成角色概念图，请稍候...</p>
          </div>
          <div v-else-if="generatedImageUrl" class="image-display">
            <img :src="generatedImageUrl" alt="角色概念图" class="character-image" />
          </div>
          <div v-else class="image-placeholder">
            <a-button type="primary" size="large" @click="handleGenerateImage">
              🎨 生成角色概念图
            </a-button>
          </div>
        </div>
      </div>

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
            {{ store.currentProject?.audience }}
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/stores/project';
import { generateImage } from '@/api/workflow';

const router = useRouter();
const store = useProjectStore();

const isGeneratingImage = ref(false);
const generatedImageUrl = ref('');

const handleGenerateImage = async () => {
  if (!store.currentProject) return;
  
  isGeneratingImage.value = true;
  try {
    // selectedOptions 是 Map 类型，需要转换
    const optionsText = Array.from(store.selectedOptions.values())
      .map((option: any) => option.description)
      .join('，');
    
    const result = await generateImage(
      {
        name: store.currentProject.name,
        style: store.currentProject.style,
        audience: store.currentProject.audience,
        description: store.currentProject.description
      },
      optionsText
    );
    
    if (result.success && result.image_url) {
      generatedImageUrl.value = result.image_url;
    }
  } catch (error) {
    console.error('图片生成失败:', error);
    alert('图片生成失败，请稍后重试');
  } finally {
    isGeneratingImage.value = false;
  }
};

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

.character-image-section {
  margin-bottom: 40px;
}

.character-image-section h2 {
  margin-bottom: 20px;
  color: #333;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background: #fafafa;
  border-radius: 12px;
  border: 2px dashed #d9d9d9;
  overflow: hidden;
}

.image-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
}

.image-loading p {
  color: #666;
  font-size: 16px;
}

.image-display {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.character-image {
  max-width: 512px;
  max-height: 512px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 60px;
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
