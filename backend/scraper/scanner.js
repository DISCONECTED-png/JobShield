import puppeteer from 'puppeteer';
import ScamJob from '../models/ScamJob.js';
import { CohereClient } from 'cohere-ai';
import dotenv from 'dotenv';

dotenv.config();

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

async function getCohereScore(description) {
  const prompt = `
You are a strict JSON-only API. You are a scam detection bot. 
Analyze the job description below and return a JSON object with a "score" (0-100) and an array of "tags" (strings).

CRITICAL INSTRUCTION: Respond ONLY with valid JSON. Do not include any introductory text, conversational filler, or markdown formatting (no backticks).

Format:
{
  "score": 65,
  "tags": ["Missing company details", "Too-good-to-be-true salary"]
}

Job Description:
"""
${description}
"""
`;

  let rawText = "";
  
  try {
    const response = await cohere.chat({
      model: 'command-a-03-2025',
      message: prompt,
      temperature: 0.1,
      max_tokens: 150,
    });

    rawText = response.text.trim();
    

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("No valid JSON object found in the response.");
    }

    const cleanJsonText = jsonMatch[0]; 

    return JSON.parse(cleanJsonText);
  } catch (err) {
    console.error('❌ Cohere parse error:', err.message);
    if (rawText) {
      console.error('Raw text received from Cohere was:', rawText);
    }
    return null;
  }
}

export default async function scrapeRemoteOK() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  try {
    await page.goto('https://remoteok.com/remote-dev-jobs', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    await page.evaluate(() => window.scrollBy(0, 1000));
    await new Promise(resolve => setTimeout(resolve, 2000));

    const jobs = await page.$$eval('table#jobsboard > tbody > tr.job', rows => {
      return rows.map(row => {
        const title = row.querySelector('h2')?.innerText || '';
        const company = row.querySelector('.companyLink h3')?.innerText || '';
        const description = row.innerText || '';
        return { title: title.trim(), company: company.trim(), description: description.trim() };
      }).filter(job => job.title && job.company);
    });

    console.log(`🔍 Found ${jobs.length} jobs`);

    for (const job of jobs.slice(0, 10)) {
      const exists = await ScamJob.findOne({
        title: job.title,
        company: job.company,
        description: job.description,
      });
      
      if (exists) {
        console.log(`⚠️ Already exists: ${job.title} @ ${job.company}`);
        continue;
      }

      const analysis = await getCohereScore(job.description);
      if (!analysis) {
        console.warn(`🚫 Skipped (Cohere error): ${job.title}`);
        continue;
      }

      const newJob = new ScamJob({
        ...job,
        score: analysis.score,
        tags: analysis.tags,
        source: 'RemoteOK',
        timestamp: new Date(),
      });

      await newJob.save();
      console.log(`✅ Saved: ${job.title} @ ${job.company} | Score: ${analysis.score}`);
    }
  } catch (err) {
    console.error('❌ RemoteOK Scraper failed:', err.message);
  } finally {
    await browser.close();
  }
}
