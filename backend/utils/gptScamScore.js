import dotenv from 'dotenv';
dotenv.config();
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

async function getCohereScamScore(description) {
  const prompt = `
You're a scam detection bot. Analyze the job description below and return:
- A scam score from 0 (safe) to 100 (scam)
- 1–2 reasons why it seems suspicious or safe

Description:
"""
${description}
"""

Respond in JSON like:
{
  "scamScore": 82,
  "reasons": ["No company info", "Payment before hiring"]
}
`;

  try {
    const response = await cohere.chat({
      model: 'command-r',
      message: prompt,
      temperature: 0.3,
      max_tokens: 150,
    });

    let text = response.text.trim();

    // Remove Markdown code block if present
    if (text.startsWith('```')) {
      text = text.replace(/```json|```/g, '').trim();
    }

    return JSON.parse(text);
  } catch (err) {
    console.error('Cohere error:', err.message);
    return { scamScore: 0, reasons: ['Cohere error — defaulting to 0'] };
  }
}

export default getCohereScamScore;
