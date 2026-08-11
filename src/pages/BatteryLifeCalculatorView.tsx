import React, { useState, useMemo, useEffect } from 'react';
import {
  Device,
  DeviceCategory,
  deviceDatabase,
  DEVICE_CATEGORIES,
  POPULAR_BRANDS,
  USAGE_PRESET_DESCRIPTIONS,
  UsagePowerProfile,
  calculateBatteryRuntimeHours,
  formatHoursMinutes,
  mahToWh,
  whToMah,
} from '../data/deviceDatabase';
import { UserPreferences } from '../types';
import {
  Battery,
  BatteryCharging,
  Zap,
  Sliders,
  Search,
  Share2,
  Printer,
  ArrowRight,
  Check,
  AlertTriangle,
  TrendingDown,
  Sun,
  RefreshCw,
  BarChart2,
  ShieldAlert,
  Copy,
  ExternalLink,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Gamepad2,
  HardDrive,
  Car,
  Info,
  ChevronDown,
  Sparkles,
  Award,
  Layers,
} from 'lucide-react';

interface BatteryLifeCalculatorViewProps {
  userPrefs: UserPreferences;
  onNavigateToCalc?: (calcId: string, initialInputs?: Record<string, any>) => void;
  onNavigateToArticles?: (articleSlug?: string) => void;
}

export const BatteryLifeCalculatorView: React.FC<BatteryLifeCalculatorViewProps> = ({
  userPrefs,
  onNavigateToCalc,
  onNavigateToArticles,
}) => {
  // --- STATE MANAGEMENT ---
  // Device 1 Selection
  const [selectedCategory, setSelectedCategory] = useState<DeviceCategory | 'All'>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('Apple');
  const [selectedModelId, setSelectedModelId] = useState<string>('apple-iphone-17-pro-max');
  const [brandSearchQuery, setBrandSearchQuery] = useState<string>('');
  const [modelSearchQuery, setModelSearchQuery] = useState<string>('');

  // Usage & Battery Health Controls for Device 1
  const [selectedPreset, setSelectedPreset] = useState<keyof UsagePowerProfile | 'custom'>('normal');
  const [customPowerW, setCustomPowerW] = useState<number>(1.25);
  const [batteryHealthPercent, setBatteryHealthPercent] = useState<number>(100); // 50% - 100%
  const [batteryReservePercent, setBatteryReservePercent] = useState<number>(5); // 0% - 20%
  const [dailyUsageHours, setDailyUsageHours] = useState<number>(6); // hours / day

  // Advanced Environmental Conditions
  const [temperatureMode, setTemperatureMode] = useState<'cold' | 'normal' | 'hot'>('normal');
  const [brightnessLevel, setBrightnessLevel] = useState<'low' | 'medium' | 'high' | 'max'>('medium');
  const [networkType, setNetworkType] = useState<'wifi' | '4g' | '5g' | 'offline'>('wifi');
  const [performanceMode, setPerformanceMode] = useState<'saver' | 'balanced' | 'performance' | 'max'>('balanced');

  // Comparison Device (Device 2) State
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [brand2, setBrand2] = useState<string>('Samsung');
  const [model2Id, setModel2Id] = useState<string>('samsung-galaxy-s26-ultra');

  // Power Bank Estimation
  const [powerBankCapacityMah, setPowerBankCapacityMah] = useState<number>(20000);
  const [powerBankVoltage, setPowerBankVoltage] = useState<number>(3.7);
  const [powerBankEfficiencyPercent, setPowerBankEfficiencyPercent] = useState<number>(85);

  // Custom Unlisted Device Modal / Toggle
  const [isCustomDeviceMode, setIsCustomDeviceMode] = useState<boolean>(false);
  const [customBrand, setCustomBrand] = useState<string>('Custom');
  const [customModel, setCustomModel] = useState<string>('My Battery Device');
  const [customCategory, setCustomCategory] = useState<DeviceCategory>('Smartphone');
  const [customCapacityType, setCustomCapacityType] = useState<'mah' | 'wh'>('mah');
  const [customCapacityValue, setCustomCapacityValue] = useState<number>(5000);
  const [customVoltage, setCustomVoltage] = useState<number>(3.85);
  const [customChargingSpeedW, setCustomChargingSpeedW] = useState<number>(25);

  // Copy URL Share Feedback
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Sync URL search params for deep linking or comparison sharing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d1 = params.get('device1');
    const d2 = params.get('device2');
    if (d1) {
      const found = deviceDatabase.find((d) => d.id === d1 || d.model.toLowerCase().includes(d1.toLowerCase()));
      if (found) {
        setSelectedBrand(found.brand);
        setSelectedModelId(found.id);
        setSelectedCategory(found.category);
      }
    }
    if (d2) {
      const found2 = deviceDatabase.find((d) => d.id === d2 || d.model.toLowerCase().includes(d2.toLowerCase()));
      if (found2) {
        setIsCompareMode(true);
        setBrand2(found2.brand);
        setModel2Id(found2.id);
      }
    }
  }, []);

  // --- DERIVED DATA ---
  // Filtered Brands based on Category
  const availableBrands = useMemo(() => {
    let filtered = deviceDatabase;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((d) => d.category === selectedCategory);
    }
    const brandsSet = new Set(filtered.map((d) => d.brand));
    return Array.from(brandsSet).sort();
  }, [selectedCategory]);

  // Filtered Models based on Brand and Category
  const availableModels = useMemo(() => {
    return deviceDatabase.filter((d) => {
      const matchBrand = d.brand === selectedBrand;
      const matchCategory = selectedCategory === 'All' || d.category === selectedCategory;
      const matchSearch = modelSearchQuery.trim()
        ? d.model.toLowerCase().includes(modelSearchQuery.toLowerCase())
        : true;
      return matchBrand && matchCategory && matchSearch;
    });
  }, [selectedBrand, selectedCategory, modelSearchQuery]);

  // Selected Active Device 1
  const activeDevice1: Device = useMemo(() => {
    if (isCustomDeviceMode) {
      const wh = customCapacityType === 'wh' ? customCapacityValue : mahToWh(customCapacityValue, customVoltage);
      const mah = customCapacityType === 'mah' ? customCapacityValue : whToMah(customCapacityValue, customVoltage);
      return {
        id: 'custom-user-device',
        brand: customBrand || 'Custom',
        model: customModel || 'Custom Device',
        category: customCategory,
        batteryCapacityMah: Math.round(mah),
        batteryCapacityWh: parseFloat(wh.toFixed(2)),
        nominalVoltage: customVoltage,
        manufacturerRatedRuntime: 'User defined specifications',
        chargingPower: customChargingSpeedW,
        fastCharging: customChargingSpeedW >= 18,
        source: 'User manually specified device parameters',
        defaultPowerDrawW: {
          light: parseFloat((customPowerW * 0.5).toFixed(2)),
          normal: customPowerW,
          heavy: parseFloat((customPowerW * 2.2).toFixed(2)),
          gaming: parseFloat((customPowerW * 3.5).toFixed(2)),
          videoStreaming: parseFloat((customPowerW * 1.1).toFixed(2)),
          webBrowsing: parseFloat((customPowerW * 0.9).toFixed(2)),
          productivity: parseFloat((customPowerW * 1.2).toFixed(2)),
          maxPerformance: parseFloat((customPowerW * 4.0).toFixed(2)),
        },
        estimated: true,
      };
    }
    const found = deviceDatabase.find((d) => d.id === selectedModelId);
    return found || deviceDatabase[0];
  }, [
    isCustomDeviceMode,
    selectedModelId,
    customBrand,
    customModel,
    customCategory,
    customCapacityType,
    customCapacityValue,
    customVoltage,
    customChargingSpeedW,
    customPowerW,
  ]);

  // Selected Comparison Device 2
  const activeDevice2: Device | null = useMemo(() => {
    if (!isCompareMode) return null;
    return deviceDatabase.find((d) => d.id === model2Id) || deviceDatabase[1] || null;
  }, [isCompareMode, model2Id]);

  // Environmental Power Consumption Multiplier
  const envFactor = useMemo(() => {
    let mult = 1.0;
    // Temperature
    if (temperatureMode === 'cold') mult += 0.12; // cold increases internal resistance
    if (temperatureMode === 'hot') mult += 0.05;

    // Brightness
    if (brightnessLevel === 'low') mult -= 0.15;
    if (brightnessLevel === 'high') mult += 0.20;
    if (brightnessLevel === 'max') mult += 0.40;

    // Network
    if (networkType === '4g') mult += 0.15;
    if (networkType === '5g') mult += 0.30;
    if (networkType === 'offline') mult -= 0.10;

    // Performance Mode
    if (performanceMode === 'saver') mult -= 0.20;
    if (performanceMode === 'performance') mult += 0.25;
    if (performanceMode === 'max') mult += 0.50;

    return Math.max(0.4, mult);
  }, [temperatureMode, brightnessLevel, networkType, performanceMode]);

  // Power Consumption in Watts for Device 1
  const effectivePowerW1 = useMemo(() => {
    if (selectedPreset === 'custom') return customPowerW * envFactor;
    const baseW = activeDevice1.defaultPowerDrawW[selectedPreset] || 1.25;
    return baseW * envFactor;
  }, [selectedPreset, customPowerW, activeDevice1, envFactor]);

  // Power Consumption in Watts for Device 2
  const effectivePowerW2 = useMemo(() => {
    if (!activeDevice2) return 0;
    if (selectedPreset === 'custom') return customPowerW * envFactor;
    const baseW = activeDevice2.defaultPowerDrawW[selectedPreset] || 1.25;
    return baseW * envFactor;
  }, [selectedPreset, customPowerW, activeDevice2, envFactor]);

  // Estimated Runtime Hours for Device 1
  const runtimeHours1 = useMemo(() => {
    return calculateBatteryRuntimeHours(
      activeDevice1.batteryCapacityWh,
      batteryHealthPercent,
      batteryReservePercent,
      effectivePowerW1
    );
  }, [activeDevice1, batteryHealthPercent, batteryReservePercent, effectivePowerW1]);

  // Estimated Runtime Hours for Device 2
  const runtimeHours2 = useMemo(() => {
    if (!activeDevice2) return 0;
    return calculateBatteryRuntimeHours(
      activeDevice2.batteryCapacityWh,
      batteryHealthPercent,
      batteryReservePercent,
      effectivePowerW2
    );
  }, [activeDevice2, batteryHealthPercent, batteryReservePercent, effectivePowerW2]);

  // Runtime Range (+/- 18%)
  const runtimeRangeMin1 = runtimeHours1 * 0.85;
  const runtimeRangeMax1 = runtimeHours1 * 1.18;

  // Usable Wh Capacities
  const usableWh1 = activeDevice1.batteryCapacityWh * (batteryHealthPercent / 100) * (1 - batteryReservePercent / 100);
  const usableWh2 = activeDevice2 ? activeDevice2.batteryCapacityWh * (batteryHealthPercent / 100) * (1 - batteryReservePercent / 100) : 0;

  // Charging Time Estimates (Device 1)
  // Non-linear model: 0-50% at full power (90% eff), 50-80% at 80% power, 80-100% at 35% taper power
  const chargePowerW1 = activeDevice1.chargingPower || 20;
  const chargeHours0to50 = (usableWh1 * 0.50) / (chargePowerW1 * 0.90);
  const chargeHours0to80 = chargeHours0to50 + (usableWh1 * 0.30) / (chargePowerW1 * 0.75);
  const chargeHours0to100 = chargeHours0to80 + (usableWh1 * 0.20) / (chargePowerW1 * 0.35);

  // Daily Electricity Usage
  const dailyEnergyWh = effectivePowerW1 * dailyUsageHours;
  const monthlyEnergyKwh = (dailyEnergyWh * 30) / 1000;
  const monthlyCostEstimate = monthlyEnergyKwh * userPrefs.electricityRate;

  // Solar Recharging Estimate (Assuming 4.5 peak sun hours & 25% charging losses)
  const solarPanelWattageNeeded = Math.ceil((dailyEnergyWh * 1.25) / 4.5);

  // Power Bank Full Recharges
  const powerBankWh = mahToWh(powerBankCapacityMah, powerBankVoltage);
  const usablePowerBankWh = powerBankWh * (powerBankEfficiencyPercent / 100);
  const estimatedPowerBankRecharges = (usablePowerBankWh / usableWh1).toFixed(1);

  // Handle Sharing
  const handleCopyShareLink = () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('view', 'battery-life-calculator');
    url.searchParams.set('device1', activeDevice1.id);
    if (isCompareMode && activeDevice2) {
      url.searchParams.set('device2', activeDevice2.id);
    }
    navigator.clipboard.writeText(url.toString());
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  // Category Icon Mapper
  const getCategoryIcon = (category: DeviceCategory) => {
    switch (category) {
      case 'Smartphone':
        return <Smartphone className="w-4 h-4" />;
      case 'Laptop':
        return <Laptop className="w-4 h-4" />;
      case 'Tablet':
        return <Tablet className="w-4 h-4" />;
      case 'Smartwatch':
        return <Watch className="w-4 h-4" />;
      case 'Handheld gaming device':
      case 'Portable gaming console':
        return <Gamepad2 className="w-4 h-4" />;
      case 'Power station':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Electric Vehicle (EV)':
      case 'Plug-in Hybrid (PHEV)':
      case 'Hybrid Electric Vehicle (HEV)':
        return <Car className="w-4 h-4 text-emerald-500" />;
      default:
        return <HardDrive className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-10 py-2">
      {/* ==========================================
          1. HERO HEADER SECTION
      ========================================== */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
            <BatteryCharging className="w-4 h-4 text-amber-400" />
            <span>Flagship Tool: Real-World Battery Runtime & Comparison Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
            Battery Life Calculator
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
            How long will your device battery actually last? Select your device, describe how you use it, and estimate its real-world runtime under custom workload conditions.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Check className="w-3.5 h-3.5" /> 100+ Verified Specs
            </span>
            <span>•</span>
            <span>Wh & mAh Explicit Conversion</span>
            <span>•</span>
            <span>Degradation Simulator</span>
            <span>•</span>
            <span>Side-by-Side Device Comparison</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. DEVICE SELECTION CARD
      ========================================== */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 flex items-center gap-2">
              <Battery className="w-6 h-6 text-amber-600" /> Choose Your Device
            </h2>
            <p className="text-xs text-stone-500">Filter by category, brand, and model from our verified device database</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCustomDeviceMode(!isCustomDeviceMode)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                isCustomDeviceMode
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{isCustomDeviceMode ? 'Use Standard Database' : "Can't find device? Enter custom"}</span>
            </button>
          </div>
        </div>

        {!isCustomDeviceMode ? (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Category</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    selectedCategory === 'All'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> All Categories
                </button>
                {DEVICE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      // Pick first matching brand
                      const firstMatch = deviceDatabase.find((d) => d.category === cat);
                      if (firstMatch) {
                        setSelectedBrand(firstMatch.brand);
                        setSelectedModelId(firstMatch.id);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand & Model Selectors Grid */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* BRAND SELECTOR */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Select Brand</label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      const newBrand = e.target.value;
                      setSelectedBrand(newBrand);
                      const firstModel = deviceDatabase.find(
                        (d) => d.brand === newBrand && (selectedCategory === 'All' || d.category === selectedCategory)
                      );
                      if (firstModel) setSelectedModelId(firstModel.id);
                    }}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition cursor-pointer appearance-none"
                  >
                    {availableBrands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* MODEL SELECTOR WITH SEARCH */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Select Model ({availableModels.length} models)
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search model (e.g. 17 Pro, S26 Ultra, M4)..."
                      value={modelSearchQuery}
                      onChange={(e) => setModelSearchQuery(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pl-9 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                  </div>

                  <div className="relative">
                    <select
                      value={selectedModelId}
                      onChange={(e) => setSelectedModelId(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition cursor-pointer appearance-none"
                    >
                      {availableModels.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.model} ({d.batteryCapacityMah ? `${d.batteryCapacityMah} mAh / ` : ''}{d.batteryCapacityWh} Wh)
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* SPECS BADGES FOR SELECTED DEVICE */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    {getCategoryIcon(activeDevice1.category)}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-base text-white">
                      {activeDevice1.brand} {activeDevice1.model}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {activeDevice1.category} {activeDevice1.releaseYear ? `(${activeDevice1.releaseYear})` : ''}
                    </p>
                  </div>
                </div>

                {activeDevice1.estimated && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30">
                    Specs Estimated
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-slate-400 font-medium text-[11px]">Battery Capacity</div>
                  <div className="text-sm font-black text-amber-400 mt-0.5">
                    {activeDevice1.batteryCapacityWh >= 1000
                      ? `${(activeDevice1.batteryCapacityWh / 1000).toFixed(1)} kWh`
                      : `${activeDevice1.batteryCapacityWh} Wh`}
                    <span className="text-[11px] text-slate-300 font-normal block">
                      ({activeDevice1.batteryCapacityWh.toLocaleString()} Wh / {activeDevice1.batteryCapacityMah.toLocaleString()} mAh @ {activeDevice1.nominalVoltage}V)
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-slate-400 font-medium text-[11px]">Fast Charging</div>
                  <div className="text-sm font-black text-white mt-0.5">
                    {activeDevice1.chargingPower >= 1000
                      ? `${(activeDevice1.chargingPower / 1000).toFixed(0)} kW`
                      : activeDevice1.chargingPower > 0
                      ? `${activeDevice1.chargingPower} W`
                      : 'Regen Braking'}
                    <span className="text-[11px] text-slate-400 font-normal block">
                      {activeDevice1.fastCharging ? 'DC Fast Charge / Rapid' : activeDevice1.chargingPower > 0 ? 'Standard Charge' : 'Regenerative'}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-slate-400 font-medium text-[11px]">Display & Weight</div>
                  <div className="text-sm font-extrabold text-white mt-0.5 truncate">
                    {activeDevice1.screenSize || 'N/A'}
                    <span className="text-[11px] text-slate-400 font-normal block truncate">
                      {activeDevice1.weight || 'Standard'}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <div className="text-slate-400 font-medium text-[11px]">Manufacturer Claim</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5 leading-tight">
                    {activeDevice1.manufacturerRatedRuntime || 'N/A'}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 pt-1 italic">
                Note: Specifications are based on publicly available manufacturer information and may vary by region or model variant.
              </p>
            </div>
          </div>
        ) : (
          /* CUSTOM UNLISTED DEVICE FORM */
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-black text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" /> Enter Custom Device Specifications
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Brand Name</label>
                <input
                  type="text"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg py-2 px-3 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Model Name</label>
                <input
                  type="text"
                  value={customModel}
                  onChange={(e) => setCustomModel(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg py-2 px-3 text-stone-900"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Device Category</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value as DeviceCategory)}
                  className="w-full bg-white border border-stone-300 rounded-lg py-2 px-3 text-stone-900"
                >
                  {DEVICE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Capacity Input Unit</label>
                <div className="flex rounded-lg border border-stone-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setCustomCapacityType('mah')}
                    className={`flex-1 py-1.5 text-center font-bold text-xs ${
                      customCapacityType === 'mah' ? 'bg-amber-500 text-slate-950' : 'bg-white text-stone-600'
                    }`}
                  >
                    mAh
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomCapacityType('wh')}
                    className={`flex-1 py-1.5 text-center font-bold text-xs ${
                      customCapacityType === 'wh' ? 'bg-amber-500 text-slate-950' : 'bg-white text-stone-600'
                    }`}
                  >
                    Wh
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Battery Capacity ({customCapacityType.toUpperCase()})
                </label>
                <input
                  type="number"
                  min="1"
                  value={customCapacityValue}
                  onChange={(e) => setCustomCapacityValue(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-stone-300 rounded-lg py-2 px-3 text-stone-900 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Nominal Voltage (V)</label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  value={customVoltage}
                  onChange={(e) => setCustomVoltage(parseFloat(e.target.value) || 3.85)}
                  className="w-full bg-white border border-stone-300 rounded-lg py-2 px-3 text-stone-900 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Estimated Power Consumption (W)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={customPowerW}
                  onChange={(e) => setCustomPowerW(parseFloat(e.target.value) || 1.25)}
                  className="w-full bg-white border border-stone-300 rounded-lg py-2 px-3 text-stone-900 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Max Charger Wattage (W)</label>
                <input
                  type="number"
                  min="1"
                  value={customChargingSpeedW}
                  onChange={(e) => setCustomChargingSpeedW(parseFloat(e.target.value) || 20)}
                  className="w-full bg-white border border-stone-300 rounded-lg py-2 px-3 text-stone-900 font-bold"
                />
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl text-xs text-stone-600 border border-amber-200/70">
              Calculated Energy Formula: <strong>Wh = mAh × Voltage / 1000</strong> → Currently ={' '}
              <strong className="text-amber-700">{activeDevice1.batteryCapacityWh} Wh</strong>
            </div>
          </div>
        )}
      </section>

      {/* ==========================================
          3. USAGE PROFILE & BATTERY HEALTH CONTROLS
      ========================================== */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Usage Presets & Custom Power */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-600" /> Usage Workload Profile
            </h2>
            <p className="text-xs text-stone-500">Select how heavily you use your device to estimate power draw in Watts</p>
          </div>

          {/* Preset Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(Object.keys(USAGE_PRESET_DESCRIPTIONS) as Array<keyof UsagePowerProfile | 'custom'>).map((presetKey) => {
              const info = USAGE_PRESET_DESCRIPTIONS[presetKey];
              const isSelected = selectedPreset === presetKey;
              const presetWatts =
                presetKey !== 'custom'
                  ? (activeDevice1.defaultPowerDrawW[presetKey] * envFactor).toFixed(2)
                  : (customPowerW * envFactor).toFixed(2);

              return (
                <button
                  key={presetKey}
                  onClick={() => setSelectedPreset(presetKey)}
                  className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-600 font-extrabold shadow-sm'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                  }`}
                >
                  <div>
                    <div className="text-xs font-black truncate">{info.label}</div>
                    <div className={`text-[10px] mt-1 line-clamp-2 ${isSelected ? 'text-slate-900' : 'text-stone-500'}`}>
                      {info.desc}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-[11px]">
                    <span className="font-bold">Avg Draw:</span>
                    <span className={`font-black ${isSelected ? 'text-slate-950' : 'text-amber-700'}`}>
                      {parseFloat(presetWatts) >= 1000
                        ? `${(parseFloat(presetWatts) / 1000).toFixed(1)} kW`
                        : `${presetWatts} W`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Wattage Slider / Input */}
          {selectedPreset === 'custom' && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span>Manual Average Power Draw (W)</span>
                <span className="text-sm font-black text-amber-700">{customPowerW} Watts</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="150"
                step="0.1"
                value={customPowerW}
                onChange={(e) => setCustomPowerW(parseFloat(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          )}

          {/* ADVANCED ENVIRONMENTAL SETTINGS COLLAPSIBLE */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
            <div className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Advanced Usage & Environmental Modifiers
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              {/* Temperature */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">Ambient Temperature</label>
                <select
                  value={temperatureMode}
                  onChange={(e) => setTemperatureMode(e.target.value as any)}
                  className="w-full bg-white border border-stone-200 rounded-xl p-2 text-stone-800 font-medium"
                >
                  <option value="normal">Normal Room Temp (20°C - 25°C)</option>
                  <option value="cold">Freezing / Cold (-10% capacity loss)</option>
                  <option value="hot">Hot Weather / Direct Sun (-5% thermal loss)</option>
                </select>
              </div>

              {/* Brightness */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">Screen Brightness Level</label>
                <select
                  value={brightnessLevel}
                  onChange={(e) => setBrightnessLevel(e.target.value as any)}
                  className="w-full bg-white border border-stone-200 rounded-xl p-2 text-stone-800 font-medium"
                >
                  <option value="low">Low Brightness (-15% power draw)</option>
                  <option value="medium">Medium / Auto-Brightness (Default)</option>
                  <option value="high">High Brightness (+20% power draw)</option>
                  <option value="max">Maximum Brightness / Outdoors (+40%)</option>
                </select>
              </div>

              {/* Network */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">Network Connection</label>
                <select
                  value={networkType}
                  onChange={(e) => setNetworkType(e.target.value as any)}
                  className="w-full bg-white border border-stone-200 rounded-xl p-2 text-stone-800 font-medium"
                >
                  <option value="wifi">Wi-Fi Connection (Most efficient)</option>
                  <option value="4g">4G / LTE Cellular (+15% drain)</option>
                  <option value="5g">5G High-Speed Cellular (+30% drain)</option>
                  <option value="offline">Airplane Mode / Offline (-10% drain)</option>
                </select>
              </div>

              {/* Performance Mode */}
              <div>
                <label className="font-bold text-stone-700 block mb-1">OS Power Mode</label>
                <select
                  value={performanceMode}
                  onChange={(e) => setPerformanceMode(e.target.value as any)}
                  className="w-full bg-white border border-stone-200 rounded-xl p-2 text-stone-800 font-medium"
                >
                  <option value="saver">Battery Saver / Low Power Mode (-20%)</option>
                  <option value="balanced">Balanced / Standard OS Profile</option>
                  <option value="performance">High Performance Mode (+25%)</option>
                  <option value="max">Max Clock Speed / 120Hz Unlocked (+50%)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Battery Health & Reserve Sliders */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-amber-600" /> Battery Health & Reserve
            </h2>

            {/* Battery Health Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span>Battery Health State</span>
                <span className="text-sm font-black text-amber-700">{batteryHealthPercent}% Health</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                step="1"
                value={batteryHealthPercent}
                onChange={(e) => setBatteryHealthPercent(parseInt(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>50% (Degraded)</span>
                <span>80% (Typical 2-yr)</span>
                <span>100% (New)</span>
              </div>
            </div>

            {/* Reserve Cutoff Percentage */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                <span>Battery Cutoff Reserve</span>
                <span className="text-sm font-black text-amber-700">{batteryReservePercent}% Reserve</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={batteryReservePercent}
                onChange={(e) => setBatteryReservePercent(parseInt(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <p className="text-[11px] text-stone-500 leading-tight">
                Most operating systems shut down before true 0% to protect lithium chemistry from deep discharge damage.
              </p>
            </div>
          </div>

          {/* Usable Capacity Output Box */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Calculated Usable Energy</div>
            <div className="text-2xl font-black text-amber-400">
              {usableWh1.toFixed(2)} <span className="text-sm font-semibold text-white">Wh Usable</span>
            </div>
            <div className="text-[11px] text-slate-300 border-t border-slate-800 pt-2">
              Formula: {activeDevice1.batteryCapacityWh} Wh × {batteryHealthPercent}% Health × (1 - {batteryReservePercent}%) Reserve
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          4. PRIMARY REAL-TIME RESULTS DISPLAY
      ========================================== */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-extrabold border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Estimated Real-World Battery Life
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-amber-400 tracking-tight mt-2">
              {formatHoursMinutes(runtimeHours1)}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Based on {activeDevice1.brand} {activeDevice1.model} under selected {USAGE_PRESET_DESCRIPTIONS[selectedPreset].label} profile
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 p-4 rounded-2xl space-y-1 text-right sm:text-left min-w-[220px]">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Likely Runtime Range</div>
            <div className="text-lg font-black text-white">
              {formatHoursMinutes(runtimeRangeMin1)} – {formatHoursMinutes(runtimeRangeMax1)}
            </div>
            <div className="text-[11px] text-slate-400">Accounts for load spikes & background tasks</div>
          </div>
        </div>

        {/* Metrics Grid Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 font-medium text-[11px] block">Rated Battery</span>
            <span className="text-sm font-bold text-white mt-1 block">{activeDevice1.batteryCapacityWh} Wh</span>
            <span className="text-[10px] text-slate-400">({activeDevice1.batteryCapacityMah.toLocaleString()} mAh)</span>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 font-medium text-[11px] block">Usable Energy</span>
            <span className="text-sm font-bold text-amber-400 mt-1 block">{usableWh1.toFixed(2)} Wh</span>
            <span className="text-[10px] text-slate-400">After health & reserve</span>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 font-medium text-[11px] block">Avg Power Draw</span>
            <span className="text-sm font-bold text-white mt-1 block">{effectivePowerW1.toFixed(2)} Watts</span>
            <span className="text-[10px] text-slate-400">{USAGE_PRESET_DESCRIPTIONS[selectedPreset].label}</span>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 font-medium text-[11px] block">Battery Health</span>
            <span className="text-sm font-bold text-emerald-400 mt-1 block">{batteryHealthPercent}%</span>
            <span className="text-[10px] text-slate-400">Original chemistry</span>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 font-medium text-[11px] block">Reserve Cutoff</span>
            <span className="text-sm font-bold text-white mt-1 block">{batteryReservePercent}%</span>
            <span className="text-[10px] text-slate-400">Protection buffer</span>
          </div>

          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 font-medium text-[11px] block">Efficiency Score</span>
            <span className="text-sm font-bold text-amber-300 mt-1 block">
              {(runtimeHours1 / activeDevice1.batteryCapacityWh).toFixed(2)} hrs/Wh
            </span>
            <span className="text-[10px] text-slate-400">Runtime per Wh</span>
          </div>
        </div>

        {/* Action Buttons: Share & Compare */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <button
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`px-5 py-3 rounded-2xl text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-md ${
              isCompareMode
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>{isCompareMode ? 'Hide Device Comparison' : 'Compare Another Device Side-by-Side'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShareLink}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedShare ? 'Copied Link!' : 'Share Result'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. SIDE-BY-SIDE DEVICE COMPARISON SECTION
      ========================================== */}
      {isCompareMode && (
        <section className="bg-white border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                <BarChart2 className="w-4 h-4" /> Side-by-Side Performance Comparison
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">
                {activeDevice1.brand} {activeDevice1.model} vs {activeDevice2?.brand} {activeDevice2?.model}
              </h2>
            </div>

            {/* Device 2 Brand & Model Selectors */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-stone-700">Device 2:</span>
              <select
                value={brand2}
                onChange={(e) => {
                  const b = e.target.value;
                  setBrand2(b);
                  const firstMatch = deviceDatabase.find((d) => d.brand === b);
                  if (firstMatch) setModel2Id(firstMatch.id);
                }}
                className="bg-stone-100 border border-stone-300 rounded-lg p-2 font-bold text-stone-900"
              >
                {POPULAR_BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <select
                value={model2Id}
                onChange={(e) => setModel2Id(e.target.value)}
                className="bg-stone-100 border border-stone-300 rounded-lg p-2 font-bold text-stone-900 max-w-[200px] truncate"
              >
                {deviceDatabase
                  .filter((d) => d.brand === brand2)
                  .map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.model}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Comparison Table */}
          {activeDevice2 && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50 text-stone-700 font-bold uppercase tracking-wider">
                      <th className="p-3">Metric / Feature</th>
                      <th className="p-3 w-2/5 font-black text-stone-900">
                        Device A: {activeDevice1.brand} {activeDevice1.model}
                      </th>
                      <th className="p-3 w-2/5 font-black text-stone-900">
                        Device B: {activeDevice2.brand} {activeDevice2.model}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="p-3 font-semibold text-stone-700">Category</td>
                      <td className="p-3 font-medium text-stone-900">{activeDevice1.category}</td>
                      <td className="p-3 font-medium text-stone-900">{activeDevice2.category}</td>
                    </tr>

                    <tr>
                      <td className="p-3 font-semibold text-stone-700">Battery Capacity (mAh)</td>
                      <td className="p-3 font-bold text-stone-900">
                        {activeDevice1.batteryCapacityMah.toLocaleString()} mAh
                        {activeDevice1.batteryCapacityMah > activeDevice2.batteryCapacityMah && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                            +
                            {(
                              ((activeDevice1.batteryCapacityMah - activeDevice2.batteryCapacityMah) /
                                activeDevice2.batteryCapacityMah) *
                              100
                            ).toFixed(0)}
                            % Larger
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-bold text-stone-900">
                        {activeDevice2.batteryCapacityMah.toLocaleString()} mAh
                        {activeDevice2.batteryCapacityMah > activeDevice1.batteryCapacityMah && (
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                            +
                            {(
                              ((activeDevice2.batteryCapacityMah - activeDevice1.batteryCapacityMah) /
                                activeDevice1.batteryCapacityMah) *
                              100
                            ).toFixed(0)}
                            % Larger
                          </span>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-3 font-semibold text-stone-700">Total Battery Energy (Wh)</td>
                      <td className="p-3 font-extrabold text-stone-900">{activeDevice1.batteryCapacityWh} Wh</td>
                      <td className="p-3 font-extrabold text-stone-900">{activeDevice2.batteryCapacityWh} Wh</td>
                    </tr>

                    <tr className="bg-amber-50/50">
                      <td className="p-3 font-black text-stone-900">Estimated Runtime ({selectedPreset})</td>
                      <td className="p-3 text-base font-black text-stone-900">
                        {formatHoursMinutes(runtimeHours1)}
                        {runtimeHours1 > runtimeHours2 && (
                          <span className="block text-xs font-bold text-emerald-700 mt-0.5">
                            ★ ~
                            {(
                              ((runtimeHours1 - runtimeHours2) / (runtimeHours2 || 1)) *
                              100
                            ).toFixed(0)}
                            % Longer Runtime
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-base font-black text-stone-900">
                        {formatHoursMinutes(runtimeHours2)}
                        {runtimeHours2 > runtimeHours1 && (
                          <span className="block text-xs font-bold text-emerald-700 mt-0.5">
                            ★ ~
                            {(
                              ((runtimeHours2 - runtimeHours1) / (runtimeHours1 || 1)) *
                              100
                            ).toFixed(0)}
                            % Longer Runtime
                          </span>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td className="p-3 font-semibold text-stone-700">Max Charging Power</td>
                      <td className="p-3 font-bold text-stone-900">{activeDevice1.chargingPower} Watts</td>
                      <td className="p-3 font-bold text-stone-900">{activeDevice2.chargingPower} Watts</td>
                    </tr>

                    <tr>
                      <td className="p-3 font-semibold text-stone-700">Battery Efficiency (hrs/Wh)</td>
                      <td className="p-3 font-medium text-stone-900">
                        {(runtimeHours1 / activeDevice1.batteryCapacityWh).toFixed(2)} hrs per Wh
                      </td>
                      <td className="p-3 font-medium text-stone-900">
                        {(runtimeHours2 / activeDevice2.batteryCapacityWh).toFixed(2)} hrs per Wh
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Neutral Summary Note */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
                  <Award className="w-4 h-4" /> Battery Life Analysis Summary
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {runtimeHours1 > runtimeHours2
                    ? `${activeDevice1.brand} ${activeDevice1.model} is estimated to provide approximately ${(
                        ((runtimeHours1 - runtimeHours2) / (runtimeHours2 || 1)) *
                        100
                      ).toFixed(0)}% longer runtime under ${selectedPreset} usage conditions.`
                    : runtimeHours2 > runtimeHours1
                    ? `${activeDevice2.brand} ${activeDevice2.model} is estimated to provide approximately ${(
                        ((runtimeHours2 - runtimeHours1) / (runtimeHours1 || 1)) *
                        100
                      ).toFixed(0)}% longer runtime under ${selectedPreset} usage conditions.`
                    : 'Both devices deliver virtually identical runtime under the selected workload.'}
                </p>
                <p className="text-[11px] text-slate-400 italic">
                  Important: Battery capacity alone does not determine battery life. Display size, refresh rate, processor efficiency, thermal throttling, and software optimizations play massive roles in total endurance.
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ==========================================
          6. INTERACTIVE RUNTIME BREAKDOWN TABLE
      ========================================== */}
      <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-black text-stone-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-amber-600" /> Runtime Breakdown Across Activities
          </h2>
          <p className="text-xs text-stone-500">
            Estimated battery runtime for {activeDevice1.brand} {activeDevice1.model} under various specific workloads at {batteryHealthPercent}% health
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-700 font-bold uppercase tracking-wider">
                <th className="p-3">Workload / Activity</th>
                <th className="p-3">Avg Power Draw</th>
                <th className="p-3">Estimated Runtime</th>
                <th className="p-3">Runtime Bar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {(
                [
                  { key: 'light', label: 'Idle / Minimum Screen' },
                  { key: 'webBrowsing', label: 'Continuous Web Browsing' },
                  { key: 'videoStreaming', label: '1080p/4K Video Streaming' },
                  { key: 'normal', label: 'Normal Mixed Usage' },
                  { key: 'productivity', label: 'Office & Productivity' },
                  { key: 'heavy', label: 'Heavy Multitasking & Camera' },
                  { key: 'gaming', label: '3D Graphics & Gaming' },
                  { key: 'maxPerformance', label: 'Max Performance / Benchmarks' },
                ] as Array<{ key: keyof UsagePowerProfile; label: string }>
              ).map((item) => {
                const drawW = activeDevice1.defaultPowerDrawW[item.key] * envFactor;
                const hours = calculateBatteryRuntimeHours(
                  activeDevice1.batteryCapacityWh,
                  batteryHealthPercent,
                  batteryReservePercent,
                  drawW
                );
                const maxRefHours = calculateBatteryRuntimeHours(
                  activeDevice1.batteryCapacityWh,
                  batteryHealthPercent,
                  batteryReservePercent,
                  activeDevice1.defaultPowerDrawW.light * envFactor
                );
                const pct = Math.min(100, Math.max(8, (hours / (maxRefHours || 1)) * 100));

                return (
                  <tr key={item.key} className={selectedPreset === item.key ? 'bg-amber-50 font-bold' : 'hover:bg-stone-50'}>
                    <td className="p-3 font-semibold text-stone-900">{item.label}</td>
                    <td className="p-3 text-stone-600">{drawW.toFixed(2)} W</td>
                    <td className="p-3 font-black text-stone-900">{formatHoursMinutes(hours)}</td>
                    <td className="p-3 w-1/3">
                      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            hours > 12 ? 'bg-emerald-500' : hours > 6 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ==========================================
          7. BATTERY DEGRADATION & CHARGING ESTIMATORS
      ========================================== */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Battery Degradation Simulator */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-amber-600" /> Battery Life Over Time (Degradation)
            </h2>
            <p className="text-xs text-stone-500">Estimated runtime as battery health degrades over cycle life</p>
          </div>

          <div className="space-y-2 text-xs">
            {[100, 90, 80, 70, 60, 50].map((hPct) => {
              const hrs = calculateBatteryRuntimeHours(
                activeDevice1.batteryCapacityWh,
                hPct,
                batteryReservePercent,
                effectivePowerW1
              );
              return (
                <div key={hPct} className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl">
                  <span className="font-bold text-stone-800">{hPct}% Battery Health</span>
                  <span className="font-black text-stone-900">{formatHoursMinutes(hrs)}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-stone-500 italic">
            Note: Chemical battery degradation is non-linear and affected by charging habits and temperature extremes.
          </p>
        </div>

        {/* Charging Time Estimator */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-amber-600" /> Charging Speed Estimator
              </h2>
              <p className="text-xs text-stone-500">
                Estimated recharge duration using {activeDevice1.chargingPower}W charger
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-[11px] text-stone-500 font-bold">0 → 50%</div>
                <div className="text-sm font-black text-stone-900 mt-1">{formatHoursMinutes(chargeHours0to50)}</div>
                <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Fast Phase</div>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-[11px] text-stone-500 font-bold">0 → 80%</div>
                <div className="text-sm font-black text-stone-900 mt-1">{formatHoursMinutes(chargeHours0to80)}</div>
                <div className="text-[10px] text-amber-600 font-bold mt-0.5">Standard</div>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-[11px] text-stone-500 font-bold">0 → 100%</div>
                <div className="text-sm font-black text-stone-900 mt-1">{formatHoursMinutes(chargeHours0to100)}</div>
                <div className="text-[10px] text-stone-500 font-medium mt-0.5">Trickle Taper</div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl text-xs text-stone-700 border border-amber-200/80">
            <strong>Trickle Charging Note:</strong> Lithium charging slows down significantly above 80% state-of-charge to prevent thermal stress and lithium plating.
          </div>
        </div>
      </div>

      {/* ==========================================
          8. ELECTRICITY & SOLAR & POWER BANK ECOSYSTEM
      ========================================== */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Electricity Consumption Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-black text-stone-900 text-sm flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" /> Electricity Usage
            </h3>
            <p className="text-xs text-stone-500">Based on {dailyUsageHours} hrs daily usage</p>
          </div>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex justify-between p-2 bg-stone-50 rounded-lg">
              <span>Daily Energy</span>
              <strong className="text-stone-900">{dailyEnergyWh.toFixed(1)} Wh</strong>
            </div>
            <div className="flex justify-between p-2 bg-stone-50 rounded-lg">
              <span>Monthly Energy</span>
              <strong className="text-stone-900">{monthlyEnergyKwh.toFixed(2)} kWh</strong>
            </div>
            <div className="flex justify-between p-2 bg-stone-50 rounded-lg">
              <span>Monthly Bill Impact</span>
              <strong className="text-emerald-700">${monthlyCostEstimate.toFixed(3)}</strong>
            </div>
          </div>

          {onNavigateToCalc && (
            <button
              onClick={() => onNavigateToCalc('appliance-electricity-cost', { wattage: effectivePowerW1, hoursPerDay: dailyUsageHours })}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Calculate Electricity Cost</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Solar Recharging Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-black text-stone-900 text-sm flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-600" /> Solar Recharging
            </h3>
            <p className="text-xs text-stone-500">Off-grid solar panel requirements</p>
          </div>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex justify-between p-2 bg-stone-50 rounded-lg">
              <span>Daily Energy Needed</span>
              <strong className="text-stone-900">{dailyEnergyWh.toFixed(1)} Wh</strong>
            </div>
            <div className="flex justify-between p-2 bg-stone-50 rounded-lg">
              <span>Min Solar Panel Size</span>
              <strong className="text-amber-700">{solarPanelWattageNeeded} Watts</strong>
            </div>
          </div>

          {onNavigateToCalc && (
            <button
              onClick={() => onNavigateToCalc('solar-panel-sizing')}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Size Solar Array</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Power Bank Estimator Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="font-black text-stone-900 text-sm flex items-center gap-1.5">
              <Battery className="w-4 h-4 text-amber-600" /> Power Bank Charges
            </h3>
            <p className="text-xs text-stone-500">Estimates full recharges from external battery pack</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <label className="text-stone-700 font-bold">Power Bank Size</label>
              <select
                value={powerBankCapacityMah}
                onChange={(e) => setPowerBankCapacityMah(parseInt(e.target.value))}
                className="bg-stone-100 border border-stone-200 rounded-lg p-1 text-xs font-bold text-stone-900"
              >
                <option value={10000}>10,000 mAh</option>
                <option value={20000}>20,000 mAh</option>
                <option value={26800}>26,800 mAh (Aviation Max)</option>
              </select>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl text-center border border-amber-200">
              <span className="text-[11px] text-stone-600 font-bold block">Estimated Full Recharges</span>
              <span className="text-xl font-black text-stone-900 mt-0.5 block">{estimatedPowerBankRecharges} Full Charges</span>
              <span className="text-[10px] text-stone-500 block">Accounts for 15% conversion heat loss</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          9. SAFETY & DISCLAIMER NOTE
      ========================================== */}
      <section className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 text-xs text-stone-800 space-y-2">
        <div className="flex items-center gap-2 font-black text-amber-900 text-sm">
          <ShieldAlert className="w-4 h-4 text-amber-700" /> Battery Life Calculation Disclaimer
        </div>
        <p className="leading-relaxed text-stone-700 font-medium">
          Battery life estimates are approximate. Actual runtime depends on workload, display brightness, network conditions, temperature, battery age, software optimizations, background processes, and other factors. Manufacturer-rated battery life may use standardized testing conditions and may not reflect your actual usage.
        </p>
      </section>
    </div>
  );
};
