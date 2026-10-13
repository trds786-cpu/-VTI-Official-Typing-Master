import { Lesson } from '../types';

export const DEFAULT_LESSONS: Lesson[] = [
  // ================= ENGLISH LESSONS =================
  {
    id: 'en-home-01',
    title: 'Lesson 1: Home Row Foundation (ASDF JKL;)',
    description: 'Master index, middle, ring, and pinky finger placement on the fundamental home keys.',
    language: 'english',
    category: 'home_row',
    targetWpm: 25,
    targetAccuracy: 95,
    content: 'asdf jkl; asdf jkl; aadd ssff jjll kk;; aadd ssff jjll kk;; asdf jkl; fads jalk flask salad salsa flasks alfafa all fall falls lads glad fads jalk flask salad salsa flasks alfafa all fall falls lads glad asdf jkl;'
  },
  {
    id: 'en-home-02',
    title: 'Lesson 2: Home Row Extended (G and H Keys)',
    description: 'Reaching the central keys G and H using left and right index fingers.',
    language: 'english',
    category: 'home_row',
    targetWpm: 30,
    targetAccuracy: 96,
    content: 'fg jh fg jh asdfg hjkl; gaga haha flag flash dash glad half slag shad flag fall dash hash gas gala glass slash gash flags glad dash haha gaga asdfg hjkl; flash flag half dash glad glass gala half dash flags'
  },
  {
    id: 'en-top-01',
    title: 'Lesson 3: Top Row Mastery (QWERTY UIOP)',
    description: 'Upward finger reach to the QWERTY top row with rhythm control.',
    language: 'english',
    category: 'top_row',
    targetWpm: 32,
    targetAccuracy: 95,
    content: 'qwer tyui op qwer tyui op write quote quiet power route pride tower paper water query tree true power quote quiet report type wire peer trip roof pure true quiet route power quote write tree type report'
  },
  {
    id: 'en-bot-01',
    title: 'Lesson 4: Bottom Row Precision (ZXCVBNM)',
    description: 'Downward angle reach to bottom keys with stable wrist anchoring.',
    language: 'english',
    category: 'bottom_row',
    targetWpm: 30,
    targetAccuracy: 95,
    content: 'zxcv bnm zxcv bnm zoom zinc calm vein exam menu neck back pack calm next zero mix cave vibe zone lock pack vine move comb make zone vane cab zinc zoom exam menu neck back pack calm next zero vibe mix lock'
  },
  {
    id: 'en-vocab-01',
    title: 'Lesson 5: Essential Office & Vocational Vocabulary',
    description: 'High-frequency vocational words used in administration, accounts, and IT.',
    language: 'english',
    category: 'vocabulary',
    targetWpm: 38,
    targetAccuracy: 97,
    content: 'computer system software document management official letter report account balance invoice receipt meeting agenda office assistant vocational training institute examination result student progress record qualification attendance register speed accuracy professional competency certificate'
  },
  {
    id: 'en-vti-01',
    title: 'Lesson 6: VTI Official Administrative Test Passage',
    description: 'Standard typing test passage evaluated for vocational certification.',
    language: 'english',
    category: 'vocational',
    targetWpm: 40,
    targetAccuracy: 98,
    content: 'Vocational training institutes provide critical technical education to empower youth across the nation. Developing proficient typing skills with high accuracy and sustained speed is an indispensable requirement for modern administrative positions, data entry specialists, and executive assistants. Regular daily practice on home row ergonomics enhances finger dexterity, reduces fatigue, and ensures pristine documentation standards across all digital workstations.'
  },
  {
    id: 'en-exam-01',
    title: 'Lesson 7: State Civil Service & Speed Certification Exam',
    description: 'Long-form official benchmark test modeled on public sector typing tests.',
    language: 'english',
    category: 'exam_passages',
    targetWpm: 45,
    targetAccuracy: 98,
    content: 'The rapid expansion of information technology has transformed institutional workflows in government and private organizations alike. Speed combined with uncompromising accuracy remains the cornerstone of professional computing. A competent typist maintains an upright posture, eyes fixed consistently on the source draft rather than the keyboard, and establishes a fluid rhythmic cadence. Diligent trainees who master both accuracy and endurance within thirty to sixty minute sessions routinely achieve distinction in national vocational evaluations, opening pathways to dignified career advancement and productive industrial employment.'
  },

  // ================= URDU LESSONS =================
  {
    id: 'ur-home-01',
    title: 'سبق ۱: اردو ہوم رو حروف (ا س د ف گ ہ ج ک ل)',
    titleUrdu: 'سبق ۱: اردو ہوم رو حروف (ا س د ف گ ہ ج ک ل)',
    description: 'اردو فونیک کی بورڈ پر بنیادی ہوم رو کیز کی مشق اور انگلیوں کا درست مقام۔',
    language: 'urdu',
    category: 'home_row',
    targetWpm: 20,
    targetAccuracy: 95,
    content: 'ا س د ف گ ہ ج ک ل ا س د ف گ ہ ج ک ل اس اد کل فگ دل گل ہل سج دس کس لد فل گل سل اس اد کل فگ دل گل ہل سج دس کس لد فل گل سل ا س د ف گ ہ ج ک ل'
  },
  {
    id: 'ur-basic-02',
    title: 'سبق ۲: حروفِ تہجی بنیادی روانی',
    titleUrdu: 'سبق ۲: حروفِ تہجی بنیادی روانی',
    description: 'اردو حروف کی مکمل شناخت اور فونیک کی بورڈ پر تیز رفتار رسائی۔',
    language: 'urdu',
    category: 'home_row',
    targetWpm: 22,
    targetAccuracy: 95,
    content: 'الف بے پے تے ٹے ثے جیم چے حے خے دال ڈال ذال رے ڑے زے ژے سین شین صاد ضاد طوئے زوئے عین غین فے قاف کاف گاف لام میم نون واؤ ہے ہمزہ چھوٹی یے بڑی یے'
  },
  {
    id: 'ur-words-01',
    title: 'سبق ۳: روزمرہ الفاظ اور دفتری اصطلاحات',
    titleUrdu: 'سبق ۳: روزمرہ الفاظ اور دفتری اصطلاحات',
    description: 'دفتری اور تعلیمی ماحول میں بکثرت استعمال ہونے والے عام الفاظ کی مشق۔',
    language: 'urdu',
    category: 'vocabulary',
    targetWpm: 28,
    targetAccuracy: 96,
    content: 'سلام شکریہ کام محنت وقت کتاب قلم دفتر کاغد نوکری درخواست حاضری تنخواہ کمپیوٹر رپورٹ سند تربیت ادارہ طلبہ استاد امتحانات کامیابی مستقل مزاجی پیشہ ورانہ مہارت قومی ترقی'
  },
  {
    id: 'ur-vti-01',
    title: 'سبق ۴: وی ٹی آئی پیشہ ورانہ دفتری خط و کتابت',
    titleUrdu: 'سبق ۴: وی ٹی آئی پیشہ ورانہ دفتری خط و کتابت',
    description: 'سرکاری خطوط، دفتری یادداشت اور پیشہ ورانہ دستاویزات کے لیے منتخب متن۔',
    language: 'urdu',
    category: 'vocational',
    targetWpm: 32,
    targetAccuracy: 97,
    content: 'پیشہ ورانہ تربیتی ادارے نوجوانوں کو جدید فنی علوم سے آراستہ کر کے ملک و قوم کی معاشی ترقی میں ریڑھ کی ہڈی کا کردار ادا کرتے ہیں۔ اردو اور انگریزی دونوں زبانوں میں کمپیوٹر ٹائپنگ کی تیز رفتار اور بے عیب مہارت ہر دفتری ملازم، کمپیوٹر آپریٹر اور ڈیٹا انٹری اسپیشلسٹ کے لیے بنیادی شرط ہے۔ روزانہ باقاعدہ مشق کے ذریعے درستگی اور رفتار میں مسلسل اضافہ ممکن ہے۔'
  },
  {
    id: 'ur-exam-01',
    title: 'سبق ۵: بانی پاکستان قائد اعظم کا پیغام اور امتحان',
    titleUrdu: 'سبق ۵: بانی پاکستان قائد اعظم کا پیغام اور امتحان',
    description: 'وی ٹی آئی سالانہ اسپیڈ ٹیسٹ اور سرٹیفیکیشن کے لیے جامع امتحانی پیراگراف۔',
    language: 'urdu',
    category: 'exam_passages',
    targetWpm: 35,
    targetAccuracy: 98,
    content: 'قائد اعظم محمد علی جناح نے ہمیشہ محنت، دیانت اور مستقل مزاجی پر زور دیا۔ انہوں نے نوجوانوں کو مخاطب کرتے ہوئے فرمایا کہ کام، کام اور بس کام کرو تاکہ پاکستان کو دنیا کے ترقی یافتہ ممالک کی صف میں کھڑا کیا جا سکے۔ جدید دور میں وقت کی قدر اور ڈیجیٹل مہارتوں کا حصول کامیابی کی کلید ہے۔ جو طالب علم لگن اور دیانت داری سے اپنی فنی صلاحیتوں کو نکھارتا ہے، وہ عملی زندگی میں کبھی ناکام نہیں ہوتا۔'
  },
  {
    id: 'ur-exam-02',
    title: 'سبق ۶: شاعرِ مشرق علامہ اقبال کا فکری پیغام',
    titleUrdu: 'سبق ۶: شاعرِ مشرق علامہ اقبال کا فکری پیغام',
    description: 'طویل مدتی سیشن (۱۰ سے ۶۰ منٹ) کے لیے فکری اور ادبی رفتار پیراگراف۔',
    language: 'urdu',
    category: 'exam_passages',
    targetWpm: 35,
    targetAccuracy: 97,
    content: 'علامہ محمد اقبال نے خودی کی بیداری اور مسلسل جدوجہد کو انسان کی معراج قرار دیا۔ ان کے نزدیک زندگی کا اصل حسن حرکت اور عمل میں پوشیدہ ہے۔ ستاروں سے آگے جہاں اور بھی ہیں، ابھی عشق کے امتحان اور بھی ہیں۔ انسان جب اپنے ہدف کے حصول کے لیے تن من دھن سے جٹ جاتا ہے تو تقدیر کے فیصلے بھی اس کی ہمت اور عزم کے تابع ہو جاتے ہیں۔ خود اعتمادی، جہدِ مسلسل اور پاکیزہ ارادے قوموں کی تقدیر بدل دیتے ہیں۔'
  }
];

export const DURATION_OPTIONS = [
  { label: '2 Minutes', labelUrdu: '۲ منٹ', seconds: 120, minutes: 2 },
  { label: '3 Minutes', labelUrdu: '۳ منٹ', seconds: 180, minutes: 3 },
  { label: '5 Minutes', labelUrdu: '۵ منٹ', seconds: 300, minutes: 5 },
  { label: '10 Minutes', labelUrdu: '۱۰ منٹ', seconds: 600, minutes: 10 },
  { label: '15 Minutes', labelUrdu: '۱۵ منٹ', seconds: 900, minutes: 15 },
  { label: '20 Minutes', labelUrdu: '۲۰ منٹ', seconds: 1200, minutes: 20 },
  { label: '30 Minutes', labelUrdu: '۳۰ منٹ', seconds: 1800, minutes: 30 },
  { label: '45 Minutes', labelUrdu: '۴۵ منٹ', seconds: 2700, minutes: 45 },
  { label: '60 Minutes', labelUrdu: '۶۰ منٹ (مکمل گھنٹہ)', seconds: 3600, minutes: 60 },
];
