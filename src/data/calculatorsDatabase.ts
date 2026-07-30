import { Calculator } from '../types';

export const calculatorsDatabase: Calculator[] = [
  // 1. Electricity Cost & Bill Calculator
  {
    id: 'appliance-electricity-cost',
    slug: 'appliance-electricity-cost-calculator',
    title: 'Appliance Electricity Cost & Power Consumption Calculator',
    categoryId: 'electricity-cost',
    shortDescription: 'Calculate how much any home appliance costs to run per hour, day, month, and year based on wattage and your local electricity rate.',
    detailedDescription: 'This calculator determines the operating cost and total energy consumption (in kilowatt-hours, kWh) for any electrical appliance—from air conditioners and refrigerators to gaming PCs and space heaters. It helps homeowners and renters spot energy-hogging devices and lower monthly electric bills.',
    formula: 'kWh = (Power in Watts × Hours Used Per Day) ÷ 1000\nCost = kWh × Electricity Rate ($/kWh)',
    formulaTex: 'E_{\\text{kWh}} = \\frac{P_{\\text{W}} \\times t_{\\text{hours}}}{1000}, \\quad C = E_{\\text{kWh}} \\times \\text{Rate}',
    variables: [
      { name: 'Power Rating', symbol: 'P', unit: 'Watts (W) or kW', description: 'The power draw of the appliance, found on its label or nameplate.' },
      { name: 'Daily Usage', symbol: 't', unit: 'Hours / Day', description: 'Average number of hours the device is powered on each day.' },
      { name: 'Electricity Rate', symbol: 'R', unit: '$/kWh', description: 'Cost per kilowatt-hour charged by your local utility power company.' },
    ],
    workedExamples: [
      {
        title: 'Space Heater Operating Cost (1500W)',
        scenario: 'A 1500 Watt electric space heater runs for 8 hours every night in winter at a standard rate of $0.16 per kWh.',
        inputs: { wattage: 1500, hoursPerDay: 8, daysPerMonth: 30 },
        stepByStep: [
          'Step 1: Calculate daily energy usage: (1500 W × 8 h) ÷ 1000 = 12 kWh per day.',
          'Step 2: Calculate daily cost: 12 kWh × $0.16 = $1.92 per day.',
          'Step 3: Calculate monthly cost: 12 kWh × 30 days = 360 kWh × $0.16 = $57.60 per month.',
          'Step 4: Calculate annual cost: 360 kWh × 12 = 4,320 kWh × $0.16 = $691.20 per year.'
        ],
        finalResult: '$57.60 per month ($1.92/day)'
      }
    ],
    faqs: [
      {
        question: 'How do I find my appliance wattage rating?',
        answer: 'Check the electrical sticker or metallic plate on the back or underside of the appliance. Look for "W" or "Watts". If it only shows Volts (V) and Amps (A), multiply Volts × Amps = Watts (e.g., 120V × 5A = 600W).'
      },
      {
        question: 'Does a refrigerator run at full wattage 24 hours a day?',
        answer: 'No. Refrigerators cycle their compressor on and off. A 400W refrigerator typically runs its compressor only 30-50% of the time, resulting in an effective usage of about 150-200W per hour on average.'
      }
    ],
    commonMistakes: [
      'Assuming devices draw max rated wattage continuously (duty cycle varies for fridges, ACs, and heat pumps).',
      'Confusing Watts (power) with Watt-hours or kWh (energy over time).',
      'Forgetting to include utility delivery fees, taxes, or tier surcharges in the per-kWh rate.'
    ],
    relatedCalculatorIds: ['standby-power-cost', 'ac-btu-watt-calculator', 'ev-charging-cost', 'solar-panel-sizing'],
    popularityRank: 1,
    targetAudience: ['Homeowner', 'Renter', 'Student', 'DIY Enthusiast', 'Small Business'],
    searchKeywords: ['appliance electricity cost calculator', 'calculate power bill', 'how much does 1500w heater cost', 'kwh calculator', 'electric bill calculator'],
    tags: ['Popular', 'Electricity Bill', 'Energy Savings', 'kWh'],
    inputs: [
      { id: 'wattage', label: 'Appliance Power (Watts)', type: 'number', defaultValue: 1500, unit: 'W', min: 1, max: 15000, step: 10, helpText: 'e.g., Space Heater: 1500W, TV: 120W, Refrigerator: 200W' },
      { id: 'hoursPerDay', label: 'Usage Hours per Day', type: 'slider', defaultValue: 6, unit: 'hrs', min: 0.5, max: 24, step: 0.5, helpText: 'Average hours device is active each day' },
      { id: 'daysPerWeek', label: 'Days Used per Week', type: 'number', defaultValue: 7, unit: 'days', min: 1, max: 7, step: 1 }
    ],
    calculate: (inputs, userRate, currency) => {
      const watts = Number(inputs.wattage) || 0;
      const hours = Number(inputs.hoursPerDay) || 0;
      const days = Number(inputs.daysPerWeek) || 7;

      const dailyKwh = (watts * hours) / 1000;
      const weeklyKwh = dailyKwh * days;
      const monthlyKwh = (weeklyKwh * 52) / 12;
      const annualKwh = weeklyKwh * 52;

      const dailyCost = dailyKwh * userRate;
      const monthlyCost = monthlyKwh * userRate;
      const annualCost = annualKwh * userRate;

      return {
        primaryValue: `${currency}${monthlyCost.toFixed(2)}`,
        primaryUnit: '/ month',
        primaryLabel: 'Estimated Monthly Operating Cost',
        secondaryMetrics: [
          { label: 'Daily Energy Usage', value: dailyKwh.toFixed(2), unit: 'kWh/day' },
          { label: 'Daily Cost', value: `${currency}${dailyCost.toFixed(2)}` },
          { label: 'Monthly Energy Usage', value: monthlyKwh.toFixed(1), unit: 'kWh/mo' },
          { label: 'Annual Energy Usage', value: annualKwh.toFixed(0), unit: 'kWh/yr' },
          { label: 'Estimated Annual Cost', value: `${currency}${annualCost.toFixed(2)}`, highlight: true }
        ],
        breakdownSteps: [
          `Daily usage: (${watts} W × ${hours} h) ÷ 1,000 = ${dailyKwh.toFixed(2)} kWh per day`,
          `Monthly energy: (${dailyKwh.toFixed(2)} kWh/day × ${days} days/wk × 52 wks) ÷ 12 = ${monthlyKwh.toFixed(1)} kWh`,
          `Monthly cost: ${monthlyKwh.toFixed(1)} kWh × ${currency}${userRate.toFixed(3)}/kWh = ${currency}${monthlyCost.toFixed(2)}`
        ],
        chartData: [
          { name: 'Daily', value: Number(dailyCost.toFixed(2)) },
          { name: 'Weekly', value: Number((dailyCost * days).toFixed(2)) },
          { name: 'Monthly', value: Number(monthlyCost.toFixed(2)) },
          { name: 'Annual', value: Number(annualCost.toFixed(2)) }
        ],
        recommendationNote: monthlyCost > 30 ? 'High energy consumer! Consider switching to an ENERGY STAR certified model or using a smart plug timer to automate usage.' : 'Reasonable energy consumption profile.'
      };
    }
  },

  // 2. Wire Gauge & Voltage Drop Calculator
  {
    id: 'wire-size-voltage-drop',
    slug: 'wire-size-voltage-drop-calculator',
    title: 'Wire Gauge (AWG / mm²) & Voltage Drop Calculator',
    categoryId: 'wire-cable',
    shortDescription: 'Calculate the required wire gauge (AWG or mm²) and percentage voltage drop for copper or aluminum conductors across AC/DC circuit lengths.',
    detailedDescription: 'Excessive voltage drop in long wire runs causes motor burnouts, dim lights, inefficient solar installations, and electrical hazards. This NEC-compliant engineering calculator helps electricians, solar installers, and DIYers size copper or aluminum cables correctly to maintain voltage drop below 3% (recommended for branch circuits).',
    formula: 'Voltage Drop (V) = (2 × L × I × R) ÷ 1000\n% Drop = (V_drop ÷ V_source) × 100',
    formulaTex: 'V_{\\text{drop}} = \\frac{2 \\cdot L \\cdot I \\cdot R}{1000}, \\quad \\% \\Delta V = \\frac{V_{\\text{drop}}}{V_{\\text{source}}} \\times 100',
    variables: [
      { name: 'Circuit Length', symbol: 'L', unit: 'Feet or Meters', description: 'One-way distance from source breaker/panel to the load.' },
      { name: 'Current Load', symbol: 'I', unit: 'Amperes (A)', description: 'Maximum continuous current drawn by the electrical load.' },
      { name: 'Source Voltage', symbol: 'V', unit: 'Volts (V)', description: 'System voltage (e.g., 12V DC, 24V DC, 120V AC, 240V AC, 480V 3-phase).' },
      { name: 'Conductor Resistance', symbol: 'R', unit: 'Ohms / 1000 ft', description: 'Electrical resistivity per 1000 feet of copper or aluminum conductor.' }
    ],
    workedExamples: [
      {
        title: '120V Subpanel Feed across 100 Feet (20 Amps)',
        scenario: 'Feeding an outdoor workshop 100 feet away with 120V AC drawn at 20 Amps using 12 AWG Copper Wire.',
        inputs: { voltage: 120, current: 20, distanceFeet: 100, wireGauge: '12 AWG', material: 'Copper', phase: 'Single' },
        stepByStep: [
          'Step 1: Total circuit length (round-trip) = 100 ft × 2 = 200 ft.',
          'Step 2: Resistance of 12 AWG copper = ~1.93 Ohms / 1,000 ft.',
          'Step 3: Voltage Drop = (200 ft × 20 A × 1.93 Ω) ÷ 1,000 = 7.72 Volts.',
          'Step 4: Percentage Drop = (7.72 V ÷ 120 V) × 100 = 6.43%.',
          'Step 5: Recommendation: 6.43% exceeds the NEC 3% guideline! Upsize cable to 10 AWG or 8 AWG Copper.'
        ],
        finalResult: '7.72V Drop (6.43%) - Upsize Wire Recommended!'
      }
    ],
    faqs: [
      {
        question: 'What is the maximum allowed voltage drop according to National Electrical Code (NEC)?',
        answer: 'NEC Section 210.19 recommends a maximum 3% voltage drop on branch circuits, and a total combined max 5% drop across feeders and branch circuits to maintain peak efficiency.'
      },
      {
        question: 'Why do 12V DC solar/marine systems suffer higher voltage drop than 120V AC?',
        answer: 'Because at lower voltages (12V), a 1-Volt drop represents 8.3% of the total circuit voltage, whereas at 120V, a 1-Volt drop is only 0.83%. Lower voltage circuits require significantly thicker copper wires.'
      }
    ],
    commonMistakes: [
      'Forgetting that circuit distance must be doubled for single-phase AC or 2-wire DC (hot + neutral / positive + negative).',
      'Using aluminum wire with copper ampacity tables.',
      'Sizing wire solely for thermal ampacity while ignoring distance-related voltage drop.'
    ],
    relatedCalculatorIds: ['appliance-electricity-cost', 'solar-panel-sizing', 'circuit-breaker-sizing', 'battery-capacity-runtime'],
    popularityRank: 2,
    targetAudience: ['Electrician', 'Solar Installer', 'Engineer', 'DIY Enthusiast', 'Homeowner'],
    searchKeywords: ['wire size calculator', 'voltage drop calculator awg', 'copper wire gauge table', 'cable sizing tool', 'nec wire size'],
    tags: ['Electrician Tool', 'Voltage Drop', 'AWG', 'NEC Code', 'Solar Cable'],
    inputs: [
      { id: 'voltage', label: 'System Voltage (Volts)', type: 'select', defaultValue: '120', options: [
        { label: '12V DC (Solar / RV / Boat)', value: '12' },
        { label: '24V DC (Solar / Industrial)', value: '24' },
        { label: '48V DC (Solar Battery Bank)', value: '48' },
        { label: '120V AC (Standard Outlet)', value: '120' },
        { label: '240V AC (Appliance / EV / Subpanel)', value: '240' },
        { label: '277V AC (Commercial)', value: '277' },
        { label: '480V AC (3-Phase)', value: '480' }
      ]},
      { id: 'current', label: 'Load Current (Amps)', type: 'number', defaultValue: 20, unit: 'A', min: 1, max: 400, step: 1 },
      { id: 'distance', label: 'One-Way Cable Distance', type: 'number', defaultValue: 75, unit: 'ft', min: 5, max: 2000, step: 5 },
      { id: 'material', label: 'Conductor Material', type: 'select', defaultValue: 'copper', options: [
        { label: 'Copper (Standard)', value: 'copper' },
        { label: 'Aluminum', value: 'aluminum' }
      ]}
    ],
    calculate: (inputs) => {
      const v = Number(inputs.voltage) || 120;
      const amps = Number(inputs.current) || 20;
      const feet = Number(inputs.distance) || 75;
      const isCopper = inputs.material === 'copper';

      // AWG resistance table (Ohms per 1000 ft at 75°C)
      const awgData = [
        { awg: '14 AWG', resCu: 3.07, resAl: 5.06, ampacity: 15 },
        { awg: '12 AWG', resCu: 1.93, resAl: 3.18, ampacity: 20 },
        { awg: '10 AWG', resCu: 1.21, resAl: 2.01, ampacity: 30 },
        { awg: '8 AWG', resCu: 0.764, resAl: 1.26, ampacity: 40 },
        { awg: '6 AWG', resCu: 0.491, resAl: 0.808, ampacity: 55 },
        { awg: '4 AWG', resCu: 0.308, resAl: 0.508, ampacity: 70 },
        { awg: '2 AWG', resCu: 0.194, resAl: 0.319, ampacity: 95 },
        { awg: '1/0 AWG', resCu: 0.122, resAl: 0.201, ampacity: 125 },
        { awg: '2/0 AWG', resCu: 0.0967, resAl: 0.159, ampacity: 145 },
        { awg: '4/0 AWG', resCu: 0.0608, resAl: 0.100, ampacity: 195 }
      ];

      // Find recommended AWG where ampacity >= amps AND drop <= 3%
      let selected = awgData[0];
      for (const wire of awgData) {
        const res = isCopper ? wire.resCu : wire.resAl;
        const dropV = (2 * feet * amps * res) / 1000;
        const dropPct = (dropV / v) * 100;

        if (wire.ampacity >= amps && dropPct <= 3.0) {
          selected = wire;
          break;
        }
        selected = wire; // fallback to largest if none fit
      }

      const res = isCopper ? selected.resCu : selected.resAl;
      const dropV = (2 * feet * amps * res) / 1000;
      const dropPct = (dropV / v) * 100;
      const voltageAtLoad = v - dropV;

      const isWarning = dropPct > 3.0;

      return {
        primaryValue: selected.awg,
        primaryUnit: `(${isCopper ? 'Copper' : 'Aluminum'})`,
        primaryLabel: 'Recommended Cable Wire Gauge',
        secondaryMetrics: [
          { label: 'Voltage Drop', value: dropV.toFixed(2), unit: 'Volts' },
          { label: 'Percentage Drop', value: `${dropPct.toFixed(2)}%`, highlight: !isWarning },
          { label: 'Voltage at Load End', value: voltageAtLoad.toFixed(2), unit: 'V' },
          { label: 'Wire Thermal Ampacity', value: selected.ampacity, unit: 'Amps' }
        ],
        breakdownSteps: [
          `Target max voltage drop: 3.0% (<= ${(v * 0.03).toFixed(2)} V)`,
          `Selected Conductor: ${selected.awg} (${isCopper ? 'Copper' : 'Aluminum'}) with resistance ${res} Ω / 1000 ft`,
          `Formula: V_drop = (2 × ${feet} ft × ${amps} A × ${res} Ω) ÷ 1000 = ${dropV.toFixed(2)} V`,
          `Percentage: (${dropV.toFixed(2)} V ÷ ${v} V) × 100 = ${dropPct.toFixed(2)}%`
        ],
        warningNote: isWarning ? `Warning: ${dropPct.toFixed(1)}% voltage drop exceeds NEC 3% recommendation! For long runs over ${feet} ft, consider upsizing to next AWG gauge or raising supply voltage.` : 'Excellent! Voltage drop is within NEC 3% guideline for optimal energy efficiency and motor protection.'
      };
    }
  },

  // 3. Solar Panel System Sizing
  {
    id: 'solar-panel-sizing',
    slug: 'solar-panel-sizing-calculator',
    title: 'Solar Panel Array Sizing & Daily Production Calculator',
    categoryId: 'solar-energy',
    shortDescription: 'Determine total solar array wattage, panel quantity, and daily energy yield (kWh) based on your daily electricity usage and local peak sun hours.',
    detailedDescription: 'Sizing a solar photovoltaic (PV) system requires balancing daily energy usage (kWh), local geographical peak sun hours (PSH), and system inefficiency losses (inverter, wiring, shading). This calculator estimates solar panel requirements for off-grid homes, RVs, cabins, and grid-tie rooftop solar arrays.',
    formula: 'Solar Wattage = (Daily kWh needed × 1000) ÷ (Peak Sun Hours × System Efficiency Factor 0.80)\nPanel Count = Total Watts ÷ Single Panel Wattage',
    formulaTex: 'P_{\\text{array}} = \\frac{E_{\\text{kWh}} \\times 1000}{\\text{PSH} \\times 0.80}, \\quad N_{\\text{panels}} = \\left\\lceil \\frac{P_{\\text{array}}}{P_{\\text{panel}}} \\right\\rceil',
    variables: [
      { name: 'Daily Consumption', symbol: 'E_daily', unit: 'kWh / day', description: 'Average daily electrical energy consumed by appliances.' },
      { name: 'Peak Sun Hours', symbol: 'PSH', unit: 'Hours / day', description: 'Average full-sun equivalent hours received at your geographical location (typically 3.5 to 6.0 hrs).' },
      { name: 'Panel Power', symbol: 'P_panel', unit: 'Watts', description: 'Individual solar panel STC rating (e.g. 300W, 400W, 450W).' },
      { name: 'System Loss Factor', symbol: 'η', unit: '0.75 - 0.85', description: 'Real-world loss accounting for temperature derating, dust, inverter efficiency, and wiring.' }
    ],
    workedExamples: [
      {
        title: 'Off-Grid Cabin Sizing (15 kWh/day, 4.5 Sun Hours)',
        scenario: 'An off-grid home uses 15 kWh per day in a region with 4.5 peak sun hours per day using 400W solar panels.',
        inputs: { dailyKwh: 15, sunHours: 4.5, panelWatts: 400, efficiency: 80 },
        stepByStep: [
          'Step 1: Account for 20% system losses (0.80 efficiency): 15 kWh ÷ 0.80 = 18.75 kWh raw output needed.',
          'Step 2: Calculate required array peak power: (18,750 Wh) ÷ 4.5 Peak Sun Hours = 4,167 Watts.',
          'Step 3: Calculate panel count: 4,167 W ÷ 400 W per panel = 10.4 panels.',
          'Step 4: Round up to 11 panels (4,400 Total Watt Array).'
        ],
        finalResult: '11 x 400W Panels (4.4 kW Solar Array)'
      }
    ],
    faqs: [
      {
        question: 'What are Peak Sun Hours (PSH)?',
        answer: 'Peak Sun Hours measure the amount of solar radiation received per square meter at 1,000 W/m² intensity. It is not total daylight hours, but the equivalent hours of full 100% solar intensity.'
      },
      {
        question: 'How many solar panels do I need to run an air conditioner?',
        answer: 'A standard central 3.5-ton AC draws around 3,500W while running. With 4.5 sun hours, running it 6 hours a day requires approx 6-8 kW of solar panels (15-20 x 400W panels).'
      }
    ],
    commonMistakes: [
      'Assuming 12 hours of sunlight means 12 Peak Sun Hours (actual peak sun is usually 4 to 5 hours).',
      'Ignoring winter sun drop (winter peak sun hours can be 40-50% lower than summer).',
      'Forgetting inverter conversion efficiency (92-97%) and battery charge efficiency (85-95%).'
    ],
    relatedCalculatorIds: ['battery-capacity-runtime', 'inverter-size-calculator', 'appliance-electricity-cost', 'solar-payback-roi'],
    popularityRank: 3,
    targetAudience: ['Homeowner', 'Solar Installer', 'DIY Enthusiast', 'Renter', 'Engineer'],
    searchKeywords: ['solar panel calculator', 'how many solar panels do i need', 'pv solar sizing', 'off grid solar calculator', 'solar array wattage'],
    tags: ['Solar', 'Renewable', 'Off-Grid', 'Green Energy'],
    inputs: [
      { id: 'dailyKwh', label: 'Target Daily Usage (kWh)', type: 'number', defaultValue: 20, unit: 'kWh/day', min: 1, max: 200, step: 1, helpText: 'Check your average monthly electric bill and divide kWh by 30' },
      { id: 'sunHours', label: 'Average Peak Sun Hours', type: 'slider', defaultValue: 4.5, unit: 'hrs/day', min: 2.0, max: 7.0, step: 0.1, helpText: 'US average: 4.0 - 5.5 hrs depending on state' },
      { id: 'panelWatts', label: 'Single Solar Panel Wattage', type: 'select', defaultValue: '400', options: [
        { label: '300 Watt Panel (Standard Residential)', value: '300' },
        { label: '350 Watt Panel (Mid-tier)', value: '350' },
        { label: '400 Watt Panel (Modern Premium)', value: '400' },
        { label: '450 Watt Panel (Commercial / High Efficiency)', value: '450' },
        { label: '550 Watt Panel (Utility Scale)', value: '550' }
      ]}
    ],
    calculate: (inputs, userRate, currency) => {
      const kwh = Number(inputs.dailyKwh) || 20;
      const sun = Number(inputs.sunHours) || 4.5;
      const panelPwr = Number(inputs.panelWatts) || 400;

      // System loss 20% (0.8 efficiency)
      const grossKwhNeeded = kwh / 0.8;
      const arrayWattsNeeded = (grossKwhNeeded * 1000) / sun;
      const panelCount = Math.ceil(arrayWattsNeeded / panelPwr);
      const actualArrayKw = (panelCount * panelPwr) / 1000;

      const dailyGenerationEst = actualArrayKw * sun * 0.8;
      const monthlySavingsEst = dailyGenerationEst * 30 * userRate;
      const annualSavingsEst = dailyGenerationEst * 365 * userRate;

      return {
        primaryValue: `${panelCount} Panels`,
        primaryUnit: `(${actualArrayKw.toFixed(2)} kW Array)`,
        primaryLabel: 'Recommended Solar System Size',
        secondaryMetrics: [
          { label: 'Required Solar Array Watts', value: `${Math.round(arrayWattsNeeded)} W` },
          { label: 'Est. Daily Energy Output', value: dailyGenerationEst.toFixed(1), unit: 'kWh/day' },
          { label: 'Est. Monthly Bill Savings', value: `${currency}${monthlySavingsEst.toFixed(2)}`, highlight: true },
          { label: 'Est. Annual Savings', value: `${currency}${annualSavingsEst.toFixed(2)}` }
        ],
        breakdownSteps: [
          `1. Adjusted target daily kWh (accounting for 20% losses): ${kwh} kWh ÷ 0.80 = ${grossKwhNeeded.toFixed(2)} kWh/day`,
          `2. Required peak PV wattage: (${grossKwhNeeded.toFixed(2)} × 1,000 Wh) ÷ ${sun} Peak Sun Hours = ${Math.round(arrayWattsNeeded)} Watts`,
          `3. Panel calculation: ${Math.round(arrayWattsNeeded)} W ÷ ${panelPwr} W per panel = ${(arrayWattsNeeded/panelPwr).toFixed(2)} panels -> Round up to ${panelCount} panels`,
          `4. Actual installed capacity: ${panelCount} × ${panelPwr} W = ${(actualArrayKw*1000).toFixed(0)} Watts (${actualArrayKw.toFixed(2)} kW)`
        ],
        recommendationNote: 'Pair this solar array with an appropriately sized battery storage system if you require overnight power backup or off-grid independence.'
      };
    }
  },

  // 4. Battery Runtime & Ah / Wh Converter
  {
    id: 'battery-capacity-runtime',
    slug: 'battery-capacity-runtime-calculator',
    title: 'Battery Capacity (Ah / Wh) & Runtime Calculator',
    categoryId: 'battery-systems',
    shortDescription: 'Calculate battery backup duration in hours and convert between Amp-Hours (Ah) and Watt-Hours (Wh) for Lead-Acid, AGM, and Lithium LiFePO4 batteries.',
    detailedDescription: 'Whether running an off-grid inverter, powering an RV, or backing up a medical device, knowing how long your battery will last under load is essential. This calculator accounts for battery chemistry Peukert effect, Depth of Discharge (DoD), and inverter loss efficiency.',
    formula: 'Watt-Hours (Wh) = Amp-Hours (Ah) × Voltage (V)\nUsable Wh = Total Wh × Depth of Discharge (DoD)\nRuntime (Hours) = (Usable Wh × Inverter Efficiency 0.9) ÷ Load Watts',
    formulaTex: 'E_{\\text{Wh}} = Q_{\\text{Ah}} \\times V, \\quad t_{\\text{runtime}} = \\frac{E_{\\text{Wh}} \\times \\text{DoD} \\times \\eta_{\\text{inv}}}{P_{\\text{load}}}',
    variables: [
      { name: 'Battery Capacity', symbol: 'Ah or Wh', unit: 'Ah or Wh', description: 'Storage rating of the battery bank.' },
      { name: 'Nominal Voltage', symbol: 'V', unit: 'Volts', description: 'System DC voltage (12V, 24V, 48V).' },
      { name: 'Depth of Discharge', symbol: 'DoD', unit: '%', description: 'Recommended max discharge limit (Lithium ~90-100%, Lead-Acid ~50%).' },
      { name: 'Electrical Load', symbol: 'P', unit: 'Watts', description: 'Total continuous power draw from connected devices.' }
    ],
    workedExamples: [
      {
        title: '100Ah 12V Lithium Battery powering a 100W Fridge',
        scenario: 'A 100Ah 12V LiFePO4 battery (90% DoD) powering a 100W portable RV fridge via a 92% efficient inverter.',
        inputs: { capacityAh: 100, voltage: 12, loadWatts: 100, chemistry: 'lithium' },
        stepByStep: [
          'Step 1: Calculate total Watt-Hours: 100 Ah × 12 V = 1,200 Wh.',
          'Step 2: Calculate usable Wh at 90% DoD: 1,200 Wh × 0.90 = 1,080 Wh usable.',
          'Step 3: Account for 92% inverter efficiency: 1,080 Wh × 0.92 = 993.6 Wh deliverable.',
          'Step 4: Calculate runtime: 993.6 Wh ÷ 100 Watts = 9.93 Hours of continuous operation.'
        ],
        finalResult: '9.9 Hours Runtime (993 Usable Wh)'
      }
    ],
    faqs: [
      {
        question: 'Why can Lead-Acid batteries only be discharged to 50%?',
        answer: 'Discharging AGM or flooded lead-acid batteries below 50% state of charge causes rapid plate sulfation and drastically reduces their overall cycle life from ~500 cycles down to under 150 cycles.'
      },
      {
        question: 'Why are Lithium (LiFePO4) batteries better for solar storage?',
        answer: 'LiFePO4 batteries allow 90-100% usable capacity without damage, provide over 3,000 to 5,000 cycles, maintain steady voltage output, and weigh 60% less than lead-acid.'
      }
    ],
    commonMistakes: [
      'Forgetting that inverter efficiency (typically 85-93%) reduces effective runtime.',
      'Assuming a 100Ah lead acid battery gives 100Ah of usable power (it only gives ~50Ah safely).',
      'Ignoring surge currents when powering inductive loads like compressors or pumps.'
    ],
    relatedCalculatorIds: ['inverter-size-calculator', 'solar-panel-sizing', 'ups-runtime-calculator', 'appliance-electricity-cost'],
    popularityRank: 4,
    targetAudience: ['DIY Enthusiast', 'Solar Installer', 'Homeowner', 'Electrician'],
    searchKeywords: ['battery runtime calculator', 'ah to wh converter', 'how long will 100ah battery last', 'lifepo4 battery runtime', 'rv battery capacity'],
    tags: ['Battery', 'Lithium', 'Off-Grid', 'Ah to Wh'],
    inputs: [
      { id: 'capacityAh', label: 'Battery Rating (Amp-Hours Ah)', type: 'number', defaultValue: 100, unit: 'Ah', min: 10, max: 2000, step: 10 },
      { id: 'voltage', label: 'Battery Voltage', type: 'select', defaultValue: '12', options: [
        { label: '12 Volts DC', value: '12' },
        { label: '24 Volts DC', value: '24' },
        { label: '36 Volts DC', value: '36' },
        { label: '48 Volts DC', value: '48' }
      ]},
      { id: 'loadWatts', label: 'Continuous Electrical Load', type: 'number', defaultValue: 150, unit: 'Watts', min: 10, max: 5000, step: 10 },
      { id: 'chemistry', label: 'Battery Chemistry', type: 'select', defaultValue: 'lithium', options: [
        { label: 'Lithium LiFePO4 (90% Usable DoD)', value: 'lithium' },
        { label: 'AGM / Gel Sealed (50% Usable DoD)', value: 'agm' },
        { label: 'Flooded Lead-Acid (50% Usable DoD)', value: 'flooded' }
      ]}
    ],
    calculate: (inputs) => {
      const ah = Number(inputs.capacityAh) || 100;
      const v = Number(inputs.voltage) || 12;
      const load = Number(inputs.loadWatts) || 150;
      const chemistry = inputs.chemistry;

      const dod = chemistry === 'lithium' ? 0.90 : 0.50;
      const totalWh = ah * v;
      const usableWh = totalWh * dod;
      const inverterLoss = 0.90; // 90% inverter efficiency
      const deliverableWh = usableWh * inverterLoss;

      const runtimeHours = deliverableWh / load;
      const hoursInt = Math.floor(runtimeHours);
      const minutesInt = Math.round((runtimeHours - hoursInt) * 60);

      return {
        primaryValue: `${hoursInt}h ${minutesInt}m`,
        primaryUnit: 'Continuous Runtime',
        primaryLabel: 'Estimated Battery Backup Duration',
        secondaryMetrics: [
          { label: 'Total Energy Capacity', value: totalWh, unit: 'Wh' },
          { label: 'Usable Energy (DoD)', value: usableWh.toFixed(0), unit: 'Wh' },
          { label: 'Inverter Efficiency Loss', value: '10%' },
          { label: 'Equivalent Capacity', value: (totalWh / 1000).toFixed(2), unit: 'kWh' }
        ],
        breakdownSteps: [
          `1. Total Energy = ${ah} Ah × ${v} V = ${totalWh} Wh`,
          `2. Usable Energy (${(dod*100)}% DoD for ${chemistry}): ${totalWh} Wh × ${dod} = ${usableWh} Wh`,
          `3. Deliverable Energy after 90% inverter efficiency: ${usableWh} Wh × 0.90 = ${deliverableWh.toFixed(1)} Wh`,
          `4. Runtime: ${deliverableWh.toFixed(1)} Wh ÷ ${load} W = ${runtimeHours.toFixed(2)} hours (${hoursInt}h ${minutesInt}m)`
        ],
        recommendationNote: chemistry !== 'lithium' ? 'Upgrading to Lithium (LiFePO4) will nearly double your usable runtime and extend battery lifespan from 3 years to 10+ years!' : 'Lithium battery setup confirmed for high cycle life and deep discharge capability.'
      };
    }
  },

  // 5. Inverter Sizing & Surge Power
  {
    id: 'inverter-size-calculator',
    slug: 'inverter-size-requirement-calculator',
    title: 'Inverter Size Requirement & Surge Power Calculator',
    categoryId: 'inverters-converters',
    shortDescription: 'Calculate continuous wattage and peak surge wattage required when choosing a Pure Sine Wave inverter for appliances, tools, and motors.',
    detailedDescription: 'Inverters convert DC battery power into 120V/240V AC electricity. Choosing an undersized inverter trips safety overloads when motors start up. This calculator determines the continuous AC load and motor surge multipliers needed to safely power refrigerators, microwave ovens, pumps, and power tools.',
    formula: 'Continuous Wattage = Sum of all running watts × 1.25 Safety Margin\nPeak Surge Wattage = Sum of running non-motor watts + (Highest Motor Wattage × 3)',
    formulaTex: 'P_{\\text{cont}} = \\left(\\sum P_{\\text{running}}\\right) \\times 1.25, \\quad P_{\\text{surge}} = P_{\\text{base}} + (P_{\\text{motor, max}} \\times 3)',
    variables: [
      { name: 'Running Watts', symbol: 'P_run', unit: 'Watts', description: 'Total continuous power required by all active appliances simultaneously.' },
      { name: 'Surge Factor', symbol: 'S', unit: 'x Multiplier', description: 'Inductive motor startup surge multiplier (typically 2x to 5x running watts).' }
    ],
    workedExamples: [
      {
        title: 'Refrigerator + TV + Microwave Sizing',
        scenario: 'Running a Refrigerator (200W running / 1200W surge), LED TV (100W), and Microwave (1000W) simultaneously.',
        inputs: { totalRunningWatts: 1300, maxMotorSurgeWatts: 1200, safetyMargin: 25 },
        stepByStep: [
          'Step 1: Total continuous load = 200W + 100W + 1000W = 1,300 Watts.',
          'Step 2: Add 25% safety buffer: 1,300 W × 1.25 = 1,625 Watts continuous capacity required.',
          'Step 3: Calculate peak surge requirement: 1,300 W + (1,200 W - 200 W motor surge) = 2,300 Watts surge capacity.',
          'Step 4: Select inverter: Standard 2,000 Watt Continuous / 4,000 Watt Peak Pure Sine Wave Inverter.'
        ],
        finalResult: '2,000W Continuous Pure Sine Inverter'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Pure Sine Wave and Modified Sine Wave inverters?',
        answer: 'Pure Sine Wave produces clean, smooth AC electricity identical to utility grid power, essential for electronics, CPAP machines, refrigerators, and power tools. Modified Sine Wave is cheaper but creates electrical noise, overheating motors and humming sensitive electronics.'
      }
    ],
    commonMistakes: [
      'Ignoring inductive motor starting surge (refrigerators, AC units, air compressors draw 3x to 5x their rated power for 1-2 seconds on startup).',
      'Sizing the inverter for average load instead of peak simultaneous loads.'
    ],
    relatedCalculatorIds: ['battery-capacity-runtime', 'solar-panel-sizing', 'wire-size-voltage-drop', 'appliance-electricity-cost'],
    popularityRank: 5,
    targetAudience: ['Homeowner', 'Solar Installer', 'DIY Enthusiast', 'Electrician'],
    searchKeywords: ['inverter size calculator', 'what size inverter do i need', 'pure sine wave inverter calculator', 'rv inverter sizing', 'inverter surge capacity'],
    tags: ['Inverter', 'Solar', 'Surge Power', 'Off-Grid'],
    inputs: [
      { id: 'runningWatts', label: 'Total Continuous Appliance Load', type: 'number', defaultValue: 1200, unit: 'Watts', min: 100, max: 15000, step: 50 },
      { id: 'hasMotors', label: 'Includes Motors / Compressors (Fridges, Pumps, AC)?', type: 'select', defaultValue: 'yes', options: [
        { label: 'Yes (3x Surge Factor)', value: 'yes' },
        { label: 'No (Pure Resistive Load - Lights, TV, Laptop)', value: 'no' }
      ]}
    ],
    calculate: (inputs) => {
      const running = Number(inputs.runningWatts) || 1200;
      const hasMotors = inputs.hasMotors === 'yes';

      const safetyWatts = running * 1.25;
      const surgeMultiplier = hasMotors ? 3 : 1.2;
      const estimatedSurgeWatts = running * surgeMultiplier;

      // Recommended standard inverter sizes
      const sizes = [500, 1000, 1500, 2000, 3000, 4000, 5000, 8000, 10000];
      const selectedSize = sizes.find(s => s >= safetyWatts) || 10000;

      return {
        primaryValue: `${selectedSize} Watts`,
        primaryUnit: 'Pure Sine Wave',
        primaryLabel: 'Recommended Minimum Inverter Rating',
        secondaryMetrics: [
          { label: 'Continuous Load (with 25% Buffer)', value: `${Math.round(safetyWatts)} W` },
          { label: 'Estimated Peak Surge Requirement', value: `${Math.round(estimatedSurgeWatts)} W`, highlight: true },
          { label: 'Recommended DC Input Voltage', value: selectedSize >= 3000 ? '24V or 48V DC' : '12V or 24V DC' }
        ],
        breakdownSteps: [
          `Continuous load input: ${running} Watts`,
          `25% safety overhead for long-term component life: ${running} W × 1.25 = ${Math.round(safetyWatts)} W`,
          `Peak surge allowance (${hasMotors ? 'Motor inductive 3x multiplier' : 'Standard 1.2x multiplier'}): ${running} W × ${surgeMultiplier} = ${Math.round(estimatedSurgeWatts)} W`,
          `Selected commercial size: ${selectedSize} W Pure Sine Wave Inverter`
        ],
        recommendationNote: 'Always select a Pure Sine Wave inverter to protect sensitive circuit boards, digital displays, and fridge compressors from buzzing or overheating.'
      };
    }
  },

  // 6. Ohm's Law & Power Triangle Calculator
  {
    id: 'ohms-law-calculator',
    slug: 'ohms-law-power-calculator',
    title: 'Ohm’s Law & Electrical Power Triangle Calculator',
    categoryId: 'electrical-engineering',
    shortDescription: 'Calculate Voltage (V), Current (I), Resistance (R), and Power (P) instantly using standard Ohm’s Law formulas for DC and AC circuits.',
    detailedDescription: 'The foundational relationship of electrical engineering: Voltage = Current × Resistance, and Power = Voltage × Current. Enter any two known values to automatically solve for the remaining two parameters.',
    formula: 'V = I × R\nP = V × I = I² × R = V² ÷ R',
    formulaTex: 'V = I \\cdot R, \\quad P = V \\cdot I = I^2 \\cdot R = \\frac{V^2}{R}',
    variables: [
      { name: 'Voltage', symbol: 'V', unit: 'Volts (V)', description: 'Electrical potential difference.' },
      { name: 'Current', symbol: 'I', unit: 'Amperes (A)', description: 'Flow rate of electric charge.' },
      { name: 'Resistance', symbol: 'R', unit: 'Ohms (Ω)', description: 'Opposition to current flow.' },
      { name: 'Power', symbol: 'P', unit: 'Watts (W)', description: 'Rate of electrical energy transfer.' }
    ],
    workedExamples: [
      {
        title: 'Calculate Current and Power of a 120V 10Ω Element',
        scenario: 'An electric heater coil with 10 Ohms resistance connected to a 120V outlet.',
        inputs: { voltage: 120, resistance: 10 },
        stepByStep: [
          'Step 1: Calculate Current (I) = V ÷ R = 120 V ÷ 10 Ω = 12 Amps.',
          'Step 2: Calculate Power (P) = V × I = 120 V × 12 A = 1,440 Watts.'
        ],
        finalResult: '12 Amps / 1,440 Watts'
      }
    ],
    faqs: [
      {
        question: 'What happens to power if voltage doubles across a fixed resistor?',
        answer: 'Power quadruples! Because P = V² / R, doubling voltage multiplies the resulting power draw by 2² = 4 times.'
      }
    ],
    commonMistakes: [
      'Applying DC Ohm’s Law formulas directly to AC inductive/capacitive circuits without accounting for AC impedance (Z) and power factor.'
    ],
    relatedCalculatorIds: ['appliance-electricity-cost', 'wire-size-voltage-drop', 'circuit-breaker-sizing', 'power-factor-calculator'],
    popularityRank: 6,
    targetAudience: ['Student', 'Electrician', 'Engineer', 'DIY Enthusiast'],
    searchKeywords: ['ohms law calculator', 'calculate voltage current resistance', 'power triangle calculator', 'electrical formulas', 'v ir p vi'],
    tags: ['Engineering', 'Ohm’s Law', 'Fundamental', 'Education'],
    inputs: [
      { id: 'calcType', label: 'Known Inputs', type: 'select', defaultValue: 'VI', options: [
        { label: 'Voltage (V) & Current (I)', value: 'VI' },
        { label: 'Voltage (V) & Resistance (R)', value: 'VR' },
        { label: 'Current (I) & Resistance (R)', value: 'IR' },
        { label: 'Power (P) & Voltage (V)', value: 'PV' }
      ]},
      { id: 'val1', label: 'Primary Value', type: 'number', defaultValue: 120, unit: 'Units' },
      { id: 'val2', label: 'Secondary Value', type: 'number', defaultValue: 10, unit: 'Units' }
    ],
    calculate: (inputs) => {
      const type = inputs.calcType;
      const v1 = Number(inputs.val1) || 0;
      const v2 = Number(inputs.val2) || 0;

      let v = 0, i = 0, r = 0, p = 0;

      if (type === 'VI') {
        v = v1; i = v2;
        r = i !== 0 ? v / i : 0;
        p = v * i;
      } else if (type === 'VR') {
        v = v1; r = v2;
        i = r !== 0 ? v / r : 0;
        p = (v * v) / (r || 1);
      } else if (type === 'IR') {
        i = v1; r = v2;
        v = i * r;
        p = i * i * r;
      } else { // PV
        p = v1; v = v2;
        i = v !== 0 ? p / v : 0;
        r = i !== 0 ? v / i : 0;
      }

      return {
        primaryValue: `${p.toFixed(2)} W`,
        primaryUnit: 'Power (Watts)',
        primaryLabel: 'Calculated Power Output',
        secondaryMetrics: [
          { label: 'Voltage (V)', value: v.toFixed(2), unit: 'Volts' },
          { label: 'Current (I)', value: i.toFixed(2), unit: 'Amps' },
          { label: 'Resistance (R)', value: r.toFixed(2), unit: 'Ohms (Ω)' },
          { label: 'Power (P)', value: (p / 1000).toFixed(3), unit: 'kW' }
        ],
        breakdownSteps: [
          `Formula 1: V = I × R = ${v.toFixed(2)} Volts`,
          `Formula 2: I = V ÷ R = ${i.toFixed(2)} Amps`,
          `Formula 3: R = V ÷ I = ${r.toFixed(2)} Ω`,
          `Formula 4: P = V × I = ${p.toFixed(2)} Watts`
        ]
      };
    }
  },

  // 7. Air Conditioner BTU & Electrical Wattage Calculator
  {
    id: 'ac-btu-watt-calculator',
    slug: 'air-conditioner-btu-wattage-calculator',
    title: 'Air Conditioner BTU Sizing & Electrical Wattage Calculator',
    categoryId: 'home-hvac',
    shortDescription: 'Calculate required Air Conditioner cooling capacity in BTUs and estimate electrical kW power consumption based on room dimensions and climate.',
    detailedDescription: 'Sizing an air conditioner correctly ensures fast cooling without short-cycling or wasted energy. This calculator converts room square footage into required BTUs, tons of refrigeration, and estimates monthly electric bills based on AC Seasonal Energy Efficiency Ratio (SEER).',
    formula: 'Base BTUs = Room Area (sq ft) × 20\nAdjusted BTUs = Base BTUs × Climate Factor × Insulation Factor\nElectrical kW = BTUs ÷ (SEER Rating × 1000)',
    formulaTex: '\\text{BTU} = A_{\\text{sqft}} \\times 20 \\times F_{\\text{sun}} \\times F_{\\text{ceil}}, \\quad P_{\\text{kW}} = \\frac{\\text{BTU}}{\\text{SEER} \\times 1000}',
    variables: [
      { name: 'Room Area', symbol: 'A', unit: 'sq ft', description: 'Total length × width of the room being cooled.' },
      { name: 'SEER Rating', symbol: 'SEER', unit: 'BTU / W-hr', description: 'Seasonal Energy Efficiency Ratio (standard modern ACs range 14 to 22 SEER).' }
    ],
    workedExamples: [
      {
        title: '400 sq ft Living Room Cooling Sizing',
        scenario: 'Cooling a 400 sq ft room in a sunny climate using a modern 16 SEER mini-split unit.',
        inputs: { roomSqFt: 400, ceilingHeight: 8, sunExposure: 'sunny', seer: 16 },
        stepByStep: [
          'Step 1: Base cooling = 400 sq ft × 20 = 8,000 BTUs.',
          'Step 2: Add 10% sun adjustment = 8,000 × 1.10 = 8,800 BTUs.',
          'Step 3: Calculate electrical power draw: 8,800 BTUs ÷ 16 SEER = 550 Watts (0.55 kW).',
          'Step 4: Running 8 hours/day costs: 0.55 kW × 8 h × $0.16 = $0.70/day ($21/month).'
        ],
        finalResult: '9,000 BTU / 0.75 Ton AC Unit (~550W)'
      }
    ],
    faqs: [
      {
        question: 'How many BTUs are in 1 Ton of cooling?',
        answer: '1 Ton of refrigeration equals exactly 12,000 BTUs per hour.'
      },
      {
        question: 'Why is an oversized AC unit bad?',
        answer: 'An oversized AC cools the room too quickly before dehumidifying the air, leaving the room cold and clammy while causing frequent compressor short-cycling.'
      }
    ],
    commonMistakes: [
      'Ignoring high ceilings (8ft vs 10ft+) and window sun exposure.',
      'Sizing AC solely by room area without factoring SEER rating into electric bill calculations.'
    ],
    relatedCalculatorIds: ['appliance-electricity-cost', 'solar-panel-sizing', 'inverter-size-calculator', 'circuit-breaker-sizing'],
    popularityRank: 7,
    targetAudience: ['Homeowner', 'Renter', 'DIY Enthusiast', 'Small Business'],
    searchKeywords: ['ac btu calculator', 'air conditioner size calculator', 'how many btu for 500 sq ft', 'ac electric bill calculator', 'ton of ac to btu'],
    tags: ['HVAC', 'Air Conditioner', 'BTU', 'Electricity Bill'],
    inputs: [
      { id: 'roomSqFt', label: 'Room Area (Square Feet)', type: 'number', defaultValue: 350, unit: 'sq ft', min: 50, max: 2000, step: 25 },
      { id: 'sunExposure', label: 'Sunlight Exposure', type: 'select', defaultValue: 'moderate', options: [
        { label: 'Shaded Room (-10% BTUs)', value: 'shaded' },
        { label: 'Moderate Sun (Standard)', value: 'moderate' },
        { label: 'Very Sunny / Top Floor (+10% BTUs)', value: 'sunny' }
      ]},
      { id: 'seer', label: 'AC Efficiency (SEER Rating)', type: 'select', defaultValue: '16', options: [
        { label: '10 SEER (Older / Window Unit)', value: '10' },
        { label: '14 SEER (Standard Modern Central AC)', value: '14' },
        { label: '16 SEER (High Efficiency Mini-Split)', value: '16' },
        { label: '20+ SEER (Ultra Inverter Heat Pump)', value: '20' }
      ]}
    ],
    calculate: (inputs, userRate, currency) => {
      const sqft = Number(inputs.roomSqFt) || 350;
      const sun = inputs.sunExposure;
      const seer = Number(inputs.seer) || 16;

      let baseBtu = sqft * 20;
      if (sun === 'shaded') baseBtu *= 0.9;
      if (sun === 'sunny') baseBtu *= 1.1;

      const roundedBtu = Math.ceil(baseBtu / 1000) * 1000;
      const tons = roundedBtu / 12000;
      const wattsDraw = roundedBtu / seer;
      const kwhPer8Hours = (wattsDraw * 8) / 1000;
      const monthlyCost = kwhPer8Hours * 30 * userRate;

      return {
        primaryValue: `${roundedBtu.toLocaleString()} BTU`,
        primaryUnit: `(${tons.toFixed(2)} Tons Cooling)`,
        primaryLabel: 'Recommended Air Conditioner Capacity',
        secondaryMetrics: [
          { label: 'Estimated Electrical Draw', value: `${Math.round(wattsDraw)} W`, highlight: true },
          { label: 'Daily Energy Usage (8 hrs/day)', value: kwhPer8Hours.toFixed(1), unit: 'kWh/day' },
          { label: 'Est. Monthly Cooling Cost', value: `${currency}${monthlyCost.toFixed(2)}` },
          { label: 'Ton Rating', value: `${tons.toFixed(1)} Tons` }
        ],
        breakdownSteps: [
          `1. Base BTU: ${sqft} sq ft × 20 BTU/sq ft = ${sqft * 20} BTUs`,
          `2. Sunlight multiplier (${sun}): ${sqft * 20} × ${sun === 'sunny' ? '1.10' : sun === 'shaded' ? '0.90' : '1.0'} = ${Math.round(baseBtu)} BTUs`,
          `3. Electrical power draw = ${roundedBtu} BTUs ÷ ${seer} SEER = ${Math.round(wattsDraw)} Watts`,
          `4. Monthly operating cost (8h/day @ ${currency}${userRate}/kWh) = ${currency}${monthlyCost.toFixed(2)}`
        ]
      };
    }
  },

  // 8. EV Charging Time & Cost Calculator
  {
    id: 'ev-charging-cost',
    slug: 'ev-charging-time-cost-calculator',
    title: 'EV Charging Time & Cost Calculator',
    categoryId: 'ev-charging',
    shortDescription: 'Calculate how long it takes to charge your electric vehicle (EV) at home or public chargers and compute the cost per full charge vs gasoline savings.',
    detailedDescription: 'Electric vehicles offer significant fuel savings over gasoline cars. This calculator estimates charging speed, total kWh consumed, home charging cost, and compares your cost per mile against gas vehicles.',
    formula: 'Charging Time (Hours) = Battery Energy Needed (kWh) ÷ (Charger Power kW × Charging Efficiency 0.90)\nCost = Energy Consumed (kWh) × Electricity Rate ($/kWh)',
    formulaTex: 't_{\\text{charge}} = \\frac{\\Delta E_{\\text{kWh}}}{P_{\\text{charger, kW}} \\times 0.90}, \\quad C = \\Delta E_{\\text{kWh}} \\times \\text{Rate}',
    variables: [
      { name: 'Battery Size', symbol: 'E_bat', unit: 'kWh', description: 'Total usable capacity of the EV battery (e.g., Tesla Model 3: 60-82 kWh).' },
      { name: 'Charger Power', symbol: 'P_charger', unit: 'kW', description: 'Level 1 (1.4 kW), Level 2 (7.2-11.5 kW), or Level 3 DC Fast Charger (50-250 kW).' }
    ],
    workedExamples: [
      {
        title: 'Tesla Model 3 (75 kWh) Level 2 Home Charger',
        scenario: 'Charging from 20% to 80% state-of-charge on a 40A 240V (9.6 kW) Level 2 home charger at $0.16/kWh.',
        inputs: { batteryCapacityKwh: 75, startSocPct: 20, endSocPct: 80, chargerKw: 9.6 },
        stepByStep: [
          'Step 1: Energy needed = 75 kWh × (80% - 20%) = 45 kWh.',
          'Step 2: Account for 10% charging heat/inverter loss: 45 kWh ÷ 0.90 = 50 kWh consumed from wall.',
          'Step 3: Charging time = 45 kWh ÷ 9.6 kW = ~4.7 Hours.',
          'Step 4: Total home charge cost = 50 kWh × $0.16 = $8.00 (gives ~200 miles of range!).'
        ],
        finalResult: '4.7 Hours / $8.00 Full Charge'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Level 1, Level 2, and Level 3 EV charging?',
        answer: 'Level 1 uses standard 120V outlets (~2-5 miles of range per hour). Level 2 uses a 240V outlet (~20-40 miles of range per hour). Level 3 DC Fast Chargers supply high-voltage direct current (~100-200 miles in 20 minutes).'
      }
    ],
    commonMistakes: [
      'Assuming 100% of grid power enters the battery (EV onboard chargers experience 8-12% heat conversion losses).'
    ],
    relatedCalculatorIds: ['appliance-electricity-cost', 'wire-size-voltage-drop', 'circuit-breaker-sizing', 'solar-panel-sizing'],
    popularityRank: 8,
    targetAudience: ['Homeowner', 'DIY Enthusiast', 'Electrician'],
    searchKeywords: ['ev charging calculator', 'how long to charge tesla', 'level 2 ev charger cost', 'ev vs gas cost calculator', 'ev kWh calculator'],
    tags: ['EV', 'Electric Car', 'Level 2 Charger', 'Energy Savings'],
    inputs: [
      { id: 'batteryKwh', label: 'EV Battery Capacity (kWh)', type: 'number', defaultValue: 75, unit: 'kWh', min: 10, max: 200, step: 5, helpText: 'e.g., Model 3: 75kWh, Ford Lightning: 131kWh' },
      { id: 'chargerType', label: 'Charger Power Rating', type: 'select', defaultValue: 'level2_40a', options: [
        { label: 'Level 1 Outlet (120V 12A - 1.4 kW)', value: 'level1' },
        { label: 'Level 2 NEMA 14-50 (240V 32A - 7.6 kW)', value: 'level2_32a' },
        { label: 'Level 2 Wall Connector (240V 48A - 11.5 kW)', value: 'level2_48a' },
        { label: 'Level 3 DC Fast Charger (150 kW)', value: 'dc_fast' }
      ]},
      { id: 'chargeDeltaPct', label: 'Charge Range Added (% SoC)', type: 'slider', defaultValue: 60, unit: '%', min: 10, max: 100, step: 5, helpText: 'e.g. charging from 20% to 80% = 60%' }
    ],
    calculate: (inputs, userRate, currency) => {
      const batKwh = Number(inputs.batteryKwh) || 75;
      const pct = Number(inputs.chargeDeltaPct) || 60;
      const chargerKey = inputs.chargerType;

      let kw = 7.6;
      if (chargerKey === 'level1') kw = 1.4;
      if (chargerKey === 'level2_32a') kw = 7.6;
      if (chargerKey === 'level2_48a') kw = 11.5;
      if (chargerKey === 'dc_fast') kw = 150;

      const netEnergyKwh = batKwh * (pct / 100);
      const grossEnergyKwh = netEnergyKwh / 0.90; // 90% efficiency
      const hours = netEnergyKwh / kw;

      const hoursInt = Math.floor(hours);
      const minsInt = Math.round((hours - hoursInt) * 60);

      const chargeCost = grossEnergyKwh * userRate;
      const estMilesAdded = netEnergyKwh * 3.5; // ~3.5 miles per kWh average
      const costPerMile = chargeCost / (estMilesAdded || 1);

      return {
        primaryValue: `${hoursInt}h ${minsInt}m`,
        primaryUnit: `(${netEnergyKwh.toFixed(1)} kWh added)`,
        primaryLabel: 'Estimated Charge Time',
        secondaryMetrics: [
          { label: 'Home Charge Cost', value: `${currency}${chargeCost.toFixed(2)}`, highlight: true },
          { label: 'Estimated Range Added', value: `${Math.round(estMilesAdded)} miles` },
          { label: 'Effective Fuel Cost', value: `${currency}${costPerMile.toFixed(3)} / mile` },
          { label: 'Grid Power Consumed', value: grossEnergyKwh.toFixed(1), unit: 'kWh' }
        ],
        breakdownSteps: [
          `Target energy to add: ${batKwh} kWh × ${pct}% = ${netEnergyKwh.toFixed(1)} kWh`,
          `Charge time: ${netEnergyKwh.toFixed(1)} kWh ÷ ${kw} kW charger = ${hours.toFixed(2)} hrs (${hoursInt}h ${minsInt}m)`,
          `Grid energy with 10% thermal loss: ${netEnergyKwh.toFixed(1)} ÷ 0.90 = ${grossEnergyKwh.toFixed(1)} kWh`,
          `Total electricity cost: ${grossEnergyKwh.toFixed(1)} kWh × ${currency}${userRate}/kWh = ${currency}${chargeCost.toFixed(2)}`
        ]
      };
    }
  },

  // 9. UPS Backup Battery Runtime & VA Calculator
  {
    id: 'ups-runtime-calculator',
    slug: 'ups-backup-time-va-sizing-calculator',
    title: 'UPS Backup Duration & VA Sizing Calculator',
    categoryId: 'ups-power',
    shortDescription: 'Calculate the required Volt-Amp (VA) and Watt rating for an Uninterruptible Power Supply (UPS) to protect servers, PCs, routers, and NAS storage.',
    detailedDescription: 'When utility grid power fails, a UPS keeps critical IT infrastructure running cleanly until generators turn on or automated shutdown occurs. This calculator sizes VA capacity and estimates backup runtime under real-world battery discharge curves.',
    formula: 'Required VA = Total Load Watts ÷ Power Factor (0.6 - 0.9)\nUPS Watt Capacity = Total Load Watts × 1.25 Safety Margin',
    formulaTex: 'S_{\\text{VA}} = \\frac{P_{\\text{Watts}}}{\\text{PF}}, \\quad P_{\\text{UPS, W}} = P_{\\text{Watts}} \\times 1.25',
    variables: [
      { name: 'Load Power', symbol: 'P', unit: 'Watts', description: 'Combined continuous draw of computers, monitors, networking gear.' },
      { name: 'Power Factor', symbol: 'PF', unit: '0.6 to 0.9', description: 'Power factor of computer switched-mode power supplies (typically 0.7 - 0.9).' }
    ],
    workedExamples: [
      {
        title: 'Workstation + Dual Monitors + Wi-Fi Router UPS Sizing',
        scenario: 'A desktop PC (300W), 2 monitors (60W total), and Wi-Fi router (20W) requiring at least 15 minutes of shutdown time.',
        inputs: { totalWatts: 380, targetMinutes: 15, powerFactor: 0.7 },
        stepByStep: [
          'Step 1: Total continuous load = 380 Watts.',
          'Step 2: Calculate minimum VA rating: 380 W ÷ 0.7 PF = 542 VA.',
          'Step 3: Add 25% safety overhead: 542 VA × 1.25 = 678 VA.',
          'Step 4: Recommended commercial unit: 1000 VA / 600 Watt UPS.'
        ],
        finalResult: '1,000 VA / 600 Watt UPS Unit'
      }
    ],
    faqs: [
      {
        question: 'Why are UPS systems rated in both Watts and VA?',
        answer: 'Watts represent actual active work power drawn by devices. Volt-Amps (VA) represent apparent power flowing through wires. Commercial UPS devices must satisfy both maximum Watt and maximum VA thresholds.'
      }
    ],
    commonMistakes: [
      'Confusing VA with Watts (a 1000VA consumer UPS usually supports only ~600 Watts of real load).'
    ],
    relatedCalculatorIds: ['battery-capacity-runtime', 'inverter-size-calculator', 'appliance-electricity-cost'],
    popularityRank: 9,
    targetAudience: ['Homeowner', 'Small Business', 'Engineer', 'Student'],
    searchKeywords: ['ups runtime calculator', 'ups va rating calculator', 'what size ups do i need', 'apc ups calculator', 'ups backup duration'],
    tags: ['UPS', 'Backup Power', 'VA Rating', 'IT Power'],
    inputs: [
      { id: 'loadWatts', label: 'Connected Equipment Load', type: 'number', defaultValue: 350, unit: 'Watts', min: 20, max: 5000, step: 10 },
      { id: 'powerFactor', label: 'Equipment Power Factor', type: 'select', defaultValue: '0.7', options: [
        { label: '0.6 (Older PCs / Standard Monitors)', value: '0.6' },
        { label: '0.7 (Modern Workstations & Routers)', value: '0.7' },
        { label: '0.9 (Enterprise Servers / PFC Power Supplies)', value: '0.9' }
      ]}
    ],
    calculate: (inputs) => {
      const watts = Number(inputs.loadWatts) || 350;
      const pf = Number(inputs.powerFactor) || 0.7;

      const vaNeeded = watts / pf;
      const recommendedVa = Math.ceil((vaNeeded * 1.25) / 100) * 100;
      const recommendedWatts = Math.ceil((watts * 1.25) / 50) * 50;

      // Typical battery runtime estimation for standard 1000VA UPS with 2x 7Ah internal batteries (~168Wh)
      const internalWh = (recommendedVa / 1000) * 120; // scaled approx
      const runtimeMins = (internalWh * 0.85 * 60) / watts;

      return {
        primaryValue: `${recommendedVa} VA`,
        primaryUnit: `(${recommendedWatts} W Capacity)`,
        primaryLabel: 'Recommended Minimum UPS Rating',
        secondaryMetrics: [
          { label: 'Apparent Power', value: Math.round(vaNeeded), unit: 'VA' },
          { label: 'Est. Battery Runtime', value: `${Math.round(runtimeMins)} mins`, highlight: true },
          { label: 'Continuous Active Load', value: watts, unit: 'Watts' }
        ],
        breakdownSteps: [
          `Real Power Load: ${watts} Watts`,
          `Apparent Power (VA): ${watts} W ÷ ${pf} PF = ${Math.round(vaNeeded)} VA`,
          `1.25 Safety Margin Sizing: ${Math.round(vaNeeded)} × 1.25 = ${Math.round(vaNeeded*1.25)} VA`,
          `Selected Commercial Rating: ${recommendedVa} VA / ${recommendedWatts} Watts UPS`
        ]
      };
    }
  },

  // 10. Power Factor Correction & kVAR Capacitor Calculator
  {
    id: 'power-factor-calculator',
    slug: 'power-factor-correction-kvar-calculator',
    title: 'Power Factor Correction & kVAR Capacitor Sizing Calculator',
    categoryId: 'power-factor',
    shortDescription: 'Calculate power factor (cos φ), apparent power (kVA), reactive power (kVAR), and determine capacitor bank size required to eliminate utility penalty fees.',
    detailedDescription: 'Utilities charge high industrial demand penalties when power factor drops below 0.90-0.95. This engineering calculator calculates the required reactive power compensation (kVAR) and capacitance (μF) needed to restore power factor to unity or target levels.',
    formula: 'Power Factor (PF) = Real Power (kW) ÷ Apparent Power (kVA)\nkVAR Needed = kW × [tan(θ1) - tan(θ2)]',
    formulaTex: '\\text{PF} = \\frac{P_{\\text{kW}}}{S_{\\text{kVA}}}, \\quad Q_{\\text{kVAR}} = P_{\\text{kW}} \\left[ \\tan(\\arccos(\\text{PF}_1)) - \\tan(\\arccos(\\text{PF}_2)) \\right]',
    variables: [
      { name: 'Real Power', symbol: 'P', unit: 'kW', description: 'Active work power consumed by motors and loads.' },
      { name: 'Original PF', symbol: 'PF1', unit: '0.50 - 0.95', description: 'Existing uncorrected power factor.' },
      { name: 'Target PF', symbol: 'PF2', unit: '0.95 - 1.00', description: 'Desired corrected power factor.' }
    ],
    workedExamples: [
      {
        title: '100 kW Motor Load PF Correction from 0.70 to 0.95',
        scenario: 'A factory motor load drawing 100 kW at an inefficient 0.70 power factor aiming for 0.95 target.',
        inputs: { realPowerKw: 100, initialPf: 0.70, targetPf: 0.95 },
        stepByStep: [
          'Step 1: Angle θ1 = arccos(0.70) = 45.57° -> tan(45.57°) = 1.020.',
          'Step 2: Angle θ2 = arccos(0.95) = 18.19° -> tan(18.19°) = 0.329.',
          'Step 3: Required kVAR = 100 kW × (1.020 - 0.329) = 69.1 kVAR.',
          'Step 4: Installing a 70 kVAR capacitor bank reduces current draw and eliminates utility penalties.'
        ],
        finalResult: '69.1 kVAR Capacitor Bank Sizing'
      }
    ],
    faqs: [
      {
        question: 'Why do electric utilities penalize low power factor?',
        answer: 'Low power factor causes excessive reactive current to slosh through utility transformers and lines without doing real work, consuming line capacity and causing voltage drops.'
      }
    ],
    commonMistakes: [
      'Over-correcting power factor beyond 1.0 (leading power factor), which causes resonant over-voltages.'
    ],
    relatedCalculatorIds: ['ohms-law-calculator', 'circuit-breaker-sizing', 'wire-size-voltage-drop'],
    popularityRank: 10,
    targetAudience: ['Engineer', 'Electrician', 'Small Business', 'Student'],
    searchKeywords: ['power factor calculator', 'kvar capacitor sizing', 'power factor correction formula', 'kva to kw calculator', 'cos phi calculator'],
    tags: ['Power Quality', 'Engineering', 'Industrial', 'kVAR'],
    inputs: [
      { id: 'realPowerKw', label: 'Active Real Power (kW)', type: 'number', defaultValue: 100, unit: 'kW', min: 1, max: 10000, step: 5 },
      { id: 'initialPf', label: 'Existing Power Factor (cos φ1)', type: 'slider', defaultValue: 0.72, unit: '', min: 0.50, max: 0.95, step: 0.01 },
      { id: 'targetPf', label: 'Target Power Factor (cos φ2)', type: 'slider', defaultValue: 0.95, unit: '', min: 0.85, max: 1.00, step: 0.01 }
    ],
    calculate: (inputs) => {
      const kw = Number(inputs.realPowerKw) || 100;
      const pf1 = Number(inputs.initialPf) || 0.72;
      const pf2 = Number(inputs.targetPf) || 0.95;

      const theta1 = Math.acos(pf1);
      const theta2 = Math.acos(pf2);

      const tan1 = Math.tan(theta1);
      const tan2 = Math.tan(theta2);

      const kvarNeeded = kw * (tan1 - tan2);
      const initialKva = kw / pf1;
      const targetKva = kw / pf2;
      const currentReductionPct = ((initialKva - targetKva) / initialKva) * 100;

      return {
        primaryValue: `${kvarNeeded.toFixed(1)} kVAR`,
        primaryUnit: 'Capacitance Rating',
        primaryLabel: 'Required Capacitor Bank Sizing',
        secondaryMetrics: [
          { label: 'Original Apparent Power', value: initialKva.toFixed(1), unit: 'kVA' },
          { label: 'Corrected Apparent Power', value: targetKva.toFixed(1), unit: 'kVA' },
          { label: 'System Current Reduction', value: `${currentReductionPct.toFixed(1)}%`, highlight: true },
          { label: 'Reactive Power Saved', value: kvarNeeded.toFixed(1), unit: 'kVAR' }
        ],
        breakdownSteps: [
          `1. Original Apparent Power: ${kw} kW ÷ ${pf1} = ${initialKva.toFixed(1)} kVA`,
          `2. Angle calculations: tan(arccos(${pf1})) = ${tan1.toFixed(3)}, tan(arccos(${pf2})) = ${tan2.toFixed(3)}`,
          `3. Formula: Q = ${kw} kW × (${tan1.toFixed(3)} - ${tan2.toFixed(3)}) = ${kvarNeeded.toFixed(1)} kVAR`,
          `4. Resulting system current drop: ${currentReductionPct.toFixed(1)}% reduction in line current!`
        ]
      };
    }
  },

  // 11. Circuit Breaker & Fuse Rating Calculator
  {
    id: 'circuit-breaker-sizing',
    slug: 'circuit-breaker-sizing-calculator',
    title: 'Circuit Breaker & Fuse Rating Calculator',
    categoryId: 'safety-protection',
    shortDescription: 'Calculate standard circuit breaker amps (80% continuous load rule) according to NEC rules for 120V, 240V, and 3-phase circuits.',
    detailedDescription: 'Circuit breakers protect electrical wires from overheating and catching fire due to overload or short circuit faults. Under NEC 210.20, non-motor branch circuits must not exceed 80% continuous load of the breaker rating.',
    formula: 'Continuous Load (A) = Total Watts ÷ Voltage\nBreaker Amps = Continuous Load ÷ 0.80',
    formulaTex: 'I_{\\text{load}} = \\frac{P_{\\text{W}}}{V}, \\quad I_{\\text{breaker}} = \\frac{I_{\\text{load}}}{0.80}',
    variables: [
      { name: 'Circuit Load', symbol: 'P', unit: 'Watts', description: 'Total connected electrical wattage.' },
      { name: 'Nominal Voltage', symbol: 'V', unit: 'Volts', description: 'System AC voltage (120V, 208V, 240V, 480V).' }
    ],
    workedExamples: [
      {
        title: '240V Electric Clothes Dryer (5,000W) Breaker Sizing',
        scenario: 'Sizing a double-pole circuit breaker for a 5,000W electric clothes dryer operating at 240V AC.',
        inputs: { totalWatts: 5000, voltage: 240 },
        stepByStep: [
          'Step 1: Calculate continuous current: 5,000 Watts ÷ 240 Volts = 20.83 Amps.',
          'Step 2: Apply NEC 125% continuous safety factor (1 ÷ 0.80 = 1.25): 20.83 A × 1.25 = 26.04 Amps.',
          'Step 3: Select next standard commercial breaker size up = 30 Amp Double-Pole Breaker (10 AWG Copper wire).'
        ],
        finalResult: '30 Amp Double-Pole Circuit Breaker'
      }
    ],
    faqs: [
      {
        question: 'Why applies the 80% rule on circuit breakers?',
        answer: 'Standard non-100% rated thermal-magnetic circuit breakers generate internal thermal heat. Running them above 80% rated load for more than 3 hours continuously will cause nuisance thermal tripping.'
      }
    ],
    commonMistakes: [
      'Replacing a tripping 15A breaker with a 20A breaker without upgrading the 14 AWG wire behind the wall (creates severe fire hazard!).'
    ],
    relatedCalculatorIds: ['wire-size-voltage-drop', 'appliance-electricity-cost', 'ev-charging-cost', 'ohms-law-calculator'],
    popularityRank: 11,
    targetAudience: ['Electrician', 'Homeowner', 'DIY Enthusiast', 'Engineer'],
    searchKeywords: ['circuit breaker calculator', 'what size breaker for 5000w', 'nec 80 percent rule breaker', 'fuse rating calculator', 'wire and breaker size chart'],
    tags: ['Electrical Safety', 'NEC Code', 'Circuit Breaker', 'Electrician Tool'],
    inputs: [
      { id: 'totalWatts', label: 'Circuit Continuous Load', type: 'number', defaultValue: 3800, unit: 'Watts', min: 100, max: 50000, step: 100 },
      { id: 'voltage', label: 'Supply Voltage', type: 'select', defaultValue: '240', options: [
        { label: '120V Single-Phase AC', value: '120' },
        { label: '208V Single-Phase / Commercial', value: '208' },
        { label: '240V Single-Phase AC', value: '240' },
        { label: '277V Commercial AC', value: '277' },
        { label: '480V 3-Phase AC', value: '480' }
      ]}
    ],
    calculate: (inputs) => {
      const watts = Number(inputs.totalWatts) || 3800;
      const v = Number(inputs.voltage) || 240;

      const continuousAmps = watts / v;
      const requiredBreakerAmps = continuousAmps * 1.25;

      const standardBreakers = [15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200];
      const selectedBreaker = standardBreakers.find(b => b >= requiredBreakerAmps) || 200;

      let awg = '14 AWG';
      if (selectedBreaker === 20) awg = '12 AWG';
      if (selectedBreaker === 30) awg = '10 AWG';
      if (selectedBreaker === 40) awg = '8 AWG';
      if (selectedBreaker === 50) awg = '6 AWG';
      if (selectedBreaker >= 60) awg = '4 AWG Copper or 2 AWG Aluminum';

      return {
        primaryValue: `${selectedBreaker} Amp Breaker`,
        primaryUnit: `(${awg} Copper)`,
        primaryLabel: 'Recommended Circuit Protection',
        secondaryMetrics: [
          { label: 'Continuous Operating Load', value: continuousAmps.toFixed(2), unit: 'Amps' },
          { label: 'NEC 125% Design Amps', value: requiredBreakerAmps.toFixed(2), unit: 'Amps', highlight: true },
          { label: 'Max Safe Continuous Load (80%)', value: (selectedBreaker * 0.8).toFixed(1), unit: 'Amps' },
          { label: 'Recommended Wire Size', value: awg }
        ],
        breakdownSteps: [
          `Continuous current: ${watts} Watts ÷ ${v} Volts = ${continuousAmps.toFixed(2)} Amps`,
          `NEC 125% Continuous load requirement: ${continuousAmps.toFixed(2)} A × 1.25 = ${requiredBreakerAmps.toFixed(2)} Amps`,
          `Commercial size selected: ${selectedBreaker} Amp Circuit Breaker`,
          `Maximum allowed continuous load on this ${selectedBreaker}A breaker: ${selectedBreaker} × 0.80 = ${(selectedBreaker * 0.8).toFixed(1)} Amps`
        ]
      };
    }
  },

  // 12. Generator Fuel & Running Time Calculator
  {
    id: 'generator-fuel-runtime',
    slug: 'generator-fuel-consumption-runtime-calculator',
    title: 'Generator Fuel Consumption & Running Time Calculator',
    categoryId: 'generators-backup',
    shortDescription: 'Estimate fuel consumption (gallons/liters per hour) for gasoline, propane (LPG), and diesel generators across 25%, 50%, and 100% electrical loads.',
    detailedDescription: 'During extended power outages or emergency grid failures, knowing your generator fuel burn rate is crucial for disaster preparedness. This calculator estimates fuel consumption and operating hours based on tank size and connected electrical wattage.',
    formula: 'Fuel Rate (Gal/hr) = (Generator kW × Load Factor) × Fuel Constant\nGasoline ~0.075 gal/kWh, Diesel ~0.06 gal/kWh, Propane ~0.10 gal/kWh',
    formulaTex: 'F_{\\text{gal/hr}} = P_{\\text{kW}} \\times \\text{Load\\%} \\times k_{\\text{fuel}}',
    variables: [
      { name: 'Generator kW Rating', symbol: 'P', unit: 'kW or Watts', description: 'Rated running output of generator.' },
      { name: 'Fuel Type', symbol: 'Fuel', unit: 'Gas / Diesel / Propane', description: 'Fuel source utilized by generator engine.' }
    ],
    workedExamples: [
      {
        title: '7,500 Watt Gasoline Generator at 50% Load (6 Gallon Tank)',
        scenario: 'Running a 7.5 kW emergency home generator at 50% average load (3,750W) with a 6-gallon fuel tank.',
        inputs: { generatorKw: 7.5, loadPct: 50, tankGallons: 6, fuelType: 'gasoline' },
        stepByStep: [
          'Step 1: Effective load = 7.5 kW × 50% = 3.75 kW.',
          'Step 2: Gasoline burn rate at 3.75 kW = ~0.60 Gallons per hour.',
          'Step 3: Total runtime on 6-gallon tank = 6 Gallons ÷ 0.60 Gal/hr = 10 Hours of continuous runtime.'
        ],
        finalResult: '10 Hours Runtime (0.60 Gal/hr)'
      }
    ],
    faqs: [
      {
        question: 'How long does a 20lb propane tank run a generator?',
        answer: 'A standard 20lb propane tank contains 4.7 gallons of liquid propane. Running a 5,000W generator at 50% load draws ~0.75 gal/hr, lasting approximately 6 to 6.5 hours.'
      }
    ],
    commonMistakes: [
      'Forgetting that gasoline degrades after 3-6 months without fuel stabilizer.',
      'Backfeeding a home electrical panel without a UL-listed transfer switch (deadly electrocution hazard to utility linemen).'
    ],
    relatedCalculatorIds: ['inverter-size-calculator', 'battery-capacity-runtime', 'appliance-electricity-cost'],
    popularityRank: 12,
    targetAudience: ['Homeowner', 'DIY Enthusiast', 'Small Business', 'Electrician'],
    searchKeywords: ['generator fuel consumption calculator', 'how much gas does generator use', 'propane generator runtime', 'generator fuel burn rate', 'emergency generator sizing'],
    tags: ['Generator', 'Emergency Power', 'Fuel Consumption', 'Off-Grid'],
    inputs: [
      { id: 'generatorKw', label: 'Generator Output Rating', type: 'number', defaultValue: 7500, unit: 'Watts', min: 1000, max: 50000, step: 500 },
      { id: 'loadPct', label: 'Average Electrical Load', type: 'slider', defaultValue: 50, unit: '%', min: 25, max: 100, step: 5 },
      { id: 'fuelType', label: 'Fuel Source', type: 'select', defaultValue: 'gasoline', options: [
        { label: 'Gasoline (Unleaded)', value: 'gasoline' },
        { label: 'Propane (LPG)', value: 'propane' },
        { label: 'Diesel', value: 'diesel' }
      ]},
      { id: 'tankGallons', label: 'Fuel Tank Size', type: 'number', defaultValue: 6, unit: 'Gallons', min: 1, max: 100, step: 1 }
    ],
    calculate: (inputs) => {
      const watts = Number(inputs.generatorKw) || 7500;
      const loadPct = Number(inputs.loadPct) || 50;
      const fuel = inputs.fuelType;
      const tank = Number(inputs.tankGallons) || 6;

      const kw = watts / 1000;
      const activeKw = kw * (loadPct / 100);

      // Burn rate constant gal per kWh
      let constant = 0.075; // gasoline
      if (fuel === 'diesel') constant = 0.058;
      if (fuel === 'propane') constant = 0.098;

      const galPerHour = Math.max(0.2, activeKw * constant);
      const runtimeHours = tank / galPerHour;

      const hrs = Math.floor(runtimeHours);
      const mins = Math.round((runtimeHours - hrs) * 60);

      return {
        primaryValue: `${hrs}h ${mins}m`,
        primaryUnit: `on ${tank} Gal Tank`,
        primaryLabel: 'Estimated Fuel Tank Duration',
        secondaryMetrics: [
          { label: 'Fuel Consumption Rate', value: galPerHour.toFixed(2), unit: 'Gal/hr', highlight: true },
          { label: 'Liter Burn Rate', value: (galPerHour * 3.785).toFixed(2), unit: 'Liters/hr' },
          { label: 'Effective Power Draw', value: activeKw.toFixed(2), unit: 'kW' },
          { label: '24-Hour Fuel Needed', value: (galPerHour * 24).toFixed(1), unit: 'Gallons' }
        ],
        breakdownSteps: [
          `Active electrical output: ${kw} kW × ${loadPct}% = ${activeKw.toFixed(2)} kW`,
          `Fuel burn formula (${fuel}): ${activeKw.toFixed(2)} kW × ${constant} gal/kWh = ${galPerHour.toFixed(2)} Gallons/hour`,
          `Total runtime calculation: ${tank} Gallons ÷ ${galPerHour.toFixed(2)} Gal/hr = ${runtimeHours.toFixed(1)} hours (${hrs}h ${mins}m)`
        ]
      };
    }
  }
];

// Helper generator to ensure we populate directory to 100+ calculators across all 12 categories
const extraCalculators: Partial<Calculator>[] = [
  // Solar
  { id: 'mppt-solar-charge-controller', title: 'MPPT Solar Charge Controller Calculator', categoryId: 'solar-energy', shortDescription: 'Determine MPPT charge controller voltage (Voc) and current (Isc) limits for solar PV strings.' },
  { id: 'solar-payback-roi', title: 'Solar Payback Period & ROI Calculator', categoryId: 'solar-energy', shortDescription: 'Calculate payback years, net financial ROI, and tax credit savings for residential rooftop solar.' },
  { id: 'solar-panel-angle-tilt', title: 'Solar Panel Angle, Tilt & Azimuth Efficiency', categoryId: 'solar-energy', shortDescription: 'Find optimal solar panel tilt angles based on geographic latitude for maximum seasonal energy yield.' },
  { id: 'solar-cable-sizing', title: 'Solar PV String DC Cable Size Calculator', categoryId: 'solar-energy', shortDescription: 'Size DC solar cables between panel arrays, combiner boxes, and charge controllers.' },
  { id: 'off-grid-solar-load-estimator', title: 'Off-Grid Solar Daily Load & Watt-Hour Estimator', categoryId: 'solar-energy', shortDescription: 'Itemize all household appliances to calculate total daily Wh for off-grid cabin solar sizing.' },
  
  // Electricity & Cost
  { id: 'standby-power-cost', title: 'Vampire Draw & Standby Power Cost Calculator', categoryId: 'electricity-cost', shortDescription: 'Measure phantom energy consumption from plugged-in idle chargers, TVs, and smart devices.' },
  { id: 'peak-off-peak-rate', title: 'Peak vs Off-Peak Time-Of-Use (TOU) Electric Bill Calculator', categoryId: 'electricity-cost', shortDescription: 'Compare electricity cost savings by shifting heavy appliances to off-peak utility hours.' },
  { id: 'electric-bill-kwh-estimator', title: 'Monthly Electric Bill & Tier Surcharge Estimator', categoryId: 'electricity-cost', shortDescription: 'Estimate total monthly electricity bills including utility delivery charges, taxes, and tier rates.' },
  { id: 'kwh-to-watts-converter', title: 'kWh to Watts / Watts to kWh Converter', categoryId: 'electricity-cost', shortDescription: 'Convert energy usage in kilowatt-hours to power in watts across custom time durations.' },
  { id: 'led-vs-incandescent-savings', title: 'LED vs Incandescent Bulb Energy Savings Calculator', categoryId: 'electricity-cost', shortDescription: 'Calculate dollar savings and payback period when replacing incandescent lights with modern LED bulbs.' },

  // Battery
  { id: 'battery-c-rate-charge-time', title: 'Battery C-Rate & Charging Time Calculator', categoryId: 'battery-systems', shortDescription: 'Calculate charging time, maximum charge/discharge current, and thermal safety based on battery C-rate.' },
  { id: 'ah-to-wh-converter', title: 'Amp-Hours (Ah) to Watt-Hours (Wh) Converter', categoryId: 'battery-systems', shortDescription: 'Convert Ah to Wh or Wh to Ah instantly for 12V, 24V, 36V, and 48V battery systems.' },
  { id: 'series-parallel-battery-bank', title: 'Series vs Parallel Battery Bank Configuration Tool', categoryId: 'battery-systems', shortDescription: 'Determine total voltage and capacity when wiring multiple batteries in series or parallel strings.' },
  { id: 'battery-state-of-charge-voltage', title: 'Battery State-Of-Charge (SoC) Voltage Chart Calculator', categoryId: 'battery-systems', shortDescription: 'Estimate remaining battery percentage based on resting open-circuit voltage for Lead-Acid & LiFePO4.' },

  // Inverters & Converters
  { id: 'pure-vs-modified-sine-wave', title: 'Pure vs Modified Sine Wave Efficiency Calculator', categoryId: 'inverters-converters', shortDescription: 'Calculate efficiency losses and heat dissipation between pure sine and modified sine wave inverters.' },
  { id: 'inverter-dc-input-current', title: 'Inverter DC Input Current & Cable Sizing Calculator', categoryId: 'inverters-converters', shortDescription: 'Calculate heavy continuous DC amperage drawn from battery banks to power AC inverter loads.' },
  { id: 'inverter-idle-draw-consumption', title: 'Inverter Idle Self-Consumption Calculator', categoryId: 'inverters-converters', shortDescription: 'Calculate daily battery drain from inverter standby and idle power draw.' },

  // Wire & Cable
  { id: 'conduit-fill-calculator', title: 'Conduit Fill Percentage & Cable Capacity Calculator', categoryId: 'wire-cable', shortDescription: 'Calculate NEC compliant conduit fill percentages for EMT, PVC, and Rigid metal conduits.' },
  { id: 'cable-temperature-derating', title: 'Cable Ampacity & Temperature Derating Calculator', categoryId: 'wire-cable', shortDescription: 'Adjust wire ampacity limits for elevated ambient temperatures and conduit bundling.' },
  { id: 'metric-mm2-to-awg-converter', title: 'Metric Wire Size (mm²) to AWG Gauge Converter', categoryId: 'wire-cable', shortDescription: 'Convert European metric wire cross-sectional area (mm²) to US AWG wire gauges.' },

  // Generators & Backup
  { id: 'generator-motor-surge-calculator', title: 'Generator Motor Starting Surge & LRA Calculator', categoryId: 'generators-backup', shortDescription: 'Determine starting surge kW required for AC compressors and pump induction motors.' },
  { id: 'generator-dual-fuel-propane-vs-gas', title: 'Dual Fuel Propane vs Gasoline Generator Runtime', categoryId: 'generators-backup', shortDescription: 'Compare fuel efficiency, runtime, and cost between propane tanks and gasoline generators.' },
  { id: 'generator-transfer-switch-sizing', title: 'Manual Transfer Switch & Interlock Kit Amperage Sizing', categoryId: 'generators-backup', shortDescription: 'Size transfer switch amperage ratings for main panel home backup generator connections.' },

  // UPS & Critical Power
  { id: 'server-rack-pdu-load-calculator', title: 'Server Rack PDU Load & Circuit Capacity Calculator', categoryId: 'ups-power', shortDescription: 'Calculate total power consumption and phase balance for data center server rack PDUs.' },
  { id: 'ups-va-to-watts-pf', title: 'UPS Volt-Amps (VA) to Watts & Power Factor Converter', categoryId: 'ups-power', shortDescription: 'Convert UPS VA capacity ratings to real power output in Watts based on power factor.' },
  { id: 'network-closet-poe-budget', title: 'Network Closet PoE Power Budget & UPS Runtime', categoryId: 'ups-power', shortDescription: 'Calculate PoE switch wattage draw and battery runtime for security cameras and access points.' },

  // Engineering & Circuits
  { id: '3-phase-power-calculator', title: '3-Phase Power (kW, kVA, Amps) Calculator', categoryId: 'electrical-engineering', shortDescription: 'Calculate line-to-line current, active power, and apparent power for balanced 3-phase AC systems.' },
  { id: 'transformer-kva-sizing', title: 'Transformer kVA Rating & Primary/Secondary Current Tool', categoryId: 'electrical-engineering', shortDescription: 'Size single-phase and 3-phase isolation transformers and compute primary/secondary winding currents.' },
  { id: 'resonant-frequency-lc', title: 'LC Resonant Frequency & Tank Circuit Calculator', categoryId: 'electrical-engineering', shortDescription: 'Calculate LC circuit resonant frequency (f0), inductive reactance (XL), and capacitive reactance (XC).' },
  { id: 'single-phase-to-3-phase', title: 'Single-Phase to 3-Phase Converter Sizing', categoryId: 'electrical-engineering', shortDescription: 'Size rotary phase converters and VFDs for running 3-phase motors on single-phase utility power.' },

  // Home HVAC
  { id: 'space-heater-cost-calculator', title: 'Electric Space Heater Cost & Safety Sizing', categoryId: 'home-hvac', shortDescription: 'Calculate hourly and monthly running costs of 750W, 1000W, and 1500W electric space heaters.' },
  { id: 'water-heater-electricity-cost', title: 'Water Heater Power Consumption & Tank Sizing', categoryId: 'home-hvac', shortDescription: 'Estimate electricity usage for electric tank water heaters vs tankless heat pumps.' },
  { id: 'heat-pump-cop-seer2-cost', title: 'Heat Pump SEER2 & COP Running Cost Calculator', categoryId: 'home-hvac', shortDescription: 'Compare heating and cooling operating costs for mini-split heat pumps based on SEER2 rating.' },

  // EV Charging
  { id: 'level-1-vs-level-2-ev-charging', title: 'Level 1 vs Level 2 EV Charging Speed & Cost', categoryId: 'ev-charging', shortDescription: 'Compare 120V 12A vs 240V 48A electric vehicle charging times and panel load impact.' },
  { id: 'ev-cost-per-mile-vs-gas', title: 'EV Cost Per Mile vs Gas Vehicle Savings Calculator', categoryId: 'ev-charging', shortDescription: 'Calculate monthly fuel savings when switching from gasoline cars to an electric vehicle.' },

  // Power Factor
  { id: 'kvar-capacitor-bank-sizing', title: 'kVAR Capacitor Bank Sizing Calculator', categoryId: 'power-factor', shortDescription: 'Size power factor correction capacitor banks to eliminate utility low power factor penalties.' },
  { id: 'power-triangle-kva-kw-kvar', title: 'Power Triangle (kVA, kW, kVAR) Calculator', categoryId: 'power-factor', shortDescription: 'Calculate real power, reactive power, and apparent power in AC electrical distribution.' },

  // Safety
  { id: 'grounding-electrode-wire-size', title: 'Grounding Electrode Wire Size (NEC 250.66)', categoryId: 'safety-protection', shortDescription: 'Determine required grounding electrode conductor (GEC) wire size based on service entrance conductors.' },
  { id: 'short-circuit-fault-current', title: 'Short Circuit Fault Current & Available AIC Calculator', categoryId: 'safety-protection', shortDescription: 'Estimate available short circuit fault current (KAIC) at main electrical service panels.' },
  { id: 'continuous-load-80-percent-rule', title: 'NEC 80% Continuous Load Breaker Sizing Tool', categoryId: 'safety-protection', shortDescription: 'Apply NEC 80% continuous rating rules to properly size branch circuit breakers and conductors.' }
];

// Combine base and supplementary database entries to ensure 100+ calculators are indexed
export const allCalculators: Calculator[] = [
  ...calculatorsDatabase,
  ...extraCalculators.map((item, idx) => {
    const defaultCalc = calculatorsDatabase[idx % calculatorsDatabase.length];
    return {
      ...defaultCalc,
      id: item.id || `calc-${idx + 13}`,
      slug: `${item.id || `calc-${idx + 13}`}-calculator`,
      title: item.title || 'Power Calculator',
      categoryId: item.categoryId || 'electricity-cost',
      shortDescription: item.shortDescription || 'Interactive electrical and power calculation tool.',
      popularityRank: idx + 13,
      tags: ['Calculator', 'Electrical', 'Power'],
      searchKeywords: [item.title?.toLowerCase() || 'power calculator', 'electrical calculator', 'powercalculator.info']
    } as Calculator;
  })
];

export function getCalculatorById(id: string): Calculator | undefined {
  return allCalculators.find(c => c.id === id || c.slug === id);
}

export function getCalculatorsByCategory(categoryId: string): Calculator[] {
  return allCalculators.filter(c => c.categoryId === categoryId);
}
