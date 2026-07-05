import InterviewSession from '../models/InterviewSession.js';
import Resume from '../models/Resume.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [
      totalInterviews,
      categoryStats,
      difficultyStats,
      recentSession,
      evaluatedSessions,
      totalResumes,
      latestResume,
      bestResume,
    ] =
      await Promise.all([
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
        InterviewSession.find({
          user: userId,
          aiEvaluationCompleted: true,
        })
          .sort({ createdAt: -1 })
          .select('overallScore score createdAt category difficulty'),
        Resume.countDocuments({ user: userId }),
        Resume.findOne({ user: userId }).sort({ createdAt: -1 }).select('atsScore createdAt'),
        Resume.findOne({ user: userId }).sort({ atsScore: -1 }).select('atsScore'),
      ]);

    const scores = evaluatedSessions.map((session) => session.overallScore ?? session.score ?? 0);
    const averageInterviewScore =
      scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

    const recentScores = evaluatedSessions.slice(0, 5).map((session) => ({
      sessionId: session._id,
      score: session.overallScore ?? session.score ?? 0,
      category: session.category,
      difficulty: session.difficulty,
      createdAt: session.createdAt,
    }));

    const performanceTrend = [...evaluatedSessions]
      .reverse()
      .slice(-10)
      .map((session) => ({
        sessionId: session._id,
        score: session.overallScore ?? session.score ?? 0,
        createdAt: session.createdAt,
      }));

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
        averageInterviewScore,
        bestScore,
        evaluatedInterviewsCount: evaluatedSessions.length,
        recentScores,
        performanceTrend,
        totalResumesAnalyzed: totalResumes,
        latestAtsScore: latestResume?.atsScore ?? null,
        bestAtsScore: bestResume?.atsScore ?? null,
        latestResumeDate: latestResume?.createdAt || null,
      },
    });
  } catch (error) {
    next(error);
  }
};
