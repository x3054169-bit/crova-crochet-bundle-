export interface PatternCategory {
  id: string;
  title: string;
  count: number;
  badge: string;
  bullets: string[];
  sampleImages: {
    title: string;
    url: string;
    tag: string;
  }[];
}

export interface BonusItem {
  id: number;
  bonusNumber: string;
  title: string;
  subtitle: string;
  value: number;
  description: string;
  coverImage: string;
  tag: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  verified: boolean;
  date: string;
  helpfulCount: number;
  location: string;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BookSamplePage {
  pageNumber: number;
  chapter: string;
  title: string;
  subtitle: string;
  content: string;
  highlights: string[];
  illustrationType: 'stitch' | 'hook' | 'amigurumi' | 'color' | 'chart' | 'project';
}
