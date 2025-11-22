
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { debugAndFixCode } from '../services/geminiService';
import CodeEditor from '../components/CodeEditor';
import { Bug, Loader2, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

const CodeDebugger: React.FC = () => {
  const { t } = useLanguage();
  const [inputCode, setInputCode] = useState('');
  const [result, setResult] = useState<{ analysis: string; fixedCode: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDebug = async () => {
    if (!inputCode.trim()) return;
    setLoading(true);
    try {
      const response = await debugAndFixCode(inputCode);
      setResult(response);
    } catch (error) {
      console.error(error);
      alert("Error during debugging");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h2 className="text-5xl font-bold text-white tracking-tight">{t.actions.debug}</h2>
          <p className="text-slate-400 text-lg font-light">AI-powered analysis to find and fix bugs instantly.</p>
        </div>
        <button
          onClick={handleDebug}
          disabled={loading || !inputCode}
          className="px-8 py-4 bg-red-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] disabled:opacity-50 flex items-center space-x-3 hover:scale-105"
        >
          {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
          <span>{loading ? t.actions.processing : 'Analyze & Fix'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <span className="text-xs font-bold text-red-400 uppercase tracking-widest ml-2 flex items-center gap-2">
            <Bug size={14} />
            Broken Code
          </span>
          <div className="liquid-card p-2 rounded-[24px]">
            <CodeEditor 
              code={inputCode} 
              onChange={setInputCode} 
              readOnly={false} 
              title="input.js"
            />
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold text-green-400 uppercase tracking-widest ml-2 flex items-center gap-2">
            <CheckCircle size={14} />
            Fixed Solution
          </span>
          <div className="liquid-card p-2 rounded-[24px] min-h-[300px]">
            {result ? (
               <CodeEditor 
                 code={result.fixedCode} 
                 language="Corrected" 
                 readOnly={true}
                 title="fixed_output.js"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 p-10 border border-dashed border-white/10 rounded-[20px]">
                <Loader2 className={`w-8 h-8 mb-4 ${loading ? 'animate-spin text-white' : 'opacity-0'}`} />
                <p className="font-light">{loading ? 'Analyzing logic flow...' : 'Waiting for code input...'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {result && (
        <div className="animate-fade-in liquid-panel p-8 rounded-[24px] border-l-4 border-l-yellow-500">
          <div className="flex items-center space-x-3 text-yellow-500 mb-4">
            <AlertTriangle className="fill-yellow-500/20" size={24} />
            <h3 className="text-xl font-bold">Debug Report</h3>
          </div>
          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed text-lg font-light">
            {result.analysis}
          </p>
        </div>
      )}
    </div>
  );
};

export default CodeDebugger;
