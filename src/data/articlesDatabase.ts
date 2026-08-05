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
  },

  {
    id: 'myths-power-battery-solar',
    slug: '10-common-myths-about-power-battery-solar-energy',
    title: '10 Common Myths About Power, Batteries & Solar Energy Debunked',
    summary: 'Uncover the truth behind viral electricity misconceptions, solar panel winter performance, battery lifetime hacks, phantom loads, and off-grid power realities.',
    category: 'Energy Myths & Facts',
    readTimeMinutes: 7,
    publishDate: '2026-08-04',
    author: 'PowerCalculator Science & Engineering Team',
    linkedCalculatorIds: ['battery-capacity-runtime', 'solar-panel-sizing', 'standby-power-cost', 'appliance-electricity-cost'],
    tags: ['Power Myths', 'Battery Care', 'Solar Misconceptions', 'Energy Efficiency', 'Phantom Load'],
    content: [
      {
        type: 'paragraph',
        text: 'Electrical engineering and clean energy technology are surrounded by urban legends, outdated rules of thumb, and viral Internet myths. Believing these misconceptions can lead to wasted money, damaged equipment, or undersized solar and battery systems. Here are 10 of the most common power, battery, and solar myths thoroughly debunked with real physics.'
      },
      {
        type: 'heading2',
        text: 'Myth 1: Leaving Devices Plugged In at 100% Will Overcharge Modern Batteries'
      },
      {
        type: 'paragraph',
        text: 'False. Modern smartphones, laptops, and battery power stations use intelligent Battery Management Systems (BMS). When a Lithium-ion or LiFePO4 battery reaches 100%, the internal charging circuit automatically halts incoming current and operates off wall power directly.'
      },
      {
        type: 'callout',
        calloutType: 'info',
        text: 'Note: While batteries will not overcharge or explode, keeping Lithium-ion batteries at 100% continuous state-of-charge under high ambient temperatures can accelerate chemical degradation over years.'
      },
      {
        type: 'heading2',
        text: 'Myth 2: Solar Panels Do Not Produce Electricity in Cold Winter Weather'
      },
      {
        type: 'paragraph',
        text: 'False. Solar photovoltaic (PV) panels actually operate MORE efficiently in cold temperatures than in scorching summer heat! Photovoltaic cells convert light (photons), not heat, into electricity. Cold ambient temperatures lower silicon semiconductor resistance, resulting in higher voltage output.'
      },
      {
        type: 'heading2',
        text: 'Myth 3: Leaving Ceiling Fans Turned On Cools Down Empty Rooms'
      },
      {
        type: 'paragraph',
        text: 'False. Ceiling fans cool people by creating a wind-chill effect that speeds up moisture evaporation on human skin. They do not lower the actual ambient temperature of the room. Running a fan in an empty room wastes electricity and adds a small amount of heat from the electric motor.'
      },
      {
        type: 'heading2',
        text: 'Myth 4: Solar Panels Store Energy Directly Inside the Glass PV Modules'
      },
      {
        type: 'paragraph',
        text: 'False. Solar panels are real-time electricity generators with no internal storage capacity. When photons strike the PV cells, electrons flow immediately. To store this energy for nighttime use, power must be routed to external battery banks (such as LiFePO4 or Lead-Acid batteries).'
      },
      {
        type: 'heading2',
        text: 'Myth 5: Turning Off Appliances Eliminates 100% of Their Electricity Usage'
      },
      {
        type: 'paragraph',
        text: 'False. Many household electronics enter "standby mode" rather than turning completely off. Known as phantom load or vampire power, standby power drawn by smart TVs, microwave clocks, cable boxes, and charger bricks accounts for 5% to 10% of total residential power bills.'
      },
      {
        type: 'formula',
        text: 'Standby Cost ($/Year) = Standby Watts × 8,760 Hours ÷ 1,000 × Electricity Rate ($/kWh)'
      },
      {
        type: 'heading2',
        text: 'Myth 6: A 100-Watt Solar Panel Always Delivers 100 Watts of Real Power'
      },
      {
        type: 'paragraph',
        text: 'False. Solar panel ratings are measured under Standard Test Conditions (STC) in lab settings (1,000 W/m² irradiance, 25°C cell temperature). Real-world factors such as sun angle, dust, atmospheric haze, and inverter conversion losses usually yield 75% to 85% of rated wattage.'
      },
      {
        type: 'heading2',
        text: 'Myth 7: High-Speed Supercharging Damages Batteries Instantly'
      },
      {
        type: 'paragraph',
        text: 'False. Ultra-fast charging algorithms dynamically throttle power based on internal cell temperature and state of charge (SOC). Fast charging increases thermal stress slightly, but modern thermal management liquid cooling prevents instant damage.'
      },
      {
        type: 'heading2',
        text: 'Myth 8: Portable Generators Only Burn Fuel When Appliances Are Connected'
      },
      {
        type: 'paragraph',
        text: 'False. Internal combustion gasoline and diesel generators must maintain a constant engine speed (typically 3,600 RPM for 60Hz AC) regardless of load. An idling generator still consumes roughly 40% to 50% of its full-load fuel baseline.'
      },
      {
        type: 'heading2',
        text: 'Myth 9: Thicker Wire Gauges Waste Electrical Power'
      },
      {
        type: 'paragraph',
        text: 'False. In American Wire Gauge (AWG), smaller numbers represent THICKER copper conductors. Thicker wires have lower electrical resistance, which minimizes voltage drop and reduces power wasted as heat loss.'
      },
      {
        type: 'heading2',
        text: 'Myth 10: Grid-Tied Solar Automatically Runs During Power Blackouts'
      },
      {
        type: 'paragraph',
        text: 'False. Standard grid-tied solar inverters feature anti-islanding protection that shuts down the solar array immediately when utility power drops. This prevents feeding high voltage back into power lines, protecting utility repair workers. Off-grid backup during blackouts requires a hybrid inverter with battery storage or a manual transfer switch.'
      }
    ]
  },

  {
    id: 'amazing-facts-electricity-solar-battery',
    slug: '20-amazing-facts-about-electricity-solar-battery-science',
    title: '20 Amazing Facts About Electricity, Solar Energy & Battery Science',
    summary: 'Mind-blowing facts about lightning voltage, how solar photons travel from the core of the Sun, the world’s largest grid battery, and electric eel bio-voltage.',
    category: 'Energy Myths & Facts',
    readTimeMinutes: 8,
    publishDate: '2026-08-04',
    author: 'PowerCalculator Science & Engineering Team',
    linkedCalculatorIds: ['solar-panel-sizing', 'battery-capacity-runtime', 'unit-converter-power-energy', 'generator-fuel-runtime'],
    tags: ['Energy Facts', 'Physics Trivia', 'Solar Science', 'Battery Tech', 'Electrical History'],
    content: [
      {
        type: 'paragraph',
        text: 'Electricity and energy storage are the invisible forces powering modern human civilization. From subatomic quantum mechanics to planetary-scale power grids, here are 20 astonishing scientific facts about electricity, solar radiation, and battery technology.'
      },
      {
        type: 'heading2',
        text: 'Solar & Cosmic Energy Wonders'
      },
      {
        type: 'list',
        items: [
          'Photons Take 100,000 Years to Escape the Sun\'s Core: Created by nuclear fusion deep in the solar core, light particles bounce randomly for tens of thousands of years before reaching the surface. Once free, they sprint to Earth in just 8 minutes and 20 seconds!',
          'Earth Receives 173,000 Terawatts of Solar Power Continuously: More solar energy strikes the Earth in a single hour than the entire human population consumes in a full year.',
          'The Sahara Solar Paradox: Covering less than 1.2% of the Sahara Desert with photovoltaic panels would generate enough electricity to power the entire globe.',
          'Space-Based Solar Satellites Orbit 24/7: Satellites in geostationary orbit receive up to 8 times more continuous solar irradiance than ground-based panels because there is no atmosphere, weather, or night.',
          'Solar Cell Efficiency Jumped from 6% to 33%+: Early silicon cells used on the Vanguard 1 satellite in 1958 converted under 6% of light. Modern multi-junction perovskite laboratory cells exceed 33% efficiency.'
        ]
      },
      {
        type: 'heading2',
        text: 'Mind-Blowing Electrical Physics'
      },
      {
        type: 'list',
        items: [
          'A Single Lightning Bolt Reaches 300 Million Volts: A typical flash carries 30,000 Amps of current and reaches temperatures of 50,000°F (30,000°K)—five times hotter than the surface of the sun.',
          'Electrons Move Slower Than a Snail Inside Wires: While electrical electromagnetic waves travel near the speed of light (~90% c), individual electron drift velocity inside copper wire is under 1 millimeter per second!',
          'Electric Eels Produce Up to 860 Volts: Specialized biological electrocyte cells act like thousands of series-connected battery cells, discharging lethal voltage pulses to hunt prey.',
          'The Power Grid Operates with ZERO Storage: In traditional electrical grids, electricity must be produced at the exact millisecond it is consumed by household light switches or factory motors.',
          'Birds Don\'t Get Shocked on Power Lines: Because both feet of a bird rest on a single wire at identical electrical potential, there is no voltage difference across their body, so no current flows.'
        ]
      },
      {
        type: 'heading2',
        text: 'Battery & Storage Marvels'
      },
      {
        type: 'list',
        items: [
          'The Baghdad Battery Is 2,000 Years Old: Terracotta clay jars containing copper cylinders and iron rods discovered in Iraq date back to 250 BC, likely used for ancient electroplating.',
          'Pumped Hydro Stores 90% of Global Grid Energy: Water is pumped uphill to reservoirs when grid power is cheap and released downhill through hydro turbines during peak demand hours.',
          'Solid-State Batteries Eliminate Liquid Fire Risks: Replacing flammable liquid electrolytes with solid ceramic or polymer layers allows double the energy density (Wh/kg) and near-instant charging.',
          'Tesla Megapacks Can Power Entire Cities: Grid-scale utility batteries respond to power grid dropouts in under 100 milliseconds, preventing blackouts across regional grids.',
          'Gravity Batteries Store Energy with Concrete Weights: Mechanical energy storage systems drop multi-ton concrete blocks down abandoned mine shafts to drive power generators cleanly.'
        ]
      },
      {
        type: 'heading2',
        text: 'Everyday Technology & Efficiency Facts'
      },
      {
        type: 'list',
        items: [
          'A Single Google Search Consumes ~0.3 Watt-Hours: Processing your query across data centers consumes enough energy to illuminate a 60W LED bulb for 17 seconds.',
          'Microwaves Cook Food via 2.45 GHz Radio Frequency Standing Waves: Microwave ovens excite water molecules in food, generating heat through molecular friction.',
          'Offshore Wind Turbine Blades Can Exceed 350 Feet: A single sweep of a 15-Megawatt offshore turbine blade covers an area equivalent to 7 football fields.',
          'LED Bulbs Save 85% More Energy Than Incandescent Filaments: Traditional Edison bulbs converted 90% of electrical energy into wasted heat and only 10% into light.',
          'Recycling Aluminum Saves 95% of Production Energy: Refining raw bauxite ore into aluminum requires immense electrolysis power, whereas melting recycled cans takes a fraction of the energy.'
        ]
      }
    ]
  }
];
