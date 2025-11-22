
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../constants';
import { generateCodeFromPrompt, searchAndSummarize } from '../services/geminiService';
import CodeEditor from '../components/CodeEditor';
import { Wand2, Loader2, Sparkles, ChevronDown, Bot, Globe } from 'lucide-react';

const CodeGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [selectedLang, setSelectedLang] = useState(SUPPORTED_LANGUAGES[0]); // Default to Auto
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [useSearch, setUseSearch] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      let result = '';
      if (useSearch) {
        result = await searchAndSummarize(prompt);
      } else {
        result = await generateCodeFromPrompt(prompt, selectedLang);
      }
      setOutput(result);
    } catch (error) {
      setOutput(`// Error generating content. Please check your API key and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const isAutoMode = selectedLang === 'Auto (AI Agent)';

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="space-y-4">
        <h2 className="text-6xl font-bold text-white tracking-tighter drop-shadow-lg">
          {useSearch ? t.actions.search : t.actions.generate}
        </h2>
        <p className="text-slate-400 text-xl font-light max-w-2xl">Transform your ideas into production-ready code with liquid fluidity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 liquid-panel p-2 group">
          <div className="bg-black/40 rounded-[28px] h-full relative backdrop-blur-xl">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.prompts.codeGen}
              className="w-full h-80 bg-transparent border-none rounded-[28px] p-8 text-white focus:ring-0 outline-none resize-none placeholder-slate-600 text-xl leading-relaxed font-light"
            />
            {isAutoMode && !useSearch && (
              <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)] animate-pulse">
                <Bot size={16} className="text-white" />
                <span className="text-xs font-bold text-white tracking-wide uppercase">AI Agent Active</span>
              </div>
            )}
            {useSearch && (
              <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)] animate-pulse">
                <Globe size={16} className="text-blue-400" />
                <span className="text-xs font-bold text-blue-400 tracking-wide uppercase">Google Search Active</span>
              </div>
            )}
          </div>
        </div>

        <div className="liquid-panel p-8 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Search Toggle */}
            <button
              onClick={() => setUseSearch(!useSearch)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-[20px] transition-all duration-300 border ${
                useSearch 
                  ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                  : 'bg-black/30 border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${useSearch ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                  <Globe size={18} />
                </div>
                <span className={`font-bold text-sm ${useSearch ? 'text-white' : 'text-slate-400'}`}>
                  {t.prompts.searchToggle}
                </span>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${useSearch ? 'bg-blue-500' : 'bg-white/10'}`}>
                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform duration-300 ${useSearch ? 'left-6' : 'left-1'}`}></div>
              </div>
            </button>

            {!useSearch && (
              <div className="space-y-3 animate-fade-in">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t.prompts.selectLang}</label>
                <div className="relative group">
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className={`w-full appearance-none bg-black/30 border border-white/10 rounded-[20px] px-6 py-5 text-white focus:outline-none focus:border-white/30 transition-all cursor-pointer text-lg
                      ${isAutoMode ? 'shadow-[0_0_20px_rgba(255,255,255,0.05)] border-white/20' : ''}
                    `}
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <option key={lang} value={lang} className="bg-black text-slate-200">{lang}</option>
                    ))}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 group-hover:text-white transition-colors">
                    {isAutoMode ? <Sparkles size={20} className="animate-pulse" /> : <ChevronDown size={20} />}
                  </div>
                </div>
                
                {isAutoMode && (
                  <p className="text-xs text-slate-400 px-2 leading-relaxed">
                    <span className="text-white font-bold">Auto Mode:</span> AI detects the optimal language for your specific task.
                  </p>
                )}
              </div>
            )}
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className={`w-full py-5 btn-liquid disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 text-lg ${useSearch ? 'shadow-[0_0_25px_rgba(59,130,246,0.3)]' : ''}`}
          >
            {loading ? (
              <Loader2 className="animate-spin text-black" size={24} />
            ) : (
              <>
                {useSearch ? (
                  <>
                    <Globe size={24} className="text-black" />
                    <span className="relative z-10 text-black font-bold">{t.actions.search}</span>
                  </>
                ) : (
                  <>
                    {isAutoMode ? <Bot size={24} className="text-black" /> : <Wand2 size={24} className="text-black" />}
                    <span className="relative z-10 text-black">
                      {isAutoMode ? 'Agent Generate' : t.actions.generate}
                    </span>
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      {output && (
        <div className="animate-fade-in space-y-4 pt-8">
          <div className="flex items-center space-x-4 text-white px-2">
            <div className={`p-3 rounded-full ${isAutoMode || useSearch ? 'bg-white/20 text-white shadow-[0_0_15px_white]' : 'bg-white/10'}`}>
              {useSearch ? <Globe size={20} /> : (isAutoMode ? <Bot size={20} /> : <Sparkles size={20} />)}
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              {useSearch ? 'Search Results' : (isAutoMode ? 'Solution' : 'Output')}
            </h3>
          </div>
          <CodeEditor 
            code={output} 
            language={useSearch ? 'markdown' : (selectedLang === 'Auto (AI Agent)' ? 'AI Auto-Detected' : selectedLang)} 
          />
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
