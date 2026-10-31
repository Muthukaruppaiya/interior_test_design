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
    conciergeTitle: 'Siriz Design Concierge',
    onlineStatus: 'Online · Senior Architect Desk',
    hours: 'Mon – Sat: 9:30 AM – 7:30 PM IST',
    askPlaceholder: 'Ask about materials, 45-day handover, pricing...',
    quickChipsTitle: 'Popular Questions',
    findMyStyle: 'Find My Style Quiz',
    pricingPackages: 'Pricing & Packages',
    ourProcess: 'Our 6-Step Process',
    warrantyDelivery: '45-Day Delivery & Warranty',
    materialsUsed: 'Materials & BWP Ply',
    bookConsultation: 'Book Free Consultation',
    talkToDesigner: 'WhatsApp a Designer',
    callStudio: 'Call Studio (+91 84384 23938)',
    downloadSummary: 'Download Mood Board',
    shareWhatsApp: 'Share on WhatsApp',
    startOver: 'Start Over',
    clearChat: 'Clear Conversation',
    indicativeNote: 'Indicative range only. A designer will confirm after a site audit.',
    nudgePricing: 'Want a quick turnkey estimate for your home?',
    nudgeProjects: 'Admiring this style? I can create a tailored mood board for you.',
    nudgeVirtualTour: 'Experience a live 3D walkthrough with our senior architect?',
    nudgeDefault: 'Have a design question? Our studio concierge is here to help.',
    listening: 'Listening... speak now',
    voiceNotSupported: 'Voice speech input is not supported in this browser.',
    fileUploaded: 'Floor plan received! Our senior architect will review your layout.',
    feedbackThanks: 'Thank you for your feedback.',
    leadSuccess: 'Your consultation is reserved! A senior designer will call within 24 hours.',
    leadSubmit: 'Confirm Private Consultation',
    nameLabel: 'Your Full Name',
    phoneLabel: '10-Digit Mobile Number',
    phoneInvalid: 'Please enter a valid 10-digit Indian mobile number.',
    quizStyleTitle: 'Choose the aesthetic direction that resonates with your home:',
    quizRoomsTitle: 'Select the spaces you would like us to transform:',
    quizAreaTitle: 'What is your approximate carpet area?',
    quizBudgetTitle: 'What is your planned investment range?',
    quizTimelineTitle: 'When are you planning to begin your interiors?',
    carpetAreaLabel: 'Carpet Area',
    budgetRangeLabel: 'Indicative Budget',
    nextStep: 'Continue to Next Step →',
    submitEstimate: 'Generate Mood Board & Estimate',
    viewProjects: 'View Commissioned Residences',
  },
  ta: {
    conciergeTitle: 'சிரிஸ் வடிவமைப்பு உதவியாளர்',
    onlineStatus: 'இணையத்தில் · தலைமை வடிவமைப்பாளர்',
    hours: 'திங்கள் – சனி: காலை 9:30 – இரவு 7:30 IST',
    askPlaceholder: 'பொருட்கள், 45 நாள் ஒப்படைப்பு, விலை பற்றி கேளுங்கள்...',
    quickChipsTitle: 'முக்கிய தலைப்புகள்',
    findMyStyle: 'வடிவமைப்பு தேர்வு (Quiz)',
    pricingPackages: 'விலை & தொகுப்புகள்',
    ourProcess: 'எங்கள் 6 படி முறை',
    warrantyDelivery: '45 நாள் ஒப்படைப்பு & உத்திரவாதம்',
    materialsUsed: 'பொருட்கள் & BWP பிளைவுட்',
    bookConsultation: 'இலவச ஆலோசனை பதிவு',
    talkToDesigner: 'வாட்ஸ்அப்பில் பேசுக',
    callStudio: 'அழைக்க (+91 84384 23938)',
    downloadSummary: 'மூட் போர்டு பதிவிறக்க',
    shareWhatsApp: 'வாட்ஸ்அப்பில் பகிர்க',
    startOver: 'மீண்டும் தொடங்கு',
    clearChat: 'உரையாடலை அழிக்க',
    indicativeNote: 'தோராயமான மதிப்பீடு மட்டுமே. தள ஆய்வு செய்தபின் உறுதி செய்யப்படும்.',
    nudgePricing: 'உங்கள் வீட்டிற்கான உடனடி மதிப்பீடு வேண்டுமா?',
    nudgeProjects: 'இந்த வடிவமைப்பு பிடித்திருக்கிறதா? உங்களுக்கான மூட் போர்டு தயார் செய்யட்டுமா?',
    nudgeVirtualTour: 'நேரடி 3D மாதிரி வீட்டை பார்வையிட விரும்புகிறீர்களா?',
    nudgeDefault: 'வடிவமைப்பு சந்தேகங்கள் உள்ளதா? உதவி செய்ய நாங்கள் தயார்.',
    listening: 'பேசுங்கள்... கேட்கிறது',
    voiceNotSupported: 'இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.',
    fileUploaded: 'வரைபடம் பெறப்பட்டது! எங்கள் வடிவமைப்பாளர் விரைவில் மதிப்பாய்வு செய்வார்.',
    feedbackThanks: 'உங்கள் கருத்துக்கு நன்றி.',
    leadSuccess: 'பதிவு செய்யப்பட்டது! 24 மணி நேரத்திற்குள் எங்கள் வடிவமைப்பாளர் அழைப்பார்.',
    leadSubmit: 'ஆலோசனை உறுதி செய்',
    nameLabel: 'உங்கள் பெயர்',
    phoneLabel: '10 இலக்க அலைபேசி எண்',
    phoneInvalid: 'சரியான 10 இலக்க இந்திய அலைபேசி எண்ணை உள்ளிடவும்.',
    quizStyleTitle: 'உங்கள் வீட்டிற்கு விருப்பமான பாணியை தேர்ந்தெடுக்கவும்:',
    quizRoomsTitle: 'வடிவமைக்க வேண்டிய அறைகளை தேர்ந்தெடுக்கவும்:',
    quizAreaTitle: 'உங்கள் வீட்டின் பரப்பளவு எவ்வளவு?',
    quizBudgetTitle: 'உங்கள் உத்தேச பட்ஜெட் அளவு என்ன?',
    quizTimelineTitle: 'பணிகளை எப்போது தொடங்க திட்டமிட்டுள்ளீர்கள்?',
    carpetAreaLabel: 'பரப்பளவு (சதுர அடி)',
    budgetRangeLabel: 'உத்தேச பட்ஜெட்',
    nextStep: 'அடுத்த கட்டத்திற்கு செல்க →',
    submitEstimate: 'மதிப்பீடு & மூட் போர்டு பெறுக',
    viewProjects: 'முடிக்கப்பட்ட திட்டங்களை பார்க்க',
  },
};
