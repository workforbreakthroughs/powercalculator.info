import { AffiliateProduct } from '../types';

export const affiliateProducts: AffiliateProduct[] = [
  {
    id: 'lifepo4-battery-100ah',
    name: 'LiTime 12V 100Ah LiFePO4 Lithium Battery',
    category: 'Batteries',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 1420,
    priceEstimate: '$249 - $299',
    description: '100% usable capacity, 10-year lifespan, integrated BMS with low-temp charge protection. Perfect for RVs, marine, and off-grid solar storage.',
    keyFeatures: ['1280Wh Energy', '4000+ Deep Cycles', 'Built-in 100A BMS', 'Weighs only 24 lbs'],
    bestFor: 'Off-grid solar storage, RV house battery, marine trolling motors.',
    affiliateUrl: '#affiliate-link-lifepo4-100ah',
    badge: 'Top Pick'
  },
  {
    id: 'pure-sine-inverter-2000w',
    name: 'Renogy 2000W Pure Sine Wave Inverter 12V to 120V',
    category: 'Inverters',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 980,
    priceEstimate: '$229 - $269',
    description: 'Delivers 2000 Watts continuous power (4000W surge) with ultra-clean AC sine wave output (<3% THD) for appliances and electronics.',
    keyFeatures: ['90% Conversion Efficiency', 'GFCI Outlet Protection', 'Wired Remote Control', 'Overload & Thermal Protection'],
    bestFor: 'Running fridges, microwaves, power tools, and laptops off DC batteries.',
    affiliateUrl: '#affiliate-link-renogy-inverter',
    badge: 'Best Value'
  },
  {
    id: 'solar-panel-400w',
    name: 'BougeRV 400W Monocrystalline Rigid Solar Panel',
    category: 'Solar Panels',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 610,
    priceEstimate: '$349 - $399',
    description: 'High-efficiency PERC solar cells boasting 22.8% efficiency. Corrosion-resistant aluminum frame handles high wind and snow loads.',
    keyFeatures: ['22.8% Cell Efficiency', 'IP67 Waterproof Junction Box', 'Pre-drilled mounting holes', '25-year output warranty'],
    bestFor: 'Rooftop solar, off-grid cabins, sheds, and backup arrays.',
    affiliateUrl: '#affiliate-link-solar-400w',
    badge: 'High Efficiency'
  },
  {
    id: 'smart-energy-monitor',
    name: 'Emporia Smart Home Energy Monitor (16 Sensors)',
    category: 'Energy Monitors',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewsCount: 3100,
    priceEstimate: '$149 - $179',
    description: 'Monitors real-time electricity consumption directly from your main breaker panel. Tracks kWh usage, solar generation, and peak power spikes via mobile app.',
    keyFeatures: ['Real-Time App Analytics', 'Solar Net Metering Support', 'Individual Circuit CT Clamps', 'No Monthly Subscription'],
    bestFor: 'Homeowners looking to identify vampire energy drains and lower electric bills.',
    affiliateUrl: '#affiliate-link-emporia-monitor',
    badge: 'Best Energy Saver'
  }
];
