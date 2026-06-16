import api from './api.js';

export async function getQuestionOptions() {
  return api.get('/questions/options');
}

export async function getQuestions(category, difficulty) {
  return api.get('/questions', { params: { category, difficulty } });
}

export async function submitInterview(payload) {
  return api.post('/interviews', payload);
}

export async function getInterviewSessions() {
  return api.get('/interviews');
}

export async function getInterviewSession(sessionId) {
  return api.get(`/interviews/${sessionId}`);
}
