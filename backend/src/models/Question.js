import mongoose from 'mongoose';

const CATEGORIES = ['JavaScript', 'React', 'Node.js', 'DSA'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: CATEGORIES,
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: DIFFICULTIES,
    },
    question: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

questionSchema.index({ category: 1, difficulty: 1 });

const Question = mongoose.model('Question', questionSchema);

export { CATEGORIES, DIFFICULTIES };
export default Question;
