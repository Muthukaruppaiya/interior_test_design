import { useState, useRef, useEffect, type FormEvent } from 'react';
import {
  Minus,
  Send,
  Mic,
  RotateCcw,
  Volume2,
  VolumeX,
  Languages,
  Calendar,
  Sparkles,
  ArrowRight,
  Download,
  Share2,
  PhoneCall,
  MessageSquare,
} from 'lucide-react';
import {
  streamReply,
  getInitialGreeting,
  generateWhatsAppHandoffURL,
  type ChatMessage,
  type ConversationState,
} from '../lib/chat';
import { i18n, type Language } from '../data/i18n';
import { calculateIndicativeEstimate, ROOM_RATES } from '../data/pricing';
import { sendLead } from '../lib/leads';
import './ChatWidget.css';

/* ── Web Audio Soft Chime ─────────────────────────────────────────────────── */
function playSoftChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Audio context may be restricted before interaction
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [activeNudge, setActiveNudge] = useState<string | null>(null);
  const [nudgeCount, setNudgeCount] = useState(0);

  // Conversation & Quiz State
  const [convState, setConvState] = useState<ConversationState>({
    language: 'en',
    currentPhase: 'idle',
    quizRooms: ['kitchen', 'living', 'masterBed'],
    quizCarpetArea: 1250,
  });

  // Lead capture fields inside chat
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Voice speech recognition
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<unknown>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = i18n[language];

  /* ── 1. Load / Save from SessionStorage ─────────────────────────────────── */
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('siriz_chat_messages');
      const savedState = sessionStorage.getItem('siriz_chat_state');
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        const welcome = getInitialGreeting('en');
        setMessages([welcome]);
      }
      if (savedState) {
        setConvState(JSON.parse(savedState));
      }
    } catch {
      const welcome = getInitialGreeting('en');
      setMessages([welcome]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem('siriz_chat_messages', JSON.stringify(messages));
    }
    sessionStorage.setItem('siriz_chat_state', JSON.stringify(convState));
  }, [messages, convState]);

  /* ── 2. Launcher 6-second Hint Timer ────────────────────────────────────── */
  useEffect(() => {
    const hintTimer = setTimeout(() => {
      setShowHint(true);
      const hideTimer = setTimeout(() => setShowHint(false), 5000);
      return () => clearTimeout(hideTimer);
    }, 6000);

    return () => clearTimeout(hintTimer);
  }, []);

  /* ── 3. Context-Aware Section Observer (20s Nudges) ─────────────────────── */
  useEffect(() => {
    if (nudgeCount >= 2 || isOpen) return;

    let activeSectionId = 'hero';
    let dwellTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            activeSectionId = entry.target.id;

            if (dwellTimer) clearTimeout(dwellTimer);
            dwellTimer = setTimeout(() => {
              if (!isOpen && nudgeCount < 2) {
                let nudgeMsg = t.nudgeDefault;
                if (activeSectionId === 'investment') nudgeMsg = t.nudgePricing;
                else if (activeSectionId === 'projects') nudgeMsg = t.nudgeProjects;
                else if (activeSectionId === 'virtual-tour') nudgeMsg = t.nudgeVirtualTour;

                setActiveNudge(nudgeMsg);
                setHasUnread(true);
                setNudgeCount((c) => c + 1);

                setTimeout(() => setActiveNudge(null), 8000);
              }
            }, 20000); // 20 seconds dwell
          }
        });
      },
      { threshold: [0.4] }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));

    return () => {
      if (dwellTimer) clearTimeout(dwellTimer);
      observer.disconnect();
    };
  }, [isOpen, nudgeCount, t]);

  /* ── 4. Auto-Scroll on New Content ──────────────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /* ── 5. Voice Input Setup (Web Speech API) ──────────────────────────────── */
  useEffect(() => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new (SpeechRecognition as new () => {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        onresult: (e: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void;
        onerror: () => void;
        onend: () => void;
        start: () => void;
        stop: () => void;
      })();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'ta' ? 'ta-IN' : 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleVoiceInput = () => {
    const recognition = recognitionRef.current as { start: () => void; stop: () => void } | null;
    if (!recognition) {
      alert(t.voiceNotSupported);
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognition.start();
    }
  };

  /* ── 6. Message Dispatch & Streaming Engine ─────────────────────────────── */
  const handleSendMessage = async (textToSend: string) => {
    const userText = textToSend.trim();
    if (!userText || isTyping) return;

    // Haptics on mobile
    if (navigator.vibrate) navigator.vibrate(20);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const stream = streamReply(userText, { ...convState, language });
    const botMsgId = `bot-${Date.now()}`;
    let streamedContent = '';

    for await (const chunk of stream) {
      streamedContent = chunk.textChunk;

      setMessages((prev) => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.id === botMsgId) {
          return [
            ...prev.slice(0, -1),
            {
              ...lastMsg,
              text: streamedContent,
              ...(chunk.fullMessage || {}),
            },
          ];
        } else {
          return [
            ...prev,
            {
              id: botMsgId,
              sender: 'bot',
              text: streamedContent,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              language,
              ...(chunk.fullMessage || {}),
            },
          ];
        }
      });
    }

    setIsTyping(false);
    if (soundEnabled) playSoftChime();
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };



  /* ── 8. Language Switcher ────────────────────────────────────────────────── */
  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'ta' : 'en';
    setLanguage(nextLang);
    setConvState((s) => ({ ...s, language: nextLang }));

    const notice: ChatMessage = {
      id: `lang-${Date.now()}`,
      sender: 'bot',
      text: nextLang === 'ta'
        ? 'மொழி தமிழுக்கு மாற்றப்பட்டது. நான் உங்களுக்கு எவ்வாறு உதவலாம்?'
        : 'Switched to English. How can I assist your home vision today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: nextLang,
      followUps: nextLang === 'ta'
        ? ['வடிவமைப்பு தேர்வு (Quiz)', 'விலை & தொகுப்புகள்', '45 நாள் ஒப்படைப்பு']
        : ['Find My Style Quiz', 'Pricing & Packages', 'Our 45-day process'],
    };
    setMessages((prev) => [...prev, notice]);
  };

  /* ── 9. Clear Chat / Start Over ─────────────────────────────────────────── */
  const handleClearChat = () => {
    sessionStorage.removeItem('siriz_chat_messages');
    sessionStorage.removeItem('siriz_chat_state');
    const fresh = getInitialGreeting(language);
    setMessages([fresh]);
    setConvState({ language, currentPhase: 'idle' });
  };

  /* ── 10. Lead Submission Handler ────────────────────────────────────────── */
  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !/^\d{10}$/.test(leadPhone.replace(/\D/g, ''))) {
      alert(t.phoneInvalid);
      return;
    }

    await sendLead({
      name: leadName,
      phone: leadPhone,
      stylePreference: convState.quizStyle,
      carpetArea: convState.quizCarpetArea,
      selectedRooms: convState.quizRooms,
      source: 'concierge_chat',
    });

    setLeadSubmitted(true);
    setConvState((s) => ({ ...s, userName: leadName, userPhone: leadPhone }));

    const confirmMsg: ChatMessage = {
      id: `lead-conf-${Date.now()}`,
      sender: 'bot',
      text: `${t.leadSuccess} Talk soon, ${leadName}!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language,
      followUps: ['WhatsApp Designer', 'Explore 360 Tour'],
    };
    setMessages((prev) => [...prev, confirmMsg]);
  };

  /* ── 11. Canvas Mood Board Generator (Download Summary) ─────────────────── */
  const handleDownloadMoodBoard = (styleName: string, palette: string[]) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw luxury ivory background
    ctx.fillStyle = '#F7F3EC';
    ctx.fillRect(0, 0, 1200, 800);

    // Border line
    ctx.strokeStyle = '#B08D57';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 740);

    // Studio Header
    ctx.fillStyle = '#1C1A17';
    ctx.font = 'bold 36px serif';
    ctx.fillText('SIRIZ INTERIORS · CHENNAI', 60, 90);

    ctx.fillStyle = '#B08D57';
    ctx.font = '18px sans-serif';
    ctx.fillText('ARCHITECTURAL MOOD BOARD & SPECIFICATION', 60, 125);

    // Chosen Style
    ctx.fillStyle = '#1C1A17';
    ctx.font = 'bold 48px serif';
    ctx.fillText(`Aesthetic Direction: ${styleName}`, 60, 200);

    // Palette Chips
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#1C1A17';
    ctx.fillText('Harmonious Material & Color Palette:', 60, 260);

    palette.forEach((color, idx) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(100 + idx * 110, 320, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = '#1C1A17';
      ctx.font = '14px sans-serif';
      ctx.fillText(color, 65 + idx * 110, 390);
    });

    // Material Specifications
    ctx.font = 'bold 22px sans-serif';
    ctx.fillStyle = '#1C1A17';
    ctx.fillText('Core Atelier Specifications:', 60, 460);

    ctx.font = '18px sans-serif';
    ctx.fillStyle = 'rgba(28, 26, 23, 0.75)';
    ctx.fillText('• 100% Boiling Water Proof (BWP) 710 Marine Grade Plywood', 60, 500);
    ctx.fillText('• Blum / Hettich Soft-Close Concealed Mechanism Runners', 60, 535);
    ctx.fillText('• Italian Anti-Fingerprint Acrylic or Natural Oak Veneer', 60, 570);
    ctx.fillText('• In-House Precision Factory Joinery · 45-Day Handover · 10-Yr Warranty', 60, 605);

    // Footer credentials
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#B08D57';
    ctx.fillText('Siriz Interiors Pvt Ltd · Pearl Flora Bldg, Medavakkam, Chennai · Tel: +91 84384 23938', 60, 720);

    // Download trigger
    const link = document.createElement('a');
    link.download = `Siriz-${styleName.replace(/\s+/g, '-')}-MoodBoard.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  /* ── 12. Slot Picker Click Handler ──────────────────────────────────────── */
  const handleSelectSlot = (dayLabel: string, timePill: string) => {
    const userSlotMsg: ChatMessage = {
      id: `slot-user-${Date.now()}`,
      sender: 'user',
      text: `Selected Slot: ${dayLabel} (${timePill})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userSlotMsg]);

    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: `slot-reply-${Date.now()}`,
        sender: 'bot',
        text: `Reserved ${dayLabel} (${timePill}) for your consultation. Please share your details to confirm:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language,
        richType: 'lead_form',
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  return (
    <>
      {/* ── 6-Second Hint Label (Desktop) ─────────────────────────────────── */}
      {!isOpen && showHint && (
        <div className="concierge-hint-bubble">
          <Sparkles size={14} color="#B08D57" />
          <span>Ask our studio concierge</span>
        </div>
      )}

      {/* ── Context-Aware Nudge Bubble ─────────────────────────────────────── */}
      {!isOpen && activeNudge && (
        <div
          className="concierge-nudge-bubble"
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
            setActiveNudge(null);
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontSize: '10px', color: '#B08D57', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Siriz Concierge
            </span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
          </div>
          <div>{activeNudge}</div>
        </div>
      )}

      {/* ── Floating Round Glass Launcher Button ──────────────────────────── */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
            setActiveNudge(null);
          }}
          aria-label="Open Siriz Design Concierge"
          className="concierge-launcher-btn"
        >
          <div className="concierge-pulse-ring" />
          <div className="concierge-morph-orb">
            <Sparkles size={18} color="#FFFFFF" />
          </div>
          {hasUnread && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#B08D57',
                border: '2px solid #FFFFFF',
              }}
            />
          )}
        </button>
      )}

      {/* ── Chat Window (400x640 Glassmorphism Panel) ────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Siriz Design Concierge Chatbot"
          className="concierge-window"
        >
          {/* Header Bar */}
          <div
            style={{
              padding: '14px 18px',
              borderBottom: '1px solid rgba(169, 136, 82, 0.18)',
              backgroundColor: 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', minWidth: 0 }}>
              {/* Refined Luxury Studio Avatar */}
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #A98852 0%, #D4AF37 55%, #8C6D3B 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(169, 136, 82, 0.28)',
                  flexShrink: 0,
                }}
              >
                <Sparkles size={15} color="#FFFFFF" />
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#1B1916',
                    letterSpacing: '0.01em',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Siriz Concierge
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontFamily: '"Manrope", sans-serif',
                    color: 'rgba(27, 25, 22, 0.58)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#22c55e',
                      boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  <span>{t.onlineStatus}</span>
                </div>
              </div>
            </div>

            {/* Actions: Audio, Language Pill, Reset, Minimize */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Mute audio' : 'Enable soft chime'}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  color: soundEnabled ? '#A98852' : 'rgba(27, 25, 22, 0.38)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                title="Switch Language (English / தமிழ்)"
                style={{
                  background: 'rgba(169, 136, 82, 0.08)',
                  border: '1px solid rgba(169, 136, 82, 0.28)',
                  borderRadius: '999px',
                  cursor: 'pointer',
                  padding: '4px 9px',
                  color: '#8C6D3B',
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s ease',
                }}
              >
                <Languages size={13} />
                <span>{language === 'en' ? 'தமிழ்' : 'EN'}</span>
              </button>

              <button
                type="button"
                onClick={handleClearChat}
                title={t.clearChat}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  color: 'rgba(27, 25, 22, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RotateCcw size={14} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimise concierge"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  color: 'rgba(27, 25, 22, 0.65)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Minus size={16} />
              </button>
            </div>
          </div>

          {/* Messages Stream Container */}
          <div
            aria-live="polite"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {/* Bubble Text */}
                <div className={msg.sender === 'user' ? 'bubble-user' : 'bubble-bot'}>
                  {msg.text}
                </div>

                {/* ── Rich Message: Style Quiz Cards ───────────────────────── */}
                {msg.richType === 'quiz_style' && msg.richData?.styles && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px',
                      width: '100%',
                      marginTop: '12px',
                    }}
                  >
                    {(msg.richData.styles as Array<{ id: string; name: string; image: string; desc: string }>).map((st) => (
                      <div
                        key={st.id}
                        onClick={() => {
                          setConvState((s) => ({ ...s, quizStyle: st.name }));
                          handleSendMessage(`I choose ${st.name}`);
                        }}
                        style={{
                          borderRadius: '14px',
                          overflow: 'hidden',
                          background: '#FFFFFF',
                          border: '1px solid rgba(176, 141, 87, 0.3)',
                          cursor: 'pointer',
                          boxShadow: '0 6px 18px rgba(60, 45, 20, 0.06)',
                          transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                        <img src={st.image} alt={st.name} style={{ width: '100%', height: '80px', objectFit: 'cover' }} />
                        <div style={{ padding: '8px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#1C1A17' }}>{st.name}</div>
                          <div style={{ fontSize: '9px', color: 'rgba(28, 26, 23, 0.6)', marginTop: '2px' }}>{st.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Rich Message: Interactive Estimate Helper ─────────────── */}
                {msg.richType === 'estimate' && (
                  <div
                    className="glass-card"
                    style={{
                      marginTop: '12px',
                      padding: '16px',
                      borderRadius: '16px',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#B08D57', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Turnkey Space Estimator
                    </div>

                    {/* Room Multi-Select Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {Object.entries(ROOM_RATES).map(([key, info]) => {
                        const isSelected = convState.quizRooms?.includes(key);
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() => {
                              const existing = convState.quizRooms || [];
                              const next = isSelected ? existing.filter((k) => k !== key) : [...existing, key];
                              setConvState((s) => ({ ...s, quizRooms: next }));
                            }}
                            style={{
                              padding: '5px 10px',
                              borderRadius: '999px',
                              border: isSelected ? '1px solid #B08D57' : '1px solid rgba(176, 141, 87, 0.25)',
                              backgroundColor: isSelected ? '#B08D57' : '#FFFFFF',
                              color: isSelected ? '#FFFFFF' : '#1C1A17',
                              fontSize: '11px',
                              fontFamily: 'Inter, sans-serif',
                              cursor: 'pointer',
                            }}
                          >
                            <span>{info.icon} {info.room}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Carpet Area Slider */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontFamily: 'Inter, sans-serif', marginBottom: '6px' }}>
                        <span>Carpet Area:</span>
                        <strong style={{ color: '#B08D57' }}>{convState.quizCarpetArea || 1200} sq.ft</strong>
                      </div>
                      <input
                        type="range"
                        min="400"
                        max="4000"
                        step="50"
                        value={convState.quizCarpetArea || 1200}
                        onChange={(e) => setConvState((s) => ({ ...s, quizCarpetArea: Number(e.target.value) }))}
                        className="glass-slider"
                      />
                    </div>

                    {/* Live Calculated Indicative Result */}
                    {(() => {
                      const est = calculateIndicativeEstimate(convState.quizRooms || [], convState.quizCarpetArea || 1200);
                      return (
                        <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid rgba(176, 141, 87, 0.2)' }}>
                          <div style={{ fontSize: '10px', color: 'rgba(28, 26, 23, 0.55)', textTransform: 'uppercase' }}>
                            Indicative Turnkey Range:
                          </div>
                          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '26px', fontWeight: 600, color: '#B08D57', margin: '2px 0 6px' }}>
                            {est.minFormatted} – {est.maxFormatted}
                          </div>
                          <div style={{ fontSize: '10px', color: 'rgba(28, 26, 23, 0.65)', lineHeight: 1.4 }}>
                            {est.disclaimer}
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const moodboardReply: ChatMessage = {
                                id: `mb-${Date.now()}`,
                                sender: 'bot',
                                text: 'Here is your tailored mood board:',
                                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                language,
                                richType: 'moodboard',
                                richData: {
                                  style: convState.quizStyle || 'Modern Luxury',
                                  palette: ['#F7F3EC', '#E9E1D3', '#CFC6B6', '#B08D57', '#1C1A17'],
                                  materials: ['BWP 710 Marine Plywood', 'German Anti-Fingerprint Acrylic', 'Calibrated Quartz'],
                                },
                              };
                              setMessages((prev) => [...prev, moodboardReply]);
                            }}
                            style={{
                              marginTop: '10px',
                              width: '100%',
                              padding: '8px 14px',
                              borderRadius: '999px',
                              backgroundColor: '#B08D57',
                              color: '#FFFFFF',
                              border: 'none',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px',
                            }}
                          >
                            <span>Generate Mood Board</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* ── Rich Message: Mood Board Generator Card ───────────────── */}
                {msg.richType === 'moodboard' && (
                  <div
                    className="glass-card"
                    style={{
                      marginTop: '12px',
                      padding: '16px',
                      borderRadius: '16px',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#B08D57', textTransform: 'uppercase' }}>
                        Curated Mood Board
                      </span>
                      <Sparkles size={14} color="#B08D57" />
                    </div>

                    <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '22px', fontWeight: 600, color: '#1C1A17', marginBottom: '10px' }}>
                      {(msg.richData?.style as string) || 'Modern Luxury Residence'}
                    </div>

                    {/* 5-Color Swatches */}
                    <div style={{ marginBottom: '14px' }}>
                      <div style={{ fontSize: '10px', color: 'rgba(28, 26, 23, 0.6)', marginBottom: '6px' }}>
                        Harmonious Coastal Palette:
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {((msg.richData?.palette as string[]) || ['#F7F3EC', '#E9E1D3', '#CFC6B6', '#B08D57', '#1C1A17']).map((c, i) => (
                          <div
                            key={i}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              backgroundColor: c,
                              border: '1px solid rgba(0,0,0,0.15)',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                            }}
                            title={c}
                          />
                        ))}
                      </div>
                    </div>

                    {/* 3 Material suggestions */}
                    <div style={{ marginBottom: '14px' }}>
                      <div style={{ fontSize: '10px', color: 'rgba(28, 26, 23, 0.6)', marginBottom: '4px' }}>
                        Suggested Material Specifications:
                      </div>
                      <div style={{ fontSize: '11px', color: '#1C1A17', lineHeight: 1.5 }}>
                        • BWP 710 Grade Marine Plywood<br />
                        • Italian Matte Acrylic & Fluted Glass<br />
                        • Calibrated Quartz Waterfall Worktops
                      </div>
                    </div>

                    {/* Mood Board Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => handleDownloadMoodBoard((msg.richData?.style as string) || 'Modern Luxury', ['#F7F3EC', '#E9E1D3', '#CFC6B6', '#B08D57', '#1C1A17'])}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '999px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid rgba(176, 141, 87, 0.35)',
                          color: '#1C1A17',
                          fontSize: '11px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <Download size={13} color="#B08D57" />
                        <span>{t.downloadSummary} (PNG)</span>
                      </button>

                      <a
                        href={generateWhatsAppHandoffURL(convState)}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 14px',
                          borderRadius: '999px',
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          fontSize: '11px',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <Share2 size={13} />
                        <span>{t.shareWhatsApp}</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* ── Rich Message: Project Carousel ───────────────────────── */}
                {msg.richType === 'project_carousel' && msg.richData?.projects && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      overflowX: 'auto',
                      width: '100%',
                      padding: '8px 0',
                    }}
                  >
                    {(msg.richData.projects as Array<{ title: string; coverImage: string; category: string; location: string }>).map((p, idx) => (
                      <div
                        key={idx}
                        style={{
                          minWidth: '180px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          background: '#FFFFFF',
                          border: '1px solid rgba(176, 141, 87, 0.25)',
                          flexShrink: 0,
                        }}
                      >
                        <img src={p.coverImage} alt={p.title} style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                        <div style={{ padding: '8px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: '#1C1A17' }}>{p.title}</div>
                          <div style={{ fontSize: '9px', color: '#B08D57' }}>{p.category} · {p.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Rich Message: Calendar Slot Picker ───────────────────── */}
                {msg.richType === 'slot_picker' && (
                  <div
                    className="glass-card"
                    style={{
                      marginTop: '12px',
                      padding: '16px',
                      borderRadius: '16px',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: '#B08D57', fontSize: '11px', fontWeight: 700 }}>
                      <Calendar size={14} />
                      <span>Reserve Private Consultation Slot</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { day: 'Tomorrow', date: 'Morning (10:30 AM)' },
                        { day: 'Tomorrow', date: 'Evening (4:30 PM)' },
                        { day: 'This Saturday', date: 'Morning (11:00 AM)' },
                        { day: 'This Saturday', date: 'Evening (5:00 PM)' },
                      ].map((slot, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelectSlot(slot.day, slot.date)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '10px',
                            background: '#FFFFFF',
                            border: '1px solid rgba(176, 141, 87, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            fontSize: '11px',
                            color: '#1C1A17',
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>{slot.day}</span>
                          <span style={{ color: '#B08D57' }}>{slot.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Rich Message: Lead Capture Form ──────────────────────── */}
                {msg.richType === 'lead_form' && !leadSubmitted && (
                  <form
                    onSubmit={handleLeadSubmit}
                    className="glass-card"
                    style={{
                      marginTop: '12px',
                      padding: '16px',
                      borderRadius: '16px',
                      width: '100%',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <input
                      type="text"
                      placeholder={t.nameLabel}
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(176, 141, 87, 0.3)',
                        fontSize: '12px',
                        outline: 'none',
                      }}
                    />
                    <input
                      type="tel"
                      placeholder={t.phoneLabel}
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid rgba(176, 141, 87, 0.3)',
                        fontSize: '12px',
                        outline: 'none',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '10px',
                        borderRadius: '999px',
                        backgroundColor: '#B08D57',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {t.leadSubmit}
                    </button>
                  </form>
                )}

                {/* ── Rich Message: Contact Card ───────────────────────────── */}
                {msg.richType === 'contact_card' && (
                  <div
                    className="glass-card"
                    style={{
                      marginTop: '12px',
                      padding: '16px',
                      borderRadius: '16px',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#B08D57', marginBottom: '8px' }}>
                      Siriz Interiors Atelier & Joinery
                    </div>
                    <div style={{ fontSize: '12px', color: '#1C1A17', lineHeight: 1.5, marginBottom: '12px' }}>
                      Pearl Flora Bldg, Medavakkam, Chennai 600100
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a
                        href="tel:+918438423938"
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '999px',
                          border: '1px solid #B08D57',
                          color: '#B08D57',
                          fontSize: '11px',
                          fontWeight: 600,
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                        }}
                      >
                        <PhoneCall size={12} />
                        <span>Call</span>
                      </a>
                      <a
                        href="https://wa.me/919384577177"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          padding: '8px',
                          borderRadius: '999px',
                          backgroundColor: '#25D366',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 600,
                          textAlign: 'center',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                        }}
                      >
                        <MessageSquare size={12} />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}



                {/* Suggested Follow-Up Chips */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginTop: '8px',
                    }}
                  >
                    {msg.followUps.map((chipText, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendMessage(chipText)}
                        className="chat-chip"
                      >
                        {chipText}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator with wave dots and shimmer line */}
            {isTyping && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '80%' }}>
                <div className="skeleton-shimmer-line" />
                <div
                  className="bubble-bot"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '12px 16px' }}
                >
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Dock Bar (Clean, Minimal Single Row) */}
          <div
            style={{
              padding: '8px 14px',
              borderTop: '1px solid rgba(169, 136, 82, 0.14)',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            <button
              type="button"
              onClick={() => handleSendMessage('45 days delivery')}
              className="chat-chip"
              style={{ fontSize: '11px', padding: '5px 11px', flexShrink: 0 }}
            >
              ⚡ 45 Days
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('Pricing & packages')}
              className="chat-chip"
              style={{ fontSize: '11px', padding: '5px 11px', flexShrink: 0 }}
            >
              💰 Pricing
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('Book Free Consultation')}
              className="chat-chip"
              style={{ fontSize: '11px', padding: '5px 11px', flexShrink: 0 }}
            >
              📐 Consultation
            </button>
            <button
              type="button"
              onClick={() => window.open(generateWhatsAppHandoffURL(convState), '_blank')}
              className="chat-chip"
              style={{
                fontSize: '11px',
                padding: '5px 11px',
                flexShrink: 0,
                backgroundColor: 'rgba(37, 211, 102, 0.1)',
                borderColor: 'rgba(37, 211, 102, 0.4)',
                color: '#0e7869',
                fontWeight: 700,
              }}
            >
              💬 WhatsApp
            </button>
          </div>

          {/* Minimal Input Bar Form */}
          <form
            onSubmit={handleFormSubmit}
            style={{
              padding: '11px 14px',
              borderTop: '1px solid rgba(169, 136, 82, 0.18)',
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {/* Voice microphone button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              title={isListening ? 'Stop listening' : 'Voice input'}
              style={{
                background: isListening ? 'rgba(239, 68, 68, 0.12)' : 'none',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                color: isListening ? '#ef4444' : 'rgba(27, 25, 22, 0.45)',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <Mic size={16} />
            </button>

            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder={isListening ? t.listening : t.askPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'none',
                fontFamily: '"Manrope", sans-serif',
                fontSize: '12.5px',
                color: '#1B1916',
                padding: '2px 0',
              }}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: 'none',
                background: input.trim() && !isTyping
                  ? 'linear-gradient(135deg, #A98852 0%, #8C6D3B 100%)'
                  : 'rgba(169, 136, 82, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() && !isTyping ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                boxShadow: input.trim() && !isTyping ? '0 3px 10px rgba(169, 136, 82, 0.35)' : 'none',
                flexShrink: 0,
              }}
            >
              <Send size={13} style={{ transform: 'translateX(1px)' }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
