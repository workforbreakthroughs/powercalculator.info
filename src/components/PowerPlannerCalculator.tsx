import React, { useState, useMemo } from 'react';
import { UserPreferences } from '../types';
import {
  Zap,
  Plus,
  Trash2,
  RefreshCw,
  Sun,
  BatteryCharging,
  Cpu,
  Flame,
  DollarSign,
  TrendingDown,
  Info,
  Check,
  Copy,
  Printer,
  Sparkles,
  Sliders,
  ChevronRight,
  ShieldAlert,
  Download
} from 'lucide-react';

export interface ApplianceItem {
  id: string;
  name: string;
  quantity: number;
  hoursPerDay: number;
  watts: number;
  category?: string;
  surgeMultiplier?: number; // e.g. 2x or 3x for motors/compressors
}

interface PowerPlannerCalculatorProps {
  userPrefs: UserPreferences;
  onOpenRateModal?: () => void;
}

const DEFAULT_APPLIANCES: ApplianceItem[] = [
  { id: '1', name: 'Air Conditioner (1.5 HP Inverter)', quantity: 2, hoursPerDay: 8, watts: 900, surgeMultiplier: 2.5 },
  { id: '2', name: 'Refrigerator / Freezer (18 cu ft)', quantity: 1, hoursPerDay: 24, watts: 150, surgeMultiplier: 3.0 },
  { id: '3', name: 'Smart LED TV (55 inch)', quantity: 2, hoursPerDay: 5, watts: 120, surgeMultiplier: 1.0 },
  { id: '4', name: 'Rice Cooker (Digital / Warm)', quantity: 1, hoursPerDay: 1, watts: 700, surgeMultiplier: 1.2 },
];

const PRESET_APPLIANCES = [
  { name: 'Air Conditioner', watts: 900, hours: 8, surge: 2.5 },
  { name: 'Refrigerator', watts: 150, hours: 24, surge: 3.0 },
  { name: 'Smart TV', watts: 120, hours: 5, surge: 1.0 },
  { name: 'Rice Cooker', watts: 700, hours: 1, surge: 1.2 },
  { name: 'Microwave Oven', watts: 1200, hours: 0.5, surge: 1.5 },
  { name: 'LED Bulbs (5x set)', watts: 50, hours: 8, surge: 1.0 },
  { name: 'Ceiling Fan', watts: 75, hours: 10, surge: 1.5 },
  { name: 'Gaming Desktop PC', watts: 450, hours: 6, surge: 1.1 },
  { name: 'Laptop Computer', watts: 65, hours: 8, surge: 1.0 },
  { name: 'Wi-Fi Router & Modem', watts: 15, hours: 24, surge: 1.0 },
  { name: 'Washing Machine', watts: 500, hours: 1, surge: 2.5 },
  { name: 'Electric Kettle', watts: 1500, hours: 0.3, surge: 1.0 },
  { name: 'Water Pump (0.75 HP)', watts: 750, hours: 2, surge: 3.5 },
];

const PRESET_TEMPLATES = [
  {
    name: 'Sample Default Plan',
    desc: 'AC, Fridge, 2x TV, Rice Cooker',
    items: DEFAULT_APPLIANCES
  },
  {
    name: 'Off-Grid Cabin',
    desc: 'Fridge, LED Bulbs, Laptop, Ceiling Fan, Wi-Fi',
    items: [
      { id: 'p1', name: 'Refrigerator', quantity: 1, hoursPerDay: 24, watts: 120, surgeMultiplier: 3.0 },
      { id: 'p2', name: 'LED Bulbs (Set of 6)', quantity: 1, hoursPerDay: 6, watts: 60, surgeMultiplier: 1.0 },
      { id: 'p3', name: 'Laptop Computer', quantity: 2, hoursPerDay: 8, watts: 65, surgeMultiplier: 1.0 },
      { id: 'p4', name: 'Ceiling Fan', quantity: 2, hoursPerDay: 10, watts: 70, surgeMultiplier: 1.5 },
      { id: 'p5', name: 'Wi-Fi Router', quantity: 1, hoursPerDay: 24, watts: 15, surgeMultiplier: 1.0 },
      { id: 'p6', name: 'Water Pressure Pump', quantity: 1, hoursPerDay: 1.5, watts: 600, surgeMultiplier: 3.0 },
    ]
  },
  {
    name: 'High-Demand Household',
    desc: '3x AC, 2x Fridge, Microwave, PC, Washer, TV',
    items: [
      { id: 'h1', name: 'Master AC (1.5 HP)', quantity: 1, hoursPerDay: 10, watts: 1100, surgeMultiplier: 2.5 },
      { id: 'h2', name: 'Bedroom ACs (1.0 HP)', quantity: 2, hoursPerDay: 8, watts: 800, surgeMultiplier: 2.5 },
      { id: 'h3', name: 'Kitchen Refrigerator', quantity: 1, hoursPerDay: 24, watts: 180, surgeMultiplier: 3.0 },
      { id: 'h4', name: 'Deep Chest Freezer', quantity: 1, hoursPerDay: 24, watts: 120, surgeMultiplier: 3.0 },
      { id: 'h5', name: 'Smart TVs', quantity: 3, hoursPerDay: 5, watts: 130, surgeMultiplier: 1.0 },
      { id: 'h6', name: 'Microwave Oven', quantity: 1, hoursPerDay: 0.5, watts: 1200, surgeMultiplier: 1.5 },
      { id: 'h7', name: 'Washing Machine', quantity: 1, hoursPerDay: 1, watts: 550, surgeMultiplier: 2.5 },
      { id: 'h8', name: 'Gaming Desktop PC', quantity: 1, hoursPerDay: 6, watts: 500, surgeMultiplier: 1.1 },
    ]
  },
  {
    name: 'Emergency Backup Essentials',
    desc: 'Fridge, Wi-Fi, Lights, Phone Chargers, Fan',
    items: [
      { id: 'e1', name: 'Essential Refrigerator', quantity: 1, hoursPerDay: 24, watts: 150, surgeMultiplier: 3.0 },
      { id: 'e2', name: 'Emergency LED Bulbs', quantity: 1, hoursPerDay: 8, watts: 40, surgeMultiplier: 1.0 },
      { id: 'e3', name: 'Wi-Fi Router & Modem', quantity: 1, hoursPerDay: 24, watts: 15, surgeMultiplier: 1.0 },
      { id: 'e4', name: 'Smartphone Chargers', quantity: 4, hoursPerDay: 3, watts: 20, surgeMultiplier: 1.0 },
      { id: 'e5', name: 'Standing Air Fan', quantity: 2, hoursPerDay: 12, watts: 60, surgeMultiplier: 1.5 },
    ]
  }
];

export const PowerPlannerCalculator: React.FC<PowerPlannerCalculatorProps> = ({
  userPrefs,
  onOpenRateModal,
}) => {
  const [appliances, setAppliances] = useState<ApplianceItem[]>(DEFAULT_APPLIANCES);
  
  // Custom Parameters
  const [electricityRate, setElectricityRate] = useState<number>(userPrefs.electricityRate || 0.16);
  const [peakSunHours, setPeakSunHours] = useState<number>(4.5);
  const [systemVoltage, setSystemVoltage] = useState<number>(48); // 12V, 24V, or 48V
  const [autonomyDays, setAutonomyDays] = useState<number>(1);
  const [batteryType, setBatteryType] = useState<'lifepo4' | 'lead-acid'>('lifepo4');
  const [solarCostPerWatt, setSolarCostPerWatt] = useState<number>(2.20); // $ / Watt installed system cost

  const [copiedSummary, setCopiedSummary] = useState(false);

  // Synchronize when user preferences update rate
  React.useEffect(() => {
    if (userPrefs.electricityRate) {
      setElectricityRate(userPrefs.electricityRate);
    }
  }, [userPrefs.electricityRate]);

  // Handlers for Appliance Table
  const handleUpdateAppliance = (id: string, field: keyof ApplianceItem, value: any) => {
    setAppliances((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleRemoveAppliance = (id: string) => {
    setAppliances((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddCustomAppliance = () => {
    const newItem: ApplianceItem = {
      id: Date.now().toString(),
      name: 'Custom Appliance',
      quantity: 1,
      hoursPerDay: 4,
      watts: 200,
      surgeMultiplier: 1.5
    };
    setAppliances((prev) => [...prev, newItem]);
  };

  const handleAddPreset = (preset: typeof PRESET_APPLIANCES[0]) => {
    const newItem: ApplianceItem = {
      id: Date.now().toString(),
      name: preset.name,
      quantity: 1,
      hoursPerDay: preset.hours,
      watts: preset.watts,
      surgeMultiplier: preset.surge
    };
    setAppliances((prev) => [...prev, newItem]);
  };

  const handleLoadTemplate = (templateItems: ApplianceItem[]) => {
    setAppliances(templateItems.map((item, idx) => ({ ...item, id: `tpl-${idx}-${Date.now()}` })));
  };

  // Calculations
  const metrics = useMemo(() => {
    let totalContinuousWatts = 0;
    let totalPeakSurgeWatts = 0;
    let totalDailyWh = 0;

    const breakdown = appliances.map((item) => {
      const itemWatts = item.watts * item.quantity;
      const surgeWatts = itemWatts * (item.surgeMultiplier || 1.5);
      const dailyWh = itemWatts * item.hoursPerDay;

      totalContinuousWatts += itemWatts;
      totalPeakSurgeWatts += surgeWatts;
      totalDailyWh += dailyWh;

      return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        hoursPerDay: item.hoursPerDay,
        watts: item.watts,
        totalWatts: itemWatts,
        dailyKwh: dailyWh / 1000,
      };
    });

    const dailyKwh = totalDailyWh / 1000;
    const monthlyKwh = dailyKwh * 30;
    const annualKwh = dailyKwh * 365;

    const currency = userPrefs.currencySymbol || '$';
    const dailyBill = dailyKwh * electricityRate;
    const monthlyBill = monthlyKwh * electricityRate;
    const annualBill = annualKwh * electricityRate;

    // Required Generator Size (kW / kVA)
    // Continuous load + surge head room, plus 25% safety margin
    const recommendedGeneratorWatts = Math.max(totalContinuousWatts * 1.25, totalPeakSurgeWatts * 0.85);
    const generatorKva = (recommendedGeneratorWatts / 1000 / 0.8); // pf = 0.8

    // Recommended Inverter
    // Needs to handle continuous running load (1.25x) and handle total peak surge
    const continuousInverterWatts = Math.ceil((totalContinuousWatts * 1.25) / 100) * 100;
    const surgeInverterWatts = Math.ceil(totalPeakSurgeWatts / 100) * 100;

    // Solar Array Sizing
    // Derating factor for solar loss (inverter, wiring, dust) = 0.80
    const solarSystemEfficiency = 0.80;
    const requiredSolarArrayWatts = Math.ceil(((dailyKwh * 1000) / (peakSunHours * solarSystemEfficiency)) / 50) * 50;

    // Battery Bank Sizing
    // DoD: LiFePO4 = 80% (0.80), Lead-Acid = 50% (0.50)
    const dodFactor = batteryType === 'lifepo4' ? 0.80 : 0.50;
    const batteryInverterEfficiency = 0.90;
    const requiredBatteryEnergyWh = (totalDailyWh * autonomyDays) / (dodFactor * batteryInverterEfficiency);
    const requiredBatteryKwh = requiredBatteryEnergyWh / 1000;
    const requiredBatteryAh = Math.ceil(requiredBatteryEnergyWh / systemVoltage);

    // Payback Period Estimation
    // Estimated solar system cost = Solar Array Cost + Battery Cost ($300/kWh LiFePO4, $180/kWh Lead) + Inverter Cost ($0.35/W)
    const batteryCostPerKwh = batteryType === 'lifepo4' ? 320 : 180;
    const estimatedSolarCost = requiredSolarArrayWatts * solarCostPerWatt;
    const estimatedBatteryCost = requiredBatteryKwh * batteryCostPerKwh;
    const estimatedInverterCost = continuousInverterWatts * 0.35 + 300;
    const totalOffGridSystemCost = estimatedSolarCost + estimatedBatteryCost + estimatedInverterCost;

    const paybackYears = annualBill > 0 ? (totalOffGridSystemCost / annualBill) : 0;

    return {
      dailyKwh,
      monthlyKwh,
      annualKwh,
      dailyBill,
      monthlyBill,
      annualBill,
      totalContinuousWatts,
      totalPeakSurgeWatts,
      recommendedGeneratorWatts,
      generatorKva,
      continuousInverterWatts,
      surgeInverterWatts,
      requiredSolarArrayWatts,
      requiredBatteryKwh,
      requiredBatteryAh,
      totalOffGridSystemCost,
      paybackYears,
      breakdown,
      currency
    };
  }, [appliances, electricityRate, peakSunHours, systemVoltage, autonomyDays, batteryType, solarCostPerWatt, userPrefs.currencySymbol]);

  // Copy Summary Handler
  const handleCopySummary = () => {
    const text = `
⚡ POWER PLANNER ENERGY REPORT
----------------------------------
Appliances: ${appliances.length} item types
Daily Energy Consumption: ${metrics.dailyKwh.toFixed(2)} kWh / day
Monthly Energy Consumption: ${metrics.monthlyKwh.toFixed(1)} kWh / month
Estimated Monthly Utility Bill: ${metrics.currency}${metrics.monthlyBill.toFixed(2)} / month

OFF-GRID & BACKUP POWER SYSTEM RECOMMENDATIONS:
• Continuous Running Load: ${(metrics.totalContinuousWatts / 1000).toFixed(2)} kW (${metrics.totalContinuousWatts} W)
• Peak Starting Surge Load: ${(metrics.totalPeakSurgeWatts / 1000).toFixed(2)} kW (${metrics.totalPeakSurgeWatts} W)
• Recommended Generator Size: ${metrics.generatorKva.toFixed(1)} kVA (${(metrics.recommendedGeneratorWatts / 1000).toFixed(1)} kW)
• Recommended Inverter: ${metrics.continuousInverterWatts}W Continuous (${metrics.surgeInverterWatts}W Surge)
• Required Solar Array Size: ${(metrics.requiredSolarArrayWatts / 1000).toFixed(2)} kW (${metrics.requiredSolarArrayWatts} Watts)
• Recommended Battery Bank: ${metrics.requiredBatteryKwh.toFixed(1)} kWh (${metrics.requiredBatteryAh} Ah @ ${systemVoltage}V ${batteryType.toUpperCase()})
• Estimated Off-Grid Solar System Cost: ${metrics.currency}${metrics.totalOffGridSystemCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
• Estimated Solar Payback Period: ${metrics.paybackYears.toFixed(1)} Years
----------------------------------
Calculated with PowerPlanner Tool
`;
    navigator.clipboard?.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Tool Header Card */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wide uppercase backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Interactive Power & Load Planner</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Whole-House Appliance Power Planner
          </h1>
          <p className="text-amber-100 text-sm sm:text-base max-w-2xl leading-relaxed">
            Build your list of home appliances to calculate total daily energy usage, monthly electric bill, solar panel array, battery bank size, generator rating, and solar ROI payback period.
          </p>

          {/* Quick Preset Template Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider mr-1">
              Load Template:
            </span>
            {PRESET_TEMPLATES.map((tpl, i) => (
              <button
                key={i}
                onClick={() => handleLoadTemplate(tpl.items)}
                className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 active:bg-white/30 text-white text-xs font-semibold transition border border-white/20 backdrop-blur-sm cursor-pointer"
                title={tpl.desc}
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Appliance List Builder & Settings */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Appliance Builder (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-500" />
                  <span>Your Appliance Load List</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Add or adjust appliances, quantities, operating hours, and wattage draw.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddCustomAppliance}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Appliance</span>
                </button>
                <button
                  onClick={() => setAppliances(DEFAULT_APPLIANCES)}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer"
                  title="Reset to default"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Add Preset Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Quick Add Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_APPLIANCES.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddPreset(p)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 text-slate-700 hover:text-amber-900 text-xs rounded-lg transition font-medium cursor-pointer"
                  >
                    + {p.name} ({p.watts}W)
                  </button>
                ))}
              </div>
            </div>

            {/* Appliance List Table / Cards */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <th className="p-3">Appliance Name</th>
                    <th className="p-3 w-20 text-center">Qty</th>
                    <th className="p-3 w-28 text-center">Hours / Day</th>
                    <th className="p-3 w-28 text-center">Watts (W)</th>
                    <th className="p-3 w-28 text-right">Daily kWh</th>
                    <th className="p-3 w-10 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appliances.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 italic">
                        No appliances added yet. Click "+ Add Appliance" or pick a preset above!
                      </td>
                    </tr>
                  ) : (
                    appliances.map((item) => {
                      const dailyKwh = ((item.watts * item.quantity * item.hoursPerDay) / 1000).toFixed(2);
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition group">
                          {/* Name Input */}
                          <td className="p-2.5">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleUpdateAppliance(item.id, 'name', e.target.value)}
                              className="w-full bg-white border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 text-xs sm:text-sm"
                              placeholder="Appliance name"
                            />
                          </td>

                          {/* Qty Input */}
                          <td className="p-2.5">
                            <input
                              type="number"
                              min={1}
                              max={99}
                              value={item.quantity}
                              onChange={(e) => handleUpdateAppliance(item.id, 'quantity', Math.max(1, Number(e.target.value) || 1))}
                              className="w-16 mx-auto text-center bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-1.5 py-1.5 font-bold text-slate-900 text-xs sm:text-sm"
                            />
                          </td>

                          {/* Hours Input */}
                          <td className="p-2.5">
                            <input
                              type="number"
                              step={0.5}
                              min={0.1}
                              max={24}
                              value={item.hoursPerDay}
                              onChange={(e) => handleUpdateAppliance(item.id, 'hoursPerDay', Math.min(24, Math.max(0.1, Number(e.target.value) || 0.1)))}
                              className="w-20 mx-auto text-center bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-1.5 py-1.5 font-bold text-slate-900 text-xs sm:text-sm"
                            />
                          </td>

                          {/* Watts Input */}
                          <td className="p-2.5">
                            <input
                              type="number"
                              step={5}
                              min={1}
                              max={20000}
                              value={item.watts}
                              onChange={(e) => handleUpdateAppliance(item.id, 'watts', Math.max(1, Number(e.target.value) || 1))}
                              className="w-22 mx-auto text-center bg-white border border-slate-200 focus:border-amber-500 rounded-lg px-1.5 py-1.5 font-bold text-amber-700 text-xs sm:text-sm"
                            />
                          </td>

                          {/* Daily kWh output */}
                          <td className="p-2.5 text-right font-bold text-slate-900 whitespace-nowrap">
                            {dailyKwh} <span className="text-[10px] font-normal text-slate-400">kWh</span>
                          </td>

                          {/* Delete Button */}
                          <td className="p-2.5 text-center">
                            <button
                              onClick={() => handleRemoveAppliance(item.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Total Load Summary Bar */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block">
                  Total Running Load
                </span>
                <span className="text-xl font-black text-amber-400">
                  {metrics.totalContinuousWatts.toLocaleString()} <span className="text-xs font-normal text-slate-300">Watts ({ (metrics.totalContinuousWatts / 1000).toFixed(2) } kW)</span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block">
                  Daily Energy Consumption
                </span>
                <span className="text-xl font-black text-white">
                  {metrics.dailyKwh.toFixed(2)} <span className="text-xs font-normal text-slate-300">kWh / day</span>
                </span>
              </div>

              <div>
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block">
                  Est. Monthly Bill ({metrics.currency})
                </span>
                <span className="text-xl font-black text-emerald-400">
                  {metrics.currency}{metrics.monthlyBill.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Energy Usage Share Breakdown Chart */}
          {metrics.breakdown.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Energy Share Breakdown by Appliance</span>
              </h3>
              <p className="text-xs text-slate-500">
                Visualizing which devices consume the largest share of your daily electricity.
              </p>

              <div className="space-y-3">
                {metrics.breakdown
                  .sort((a, b) => b.dailyKwh - a.dailyKwh)
                  .map((item, idx) => {
                    const percent = metrics.dailyKwh > 0 ? (item.dailyKwh / metrics.dailyKwh) * 100 : 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-800">
                            {item.quantity}x {item.name} ({item.totalWatts}W)
                          </span>
                          <span className="text-slate-600 font-mono">
                            {item.dailyKwh.toFixed(2)} kWh/day ({percent.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, Math.max(2, percent))}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Parameters & Off-Grid Solar / Generator Results (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Settings & Parameters Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-lg border border-slate-800">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
              <span>System Assumptions</span>
              {onOpenRateModal && (
                <button
                  onClick={onOpenRateModal}
                  className="text-[11px] underline text-slate-300 hover:text-white cursor-pointer"
                >
                  Edit Rate
                </button>
              )}
            </h3>

            <div className="space-y-3 text-xs">
              {/* Electricity Rate */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Electricity Rate ({metrics.currency}/kWh):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.01}
                    min={0.01}
                    max={2.00}
                    value={electricityRate}
                    onChange={(e) => setElectricityRate(Math.max(0.01, Number(e.target.value) || 0.16))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Peak Sun Hours */}
              <div>
                <label className="block text-slate-300 font-medium mb-1 flex justify-between">
                  <span>Peak Sun Hours (hrs/day):</span>
                  <span className="text-amber-400 font-bold">{peakSunHours} hrs</span>
                </label>
                <input
                  type="range"
                  min={2}
                  max={7}
                  step={0.25}
                  value={peakSunHours}
                  onChange={(e) => setPeakSunHours(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Average US/Global range: 3.5 - 5.5 hours/day</span>
              </div>

              {/* Battery Voltage */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Battery System Voltage:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[12, 24, 48].map((v) => (
                    <button
                      key={v}
                      onClick={() => setSystemVoltage(v)}
                      className={`py-1.5 rounded-lg font-bold border transition text-center cursor-pointer ${
                        systemVoltage === v
                          ? 'bg-amber-500 border-amber-400 text-slate-950'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {v}V
                    </button>
                  ))}
                </div>
              </div>

              {/* Days of Autonomy */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Days of Autonomy (Backup Days):
                </label>
                <select
                  value={autonomyDays}
                  onChange={(e) => setAutonomyDays(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:border-amber-400 focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Day Backup (Standard)</option>
                  <option value={2}>2 Days Backup (Cloudy Days)</option>
                  <option value={3}>3 Days Backup (Off-Grid Storm Protection)</option>
                </select>
              </div>

              {/* Battery Chemistry */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Battery Chemistry:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setBatteryType('lifepo4')}
                    className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] border transition text-center cursor-pointer ${
                      batteryType === 'lifepo4'
                        ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    LiFePO4 (80% DoD)
                  </button>
                  <button
                    onClick={() => setBatteryType('lead-acid')}
                    className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] border transition text-center cursor-pointer ${
                      batteryType === 'lead-acid'
                        ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Lead-Acid (50% DoD)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>System Sizing Results</span>
              <button
                onClick={handleCopySummary}
                className="text-xs text-amber-600 hover:text-amber-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
              </button>
            </h3>

            {/* Results Cards List */}
            <div className="space-y-3 text-xs">
              {/* Daily Bill & Consumption */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-amber-900 font-medium block">Monthly Utility Cost</span>
                  <span className="text-lg font-black text-amber-900">
                    {metrics.currency}{metrics.monthlyBill.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Monthly kWh</span>
                  <span className="font-bold text-slate-800">{metrics.monthlyKwh.toFixed(0)} kWh</span>
                </div>
              </div>

              {/* Required Generator Size */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-500" />
                    Required Generator
                  </span>
                  <span className="font-black text-amber-600 text-sm">
                    {metrics.generatorKva.toFixed(1)} kVA
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  ~{(metrics.recommendedGeneratorWatts / 1000).toFixed(1)} kW continuous rating with starting motor surge buffer.
                </p>
              </div>

              {/* Recommended Inverter */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-indigo-500" />
                    Recommended Inverter
                  </span>
                  <span className="font-black text-indigo-600 text-sm">
                    {metrics.continuousInverterWatts}W
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Pure Sine Wave Inverter rating ({metrics.surgeInverterWatts}W peak surge).
                </p>
              </div>

              {/* Required Solar Array */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-amber-500" />
                    Required Solar Array
                  </span>
                  <span className="font-black text-amber-600 text-sm">
                    {(metrics.requiredSolarArrayWatts / 1000).toFixed(2)} kW
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {metrics.requiredSolarArrayWatts} Watts array (~{Math.ceil(metrics.requiredSolarArrayWatts / 550)}x 550W solar panels).
                </p>
              </div>

              {/* Battery Bank Size */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <BatteryCharging className="w-4 h-4 text-emerald-500" />
                    Battery Bank Size
                  </span>
                  <span className="font-black text-emerald-600 text-sm">
                    {metrics.requiredBatteryKwh.toFixed(1)} kWh
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  {metrics.requiredBatteryAh} Ah @ {systemVoltage}V ({batteryType.toUpperCase()}) for {autonomyDays} day backup.
                </p>
              </div>

              {/* Estimated Solar Payback Period */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-600" />
                    Solar Payback Period
                  </span>
                  <span className="font-black text-emerald-700 text-base">
                    {metrics.paybackYears > 0 ? `${metrics.paybackYears.toFixed(1)} Years` : 'N/A'}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-normal">
                  Est. Off-Grid system cost: {metrics.currency}{metrics.totalOffGridSystemCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} based on {metrics.currency}{metrics.annualBill.toFixed(0)} annual electric bill savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
