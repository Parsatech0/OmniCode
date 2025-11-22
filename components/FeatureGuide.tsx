
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AppMode } from '../types';
import { X, HelpCircle, Lightbulb } from 'lucide-react';

interface FeatureGuideProps {
  mode: AppMode;
  isOpen: boolean;
  onClose: () => void;
}

const FeatureGuide: React.FC<FeatureGuideProps> = ({ mode, isOpen, onClose }) => {
  const { t } = useLanguage();
  
  if (!isOpen) return null;

  const guide = t.guides[mode];
  if (!guide) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#0f1115] border border-white/10 rounded-[2rem] max-w-md w-full shadow-2xl overflow-hidden animate-slide-up">
        <div className="bg-gradient-to-r from-primary/20 to-transparent p-6 border-b border-white/5 flex justify-between items-center">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-xl">
                <HelpCircle className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">{guide.title}</h3>
           </div>
           <button 
             onClick={onClose}
             className="text-slate-400 hover:text-white transition-colors"
           >
             <X size={20} />
           </button>
        </div>

        <div className="p-6 space-y-6">
           <div className="space-y-4">
             {guide.steps.map((step, index) => (
               <div key={index} className="flex gap-4">
                 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-primary">
                   {index + 1}
                 </div>
                 <div>
                   <h4 className="font-bold text-slate-200 mb-1">{step.title}</h4>
                   <p className="text-sm text-slate-400">{step.desc}</p>
                 </div>
               </div>
             ))}
           </div>

           <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4 flex gap-3">
              <Lightbulb className="text-yellow-400 flex-shrink-0" size={20} />
              <p className="text-sm text-yellow-100/80 italic">
                {guide.tips}
              </p>
           </div>
        </div>

        <div className="p-4 border-t border-white/5 bg-white/5 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white text-black rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            {t.actions.start}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureGuide;
