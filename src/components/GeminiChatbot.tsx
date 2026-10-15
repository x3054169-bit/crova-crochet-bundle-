import { useState, useEffect, useRef, type FormEvent } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RefreshCw, 
  ShoppingCart, 
  Languages, 
  HelpCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { OFFER_2200_CONFIG } from '../data/offer2200';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

const COMMON_QUESTIONS = [
  {
    label: '👶 Kya beginners ke liye hai?',
    prompt: 'Kya yeh crochet bundle complete beginners ke liye suitable hai? Mujhe bilkul bhi crochet nahi aata.',
  },
  {
    label: '📦 Patterns kaise milenge?',
    prompt: 'Payment karne ke baad patterns kaise aur kab milenge?',
  },
  {
    label: '🎥 Video tutorials Hindi me hain?',
    prompt: 'Kya video tutorials Hindi aur English dono language me available hain?',
  },
  {
    label: '📱 Phone me open honge?',
    prompt: 'Kya main apne Android phone ya iPhone par patterns open aur print kar sakta hoon?',
  },
  {
    label: '💰 ₹199 me kya kya included hai?',
    prompt: 'Is 2200+ bundle me ₹199 me kya kya items aur bonuses included hain?',
  },
  {
    label: '🔒 Payment safe hai?',
    prompt: 'Kya UPI, PhonePe ya Google Pay se payment karna 100% safe hai?',
  },
];

export function GeminiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [showFaqList, setShowFaqList] = useState(true);

  const initialGreeting: ChatMessage = {
    id: 'welcome-1',
    role: 'model',
    text: 'Namaste! 🙏 Welcome to Crova.\n\nMain aapki help ke liye yahan hoon. Aap mujhse Hindi, English, ya Hinglish me koi bhi sawaal pooch sakte hain!\n\n(Ask me anything about the 2200+ Crochet Mastery Bundle, videos, delivery, or payment!)',
    timestamp: 'Just now',
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputMessage).trim();
    if (!messageText || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);
    setShowFaqList(false);

    try {
      // Send conversation history to backend Gemini API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || 'Maaf kijiye, mujhe response generate karne me dikkat aayi. Kripya thodi der baad try karein.';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chatbot error:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        text: 'Aapka message receive nahi ho paaya. Kripya apna internet connection check karein ya WhatsApp support (+91 87077 22591) par connect karein! 🙏',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleSelectFaq = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-3.5 sm:right-6 z-40 select-none">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-2.5 bg-gradient-to-r from-[#ea580c] via-[#ea580c] to-[#c2410c] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white/95"
            aria-label="Open Crova Crochet AI Chatbot"
          >
            <div className="relative flex items-center justify-center">
              <span className="text-xl sm:text-2xl">🧶</span>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-stone-900 rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-stone-900 rounded-full" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="font-black text-xs sm:text-sm tracking-tight flex items-center gap-1">
                Have a Question?
                <Sparkles className="w-3 h-3 text-amber-200 fill-amber-200" />
              </span>
              <span className="text-[10px] text-orange-100 font-semibold hidden sm:inline">
                Crova AI • Instant Hindi & English Help
              </span>
              <span className="text-[9px] text-orange-100 font-semibold sm:hidden">
                Chat in Hindi / Hinglish
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Slide-out / Pop-up Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex flex-col w-full sm:w-[420px] h-full sm:h-[620px] bg-white sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden font-sans animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="bg-stone-900 text-white px-4 py-3.5 flex items-center justify-between shadow-xs shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-[#ea580c] flex items-center justify-center text-white shadow-md">
                <span className="text-lg">🧶</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-stone-900 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-sm tracking-wide">Crova AI Assistant</h3>
                  <span className="px-1.5 py-0.2 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                    Gemini
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 flex items-center gap-1">
                  <Languages className="w-3 h-3 text-amber-400" />
                  <span>Hindi • Hinglish • English</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([initialGreeting])}
                title="Restart Chat"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick FAQ Suggestion Bar */}
          <div className="bg-[#fcfaf7] border-b border-stone-200/80 px-3 py-2 shrink-0">
            <div className="flex items-center justify-between text-[11px] text-stone-600 mb-1.5 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-[#ea580c]" />
                Common Questions
              </span>
              <button
                type="button"
                onClick={() => setShowFaqList(prev => !prev)}
                className="text-[10px] text-stone-500 hover:text-stone-800 font-semibold cursor-pointer"
              >
                {showFaqList ? 'Hide' : 'Show All'}
              </button>
            </div>

            {showFaqList && (
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {COMMON_QUESTIONS.map((faq, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectFaq(faq.prompt)}
                    className="whitespace-nowrap bg-white border border-stone-200 text-stone-800 text-[11px] font-medium px-2.5 py-1 rounded-full shadow-2xs hover:border-[#ea580c] hover:bg-orange-50/50 transition-colors cursor-pointer shrink-0"
                  >
                    {faq.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#faf7f2]/50">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 text-xs shadow-xs mt-0.5">
                      🧶
                    </div>
                  )}

                  <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-[#ea580c] text-white rounded-br-xs shadow-xs font-medium'
                          : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="block text-[10px] text-stone-400 mt-0.5 px-1 font-medium">
                      {msg.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#ea580c] text-white flex items-center justify-center shrink-0 text-xs shadow-xs mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 text-xs shadow-xs mt-0.5">
                  🧶
                </div>
                <div className="bg-white border border-stone-200/90 rounded-2xl rounded-bl-xs px-4 py-2.5 shadow-xs flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-stone-500">Crova AI is thinking...</span>
                  <div className="flex gap-1 ml-1">
                    <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Direct CTA Banner Inside Chat */}
          <div className="bg-[#fff7ed] border-t border-orange-200/70 px-3.5 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs">🎁</span>
              <span className="text-[11px] font-bold text-stone-800">
                2200+ Bundle for <strong className="text-[#ea580c]">₹199 only</strong>
              </span>
            </div>
            <a
              href={OFFER_2200_CONFIG.checkoutUrl}
              className="inline-flex items-center gap-1 bg-[#ea580c] hover:bg-[#c2410c] text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-xs transition-colors no-underline"
            >
              <ShoppingCart className="w-3 h-3" />
              <span>Get Offer</span>
            </a>
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask in Hindi, English, or Hinglish..."
              disabled={isLoading}
              className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/50 focus:border-[#ea580c] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-40 disabled:hover:bg-[#ea580c] text-white p-2.5 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
