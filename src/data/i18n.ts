/**
 * SIRIZ INTERIORS - Bilingual Localization (EN / தமிழ்)
 * Editorial translations for the Design Concierge Chatbot.
 */

export type Language = 'en' | 'ta';

export interface I18nStrings {
  conciergeTitle: string;
  onlineStatus: string;
  hours: string;
  askPlaceholder: string;
  quickChipsTitle: string;
  findMyStyle: string;
  pricingPackages: string;
  ourProcess: string;
  warrantyDelivery: string;
  materialsUsed: string;
  bookConsultation: string;
  talkToDesigner: string;
  callStudio: string;
  downloadSummary: string;
  shareWhatsApp: string;
  startOver: string;
  clearChat: string;
  indicativeNote: string;
  nudgePricing: string;
  nudgeProjects: string;
  nudgeVirtualTour: string;
  nudgeDefault: string;
  listening: string;
  voiceNotSupported: string;
  fileUploaded: string;
  feedbackThanks: string;
  leadSuccess: string;
  leadSubmit: string;
  nameLabel: string;
  phoneLabel: string;
  phoneInvalid: string;
  quizStyleTitle: string;
  quizRoomsTitle: string;
  quizAreaTitle: string;
  quizBudgetTitle: string;
  quizTimelineTitle: string;
  carpetAreaLabel: string;
  budgetRangeLabel: string;
  nextStep: string;
  submitEstimate: string;
  viewProjects: string;
}

export const i18n: Record<Language, I18nStrings> = {
  en: {
    conciergeTitle: 'Siriz Concierge',
    onlineStatus: 'Online · Turnkey Atelier',
    hours: 'Mon – Sat: 9:30 AM – 7:30 PM',
    askPlaceholder: 'Ask about designs, pricing, timeline...',
    quickChipsTitle: 'Quick Options',
    findMyStyle: 'Style Quiz',
    pricingPackages: 'Pricing',
    ourProcess: '6-Step Process',
    warrantyDelivery: '45-Day Delivery',
    materialsUsed: 'Materials & Ply',
    bookConsultation: 'Book Consultation',
    talkToDesigner: 'WhatsApp Designer',
    callStudio: 'Call Us (+91 84384 23938)',
    downloadSummary: 'Download Mood Board',
    shareWhatsApp: 'Share on WhatsApp',
    startOver: 'Start Over',
    clearChat: 'Clear Chat',
    indicativeNote: 'Indicative estimate. Final quote after free site visit.',
    nudgePricing: 'Need a quick interior estimate for your home?',
    nudgeProjects: 'Like this design? We can tailor it for your floor plan.',
    nudgeVirtualTour: 'Want a 3D virtual walkthrough of our residences?',
    nudgeDefault: 'Have questions? Ask our studio assistant anytime.',
    listening: 'Listening... speak now',
    voiceNotSupported: 'Voice input is not supported in this browser.',
    fileUploaded: 'Floor plan received! Our architect will review it.',
    feedbackThanks: 'Thanks for your feedback!',
    leadSuccess: 'Consultation reserved! Our designer will contact you within 24 hours.',
    leadSubmit: 'Confirm Consultation',
    nameLabel: 'Your Name',
    phoneLabel: '10-Digit Mobile Number',
    phoneInvalid: 'Please enter a valid 10-digit mobile number.',
    quizStyleTitle: 'Choose your preferred design style:',
    quizRoomsTitle: 'Select the spaces to transform:',
    quizAreaTitle: 'Approximate carpet area (sq.ft):',
    quizBudgetTitle: 'Target budget range:',
    quizTimelineTitle: 'When do you plan to start?',
    carpetAreaLabel: 'Carpet Area',
    budgetRangeLabel: 'Budget Range',
    nextStep: 'Next Step →',
    submitEstimate: 'View Estimate & Mood Board',
    viewProjects: 'View Projects',
  },
  ta: {
    conciergeTitle: 'சிரிஸ் உதவியாளர்',
    onlineStatus: 'இணையத்தில் · உடனடி உதவி',
    hours: 'திங்கள் – சனி: காலை 9:30 – இரவு 7:30',
    askPlaceholder: 'கேள்வி கேளுங்கள் அல்லது தேர்வு செய்யுங்கள்...',
    quickChipsTitle: 'முக்கிய தலைப்புகள்',
    findMyStyle: 'வடிவமைப்பு தேர்வு',
    pricingPackages: 'விலை விவரம்',
    ourProcess: '6 படிகள்',
    warrantyDelivery: '45 நாள் ஒப்படைப்பு',
    materialsUsed: 'பொருட்கள் & தரம்',
    bookConsultation: 'இலவச ஆலோசனை',
    talkToDesigner: 'வாட்ஸ்அப் பேசுங்கள்',
    callStudio: 'அழைக்க (+91 84384 23938)',
    downloadSummary: 'மூட் போர்டு பதிவிறக்க',
    shareWhatsApp: 'வாட்ஸ்அப்பில் பகிர்க',
    startOver: 'மீண்டும் தொடங்கு',
    clearChat: 'அழிக்க',
    indicativeNote: 'தோராயமான மதிப்பீடு. தள ஆய்வுக்கு பின் உறுதி செய்யப்படும்.',
    nudgePricing: 'உங்கள் வீட்டிற்கு உடனடி மதிப்பீடு வேண்டுமா?',
    nudgeProjects: 'இந்த வடிவமைப்பு பிடித்திருக்கிறதா? மூட் போர்டு வேண்டுமா?',
    nudgeVirtualTour: '3D மாதிரி வீட்டை பார்வையிட விரும்புகிறீர்களா?',
    nudgeDefault: 'ஏதேனும் கேள்விகள் உள்ளதா? உதவ நாங்கள் தயார்.',
    listening: 'பேசுங்கள்... கேட்கிறது',
    voiceNotSupported: 'குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.',
    fileUploaded: 'வரைபடம் பெறப்பட்டது! எங்கள் வடிவமைப்பாளர் மதிப்பாய்வு செய்வார்.',
    feedbackThanks: 'மிக்க நன்றி!',
    leadSuccess: 'பதிவு செய்யப்பட்டது! 24 மணி நேரத்திற்குள் அழைப்போம்.',
    leadSubmit: 'ஆலோசனை உறுதி செய்',
    nameLabel: 'உங்கள் பெயர்',
    phoneLabel: '10 இலக்க அலைபேசி எண்',
    phoneInvalid: 'சரியான 10 இலக்க எண்ணை உள்ளிடவும்.',
    quizStyleTitle: 'விருப்பமான பாணியை தேர்வு செய்யவும்:',
    quizRoomsTitle: 'அறைகளை தேர்வு செய்யவும்:',
    quizAreaTitle: 'வீட்டின் பரப்பளவு (சதுர அடி):',
    quizBudgetTitle: 'உத்தேச பட்ஜெட்:',
    quizTimelineTitle: 'எப்போது தொடங்க திட்டம்?',
    carpetAreaLabel: 'பரப்பளவு',
    budgetRangeLabel: 'பட்ஜெட்',
    nextStep: 'அடுத்த படி →',
    submitEstimate: 'மதிப்பீடு பெறுக',
    viewProjects: 'திட்டங்களை பார்க்க',
  },
};
