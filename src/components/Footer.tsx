import { PolicyType } from './PolicyModal';

interface FooterProps {
  onOpenPolicy: (policy: PolicyType) => void;
}

export function Footer({ onOpenPolicy }: FooterProps) {
  // SVG Golden Scalloped 100% Satisfaction Guarantee Seal matching image.png
  const renderScallopedSeal = () => {
    const numPoints = 36;
    const outerR = 96;
    const innerR = 86;
    const center = 100;
    const points: string[] = [];

    for (let i = 0; i < numPoints * 2; i++) {
      const angle = (i * Math.PI) / numPoints;
      const r = i % 2 === 0 ? outerR : innerR;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }

    return (
      <svg 
        viewBox="0 0 200 200" 
        className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-lg select-none mx-auto"
        aria-label="Customer Satisfaction 100% Guarantee"
      >
        <defs>
          <radialGradient id="sealGoldGrad" cx="50%" cy="42%" r="65%">
            <stop offset="0%" stopColor="#fff7c2" />
            <stop offset="35%" stopColor="#f5c042" />
            <stop offset="70%" stopColor="#df9724" />
            <stop offset="100%" stopColor="#a3630f" />
          </radialGradient>

          <radialGradient id="innerSealGrad" cx="50%" cy="40%" r="58%">
            <stop offset="0%" stopColor="#fffde6" />
            <stop offset="45%" stopColor="#f7cd59" />
            <stop offset="85%" stopColor="#e29e24" />
            <stop offset="100%" stopColor="#be7312" />
          </radialGradient>

          {/* Curved path for top text */}
          <path id="curveCustomerTop" d="M 36 100 A 64 64 0 0 1 164 100" fill="none" />
          {/* Curved path for bottom text */}
          <path id="curveGuaranteeBottom" d="M 40 100 A 60 60 0 0 0 160 100" fill="none" />
        </defs>

        {/* 1. Scalloped golden outer perimeter */}
        <polygon 
          points={points.join(' ')} 
          fill="url(#sealGoldGrad)" 
          stroke="#8c5008" 
          strokeWidth="1.5" 
        />

        {/* 2. Inner Golden Disc */}
        <circle cx="100" cy="100" r="82" fill="url(#innerSealGrad)" stroke="#b86f0d" strokeWidth="1" />

        {/* 3. Outer Black Circular Ring */}
        <circle cx="100" cy="100" r="75" fill="none" stroke="#262626" strokeWidth="2.2" />

        {/* 4. Dotted Inner Ring */}
        <circle cx="100" cy="100" r="71" fill="none" stroke="#262626" strokeWidth="1" strokeDasharray="2.5 3" />

        {/* 5. Curved Top Text: CUSTOMER SATISFACTION */}
        <text className="font-black">
          <textPath 
            href="#curveCustomerTop" 
            startOffset="50%" 
            textAnchor="middle" 
            fill="#1c1917" 
            fontSize="10" 
            letterSpacing="2"
            style={{ fontWeight: 900, fontFamily: 'sans-serif' }}
          >
            • CUSTOMER SATISFACTION •
          </textPath>
        </text>

        {/* 6. Center Big Number: 100% with double ring */}
        <circle cx="100" cy="100" r="38" fill="none" stroke="#262626" strokeWidth="1.8" />
        <circle cx="100" cy="100" r="35" fill="none" stroke="#262626" strokeWidth="0.8" strokeDasharray="1.5 2" />
        
        <text 
          x="100" 
          y="110" 
          textAnchor="middle" 
          fill="#1c1917" 
          fontSize="36" 
          style={{ fontWeight: 950, fontFamily: 'serif' }}
        >
          100
          <tspan fontSize="18" dy="-12">%</tspan>
        </text>

        {/* 7. Curved Bottom Text: GUARANTEE */}
        <text className="font-black">
          <textPath 
            href="#curveGuaranteeBottom" 
            startOffset="50%" 
            textAnchor="middle" 
            fill="#1c1917" 
            fontSize="11" 
            letterSpacing="3.5"
            style={{ fontWeight: 900, fontFamily: 'sans-serif' }}
          >
            • GUARANTEE •
          </textPath>
        </text>
      </svg>
    );
  };

  return (
    <footer className="w-full">
      {/* 1. UPPER SECTION: White Background with Satisfaction Medal & Copy matching image.png */}
      <div className="bg-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Centered Golden Customer Satisfaction Seal */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            {renderScallopedSeal()}
          </div>

          {/* Heading: "Your Satisfaction is our No.1 Priority!" */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mb-4 sm:mb-6">
            Your Satisfaction is our No.1 Priority!
          </h2>

          {/* Body description matching image.png */}
          <p className="text-stone-700 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-3xl mx-auto font-normal">
            Your satisfaction is our top priority. The Ultimate Premium Crochet Bundle is crafted with high-quality, professional-grade resources to ensure you can create stunning crochet projects. We are confident that you will love the results. Join thousands of happy users who have transformed their work with our comprehensive bundle.
          </p>
        </div>
      </div>

      {/* 2. LOWER SECTION: Deep Forest Green Background with Navigation Links & Disclaimer matching image.png */}
      <div className="bg-[#1e3329] text-white py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Working Links Row for Dedicated Pages */}
          <nav 
            className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 text-sm sm:text-base font-bold text-white mb-8"
            aria-label="Footer policies"
          >
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-emerald-300 transition-colors cursor-pointer hover:underline underline-offset-4"
            >
              Privacy Policy
            </button>

            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-emerald-300 transition-colors cursor-pointer hover:underline underline-offset-4"
            >
              Terms &amp; Conditions
            </button>

            <button
              onClick={() => onOpenPolicy('refund')}
              className="hover:text-emerald-300 transition-colors cursor-pointer hover:underline underline-offset-4"
            >
              Refund &amp; Returns Policy
            </button>

            <button
              onClick={() => onOpenPolicy('shipping')}
              className="hover:text-emerald-300 transition-colors cursor-pointer hover:underline underline-offset-4"
            >
              Shipping Policy
            </button>

            <button
              onClick={() => onOpenPolicy('contact')}
              className="hover:text-emerald-300 transition-colors cursor-pointer hover:underline underline-offset-4"
            >
              Contact Us
            </button>
          </nav>

          {/* Detailed Legal and Earnings Disclaimer matching image.png */}
          <p className="text-xs sm:text-[13px] text-stone-200/90 font-normal leading-relaxed text-center">
            This site is not a part of the Facebook™ website or Facebook™ Inc. Additionally, This site is NOT endorsed by Facebook™ in any way. FACEBOOK™ is a trademark of FACEBOOK™, Inc. As stipulated by law, we can not and do not make any guarantees about your ability to get results or earn any money with my ideas, information, tools or strategies. I just want to help you by giving great content, direction and strategies that worked well for me and my students and that I believe can help you move forward. All of my terms, privacy policies and disclaimers for this program and website can be accessed via the links. I feel transparency is important and I hold ourselves (you & me) to a high standard of integrity. Thanks for stopping by. I hope this training and content brings you a lot of value &amp; results.
          </p>

          {/* Additional auxiliary policy links and copyright */}
          <div className="mt-8 pt-6 border-t border-emerald-800/60 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-emerald-200/70">
            <button
              onClick={() => onOpenPolicy('refund')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenPolicy('shipping')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Shipping Policy
            </button>
            <span>•</span>
            <span>Copyright © 2026 Crova. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
