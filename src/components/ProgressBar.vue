<template>
  <div class="progress-bar">
    <a-progress 
      :percent="progress" 
      :stroke-color="{ from: '#108ee9', to: '#87d068' }"
      status="active"
    />
    <div class="progress-text">
      步骤 {{ currentStep }} / 15
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  progress: number;
  currentStep: number;
}>();
</script>

<style scoped>
.progress-bar {
  margin-bottom: 30px;
  text-align: center;
}

.progress-text {
  margin-top: 10px;
  font-size: 16px;
  color: #666;
}
</style>
