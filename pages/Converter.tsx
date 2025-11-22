
import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { convertImageToCode } from '../services/geminiService';
import CodeEditor from '../components/CodeEditor';
import { Image as ImageIcon, Upload, Loader2, ArrowRight, ScanEye } from 'lucide-react';

const Converter: React.FC = () => {
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [outputCode, setOutputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = async () => {
    if (!imagePreview) return;
    setLoading(true);
    try {
      const code = await convertImageToCode(imagePreview, "Convert this UI image into clean HTML/Tailwind CSS code. Make it responsive and modern.");
      setOutputCode(code);
    } catch (error) {
      console.error(error);
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-6xl font-bold text-white tracking-tighter">{t.actions.convert}</h2>
        <p className="text-slate-400 text-xl font-light">Turn UI screenshots, diagrams, or mockups into functional code.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Upload Section */}
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-[32px] h-96 flex flex-col items-center justify-center cursor-pointer transition-all group relative overflow-hidden
              ${imagePreview ? 'border-white/50 bg-black' : 'border-white/10 hover:border-white/40 hover:bg-white/5'}
            `}
          >
            {imagePreview ? (
              <>
                 <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-4 z-10" />
                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm">
                    <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-full text-white flex items-center gap-2 border border-white/20">
                       <Upload size={18} /> Change Image
                    </div>
                 </div>
              </>
            ) : (
              <>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/5">
                  <ImageIcon className="w-10 h-10 text-slate-400 group-hover:text-white" />
                </div>
                <span className="text-slate-300 font-bold text-xl">{t.actions.upload}</span>
                <span className="text-sm text-slate-500 mt-2">Support for PNG, JPG, WEBP</span>
              </>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />

          <button
            onClick={handleConvert}
            disabled={!imagePreview || loading}
            className="w-full py-6 bg-white text-black rounded-full font-bold text-lg hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center space-x-3 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <ScanEye />}
            <span>{loading ? t.actions.processing : 'Convert to Code'}</span>
          </button>
        </div>

        {/* Output Section */}
        <div className="h-full min-h-[400px]">
          {outputCode ? (
            <div className="animate-fade-in h-full">
               <CodeEditor code={outputCode} language="html" />
            </div>
          ) : (
             <div className="h-full rounded-[32px] liquid-panel flex flex-col items-center justify-center text-slate-500 text-center p-8 min-h-[384px]">
               {loading ? (
                 <div className="space-y-6">
                   <div className="relative w-24 h-24 mx-auto">
                     <div className="absolute inset-0 border-t-4 border-white rounded-full animate-spin"></div>
                     <div className="absolute inset-2 border-t-4 border-white/50 rounded-full animate-spin animation-delay-2000"></div>
                   </div>
                   <p className="text-lg font-medium text-white">Vision AI is scanning pixels...</p>
                 </div>
               ) : (
                 <>
                   <p className="text-lg font-light">Code output will appear here.</p>
                 </>
               )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Converter;
