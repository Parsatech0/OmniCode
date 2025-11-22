import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language?: string;
  readOnly?: boolean;
  onChange?: (val: string) => void;
  title?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, readOnly = true, onChange, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-[24px] overflow-hidden border border-white/10 bg-[#08080a] shadow-2xl my-4 group transition-all hover:border-white/20">
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
        <div className="flex items-center space-x-4">
           <div className="flex space-x-2">
             <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
             <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
             <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
           </div>
           <div className="h-5 w-[1px] bg-white/10 mx-2"></div>
           <span className="flex items-center text-xs font-mono text-slate-400 font-medium tracking-wide">
             <Terminal size={14} className="mr-2 text-slate-500" />
             {title || language || 'Editor'}
           </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-xs font-medium text-slate-400 hover:text-white border border-transparent hover:border-white/10"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      
      <div className="relative">
        {readOnly ? (
          <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300 bg-[#08080a] scrollbar-hide">
            <code>{code}</code>
          </pre>
        ) : (
          <textarea
            value={code}
            onChange={(e) => onChange && onChange(e.target.value)}
            className="w-full h-64 p-6 bg-[#08080a] text-slate-300 font-mono text-sm focus:outline-none resize-none placeholder-slate-700"
            spellCheck={false}
            placeholder="// Write your code here..."
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;