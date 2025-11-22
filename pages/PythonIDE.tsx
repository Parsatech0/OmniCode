
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { executePythonCode } from '../services/geminiService';
import { Play, Trash2, PackagePlus, FileText, Settings, Terminal, Loader2, Save, FolderOpen } from 'lucide-react';

const PythonIDE: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [code, setCode] = useState(`# Python 3.11 Environment
import random

def greet(name):
    greetings = ["Hello", "Hi", "Greetings", "Salutations"]
    return f"{random.choice(greetings)}, {name}!"

print(greet("OmniCode User"))
`);
  const [output, setOutput] = useState<string>('Python 3.11.0 (main, Oct 24 2023, 12:00:00) [GCC 11.2.0] on linux\nType "help", "copyright", "credits" or "license" for more information.\n>>> ');
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(prev => prev + `\n>>> run file.py\n`);
    
    try {
      const result = await executePythonCode(code);
      setOutput(prev => prev + result + '\n>>> ');
    } catch (error) {
      setOutput(prev => prev + `Error: ${error}\n>>> `);
    } finally {
      setIsRunning(false);
    }
  };

  const handleClear = () => {
    setOutput('>>> ');
  };

  const handleInstall = () => {
    const pkg = prompt("Enter package name to install (simulation):", "numpy");
    if (pkg) {
      setOutput(prev => prev + `\n(env) pip install ${pkg}\nDownloading ${pkg}...\nInstalling collected packages: ${pkg}\nSuccessfully installed ${pkg}-1.24.3\n>>> `);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4">
      {/* Toolbar */}
      <div className="liquid-panel p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full border border-yellow-500/20 backdrop-blur-md">
              <div className="w-5 h-5">
                {/* Python Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                  <path fill="#3776AB" d="M63.997 24.232c12.196 0 22.125 9.925 22.125 22.121v11.06H52.935v-5.53h22.125v-5.53c0-6.096-4.966-11.06-11.063-11.06-6.098 0-11.062 4.964-11.062 11.06v5.53H41.874v-5.53c0-12.196 9.929-22.121 22.123-22.121z"/>
                  <path fill="#FFD43B" d="M63.997 103.768c-12.194 0-22.123-9.925-22.123-22.121V70.587h33.187v5.53H52.936v5.53c0 6.096 4.964 11.06 11.062 11.06 6.097 0 11.063-4.964 11.063-11.06v-5.53H86.12v5.53c-.001 12.196-9.929 22.121-22.123 22.121z"/>
                </svg>
              </div>
              <span className="font-bold text-yellow-400 text-sm">Python Studio</span>
           </div>
           <div className="h-8 w-[1px] bg-white/10"></div>
           <button 
             onClick={handleRun}
             disabled={isRunning}
             className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] font-bold text-sm disabled:opacity-50"
           >
             {isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="black" />}
             {t.actions.run}
           </button>
           <button 
             onClick={handleInstall}
             className="flex items-center gap-2 px-4 py-2 bg-white/5 text-blue-300 rounded-full hover:bg-white/10 transition-colors font-medium border border-white/5"
           >
             <PackagePlus size={16} />
             {t.actions.install}
           </button>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="p-2.5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
             <Save size={18} />
           </button>
           <button className="p-2.5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
             <Settings size={18} />
           </button>
        </div>
      </div>

      {/* Main IDE Area */}
      <div className="flex-1 flex gap-4 min-h-0">
        
        {/* Sidebar: File Explorer */}
        <div className="w-64 liquid-panel flex flex-col overflow-hidden hidden md:flex p-2">
           <div className="p-4 border-b border-white/5 flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
             <FolderOpen size={14} /> Project Files
           </div>
           <div className="p-2 space-y-1">
             <div className="flex items-center gap-2 px-4 py-3 bg-white/10 text-white rounded-[16px] text-sm font-bold border border-white/10 shadow-sm">
                <div className="w-4 h-4 text-blue-400">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                main.py
             </div>
             <div className="flex items-center gap-2 px-4 py-3 hover:bg-white/5 text-slate-400 rounded-[16px] text-sm cursor-pointer transition-colors">
                <FileText size={16} /> utils.py
             </div>
             <div className="flex items-center gap-2 px-4 py-3 hover:bg-white/5 text-slate-400 rounded-[16px] text-sm cursor-pointer transition-colors">
                <FileText size={16} /> requirements.txt
             </div>
           </div>
        </div>

        {/* Editor & Terminal Split */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
           
           {/* Code Editor */}
           <div className="flex-1 liquid-card overflow-hidden flex flex-col border border-white/10 relative p-0">
              <div className="h-full relative group">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full bg-transparent text-slate-300 font-mono text-sm p-6 resize-none outline-none leading-relaxed custom-scrollbar backdrop-blur-sm"
                  spellCheck={false}
                />
                {/* Simple Status Bar */}
                <div className="absolute bottom-0 left-0 w-full bg-black/40 border-t border-white/5 py-1.5 px-4 text-[10px] text-slate-500 flex justify-between backdrop-blur-md">
                   <span>Ln 12, Col 45</span>
                   <span>Python 3.11 • UTF-8</span>
                </div>
              </div>
           </div>

           {/* Terminal Output */}
           <div className="h-48 liquid-panel flex flex-col overflow-hidden border border-white/10 p-0">
              <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between backdrop-blur-xl">
                 <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase">
                    <Terminal size={14} /> Console Output
                 </div>
                 <button onClick={handleClear} className="text-slate-500 hover:text-white transition-colors">
                    <Trash2 size={14} />
                 </button>
              </div>
              <div 
                ref={terminalRef}
                className="flex-1 p-4 font-mono text-xs text-slate-300 overflow-y-auto custom-scrollbar whitespace-pre-wrap bg-black/60"
              >
                {output}
                {isRunning && <span className="animate-pulse text-green-400">_</span>}
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default PythonIDE;
