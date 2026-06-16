import OpenAI from 'openai';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

let openaiClient = null;

const getOpenAIClient = () => {
  if (!env.aiApiKey) {
    throw new AppError('AI API key is not configured. Set AI_API_KEY in your environment.', 503);
  }

  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: env.aiApiKey });
  }

  return openaiClient;
};

const parseJsonResponse = (content) => {
  try {
    return JSON.parse(content);
  } catch {
    throw new AppError('Failed to parse AI response', 502);
  }
};

const clampScore = (value, fallback = 0) => {
  const score = Number(value);
  if (Number.isNaN(score)) {
    return fallback;
  }
  return Math.min(100, Math.max(0, Math.round(score)));
};

const normalizeStringArray = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item) => typeof item === 'string' && item.trim()).map((item) => item.trim());
};

const normalizeAnswerEvaluation = (raw) => ({
  score: clampScore(raw?.score, 0),
  strengths: normalizeStringArray(raw?.strengths),
  improvements: normalizeStringArray(raw?.improvements),
  suggestedAnswer: typeof raw?.suggestedAnswer === 'string' ? raw.suggestedAnswer.trim() : '',
});

const ANSWER_EVALUATION_PROMPT = `You are a professional technical interview coach evaluating internship interview answers.

Analyze the candidate's answer and return ONLY valid JSON with this exact shape:
{
  "score": 0,
  "strengths": ["string"],
  "improvements": ["string"],
  "suggestedAnswer": "string"
}

Rules:
- score must be 0-100
- strengths: 2-4 specific positives (empty array if answer is blank)
- improvements: 2-4 actionable improvements
- suggestedAnswer: a concise model answer (2-4 sentences)
- Be constructive, professional, and interview-focused
- If the answer is empty or very weak, score below 30`;

const OVERALL_FEEDBACK_PROMPT = `You are a senior technical interviewer providing a final interview performance report.

Based on the interview metadata and per-question evaluations, return ONLY valid JSON:
{
  "summary": "string",
  "communicationRating": 0,
  "technicalRating": 0,
  "confidenceRating": 0,
  "finalFeedback": "string"
}

Rules:
- All ratings must be 0-100 integers
- summary: 2-3 sentence overview
- finalFeedback: 3-5 sentences of actionable coaching advice
- Be professional and encouraging while honest about gaps`;

export const evaluateAnswer = async (question, answer) => {
  try {
    const client = getOpenAIClient();

    const response = await client.chat.completions.create({
    model: env.openaiModel,
    temperature: 0.3,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: ANSWER_EVALUATION_PROMPT },
      {
        role: 'user',
        content: JSON.stringify({
          question,
          answer: answer || 'No answer provided',
        }),
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new AppError('Empty response from AI service', 502);
  }

    return normalizeAnswerEvaluation(parseJsonResponse(content));
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || 'AI evaluation failed', 502);
  }
};

export const generateOverallFeedback = async ({ category, difficulty, evaluations }) => {
  try {
    const client = getOpenAIClient();

    const response = await client.chat.completions.create({
    model: env.openaiModel,
    temperature: 0.3,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: OVERALL_FEEDBACK_PROMPT },
      {
        role: 'user',
        content: JSON.stringify({
          category,
          difficulty,
          evaluations,
        }),
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new AppError('Empty response from AI service', 502);
  }

  const parsed = parseJsonResponse(content);

  return {
    summary: typeof parsed.summary === 'string' ? parsed.summary.trim() : '',
    communicationRating: clampScore(parsed.communicationRating, 0),
    technicalRating: clampScore(parsed.technicalRating, 0),
    confidenceRating: clampScore(parsed.confidenceRating, 0),
    finalFeedback: typeof parsed.finalFeedback === 'string' ? parsed.finalFeedback.trim() : '',
  };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(error.message || 'AI overall feedback generation failed', 502);
  }
};

export const calculateOverallScore = (evaluations) => {
  if (!evaluations.length) {
    return 0;
  }

  const total = evaluations.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / evaluations.length);
};
