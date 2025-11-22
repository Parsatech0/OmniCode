
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { buildFullApp } from '../services/geminiService';
import CodeEditor from '../components/CodeEditor';
import { Layers, Loader2, FileCode, PackageOpen } from 'lucide-react';

const AppBuilder: React.FC = () => {
  const { t } = useLanguage();
  const [description, setDescription] = useState('');
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeFile, setActiveFile] = useState<number>(0);

  const handleBuild = async () => {
    if (!description.trim()) return;
    setLoading(true);
    try {
      const result = await buildFullApp(description);
      setPlan(result);
      if (result.files && result.files.length > 0) {
        setActiveFile(0);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to build application structure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto h-[calc(100vh-8rem)] flex flex-col">
      
      {/* Input Section */}
      {!plan && (
        <div className="max-w-3xl mx-auto w-full space-y-8 mt-12 animate-fade-in">
          <div className="text-center space-y-4">
             <div className="inline-flex p-6 rounded-[32px] bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] mb-4 backdrop-blur-xl">
               <Layers size={64} className="text-white" />
             </div>
             <h2 className="text-6xl font-bold text-white tracking-tighter">{t.actions.build}</h2>
             <p className="text-slate-400 text-xl font-light">Describe your app idea, and we'll generate the full architecture.</p>
          </div>
          
          <div className="liquid-panel p-2 group">
            <div className="bg-black/40 rounded-[28px] backdrop-blur-xl relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.prompts.appDesc}
                className="w-full h-56 bg-transparent border-none rounded-[28px] p-8 text-white focus:ring-0 outline-none resize-none text-lg placeholder-slate-600 font-light"
              />
              <div className="absolute bottom-6 right-6">
                <button
                  onClick={handleBuild}
                  disabled={loading || !description}
                  className="px-8 py-4 btn-liquid flex items-center space-x-2 disabled:opacity-50"
                >
                  {loading && <Loader2 className="animate-spin text-black" size={18} />}
                  <span className="text-black">{loading ? 'Architecting...' : 'Start Building'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {plan && (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0 animate-fade-in pb-6">
          
          {/* Sidebar File Tree */}
          <div className="lg:col-span-3 liquid-panel rounded-[24px] overflow-hidden flex flex-col p-2">
            <div className="p-4 border-b border-white/5 bg-white/5 rounded-t-[20px]">
              <h3 className="font-bold text-slate-200 flex items-center space-x-2">
                <PackageOpen size={18} className="text-white" />
                <span>Project Explorer</span>
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {plan.files.map((file: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setActiveFile(index)}
                  className={`w-full text-left px-4 py-3 rounded-[16px] flex items-center space-x-3 text-sm transition-all ${
                    activeFile === index 
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)] font-bold' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <FileCode size={16} className={activeFile === index ? 'text-black' : 'text-slate-500'} />
                  <span className="truncate font-mono">{file.path}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Code View */}
          <div className="lg:col-span-9 flex flex-col gap-6 min-h-0 overflow-hidden">
            <div className="liquid-card p-6 flex-shrink-0 bg-white/5">
               <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></div>
                 Architecture Plan
               </h3>
               <p className="text-sm text-slate-300 leading-relaxed font-light">{plan.architectureExplanation}</p>
            </div>
            
            <div className="flex-1 flex flex-col min-h-0 relative">
              {plan.files[activeFile] && (
                <div className="h-full overflow-hidden rounded-[24px] shadow-2xl border border-white/10">
                  <CodeEditor 
                    code={plan.files[activeFile].content} 
                    language={plan.files[activeFile].language || 'typescript'}
                    title={plan.files[activeFile].path}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppBuilder;
