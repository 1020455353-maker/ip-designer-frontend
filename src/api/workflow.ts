import axios from 'axios';

const BASE_URL = 'https://ip-designer-backend.vercel.app/api';

export interface ProjectInfo {
  name: string;
  style: string;
  audience: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  style: string;
  audience: string;
  description: string;
  current_step: number;
  total_steps: number;
  status: string;
  created_at: string;
}

export interface StepResult {
  id: string;
  project_id: string;
  step_number: number;
  step_name: string;
  status: string;
  ai_output: {
    options: Array<{
      id: number;
      description: string;
      [key: string]: any;
    }>;
  };
}

export const createProject = async (projectInfo: ProjectInfo): Promise<{
  success: boolean;
  message: string;
  project: Project;
  current_step: number;
}> => {
  const response = await axios.post(`${BASE_URL}/workflow/start`, projectInfo);
  return response.data;
};

export const executeStep = async (projectId: string, stepNumber: number): Promise<{
  success: boolean;
  message: string;
  step: StepResult;
  ai_result: {
    options: Array<{
      id: number;
      description: string;
      [key: string]: any;
    }>;
  };
}> => {
  const response = await axios.post(`${BASE_URL}/workflow/step`, {
    project_id: projectId,
    step_number: stepNumber
});
  return response.data;
};

export const getStatus = async (projectId: string): Promise<{
  success: boolean;
  project: Project;
  steps: StepResult[];
}> => {
  const response = await axios.post(`${BASE_URL}/workflow/status`, {
    project_id: projectId
  });
  return response.data;
};
