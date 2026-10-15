import { useState, useEffect } from 'react';
import { 
  Star, 
  ShoppingCart, 
  HelpCircle, 
  Plus, 
  Minus, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Lock 
} from 'lucide-react';
import { OFFER_2200_CONFIG } from '../data/offer2200';
import { PolicyModal, PolicyType } from './PolicyModal';
import { ReviewSlider } from './ReviewSlider';
import { RecentSalesTicker } from './RecentSalesTicker';
import { BundleHoldersCounter } from './BundleHoldersCounter';
import { ExitIntentModal } from './ExitIntentModal';
import { BackToTop } from './BackToTop';
import { SecurePaymentTrust } from './SecurePaymentTrust';
import { ScrollProgressBar } from './ScrollProgressBar';
import { LimitedTimeCountdown } from './LimitedTimeCountdown';
import { ComparisonTable } from './ComparisonTable';

interface CategoryItem {
  id: string;
  name: string;
  images: string[];
  singleImage?: string;
}

const CATEGORIES_GROUP_1: CategoryItem[] = [
  {
    id: 'amigurumi',
    name: 'Amigurumi',
    singleImage: 'https://i.ibb.co/gZPsrv2k/amigurumi.jpg',
    images: [
      'https://i.ibb.co/gZPsrv2k/amigurumi.jpg',
      'https://i.ibb.co/gZPsrv2k/amigurumi.jpg',
      'https://i.ibb.co/gZPsrv2k/amigurumi.jpg',
      'https://i.ibb.co/gZPsrv2k/amigurumi.jpg'
    ]
  },
  {
    id: 'toys',
    name: 'Toys & Dolls',
    singleImage: 'https://i.ibb.co/bMRVzJGv/Toys-Dolls.jpg',
    images: [
      'https://i.ibb.co/bMRVzJGv/Toys-Dolls.jpg',
      'https://i.ibb.co/bMRVzJGv/Toys-Dolls.jpg',
      'https://i.ibb.co/bMRVzJGv/Toys-Dolls.jpg',
      'https://i.ibb.co/bMRVzJGv/Toys-Dolls.jpg'
    ]
  },
  {
    id: 'animal',
    name: 'Zoo Animals',
    singleImage: 'https://i.ibb.co/PZh96rV1/zoo-animals.jpg',
    images: [
      'https://i.ibb.co/PZh96rV1/zoo-animals.jpg',
      'https://i.ibb.co/PZh96rV1/zoo-animals.jpg',
      'https://i.ibb.co/PZh96rV1/zoo-animals.jpg',
      'https://i.ibb.co/PZh96rV1/zoo-animals.jpg'
    ]
  },
  {
    id: 'doll',
    name: 'Ragdolls',
    singleImage: 'https://i.ibb.co/cSx6FysH/Pastel-Crochet-Ragdoll.jpg',
    images: [
      'https://i.ibb.co/cSx6FysH/Pastel-Crochet-Ragdoll.jpg',
      'https://i.ibb.co/cSx6FysH/Pastel-Crochet-Ragdoll.jpg',
      'https://i.ibb.co/cSx6FysH/Pastel-Crochet-Ragdoll.jpg',
      'https://i.ibb.co/cSx6FysH/Pastel-Crochet-Ragdoll.jpg'
    ]
  },
  {
    id: 'festival',
    name: 'Festival & Holidays',
    singleImage: 'https://i.ibb.co/8DdtcWQW/fastival.jpg',
    images: [
      'https://i.ibb.co/8DdtcWQW/fastival.jpg',
      'https://i.ibb.co/8DdtcWQW/fastival.jpg',
      'https://i.ibb.co/8DdtcWQW/fastival.jpg',
      'https://i.ibb.co/8DdtcWQW/fastival.jpg'
    ]
  },
  {
    id: 'baby-clothes-shoes',
    name: 'Baby Booties & Clothes',
    singleImage: 'https://i.ibb.co/QFTLX0nr/Baby-Booties-Clothes.jpg',
    images: [
      'https://i.ibb.co/QFTLX0nr/Baby-Booties-Clothes.jpg',
      'https://i.ibb.co/QFTLX0nr/Baby-Booties-Clothes.jpg',
      'https://i.ibb.co/QFTLX0nr/Baby-Booties-Clothes.jpg',
      'https://i.ibb.co/QFTLX0nr/Baby-Booties-Clothes.jpg'
    ]
  },
  {
    id: 'women-clothes',
    name: 'Wearables & Tops',
    singleImage: 'https://i.ibb.co/LX13Qq5x/Wearables-Tops.jpg',
    images: [
      'https://i.ibb.co/LX13Qq5x/Wearables-Tops.jpg',
      'https://i.ibb.co/LX13Qq5x/Wearables-Tops.jpg',
      'https://i.ibb.co/LX13Qq5x/Wearables-Tops.jpg',
      'https://i.ibb.co/LX13Qq5x/Wearables-Tops.jpg'
    ]
  },
  {
    id: 'earring',
    name: 'Earrings & Jewelry',
    singleImage: 'https://i.ibb.co/vxsyPm0G/Earrings-Jewelry.jpg',
    images: [
      'https://i.ibb.co/vxsyPm0G/Earrings-Jewelry.jpg',
      'https://i.ibb.co/vxsyPm0G/Earrings-Jewelry.jpg',
      'https://i.ibb.co/vxsyPm0G/Earrings-Jewelry.jpg',
      'https://i.ibb.co/vxsyPm0G/Earrings-Jewelry.jpg'
    ]
  }
];

const CATEGORIES_GROUP_2: CategoryItem[] = [
  {
    id: 'backpack',
    name: 'Backpacks',
    singleImage: 'https://i.ibb.co/JRn9gLsf/Crochet-Backpack.jpg',
    images: [
      'https://i.ibb.co/JRn9gLsf/Crochet-Backpack.jpg',
      'https://i.ibb.co/JRn9gLsf/Crochet-Backpack.jpg',
      'https://i.ibb.co/JRn9gLsf/Crochet-Backpack.jpg',
      'https://i.ibb.co/JRn9gLsf/Crochet-Backpack.jpg'
    ]
  },
  {
    id: 'bags-handbag',
    name: 'Bags & Handbags',
    singleImage: 'https://i.ibb.co/Y4kT9tY5/Bags-Handbags.jpg',
    images: [
      'https://i.ibb.co/Y4kT9tY5/Bags-Handbags.jpg',
      'https://i.ibb.co/Y4kT9tY5/Bags-Handbags.jpg',
      'https://i.ibb.co/Y4kT9tY5/Bags-Handbags.jpg',
      'https://i.ibb.co/Y4kT9tY5/Bags-Handbags.jpg'
    ]
  },
  {
    id: 'purse-basket',
    name: 'Purse & Baskets',
    singleImage: 'https://i.ibb.co/q3xv63kd/Purse-Baskets.jpg',
    images: [
      'https://i.ibb.co/q3xv63kd/Purse-Baskets.jpg',
      'https://i.ibb.co/q3xv63kd/Purse-Baskets.jpg',
      'https://i.ibb.co/q3xv63kd/Purse-Baskets.jpg',
      'https://i.ibb.co/q3xv63kd/Purse-Baskets.jpg'
    ]
  },
  {
    id: 'winter-collection',
    name: 'Winter Collection',
    singleImage: 'https://i.ibb.co/1FV4Mj0/Winter-Collection.jpg',
    images: [
      'https://i.ibb.co/1FV4Mj0/Winter-Collection.jpg',
      'https://i.ibb.co/1FV4Mj0/Winter-Collection.jpg',
      'https://i.ibb.co/1FV4Mj0/Winter-Collection.jpg',
      'https://i.ibb.co/1FV4Mj0/Winter-Collection.jpg'
    ]
  },
  {
    id: 'slippers',
    name: 'Slippers & Socks',
    singleImage: 'https://i.ibb.co/dwDr2yXv/Slippers-Socks.jpg',
    images: [
      'https://i.ibb.co/dwDr2yXv/Slippers-Socks.jpg',
      'https://i.ibb.co/dwDr2yXv/Slippers-Socks.jpg',
      'https://i.ibb.co/dwDr2yXv/Slippers-Socks.jpg',
      'https://i.ibb.co/dwDr2yXv/Slippers-Socks.jpg'
    ]
  },
  {
    id: 'hat',
    name: 'Hats & Beanies',
    singleImage: 'https://i.ibb.co/GvQCR75W/Hats-Beanies.jpg',
    images: [
      'https://i.ibb.co/GvQCR75W/Hats-Beanies.jpg',
      'https://i.ibb.co/GvQCR75W/Hats-Beanies.jpg',
      'https://i.ibb.co/GvQCR75W/Hats-Beanies.jpg',
      'https://i.ibb.co/GvQCR75W/Hats-Beanies.jpg'
    ]
  },
  {
    id: 'blanket',
    name: 'Blankets & Throws',
    singleImage: 'https://i.ibb.co/NdygsLvK/Blankets-Throws.jpg',
    images: [
      'https://i.ibb.co/NdygsLvK/Blankets-Throws.jpg',
      'https://i.ibb.co/NdygsLvK/Blankets-Throws.jpg',
      'https://i.ibb.co/NdygsLvK/Blankets-Throws.jpg',
      'https://i.ibb.co/NdygsLvK/Blankets-Throws.jpg'
    ]
  },
  {
    id: 'pillow',
    name: 'Pillows & Cushions',
    singleImage: 'https://i.ibb.co/hJxbH4dN/Pillows-Cushions.jpg',
    images: [
      'https://i.ibb.co/hJxbH4dN/Pillows-Cushions.jpg',
      'https://i.ibb.co/hJxbH4dN/Pillows-Cushions.jpg',
      'https://i.ibb.co/hJxbH4dN/Pillows-Cushions.jpg',
      'https://i.ibb.co/hJxbH4dN/Pillows-Cushions.jpg'
    ]
  }
];

const CATEGORIES_GROUP_3: CategoryItem[] = [
  {
    id: 'keychain',
    name: 'Keychains & Charms',
    singleImage: 'https://i.ibb.co/S4z7mH5x/Keychains-Charms.jpg',
    images: [
      'https://i.ibb.co/S4z7mH5x/Keychains-Charms.jpg',
      'https://i.ibb.co/S4z7mH5x/Keychains-Charms.jpg',
      'https://i.ibb.co/S4z7mH5x/Keychains-Charms.jpg',
      'https://i.ibb.co/S4z7mH5x/Keychains-Charms.jpg'
    ]
  },
  {
    id: 'alphabets',
    name: 'Alphabet Letters',
    singleImage: 'https://i.ibb.co/39h92Vng/Alphabet-Letters.jpg',
    images: [
      'https://i.ibb.co/39h92Vng/Alphabet-Letters.jpg',
      'https://i.ibb.co/39h92Vng/Alphabet-Letters.jpg',
      'https://i.ibb.co/39h92Vng/Alphabet-Letters.jpg',
      'https://i.ibb.co/39h92Vng/Alphabet-Letters.jpg'
    ]
  },
  {
    id: 'granny-square',
    name: 'Granny Squares',
    singleImage: 'https://i.ibb.co/b5Lcd7Gk/Granny-Squares.jpg',
    images: [
      'https://i.ibb.co/b5Lcd7Gk/Granny-Squares.jpg',
      'https://i.ibb.co/b5Lcd7Gk/Granny-Squares.jpg',
      'https://i.ibb.co/b5Lcd7Gk/Granny-Squares.jpg',
      'https://i.ibb.co/b5Lcd7Gk/Granny-Squares.jpg'
    ]
  },
  {
    id: 'baby-cloth',
    name: 'Baby Rompers & Sets',
    singleImage: 'https://i.ibb.co/s9WzgjVd/Baby-Rompers-Sets.jpg',
    images: [
      'https://i.ibb.co/s9WzgjVd/Baby-Rompers-Sets.jpg',
      'https://i.ibb.co/s9WzgjVd/Baby-Rompers-Sets.jpg',
      'https://i.ibb.co/s9WzgjVd/Baby-Rompers-Sets.jpg',
      'https://i.ibb.co/s9WzgjVd/Baby-Rompers-Sets.jpg'
    ]
  },
  {
    id: 'flower',
    name: 'Flowers & Bouquets',
    singleImage: 'https://i.ibb.co/wNpp7zMX/Flowers-Bouquets.jpg',
    images: [
      'https://i.ibb.co/wNpp7zMX/Flowers-Bouquets.jpg',
      'https://i.ibb.co/wNpp7zMX/Flowers-Bouquets.jpg',
      'https://i.ibb.co/wNpp7zMX/Flowers-Bouquets.jpg',
      'https://i.ibb.co/wNpp7zMX/Flowers-Bouquets.jpg'
    ]
  },
  {
    id: 'hanging-holder',
    name: 'Hangings & Plant Holders',
    singleImage: 'https://i.ibb.co/Sw7WMvvY/Hangings-Plant-Holders.jpg',
    images: [
      'https://i.ibb.co/Sw7WMvvY/Hangings-Plant-Holders.jpg',
      'https://i.ibb.co/Sw7WMvvY/Hangings-Plant-Holders.jpg',
      'https://i.ibb.co/Sw7WMvvY/Hangings-Plant-Holders.jpg',
      'https://i.ibb.co/Sw7WMvvY/Hangings-Plant-Holders.jpg'
    ]
  },
  {
    id: 'home-decor',
    name: 'Home Décor Accents',
    singleImage: 'https://i.ibb.co/qL27ZdNB/Home-D-cor.jpg',
    images: [
      'https://i.ibb.co/qL27ZdNB/Home-D-cor.jpg',
      'https://i.ibb.co/qL27ZdNB/Home-D-cor.jpg',
      'https://i.ibb.co/qL27ZdNB/Home-D-cor.jpg',
      'https://i.ibb.co/qL27ZdNB/Home-D-cor.jpg'
    ]
  }
];

const BONUSES_3D = [
  {
    id: 1,
    number: 'Bonus 1',
    title: 'Crochet Beginner to Pro Guide',
    subtitle: 'Step-by-step master handbook',
    tag: 'E-Book Handbook',
    image: 'https://i.ibb.co/RkP0czHM/crochet-guide-course-bundle-image-21.png',
  },
  {
    id: 2,
    number: 'Bonus 2',
    title: 'Crochet Color Theory Guide',
    subtitle: 'Yarn palette harmony & gradients',
    tag: 'Color Chart',
    image: 'https://i.ibb.co/mFCxFStx/crochet-color-theory-bundle-image-21.png',
  },
  {
    id: 3,
    number: 'Bonus 3',
    title: '45 Foundation Techniques',
    subtitle: 'Stitches, seams & shaping secrets',
    tag: 'Masterclass',
    image: 'https://i.ibb.co/Pz9TpVVV/crochet-45-techniques-theory-bundle-image-21.png',
  },
  {
    id: 4,
    number: 'Bonus 4',
    title: 'Printable Digital Planner',
    subtitle: 'Project tracker & yarn organizer',
    tag: 'Printable PDF',
    image: 'https://i.ibb.co/Nd9JSfLM/crochet-digital-planner-course-bundle-image-21.png',
  },
  {
    id: 5,
    number: 'Bonus 5',
    title: '30 Decorative Stitches Course',
    subtitle: 'Waffle, Alpine, Jasmine & more',
    tag: 'Video Course',
    image: 'https://i.ibb.co/JWcpVtYV/crochet-30-new-stitches-course-bundle-image-2-21.png',
  },
  {
    id: 6,
    number: 'Bonus 6',
    title: 'Lifetime Access & Updates',
    subtitle: 'Unlimited streaming & cloud access',
    tag: 'VIP Access',
    image: 'https://i.ibb.co/ynFk5CxZ/crochet-learning-videos-bundle-image-21.png',
  },
];

const FAQS_LIST = [
  {
    q: 'How will I receive the bundle after purchase?',
    a: 'Instantly after checkout, you will receive an automatic download link on the screen. The full Google Drive access and high-resolution PDF package will also be dispatched directly to your registered email and WhatsApp within 5 minutes.',
  },
  {
    q: 'Do I need any special software to open the files?',
    a: 'No special software is needed! All pattern books and planners are provided in standard, universally compatible high-resolution PDF format. The video lessons can be streamed directly or downloaded onto any smartphone, tablet, laptop, or desktop.',
  },
  {
    q: 'Is this bundle suitable for complete beginners?',
    a: 'Yes, 100%! We start from square one: how to comfortably hold your hook and yarn, mastering foundational stitches (single, double, half-double, and magic circle), before gradually progressing toward full garments and intricate amigurumi plushies.',
  },
  {
    q: 'Can I sell the finished handmade items I make from these patterns?',
    a: 'Yes! You have full commercial freedom to craft and sell finished physical products made with any of these patterns at craft fairs, Etsy shops, Instagram stores, or local boutiques.',
  },
  {
    q: 'Will I receive future pattern updates?',
    a: 'Yes! Your purchase grants you lifetime cloud access. Whenever we add new seasonal patterns or bonus modules, you will receive them in your member drive at zero extra charge.',
  },
  {
    q: 'What if I need help or have questions after buying?',
    a: 'Our dedicated Crova artisan support team is available via WhatsApp (+91 8871694891) and email (support.crova@gmail.com) to assist you with stitch questions, pattern walkthroughs, or file access at any time.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Because digital files and masterclass links are instantly delivered upon payment, this special launch promotional offer is non-refundable. However, we stand behind our craft with a 100% file delivery and customer satisfaction guarantee.',
  },
  {
    q: 'In which languages are the pattern guides and video lessons available?',
    a: 'All written pattern guides, abbreviation indexes, and stitch charts are clearly formatted in English (with standard US/UK conversion charts). The step-by-step video mastery tutorials are explained in clear, easy-to-follow Hindi and English.',
  },
];

interface Offer2200PlaceholderProps {
  onSwitchOffer?: (offer: '2200' | '1000') => void;
}

export function Offer2200Placeholder(_props: Offer2200PlaceholderProps = {}) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 21,
    seconds: 15,
  });

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [policyModal, setPolicyModal] = useState<{ isOpen: boolean; policy: PolicyType }>({
    isOpen: false,
    policy: 'privacy',
  });

  const handleOpenPolicy = (policy: PolicyType) => {
    setPolicyModal({ isOpen: true, policy });
  };

  const renderGuaranteeSeal = () => {
    return (
      <svg 
        viewBox="0 0 200 200" 
        className="w-32 h-32 sm:w-36 sm:h-36 mx-auto drop-shadow-xl select-none"
        aria-label="100% Satisfaction Guarantee"
      >
        <defs>
          <radialGradient id="sealGoldOuter" cx="45%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#fff8db" />
            <stop offset="25%" stopColor="#f5c253" />
            <stop offset="55%" stopColor="#d88d22" />
            <stop offset="85%" stopColor="#965609" />
            <stop offset="100%" stopColor="#5d3503" />
          </radialGradient>
          <radialGradient id="sealGoldInner" cx="45%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#fffae6" />
            <stop offset="35%" stopColor="#f7cc60" />
            <stop offset="70%" stopColor="#de9520" />
            <stop offset="100%" stopColor="#874a05" />
          </radialGradient>
          <linearGradient id="sealNavyRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="50%" stopColor="#0f2137" />
            <stop offset="100%" stopColor="#183153" />
          </linearGradient>
          <path id="curveSatisfaction" d="M 36 100 A 64 64 0 0 1 164 100" fill="none" />
          <path id="curveRiskFree" d="M 40 100 A 60 60 0 0 0 160 100" fill="none" />
        </defs>

        {/* 36-Point Scalloped Gold Gear */}
        <circle cx="100" cy="100" r="95" fill="url(#sealGoldOuter)" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#78350f" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="100" cy="100" r="84" fill="url(#sealGoldOuter)" />

        {/* Deep Navy/Black Circular Ribbon Ring */}
        <circle cx="100" cy="100" r="76" fill="url(#sealNavyRing)" stroke="#eab308" strokeWidth="2.2" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#ca8a04" strokeWidth="1.8" />

        {/* Curved Text: SATISFACTION */}
        <text fill="#ffffff" fontSize="10.5" fontWeight="900" letterSpacing="2.5" textAnchor="middle">
          <textPath href="#curveSatisfaction" startOffset="50%">
            ★ SATISFACTION ★
          </textPath>
        </text>

        {/* Curved Text: RISK FREE SHOPPING */}
        <text fill="#fef08a" fontSize="7.5" fontWeight="800" letterSpacing="1.2" textAnchor="middle">
          <textPath href="#curveRiskFree" startOffset="50%">
            • RISK FREE SHOPPING •
          </textPath>
        </text>

        {/* Center Golden Medallion */}
        <circle cx="100" cy="100" r="46" fill="url(#sealGoldInner)" stroke="#92400e" strokeWidth="1.2" />
        <circle cx="100" cy="100" r="42" fill="none" stroke="#78350f" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* 100% Center Text */}
        <text 
          x="100" 
          y="102" 
          textAnchor="middle" 
          fill="#1c1917" 
          fontSize="26" 
          fontWeight="900" 
          style={{ fontFamily: 'serif' }}
        >
          100%
        </text>

        {/* GUARANTEE Ribbon Badge */}
        <rect x="62" y="106" width="76" height="14" rx="2.5" fill="#1c1917" stroke="#fbbf24" strokeWidth="0.9" />
        <text 
          x="100" 
          y="116.5" 
          textAnchor="middle" 
          fill="#fbbf24" 
          fontSize="7.5" 
          fontWeight="900" 
          letterSpacing="1.5"
        >
          GUARANTEE
        </text>
      </svg>
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 14, minutes: 21, seconds: 15 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckoutClick = () => {
    try {
      if (typeof window !== 'undefined') {
        const win = window as unknown as { dataLayer?: Record<string, unknown>[]; fbq?: (...args: unknown[]) => void };
        if (win.dataLayer) {
          win.dataLayer.push({
            event: 'InitiateCheckout',
            content_id: OFFER_2200_CONFIG.contentId,
            content_name: OFFER_2200_CONFIG.contentName,
            currency: 'INR',
            value: 199,
          });
        }
        if (win.fbq) {
          win.fbq('track', 'InitiateCheckout', {
            content_id: OFFER_2200_CONFIG.contentId,
            content_name: OFFER_2200_CONFIG.contentName,
            currency: 'INR',
            value: 199,
          });
        }
      }
    } catch {
      // Ignore analytics tracking errors
    }

    window.location.href = OFFER_2200_CONFIG.checkoutUrl;
  };

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  // Cohesive, clean timer pill element
  const renderConsistentTimer = (label: string = 'Special Launch Discount Ends In') => {
    return (
      <div className="my-5 text-center bg-[#fdf9f4] border border-amber-200/70 rounded-2xl p-4 shadow-xs">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
          {label}
        </p>
        <div className="flex items-center justify-center gap-2.5">
          <div className="bg-white border border-amber-200/80 rounded-xl py-1.5 px-3 min-w-[68px] shadow-xs">
            <span className="block text-xl font-black text-[#c2410c] leading-none font-sans">
              {formatDigit(timeLeft.hours)}
            </span>
            <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">
              Hours
            </span>
          </div>
          <div className="bg-white border border-amber-200/80 rounded-xl py-1.5 px-3 min-w-[68px] shadow-xs">
            <span className="block text-xl font-black text-[#c2410c] leading-none font-sans">
              {formatDigit(timeLeft.minutes)}
            </span>
            <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">
              Mins
            </span>
          </div>
          <div className="bg-white border border-amber-200/80 rounded-xl py-1.5 px-3 min-w-[68px] shadow-xs">
            <span className="block text-xl font-black text-[#c2410c] leading-none font-sans">
              {formatDigit(timeLeft.seconds)}
            </span>
            <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-0.5">
              Secs
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderCategoryCard = (category: CategoryItem) => (
    <div key={category.id} className="bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
      {/* Category Header in cohesive warm stone/amber style */}
      <div className="bg-stone-900 text-white text-center py-1.5 sm:py-2 px-1 sm:px-2.5">
        <h4 className="font-bold text-xs sm:text-sm tracking-wide font-sans">
          {category.name}
        </h4>
      </div>

      {/* 2x2 Image Collage or Full Cover Image */}
      <div className="relative p-1 sm:p-2.5 bg-[#faf7f2]">
        {category.singleImage ? (
          <div className="rounded-lg sm:rounded-xl overflow-hidden aspect-square bg-white shadow-2xs group">
            <img
              src={category.singleImage}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl overflow-hidden aspect-square bg-white shadow-2xs group">
            {category.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${category.name} pattern ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-950 pb-20">
      {/* Subtle Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* Top Countdown Header Bar */}
      <header className="w-full bg-[#1c1917] text-white py-2.5 px-4 shadow-sm border-b border-stone-800">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-2.5">
            <div className="bg-stone-900 border border-stone-700 rounded-lg py-1 px-3 shadow-xs text-center min-w-[70px]">
              <span className="block text-amber-400 font-black text-lg sm:text-xl leading-tight font-sans">
                {formatDigit(timeLeft.hours)}
              </span>
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Hours
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-700 rounded-lg py-1 px-3 shadow-xs text-center min-w-[70px]">
              <span className="block text-amber-400 font-black text-lg sm:text-xl leading-tight font-sans">
                {formatDigit(timeLeft.minutes)}
              </span>
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Minutes
              </span>
            </div>

            <div className="bg-stone-900 border border-stone-700 rounded-lg py-1 px-3 shadow-xs text-center min-w-[70px]">
              <span className="block text-amber-400 font-black text-lg sm:text-xl leading-tight font-sans">
                {formatDigit(timeLeft.seconds)}
              </span>
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Seconds
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <section className="w-full px-2.5 sm:px-5 md:px-8 pt-5 pb-8 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-center">
        {/* Top Eyebrow Headings */}
        <div className="mb-5 max-w-xl mx-auto">
          <p className="text-[#dc2626] font-extrabold text-center text-xs sm:text-sm uppercase tracking-wider">
            Hurry! This Special Offer Ends Soon!
          </p>
          <div className="w-full h-0.5 bg-stone-900 my-2.5" />
          <div className="text-center py-1">
            <h2 className="text-stone-900 font-black text-2xl sm:text-3xl leading-tight font-sans tracking-tight">
              <span className="text-[#ea580c]">2200+</span> Crochet Patterns
            </h2>
            <h2 className="text-stone-900 font-black text-2xl sm:text-3xl leading-tight font-sans tracking-tight">
              The Ultimate Bundle
            </h2>
            <p className="text-[#dc2626] font-black text-2xl sm:text-3xl mt-1 font-sans">
              for Just ₹199
            </p>
          </div>
          <div className="w-full h-0.5 bg-stone-900 my-2.5" />
        </div>

        {/* Hero Offer Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md overflow-hidden text-center">
          {/* Hero Bundle Graphic Image - Fills the top border of the card */}
          <div className="w-full bg-[#fcfaf7] border-b border-stone-100 overflow-hidden">
            <img
              src="https://i.ibb.co/XrLjj8Fv/Crova-s-Ultimate-Crochet-Design-Bundle-1-1.png"
              alt="Crova's Ultimate Crochet Design Bundle - 2200+ Patterns"
              className="w-full h-auto object-cover sm:object-contain mx-auto block hover:scale-[1.01] transition-transform duration-300"
              loading="eager"
            />
          </div>

          <div className="p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
            {/* Pricing & Title */}
            <h3 className="text-xl sm:text-2xl font-black text-stone-950 mt-1 mb-1 font-sans">
              The Ultimate Crochet Mastery Bundle
            </h3>
            <div className="flex items-baseline justify-center gap-2.5 mb-2 font-sans">
              <span className="text-3xl sm:text-4xl font-black text-[#dc2626]">
                Just ₹199
              </span>
              <span className="text-lg sm:text-xl text-stone-400 font-bold line-through decoration-stone-400 decoration-2">
                Rs. 2,999/-
              </span>
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-4 text-xs sm:text-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                ))}
              </div>
              <span className="font-bold text-stone-700">
                Trust Score <strong className="text-stone-900 font-extrabold">4.9</strong> | <strong className="text-stone-900 font-extrabold">9,430</strong> Reviews
              </span>
            </div>

            {/* Dynamic Current Bundle Holders Counter for Real-Time Urgency & Social Proof */}
            <div className="my-3.5">
              <BundleHoldersCounter variant="card" />
            </div>

            <div className="w-full h-px bg-stone-200 my-4" />

            {/* Feature List with Emojis matching Screenshot 1 & 2 */}
            <ul className="text-left space-y-2.5 text-stone-900 font-extrabold text-sm sm:text-base font-sans mb-6">
              <li className="flex items-center gap-2.5">
                <span className="text-base shrink-0">🧶</span>
                <span>Hindi + English Crochet Mastery Course</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base shrink-0">✅</span>
                <span>2200+ Crochet Patterns Step by Step</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base shrink-0">📁</span>
                <span>Digital PDF Patterns</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base shrink-0">💻</span>
                <span>Instant Download Access</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base shrink-0">🎁</span>
                <span>6 Free Bonuses</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base shrink-0">♾️</span>
                <span>Lifetime Access &amp; Updates</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base shrink-0">💬</span>
                <span>24/7 Support</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-base shrink-0">🔥</span>
                <span>Limited-Time Offer!</span>
              </li>
            </ul>

            {/* Prominent Limited-Time Countdown Timer Component */}
            <LimitedTimeCountdown
              externalTimeLeft={timeLeft}
              variant="hero"
              prefixText="Offer ends in"
              className="mb-4"
            />

            {/* Unified Signature Action CTA Button */}
            <a
              href={OFFER_2200_CONFIG.checkoutUrl}
              onClick={handleCheckoutClick}
              className="w-full bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.99] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-orange-500/25 text-base sm:text-lg tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>GET THIS FULL BUNDLE @ ₹199</span>
            </a>

            {/* Secure Payment & Trust Section */}
            <SecurePaymentTrust />
          </div>
        </div>

        {/* Digital Product Note */}
        <div className="my-4 text-center px-3.5 py-2.5 bg-amber-50/80 border border-amber-200/80 rounded-xl shadow-2xs">
          <p className="font-sans text-xs sm:text-sm text-amber-950 font-semibold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span><strong className="text-amber-950 font-bold">Note:</strong> This is an instant digital product, not a physical item.</span>
          </p>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif font-black text-stone-900 text-xl sm:text-2xl leading-snug mb-5 mt-6">
          What&apos;s Inside the Crochet Patterns Collection
        </h2>

        {/* Included in Bundle Card */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-5 sm:p-6 text-left mb-6">
          <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl mb-4 pb-2 border-b border-stone-100">
            Included in the Crochet Bundle
          </h3>

          <ul className="space-y-2.5 text-stone-800 font-bold text-sm sm:text-[15px] font-sans">
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>Crochet Mastery Course</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>2200+ Crochet Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>5000+ Page Crochet Guide</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>30+ Crochet Bags</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>135+ Keychains</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>203+ Bunny Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>Christmas &amp; Winter Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>50+ Home Décor Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>150 Stuffed Toys &amp; Dolls Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>150 Superhero Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>120 Baby Crochet Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>200 Zoo Amigurumi Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>100 Cartoon Character Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>100 Holiday &amp; Festival Patterns</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <span>6 Exclusive Free Bonuses</span>
            </li>
          </ul>

          <a
            href={OFFER_2200_CONFIG.checkoutUrl}
            onClick={handleCheckoutClick}
            className="w-full mt-6 bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.99] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-orange-500/20 text-base sm:text-lg tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
          >
            <span>GET INSTANT ACCESS @ ₹199</span>
          </a>

          {/* Secure Payment & Trust Badges */}
          <SecurePaymentTrust variant="compact" />
        </div>

        {/* 20+ Categories Section */}
        <div className="w-full text-left">
          <div className="text-center my-6">
            <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900 tracking-wide mb-1">
              What Will I Receive
            </h2>
            <p className="text-base sm:text-lg font-serif font-bold text-[#c2410c]">
              20+ Curated Pattern Categories
            </p>
          </div>

          {/* Group 1 Grid */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 p-2 sm:p-5 md:p-6 shadow-sm mb-6 -mx-1 sm:mx-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-5 md:gap-6">
              {CATEGORIES_GROUP_1.map(renderCategoryCard)}
            </div>
          </div>

          {renderConsistentTimer('Launch Offer Active')}

          {/* Group 2 Grid */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 p-2 sm:p-5 md:p-6 shadow-sm mb-6 -mx-1 sm:mx-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-5 md:gap-6">
              {CATEGORIES_GROUP_2.map(renderCategoryCard)}
            </div>
          </div>

          {renderConsistentTimer('Price Increases Soon')}

          {/* Group 3 Grid */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 p-2 sm:p-5 md:p-6 shadow-sm mb-6 -mx-1 sm:mx-0">
            <div className="grid grid-cols-2 gap-2 sm:gap-5 md:gap-6">
              {CATEGORIES_GROUP_3.map(renderCategoryCard)}
            </div>
          </div>

          {/* Clean CTA block */}
          <div className="my-6 text-center">
            <a
              href={OFFER_2200_CONFIG.checkoutUrl}
              onClick={handleCheckoutClick}
              className="w-full max-w-sm mx-auto bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.99] text-white font-black py-3.5 px-6 rounded-2xl shadow-md text-base tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>GET THIS FULL BUNDLE @ ₹199</span>
            </a>
          </div>

          {/* Bonuses Section */}
          <div className="mt-10 mb-8">
            <div className="bg-stone-900 text-white text-center py-3.5 px-4 rounded-t-2xl shadow-sm border-b border-stone-800">
              <p className="text-base sm:text-lg font-black tracking-wide flex items-center justify-center gap-2 text-white">
                <span>🎁</span>
                <span>Unlock Bonuses Worth ₹3,999</span>
                <span>🎁</span>
              </p>
              <p className="text-xs font-semibold tracking-wide mt-0.5 text-amber-400">
                Included 100% Free with Today&apos;s Order
              </p>
            </div>

            <div className="bg-white rounded-b-2xl border border-t-0 border-stone-200/90 p-3.5 sm:p-6 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
                {BONUSES_3D.map(bonus => (
                  <div
                    key={bonus.id}
                    className="bg-[#faf7f2] rounded-2xl border border-stone-200/80 p-3 sm:p-4 flex flex-col items-center text-center shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-white flex items-center justify-center mb-2.5 shadow-xs border border-stone-200/60 group">
                      <img
                        src={bonus.image}
                        alt={bonus.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-[#c2410c] uppercase tracking-wider">
                      {bonus.number}
                    </span>
                    <h4 className="font-bold text-stone-900 text-xs sm:text-sm leading-tight mt-0.5">
                      {bonus.title}
                    </h4>
                    <p className="text-[10px] text-stone-500 mt-0.5 leading-snug line-clamp-1">
                      {bonus.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-6 text-center">
              <a
                href={OFFER_2200_CONFIG.checkoutUrl}
                onClick={handleCheckoutClick}
                className="w-full max-w-sm mx-auto bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.99] text-white font-black py-3.5 px-6 rounded-2xl shadow-md text-base tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>CLAIM ALL 6 BONUSES @ ₹199</span>
              </a>
            </div>
          </div>

          {/* Crova vs Other Crochet Patterns Comparison Table */}
          <ComparisonTable
            checkoutUrl={OFFER_2200_CONFIG.checkoutUrl}
            onOpenCheckout={handleCheckoutClick}
          />

          {/* Customer Reviews Slider matching uploaded screenshot */}
          <ReviewSlider />

          {/* FAQ Section */}
          <div className="mt-10 mb-12">
            <div className="text-center mb-4">
              <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 tracking-wide">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Everything you need to know about your purchase
              </p>
            </div>

            <div className="space-y-2.5">
              {FAQS_LIST.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-3.5 text-left transition-colors hover:bg-stone-50 cursor-pointer gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <HelpCircle className="w-4 h-4 text-[#c2410c] shrink-0" />
                        <span className="font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                          {faq.q}
                        </span>
                      </div>
                      <div className="text-stone-400 shrink-0">
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#c2410c]" />
                        ) : (
                          <Plus className="w-4 h-4 text-stone-500" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm leading-relaxed text-stone-600 border-t border-stone-100 bg-[#faf7f2]/50 font-sans">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Satisfaction Guarantee Section matching image.png */}
        <div className="mt-12 mb-4 text-center pt-8 border-t border-stone-200">
          <div className="mb-6 flex justify-center">
            {renderGuaranteeSeal()}
          </div>

          <a
            href={OFFER_2200_CONFIG.checkoutUrl}
            onClick={handleCheckoutClick}
            className="w-full max-w-sm mx-auto bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.99] text-white font-black py-3.5 px-6 rounded-xl shadow-lg hover:shadow-orange-500/25 text-base sm:text-lg tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
          >
            <span>GET INSTANT ACCESS @ ₹199</span>
          </a>

          {/* Secure Payment & Trust Badges */}
          <div className="max-w-sm mx-auto">
            <SecurePaymentTrust variant="compact" />
          </div>
        </div>
      </section>

      {/* Dark Optimized Footer matching image.png */}
      <footer className="w-full bg-[#1c1917] text-stone-200 pt-10 pb-24 px-4 sm:px-6 border-t border-stone-800">
        <div className="max-w-md mx-auto text-center">
          {/* Vertical Stacked Policy Links */}
          <nav className="flex flex-col items-center gap-3.5 mb-8" aria-label="Footer policies">
            <button
              type="button"
              onClick={() => handleOpenPolicy('privacy')}
              className="text-stone-200 hover:text-white font-bold text-sm tracking-wide transition-colors cursor-pointer hover:underline underline-offset-4"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => handleOpenPolicy('terms')}
              className="text-stone-200 hover:text-white font-bold text-sm tracking-wide transition-colors cursor-pointer hover:underline underline-offset-4"
            >
              Terms &amp; Conditions
            </button>
            <button
              type="button"
              onClick={() => handleOpenPolicy('refund')}
              className="text-stone-200 hover:text-white font-bold text-sm tracking-wide transition-colors cursor-pointer hover:underline underline-offset-4"
            >
              Refund and Returns Policy
            </button>
            <button
              type="button"
              onClick={() => handleOpenPolicy('contact')}
              className="text-stone-200 hover:text-white font-bold text-sm tracking-wide transition-colors cursor-pointer hover:underline underline-offset-4"
            >
              Contact Us
            </button>
          </nav>

          {/* Facebook/Meta Legal Disclaimer */}
          <p className="text-[11px] sm:text-xs text-stone-400 font-normal leading-relaxed text-center mb-6">
            This site is not a part of the Facebook™ website or Facebook™ Inc. Additionally, This site is NOT endorsed by Facebook™ in any way. FACEBOOK™ is a trademark of FACEBOOK™, Inc. As stipulated by law, we can not and do not make any guarantees about your ability to get results or earn any money with our ideas, information, tools or strategies. We just want to help you by giving great content, direction and strategies that worked well for us and our students and that we believe can move you forward. All of our terms, privacy policies and disclaimers for this program and website can be accessed via the links above.
          </p>

          <p className="text-[10px] text-stone-500 font-medium tracking-wider uppercase">
            © {new Date().getFullYear()} Crova. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Dedicated Policy Modal for Seamless In-App Compliance */}
      <PolicyModal
        isOpen={policyModal.isOpen}
        initialPolicy={policyModal.policy}
        onClose={() => setPolicyModal(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Social Proof Recent Sales Ticker */}
      <RecentSalesTicker
        bundleName="the 2200+ Bundle"
        thumbnailUrl="https://i.ibb.co/Wv96sZTf/2200middle.jpg"
        onOpenCheckout={handleCheckoutClick}
      />

      {/* Exit-Intent 10% Discount Offer Modal */}
      <ExitIntentModal
        discountCode="SAVE10"
        discountPercent={10}
        originalPrice={199}
        discountedPrice={179}
        checkoutUrl={OFFER_2200_CONFIG.checkoutUrl}
        onOpenCheckout={handleCheckoutClick}
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Sticky Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-xs border-t border-stone-200 z-40 shadow-lg">
        <div className="max-w-md mx-auto">
          <a
            href={OFFER_2200_CONFIG.checkoutUrl}
            onClick={handleCheckoutClick}
            className="w-full bg-[#ea580c] hover:bg-[#c2410c] active:scale-[0.99] text-white font-black py-3 px-4 rounded-xl shadow-md text-base tracking-wide uppercase transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
          >
            <span>GET INSTANT ACCESS @ ₹199</span>
          </a>
        </div>
      </div>
    </div>
  );
}
