<template>
  <div class="create-project">
    <a-card title="创建你的IP角色" style="max-width: 800px; margin: 0 auto">
      <a-form :model="formState" layout="vertical" @finish="handleSubmit">
        <a-form-item
          label="项目名称"
          name="name"
          :rules="[{ required: true, message: '请输入项目名称' }]"
        >
          <a-input 
            v-model:value="formState.name" 
            placeholder="例如：我的可爱小恐龙"
            size="large"
          />
        </a-form-item>

        <a-form-item
          label="风格偏好"
          name="style"
          :rules="[{ required: true, message: '请选择风格偏好' }]"
        >
          <a-select v-model:value="formState.style" placeholder="请选择风格" size="large">
            <a-select-option value="可爱风">可爱风</a-select-option>
            <a-select-option value="酷炫风">酷炫风</a-select-option>
            <a-select-option value="简约风">简约风</a-select-option>
            <a-select-option value="复古风">复古风</a-select-option>
            <a-select-option value="科幻风">科幻风</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="目标受众"
          name="audience"
          :rules="[{ required: true, message: '请选择目标受众' }]"
        >
          <a-select v-model:value="formState.audience" placeholder="请选择目标受众" size="large">
            <a-select-option value="年轻人">年轻人</a-select-option>
            <a-select-option value="儿童">儿童</a-select-option>
            <a-select-option value="职场人士">职场人士</a-select-option>
            <a-select-option value="学生">学生</a-select-option>
            <a-select-option value="全年龄">全年龄</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="详细描述"
          name="description"
          :rules="[{ required: true, message: '请输入详细描述' }]"
        >
          <a-textarea 
            v-model:value="formState.description" 
            placeholder="描述你的IP角色的特点、性格、喜好等..."
            :rows="4"
            size="large"
          />
        </a-form-item>

        <a-form-item>
          <a-button 
            type="primary" 
            html-type="submit" 
            size="large"
            block
            :loading="store.isLoading"
          >
            开始设计
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useProjectStore } from '@/stores/project';

const router = useRouter();
const store = useProjectStore();

const formState = reactive({
  name: '',
  style: '',
  audience: '',
  description: ''
});

const handleSubmit = async () => {
  const result = await store.startProject(formState);
  if (result.success) {
    message.success('项目创建成功！');
    router.push('/design');
  } else {
    message.error('创建失败，请重试');
  }
};
</script>

<style scoped>
.create-project {
  padding: 20px;
}
</style>
