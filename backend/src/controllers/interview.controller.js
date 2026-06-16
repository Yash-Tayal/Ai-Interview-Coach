import InterviewSession from '../models/InterviewSession.js';
import { AppError } from '../utils/AppError.js';

const formatSessionSummary = (session) => ({
  _id: session._id,
  category: session.category,
  difficulty: session.difficulty,
  score: session.score ?? 0,
  createdAt: session.createdAt,
  questionCount: session.questions?.length || 0,
});

export const submitInterview = async (req, res, next) => {
  try {
    const { category, difficulty, questions, answers } = req.body;

    if (!category || !difficulty || !questions || !answers) {
      throw new AppError('Please provide category, difficulty, questions, and answers', 400);
    }

    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      throw new AppError('Questions and answers must be arrays', 400);
    }

    if (questions.length === 0 || answers.length === 0) {
      throw new AppError('At least one question and answer is required', 400);
    }

    if (questions.length !== answers.length) {
      throw new AppError('Questions and answers count must match', 400);
    }

    const formattedQuestions = questions.map((item, index) => {
      const text = item.text || item.questionText;
      if (!text) {
        throw new AppError(`Question at index ${index} must include text`, 400);
      }

      return {
        questionId: item.questionId || item._id,
        text,
      };
    });

    const formattedAnswers = answers.map((item, index) => ({
      questionId: item.questionId || formattedQuestions[index]?.questionId,
      text: item.text ?? item.answer ?? '',
    }));

    const session = await InterviewSession.create({
      user: req.user._id,
      category,
      difficulty,
      questions: formattedQuestions,
      answers: formattedAnswers,
      score: 0,
    });

    res.status(201).json({
      success: true,
      message: 'Interview submitted successfully',
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserInterviews = async (req, res, next) => {
  try {
    const sessions = await InterviewSession.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('category difficulty score createdAt questions');

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions.map(formatSessionSummary),
    });
  } catch (error) {
    next(error);
  }
};

export const getInterviewSession = async (req, res, next) => {
  try {
    const session = await InterviewSession.findById(req.params.id);

    if (!session) {
      throw new AppError('Interview session not found', 404);
    }

    if (session.user.toString() !== req.user._id.toString()) {
      throw new AppError('Not authorized to view this interview session', 403);
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    next(error);
  }
};
