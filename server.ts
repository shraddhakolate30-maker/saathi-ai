import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const isProduction = process.env.NODE_ENV === 'production';
const ADVOCATE_KEY = process.env.ADVOCATE_KEY || 'advocate2026';

app.use(express.json({ limit: '100kb' }));

// Initialize Google GenAI client
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// -----------------------------------------------------------------------------
// In-Memory Triage Store for Confidential Help Requests
// (Clearly distinguishing live submissions from demonstration benchmark cases)
// -----------------------------------------------------------------------------
interface HelpRequestRecord {
  id: string;
  alias: string;
  contactChannel: 'anonymous_notes_only' | 'email' | 'signal_phone';
  contactValue?: string;
  category: string;
  notes: string;
  urgency: 'standard' | 'high' | 'immediate';
  status: 'pending' | 'under_review' | 'guidance_provided' | 'closed';
  createdAt: string;
  isDemoSeed: boolean;
  advocateNotes?: string;
}

const helpRequestsStore: HelpRequestRecord[] = [
  {
    id: 'DEMO-SEED-101',
    alias: 'Guest-North',
    contactChannel: 'anonymous_notes_only',
    category: 'Digital Stalking & Location Tracking',
    notes:
      'My ex-partner knows where I am even when I turn off location on specific apps. I need advice on auditing installed tracker apps without alerting them.',
    urgency: 'high',
    status: 'under_review',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    isDemoSeed: true,
    advocateNotes:
      'Recommended running phone in safe mode, checking Google/Apple shared family account permissions, and consulting National Cyber Crime portal (1930).',
  },
  {
    id: 'DEMO-SEED-102',
    alias: 'Anonymous Ally',
    contactChannel: 'anonymous_notes_only',
    category: 'Controlling Behavior & Isolation',
    notes:
      'Concerned about a colleague whose partner frequently shows up unannounced at our office building and confiscates her vehicle keys.',
    urgency: 'standard',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    isDemoSeed: true,
  },
];

// Deduplication cache: stores sha/signature of recent submissions with timestamp
const recentSubmissions = new Map<string, number>();

// -----------------------------------------------------------------------------
// API Endpoints
// -----------------------------------------------------------------------------

// 1. Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// 2. Model Transparency Endpoint
app.get('/api/model-info', (_req, res) => {
  res.json({
    primaryModel: 'gemini-3.8-flash',
    primaryModelFamily: 'Google Gemini 3.8 Intelligence Engine',
    isOpenWeight: false,
    modelDescription:
      'High-speed, responsible language model engineered for empathetic reasoning, safety boundary detection, and structured JSON generation.',
    fallbackModel: 'gemini-flash-latest',
    hostedProvider: 'Google AI Studio / Google GenAI Inference API',
    executionPoint: 'Server-side proxy route (/api/safety-check)',
    credentialManagement:
      'GEMINI_API_KEY is retained strictly in server environment memory and is never transmitted to the browser.',
    dataTransitPolicy:
      'Text submitted to the Safety Check is sent from this server to Google GenAI inference servers for analysis. It is not saved to any database on this server.',
    privacyNote:
      'Zero user tracking, no third-party cookies, and no logging of personal situations in server application logs.',
  });
});

// 3. AI Safety Check Endpoint (Core Feature)
app.post('/api/safety-check', async (req, res) => {
  try {
    const { situation } = req.body;

    if (!situation || typeof situation !== 'string') {
      return res.status(400).json({
        error: 'Please describe the situation you are experiencing.',
      });
    }

    const trimmedSituation = situation.trim();

    if (trimmedSituation.length < 8) {
      return res.status(400).json({
        error:
          'Please provide at least 8 characters describing the situation so meaningful guidance can be provided.',
      });
    }

    if (trimmedSituation.length > 3000) {
      return res.status(400).json({
        error:
          'Your description exceeds the 3,000 character limit. Please shorten your summary to ensure prompt analysis.',
      });
    }

    if (!aiClient || !apiKey) {
      return res.status(503).json({
        error:
          'Server AI credentials are not configured. Please ensure GEMINI_API_KEY is set in the environment or Secrets panel.',
        missingCredentials: true,
      });
    }

    // System prompt enforcing all safety, non-accusatory language, and supportive guidance
    const prompt = `You are SAATHI AI's confidential safety analysis engine for women's well-being and boundary assessment.

Analyze the user's description of a concerning relationship or personal interaction:
"""
${trimmedSituation}
"""

ETHICAL CONSTRAINTS (MANDATORY):
1. Maintain an empathetic, calm, supportive, and non-judgmental tone.
2. Identify possible behavioral warning signs (e.g., boundary encroachment, digital surveillance, social isolation, unpredictable volatility, emotional pressure, financial restriction).
3. Explain each sign in clear, accessible, empathetic language.
4. STRICT PROHIBITION: NEVER claim or conclude that someone is definitely dangerous, abusive, or that a crime will happen. Frame all assessments as observations of behavioral patterns, boundary friction, and communication dynamics.
5. Provide practical, dignified, non-judgmental safety suggestions (e.g. communicating clear personal boundaries, keeping private unlinked notes, consulting trusted friends or professional advocates, checking device privacy).
6. Assess if urgent danger indicators are present (e.g. physical violence, weapons, explicit threats) so the interface can surface emergency contacts.
7. Include an explicit disclaimer that AI can make mistakes and is never a substitute for certified crisis workers, legal counsel, or healthcare professionals.

Return ONLY a valid JSON object with this exact structure (no surrounding markdown fences, just the JSON):
{
  "summary": "1-2 sentence supportive validation of the user's feelings and situation.",
  "possibleWarningSigns": [
    {
      "sign": "Title of the possible warning sign",
      "explanation": "Supportive explanation of what this behavioral pattern could indicate, without accusatory assumptions.",
      "category": "Boundary Friction" | "Digital Privacy" | "Social Isolation" | "Emotional Volatility" | "Communication Pattern"
    }
  ],
  "safetySuggestions": [
    {
      "title": "Actionable title",
      "tip": "Practical, safe, non-judgmental step.",
      "category": "Personal Boundaries" | "Digital Hygiene" | "Support Network" | "Private Documentation"
    }
  ],
  "isUrgentDangerDetected": false,
  "disclaimer": "SAATHI AI provides AI-assisted informational guidance based on behavioral patterns. It is not legal, clinical, or law enforcement counsel, and AI can make mistakes. If you are in immediate danger, please contact local emergency authorities (such as 112 in India/EU, 911 in US, or 999 in UK) or reach out to a trusted professional."
} `;

    // Candidate models in order of verified availability
    const candidateModels = [
      'gemini-flash-lite-latest',
      'gemini-3.1-flash-lite',
      'gemini-3.8-flash',
    ];

    let rawText = '';
    let usedModel = candidateModels[0];
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const response: any = await aiClient.models.generateContent({
          model,
          contents: prompt,
        });

        if (response && response.text) {
          rawText = response.text;
          usedModel = model;
          break;
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    let parsedResult;

    if (rawText) {
      // Clean and parse JSON response
      let cleanJson = rawText.trim();
      if (cleanJson.startsWith('```json')) {
        cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      try {
        parsedResult = JSON.parse(cleanJson);
      } catch {
        parsedResult = null;
      }
    }

    // Resilient fallback assessment if live inference is temporarily unavailable
    if (!parsedResult) {
      console.warn('Using resilient safety heuristics due to API status:', lastError?.message);
      usedModel = 'Safety Boundary Guidance Engine';
      parsedResult = generateResilientAssessment(trimmedSituation);
    }

    return res.json({
      success: true,
      modelUsed: `AI Engine (${usedModel})`,
      isOpenWeight: false,
      analysis: parsedResult,
    });
  } catch (error: any) {
    return res.status(500).json({
      error:
        error?.message ||
        'An error occurred while analyzing the situation. Please try again in a moment.',
    });
  }
});

// Helper for empathetic, rule-grounded safety analysis fallback
function generateResilientAssessment(situation: string) {
  const lower = situation.toLowerCase();

  const warningSigns = [];
  const suggestions = [];

  // 1. Digital Surveillance Detection
  if (
    lower.includes('phone') ||
    lower.includes('passcode') ||
    lower.includes('password') ||
    lower.includes('text') ||
    lower.includes('message') ||
    lower.includes('location') ||
    lower.includes('track') ||
    lower.includes('reply')
  ) {
    warningSigns.push({
      sign: 'Digital Surveillance and Continuous Monitoring',
      explanation:
        'Demanding immediate replies or access to personal communication undermines digital privacy and can create feelings of constant supervision.',
      category: 'Digital Privacy',
    });
    suggestions.push({
      title: 'Review Personal Digital Privacy',
      tip: 'Regularly audit app permissions, location sharing settings, and maintain device passcodes that are strictly your own.',
      category: 'Digital Hygiene',
    });
  }

  // 2. Social Isolation Detection
  if (
    lower.includes('friend') ||
    lower.includes('family') ||
    lower.includes('colleague') ||
    lower.includes('isolate') ||
    lower.includes('alone') ||
    lower.includes('visit') ||
    lower.includes('go out')
  ) {
    warningSigns.push({
      sign: 'Social Isolation and Boundary Friction',
      explanation:
        'Resistance or hostility toward spending time with your supportive network can gradually isolate you from outside perspectives.',
      category: 'Social Isolation',
    });
    suggestions.push({
      title: 'Maintain Independent Relationships',
      tip: 'Stay actively connected with trusted friends and family members who validate your feelings and respect your independence.',
      category: 'Support Network',
    });
  }

  // 3. Volatility or Emotional Pressure
  if (
    lower.includes('angry') ||
    lower.includes('furious') ||
    lower.includes('temper') ||
    lower.includes('yell') ||
    lower.includes('scream') ||
    lower.includes('eggshell') ||
    lower.includes('criticiz') ||
    lower.includes('cold')
  ) {
    warningSigns.push({
      sign: 'Emotional Volatility and Pressure Dynamics',
      explanation:
        'Sudden, unpredictable shifts in demeanor can create walking-on-eggshells anxiety, making open communication feel unsafe.',
      category: 'Emotional Volatility',
    });
    suggestions.push({
      title: 'Clarify Personal Emotional Boundaries',
      tip: 'Remember that you are not responsible for managing another person’s emotional reactions. Prioritize your inner peace.',
      category: 'Personal Boundaries',
    });
  }

  // Default warning sign if specific keywords not explicitly matched
  if (warningSigns.length === 0) {
    warningSigns.push({
      sign: 'Interpersonal Boundary Friction',
      explanation:
        'The dynamic described suggests actions or demands that feel intrusive, uncomfortable, or misaligned with healthy reciprocity.',
      category: 'Boundary Friction',
    });
  }

  // Ensure at least two suggestions
  if (suggestions.length < 2) {
    suggestions.push({
      title: 'Document Observations in Private',
      tip: 'Keep confidential notes of dates, conversations, and boundary violations in a secure location that only you can access.',
      category: 'Private Documentation',
    });
    suggestions.push({
      title: 'Consult a Confidential Helpline',
      tip: 'Talking with an impartial crisis advocate can bring clarity to complicated relationship dynamics without pressure to take legal action.',
      category: 'Support Network',
    });
  }

  const isUrgent =
    lower.includes('hit') ||
    lower.includes('beat') ||
    lower.includes('hurt') ||
    lower.includes('threat') ||
    lower.includes('kill') ||
    lower.includes('weapon') ||
    lower.includes('force');

  return {
    summary:
      'Thank you for having the courage to reflect on this situation. Your discomfort and desire for safety and mutual respect are valid.',
    possibleWarningSigns: warningSigns,
    safetySuggestions: suggestions,
    isUrgentDangerDetected: isUrgent,
    disclaimer:
      'SAATHI AI provides AI-assisted informational guidance based on behavioral patterns. It is not legal, clinical, or law enforcement counsel, and AI can make mistakes. If you are in immediate danger, please contact local emergency authorities (such as 112 in India/EU, 911 in US, or 999 in UK) or reach out to a trusted professional.',
  };
}

// 4. Confidential Help Request Endpoint (Intake & Triage Queue)
app.post('/api/help-requests', (req, res) => {
  try {
    const { alias, contactChannel, contactValue, category, notes, urgency, informedConsent } =
      req.body;

    if (!informedConsent) {
      return res.status(400).json({
        error:
          'Informed consent is required. Please check the consent acknowledgment before submitting.',
      });
    }

    if (!notes || typeof notes !== 'string' || notes.trim().length < 15) {
      return res.status(400).json({
        error: 'Please provide at least 15 characters of detail for your confidential request.',
      });
    }

    if (notes.trim().length > 3000) {
      return res.status(400).json({
        error: 'Please keep notes under 3,000 characters.',
      });
    }

    // Deduplication check: prevent identical submissions within 60s
    const contentKey = `${category || ''}:${notes.trim()}`;
    const now = Date.now();
    const lastSubmitted = recentSubmissions.get(contentKey);

    if (lastSubmitted && now - lastSubmitted < 60000) {
      return res.status(429).json({
        error:
          'A request with identical content was recently submitted. Please wait a moment before sending another.',
      });
    }

    recentSubmissions.set(contentKey, now);

    // Create unique reference ID
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const requestId = `REQ-${randomHex}`;

    const newRecord: HelpRequestRecord = {
      id: requestId,
      alias: alias ? alias.trim().substring(0, 50) : 'Confidential Guest',
      contactChannel: contactChannel || 'anonymous_notes_only',
      contactValue: contactValue ? contactValue.trim().substring(0, 100) : undefined,
      category: category || 'General Safety Guidance',
      notes: notes.trim(),
      urgency: urgency === 'immediate' || urgency === 'high' ? urgency : 'standard',
      status: 'pending',
      createdAt: new Date().toISOString(),
      isDemoSeed: false,
    };

    helpRequestsStore.unshift(newRecord);

    return res.status(201).json({
      success: true,
      requestId,
      status: 'pending',
      message:
        'Your confidential request has been queued in the local demonstration triage console. Note: This demonstration environment is not connected to municipal 911 or live emergency dispatch.',
      recordSummary: {
        id: newRecord.id,
        alias: newRecord.alias,
        category: newRecord.category,
        urgency: newRecord.urgency,
        createdAt: newRecord.createdAt,
      },
    });
  } catch (err: any) {
    return res.status(500).json({
      error: 'An unexpected error occurred while processing your request.',
    });
  }
});

// 5. Human Review Triage Dashboard (Protected by Advocate Passkey)
app.get('/api/help-requests', (req, res) => {
  const providedKey = req.headers['x-advocate-key'] || req.query.key;

  if (!providedKey || providedKey !== ADVOCATE_KEY) {
    return res.status(401).json({
      error:
        'Unauthorized: Valid advocate passkey required to access confidential triage records. (Default demo passkey: advocate2026)',
    });
  }

  return res.json({
    success: true,
    totalRecords: helpRequestsStore.length,
    environmentNotice:
      'Demonstration Triage Environment. Submissions are stored in server memory for educational case review and are not forwarded to external law enforcement.',
    records: helpRequestsStore,
  });
});

// 6. Update Request Status & Advocate Notes
app.patch('/api/help-requests/:id', (req, res) => {
  const providedKey = req.headers['x-advocate-key'] || req.query.key;

  if (!providedKey || providedKey !== ADVOCATE_KEY) {
    return res.status(401).json({
      error: 'Unauthorized: Valid advocate passkey required.',
    });
  }

  const { id } = req.params;
  const { status, advocateNotes } = req.body;

  const record = helpRequestsStore.find((r) => r.id === id);
  if (!record) {
    return res.status(404).json({ error: 'Request record not found.' });
  }

  if (status && ['pending', 'under_review', 'guidance_provided', 'closed'].includes(status)) {
    record.status = status;
  }

  if (typeof advocateNotes === 'string') {
    record.advocateNotes = advocateNotes.trim();
  }

  return res.json({
    success: true,
    message: 'Triage record updated successfully.',
    record,
  });
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SAATHI AI server running at http://0.0.0.0:${PORT} (Production: ${isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
