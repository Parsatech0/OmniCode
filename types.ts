
export enum Language {
  EN = 'en',
  FA = 'fa'
}

export enum AppMode {
  GENERATOR = 'generator',
  PYTHON_IDE = 'python_ide',
  DEBUGGER = 'debugger',
  CONVERTER = 'converter',
  APP_BUILDER = 'app_builder',
  ANIMATOR = 'animator',
  OPTIMIZER = 'optimizer',
  DEPLOYMENT = 'deployment',
  SETTINGS = 'settings'
}

export interface GuideStep {
  title: string;
  desc: string;
}

export interface GuideContent {
  title: string;
  steps: GuideStep[];
  tips: string;
}

export interface Translation {
  title: string;
  welcome: string;
  modes: {
    [key in AppMode]: string;
  };
  actions: {
    generate: string;
    debug: string;
    convert: string;
    build: string;
    animate: string;
    optimize: string;
    copy: string;
    upload: string;
    download: string;
    processing: string;
    help: string;
    close: string;
    skip: string;
    next: string;
    start: string;
    run: string;
    clear: string;
    install: string;
    search: string;
    searching: string;
  };
  prompts: {
    codeGen: string;
    debugInput: string;
    appDesc: string;
    selectLang: string;
    videoPrompt: string;
    searchToggle: string;
  };
  deployment: {
    title: string;
    desc: string;
    electronTitle: string;
    electronDesc: string;
    androidTitle: string;
    androidDesc: string;
    macTitle: string;
    macDesc: string;
    linuxTitle: string;
    linuxDesc: string;
  };
  settings: {
    desc: string;
    themeTitle: string;
    themeDesc: string;
  };
  intro: {
    steps: string[];
  };
  guides: {
    [key in AppMode]?: GuideContent;
  };
}

export interface GeneratedFile {
  path: string;
  content: string;
  language: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  code?: string;
  language?: string;
  files?: GeneratedFile[];
}