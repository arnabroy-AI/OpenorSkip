import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

// Cohort definitions matching the brief
export interface Persona {
  id: string;
  name: string;
  role: string;
  mrr: string;
  avatar: string;
  timeSensitivity: 'extreme' | 'high' | 'medium';
  primaryInterest: string;
  skepticism: 'high' | 'moderate' | 'low';
}

const DEFAULT_PERSONAS_FOUNDERS: Persona[] = [
  { id: 'p1', name: 'Liam Vance', role: 'Micro-SaaS Founder', mrr: '$4.2k MRR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'First 100 users tactics', skepticism: 'high' },
  { id: 'p2', name: 'Elena Rostova', role: 'Solo AI Tool Builder', mrr: '$12k MRR', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Automated distribution', skepticism: 'high' },
  { id: 'p3', name: 'Marcus Chen', role: 'Bootstrapped DevTool', mrr: '$850 MRR', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: '0 to 1 traction', skepticism: 'moderate' },
  { id: 'p4', name: 'Sarah Al-Mansoor', role: 'Solo Operator / Info-product', mrr: '$7.5k MRR', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Email funnel conversion', skepticism: 'moderate' },
  { id: 'p5', name: 'Devon Miller', role: 'B2B Workflow Automation', mrr: '$22k MRR', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Churn reduction', skepticism: 'high' },
  { id: 'p6', name: 'Amara Okafor', role: 'Indie Hacker & Creator', mrr: '$1.8k MRR', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Audience monetization', skepticism: 'moderate' },
  { id: 'p7', name: 'Henrik Lindqvist', role: 'Open Source Maintainer', mrr: '$3.1k MRR', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Developer adoption', skepticism: 'high' },
  { id: 'p8', name: 'Priya Sharma', role: 'No-Code Agency Founder', mrr: '$15k MRR', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Inbound client pipelines', skepticism: 'moderate' },
  { id: 'p9', name: 'Tariq Haddad', role: 'Bootstrapped Marketplace', mrr: '$9.2k MRR', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Liquidity & retention', skepticism: 'high' },
  { id: 'p10', name: 'Chloe Dubois', role: 'Single-Feature Utility SaaS', mrr: '$600 MRR', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Early acquisition channels', skepticism: 'moderate' },
  { id: 'p11', name: 'Kaelen Thorne', role: 'Indie Game Engine Tool', mrr: '$4.8k MRR', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Word-of-mouth loops', skepticism: 'high' },
  { id: 'p12', name: 'Zainab Qasim', role: 'SaaS Copywriter & Founder', mrr: '$11.5k MRR', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'High-converting hooks', skepticism: 'high' },
  { id: 'p13', name: 'Mateo Morales', role: 'Local Biz Lead-Gen SaaS', mrr: '$19k MRR', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Cold email & onboarding', skepticism: 'moderate' },
  { id: 'p14', name: 'Jonas Richter', role: 'Solo Analytics Extension', mrr: '$2.4k MRR', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Privacy & performance', skepticism: 'high' },
  { id: 'p15', name: 'Ananya Roy', role: 'Micro-Community Host', mrr: '$5.5k MRR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Engagement rates', skepticism: 'moderate' },
  { id: 'p16', name: 'David Park', role: 'Mobile Widget Developer', mrr: '$8.8k MRR', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'ASO and viral loops', skepticism: 'moderate' },
  { id: 'p17', name: 'Freja Nielsen', role: 'Bootstrapped CRM for Freelancers', mrr: '$14.2k MRR', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Referral engines', skepticism: 'high' },
  { id: 'p18', name: 'Gabriel Santos', role: 'Chrome Extension Suite', mrr: '$3.7k MRR', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'User onboarding', skepticism: 'high' },
  { id: 'p19', name: 'Hana Takahashi', role: 'Solo Technical Writer & Founder', mrr: '$6.9k MRR', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Clarity & proof', skepticism: 'high' },
  { id: 'p20', name: 'Owen Murphy', role: 'AI Podcast Transcriber SaaS', mrr: '$1.2k MRR', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Pricing & willingness to pay', skepticism: 'moderate' },
  { id: 'p21', name: 'Fatima Zahra', role: 'Bootstrapped LMS Plugin', mrr: '$9.4k MRR', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Affiliate distribution', skepticism: 'moderate' },
  { id: 'p22', name: 'Lukas Novak', role: 'Database Monitoring CLI', mrr: '$16k MRR', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Hard numbers & benchmarks', skepticism: 'high' },
  { id: 'p23', name: 'Camila Rossi', role: 'Notion Template Studio', mrr: '$4.1k MRR', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Product Hunt launches', skepticism: 'moderate' },
  { id: 'p24', name: 'Vikram Joshi', role: 'API Monitoring Service', mrr: '$27k MRR', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Enterprise pilots', skepticism: 'high' },
  { id: 'p25', name: 'Nadia Popov', role: 'Solopreneur Design Systems', mrr: '$8.3k MRR', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'High-ticket retainer leads', skepticism: 'moderate' },
  { id: 'p26', name: 'Eliot Vance', role: 'Solo Billing & Tax Micro-Tool', mrr: '$5.0k MRR', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Stripe conversion metrics', skepticism: 'high' },
  { id: 'p27', name: 'Sora Kim', role: 'Indie Screen Recorder', mrr: '$13k MRR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Twitter/X organic virality', skepticism: 'high' },
  { id: 'p28', name: 'Bram Van Dijk', role: 'SEO Automation for Shopify', mrr: '$7.8k MRR', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Algorithm updates & backlink velocity', skepticism: 'moderate' },
  { id: 'p29', name: 'Zoe Katsaros', role: 'Newsletter Advertising Broker', mrr: '$10.5k MRR', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Sponsor CPMs and CTR', skepticism: 'high' },
  { id: 'p30', name: 'Kieran Scott', role: 'Automated Invoice Chaser', mrr: '$3.9k MRR', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Payment recovery rates', skepticism: 'high' },
  { id: 'p31', name: 'Aaliyah Cole', role: 'Creator Accounting Spreadsheet', mrr: '$2.1k MRR', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Simple systems without jargon', skepticism: 'moderate' },
  { id: 'p32', name: 'Milan Stojkovic', role: 'Self-Hosted Password Tool', mrr: '$6.3k MRR', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Security and no marketing fluff', skepticism: 'high' },
  { id: 'p33', name: 'Leila Faris', role: 'B2B Cold Outreach Generator', mrr: '$18.5k MRR', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Reply rate benchmarks', skepticism: 'high' },
  { id: 'p34', name: 'Gareth Evans', role: 'Micro-Podcast Audio Cleaner', mrr: '$4.4k MRR', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Before-and-after audio tests', skepticism: 'moderate' },
  { id: 'p35', name: 'Yuki Tanaka', role: 'Kanban Desktop Mac App', mrr: '$9.0k MRR', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Clean minimalist UX', skepticism: 'high' },
  { id: 'p36', name: 'Dante Moretti', role: 'Feedback Widget for Webflow', mrr: '$1.5k MRR', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'First paying customer scripts', skepticism: 'moderate' },
  { id: 'p37', name: 'Simona Varga', role: 'Substack Growth Coach', mrr: '$11.0k MRR', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Subject lines and preview text', skepticism: 'high' },
  { id: 'p38', name: 'Elijah Brooks', role: 'Micro-SaaS Exit Broker', mrr: '$25k MRR', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'EBITDA multiples and valuation', skepticism: 'high' },
  { id: 'p39', name: 'Tanya Belova', role: 'Indie Landing Page Teardowns', mrr: '$5.7k MRR', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'high', primaryInterest: 'Specific conversion case studies', skepticism: 'high' },
  { id: 'p40', name: 'Arthur Pendelton', role: 'Bootstrapped Form Builder', mrr: '$17.2k MRR', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80', timeSensitivity: 'extreme', primaryInterest: 'Churn and annual prepay tactics', skepticism: 'high' }
];

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '5mb' }));

  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  let geminiQuotaCooloffUntil = 0;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: !!apiKey,
      personasAvailable: DEFAULT_PERSONAS_FOUNDERS.length,
      engine: 'Jev-TypeSafe / Gemini 3.8 Flash Hybrid',
    });
  });

  // Get Personas list
  app.get('/api/personas', (req: Request, res: Response) => {
    res.json({ personas: DEFAULT_PERSONAS_FOUNDERS });
  });

  // Simulate endpoint
  app.post('/api/simulate', async (req: Request, res: Response) => {
    const startTime = Date.now();
    try {
      const {
        titles = [],
        cohort = 'bootstrapped_founders',
        sampleSize = 40,
        newsletterContext = 'Tuesday founder newsletter issue',
      } = req.body;

      if (!Array.isArray(titles) || titles.length < 2) {
        return res.status(400).json({ error: 'Please provide at least 2 titles to compare.' });
      }

      const cleanTitles = titles.map((t: string) => (typeof t === 'string' ? t.trim() : '')).filter(Boolean);
      if (cleanTitles.length < 2) {
        return res.status(400).json({ error: 'Please provide at least 2 non-empty titles.' });
      }

      const activePersonas = DEFAULT_PERSONAS_FOUNDERS.slice(0, Math.min(sampleSize, DEFAULT_PERSONAS_FOUNDERS.length));
      const targetCount = activePersonas.length;

      // Attempt Gemini 3.8 Flash structured decision call if key is present and not cooling off
      if (ai && Date.now() > geminiQuotaCooloffUntil) {
        try {
          const prompt = `You are the Jev-TypeSafe decision engine. You simulate a panel of exactly ${targetCount} bootstrapped startup founders who have an overflowing inbox.
Analyze how each founder reacts to the following 2 or 3 newsletter subject lines in the minute before they decide whether to open or skip:
${cleanTitles.map((t, idx) => `Title [${idx}]: "${t}"`).join('\n')}

Target Audience Cohort: ${cohort} (Context: ${newsletterContext})
Key Founder Behaviors:
- Specific numbers, proof, concrete "how-to" tactics, and high leverage lessons trigger "open".
- Vague musings, cliché phrases ("Some thoughts on...", "Musings", "Updates from..."), and lazy clickbait trigger "skip".
- Confusing or ambiguous phrasing triggers "confused" (which defaults to skip in real life).

Output strict JSON with exact integer counts for each title across the ${targetCount} personas, such that opens + skips + confused = ${targetCount}.
Also identify specific trigger words that caused opens or skips, and brief 1-sentence micro-reactions for 12 representative personas from the panel.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  titleResults: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        titleIndex: { type: Type.INTEGER },
                        titleText: { type: Type.STRING },
                        opens: { type: Type.INTEGER },
                        skips: { type: Type.INTEGER },
                        confused: { type: Type.INTEGER },
                        openRate: { type: Type.NUMBER },
                        verdict: { type: Type.STRING },
                        oneLineSummary: { type: Type.STRING },
                        triggerWordsPositive: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              word: { type: Type.STRING },
                              impact: { type: Type.STRING },
                              personaQuote: { type: Type.STRING }
                            },
                            required: ['word', 'impact']
                          }
                        },
                        triggerWordsNegative: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              word: { type: Type.STRING },
                              impact: { type: Type.STRING },
                              personaQuote: { type: Type.STRING }
                            },
                            required: ['word', 'impact']
                          }
                        }
                      },
                      required: ['titleIndex', 'opens', 'skips', 'confused', 'openRate', 'verdict', 'triggerWordsPositive', 'triggerWordsNegative']
                    }
                  },
                  winnerIndex: { type: Type.INTEGER },
                  expectedLiftPercent: { type: Type.NUMBER },
                  recommendationSummary: { type: Type.STRING },
                  personaReactions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        personaId: { type: Type.STRING },
                        personaName: { type: Type.STRING },
                        chosenActionByTitle: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              titleIndex: { type: Type.INTEGER },
                              action: { type: Type.STRING }, // "open" | "skip" | "confused"
                              thought: { type: Type.STRING }
                            },
                            required: ['titleIndex', 'action', 'thought']
                          }
                        }
                      },
                      required: ['personaName', 'chosenActionByTitle']
                    }
                  }
                },
                required: ['titleResults', 'winnerIndex', 'expectedLiftPercent', 'recommendationSummary']
              }
            }
          });

          const parsed = JSON.parse(response.text || '{}');
          if (parsed && Array.isArray(parsed.titleResults) && parsed.titleResults.length >= cleanTitles.length) {
            const latencyMs = Date.now() - startTime;
            
            // Map reactions onto all personas
            const fullPersonaMap = activePersonas.map((p, idx) => {
              const matchedAiPersona = parsed.personaReactions?.[idx % (parsed.personaReactions?.length || 1)];
              return {
                id: p.id,
                name: p.name,
                role: p.role,
                mrr: p.mrr,
                avatar: p.avatar,
                decisions: cleanTitles.map((t, tIdx) => {
                  const aiChoice = matchedAiPersona?.chosenActionByTitle?.find((c: any) => c.titleIndex === tIdx);
                  const titleRes = parsed.titleResults[tIdx];
                  // Derive action if not explicitly matched
                  let action: 'open' | 'skip' | 'confused' = 'open';
                  if (aiChoice?.action) {
                    action = aiChoice.action.toLowerCase() as any;
                  } else {
                    const prob = (titleRes?.opens || 20) / targetCount;
                    action = (idx / targetCount) < prob ? 'open' : 'skip';
                  }
                  return {
                    titleIndex: tIdx,
                    action: (action === 'open' || action === 'skip' || action === 'confused') ? action : 'skip',
                    reason: aiChoice?.thought || (action === 'open' ? 'Relevant to current bottleneck.' : 'Feels generic or low urgency.'),
                    keyWord: (action === 'open' ? titleRes?.triggerWordsPositive?.[0]?.word : titleRes?.triggerWordsNegative?.[0]?.word) || ''
                  };
                })
              };
            });

            return res.json({
              success: true,
              engine: 'gemini-3.8-flash (Decision Mode)',
              latencyMs,
              sampleSize: targetCount,
              titles: cleanTitles,
              titleResults: parsed.titleResults,
              winnerIndex: parsed.winnerIndex,
              expectedLiftPercent: parsed.expectedLiftPercent,
              recommendationSummary: parsed.recommendationSummary,
              personas: fullPersonaMap
            });
          }
        } catch (genErr: any) {
          const msg = String(genErr?.message || genErr || '');
          if (msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
            // Activate cooloff to protect rate limits and prevent repeated log alerts
            geminiQuotaCooloffUntil = Date.now() + 1000 * 60 * 30;
          }
          // Fall through to deterministic decision engine smoothly
        }
      }

      // Fast Deterministic Decision Engine (simulating Jev model speed & rules)
      const simulation = computeDeterministicDecision(cleanTitles, activePersonas);
      const latencyMs = Date.now() - startTime;

      return res.json({
        success: true,
        engine: 'Jev Fast Structured Engine (Local Calibration)',
        latencyMs,
        sampleSize: targetCount,
        titles: cleanTitles,
        ...simulation
      });

    } catch (err: any) {
      console.error('Simulate route error:', err);
      res.status(500).json({ error: err?.message || 'Failed to simulate personas' });
    }
  });

  // Alternatives generator
  app.post('/api/generate-alternatives', async (req: Request, res: Response) => {
    try {
      const { draftTitle = '', issueTopic = '' } = req.body;
      if (!draftTitle && !issueTopic) {
        return res.status(400).json({ error: 'Please provide a draft title or topic' });
      }

      if (ai && Date.now() > geminiQuotaCooloffUntil) {
        try {
          const prompt = `You are a newsletter subject line specialist for solo founders and micro-SaaS builders.
Given the draft subject line: "${draftTitle}" (Topic: "${issueTopic}"), generate exactly 3 sharp, distinct subject line variations:
1. High-Curiosity / Specific Proof (contains exact numbers or case study proof)
2. Direct Action / Swipe File (immediately gives actionable template or insight)
3. Contrarian / Counter-Intuitive (challenges conventional wisdom)

Return JSON with an array of strings: { "suggestions": [ "Title 1", "Title 2", "Title 3" ] }`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  suggestions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ['suggestions']
              }
            }
          });

          const data = JSON.parse(response.text || '{}');
          if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
            return res.json({ suggestions: data.suggestions });
          }
        } catch (e: any) {
          const msg = String(e?.message || e || '');
          if (msg.includes('429') || msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')) {
            geminiQuotaCooloffUntil = Date.now() + 1000 * 60 * 30;
          }
        }
      }

      // Dynamic rule-based alternatives generator based on input topic
      const base = draftTitle.trim() || issueTopic.trim() || 'newsletter growth';
      const cleanTopic = base.replace(/^(newsletter #?\d*:?|issue #?\d*:?|some thoughts on|thoughts on|how to|why)\s*/i, '').trim() || 'growth';

      const suggestions = [
        `How I got my first 100 paying users using ${cleanTopic} (exact timeline)`,
        `Steal our ${cleanTopic} teardown swipe file (42% conversion rate)`,
        `Why traditional advice on "${cleanTopic}" is killing your Tuesday open rate`
      ];
      return res.json({ suggestions });

    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Serve public and brag-output assets
  app.use(express.static(path.resolve(__dirname, 'public')));
  app.use('/brag-output', express.static(path.resolve(__dirname, 'brag-output')));

  // Mount Vite middlewares in development
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[OpenOrSkip] Server running on port ${PORT} (isProd: ${isProd})`);
  });
}

// Deterministic Decision Engine implementing Jev principles
function computeDeterministicDecision(titles: string[], personas: Persona[]) {
  const targetCount = personas.length;

  // Analysis helpers
  const positiveTriggers = ['how i', '100', 'first', 'paying users', 'exact', 'steal', 'teardown', 'template', '$', 'conversion', 'reply rate', 'case study', 'breakdown', '0 to', 'step-by-step', 'pricing'];
  const negativeTriggers = ['some thoughts', 'thoughts on', 'this week', 'musings', 'updates', 'ramblings', 'random', 'quick update', 'newsletter #', 'issue #', 'checking in'];

  const titleScores = titles.map((title, tIdx) => {
    const lower = title.toLowerCase();
    let score = 50; // base

    // Numbers & specificity
    const hasNumbers = /\d+/.test(title);
    if (hasNumbers) score += 18;

    // Length penalty (too long or too short)
    const words = title.split(/\s+/).filter(Boolean);
    if (words.length >= 4 && words.length <= 9) score += 10;
    else if (words.length > 12) score -= 8;
    else if (words.length <= 2) score -= 12;

    // Positive triggers
    const matchedPos: Array<{ word: string, impact: string, count: number }> = [];
    positiveTriggers.forEach(pt => {
      if (lower.includes(pt)) {
        score += 15;
        matchedPos.push({ word: pt, impact: 'High credibility and clear ROI', count: 18 });
      }
    });

    // Negative triggers
    const matchedNeg: Array<{ word: string, impact: string, count: number }> = [];
    negativeTriggers.forEach(nt => {
      if (lower.includes(nt)) {
        score -= 28;
        matchedNeg.push({ word: nt, impact: 'Passive, low-urgency, sounds like personal diary', count: 24 });
      }
    });

    // Question mark
    if (title.includes('?')) {
      score += 4;
    }

    return {
      tIdx,
      title,
      rawScore: Math.max(15, Math.min(92, score)),
      matchedPos: matchedPos.length > 0 ? matchedPos : [{ word: words[0] || 'Hook', impact: 'Opening clarity', count: 12 }],
      matchedNeg: matchedNeg.length > 0 ? matchedNeg : (words.length > 10 ? [{ word: 'Title length', impact: 'Trunacted on mobile screens', count: 9 }] : [])
    };
  });

  // Calculate opens & skips out of targetCount
  const titleResults = titleScores.map((ts) => {
    const ratio = ts.rawScore / 100;
    let opens = Math.round(targetCount * ratio);
    let confused = Math.round(targetCount * (ts.rawScore < 40 ? 0.15 : 0.05));
    if (opens + confused > targetCount) {
      opens = targetCount - confused;
    }
    const skips = Math.max(0, targetCount - opens - confused);
    const openRate = Number(((opens / targetCount) * 100).toFixed(1));

    let verdict = 'Moderate engagement';
    let oneLineSummary = 'Reasonable interest among casual readers.';
    if (openRate >= 65) {
      verdict = 'Strong Clear Winner';
      oneLineSummary = 'Immediate curiosity with concrete founder proof.';
    } else if (openRate <= 35) {
      verdict = 'High Skip Risk';
      oneLineSummary = 'Sounds passive; founders skip during quick morning scans.';
    }

    return {
      titleIndex: ts.tIdx,
      titleText: ts.title,
      opens,
      skips,
      confused,
      openRate,
      verdict,
      oneLineSummary,
      triggerWordsPositive: ts.matchedPos,
      triggerWordsNegative: ts.matchedNeg
    };
  });

  // Find winner
  let winnerIndex = 0;
  let maxOpens = -1;
  titleResults.forEach((tr, i) => {
    if (tr.opens > maxOpens) {
      maxOpens = tr.opens;
      winnerIndex = i;
    }
  });

  const runnerUp = titleResults.filter((_, i) => i !== winnerIndex).sort((a, b) => b.opens - a.opens)[0];
  const liftPct = runnerUp ? Number((((titleResults[winnerIndex].opens - runnerUp.opens) / Math.max(1, runnerUp.opens)) * 100).toFixed(1)) : 24.5;

  // Build persona reactions
  const personaMap = personas.map((p, idx) => {
    return {
      id: p.id,
      name: p.name,
      role: p.role,
      mrr: p.mrr,
      avatar: p.avatar,
      decisions: titles.map((t, tIdx) => {
        const titleRes = titleResults[tIdx];
        const threshold = (titleRes.opens / targetCount);
        // Slightly correlate with timeSensitivity and skepticism
        const modifier = (p.skepticism === 'high' ? -0.1 : 0.05) + (p.timeSensitivity === 'extreme' ? -0.05 : 0.05);
        const personaRoll = ((idx * 7 + tIdx * 13) % 100) / 100;
        
        let action: 'open' | 'skip' | 'confused' = 'skip';
        if (personaRoll < (threshold + modifier)) {
          action = 'open';
        } else if (personaRoll < (threshold + modifier + 0.08) && titleRes.openRate < 45) {
          action = 'confused';
        }

        let reason = '';
        if (action === 'open') {
          reason = `I specifically look for ${p.primaryInterest.toLowerCase()}; this sounds concrete.`;
        } else if (action === 'skip') {
          reason = p.timeSensitivity === 'extreme' ? `Inbox is overflowing. I skip vague titles without numbers.` : `Feels like a diary entry; no immediate takeaway.`;
        } else {
          reason = `Not clear what problem is being solved before I click.`;
        }

        const keyWord = action === 'open' 
          ? (titleRes.triggerWordsPositive[0]?.word || 'Direct')
          : (titleRes.triggerWordsNegative[0]?.word || 'Vague tone');

        return {
          titleIndex: tIdx,
          action,
          reason,
          keyWord
        };
      })
    };
  });

  return {
    titleResults,
    winnerIndex,
    expectedLiftPercent: Math.max(4.2, liftPct),
    recommendationSummary: `Send Option ${String.fromCharCode(65 + winnerIndex)} ("${titles[winnerIndex]}"). It delivers ${titleResults[winnerIndex].opens}/${targetCount} opens (+${Math.max(4.2, liftPct)}% lift), converting high-skepticism founders.`,
    personas: personaMap
  };
}

startServer();
