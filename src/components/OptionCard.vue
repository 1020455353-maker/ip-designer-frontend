<template>
  <a-card 
    hoverable 
    class="option-card"
    :class="{ selected: isSelected }"
    @click="handleClick"
  >
    <div class="option-content">
      <div class="option-id">{{ option.id }}</div>
      <div class="option-description">{{ option.description }}</div>
      <div class="option-icon" v-if="isSelected">
        <CheckCircleOutlined style="color: #52c41a; font-size: 24px" />
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
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.option-card.selected {
  border-color: #52c41a;
  background-color: #f6ffed;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.option-id {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1890ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;
}

.option-description {
  flex: 1;
  font-size: 16px;
  line-height: 1.5;
}

.option-icon {
  flex-shrink: 0;
}
</style>
