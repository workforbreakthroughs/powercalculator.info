export interface AdsensePlacementGuide {
  positionName: string;
  adSize: string;
  recommendedType: string;
  ctrPotential: 'High' | 'Medium' | 'Very High';
  userExperienceNote: string;
  policyRule: string;
}

export const adsensePlacements: AdsensePlacementGuide[] = [
  {
    positionName: 'Above-the-Fold Calculator Banner',
    adSize: '728x90 Leaderboard / Responsive Banner',
    recommendedType: 'Display / Text & Image',
    ctrPotential: 'High',
    userExperienceNote: 'Placed cleanly below the main header before the calculator form starts. Non-disruptive.',
    policyRule: 'Must not push primary calculator content completely off-screen on mobile viewports.'
  },
  {
    positionName: 'In-Content Calculation Result Box Slot',
    adSize: '300x250 Medium Rectangle or Native In-Article',
    recommendedType: 'In-Article Native Ad',
    ctrPotential: 'Very High',
    userExperienceNote: 'Appears directly beneath the calculation output box right when users review their numbers.',
    policyRule: 'Must be clearly labeled "Advertisement" or "Sponsored" to prevent accidental click confusion.'
  },
  {
    positionName: 'Sidebar Sticky Anchor (Desktop)',
    adSize: '300x600 Half-Page or 160x600 Skyscraper',
    recommendedType: 'Display Ad',
    ctrPotential: 'Medium',
    userExperienceNote: 'Remains visible in the right-hand column alongside long worked examples and FAQs.',
    policyRule: 'Ensure sticky positioning does not overlap main text content or navigation dropdowns.'
  },
  {
    positionName: 'Article & Guide Mid-Content Slot',
    adSize: 'Responsive In-Feed / Fluid Ad',
    recommendedType: 'In-Feed Native Ad',
    ctrPotential: 'High',
    userExperienceNote: 'Blends naturally between article paragraphs during long-form educational reading.',
    policyRule: 'Maintain a minimum ratio of 3-4 paragraphs of original text between ad units.'
  }
];

export const adsenseComplianceChecklist = [
  { item: 'Unique & Original Value', description: 'Interactive tools with custom JavaScript calculation engines, step-by-step math breakdowns, and detailed variable explanations.', status: 'PASS' },
  { item: 'Required Legal Pages', description: 'About Us, Contact Us, Privacy Policy (with Cookie & AdSense disclaimers), Terms of Service, and Editorial Standards.', status: 'PASS' },
  { item: 'Mobile-First Responsive Layout', description: 'Fast loading times, legible typography, no content overflow, tap targets >44px.', status: 'PASS' },
  { item: 'Clear Ad Differentiation', description: 'Ad units framed with distinct border outlines and labeled as "Advertisement".', status: 'PASS' },
  { item: 'No Prohibited Content', description: 'Strict focus on electrical engineering, clean energy, home appliance efficiency, and safety.', status: 'PASS' }
];

export function generateCalculatorJsonLd(calc: { title: string; shortDescription: string; slug: string; formula: string }) {
  return JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      'headline': calc.title,
      'description': calc.shortDescription,
      'url': `https://powercalculator.info/${calc.slug}`,
      'inLanguage': 'en-US',
      'author': {
        '@type': 'Organization',
        'name': 'PowerCalculator.info Engineering Team',
        'url': 'https://powercalculator.info'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'PowerCalculator.info',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://powercalculator.info/logo.png'
        }
      },
      'about': {
        '@type': 'Thing',
        'name': 'Electrical Power & Energy Calculation'
      },
      'educationalUse': 'Calculation Tool & Reference Guide',
      'proficiencyLevel': 'Beginner to Advanced'
    },
    null,
    2
  );
}
