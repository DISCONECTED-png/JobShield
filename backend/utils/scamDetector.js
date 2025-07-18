/**
 * Analyze job description using simple keyword detection.
 * AI integration can be added later for enhanced scoring.
 * @param {string} description - Job post text
 * @returns {{ scamScore: number, scamReasons: string[] }}
 */
export default function analyzeJob(description = '') {
  let score = 0;
  const reasons = [];

  // Static keyword-based rules
  const redFlags = [
    { keyword: 'pay for training', points: 20 },
    { keyword: 'urgent requirement', points: 10 },
    { keyword: 'no experience needed', points: 15 },
    { keyword: 'quick money', points: 25 },
    { keyword: 'gmail.com', points: 10 },
    { keyword: 'click below', points: 15 },
    { keyword: 'whatsapp only', points: 20 },
  ];

  const lowerDesc = description.toLowerCase();

  redFlags.forEach(rule => {
    if (lowerDesc.includes(rule.keyword)) {
      score += rule.points;
      reasons.push(`Matched keyword: "${rule.keyword}"`);
    }
  });

  if (score > 100) score = 100;

  return { scamScore: score, scamReasons: reasons };
}
