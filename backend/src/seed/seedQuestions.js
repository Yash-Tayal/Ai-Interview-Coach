import mongoose from 'mongoose';
import { env } from '../config/env.js';
import Question from '../models/Question.js';
import { questionData } from './questionData.js';

const seedQuestions = async () => {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log('Connected to MongoDB');

    await Question.deleteMany({});
    console.log('Cleared existing questions');

    await Question.insertMany(questionData);
    console.log(`Seeded ${questionData.length} questions`);

    const count = await Question.countDocuments();
    console.log(`Total questions in database: ${count}`);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedQuestions();
