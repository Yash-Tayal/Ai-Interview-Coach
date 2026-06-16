import mongoose from 'mongoose';

const questionItemSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    text: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const answerItemSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    text: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const evaluationItemSchema = new mongoose.Schema(
  {
    questionIndex: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    strengths: {
      type: [String],
      default: [],
    },
    improvements: {
      type: [String],
      default: [],
    },
    suggestedAnswer: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const overallFeedbackSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      default: '',
    },
    communicationRating: {
      type: Number,
      default: 0,
    },
    technicalRating: {
      type: Number,
      default: 0,
    },
    confidenceRating: {
      type: Number,
      default: 0,
    },
    finalFeedback: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionItemSchema],
      required: true,
    },
    answers: {
      type: [answerItemSchema],
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    evaluations: {
      type: [evaluationItemSchema],
      default: [],
    },
    overallScore: {
      type: Number,
      default: 0,
    },
    overallFeedback: {
      type: overallFeedbackSchema,
      default: () => ({}),
    },
    aiEvaluationCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

interviewSessionSchema.index({ user: 1, createdAt: -1 });

const InterviewSession = mongoose.model('InterviewSession', interviewSessionSchema);

export default InterviewSession;
