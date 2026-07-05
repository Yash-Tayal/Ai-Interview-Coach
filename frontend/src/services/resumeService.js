import axios from 'axios';
import api from './api.js';
import { getToken } from '../utils/auth.js';

const baseURL = import.meta.env.VITE_API_URL || '/api';

export function uploadResume(file, onProgress) {
  const formData = new FormData();
  formData.append('resume', file);

  return axios
    .post(`${baseURL}/resume/upload`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          onProgress(Math.round((event.loaded * 100) / event.total));
        }
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      const message = error.response?.data?.message || error.message || 'Upload failed';
      throw new Error(message);
    });
}

export function getResumeHistory() {
  return api.get('/resume/history');
}

export function getResumeById(id) {
  return api.get(`/resume/${id}`);
}
