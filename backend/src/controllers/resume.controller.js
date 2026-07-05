import fs from 'fs/promises';
import { PDFParse } from 'pdf-parse';
import Resume from '../models/Resume.js';
import { analyzeResume } from '../services/resumeAnalyzer.js';
import { AppError } from '../utils/AppError.js';

const formatResumeSummary = (resume) => ({
  _id: resume._id,
  originalFileName: resume.originalFileName,
  atsScore: resume.atsScore,
  detectedSkillsCount: resume.detectedSkills?.length || 0,
  createdAt: resume.createdAt,
});

export const uploadAndAnalyzeResume = async (req, res, next) => {
  let filePath = null;

  try {
    if (!req.file) {
      throw new AppError('Please upload a PDF resume file', 400);
    }

    filePath = req.file.path;
    const buffer = await fs.readFile(filePath);
    const parser = new PDFParse({ data: buffer });
    const textResult = await parser.getText();
    await parser.destroy();

    if (!textResult.text || textResult.text.trim().length < 50) {
      throw new AppError(
        'Could not extract enough text from the PDF. Ensure the resume is text-based, not a scanned image.',
        400
      );
    }

    const analysis = analyzeResume(textResult.text);

    const resume = await Resume.create({
      user: req.user._id,
      originalFileName: req.file.originalname,
      extractedText: analysis.extractedText,
      atsScore: analysis.atsScore,
      detectedSkills: analysis.detectedSkills,
      missingSkills: analysis.missingSkills,
      strengths: analysis.strengths,
      improvements: analysis.improvements,
    });

    res.status(201).json({
      success: true,
      message: 'Resume analyzed successfully',
      data: resume,
    });
  } catch (error) {
    next(error);
  } finally {
    if (filePath) {
      await fs.unlink(filePath).catch(() => {});
    }
  }
};

export const getResumeHistory = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('originalFileName atsScore detectedSkills createdAt');

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes.map(formatResumeSummary),
    });
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      throw new AppError('Resume analysis not found', 404);
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      throw new AppError('Not authorized to view this resume analysis', 403);
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    next(error);
  }
};
