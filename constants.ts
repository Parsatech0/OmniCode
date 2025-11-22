
import { Language, Translation, AppMode } from './types';

export const SUPPORTED_LANGUAGES = [
  'Auto (AI Agent)',
  'Python', 'JavaScript', 'TypeScript', 'HTML/CSS', 'React', 'Vue.js', 'Svelte', 'Angular', 'Next.js', 'Node.js',
  'Java', 'C#', 'C++', 'C', 'Go', 'Rust', 'PHP',
  'Swift', 'Kotlin', 'Dart', 'React Native', 'Flutter', 'Objective-C',
  'Shell/Bash', 'PowerShell', 'Perl', 'Ruby', 'Lua', 'Groovy',
  'R', 'Julia', 'MATLAB', 'SQL', 'PL/SQL', 'Prolog',
  'Scala', 'Haskell', 'Elixir', 'Clojure', 'F#', 'OCaml', 'Erlang', 'Lisp',
  'Assembly (x86)', 'Verilog', 'VHDL', 'Arduino',
  'Cobol', 'Fortran', 'Ada', 'Visual Basic .NET', 'Pascal',
  'Solidity', 'Terraform', 'Docker', 'GraphQL', 'JSON', 'YAML', 'Markdown'
];

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.EN]: {
    title: "OmniCode Studio",
    welcome: "Advanced AI Development Environment",
    modes: {
      [AppMode.GENERATOR]: "Code Generator",
      [AppMode.PYTHON_IDE]: "Python Studio",
      [AppMode.DEBUGGER]: "Debugger & Fixer",
      [AppMode.CONVERTER]: "Convert to Code",
      [AppMode.APP_BUILDER]: "Full App Builder",
      [AppMode.ANIMATOR]: "AI Animator",
      [AppMode.OPTIMIZER]: "System Optimizer",
      [AppMode.DEPLOYMENT]: "Build & Deploy",
      [AppMode.SETTINGS]: "Settings"
    },
    actions: {
      generate: "Generate Code",
      debug: "Analyze & Fix",
      convert: "Convert",
      build: "Build Application",
      animate: "Generate Video",
      optimize: "Optimize System",
      copy: "Copy Code",
      upload: "Upload Image",
      download: "Download Build Kit",
      processing: "Processing...",
      help: "How to use",
      close: "Close",
      skip: "Skip Intro",
      next: "Next",
      start: "Get Started",
      run: "Run Code",
      clear: "Clear Output",
      install: "Pip Install",
      search: "Google Search",
      searching: "Searching Web..."
    },
    prompts: {
      codeGen: "Describe the code you need (e.g., 'A Rust microservice for processing payments')...",
      debugInput: "Paste your buggy code here...",
      appDesc: "Describe the full application you want to build...",
      selectLang: "Target Language",
      videoPrompt: "Describe the motion or scene (optional)...",
      searchToggle: "Enable Google Search Grounding"
    },
    deployment: {
      title: "Executable Builder",
      desc: "Generate native executables (.exe, .apk, .dmg) for your application.",
      electronTitle: "Windows Configuration",
      electronDesc: "Pre-configured setup for creating signed Windows installers.",
      androidTitle: "Android APK",
      androidDesc: "Build native Android packages using React Native / Capacitor.",
      macTitle: "macOS Bundle",
      macDesc: "Universal binary (Intel/M1) with auto-update support.",
      linuxTitle: "Linux AppImage",
      linuxDesc: "Distribute to Ubuntu, Fedora, and Arch easily."
    },
    settings: {
      desc: "Customize your studio experience.",
      themeTitle: "Theme & Appearance",
      themeDesc: "Select a preset or customize the application colors."
    },
    intro: {
      steps: [
        "Welcome to OmniCode Studio AI.",
        "I am your intelligent development assistant.",
        "I can generate code in 50+ languages instantly.",
        "I can run a professional Python environment.",
        "I can debug errors and fix them automatically.",
        "I can see images and convert them to code.",
        "Let's build the future together."
      ]
    },
    guides: {
      [AppMode.GENERATOR]: {
        title: "How to Generate Code",
        steps: [
          { title: "Describe Logic", desc: "Type exactly what you want the code to do." },
          { title: "Select Language", desc: "Choose 'Auto (AI Agent)' or a specific language." },
          { title: "Generate", desc: "Click Generate and wait for the AI." }
        ],
        tips: "Tip: Use 'Google Search' to find the latest libraries and docs."
      },
      [AppMode.PYTHON_IDE]: {
        title: "Python Studio Guide",
        steps: [
          { title: "Write Code", desc: "Write standard Python 3.11 code in the editor." },
          { title: "Manage Packages", desc: "Click 'Pip Install' to simulate installing libraries." },
          { title: "Run", desc: "Click 'Run Code' to execute via Cloud AI Interpreter." }
        ],
        tips: "Tip: The output is simulated by AI, so you can run complex scenarios without local setup."
      },
      [AppMode.DEBUGGER]: {
        title: "How to Debug",
        steps: [
          { title: "Paste Code", desc: "Copy your broken code into the input." },
          { title: "Analyze", desc: "Click Analyze & Fix to find errors." },
          { title: "Review", desc: "See the fixed version with explanations." }
        ],
        tips: "Tip: You can include error logs in the input for better results."
      },
      [AppMode.CONVERTER]: {
        title: "Image to Code",
        steps: [
          { title: "Upload", desc: "Upload a screenshot of a UI or diagram." },
          { title: "Convert", desc: "The AI scans pixels and generates code." },
          { title: "Preview", desc: "Copy the resulting HTML/CSS/React code." }
        ],
        tips: "Tip: High-contrast images work best."
      },
      [AppMode.APP_BUILDER]: {
        title: "App Builder",
        steps: [
          { title: "Describe App", desc: "Explain the full concept of your application." },
          { title: "Build", desc: "The AI generates the file structure and code." },
          { title: "Explore", desc: "Click files in the sidebar to view code." }
        ],
        tips: "Tip: Specify frameworks like 'Next.js' or 'Django'."
      },
      [AppMode.ANIMATOR]: {
        title: "AI Video",
        steps: [
          { title: "Upload Image", desc: "Choose an image to animate." },
          { title: "Prompt", desc: "Describe the movement (optional)." },
          { title: "Generate", desc: "Create a video using the Veo model." }
        ],
        tips: "Tip: 16:9 is best for cinematic results."
      },
      [AppMode.OPTIMIZER]: {
        title: "System Optimizer",
        steps: [
          { title: "Select Mode", desc: "Choose Internet, Cleaner, or Turbo." },
          { title: "Generate", desc: "Get a safe Windows script." },
          { title: "Run", desc: "Save as .bat and run as Administrator." }
        ],
        tips: "Tip: Always run scripts as Administrator."
      },
      [AppMode.DEPLOYMENT]: {
        title: "Deployment",
        steps: [
          { title: "Config", desc: "Review generated config files." },
          { title: "Download", desc: "Get the build kit (.bat)." },
          { title: "Build", desc: "Run the kit to create .exe or .apk." }
        ],
        tips: "Tip: Requires Node.js installed."
      }
    }
  },
  [Language.FA]: {
    title: "آمنی‌کد استودیو",
    welcome: "محیط توسعه هوشمند پیشرفته",
    modes: {
      [AppMode.GENERATOR]: "تولید کد",
      [AppMode.PYTHON_IDE]: "استودیو پایتون",
      [AppMode.DEBUGGER]: "عیب‌یابی و اصلاح",
      [AppMode.CONVERTER]: "تبدیل به کد",
      [AppMode.APP_BUILDER]: "ساخت اپلیکیشن",
      [AppMode.ANIMATOR]: "متحرک‌سازی هوشمند",
      [AppMode.OPTIMIZER]: "بهینه‌ساز سیستم",
      [AppMode.DEPLOYMENT]: "ساخت فایل نصبی",
      [AppMode.SETTINGS]: "تنظیمات"
    },
    actions: {
      generate: "تولید کد",
      debug: "تحلیل و تعمیر",
      convert: "تبدیل",
      build: "ساخت برنامه",
      animate: "تولید ویدیو",
      optimize: "بهینه‌سازی سیستم",
      copy: "کپی کد",
      upload: "بارگذاری تصویر",
      download: "دانلود کیت ساخت",
      processing: "در حال پردازش...",
      help: "راهنمای استفاده",
      close: "بستن",
      skip: "رد کردن",
      next: "بعدی",
      start: "شروع کنید",
      run: "اجرای کد",
      clear: "پاکسازی",
      install: "نصب پکیج",
      search: "جستجوی گوگل",
      searching: "در حال جستجو..."
    },
    prompts: {
      codeGen: "کد مورد نیاز خود را توصیف کنید...",
      debugInput: "کد دارای خطا را اینجا وارد کنید...",
      appDesc: "توضیحات کامل برنامه ای که می خواهید بسازید...",
      selectLang: "زبان مقصد",
      videoPrompt: "توصیف حرکت یا صحنه (اختیاری)...",
      searchToggle: "استفاده از نتایج جستجوی گوگل"
    },
    deployment: {
      title: "ساخت فایل اجرایی",
      desc: "تولید فایل‌های اجرایی بومی (.exe, .apk, .dmg) برای سیستم عامل‌های مختلف.",
      electronTitle: "پیکربندی ویندوز",
      electronDesc: "تنظیمات آماده برای ساخت فایل نصب ویندوز.",
      androidTitle: "نسخه اندروید (APK)",
      androidDesc: "ساخت فایل نصبی اندروید با استفاده از React Native یا Capacitor.",
      macTitle: "نسخه مک (DMG)",
      macDesc: "خروجی یونیورسال برای پردازنده‌های اینتل و اپل سیلیکون.",
      linuxTitle: "نسخه لینوکس",
      linuxDesc: "پکیج‌های استاندارد برای اوبونتو، فدورا و آرچ."
    },
    settings: {
      desc: "تجربه کاربری استودیو را شخصی‌سازی کنید.",
      themeTitle: "پوسته و ظاهر",
      themeDesc: "یک پیش‌فرض انتخاب کنید یا رنگ‌ها را تغییر دهید."
    },
    intro: {
      steps: [
        "به آمنی‌کد استودیو خوش آمدید.",
        "من دستیار هوشمند برنامه‌نویسی شما هستم.",
        "می‌توانم کدهای پیچیده را در لحظه تولید کنم.",
        "یک محیط حرفه‌ای پایتون برای شما دارم.",
        "خطاهای شما را تحلیل و رفع می‌کنم.",
        "تصاویر را به کد تبدیل می‌کنم.",
        "بیایید آینده را بسازیم."
      ]
    },
    guides: {
      [AppMode.GENERATOR]: {
        title: "آموزش تولید کد",
        steps: [
          { title: "توصیف", desc: "آنچه می‌خواهید را دقیق بنویسید." },
          { title: "انتخاب زبان", desc: "گزینه 'Auto (AI Agent)' را انتخاب کنید تا هوش مصنوعی خودش بهترین زبان را پیدا کند." },
          { title: "تولید", desc: "دکمه تولید را بزنید." }
        ],
        tips: "نکته: از گزینه 'جستجوی گوگل' برای یافتن جدیدترین مستندات استفاده کنید."
      },
      [AppMode.PYTHON_IDE]: {
        title: "راهنمای استودیو پایتون",
        steps: [
          { title: "کدنویسی", desc: "کد پایتون خود را در محیط حرفه‌ای بنویسید." },
          { title: "مدیریت پکیج", desc: "با دکمه 'نصب پکیج' کتابخانه‌ها را شبیه‌سازی کنید." },
          { title: "اجرا", desc: "دکمه اجرا را بزنید تا هوش مصنوعی خروجی را تولید کند." }
        ],
        tips: "نکته: این محیط از مفسر ابری هوشمند استفاده می‌کند."
      },
      [AppMode.DEBUGGER]: {
        title: "آموزش عیب‌یابی",
        steps: [
          { title: "کد معیوب", desc: "کد خراب را کپی کنید." },
          { title: "تحلیل", desc: "دکمه تحلیل را بزنید." },
          { title: "اصلاح", desc: "نسخه اصلاح شده را ببینید." }
        ],
        tips: "نکته: متن خطاها را هم وارد کنید."
      },
      [AppMode.CONVERTER]: {
        title: "تبدیل عکس",
        steps: [
          { title: "آپلود", desc: "عکس UI یا طرح را بارگذاری کنید." },
          { title: "تبدیل", desc: "هوش مصنوعی کد آن را می‌نویسد." },
          { title: "کپی", desc: "کد خروجی را بردارید." }
        ],
        tips: "نکته: عکس با کیفیت بهتر است."
      },
      [AppMode.APP_BUILDER]: {
        title: "ساخت اپلیکیشن",
        steps: [
          { title: "توصیف برنامه", desc: "ایده کامل را شرح دهید." },
          { title: "ساخت", desc: "ساختار فایل‌ها ایجاد می‌شود." },
          { title: "مشاهده", desc: "فایل‌ها را در نوار کناری ببینید." }
        ],
        tips: "نکته: فریم‌ورک را مشخص کنید."
      },
      [AppMode.ANIMATOR]: {
        title: "ویدیو هوشمند",
        steps: [
          { title: "آپلود عکس", desc: "عکس را انتخاب کنید." },
          { title: "حرکت", desc: "حرکت را توصیف کنید." },
          { title: "تولید", desc: "ویدیو ساخته می‌شود." }
        ],
        tips: "نکته: نسبت ۱۶:۹ سینمایی است."
      },
      [AppMode.OPTIMIZER]: {
        title: "بهینه‌ساز سیستم",
        steps: [
          { title: "انتخاب", desc: "ماژول مورد نظر را انتخاب کنید." },
          { title: "تولید", desc: "اسکریپت ساخته می‌شود." },
          { title: "اجرا", desc: "با دسترسی ادمین اجرا کنید." }
        ],
        tips: "نکته: Run as Administrator الزامی است."
      },
      [AppMode.DEPLOYMENT]: {
        title: "خروجی نهایی",
        steps: [
          { title: "تنظیمات", desc: "بررسی فایل‌های کانفیگ." },
          { title: "دانلود", desc: "دانلود کیت ساخت." },
          { title: "بیلد", desc: "اجرای فایل bat برای ساخت exe/apk." }
        ],
        tips: "نکته: نیاز به Node.js دارد."
      }
    }
  }
};