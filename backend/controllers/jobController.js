import JobReport from '../models/JobReport.js';
import analyzeJob from '../utils/scamDetector.js';
import getCohereScamScore from '../utils/gptScamScore.js';
import Tesseract from 'tesseract.js';
import fs from 'fs';

export const submitJobReport = async (req, res) => {
  try {
    const { title, company, description, link } = req.body;
    let jobText = description;

    if (req.file) {
      const ocr = await Tesseract.recognize(req.file.path, 'eng');
      jobText += `\n${ocr.data.text}`;
      fs.unlinkSync(req.file.path);
    }

    const { scamScore, reasons } = await getCohereScamScore(jobText);

    const job = await JobReport.create({
      user: req.user._id,
      title,
      company,
      description: jobText,
      link,
      scamScore,
      scamReasons: reasons,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error('Job submission error:', err.message);
    res.status(500).json({ error: 'Submission failed' });
  }
};

export const getUserReports = async (req, res) => {
  const reports = await JobReport.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(reports);
};

export const getPublicJobs = async (req, res) => {
  try {
    const jobs = await JobReport.find().sort({ createdAt: -1 });

    const enriched = jobs.map((job) => {
      const jobObj = job.toObject();
      jobObj.upvotes = job.votes.filter(v => v.vote === 1).length;
      jobObj.downvotes = job.votes.filter(v => v.vote === -1).length;
      return jobObj;
    });

    res.json(enriched);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const voteOnJob = async (req, res) => {
  const { vote } = req.body;

  if (![1, -1].includes(vote)) {
    return res.status(400).json({ error: 'Invalid vote value' });
  }

  const job = await JobReport.findById(req.params.id);
  if (!job) return res.status(404).json({ error: 'Job not found' });

  const existingVote = job.votes.find(
    (v) => v.user.toString() === req.user._id.toString()
  );

  if (existingVote) {
    existingVote.vote = vote;
  } else {
    job.votes.push({ user: req.user._id, vote });
  }

  await job.save();

  const upvotes = job.votes.filter(v => v.vote === 1).length;
  const downvotes = job.votes.filter(v => v.vote === -1).length;

  res.json({
    message: 'Vote recorded',
    upvotes,
    downvotes,
  });
};
