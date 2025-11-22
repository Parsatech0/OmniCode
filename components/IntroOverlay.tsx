
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, SkipForward, Cpu } from 'lucide-react';

interface IntroOverlayProps {
  onComplete: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showButton, setShowButton] = useState(false);

  const steps = t.intro.steps;

  useEffect(() => {
    if (step >= steps.length) {
      onComplete();
      return;
    }

    let currentText = '';
    const fullText = steps[step];
    let charIndex = 0;
    setShowButton(false);

    const typeInterval = setInterval(() => {
      currentText += fullText[charIndex];
      setDisplayedText(currentText);
      charIndex++;

      if (charIndex >= fullText.length) {
        clearInterval(typeInterval);
        setTimeout(() => setShowButton(true), 500);
        
        if (step < steps.length - 1) {
            setTimeout(() => handleNext(), 3000);
        }
      }
    }, 35);

    return () => clearInterval(typeInterval);
  }, [step, language]);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>

      <div className="relative z-10 max-w-4xl w-full px-8 text-center space-y-12">
        <div className="flex justify-center mb-8">
           <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-xl animate-bounce">
              <Cpu size={40} className="text-white" />
           </div>
        </div>

        <div className="min-h-[120px] flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight">
            {displayedText}
            <span className="inline-block w-2 h-8 ml-2 bg-primary animate-pulse align-middle"></span>
          </h1>
        </div>

        <div className={`transition-all duration-500 transform ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {step === steps.length - 1 ? (
            <button 
              onClick={onComplete}
              className="px-8 py-3 bg-white text-black font-bold text-lg rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
            >
              {t.actions.start} <ArrowRight size={20} />
            </button>
          ) : (
            <button 
              onClick={onComplete}
              className="text-slate-500 hover:text-white text-sm tracking-widest uppercase transition-colors flex items-center gap-2 mx-auto"
            >
              {t.actions.skip} <SkipForward size={14} />
            </button>
          )}
        </div>
      </div>
      
      <div className="absolute bottom-10 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default IntroOverlay;
