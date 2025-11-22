import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppMode, Language } from '../types';
import FeatureGuide from './FeatureGuide';
import { 
  Code, 
  Bug, 
  Image as ImageIcon, 
  Layers, 
  Download, 
  Languages, 
  Menu,
  X,
  Film,
  Cpu,
  Rocket,
  HelpCircle,
  TerminalSquare,
  Settings
} from 'lucide-react';

interface LayoutProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentMode, setMode, children }) => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const navItems = [
    { mode: AppMode.GENERATOR, icon: Code, label: t.modes[AppMode.GENERATOR] },
    { mode: AppMode.PYTHON_IDE, icon: TerminalSquare, label: t.modes[AppMode.PYTHON_IDE] },
    { mode: AppMode.DEBUGGER, icon: Bug, label: t.modes[AppMode.DEBUGGER] },
    { mode: AppMode.CONVERTER, icon: ImageIcon, label: t.modes[AppMode.CONVERTER] },
    { mode: AppMode.APP_BUILDER, icon: Layers, label: t.modes[AppMode.APP_BUILDER] },
    { mode: AppMode.ANIMATOR, icon: Film, label: t.modes[AppMode.ANIMATOR] },
    { mode: AppMode.OPTIMIZER, icon: Rocket, label: t.modes[AppMode.OPTIMIZER] },
    { mode: AppMode.DEPLOYMENT, icon: Download, label: t.modes[AppMode.DEPLOYMENT] },
  ];

  return (
    <div className={`min-h-screen relative bg-dark overflow-hidden flex text-slate-200 selection:bg-white/30 selection:text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      
      <FeatureGuide mode={currentMode} isOpen={showGuide} onClose={() => setShowGuide(false)} />

      {/* Liquid Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-flow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-flow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[80px] animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
      </div>

      {/* Liquid Sidebar */}
      <aside className={`
        fixed inset-y-0 z-50 w-80 liquid-panel border-r-0 transform transition-transform duration-500
        ${isRTL ? 'right-0' : 'left-0'}
        ${mobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')}
        md:relative md:translate-x-0 md:block
        flex flex-col
        m-4 md:my-6 md:ml-6 shadow-2xl
      `}>
        <div className="p-8 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-white/20 to-transparent border border-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md relative overflow-hidden">
               <div className="absolute inset-0 bg-white/10 animate-pulse rounded-full"></div>
               <Cpu className="text-white relative z-10" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 drop-shadow-sm">
                OmniCode
              </h1>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold pl-0.5">Liquid AI</span>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto custom-scrollbar z-10">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-3 mt-2 opacity-70">Modules</div>
          {navItems.map((item) => (
            <button
              key={item.mode}
              onClick={() => {
                setMode(item.mode);
                setMobileMenuOpen(false);
              }}
              className={`group w-full flex items-center space-x-4 px-5 py-4 rounded-[20px] transition-all duration-300 border
                ${isRTL ? 'space-x-reverse' : ''}
                ${currentMode === item.mode 
                  ? 'bg-white/10 text-white border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-sm' 
                  : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'}
              `}
            >
              <item.icon size={20} className={`transition-transform duration-300 ${currentMode === item.mode ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'group-hover:scale-110'}`} />
              <span className="font-medium text-[15px]">{item.label}</span>
              {currentMode === item.mode && (
                <div className={`ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] ${isRTL ? 'mr-auto ml-0' : ''}`}></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 z-10 space-y-2">
          <button
            onClick={() => setMode(AppMode.SETTINGS)}
            className={`flex items-center justify-center w-full space-x-3 py-4 rounded-[20px] transition-all border border-white/5 group backdrop-blur-md
              ${currentMode === AppMode.SETTINGS 
                ? 'bg-white/10 text-white border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]' 
                : 'bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 text-slate-300 hover:text-white'}
            `}
          >
            <Settings size={18} className={currentMode === AppMode.SETTINGS ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
            <span className="text-xs font-bold uppercase tracking-wider">{t.modes[AppMode.SETTINGS]}</span>
          </button>

          <button
            onClick={() => setLanguage(language === Language.EN ? Language.FA : Language.EN)}
            className="flex items-center justify-center w-full space-x-3 py-4 rounded-[20px] bg-gradient-to-r from-white/5 to-transparent hover:from-white/10 transition-all border border-white/5 text-slate-300 hover:text-white group backdrop-blur-md"
          >
            <Languages size={18} className="text-slate-400 group-hover:text-white transition-colors" />
            <span className="text-xs font-bold uppercase tracking-wider">{language === Language.EN ? 'Persian' : 'English'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Mobile Header */}
        <header className="md:hidden liquid-panel border-b border-white/5 p-4 flex items-center justify-between sticky top-0 z-40 m-4 rounded-[24px]">
          <button onClick={() => setMobileMenuOpen(true)} className="text-slate-300">
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg text-white">{t.title}</span>
          <button onClick={() => setShowGuide(true)} className="text-white">
             <HelpCircle size={24} />
          </button>
        </header>

        {/* Desktop Help Button */}
        <div className="absolute bottom-8 right-10 hidden md:block z-50">
           <button 
             onClick={() => setShowGuide(true)}
             className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all group hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
           >
             <HelpCircle size={18} className="text-slate-300 group-hover:text-white" />
             <span className="text-sm font-medium text-slate-300 group-hover:text-white">{t.actions.help}</span>
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-slide-up pb-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;