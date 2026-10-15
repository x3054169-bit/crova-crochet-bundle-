import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // Initialize Google Gen AI SDK
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Multi-turn Chatbot endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      // Convert conversation history to Gemini parts
      const formattedContents = messages.map((m: { role: 'user' | 'model'; text: string }) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const systemPrompt = `You are the friendly, expert Crova Crochet AI Assistant (क्रोवा क्रोशिया असिस्टेंट) for "Crova - The Ultimate Crochet Mastery Bundle" (2200+ Patterns & Video Course).

YOUR GOAL:
Answer customer questions about the crochet bundle clearly, warmly, and helpfully.

LANGUAGE RULES (VERY IMPORTANT):
- TRILINGUAL SUPPORT: You fluently understand and speak Hindi (हिंदी), English, and Hinglish (Hindi written in English alphabet/Roman script).
- MATCH THE USER'S LANGUAGE:
  * If the user asks in Hindi (Devanagari), reply in polite, fluent Hindi.
  * If the user asks in Hinglish (e.g., "patterns kaise milenge?", "kya beginners ke liye thik hai?", "video course hindi me hai?"), reply in natural, conversational Hinglish (e.g., "Haan ji! Yeh bundle absolute beginners ke liye perfect hai...").
  * If the user asks in English, reply in crisp, helpful English.
  * You can also use friendly bilingual phrasing where appropriate.

KEY FACTS ABOUT THE BUNDLE:
- Price: Only ₹199 (Limited time launch discount, marked down from ₹2,999/-).
- Patterns: 2200+ step-by-step crochet patterns across 20+ categories (Amigurumi toys, animals, bags, blankets, baby booties, home decor, festival designs, keychains, superhero/cartoon characters).
- Course/Tutorials: Step-by-step video masterclass in BOTH Hindi and English. Teaches basic stitches, magic loop/circle, tension control, pattern reading, and finishing.
- Delivery: Instant digital download. Immediate access link appears on screen right after payment, plus a copy is sent to the customer's email and WhatsApp.
- Device Compatibility: Works on smartphones (Android, iPhone), tablets, laptops, and PCs. All patterns are high-resolution PDFs that can also be printed.
- Validity: Lifetime access with free future pattern updates. One-time payment of ₹199, zero recurring fees.
- Payment Methods: 100% safe checkout with UPI (Google Pay, PhonePe, Paytm, BHIM), Cards (Debit/Credit), and NetBanking.
- 6 Free Bonuses Included (Worth ₹3,999):
  1. Complete Video Masterclass (Hindi + English)
  2. Premium Amigurumi Formula Ebook
  3. Yarn & Hook Conversion Cheat Sheet
  4. Crochet Business & Pricing Calculator Guide
  5. Comprehensive 5000+ Page Crochet Stitch Bible
  6. Printable Crochet Project Planner

TONE:
- Warm, polite, encouraging ("Ji bilkul!", "Great question!").
- Keep responses readable, friendly, and structured (use bullet points when listing features).
- When appropriate, encourage the user to click the "GET THIS FULL BUNDLE @ ₹199" button to grab the offer before it ends.`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: formattedContents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });
      } catch (primaryErr) {
        console.warn('Fast model busy, trying gemini-3.8-flash:', primaryErr);
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: formattedContents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });
      }

      const replyText = response.text || 'Namaste! Main abhi aapki help karne me samarth nahi hoon. Kripya thodi der baad try karein ya WhatsApp support par contact karein.';
      return res.json({ reply: replyText });
    } catch (error: unknown) {
      console.error('Error generating chat response:', error);
      return res.status(500).json({ error: 'Failed to process request. Please try again.' });
    }
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
