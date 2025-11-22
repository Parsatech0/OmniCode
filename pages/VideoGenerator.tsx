
import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { generateVideo } from '../services/geminiService';
import { Film, Upload, Loader2, Clapperboard, Play, Sparkles, Download } from 'lucide-react';

const VideoGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
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

  const handleGenerate = async () => {
    if (!imagePreview) return;
    setLoading(true);
    setVideoUrl(null);
    try {
      const url = await generateVideo(imagePreview, prompt, aspectRatio);
      setVideoUrl(url);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Video generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold text-white">{t.actions.animate}</h2>
        <p className="text-slate-400 text-lg">Bring your images to life using Veo generative video.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Input Section */}
        <div className="space-y-6 liquid-card p-8 rounded-[24px]">
          {/* Image Upload */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-[20px] h-64 flex flex-col items-center justify-center cursor-pointer transition-all group
              ${imagePreview ? 'border-white/50 bg-white/5' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}
            `}
          >
            {imagePreview ? (
              <div className="relative w-full h-full p-2">
                 <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-[16px]" />
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[16px] backdrop-blur-sm">
                    <Upload className="text-white" />
                 </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                  <Upload className="w-8 h-8 text-slate-400 group-hover:text-white" />
                </div>
                <span className="text-slate-300 font-medium">{t.actions.upload}</span>
                <span className="text-xs text-slate-500 mt-2">PNG, JPG</span>
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

          {/* Prompt */}
          <div>
             <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Prompt (Optional)</label>
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder={t.prompts.videoPrompt}
               className="w-full bg-black/30 border border-white/10 rounded-[20px] p-4 text-white focus:ring-2 focus:ring-white/20 outline-none resize-none h-24 placeholder-slate-600"
             />
          </div>

          {/* Aspect Ratio */}
          <div>
             <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Aspect Ratio</label>
             <div className="grid grid-cols-2 gap-4">
               <button
                 onClick={() => setAspectRatio('16:9')}
                 className={`py-3 px-4 rounded-[16px] border flex flex-col items-center justify-center space-y-2 transition-all ${aspectRatio === '16:9' ? 'bg-white/20 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-black/20 border-white/10 text-slate-500 hover:bg-white/5'}`}
               >
                 <div className="w-12 h-7 border-2 border-current rounded-sm"></div>
                 <span className="text-xs font-bold">16:9 Landscape</span>
               </button>
               <button
                 onClick={() => setAspectRatio('9:16')}
                 className={`py-3 px-4 rounded-[16px] border flex flex-col items-center justify-center space-y-2 transition-all ${aspectRatio === '9:16' ? 'bg-white/20 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'bg-black/20 border-white/10 text-slate-500 hover:bg-white/5'}`}
               >
                 <div className="w-7 h-12 border-2 border-current rounded-sm"></div>
                 <span className="text-xs font-bold">9:16 Portrait</span>
               </button>
             </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!imagePreview || loading}
            className="w-full py-4 btn-liquid rounded-full font-bold text-black disabled:opacity-50 flex items-center justify-center space-x-2 transition-all"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
            <span>{loading ? t.actions.processing : t.actions.animate}</span>
          </button>
        </div>

        {/* Output Section */}
        <div className="h-full">
          {videoUrl ? (
            <div className="animate-fade-in bg-black rounded-[24px] overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/10">
               <video 
                 src={videoUrl} 
                 controls 
                 autoPlay 
                 loop 
                 className="w-full h-auto max-h-[600px] mx-auto"
               />
               <div className="p-4 bg-white/5 border-t border-white/10 flex justify-between items-center backdrop-blur-md">
                 <span className="text-sm text-slate-400">Generated with Veo</span>
                 <a href={videoUrl} download="omnicode_video.mp4" className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors text-sm font-medium">
                   <Download className="w-4 h-4" />
                   <span>Download MP4</span>
                 </a>
               </div>
            </div>
          ) : (
             <div className="h-full min-h-[500px] rounded-[24px] liquid-panel flex flex-col items-center justify-center text-slate-600 text-center p-10">
               {loading ? (
                 <div className="space-y-8 relative">
                   <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full animate-pulse"></div>
                   <div className="relative">
                     <div className="w-20 h-20 border-4 border-white/10 border-t-white rounded-full animate-spin mx-auto"></div>
                     <div className="absolute inset-0 flex items-center justify-center font-bold text-white">AI</div>
                   </div>
                   <div className="space-y-2">
                      <p className="text-white text-lg font-medium animate-pulse">Generating Video...</p>
                      <p className="text-sm text-slate-500">Veo is rendering frame by frame</p>
                   </div>
                 </div>
               ) : (
                 <>
                   <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6 shadow-inner border border-white/5">
                     <Film className="w-12 h-12 text-slate-700" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-500 mb-2">Ready to Animate</h3>
                   <p className="text-slate-600 max-w-xs">Upload an image and select your settings to generate a video.</p>
                 </>
               )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
