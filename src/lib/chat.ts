/**
 * SIRIZ INTERIORS - Design Concierge Chat Engine
 *
 * Architecture:
 * - Exports `async function* streamReply(message, context)` yielding word chunks (~25ms/word)
 *   to emulate a fluid AI model.
 * - Hybrid keyword scoring engine across 25+ architectural topics in /src/data/knowledge.ts.
 * - Handles bilingual EN/TA switching, visual style quiz, indicative estimate calculator,
 *   consultation slot reservation, and smart fallback suggestions.
 *
 * Future AI Backend Integration:
 * To swap this engine for Anthropic's Claude API:
 * ```ts
 * // Example backend Next.js / Express route:
 * // const response = await anthropic.messages.stream({
 * //   model: "claude-3-5-sonnet-20241022",
 * //   max_tokens: 1024,
 * //   system: "You are the senior design director at Siriz Interiors Chennai...",
 * //   messages: [{ role: "user", content: message }],
 * // });
 * // for await (const event of response) {
 * //   if (event.type === 'content_block_delta') yield event.delta.text;
 * // }
 * ```
 */

import { knowledgeBase, type KnowledgeEntry } from '../data/knowledge';
import { BASE_PACKAGES } from '../data/pricing';
import { type Language } from '../data/i18n';
import { media } from '../data/media';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  language?: Language;
  followUps?: string[];
  richType?: 'text' | 'quiz_style' | 'quiz_rooms' | 'quiz_specs' | 'moodboard' | 'estimate' | 'package' | 'project_carousel' | 'slot_picker' | 'lead_form' | 'contact_card';
  richData?: Record<string, any>;
  feedback?: 'like' | 'dislike';
}

export interface ConversationState {
  language: Language;
  userName?: string;
  userPhone?: string;
  quizStyle?: string;
  quizRooms?: string[];
  quizCarpetArea?: number;
  quizBudget?: string;
  quizTimeline?: string;
  quizPalette?: string[];
  currentPhase?: 'idle' | 'quiz' | 'estimate' | 'slot_booking' | 'lead_capture';
}

/**
 * Normalizes input text by removing punctuation and lowercasing.
 */
function cleanTokens(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^\w\s\u0B80-\u0BFF]/gi, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Scores each knowledge base topic against tokenized input.
 */
function findBestKnowledgeMatch(input: string, lang: Language): { entry: KnowledgeEntry | null; suggestions: string[] } {
  const tokens = cleanTokens(input);
  if (tokens.length === 0) {
    return { entry: null, suggestions: ['Find my style', 'Pricing & packages', 'Our 45-day process'] };
  }

  const scored = knowledgeBase.map((entry) => {
    let score = 0;
    const entryTokens = entry.keywords.map((k) => k.toLowerCase());

    for (const t of tokens) {
      for (const k of entryTokens) {
        if (k === t) score += 3;
        else if (k.includes(t) || t.includes(k)) score += 1.5;
      }
    }
    return { entry, score };
  });

  scored.sort((a, b) => b.score - a.score);

  if (scored[0] && scored[0].score >= 2) {
    return { entry: scored[0].entry, suggestions: scored[0].entry.followUps };
  }

  // Smart fallback: pick top 3 closest topics based on partial keyword overlap
  const fallbackSuggestions = scored.slice(0, 3).map((s) => {
    return lang === 'ta' && s.entry.answerTa ? s.entry.category : s.entry.followUps[0] || s.entry.category;
  });

  return { entry: null, suggestions: fallbackSuggestions.length ? fallbackSuggestions : ['Pricing & packages', 'Our 45-day process', 'Materials & BWP ply'] };
}

/**
 * Generates an asynchronous word-by-word stream for realistic AI response delivery.
 */
export async function* streamReply(
  userInput: string,
  state: ConversationState
): AsyncGenerator<{ textChunk: string; isComplete: boolean; fullMessage?: Partial<ChatMessage> }, void, unknown> {
  const lang = state.language || 'en';
  const inputLower = userInput.toLowerCase().trim();

  // 1. Check for Quiz triggers
  if (inputLower.includes('style') || inputLower.includes('quiz') || inputLower.includes('find my style')) {
    const promptText = lang === 'ta'
      ? 'சிறந்த இல்ல வடிவமைப்பிற்கு உங்கள் விருப்பமான அழகியல் பாணியை தேர்ந்தெடுங்கள்:'
      : 'Let us discover the aesthetic soul of your home. Select the architectural dialect that speaks to you:';

    const words = promptText.split(' ');
    let currentText = '';
    for (const word of words) {
      currentText += (currentText ? ' ' : '') + word;
      yield { textChunk: currentText, isComplete: false };
      await new Promise((r) => setTimeout(r, 25));
    }

    yield {
      textChunk: currentText,
      isComplete: true,
      fullMessage: {
        text: currentText,
        richType: 'quiz_style',
        richData: {
          styles: [
            { id: 'modern_luxury', name: 'Modern Luxury', image: media.projects[0].coverImage, desc: 'Travertine marble, warm brushed brass, fluted oak joinery' },
            { id: 'contemporary', name: 'Contemporary Architectural', image: media.projects[1].coverImage, desc: 'Understated neutral palettes, acoustic panelling, concealed doors' },
            { id: 'traditional_fusion', name: 'Traditional South Indian', image: media.projects[4].coverImage, desc: 'Teakwood jaali, Makrana white marble sanctum, brass bell chimes' },
            { id: 'minimal_scandi', name: 'Minimal Scandinavian', image: media.projects[2].coverImage, desc: 'Light warm oak, soft lime-wash plaster, diffused daylight' },
          ],
        },
      },
    };
    return;
  }

  // 2. Check for Estimate / Pricing Calculator triggers
  if (inputLower.includes('estimate') || inputLower.includes('calculate') || inputLower.includes('calculator') || inputLower.includes('cost helper')) {
    const introText = lang === 'ta'
      ? 'எங்கள் உடனடி மதிப்பீட்டாளர் மூலம் உங்கள் வீட்டிற்கான உத்தேச முதலீட்டை கணக்கிடுங்கள்:'
      : 'Here is our interactive estimate helper. Select your rooms and carpet area for an instant indicative range:';

    const words = introText.split(' ');
    let currentText = '';
    for (const word of words) {
      currentText += (currentText ? ' ' : '') + word;
      yield { textChunk: currentText, isComplete: false };
      await new Promise((r) => setTimeout(r, 25));
    }

    yield {
      textChunk: currentText,
      isComplete: true,
      fullMessage: {
        text: currentText,
        richType: 'estimate',
        richData: {
          packages: BASE_PACKAGES,
        },
      },
    };
    return;
  }

  // 3. Check for Project Showcase / Portfolio trigger
  if (inputLower.includes('project') || inputLower.includes('portfolio') || inputLower.includes('works') || inputLower.includes('photos')) {
    const projText = lang === 'ta'
      ? 'எங்கள் அண்மைய தனித்துவமான வீட்டு திட்டங்களை இங்கே காணலாம்:'
      : 'Here are three of our recent signature architectural commissions in Chennai:';

    const words = projText.split(' ');
    let currentText = '';
    for (const word of words) {
      currentText += (currentText ? ' ' : '') + word;
      yield { textChunk: currentText, isComplete: false };
      await new Promise((r) => setTimeout(r, 25));
    }

    yield {
      textChunk: currentText,
      isComplete: true,
      fullMessage: {
        text: currentText,
        richType: 'project_carousel',
        richData: {
          projects: media.projects.slice(0, 3),
        },
        followUps: ['Request project brochure', 'Calculate estimate', 'Book site visit'],
      },
    };
    return;
  }

  // 4. Check for Consultation booking / Slot picker trigger
  if (inputLower.includes('consult') || inputLower.includes('appointment') || inputLower.includes('meet') || inputLower.includes('slot') || inputLower.includes('schedule')) {
    const slotText = lang === 'ta'
      ? 'எங்கள் தலைமை வடிவமைப்பாளருடன் இலவச ஆலோசனை பெற வசதியான நேரத்தை தேர்வு செய்யவும்:'
      : 'Select a preferred day and time for your complimentary private architectural consultation:';

    const words = slotText.split(' ');
    let currentText = '';
    for (const word of words) {
      currentText += (currentText ? ' ' : '') + word;
      yield { textChunk: currentText, isComplete: false };
      await new Promise((r) => setTimeout(r, 25));
    }

    yield {
      textChunk: currentText,
      isComplete: true,
      fullMessage: {
        text: currentText,
        richType: 'slot_picker',
        richData: {
          studioPhone: '+918438423938',
          whatsapp: '+919384577177',
        },
        followUps: ['Morning slot (10 AM - 1 PM)', 'Evening slot (4 PM - 7 PM)', 'WhatsApp directly'],
      },
    };
    return;
  }

  // 5. Knowledge Base Matching
  const matchResult = findBestKnowledgeMatch(userInput, lang);

  if (matchResult.entry) {
    const rawAnswer = lang === 'ta' && matchResult.entry.answerTa ? matchResult.entry.answerTa : matchResult.entry.answer;
    const words = rawAnswer.split(' ');
    let currentText = '';

    for (const word of words) {
      currentText += (currentText ? ' ' : '') + word;
      yield { textChunk: currentText, isComplete: false };
      await new Promise((r) => setTimeout(r, 25));
    }

    yield {
      textChunk: currentText,
      isComplete: true,
      fullMessage: {
        text: currentText,
        richType: (matchResult.entry.richType as ChatMessage['richType']) || 'text',
        followUps: matchResult.suggestions,
        richData: matchResult.entry.richType === 'contact'
          ? { phone: '+91 84384 23938', whatsapp: '+91 93845 77177', address: 'Medavakkam, Chennai' }
          : undefined,
      },
    };
  } else {
    // Smart Fallback suggesting 3 closest topics
    const fallbackText = lang === 'ta'
      ? 'மன்னிக்கவும், இதற்கு நேரடி விடை என்னிடம் இல்லை. எங்கள் தலைமை வடிவமைப்பாளர் தனிப்பட்ட முறையில் உதவ முடியும். நீங்கள் தெரிந்து கொள்ள விரும்பும் தலைப்பை தேர்ந்தெடுக்கவும்:'
      : "I don't have an exact match for that inquiry, but our senior design architects can assist you personally. Would one of these topics help?";

    const words = fallbackText.split(' ');
    let currentText = '';

    for (const word of words) {
      currentText += (currentText ? ' ' : '') + word;
      yield { textChunk: currentText, isComplete: false };
      await new Promise((r) => setTimeout(r, 25));
    }

    yield {
      textChunk: currentText,
      isComplete: true,
      fullMessage: {
        text: currentText,
        richType: 'text',
        followUps: matchResult.suggestions,
      },
    };
  }
}

/**
 * Builds the initial personalized greeting message.
 */
export function getInitialGreeting(lang: Language = 'en', userName?: string): ChatMessage {
  const greeting = lang === 'ta'
    ? `வணக்கம்${userName ? ` ${userName}` : ''}! நான் சிரிஸ் வடிவமைப்பு உதவியாளர். உங்கள் வீட்டிற்கான யோசனைகள், பொருட்கள் அல்லது 45 நாள் ஒப்படைப்பு பற்றி எதையும் கேட்கலாம்.`
    : `Welcome${userName ? ` back, ${userName}` : ''}. I am the Siriz Design Concierge. How can I assist your home's architectural journey today?`;

  return {
    id: `msg-welcome-${Date.now()}`,
    sender: 'bot',
    text: greeting,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    language: lang,
    followUps: [
      lang === 'ta' ? 'வடிவமைப்பு தேர்வு (Quiz)' : 'Find My Style Quiz',
      lang === 'ta' ? 'விலை & தொகுப்புகள்' : 'Pricing & Packages',
      lang === 'ta' ? '45 நாள் ஒப்படைப்பு' : '45-Day Handover & Warranty',
      lang === 'ta' ? 'BWP மரைன் பிளைவுட்' : 'Materials & BWP Ply',
      lang === 'ta' ? 'இலவச ஆலோசனை' : 'Book Free Consultation',
    ],
  };
}

/**
 * Constructs a prefilled WhatsApp link that carries client quiz context.
 */
export function generateWhatsAppHandoffURL(state: ConversationState): string {
  const phone = '919384577177';
  let message = 'Hello Siriz Interiors, I am inquiring about turnkey interiors in Chennai.';

  if (state.userName) message += ` My name is ${state.userName}.`;
  if (state.quizStyle) message += ` Preferred style: ${state.quizStyle}.`;
  if (state.quizRooms && state.quizRooms.length) message += ` Rooms: ${state.quizRooms.join(', ')}.`;
  if (state.quizCarpetArea) message += ` Approx carpet area: ${state.quizCarpetArea} sq.ft.`;
  if (state.quizBudget) message += ` Budget range: ${state.quizBudget}.`;
  if (state.quizTimeline) message += ` Target timeline: ${state.quizTimeline}.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
