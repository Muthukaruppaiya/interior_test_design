// ─── knowledge.ts ───────────────────────────────────────────────────────────
// Siriz Design Concierge — Knowledge base
// Swap this file for a Claude API adapter later; the chat engine only depends
// on the KnowledgeEntry shape and the exported `entries` array.
// ─────────────────────────────────────────────────────────────────────────────

export interface ChatAction {
  type: 'scrollToSection' | 'openWhatsApp' | 'prefillForm' | 'showPackageCard';
  payload?: string;
}

export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  answer: string;
  followUps: string[];
  action?: ChatAction;
}

const entries: KnowledgeEntry[] = [
  // ── Greeting ──────────────────────────────────────────────────────────────
  {
    id: 'greeting',
    keywords: [
      'hi', 'hello', 'hey', 'vanakkam', 'hii', 'hiii', 'helo', 'helloo',
      'good morning', 'good afternoon', 'good evening', 'sup', 'yo',
      'namaste', 'namaskar', 'greetings',
    ],
    answer:
      `Hello! 👋 Welcome to **Siriz Interiors** — Chennai's trusted turnkey interior design partner with 11+ years of experience and 600+ happy homes.\n\nHow can I help you today?`,
    followUps: ['Find my style', 'Pricing & packages', 'Our process'],
  },

  // ── About ─────────────────────────────────────────────────────────────────
  {
    id: 'about',
    keywords: [
      'about', 'who', 'company', 'siriz', 'what do you do', 'tell me',
      'about you', 'history', 'background', 'who are you',
    ],
    answer:
      `**Siriz Interiors Pvt Ltd** is a Chennai-based **turnkey interior design company** with **11+ years** of experience and **600+ happy clients**.\n\nWe handle everything end-to-end — from initial planning & design all the way through factory production and final installation — so you don't have to coordinate with multiple vendors.\n\nOur goal is simple: create dream homes that reflect *your* personality.`,
    followUps: ['Our process', 'Services we offer', 'Book a consultation'],
  },

  // ── Services ──────────────────────────────────────────────────────────────
  {
    id: 'services',
    keywords: [
      'services', 'service', 'what do you offer', 'offerings', 'what can',
      'provide', 'do you do', 'scope', 'work', 'interior types',
    ],
    answer:
      `We offer a wide range of interior design services:\n\n` +
      `🏠 **Full-Home Interiors**\n` +
      `🍳 **Modular Kitchen**\n` +
      `👔 **Wardrobes & Storage**\n` +
      `🛋️ **Living Room Design**\n` +
      `🛏️ **Bedroom Design**\n` +
      `🙏 **Pooja Unit**\n` +
      `📺 **TV Unit**\n` +
      `💻 **Home Office**\n` +
      `📐 **Space Planning**\n` +
      `💡 **False Ceiling & Lighting**\n` +
      `🏪 **Commercial Interiors / Shops**\n\n` +
      `Each project is customised to your home, style and budget.`,
    followUps: ['Modular kitchen', 'Wardrobe options', 'Pricing & packages'],
  },

  // ── Modular Kitchen ───────────────────────────────────────────────────────
  {
    id: 'modular_kitchen',
    keywords: [
      'kitchen', 'modular kitchen', 'kichen', 'kitchan', 'modular',
      'cooking', 'kitchen cost', 'kitchen price', 'kitchen rate',
      'kitchen budget', 'kitchen package', 'l shape', 'u shape',
      'island kitchen', 'parallel kitchen', 'straight kitchen',
      'kitchen layout',
    ],
    answer:
      `Our **Modular Kitchen** packages start from **₹69,000**\\*.\n\n` +
      `**What's included:**\n` +
      `• 3 kitchen types to choose from\n` +
      `• 3 essential components\n` +
      `• Accessories & décor elements\n\n` +
      `**Layouts available:** L-shape · U-shape · Straight · Parallel · Island\n\n` +
      `_\\*Final pricing depends on the size of your kitchen, materials selected and design complexity._`,
    followUps: ['Kitchen materials', 'Kitchen packages', 'Book a consultation'],
    action: { type: 'showPackageCard', payload: 'modular_kitchen' },
  },

  // ── Wardrobe ──────────────────────────────────────────────────────────────
  {
    id: 'wardrobe',
    keywords: [
      'wardrobe', 'wardobe', 'cupboard', 'closet', 'almirah', 'almira',
      'wardrobe cost', 'wardrobe price', 'wardrobe rate', 'sliding door',
      'hinged door', 'profile door', 'walk in closet', 'storage',
    ],
    answer:
      `Our **Wardrobe** solutions start from **₹1,00,000**\\*.\n\n` +
      `**Options:**\n` +
      `• 3 wardrobe types\n` +
      `• 3 smart accessories\n` +
      `• 3 door styles — **Sliding**, **Hinged**, or **Profile / Glass**\n\n` +
      `_\\*Final pricing depends on dimensions, materials and finish chosen._`,
    followUps: ['Wardrobe materials', 'Full-home package', 'Book a consultation'],
    action: { type: 'showPackageCard', payload: 'wardrobe' },
  },

  // ── Full Home ─────────────────────────────────────────────────────────────
  {
    id: 'full_home',
    keywords: [
      'full home', 'full house', 'complete home', 'complete interior',
      'entire home', 'entire house', 'whole home', 'whole house',
      'full home package', 'full home cost', 'bhk', '1bhk', '2bhk',
      '3bhk', '1 bhk', '2 bhk', '3 bhk', 'apartment', 'flat',
    ],
    answer:
      `Our **Full-Home Interior** packages start from **₹3,25,000**\\*.\n\n` +
      `**Includes:**\n` +
      `• Modular Kitchen\n` +
      `• Living Room design\n` +
      `• Bedroom design\n` +
      `• Décor & finishing touches\n\n` +
      `_\\*Final pricing depends on the size of your home, materials and design preferences._`,
    followUps: ['Modular kitchen', 'Wardrobe options', 'Book a consultation'],
    action: { type: 'showPackageCard', payload: 'full_home' },
  },

  // ── Pricing ───────────────────────────────────────────────────────────────
  {
    id: 'pricing',
    keywords: [
      'pricing', 'price', 'cost', 'rate', 'budget', 'how much',
      'package', 'packages', 'charges', 'quotation', 'quote',
      'estimate', 'affordable', 'cheap', 'expensive', 'investment',
      'money', 'amount', 'total',
    ],
    answer:
      `Here's a quick overview of our **starting packages**:\n\n` +
      `| Package | Starting From |\n` +
      `|---|---|\n` +
      `| 🍳 Modular Kitchen | ₹69,000 |\n` +
      `| 👔 Wardrobe | ₹1,00,000 |\n` +
      `| 🏠 Full-Home Interior | ₹3,25,000 |\n\n` +
      `⚠️ _Final pricing depends on the size of your home, material choices and design complexity. Our designer will share a detailed, transparent quote after understanding your requirements._`,
    followUps: ['Modular kitchen', 'Wardrobe options', 'Full-home package'],
  },

  // ── Materials ─────────────────────────────────────────────────────────────
  {
    id: 'materials',
    keywords: [
      'material', 'materials', 'plywood', 'laminate', 'veneer',
      'acrylic', 'granite', 'quartz', 'countertop', 'hardware',
      'hettich', 'hafele', 'finish', 'mdf', 'hdf', 'bwr', 'bwp',
      'marine', 'ply', 'quality', 'wood', 'soft close', 'kitchen materials',
      'wardrobe materials',
    ],
    answer:
      `We use only **premium-grade materials** across every project:\n\n` +
      `🪵 **Plywood:** BWP/BWR marine-grade\n` +
      `  _BWR (Boiling Water Resistant) handles moisture; BWP (Boiling Water Proof) is even more durable and ideal for kitchens & bathrooms._\n\n` +
      `📋 **Boards:** MDF and HDF for smooth finishes\n` +
      `🎨 **Finishes:** Laminates, Acrylic, PU, and Veneers\n` +
      `🔩 **Hardware:** Hettich / Hafele class soft-close mechanisms\n` +
      `💎 **Countertops:** Quartz & Granite options\n` +
      `💡 **Lighting:** Integrated LED solutions\n\n` +
      `Every material is selected for durability, aesthetics and long-term performance.`,
    followUps: ['Our warranty', 'Pricing & packages', 'Book a consultation'],
  },

  // ── Process ───────────────────────────────────────────────────────────────
  {
    id: 'process',
    keywords: [
      'process', 'steps', 'how does it work', 'how it works',
      'procedure', 'workflow', 'stages', 'how do you work',
      'what happens', 'journey', 'our process',
    ],
    answer:
      `Our **6-step process** makes everything effortless for you:\n\n` +
      `1️⃣ **Meet a Designer** — Free consultation to understand your vision\n` +
      `2️⃣ **Start Designing** — Our experts create layouts tailored to you\n` +
      `3️⃣ **View Designs in 3D** — See your home before we build it\n` +
      `4️⃣ **Plan** — Finalise materials, colours and timelines\n` +
      `5️⃣ **Production** — Built at our own factory for precision quality\n` +
      `6️⃣ **Move In** — Professional installation and handover\n\n` +
      `The whole journey is tracked in your **personal customer portal**.`,
    followUps: ['Timeline', 'Customer portal', 'Book a consultation'],
  },

  // ── Timeline ──────────────────────────────────────────────────────────────
  {
    id: 'timeline',
    keywords: [
      'timeline', 'time', 'how long', 'duration', 'days', 'weeks',
      'delivery', 'when', 'deadline', 'fast', 'quick', 'speed',
      'turnaround', 'how many days', '45 days', 'delay',
    ],
    answer:
      `We offer a **guaranteed delivery in 45 days** for the interior work — counted from the date of finalised design and approvals.\n\n` +
      `This timeline covers production at our factory and on-site installation. Our project tracker keeps you updated at every stage.`,
    followUps: ['Our process', 'Our warranty', 'Book a consultation'],
  },

  // ── Warranty ──────────────────────────────────────────────────────────────
  {
    id: 'warranty',
    keywords: [
      'warranty', 'guarantee', 'waranty', 'warrantee',
      'how long warranty', 'cover', 'insurance', 'durability',
      'after sale', 'after sales', 'post installation', 'maintenance',
      'support', 'service', 'claim',
    ],
    answer:
      `🛡️ **10-Year Warranty** on all wooden work — one of the longest in the industry.\n\n` +
      `• Claim easily through your dedicated **customer portal login**\n` +
      `• **Lifetime post-installation service** — we're always a call away\n\n` +
      `Your peace of mind is our priority.`,
    followUps: ['Customer portal', 'Materials used', 'Book a consultation'],
  },

  // ── Customer Portal ───────────────────────────────────────────────────────
  {
    id: 'portal',
    keywords: [
      'portal', 'login', 'customer login', 'track', 'tracking',
      'dashboard', 'progress', 'payment details', 'my account',
      'customer portal',
    ],
    answer:
      `Your dedicated **Customer Portal** is a one-stop dashboard where you can:\n\n` +
      `📊 Track work progress in real time\n` +
      `🎨 View your finalised designs\n` +
      `💳 Check payment details & stages\n` +
      `🛡️ Raise warranty claims\n\n` +
      `You'll receive login credentials once your project kicks off.`,
    followUps: ['Our process', 'Our warranty', 'Book a consultation'],
  },

  // ── Virtual Tour ──────────────────────────────────────────────────────────
  {
    id: 'virtual_tour',
    keywords: [
      'virtual tour', 'tour', '360', 'completed', 'completed projects',
      'gallery', 'photos', 'portfolio', 'showcase', 'alpha',
      'radiance', 'celesta', 'examples', 'previous work',
    ],
    answer:
      `🏠 We offer **360° virtual tours** of our completed sites so you can explore the quality firsthand!\n\n` +
      `Featured projects:\n` +
      `• **Alpha**\n` +
      `• **Radiance**\n` +
      `• **Celesta**\n\n` +
      `Check them out in the **Virtual Tour** section of our website.`,
    followUps: ['Our process', '3D design', 'Book a consultation'],
  },

  // ── 3D Design ─────────────────────────────────────────────────────────────
  {
    id: '3d_design',
    keywords: [
      '3d', '3d design', 'render', 'rendering', 'visualise',
      'visualization', 'preview', 'before production', 'mockup',
      'design preview',
    ],
    answer:
      `✨ Yes! All designs are shown to you in **realistic 3D** before production starts.\n\n` +
      `This way, you can walk through your future home virtually, suggest changes, and approve the final look — so there are zero surprises on move-in day.`,
    followUps: ['Virtual tours', 'Our process', 'Book a consultation'],
  },

  // ── Styles ────────────────────────────────────────────────────────────────
  {
    id: 'styles',
    keywords: [
      'style', 'styles', 'design style', 'theme', 'modern', 'luxury',
      'contemporary', 'traditional', 'south indian', 'minimal',
      'scandinavian', 'minimalist', 'find my style', 'aesthetic',
      'look', 'interior style', 'design theme',
    ],
    answer:
      `We specialise in four popular design styles:\n\n` +
      `✨ **Modern Luxury** — Bold textures, metallic accents, statement lighting · _Deep navy, gold, marble white_\n\n` +
      `🌿 **Contemporary** — Clean lines, open layouts, neutral warmth · _Warm grey, olive, terracotta_\n\n` +
      `🪔 **Traditional / South Indian** — Rich wood tones, brass details, cultural elements · _Teak brown, maroon, temple gold_\n\n` +
      `🤍 **Minimal / Scandinavian** — Clutter-free, functional beauty, natural light · _Off-white, pale oak, soft sage_\n\n` +
      `Not sure which one is you? Our designer can help you discover your style!`,
    followUps: ['Book a consultation', 'Pricing & packages', 'Colour tips'],
  },

  // ── Vastu ─────────────────────────────────────────────────────────────────
  {
    id: 'vastu',
    keywords: [
      'vastu', 'vaastu', 'vasthu', 'feng shui', 'direction',
      'north facing', 'south facing', 'east facing', 'pooja room',
      'pooja direction', 'vastu compliant', 'do you do vastu',
    ],
    answer:
      `🙏 Absolutely! Our design team plans layouts keeping **Vastu preferences** in mind wherever the client wants them.\n\n` +
      `Whether it's the placement of the kitchen, pooja room, bedroom or entrance — we ensure the design respects your beliefs while maximising functionality.`,
    followUps: ['Pooja unit', 'Find my style', 'Book a consultation'],
  },

  // ── Small Space ───────────────────────────────────────────────────────────
  {
    id: 'small_space',
    keywords: [
      'small', 'small space', 'compact', '1bhk', '1 bhk', 'studio',
      'tiny', 'small flat', 'small apartment', 'space saving',
      'small home', 'small house', 'cramped',
    ],
    answer:
      `Great things come in small packages! Here are our top tips for **1 BHK & compact homes**:\n\n` +
      `🛋️ **Multi-functional furniture** — sofa-cum-beds, foldable desks\n` +
      `📦 **Full-height storage** — use every inch from floor to ceiling\n` +
      `🎨 **Light colours** — whites, pastels and neutrals make rooms feel larger\n` +
      `🪞 **Mirrors** — strategically placed mirrors create an illusion of space\n` +
      `💡 **Layered lighting** — avoid single overhead lights; use task + ambient\n\n` +
      `Our designers are experts at maximising compact spaces!`,
    followUps: ['Full-home package', 'Find my style', 'Book a consultation'],
  },

  // ── Colour Tips ───────────────────────────────────────────────────────────
  {
    id: 'colour_tips',
    keywords: [
      'colour', 'color', 'paint', 'wall colour', 'shade', 'palette',
      'colour tips', 'color tips', 'lighting advice', 'room colour',
      'colour combination', 'color combination',
    ],
    answer:
      `Here are some quick **colour & lighting tips** by room:\n\n` +
      `🛋️ **Living Room:** Warm neutrals (beige, warm grey) with an accent wall in teal, olive or terracotta. Layer lighting — ambient + task + accent.\n\n` +
      `🛏️ **Bedroom:** Soft, calming tones — dusty rose, sage green, or lavender. Avoid harsh white lights; go for warm-white LEDs.\n\n` +
      `🍳 **Kitchen:** Bright, energising colours — whites, pale yellows or soft blues. Under-cabinet LED strips add function and style.\n\n` +
      `_Tip: Paint swatches on the wall and view them at different times of day before deciding!_`,
    followUps: ['Find my style', 'Materials used', 'Book a consultation'],
  },

  // ── Tips ──────────────────────────────────────────────────────────────────
  {
    id: 'tips',
    keywords: [
      'tips', 'advice', 'suggestion', 'suggestions', 'recommend',
      'planning tips', 'interior tips', 'guide', 'help me plan',
      'how to plan', 'getting started', 'first time',
    ],
    answer:
      `Here are **5 quick tips** for planning your home interior:\n\n` +
      `1️⃣ **Set your budget** — know your range before you start browsing\n` +
      `2️⃣ **Plan storage first** — good storage = clutter-free home\n` +
      `3️⃣ **Choose durable materials** — invest in quality that lasts\n` +
      `4️⃣ **Layer the lighting** — ambient, task and accent for every room\n` +
      `5️⃣ **Keep a 10% buffer** — surprises always come up during renovation\n\n` +
      `Want personalised guidance? A free consultation is just a click away! 👇`,
    followUps: ['Colour tips', 'Small space tips', 'Book a consultation'],
  },

  // ── Location ──────────────────────────────────────────────────────────────
  {
    id: 'location',
    keywords: [
      'location', 'where', 'address', 'area', 'city', 'chennai',
      'medavakkam', 'office', 'showroom', 'visit', 'directions',
      'map', 'near me',
    ],
    answer:
      `📍 We're based in **Medavakkam, Chennai** and serve Chennai and surrounding areas.\n\n` +
      `**Address:**\nSiriz Interiors Pvt Ltd\n5th Main Road, Sivagami Street\nPearl Flora Building\nMedavakkam, Chennai 600100\n\n` +
      `We'd recommend confirming your exact area with our team to ensure smooth service coverage.`,
    followUps: ['Contact us', 'Book a consultation', 'Our process'],
    action: { type: 'scrollToSection', payload: 'contact' },
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  {
    id: 'contact',
    keywords: [
      'contact', 'phone', 'number', 'call', 'whatsapp', 'email',
      'reach', 'talk', 'speak', 'connect', 'get in touch',
      'phone number', 'mobile',
    ],
    answer:
      `📞 **Phone:** +91 84384 23938\n` +
      `💬 **WhatsApp:** +91 93845 77177\n\n` +
      `📍 **Siriz Interiors Pvt Ltd**\n5th Main Road, Sivagami Street\nPearl Flora Building, Medavakkam\nChennai 600100\n\n` +
      `Feel free to reach out anytime — we're happy to help!`,
    followUps: ['WhatsApp us', 'Book a consultation', 'Our process'],
    action: { type: 'openWhatsApp', payload: 'Hi! I visited your website and have a question.' },
  },

  // ── Consultation ──────────────────────────────────────────────────────────
  {
    id: 'consultation',
    keywords: [
      'consultation', 'consult', 'book', 'appointment', 'schedule',
      'meeting', 'free consultation', 'book a consultation',
      'talk to designer', 'meet designer', 'sign up', 'register',
    ],
    answer:
      `🎉 Great choice! We offer a **FREE online consultation** with one of our expert designers.\n\n` +
      `Just scroll down to the consultation form below, and we'll take it from there. If you already mentioned your property type, we'll pre-select it for you!\n\n` +
      `Alternatively, you can WhatsApp us directly for a quicker response.`,
    followUps: ['WhatsApp us', 'Our process', 'Pricing & packages'],
    action: { type: 'scrollToSection', payload: 'consultation' },
  },

  // ── Payment ───────────────────────────────────────────────────────────────
  {
    id: 'payment',
    keywords: [
      'payment', 'pay', 'installment', 'emi', 'instalment',
      'payment plan', 'payment stages', 'advance', 'token',
      'how to pay', 'payment method',
    ],
    answer:
      `💳 Payment stages are shared **transparently** by your assigned designer and tracked in your **customer portal**.\n\n` +
      `Everything is clearly documented so there are no surprises. For specifics, your designer will walk you through the exact milestones during the consultation.\n\n` +
      `_We do not publish fixed percentages because each project structure varies._`,
    followUps: ['Customer portal', 'Book a consultation', 'Our process'],
  },

  // ── Thanks / Bye ──────────────────────────────────────────────────────────
  {
    id: 'thanks',
    keywords: [
      'thanks', 'thank', 'thank you', 'bye', 'goodbye', 'see you',
      'take care', 'thx', 'thnx', 'cheers', 'cya', 'tata',
      'thanks a lot', 'appreciate', 'good bye',
    ],
    answer:
      `😊 You're welcome! It was lovely chatting with you.\n\n` +
      `If you ever need help again, I'm right here. Wishing you a beautiful home! 🏠✨`,
    followUps: ['Book a consultation', 'WhatsApp us'],
  },
];

export default entries;
