import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { createProject, executeStep, getStatus, type Project, type StepResult } from '@/api/workflow';

export const useProjectStore = defineStore('project', () => {
  const currentProject = ref<Project | null>(null);
  const steps = ref<StepResult[]>([]);
  const currentStep = ref(1);
  const selectedOptions = ref<Map<number, any>>(new Map());
  const isLoading = ref(false);

  const progress = computed(() => {
    return Math.round((currentStep.value - 1) / 15 * 100);
  });

  const isComplete = computed(() => {
    return currentStep.value > 15;
  });

  const startProject = async (projectInfo: any) => {
    isLoading.value = true;
    try {
      const result = await createProject(projectInfo);
      if (result.success) {
        currentProject.value = result.project;
        currentStep.value = result.current_step;
      }
      return result;
    } finally {
      isLoading.value = false;
    }
  };

   const runStep = async () => {
    if (!currentProject.value) return null;

    isLoading.value = true;
    try {
      const result = await executeStep(
        currentProject.value.id, 
        currentStep.value,
        {
          name: currentProject.value.name,
          style: currentProject.value.style,
          audience: currentProject.value.audience,
          description: currentProject.value.description
        }
      );
      if (result.success) {
        steps.value.push(result.step);
        return result.ai_result.options;
      }
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const selectOption = (stepNumber: number, option: any) => {
    selectedOptions.value.set(stepNumber, option);
    currentStep.value = stepNumber + 1;
  };

  const resetProject = () => {
    currentProject.value = null;
    steps.value = [];
    currentStep.value = 1;
    selectedOptions.value.clear();
    isLoading.value = false;
  };

  return {
    currentProject,
    steps,
    currentStep,
    selectedOptions,
    isLoading,
    progress,
    isComplete,
    startProject,
    runStep,
    selectOption,
    resetProject
  };
});
