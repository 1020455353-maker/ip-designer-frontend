<template>
  <a-card 
    hoverable 
    class="option-card"
    :class="{ selected: isSelected }"
    @click="handleClick"
  >
    <div class="option-content">
      <!-- 显示图片（如果有） -->
      <div v-if="option.image_url" class="option-image">
        <img :src="option.image_url" :alt="option.description" />
      </div>
      
      <div class="option-header">
        <div class="option-id">{{ option.id }}</div>
        <div class="option-icon" v-if="isSelected">
          <CheckCircleOutlined style="color: #52c41a; font-size: 20px" />
        </div>
      </div>
      
      <div class="option-description">{{ option.description }}</div>
      
      <div v-if="option.tag" class="option-tag">
        <a-tag color="blue">{{ option.tag }}</a-tag>
      </div>
      
      <div v-if="option.colors" class="option-colors">
        <a-tag v-for="(color, idx) in option.colors.split('+')" :key="idx">
          {{ color.trim() }}
        </a-tag>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { CheckCircleOutlined } from '@ant-design/icons-vue';

const props = defineProps<{
  option: any;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  select: [option: any];
}>();

const handleClick = () => {
  emit('select', props.option);
};
</script>

<style scoped>
.option-card {
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.option-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.option-card.selected {
  border-color: #52c41a;
  background-color: #f6ffed;
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-image {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
}

.option-image img {
  width: 100%;
  height: auto;
  display: block;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option-id {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1890ff 0%, #52c41a 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
}

.option-description {
  font-size: 15px;
  line-height: 1.6;
  color: #333;
}

.option-tag {
  margin-top: 8px;
}

.option-colors {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
