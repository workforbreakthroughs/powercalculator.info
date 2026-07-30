import React from 'react';
import { Flame, Tv, Refrigerator, Car, Cpu, Wind, Sparkles } from 'lucide-react';

interface QuickApplianceShortcutsProps {
  onSelectAppliance: (wattage: number, hours: number, name: string) => void;
}

export const QuickApplianceShortcuts: React.FC<QuickApplianceShortcutsProps> = ({ onSelectAppliance }) => {
  const appliances = [
    { name: 'Space Heater', watts: 1500, hours: 8, icon: Flame, color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { name: 'Central AC Unit', watts: 3500, hours: 8, icon: Wind, color: 'text-stone-700 bg-stone-100 border-stone-200' },
    { name: 'Refrigerator', watts: 200, hours: 10, icon: Refrigerator, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { name: 'EV Charger L2', watts: 7600, hours: 4, icon: Car, color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { name: 'Gaming PC', watts: 500, hours: 5, icon: Cpu, color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { name: 'LED Smart TV', watts: 120, hours: 6, icon: Tv, color: 'text-rose-700 bg-rose-50 border-rose-200' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Popular Appliance Energy Shortcuts
        </h3>
        <span className="text-xs text-stone-500 font-medium">Click to calculate instant running cost</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {appliances.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => onSelectAppliance(item.watts, item.hours, item.name)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-stone-200/80 hover:border-stone-400 hover:shadow-xs transition bg-stone-50/50 hover:bg-white text-center group cursor-pointer"
            >
              <div className={`p-2.5 rounded-lg border ${item.color} mb-2 group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-xs text-stone-800 line-clamp-1">{item.name}</span>
              <span className="text-[11px] text-stone-500 mt-0.5">{item.watts}W ({item.hours}h/day)</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
