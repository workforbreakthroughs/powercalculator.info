export type TargetAudience = 'Homeowner' | 'Renter' | 'Student' | 'Electrician' | 'Engineer' | 'Solar Installer' | 'Small Business' | 'DIY Enthusiast';

export interface VariableDefinition {
  name: string;
  symbol: string;
  unit: string;
  description: string;
}

export interface WorkedExample {
  title: string;
  scenario: string;
  inputs: Record<string, string | number>;
  stepByStep: string[];
  finalResult: string;
}

export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'slider';
  defaultValue: number | string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string | number }[];
  helpText?: string;
}

export interface CalculationResult {
  primaryValue: number | string;
  primaryUnit: string;
  primaryLabel: string;
  secondaryMetrics?: { label: string; value: string | number; unit?: string; highlight?: boolean }[];
  breakdownSteps?: string[];
  chartData?: { name: string; value: number; unit?: string }[];
  recommendationNote?: string;
  warningNote?: string;
}

export interface Calculator {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  shortDescription: string;
  detailedDescription: string;
  formula: string;
  formulaTex?: string;
  variables: VariableDefinition[];
  workedExamples: WorkedExample[];
  faqs: CalculatorFAQ[];
  commonMistakes: string[];
  relatedCalculatorIds: string[];
  popularityRank: number; // 1 = most popular
  targetAudience: TargetAudience[];
  searchKeywords: string[];
  tags: string[];
  inputs: CalculatorInput[];
  calculate: (inputs: Record<string, any>, userRate: number, currency: string) => CalculationResult;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  badgeColor: string;
  calculatorCount: number;
}

export interface ArticleContentBlock {
  type: 'paragraph' | 'heading2' | 'heading3' | 'callout' | 'table' | 'formula' | 'list';
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  calloutType?: 'info' | 'warning' | 'tip';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  readTimeMinutes: number;
  publishDate: string;
  author: string;
  content: ArticleContentBlock[];
  linkedCalculatorIds: string[];
  tags: string[];
}

export interface UserPreferences {
  currencySymbol: string;
  currencyCode: string;
  electricityRate: number; // $ per kWh
  unitSystem: 'imperial' | 'metric';
  showAdsensePreview: boolean;
}

export interface AffiliateProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  priceEstimate: string;
  description: string;
  keyFeatures: string[];
  bestFor: string;
  affiliateUrl: string;
  badge?: string;
}
