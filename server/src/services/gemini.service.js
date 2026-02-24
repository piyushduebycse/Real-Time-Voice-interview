import { GoogleGenerativeAI } from '@google/generative-ai';

const FEEDBACK_PROMPT = (question, transcript) => `
You are an expert interview coach evaluating a candidate's spoken response.

Question asked: "${question}"
Candidate's answer (transcribed): "${transcript}"

Evaluate the response and return ONLY valid JSON in this exact structure:
{
  "score": 0, // integer 1-10
  "clarity": "good", // one of: poor, fair, good, excellent
  "relevance": "relevant", // one of: off-topic, partial, relevant, highly-relevant
  "confidence": "moderate", // one of: low, moderate, high
  "summary": "2-sentence overall assessment",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "suggestedAnswer": "concise ideal answer in 3-5 sentences"
}

Be encouraging but honest. Focus on actionable feedback.
Return only the JSON object, no markdown, no explanation.
`;

const VAPI_FEEDBACK_PROMPT = (questions, transcript) => {
    const questionsBlock = questions.map((q, i) => `Q${i + 1}: ${q.text}`).join('\n');
    const transcriptBlock = transcript.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n');
    return `
You are an expert interview coach analyzing a completed voice interview session.

QUESTIONS ASKED (in order):
${questionsBlock}

FULL CONVERSATION TRANSCRIPT:
${transcriptBlock}

For each question, identify the candidate's spoken answer (all user turns following that question) and evaluate it.
Return ONLY a valid JSON array of exactly ${questions.length} objects, one per question in the same order.

Each object must match this exact schema:
[
  {
    "questionIndex": 0,
    "transcript": "the candidate's full spoken answer for this question",
    "score": 7,
    "clarity": "good",
    "relevance": "relevant",
    "confidence": "moderate",
    "summary": "2-sentence overall assessment of this specific answer",
    "strengths": ["strength 1", "strength 2"],
    "improvements": ["improvement 1", "improvement 2"],
    "suggestedAnswer": "concise ideal answer in 3-5 sentences"
  }
]

Valid enum values:
- clarity: poor, fair, good, excellent
- relevance: off-topic, partial, relevant, highly-relevant
- confidence: low, moderate, high
- score: integer 1-10

If a question was not answered, still include its object with score 1, transcript "No answer provided", and appropriate feedback.
Be encouraging but honest. Return only the JSON array, no markdown, no explanation.
`;
};

export const generateFeedback = async (question, transcript) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not configured');
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(FEEDBACK_PROMPT(question, transcript));
        let text = result.response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
    } catch (error) {
        console.error('Gemini Feedback Error:', error);
        const err = new Error('Failed to generate interview feedback. Please try again.');
        err.statusCode = 502;
        err.isOperational = true;
        throw err;
    }
};

export const generateVapiFeedback = async (questions, transcript) => {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY is not configured');
        }
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(VAPI_FEEDBACK_PROMPT(questions, transcript));
        let text = result.response.text();
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) throw new Error('Expected JSON array from Gemini');
        return parsed;
    } catch (error) {
        console.error('Gemini Vapi Feedback Error:', error);
        // Attach a statusCode so the error handler treats this as a 502 (bad gateway) instead of 500
        const err = new Error('Failed to generate interview feedback. Please try again.');
        err.statusCode = 502;
        err.isOperational = true;
        throw err;
    }
};
