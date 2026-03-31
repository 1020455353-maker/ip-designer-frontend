<template>
  <div class="design-process">
    <a-card style="max-width: 1000px; margin: 0 auto">
      <ProgressBar :progress="store.progress" :current-step="store.currentStep" />
      
      <h2 class="step-title">步骤{{ store.currentStep }}：{{ stepName }}</h2>
      
      <div v-if="store.isLoading" class="loading-container">
        <a-spin size="large" />
        <p>正在生成选项...</p>
      </div>
      
      <div v-else-if="options && options.length > 0" class="options-container">
        <OptionCard
          v-for="option in options"
          :key="option.id"
          :option="option"
          :is-selected="false"
          @select="handleSelect"
        />
      </div>
      
      <a-empty v-else description="点击下方按钮开始生成选项" />
      
      <div class="action-buttons">
        <a-button 
          v-if="!options || options.length === 0"
          type="primary" 
          size="large"
          @click="handleGenerate"
          :loading="store.isLoading"
        >
          生成选项
        </a-button>
        
        <a-button 
          v-if="store.isComplete"
          type="primary" 
          size="large"
          @click="handleFinish"
        >
          查看结果
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useProjectStore } from '@/stores/project';
import ProgressBar from '@/components/ProgressBar.vue';
import OptionCard from '@/components/OptionCard.vue';

const router = useRouter();
const store = useProjectStore();

const options = ref<any[]>([]);

const stepName = computed(() => {
  const stepNames: { [key: number]: string } = {
    1: '极简人设生成',
    2: '情感标签生成',
    3: '视觉标签生成',
    4: '世界观生成',
    5: '人格锚点生成',
    6: '头身比例生成',
    7: '五官特征生成',
    8: '品牌色系生成',
    9: '配饰纹样生成',
    10: '情绪价值生成',
    11: '风格赛道生成',
    12: '线条体态生成',
    13: '系列化逻辑生成',
    14: '跨界适配性生成',
    15: '材质适配规划生成'
  };
  return stepNames[store.currentStep] || '设计步骤';
});

const handleGenerate = async () => {
  const result = await store.runStep();
  if (result) {
    options.value = result;
    message.success('选项生成成功！');
  } else {
    message.error('生成失败，请重试');
  }
};

const handleSelect = (option: any) => {
  store.selectOption(store.currentStep, option);
  message.success(`已选择：${option.description}`);
  options.value = [];
};

const handleFinish = () => {
  router.push('/result');
};

onMounted(() => {
  if (!store.currentProject) {
    router.push('/create');
  }
});
</script>

<style scoped>
.design-process {
  padding: 20px;
}

.step-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.loading-container {
  text-align: center;
  padding: 40px 0;
}

.loading-container p {
  margin-top: 16px;
  color: #666;
}

.options-container {
  margin-bottom: 30px;
}

.action-buttons {
  text-align: center;
  margin-top: 30px;
}
</style>
