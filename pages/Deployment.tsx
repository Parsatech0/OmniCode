import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import CodeEditor from '../components/CodeEditor';
import { Download, Monitor, Package, Box, Settings, CheckCircle, Smartphone, Command, Terminal } from 'lucide-react';

const Deployment: React.FC = () => {
  const { t } = useLanguage();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const batContent = `@echo off
echo Starting Universal Build Process for OmniCode Studio...
echo --------------------------------------------
echo 1. Installing dependencies...
call npm install
echo 2. Building React bundle...
call npm run build
echo 3. Packaging for Windows (.exe)...
call npm run dist:win
echo 4. Building Android APK (via Capacitor)...
call npx cap add android
call npx cap sync
call cd android && ./gradlew assembleDebug
echo 5. Packaging for macOS (DMG)...
echo    * Note: macOS build requires running on Mac hardware or CI.
call npm run dist:mac
echo 6. Packaging for Linux (AppImage/Deb)...
call npm run dist:linux
echo --------------------------------------------
echo Build Complete! 
pause
`;
      
      const blob = new Blob([batContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'build_universal_installer.bat';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDownloading(false);
    }, 1500);
  };

  const electronMain = `const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    backgroundColor: '#030712',
    titleBarStyle: 'hiddenInset', // Native look on Mac
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });

  win.loadFile('build/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});`;

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-10">
      <div className="space-y-4">
        <h2 className="text-6xl font-bold text-white tracking-tighter">{t.deployment.title}</h2>
        <p className="text-slate-400 text-xl font-light">{t.deployment.desc}</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Monitor, title: "Windows .EXE", desc: "x64 Native", color: "text-blue-400" },
          { icon: Smartphone, title: t.deployment.androidTitle, desc: "APK / Bundle", color: "text-green-400" },
          { icon: Command, title: t.deployment.macTitle, desc: "Universal DMG", color: "text-white" },
          { icon: Terminal, title: t.deployment.linuxTitle, desc: "AppImage", color: "text-orange-400" }
        ].map((item, i) => (
          <div key={i} className="liquid-card p-8 flex flex-col items-center text-center group">
             <div className="w-20 h-20 rounded-[24px] bg-white/5 flex items-center justify-center mb-6 shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-500">
               <item.icon size={32} className={item.color} />
             </div>
             <h3 className="font-bold text-white text-xl mb-2">{item.title}</h3>
             <p className="text-sm text-slate-400 font-light">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Action Area */}
      <div className="liquid-panel p-1">
        <div className="bg-white/5 backdrop-blur-2xl rounded-[28px] p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
             <div className="space-y-4">
               <h3 className="text-4xl font-bold text-white flex items-center gap-4">
                 <div className="p-3 rounded-2xl bg-white/10 border border-white/10">
                    <Box className="text-white" strokeWidth={2} size={32} />
                 </div>
                 Build Release
               </h3>
               <p className="text-slate-300 font-light max-w-md text-lg">Generate universal configuration kit for all platforms.</p>
             </div>
             <button 
               onClick={handleDownload}
               disabled={downloading}
               className="px-12 py-6 btn-liquid flex items-center space-x-4 disabled:opacity-70 min-w-[280px] justify-center"
             >
               {downloading ? (
                 <>
                   <div className="w-6 h-6 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                   <span className="text-black text-lg">Packaging...</span>
                 </>
               ) : (
                 <>
                   <Download size={24} className="text-black" />
                   <span className="text-black text-lg">Download Kit</span>
                 </>
               )}
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-white px-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold shadow-[0_0_10px_white]">1</span>
            <h3 className="text-xl font-bold">Main Process</h3>
          </div>
          <CodeEditor code={electronMain} language="javascript" title="electron-main.js" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-white px-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white border border-white/20 font-bold">2</span>
            <h3 className="text-xl font-bold">Build Log</h3>
          </div>
          <div className="h-[340px] liquid-panel p-8 font-mono text-sm overflow-y-auto custom-scrollbar bg-black/40">
             <div className="space-y-3">
               <div className="text-slate-500">$ npm run dist:win</div>
               <div className="text-blue-400">  • electron-builder  version=24.9.1</div>
               <div className="text-yellow-500">  • building        target=nsis file=dist/OmniCode-Setup-1.0.0.exe</div>
               <div className="text-slate-500">$ npm run dist:mac</div>
               <div className="text-slate-300">  • packaging       platform=darwin arch=arm64+x64</div>
               <div className="text-purple-400">  • signing         certificate=Developer ID Application</div>
               <div className="text-slate-500">$ npm run dist:linux</div>
               <div className="text-orange-400">  • building        target=AppImage file=dist/OmniCode-1.0.0.AppImage</div>
               <div className="text-slate-500">$ npx cap add android</div>
               <div className="text-green-400">  • Android project created at android/</div>
               <div className="text-green-400 flex items-center gap-2 mt-6 border-t border-white/10 pt-4">
                 <CheckCircle size={16} />
                 <span>All Builds finished successfully</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deployment;