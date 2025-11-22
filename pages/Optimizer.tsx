import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { generateCodeFromPrompt } from '../services/geminiService';
import CodeEditor from '../components/CodeEditor';
import { Rocket, Wifi, Trash2, Battery, Zap, Shield, ArrowRight, Loader2, Cpu, CheckCircle2 } from 'lucide-react';

const Optimizer: React.FC = () => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'internet',
      icon: Wifi,
      title: language === 'fa' ? 'شتاب‌دهنده شبکه' : 'Network Accelerator',
      desc: language === 'fa' ? 'بهینه‌سازی پینگ و پایداری با تنظیم مجدد پشته TCP.' : 'Optimize ping & stability by resetting TCP stack.',
      color: 'text-cyan-400',
      prompt: "Write a highly effective Windows Batch script to optimize internet. Commands: ipconfig /flushdns, netsh winsock reset, netsh int ip reset. Add fancy echo messages. End with pause."
    },
    {
      id: 'cleaner',
      icon: Trash2,
      title: language === 'fa' ? 'پاکسازی عمیق' : 'Deep Cleaning',
      desc: language === 'fa' ? 'حذف فایل‌های زائد سیستمی و آزادسازی فضا.' : 'Remove system junk, temp files and free up space.',
      color: 'text-rose-400',
      prompt: "Write a Windows Batch script to clean junk. Clear %temp%, prefetch. Skip locked files safely. Add progress messages."
    },
    {
      id: 'performance',
      icon: Zap,
      title: language === 'fa' ? 'حالت توربو' : 'Turbo Boost',
      desc: language === 'fa' ? 'حداکثر کارایی برای بازی و برنامه‌های سنگین.' : 'Maximize performance for gaming and heavy apps.',
      color: 'text-emerald-400',
      prompt: "Write a PowerShell script to set High Performance plan and disable unused services. Explain steps."
    }
  ];

  const handleOptimize = async (module: typeof modules[0]) => {
    setLoading(true);
    setActiveModule(module.id);
    setGeneratedScript('');
    
    try {
      const code = await generateCodeFromPrompt(module.prompt, "Batch/PowerShell");
      setGeneratedScript(code);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 relative">
      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"></span>
            System Online
          </div>
          <h2 className="text-6xl md:text-7xl font-bold text-white tracking-tighter">
            {language === 'fa' ? 'بهینه‌ساز هوشمند' : 'System Flow'}
          </h2>
          <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-light">
            {language === 'fa' 
              ? 'از هوش مصنوعی برای افزایش سرعت، امنیت و کارایی لپ‌تاپ خود استفاده کنید.' 
              : 'Optimize your machine with AI-driven liquid efficiency scripts.'}
          </p>
        </div>
      </div>

      {/* Modules Grid - Liquid Droplets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => handleOptimize(mod)}
            className={`
              group relative h-[360px] liquid-card p-10 text-left flex flex-col justify-between overflow-hidden
              ${activeModule === mod.id ? 'border-white/30 bg-white/5' : ''}
            `}
          >
            {/* Internal Glow */}
            <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full filter blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-white`}></div>
            
            <div className="relative z-10">
              <div className={`w-20 h-20 rounded-[24px] bg-white/5 flex items-center justify-center mb-8 border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500`}>
                <mod.icon className={`w-10 h-10 ${mod.color} drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{mod.title}</h3>
              <p className="text-slate-400 leading-relaxed font-light text-sm">
                {mod.desc}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-4 border-t border-white/5 pt-6">
              <span className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                 {language === 'fa' ? 'شروع' : 'Initialize'}
              </span>
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-lg">
                {loading && activeModule === mod.id ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <ArrowRight className={`transition-transform duration-300 ${language === 'fa' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} size={20} />
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Output Section */}
      {generatedScript && (
        <div className="animate-slide-up">
           <div className="liquid-panel p-1">
              <div className="bg-black/40 backdrop-blur-xl rounded-[28px] p-8 md:p-10">
                 <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                       <CheckCircle2 className="text-emerald-400 w-7 h-7" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold text-white">
                         {language === 'fa' ? 'اسکریپت آماده است' : 'Optimization Sequence Ready'}
                       </h3>
                       <p className="text-slate-400">
                         {language === 'fa' ? 'کد زیر را با پسوند .bat ذخیره و اجرا کنید.' : 'Save as .bat and run as Administrator.'}
                       </p>
                    </div>
                 </div>
                 <CodeEditor 
                    code={generatedScript} 
                    language="batch" 
                    title="optimizer_script.bat"
                  />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Optimizer;