import InterviewSession from '../models/InterviewSession.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [totalInterviews, categoryStats, difficultyStats, recentSession] = await Promise.all([
      InterviewSession.countDocuments({ user: userId }),
      InterviewSession.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      InterviewSession.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$difficulty', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      InterviewSession.findOne({ user: userId })
        .sort({ createdAt: -1 })
        .select('createdAt'),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalInterviews,
        interviewsByCategory: categoryStats.map((item) => ({
          category: item._id,
          count: item.count,
        })),
        interviewsByDifficulty: difficultyStats.map((item) => ({
          difficulty: item._id,
          count: item.count,
        })),
        mostRecentInterviewDate: recentSession?.createdAt || null,
      },
    });
  } catch (error) {
    next(error);
  }
};
