import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import CodeGenerator from './pages/CodeGenerator';
import PythonIDE from './pages/PythonIDE';
import CodeDebugger from './pages/CodeDebugger';
import Converter from './pages/Converter';
import AppBuilder from './pages/AppBuilder';
import Deployment from './pages/Deployment';
import VideoGenerator from './pages/VideoGenerator';
import Optimizer from './pages/Optimizer';
import Settings from './pages/Settings';
import IntroOverlay from './components/IntroOverlay';
import { AppMode } from './types';

const App: React.FC = () => {
  const [currentMode, setMode] = useState<AppMode>(AppMode.GENERATOR);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenIntro');
    if (hasSeen) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  const renderPage = () => {
    switch (currentMode) {
      case AppMode.GENERATOR:
        return <CodeGenerator />;
      case AppMode.PYTHON_IDE:
        return <PythonIDE />;
      case AppMode.DEBUGGER:
        return <CodeDebugger />;
      case AppMode.CONVERTER:
        return <Converter />;
      case AppMode.APP_BUILDER:
        return <AppBuilder />;
      case AppMode.ANIMATOR:
        return <VideoGenerator />;
      case AppMode.OPTIMIZER:
        return <Optimizer />;
      case AppMode.DEPLOYMENT:
        return <Deployment />;
      case AppMode.SETTINGS:
        return <Settings />;
      default:
        return <CodeGenerator />;
    }
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
        <Layout currentMode={currentMode} setMode={setMode}>
          {renderPage()}
        </Layout>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;