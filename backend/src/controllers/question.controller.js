import Question, { CATEGORIES, DIFFICULTIES } from '../models/Question.js';
import { AppError } from '../utils/AppError.js';

export const getQuestions = async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;

    if (!category || !difficulty) {
      throw new AppError('Please provide category and difficulty query parameters', 400);
    }

    if (!CATEGORIES.includes(category)) {
      throw new AppError(`Invalid category. Must be one of: ${CATEGORIES.join(', ')}`, 400);
    }

    if (!DIFFICULTIES.includes(difficulty)) {
      throw new AppError(`Invalid difficulty. Must be one of: ${DIFFICULTIES.join(', ')}`, 400);
    }

    const questions = await Question.aggregate([
      { $match: { category, difficulty } },
      { $sample: { size: 5 } },
    ]);

    if (questions.length === 0) {
      throw new AppError('No questions found for the selected category and difficulty', 404);
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};

export const getQuestionOptions = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        categories: CATEGORIES,
        difficulties: DIFFICULTIES,
      },
    });
  } catch (error) {
    next(error);
  }
};
