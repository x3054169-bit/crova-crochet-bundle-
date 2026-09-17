import { useState } from 'react';
import { FAQS } from '../data/bundleData';
import { Plus, Minus } from 'lucide-react';

export function FaqSection() {
  // Only one FAQ item is open at a time; opening one closes any previously open item
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Helper to format answers with line breaks and clickable contact links
  const renderAnswer = (faqId: string, text: string) => {
    if (faqId === 'faq-3') {
      const points = text.split('\n\n');
      return (
        <div className="space-y-3.5 text-stone-900 font-normal leading-relaxed text-xs sm:text-sm md:text-[15px]">
          {points.map((point, index) => (
            <p key={index}>{point}</p>
          ))}
        </div>
      );
    }

    if (faqId === 'faq-4') {
      return (
        <p className="text-stone-900 font-normal leading-relaxed text-xs sm:text-sm md:text-[15px]">
          Although, before mailing us, We request you to check your spam &amp; promotional mails as well, if you haven't received your order please contact us on our support email:{' '}
          <a
            href="mailto:facctymann@gmail.com"
            className="font-medium text-stone-900 hover:text-emerald-700 underline underline-offset-2"
          >
            facctymann@gmail.com
          </a>{' '}
          or WhatsApp Us:{' '}
          <a
            href="https://wa.me/918871694891?text=Hi!%20I%20have%20not%20received%20my%20crochet%20bundle%20email%20after%20purchase."
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-stone-900 hover:text-emerald-700 underline underline-offset-2"
          >
            8871694891
          </a>
        </p>
      );
    }

    return (
      <p className="text-stone-900 font-normal leading-relaxed text-xs sm:text-sm md:text-[15px]">
        {text}
      </p>
    );
  };

  return (
    <section className="w-full bg-[#def0fc] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title matching the screenshot exactly: FREQUENTLY ASKED QUESTIONS */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-950 text-center tracking-tight mb-8 sm:mb-12 uppercase">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        {/* 5 Specific FAQ Items matching the user's screenshot */}
        <div className="space-y-6 sm:space-y-7">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            const isLast = index === FAQS.length - 1;

            return (
              <div key={faq.id} className="w-full">
                {/* Dark Green Question Bar with White Text and Minus/Plus Icon */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full bg-[#1b533b] hover:bg-[#164732] active:bg-[#133d2b] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm md:text-base rounded-xs shadow-xs transition-colors cursor-pointer select-none"
                >
                  <span className="pr-3 leading-snug">{faq.question}</span>
                  <span className="shrink-0 text-white font-bold ml-2">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[3]" />
                    )}
                  </span>
                </button>

                {/* Answer container displayed right below the green bar */}
                {isOpen && (
                  <div className="pt-3.5 pb-2 px-1 sm:px-2 animate-fadeIn">
                    {renderAnswer(faq.id, faq.answer)}
                  </div>
                )}

                {/* Bottom line under the last FAQ item as visible in the screenshot */}
                {isLast && isOpen && (
                  <div className="border-b-2 border-stone-800 mt-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
