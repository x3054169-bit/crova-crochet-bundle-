import { PatternCategory, BonusItem, ReviewItem, FaqItem, BookSamplePage } from '../types';

export const BUY_NOW_URL = 'https://superprofile.bio/vp/crova-ultimate-crochet-bundle';

export const PATTERN_CATEGORIES: PatternCategory[] = [
  {
    id: 'home-decor',
    title: '50 Home Decor Patterns',
    count: 50,
    badge: 'Trending Decor',
    bullets: [
      'Create warm blankets, stylish cushions, and unique wall hangings.',
      'Design one-of-a-kind table runners, coasters, and placemats.',
      'Add an elegant touch with handcrafted doilies and curtains.'
    ],
    sampleImages: [
      {
        title: '50 Home Decor Patterns',
        url: 'https://i.ibb.co/BK4142ck/50-Home-Decor-Patterns-21.png',
        tag: 'Home Decor'
      },
      {
        title: 'Boho Mandala Coaster & Table Mats',
        url: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&w=600&q=80',
        tag: 'Table Decor'
      },
      {
        title: 'Chunky Knit Wool Blanket & Cushion',
        url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
        tag: 'Cozy Living'
      }
    ]
  },
  {
    id: 'stuffed-toys',
    title: '150 Stuffed Toys & Dolls Patterns',
    count: 150,
    badge: 'Bestseller',
    bullets: [
      'Craft adorable stuffed animals and dolls for all ages.',
      'Design charming toys perfect for playtime and keepsakes.',
      'Make heartfelt, personalized gifts for any occasion.'
    ],
    sampleImages: [
      {
        title: '150 Stuffed Toys & Dolls Patterns',
        url: 'https://i.ibb.co/PvHXHj0P/150-Stuffed-Toys-Dolls-Patterns-21.png',
        tag: 'Soft Plushie'
      },
      {
        title: 'Classic Teddy Bear Amigurumi',
        url: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=600&q=80',
        tag: 'Soft Plushie'
      },
      {
        title: 'Handmade Ragdoll with Yarn Hair',
        url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
        tag: 'Keepsake Doll'
      }
    ]
  },
  {
    id: 'superheroes',
    title: '150 Superheroes Patterns',
    count: 150,
    badge: 'Fan Favorites',
    bullets: [
      'Crochet lifelike superhero figures to impress fans.',
      'Make detailed action heroes perfect for collectors and gifts.',
      'Bring legendary characters to life with creative designs.'
    ],
    sampleImages: [
      {
        title: '150 Superheroes Patterns',
        url: 'https://i.ibb.co/gMGJxXtg/150-Superheroes-Patterns.jpg',
        tag: 'Hero Figures'
      },
      {
        title: 'Masked Avenger & Red Cape Warrior',
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
        tag: 'Hero Figures'
      },
      {
        title: 'Iron Tech Armor Chibi Amigurumi',
        url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
        tag: 'Pocket Heroes'
      }
    ]
  },
  {
    id: 'baby-patterns',
    title: '120 Baby Patterns',
    count: 120,
    badge: 'Gentle & Soft',
    bullets: [
      'Stitch cute baby outfits, booties, and cozy blankets.',
      'Design warm, snuggly blankets perfect for newborns.',
      'Make memorable, thoughtful baby gifts for showers.'
    ],
    sampleImages: [
      {
        title: '120 Baby Patterns',
        url: 'https://i.ibb.co/Z6WCw1kx/120-Baby-Patterns-21.png',
        tag: 'Baby Patterns'
      },
      {
        title: 'Soft Pastel Newborn Booties & Mittens',
        url: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=600&q=80',
        tag: 'Baby Booties'
      },
      {
        title: 'Heirloom Waffle Baby Blanket',
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
        tag: 'Crib Blanket'
      }
    ]
  },
  {
    id: 'zoo-amigurumi',
    title: '200 Zoo Amigurumi Patterns',
    count: 200,
    badge: 'Most Popular',
    bullets: [
      'Crochet adorable, lifelike zoo animals with realistic details.',
      'Design fun animal toys that captivate kids and adults.',
      'Master intricate patterns that challenge and delight.'
    ],
    sampleImages: [
      {
        title: '200 Zoo Amigurumi Patterns',
        url: 'https://i.ibb.co/G38PFrx6/200-Zoo-Amigurumi-Patterns-21.png',
        tag: 'Zoo Amigurumi'
      },
      {
        title: 'Safari Lion with Textured Fluffy Mane',
        url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80',
        tag: 'Safari King'
      },
      {
        title: 'Gentle Giraffe & Elephant Amigurumi',
        url: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80',
        tag: 'Savannah Duo'
      }
    ]
  },
  {
    id: 'cartoon-crochet',
    title: '100 Cartoon Crochet Patterns',
    count: 100,
    badge: 'Nostalgic Joy',
    bullets: [
      'Make playful cartoon characters that spark nostalgia.',
      'Create fun, handmade toys and decorations for all ages.',
      'Stitch beloved figures that bring joy and cherished memories.'
    ],
    sampleImages: [
      {
        title: '100 Cartoon Crochet Patterns',
        url: 'https://i.ibb.co/k2vmnv8p/100-Cartoon-Crochet-Patterns-21.png',
        tag: 'Cartoon Crochet'
      },
      {
        title: 'Blue Speedster Hedgehog Hedgehog Toy',
        url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
        tag: 'Sonic & Friends'
      },
      {
        title: 'Yellow Electric Mouse Pocket Monster',
        url: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=600&q=80',
        tag: 'Anime Icons'
      }
    ]
  },
  {
    id: 'holidays-festivals',
    title: '100 Holidays & Festivals Patterns',
    count: 100,
    badge: 'Celebrations',
    bullets: [
      'Crochet festive holiday decorations for all celebrations.',
      'Design personalized gifts for Diwali, Christmas, and more.',
      'Add handmade seasonal accents to brighten up your home.'
    ],
    sampleImages: [
      {
        title: '100 Holidays & Festivals Patterns',
        url: 'https://i.ibb.co/Y4Tmq2TC/100-Holidays-Festivals-Patterns-21.png',
        tag: 'Holiday Patterns'
      },
      {
        title: 'Crochet Diyas & Festive Toran Hangings',
        url: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=600&q=80',
        tag: 'Diwali Decor'
      },
      {
        title: 'Miniature Pine Christmas Tree & Baubles',
        url: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=600&q=80',
        tag: 'Holiday Tree'
      }
    ]
  }
];

export const BONUSES: BonusItem[] = [
  {
    id: 1,
    bonusNumber: 'Bonus 1',
    title: 'Crochet 45 Techniques!',
    subtitle: 'Master every stitch, seam, increase and decrease like a pro artisan.',
    value: 999,
    description: '45 foundational to advanced crochet mastery techniques with photo breakdowns.',
    coverImage: 'https://i.ibb.co/Pz9TpVVV/crochet-45-techniques-theory-bundle-image-21.png',
    tag: 'E-Book'
  },
  {
    id: 2,
    bonusNumber: 'Bonus 2',
    title: 'Learning Videos!',
    subtitle: 'Video Course in English & Hindi (Step-by-step from zero to mastery).',
    value: 1499,
    description: 'High-definition video lessons covering tension, yarn holds, and stitch fixing.',
    coverImage: 'https://i.ibb.co/ynFk5CxZ/crochet-learning-videos-bundle-image-21.png',
    tag: 'Video Course'
  },
  {
    id: 3,
    bonusNumber: 'Bonus 3',
    title: 'Crochet 30 New Stitches Course!',
    subtitle: 'Waffle stitch, Jasmine stitch, Alpine stitch, Star stitch & more.',
    value: 999,
    description: '30 stunning decorative stitches that make your blankets and garments stand out.',
    coverImage: 'https://i.ibb.co/JWcpVtYV/crochet-30-new-stitches-course-bundle-image-2-21.png',
    tag: 'Masterclass'
  },
  {
    id: 4,
    bonusNumber: 'Bonus 4',
    title: 'Crochet Color Theory!',
    subtitle: 'Pick yarn palettes that pop! Contrast, gradient transitions & harmony.',
    value: 499,
    description: 'Professional color wheel guide specifically adapted for yarn weights and dyes.',
    coverImage: 'https://i.ibb.co/mFCxFStx/crochet-color-theory-bundle-image-21.png',
    tag: 'Color Guide'
  },
  {
    id: 5,
    bonusNumber: 'Bonus 5',
    title: 'Crochet Guide! (Arts & Handcraft)',
    subtitle: 'Complete Yarn, Hook size conversion charts and project estimator handbook.',
    value: 799,
    description: 'Never guess hook size or skein yardage again. US/UK/Metric tables included.',
    coverImage: 'https://i.ibb.co/RkP0czHM/crochet-guide-course-bundle-image-21.png',
    tag: 'Handbook'
  },
  {
    id: 6,
    bonusNumber: 'Bonus 6',
    title: 'Printable Crochet Digital Planner!',
    subtitle: 'Project tracker, stitch inventory, yarn stash organizer & daily goals.',
    value: 299,
    description: 'High-res printable PDF planner sheets formatted for A4, Letter, and GoodNotes.',
    coverImage: 'https://i.ibb.co/Nd9JSfLM/crochet-digital-planner-course-bundle-image-21.png',
    tag: 'Digital Planner'
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-ankita',
    name: 'Ankita Dewangan',
    rating: 5,
    comment: 'This is SUCH a good deal. I feel like this is such a good place to start getting good patterns at a great price. Highly recommend',
    verified: true,
    date: 'Yesterday',
    helpfulCount: 52,
    location: 'Raipur, Chhattisgarh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-priya',
    name: 'Priya Sonkar',
    rating: 5,
    comment: 'Lovely speaking to the creator of the patterns and received fast replies. I love all of these patterns and highly recommend it.',
    verified: true,
    date: '2 days ago',
    helpfulCount: 64,
    location: 'Bhopal, MP',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-1',
    name: 'Rudra Patel',
    rating: 5,
    comment: 'I love how cheap it is and it gives me so many new ideas',
    verified: true,
    date: '2 days ago',
    helpfulCount: 42,
    location: 'Ahmedabad, Gujarat',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    name: 'Ashwini Patil',
    rating: 5,
    comment: 'This is a great lot, very varied, there are models for all tastes, amigurumis, dolls, accessories, bags, Christmas decorations ... It is suitable for all levels. The seller is friendly and available. I highly recommend the store',
    verified: true,
    date: '3 days ago',
    helpfulCount: 89,
    location: 'Pune, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    name: 'Anurag Jaishwal',
    rating: 5,
    comment: 'Great Bundle of Amigurumi Patterns !',
    verified: true,
    date: '4 days ago',
    helpfulCount: 31,
    location: 'Lucknow, UP',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is Included In Ultimate Crochet Bundle?',
    answer: "The Bundle Includes 1200 Unique Crochet Patterns, Step-By-Step Video Tutorials, A Digital Crochet Planner, And Lifetime Access To All Resources. You'll Find Patterns For Home Decor, Toys, Superheroes, Baby Items, And Festive Decorations"
  },
  {
    id: 'faq-2',
    question: 'Is this Bundle for Beginners ?',
    answer: 'Absolutely! Our Step-By-Step Video Tutorials Are Designed To Guide Beginners Through The Basics And Help Them Advance To More Complex Techniques. The Bundle Is Perfect For Both Beginners And Experienced Crocheters'
  },
  {
    id: 'faq-3',
    question: 'How Can I Get This Bundle After Purchase?',
    answer: "1) Once your payment is complete, You will be redirected automatically to the download section of the page.\n\n2) Also you will get the product download link in the email ID and WhatsApp number given during checkout, it may take 5 to 10 minutes to receive that email.\n\n3) If you don't receive the product in your email, you can message us on WhatsApp."
  },
  {
    id: 'faq-4',
    question: 'What If I Don\'t Receive Any Email After Purchase?',
    answer: "Although, before mailing us, We request you to check your spam & promotional mails as well, if you haven't received your order please contact us on our support email: facctymann@gmail.com or WhatsApp Us: 8871694891"
  },
  {
    id: 'faq-5',
    question: 'Refund Policy!',
    answer: 'No! Since these are digital products, once shipped to you, we have no access to them, so this offer is non-refundable'
  }
];

export const BOOK_SAMPLE_PAGES: BookSamplePage[] = [
  {
    pageNumber: 1,
    chapter: 'Getting Started',
    title: 'Essential Anatomy of a Crochet Hook & Yarn Hold',
    subtitle: 'Mastering ergonomic grip styles: Knife Grip vs. Pencil Grip',
    content: 'Holding your crochet hook with relaxed fingers prevents wrist fatigue. The two most common techniques are the knife hold (holding the hook between thumb and index finger like a butter knife) and the pencil hold (holding the hook balanced above the index finger). Experiment with tension on your working yarn across your index and pinky fingers to achieve uniform gauge.',
    highlights: ['Yarn tension balance', 'Knife vs Pencil ergonomic hold', 'Preventing hand cramp'],
    illustrationType: 'hook'
  },
  {
    pageNumber: 2,
    chapter: 'Foundational Stitches',
    title: 'The Magic Ring (Magic Loop) Demystified',
    subtitle: 'The secret to tight, hole-free amigurumi center starts',
    content: 'The magic ring allows you to pull the beginning loop tightly shut, ensuring no stuffing ever leaks through amigurumi toys. Wrap yarn twice around your fingers, insert hook from underneath, yarn over, pull through, and chain one to secure. Work your 6 single crochets directly into the open loop, then tug the tail firmly.',
    highlights: ['Zero-gap center', 'Double loop security', 'Amigurumi standard (6 sc base)'],
    illustrationType: 'stitch'
  },
  {
    pageNumber: 3,
    chapter: 'Stitch Dictionary',
    title: 'Single Crochet (sc) & Invisible Decrease (invdec)',
    subtitle: 'The two workhorse stitches for flawless toys & sturdy baskets',
    content: 'The invisible decrease is essential for toy crafting. Instead of inserting your hook through both loops, pick up only the front loops of the next two stitches. Yarn over and pull through both front loops, then yarn over and pull through remaining two loops. From the outside, the stitch appears seamlessly identical to regular single crochets.',
    highlights: ['Front loops only technique', 'Seamless row transitions', 'Firm toy shaping'],
    illustrationType: 'stitch'
  },
  {
    pageNumber: 4,
    chapter: 'Color Mastery',
    title: 'Seamless Yarn Color Changing Technique',
    subtitle: 'How to switch colors without visible knots or jarring jogs',
    content: 'Always change colors on the final yarn-over of the previous stitch. Work until 2 loops remain on your hook, drop the old working yarn, place the new color yarn over your hook, and pull through both loops to complete the stitch. Your new color is now ready to begin cleanly on the next round.',
    highlights: ['No visible knot transitions', 'Clean round joining', 'Tucking yarn tails smoothly'],
    illustrationType: 'color'
  },
  {
    pageNumber: 5,
    chapter: 'Sample Pattern 01',
    title: 'Chubby Amigurumi Bumblebee',
    subtitle: 'Skill Level: Complete Beginner | Time: 45 Minutes',
    content: 'R1: 6 sc in Magic Ring (6)\nR2: Inc in each st around (12)\nR3: [1 sc, inc] x 6 (18)\nR4-R6: Sc in each st around (18) [Yellow]\nR7-R8: Sc in each st around (18) [Black stripe]\nR9-R10: Sc in each st around (18) [Yellow]\nR11: [1 sc, invdec] x 6 (12) [Stuff firmly with polyfill]\nR12: Invdec x 6 (6). Fasten off and weave in tail.',
    highlights: ['Includes stitch-by-stitch counts', 'Easy stripe switching', 'Child-safe safety eye placement'],
    illustrationType: 'amigurumi'
  },
  {
    pageNumber: 6,
    chapter: 'Decorative Textures',
    title: 'The Modern Alpine & Waffle Stitches',
    subtitle: 'Creating lush 3D textures for blankets and winter scarves',
    content: 'The Alpine stitch pairs alternating rows of single crochet with front-post double crochets worked two rows below. This creates an interlocking diamond ridge pattern that feels incredibly soft, thick, and luxurious for nursery blankets and cozy throws.',
    highlights: ['Front-post technique', 'High thermal loft', 'Reversible border options'],
    illustrationType: 'chart'
  }
];
