import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cron from 'node-cron';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import radarRoutes from './routes/radarRoutes.js';
import scrapeJobSites from './scraper/scanner.js';
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/radar', radarRoutes);

cron.schedule('*/10 * * * *', () => {
  console.log('🕒 Cron: scraping every 10 minutes');
  scrapeJobSites();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
