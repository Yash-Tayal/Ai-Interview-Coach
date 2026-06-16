import api from './api.js';

export async function evaluateAnswer(question, answer) {
  return api.post('/ai/evaluate', { question, answer });
}

export async function evaluateInterviewSession(interviewSessionId) {
  return api.post('/ai/evaluate-session', { interviewSessionId }, { timeout: 300000 });
}
