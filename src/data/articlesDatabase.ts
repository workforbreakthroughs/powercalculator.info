import { Article } from '../types';

export const articlesDatabase: Article[] = [
  {
    id: 'how-to-calculate-electricity-cost',
    slug: 'how-to-calculate-electricity-cost-from-watts',
    title: 'How to Calculate Electricity Cost from Watts ($/kWh Step-by-Step)',
    summary: 'Learn the exact formula to convert appliance wattage into kilowatt-hours (kWh) and calculate hourly, daily, and monthly power bill costs.',
    category: 'Electricity & Bills',
    readTimeMinutes: 6,
    publishDate: '2026-07-15',
    author: 'PowerCalculator Editorial Team',
    linkedCalculatorIds: ['appliance-electricity-cost', 'standby-power-cost', 'ac-btu-watt-calculator'],
    tags: ['Electric Bill', 'kWh Formula', 'Energy Savings', 'Appliance Cost'],
    content: [
      {
        type: 'paragraph',
        text: 'Have you ever wondered how much that 1,500-Watt space heater or 300-Watt gaming PC adds to your monthly electric bill? Understanding how your electric utility company charges for power is the first step toward reducing household energy expenses.'
      },
      {
        type: 'heading2',
        text: 'The Basic Electricity Cost Formula'
      },
      {
        type: 'paragraph',
        text: 'Electric companies charge you based on kilowatt-hours (kWh), not watts. A kilowatt is 1,000 watts. One kilowatt-hour means using 1,000 watts of electrical power continuously for one full hour.'
      },
      {
        type: 'formula',
        text: 'Daily Energy Usage (kWh) = (Power in Watts × Hours Used Per Day) ÷ 1,000\nTotal Cost ($) = Daily kWh × Electricity Rate ($/kWh) × Days'
      },
      {
        type: 'heading2',
        text: 'Step-by-Step Example Calculation'
      },
      {
        type: 'list',
        items: [
          'Find the Appliance Wattage: Look at the label on your device. Suppose a portable air conditioner is rated at 1,200 Watts.',
          'Estimate Daily Operating Hours: Assume you run the AC unit for 8 hours per day during summer.',
          'Convert Watts to Kilowatt-Hours: (1,200 W × 8 hours) ÷ 1,000 = 9.6 kWh per day.',
          'Multiply by Your Electricity Rate: If your local power rate is $0.16 per kWh, daily cost = 9.6 kWh × $0.16 = $1.536 per day.',
          'Calculate Monthly Cost: $1.536/day × 30 days = $46.08 per month.'
        ]
      },
      {
        type: 'callout',
        calloutType: 'tip',
        text: 'Pro Tip: Check your latest electric bill to find your exact rate per kWh. Be sure to include delivery fees, transmission surcharges, and taxes in your rate calculation!'
      }
    ]
  },

  {
    id: 'understanding-kwh-vs-kw',
    slug: 'understanding-kwh-vs-kw-difference',
    title: 'Understanding kW vs. kWh: The Ultimate Guide for Homeowners',
    summary: 'Discover the crucial difference between kW (power rate) and kWh (total energy quantity) so you can size solar arrays and generators properly.',
    category: 'Electricity & Bills',
    readTimeMinutes: 5,
    publishDate: '2026-07-20',
    author: 'PowerCalculator Editorial Team',
    linkedCalculatorIds: ['appliance-electricity-cost', 'solar-panel-sizing', 'generator-fuel-runtime'],
    tags: ['kW vs kWh', 'Electrical Basics', 'Solar Energy', 'Power vs Energy'],
    content: [
      {
        type: 'paragraph',
        text: 'Confusing kW (kilowatts) and kWh (kilowatt-hours) is the single most common mistake people make when reading power bills, buying solar panel arrays, or selecting backup generators. Here is the easiest analogy to remember the difference forever:'
      },
      {
        type: 'callout',
        calloutType: 'info',
        text: 'Automobile Analogy: kW is like your car’s Speedometer (how fast power is flowing right now). kWh is like your Odometer (the total distance/energy traveled over time).'
      },
      {
        type: 'heading2',
        text: 'What is a Kilowatt (kW)?'
      },
      {
        type: 'paragraph',
        text: 'A kilowatt (kW) is a measure of power capacity—the rate at which electrical energy is being consumed at an instantaneous moment in time. 1 kW equals 1,000 Watts.'
      },
      {
        type: 'heading2',
        text: 'What is a Kilowatt-Hour (kWh)?'
      },
      {
        type: 'paragraph',
        text: 'A kilowatt-hour (kWh) is a measure of energy volume—the total amount of electricity accumulated over a duration of time.'
      }
    ]
  },

  {
    id: 'solar-panel-sizing-guide',
    slug: 'solar-panel-sizing-step-by-step-guide',
    title: 'Solar Panel Sizing Guide: How Many Watts Do You Need?',
    summary: 'A complete step-by-step guide to calculating solar PV array wattage, panel counts, and battery bank sizing for off-grid homes and RVs.',
    category: 'Solar Energy & PV',
    readTimeMinutes: 8,
    publishDate: '2026-07-22',
    author: 'Solar Engineering Staff',
    linkedCalculatorIds: ['solar-panel-sizing', 'battery-capacity-runtime', 'inverter-size-calculator'],
    tags: ['Solar Sizing', 'Off-Grid Solar', 'Peak Sun Hours', 'Solar Panels'],
    content: [
      {
        type: 'paragraph',
        text: 'Sizing a solar energy system requires matching your daily energy usage in kilowatt-hours (kWh) with your local geographic Peak Sun Hours (PSH).'
      },
      {
        type: 'heading2',
        text: 'The 4 Steps to Size Your Solar Array'
      },
      {
        type: 'list',
        items: [
          'Calculate Daily kWh Usage: Sum up your monthly power bill or use an appliance load calculator.',
          'Determine Local Peak Sun Hours: Most US states receive 4.0 to 5.5 hours of full sun intensity per day.',
          'Factor in System Losses: Solar inverters, dust, wiring, and high temperatures reduce efficiency by ~15-20%.',
          'Divide Wattage by Panel Rating: Divide required array watts by individual panel watts (e.g. 400W).'
        ]
      }
    ]
  },

  {
    id: 'wire-gauge-voltage-drop-guide',
    slug: 'wire-gauge-awg-voltage-drop-guide',
    title: 'How to Choose Wire Gauge (AWG) & Prevent Dangerous Voltage Drop',
    summary: 'Learn why long wire runs cause voltage drop, how to use NEC ampacity tables, and how to select proper copper wire gauges.',
    category: 'Wire Size & Voltage Drop',
    readTimeMinutes: 7,
    publishDate: '2026-07-25',
    author: 'Master Electrician Staff',
    linkedCalculatorIds: ['wire-size-voltage-drop', 'circuit-breaker-sizing'],
    tags: ['AWG Wire Size', 'Voltage Drop', 'NEC Code', 'Electrical Safety'],
    content: [
      {
        type: 'paragraph',
        text: 'Electric wires act like water pipes. If a wire is too thin or too long, electrical friction causes voltage drop, producing unwanted heat and preventing motors or lights from operating properly.'
      },
      {
        type: 'heading2',
        text: 'The NEC 3% Rule'
      },
      {
        type: 'paragraph',
        text: 'The National Electrical Code (NEC) recommends keeping voltage drop under 3% for branch circuits to ensure maximum electrical efficiency and appliance longevity.'
      }
    ]
  }
];
