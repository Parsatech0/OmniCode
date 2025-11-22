import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Palette, RotateCcw } from 'lucide-react';

const Settings: React.FC = () => {
  const { primaryColor, accentColor, setPrimaryColor, setAccentColor, resetTheme } = useTheme();
  const { t } = useLanguage();

  const presets = [
    { name: 'Default', primary: '#ffffff', accent: '#a8a2ff' },
    { name: 'Cyberpunk', primary: '#facc15', accent: '#22d3ee' },
    { name: 'Ocean', primary: '#38bdf8', accent: '#3b82f6' },
    { name: 'Crimson', primary: '#f87171', accent: '#f43f5e' },
    { name: 'Emerald', primary: '#34d399', accent: '#10b981' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-5xl font-bold text-white tracking-tighter">{t.modes.settings}</h2>
        <p className="text-slate-400 text-lg">{t.settings.desc}</p>
      </div>

      <div className="liquid-panel p-8 space-y-8">
        <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
          <div className="p-3 bg-white/10 rounded-full">
            <Palette className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{t.settings.themeTitle}</h3>
            <p className="text-slate-400">{t.settings.themeDesc}</p>
          </div>
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider">Primary Color</label>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 overflow-hidden rounded-2xl border border-white/20">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] cursor-pointer p-0 border-0"
                />
              </div>
              <span className="text-white font-mono bg-white/5 px-3 py-1 rounded-lg border border-white/10">{primaryColor}</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider">Accent Color</label>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 overflow-hidden rounded-2xl border border-white/20">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] cursor-pointer p-0 border-0"
                />
              </div>
              <span className="text-white font-mono bg-white/5 px-3 py-1 rounded-lg border border-white/10">{accentColor}</span>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-4 pt-6">
           <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider">Presets</label>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {presets.map((preset) => (
               <button
                 key={preset.name}
                 onClick={() => {
                   setPrimaryColor(preset.primary);
                   setAccentColor(preset.accent);
                 }}
                 className="group relative p-4 rounded-2xl border border-white/10 hover:border-white/30 bg-black/20 transition-all hover:scale-105"
               >
                 <div className="flex justify-center gap-2 mb-2">
                   <div className="w-6 h-6 rounded-full shadow-lg border border-white/10" style={{ backgroundColor: preset.primary }}></div>
                   <div className="w-6 h-6 rounded-full shadow-lg border border-white/10" style={{ backgroundColor: preset.accent }}></div>
                 </div>
                 <div className="text-center text-xs font-bold text-slate-300 group-hover:text-white">{preset.name}</div>
               </button>
             ))}
           </div>
        </div>

        {/* Actions */}
        <div className="pt-8 flex justify-end">
          <button
            onClick={resetTheme}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/10"
          >
            <RotateCcw size={18} />
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;