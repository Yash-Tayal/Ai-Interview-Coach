import InterviewSession from '../models/InterviewSession.js';
import { AppError } from '../utils/AppError.js';
import {
  evaluateAnswer,
  generateOverallFeedback,
  calculateOverallScore,
} from '../services/aiService.js';

const getSessionForUser = async (sessionId, userId) => {
  const session = await InterviewSession.findById(sessionId);

  if (!session) {
    throw new AppError('Interview session not found', 404);
  }

  if (session.user.toString() !== userId.toString()) {
    throw new AppError('Not authorized to access this interview session', 403);
  }

  return session;
};

export const evaluateSingleAnswer = async (req, res, next) => {
  try {
    const { question, answer } = req.body;

    if (!question) {
      throw new AppError('Please provide a question', 400);
    }

    const feedback = await evaluateAnswer(question, answer || '');

    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

export const evaluateInterviewSession = async (req, res, next) => {
  try {
    const { interviewSessionId } = req.body;

    if (!interviewSessionId) {
      throw new AppError('Please provide interviewSessionId', 400);
    }

    const session = await getSessionForUser(interviewSessionId, req.user._id);

    if (session.aiEvaluationCompleted) {
      return res.status(200).json({
        success: true,
        message: 'AI evaluation already completed',
        data: session,
      });
    }

    if (!session.questions?.length || !session.answers?.length) {
      throw new AppError('Interview session has no questions or answers to evaluate', 400);
    }

    const evaluations = [];

    for (let index = 0; index < session.questions.length; index += 1) {
      const questionText = session.questions[index].text;
      const answerText = session.answers[index]?.text || '';

      const feedback = await evaluateAnswer(questionText, answerText);

      evaluations.push({
        questionIndex: index,
        ...feedback,
      });
    }

    const overallScore = calculateOverallScore(evaluations);
    const overallFeedback = await generateOverallFeedback({
      category: session.category,
      difficulty: session.difficulty,
      evaluations,
    });

    session.evaluations = evaluations;
    session.overallScore = overallScore;
    session.score = overallScore;
    session.overallFeedback = overallFeedback;
    session.aiEvaluationCompleted = true;

    await session.save();

    res.status(200).json({
      success: true,
      message: 'Interview session evaluated successfully',
      data: session,
    });
  } catch (error) {
    next(error);
  }
};
