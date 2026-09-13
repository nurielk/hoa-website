import { NavItem, FeatureItem, TargetAudience, PricingPlan, Testimonial, FaqItem } from '../types';

export const contentData = {
  he: {
    siteTitle: 'DayarPlus - האפליקציה המתקדמת לניהול הבניין',
    nav: [
      { id: 'features', label: 'תכונות' },
      { id: 'solutions', label: 'למי זה מתאים' },
      { id: 'calculator', label: 'מחשבון חיסכון' },
      { id: 'pricing', label: 'מסלולים ומחירים' },
      { id: 'testimonials', label: 'המלצות' },
      { id: 'faq', label: 'שאלות נפוצות' },
    ] as NavItem[],
    buttons: {
      login: 'התחברות למערכת',
      startTrial: 'התחלת ניסיון חינם',
      scheduleDemo: 'תיאום הדגמה',
      calculateNow: 'חשב חיסכון',
      selectPlan: 'בחר במסלול זה',
      contactUs: 'דברו איתנו',
      close: 'סגור',
      submit: 'שלח לבדיקה',
    },
    hero: {
      badge: '✨ הפלטפורמה המובילה בישראל לניהול ועד בית ובניינים',
      title: 'הדרך החכמה, הפשוטה והבטוחה לניהול הבניין שלך',
      subtitle: 'מערכת DayarPlus מרכזת גביית תשלומים באשראי, מעקב פיננסי בזמן אמת, ניהול תקלות וספקים, הצבעות דיגיטליות ותקשורת עם הדיירים – הכל באפליקציה אחת נוחה.',
      highlights: [
        '100% שקיפות פיננסית',
        'גבייה אוטומטית בוואטסאפ',
        'תקן אבטחה מחמיר PCI-DSS',
        'תמיכה מלאה בהוראת קבע'
      ],
      stats: [
        { label: 'בניינים פעילים', value: '550+' },
        { label: 'אחוזי גבייה ממוצעים', value: '99.2%' },
        { label: 'שעות שנחסכו לועד בחודש', value: '18h' },
        { label: 'דירוג שביעות רצון', value: '4.9/5' }
      ]
    },
    appMockup: {
      title: 'לוח בקרה דיגיטלי - בניין רוטשילד 45',
      month: 'יולי 2026',
      duesCollected: '₪38,400',
      targetDues: '₪38,400',
      collectionPercentage: '100%',
      activeTickets: 2,
      pendingVotes: 1,
      recentTransactions: [
        { name: 'משפחת כהן - דירה 12', amount: '₪450', status: 'שולם באשראי', time: 'לפני 10 דקות' },
        { name: 'משפחת לוי - דירה 4', amount: '₪450', status: 'הוראת קבע', time: 'לפני שעתיים' },
        { name: 'חברת שירות מעליות', amount: '-₪1,200', status: 'הוצאה מאושרת', time: 'אתמול' }
      ],
      activeTicketTitle: 'תיקון תאורת חירום בקומה 3',
      activeTicketStatus: 'בטיפול ספק - מעלית שירות',
      activeVoteTitle: 'אישור התקנת עמדות טעינה לרכב חשמלי',
      activeVoteStatus: '85% הצביעו בעד (נותרו 2 ימים)'
    },
    solutions: {
      title: 'פתרון מותאם אישית לכל סוג בניין',
      subtitle: 'בין אם אתם ועד בית עצמאי שרוצה לחסוך זמן ובין אם חברת ניהול המנהלת עשרות מתחמים',
      tabVaad: 'לועד בית עצמאי',
      tabManagement: 'לחברות ניהול מבנים',
      vaad: {
        id: 'vaad',
        title: 'פשוט, נוח ובלי כאבי ראש לועד הבית',
        subtitle: 'הפסיקו לרדוף אחרי דיירים עם מזומן ושיקים. DayarPlus מחליפה את ניהול הניירות והמחשבונים במערכת אוטומטית שעובדת בשבילכם.',
        icon: 'Building2',
        highlights: [
          'תשלום דמי ועד בלחיצת כפתור באשראי, ביט או הוראת קבע',
          'תזכורות אוטומטיות בוואטסאפ ובסמס לדיירים באיחור',
          'הפקת קבלות ואישורים חתומים דיגיטלית באופן מיידי',
          'דיווח תקלות עם תמונות וסטטוס עדכון בזמן אמת לכל הבניין',
          'סקרים והצבעות דיגיטליות עם תוקף משפטי להחלטות ועד'
        ],
        ctaText: 'התחילו לנהל את הבניין בקלות'
      } as TargetAudience,
      management: {
        id: 'management',
        title: 'שליטה מלאה, יעילות תפעולית ומגדילת רווחיות',
        subtitle: 'פלטפורמת enterprise רבת-בניינים המאפשרת למנהלי תיקים לשלוט בעשרות בניינים מלוח בקרה אחד מרכזי.',
        icon: 'Building',
        highlights: [
          'דשבורד מרכזי לניהול עשרות מכלולי מגורים ומגדלים',
          'סנכרון מלא עם מערכות הנהלת חשבונות וייצוא דוחות קליק אחד',
          'מערכת ניהול ספקים, קריאות שירות, הצעות מחיר ופקודות עבודה',
          'אזור אישי ממותג לדיירים עם לוגו וצבעי חברת הניהול',
          'תקשורת כרוז וחירום בלחיצת כפתור לכל דיירי הפורטפוליו'
        ],
        ctaText: 'דברו עם צוות המכירות לחברות ניהול'
      } as TargetAudience
    },
    features: {
      title: 'כל מה שהבניין שלך צריך - במקום אחד',
      subtitle: 'כלים מתקדמים שנבנו במיוחד עבור צרכי ניהול הבניין המודרני',
      items: [
        {
          id: 'payments',
          iconName: 'CreditCard',
          title: 'גבייה דיגיטלית וסליקה אוטומטית',
          description: 'מגוון אפיקי תשלום: אשראי, Apple Pay, Google Pay והוראות קבע. הגבייה מגיעה ישירות לחשבון הבניין.',
          badge: '99.2% אחוזי גבייה',
          benefits: ['תזכורות וואטסאפ אוטומטיות', 'קבלות דיגיטליות לצו מס', 'סליקה בטוחה בתקן PCI']
        },
        {
          id: 'finance',
          iconName: 'PieChart',
          title: 'מעקב פיננסי ודוחות בזמן אמת',
          description: 'שקיפות מלאה לכל הדיירים והועד. ניהול תקציב שנתי, מעקב הכנסות והוצאות, וייצוא דוחות לרואה חשבון.',
          badge: 'שקיפות 100%',
          benefits: ['דוח רווח והפסד בלחיצה', 'מעקב יתרות בנק', 'קטגוריזציה אוטומטית']
        },
        {
          id: 'tickets',
          iconName: 'Wrench',
          title: 'ניהול תקלות וספקים',
          description: 'דיירים מדווחים על תקלות עם תמונות. הועד משייך לספק מורשה ועוקב אחר התיקון עד לסגירה מוצלחת.',
          badge: 'טיפול מהיר פי 3',
          benefits: ['צילום תמונות מהאפליקציה', 'שיוך ספקים אוטומטי', 'עדכון דיירים בזמן אמת']
        },
        {
          id: 'voting',
          iconName: 'Vote',
          title: 'הצבעות וסקרים דיגיטליים',
          description: 'קבלו החלטות בניין במהירות ללא צורך באספות מייגעות. הצבעות מאובטחות עם שיוך לבעלי דירות.',
          badge: 'תוקף משפטי',
          benefits: ['ספירת קולות אוטומטית', 'תיעוד החלטות בארכיון', 'התראות הצבעה לכל דייר']
        },
        {
          id: 'perks',
          iconName: 'Gift',
          title: 'מועדון הטבות וחיסכון לדיירים',
          description: 'דיירי בנייני DayarPlus נהנים ממועדון הטבות בלעדי: הנחות בביטוח דירה, שירותי ניקיון, חומרי הדברה ואינטרנט.',
          badge: 'ערך מוסף לדיירים',
          benefits: ['הנחות בביטוח מבנה', 'ספקים נבחרים במחיר מוזל', 'מבצעים חודשיים משתנים']
        },
        {
          id: 'booking',
          iconName: 'CalendarCheck',
          title: 'הזמנת מתקנים משותפים',
          description: 'ניהול חדר כושר, מועדון דיירים, גג משותף או עמדות טעינה בצורה מסודרת עם יומן פגישות דיגיטלי.',
          badge: 'סדר וארגון',
          benefits: ['יומן זמינות בזמן אמת', 'תשלום דמי שימוש/פיקדון', 'מניעת כפילויות בהזמנה']
        }
      ] as FeatureItem[]
    },
    calculator: {
      title: 'מחשבון חיסכון ויעילות לבניין',
      subtitle: 'בדוק כמה זמן וכסף מערכת DayarPlus יכולה לחסוך לבניין שלך מדי חודש',
      apartmentsLabel: 'מספר דירות בבניין:',
      duesLabel: 'דמי ועד בית חודשיים לדירה (₪):',
      resultsTitle: 'תוצאות החיסכון המשוערות לבניין שלך:',
      monthlyRevenue: 'סה"כ גבייה חודשית פוטנציאלית:',
      recoveredRevenue: 'תוספת גבייה חודשית משוערת (+15% בזכות גבייה דיגיטלית):',
      hoursSaved: 'שעות עבודה שנחסכות לועד בחודש:',
      yearlySavings: 'חיסכון כספי כולל בשנה למשק הבית של הבניין:'
    },
    pricing: {
      title: 'מסלולים שקופים ללא אותיות קטנות',
      subtitle: 'בחרו את המסלול המתאים לגודל ואופי הבניין שלכם',
      monthly: 'תשלום חודשי',
      yearly: 'תשלום שנתי (חודשיים מתנה! 🎁)',
      plans: [
        {
          id: 'basic',
          name: 'מסלול בסיסי',
          tagline: 'מתאים לבניינים קטנים עד 12 דירות',
          priceMonthly: '₪99',
          priceYearly: '₪79',
          features: [
            'גבייה באשראי וביט',
            'עד 12 דירות בבניין',
            'אפליקציה לדיירים ולועד',
            'דיווח תקלות בסיסי',
            'תמיכה במייל ובוואטסאפ'
          ],
          cta: 'התחל ניסיון חינם'
        },
        {
          id: 'pro',
          name: 'מסלול פרימיום ועד',
          tagline: 'המסלול הפופולרי ביותר לבנייני מגורים',
          priceMonthly: '₪199',
          priceYearly: '₪159',
          isPopular: true,
          features: [
            'כל תכונות המסלול הבסיסי',
            'ללא הגבלת מספר דירות',
            'תזכורות אוטומטיות בוואטסאפ',
            'הצבעות וסקרים דיגיטליים',
            'ניהול ספקים והזמנת מתקנים',
            'מועדון הטבות בלעדי לדיירים',
            'מנהל תיק לקוח אישי'
          ],
          cta: 'התחל ניסיון פרימיום'
        },
        {
          id: 'enterprise',
          name: 'חברות ניהול ומגדלים',
          tagline: 'פתרון מותאם אישית לפורטפוליו בניינים',
          priceMonthly: 'בהתאמה אישית',
          priceYearly: 'בהתאמה אישית',
          features: [
            'דשבורד רב-בנייני מרכזי',
            'סנכרון מלא למערכות ERP/חשבוניות',
            'מיתוג מלא בגרפיקת חברת הניהול',
            'מערכת הרשאות מתקדמת לעובדים',
            'הסכם SLA ותמיכה 24/7',
            'הדרכה והטמעה באתר הלקוח'
          ],
          cta: 'צור קשר להצעת מחיר'
        }
      ] as PricingPlan[]
    },
    testimonials: {
      title: 'מה אומרים עלינו ראשי ועד ומנהלים',
      subtitle: 'מאות בניינים בישראל כבר עברו לנהל את הבניין עם DayarPlus',
      items: [
        {
          id: '1',
          quote: 'מאז שעברנו ל-DayarPlus אחוזי הגבייה בבניין עלו מ-70% ל-100%! התזכורות האוטומטיות בוואטסאפ חוסכות לי עשרות שיחות טלפון מביכות בחודש.',
          author: 'אביבי גולן',
          role: 'יו"ר ועד בית (36 דירות)',
          building: 'מגדלי סביון',
          city: 'תל אביב',
          rating: 5,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        },
        {
          id: '2',
          quote: 'כחברת ניהול שמנהלת 40 בניינים, DayarPlus שינתה לנו את המשחק. הדשבורד המרכזי מאפשר לנו לנהל את כל הקריאות והגבייה במקום אחד ביעילות מטורפת.',
          author: 'רונן כץ',
          role: 'מנכ"ל חברת ניהול אורבניקס',
          building: 'ניהול 40 בניינים',
          city: 'רמת גן',
          rating: 5,
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
        },
        {
          id: '3',
          quote: 'הדיירים מרוצים בטירוף מהיכולת לשלם באפל פיי ולראות שקיפות מלאה איפה כל שקל מושקע. ההצבעות הדיגיטליות פתרו לנו מחלוקות בשניות.',
          author: 'מיכל שרון',
          role: 'חברת ועד בית',
          building: 'בניין שרת 18',
          city: 'הרצליה',
          rating: 5,
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
        }
      ] as Testimonial[]
    },
    faq: {
      title: 'שאלות נפוצות',
      subtitle: 'כל מה שרציתם לדעת על העברת הבניין למערכת DayarPlus',
      items: [
        {
          id: 'faq-1',
          question: 'כמה זמן לוקח להקים ולצרף את הבניין למערכת?',
          answer: 'הקמת הבניין אורכת פחות מ-10 דקות! אתם מעלים רשימת דיירים (אפילו מקובץ אקסל), והמערכת שולחת הודעת הצטרפות אוטומטית לכל הדיירים עם קישור ישיר.',
          category: 'general'
        },
        {
          id: 'faq-2',
          question: 'האם התשלומים באשראי בטוחים ואיפה הכסף נשמר?',
          answer: 'התשלומים מבוצעים בתקן האבטחה המחמיר ביותר PCI-DSS Level 1. הכסף נגבה ומועבר ישירות לחשבון הבנק הרשמי של ועד הבית / חברת הניהול ללא גורם שלישי.',
          category: 'payments'
        },
        {
          id: 'faq-3',
          question: 'מה קורה אם חלק מהדיירים קשישים או לא טכנולוגיים?',
          answer: 'המערכת תומכת גם בהזנת תשלומים ידנית (שיקים, מזומן, העברות בנקאיות). הועד יכול להפיק להם קבלה דיגיטלית בלחיצת כפתור ולשמור על רישום מלא.',
          category: 'vaad'
        },
        {
          id: 'faq-4',
          question: 'האם יש התחייבות לתקופה ארוכה?',
          answer: 'ממש לא! ניתן לבטל את המנוי בכל עת ללא קנסות או התחייבות. אנחנו מאמינים שהאיכות והשירות שלנו יגרמו לכם להישאר.',
          category: 'general'
        },
        {
          id: 'faq-5',
          question: 'האם ניתן לייצא דוחות לרואה חשבון או לעורך דין?',
          answer: 'כן, המערכת כוללת מחולל דוחות מתקדם המאפשר לייצא דוחות חובות, מאזן הכנסות והוצאות ויומן קבלות בפורמט Excel או PDF.',
          category: 'management'
        }
      ] as FaqItem[]
    },
    modal: {
      title: 'תיאום הדגמה וניסיון חינם ל-14 יום',
      subtitle: 'מלאו את הפרטים ונציג שלנו יחזור אליכם תוך שעה עם חשבון ניסיון מותאם לבניין שלכם',
      nameLabel: 'שם מלא:',
      phoneLabel: 'מספר טלפון:',
      emailLabel: 'דוא"ל:',
      roleLabel: 'תפקיד בבניין:',
      roleVaad: 'חבר ועד בית',
      roleResident: 'דייר בבניין',
      roleManagement: 'מנהל / נציג חברת ניהול',
      apartmentsLabel: 'מספר דירות בבניין:',
      notesLabel: 'הערות או בקשות מיוחדות:',
      successMsg: 'תודה! הפרטים התקבלו בהצלחה. נציג DayarPlus יצור עמך קשר בהקדם.'
    },
    footer: {
      tagline: 'מערכת DayarPlus – העתיד של ניהול הבניינים בישראל.',
      rights: '© 2026 DayarPlus Management Systems Ltd. כל הזכויות שמורות.',
      accessibility: 'הצהרת נגישות',
      privacy: 'מדיניות פרטיות',
      terms: 'תנאי שימוש',
      contactPhone: '077-1234567',
      contactEmail: 'support@dayarplus.co.il'
    }
  },
  en: {
    siteTitle: 'DayarPlus - Smart Building Management Platform',
    nav: [
      { id: 'features', label: 'Features' },
      { id: 'solutions', label: 'Solutions' },
      { id: 'calculator', label: 'ROI Calculator' },
      { id: 'pricing', label: 'Pricing' },
      { id: 'testimonials', label: 'Testimonials' },
      { id: 'faq', label: 'FAQ' },
    ] as NavItem[],
    buttons: {
      login: 'System Login',
      startTrial: 'Start Free Trial',
      scheduleDemo: 'Schedule Demo',
      calculateNow: 'Calculate Savings',
      selectPlan: 'Select Plan',
      contactUs: 'Contact Us',
      close: 'Close',
      submit: 'Submit Request',
    },
    hero: {
      badge: '✨ Leading DayarPlus & Building Management Platform',
      title: 'The Smart, Simple & Secure Way to Manage Your Building',
      subtitle: 'DayarPlus consolidates credit card payments, real-time financial tracking, maintenance ticket dispatch, digital voting, and resident communications into one intuitive app.',
      highlights: [
        '100% Financial Transparency',
        'Automated WhatsApp Reminders',
        'Bank-grade PCI-DSS Security',
        'Full Auto-Pay & Direct Debit'
      ],
      stats: [
        { label: 'Active Buildings', value: '550+' },
        { label: 'Average Collection Rate', value: '99.2%' },
        { label: 'Monthly Hours Saved', value: '18h' },
        { label: 'Satisfaction Rating', value: '4.9/5' }
      ]
    },
    appMockup: {
      title: 'Digital Control Center - Rothschild 45 Tower',
      month: 'July 2026',
      duesCollected: '$12,800',
      targetDues: '$12,800',
      collectionPercentage: '100%',
      activeTickets: 2,
      pendingVotes: 1,
      recentTransactions: [
        { name: 'Apt 12 - Cohen Family', amount: '$150', status: 'Credit Card Paid', time: '10 mins ago' },
        { name: 'Apt 4 - Levy Family', amount: '$150', status: 'Auto-Pay Direct', time: '2 hours ago' },
        { name: 'Elevator Maintenance Co', amount: '-$400', status: 'Approved Expense', time: 'Yesterday' }
      ],
      activeTicketTitle: 'Emergency Lighting Repair - Floor 3',
      activeTicketStatus: 'In Progress by Contractor',
      activeVoteTitle: 'EV Charging Station Installation Approval',
      activeVoteStatus: '85% Voted YES (2 days left)'
    },
    solutions: {
      title: 'Tailored Solutions for Every Building Type',
      subtitle: 'Whether you are a self-managed building board seeking time savings or a professional management company overseeing 50+ properties.',
      tabVaad: 'For Self-Managed Building Boards',
      tabManagement: 'For Property Management Companies',
      vaad: {
        id: 'vaad',
        title: 'Hassle-Free Management for Building Board Members',
        subtitle: 'Stop chasing residents for cash and cheques. DayarPlus replaces paperwork and spreadsheets with an automated system that handles dues for you.',
        icon: 'Building2',
        highlights: [
          'Instant digital payment via Credit Card, Apple Pay & Direct Debit',
          'Automated WhatsApp & SMS reminders for overdue accounts',
          'Immediate digitally signed receipts compliant with tax rules',
          'Photo-based issue reporting with real-time progress updates',
          'Legally compliant digital surveys and board resolution voting'
        ],
        ctaText: 'Start Managing Your Board Effortlessly'
      } as TargetAudience,
      management: {
        id: 'management',
        title: 'Total Control, Operational Scale & Profit Expansion',
        subtitle: 'Enterprise multi-property platform enabling portfolio managers to control dozens of buildings from a single dashboard.',
        icon: 'Building',
        highlights: [
          'Centralized control dashboard for residential towers & complexes',
          '1-click accounting sync and ERP data exports',
          'Contractor dispatch, purchase orders, and maintenance workflows',
          'White-labeled resident portal customized with your corporate branding',
          '1-click broadcast alerts and emergency announcements across portfolio'
        ],
        ctaText: 'Speak with Management Enterprise Team'
      } as TargetAudience
    },
    features: {
      title: 'Everything Your Building Needs - All In One Place',
      subtitle: 'Advanced tools built specifically for modern community living and property management.',
      items: [
        {
          id: 'payments',
          iconName: 'CreditCard',
          title: 'Digital Dues & Auto Billing',
          description: 'Accept Credit Cards, Apple Pay, Google Pay and Direct Debit. Funds go straight to the official building bank account.',
          badge: '99.2% Collection Rate',
          benefits: ['Automated WhatsApp reminders', 'Digital tax-compliant receipts', 'PCI-DSS certified security']
        },
        {
          id: 'finance',
          iconName: 'PieChart',
          title: 'Real-Time Financial Dashboard',
          description: 'Complete transparency for residents and board members. Annual budgeting, expense categorization, and instant PDF/Excel reports.',
          badge: '100% Transparency',
          benefits: ['Instant P&L reports', 'Bank balance synchronization', 'Automated ledger categorization']
        },
        {
          id: 'tickets',
          iconName: 'Wrench',
          title: 'Maintenance & Vendor Dispatch',
          description: 'Residents snap photos of faults. The board assigns qualified vendors and tracks repairs to verified completion.',
          badge: '3x Faster Repairs',
          benefits: ['In-app photo capture', 'Automatic vendor routing', 'Live resident updates']
        },
        {
          id: 'voting',
          iconName: 'Vote',
          title: 'Digital Voting & Surveys',
          description: 'Make building decisions fast without endless meetings. Secure digital voting tied directly to verified unit ownership.',
          badge: 'Legally Valid',
          benefits: ['Automated vote tallying', 'Archived meeting resolution logs', 'Push notifications for pending votes']
        },
        {
          id: 'perks',
          iconName: 'Gift',
          title: 'Resident Perks & Savings Club',
          description: 'DayarPlus residents enjoy exclusive discounts on home insurance, cleaning services, pest control, and high-speed internet.',
          badge: 'Added Resident Value',
          benefits: ['Discounted property insurance', 'Vetted home service vendors', 'Monthly exclusive deals']
        },
        {
          id: 'booking',
          iconName: 'CalendarCheck',
          title: 'Shared Amenity Booking',
          description: 'Easily manage resident reservations for the gym, community hall, rooftop terrace, or EV chargers.',
          badge: 'Zero Conflicts',
          benefits: ['Real-time slot calendar', 'Deposit & fee integration', 'Conflict-free scheduling']
        }
      ] as FeatureItem[]
    },
    calculator: {
      title: 'Building Savings & ROI Calculator',
      subtitle: 'See how much time and money DayarPlus System saves your building every month.',
      apartmentsLabel: 'Number of apartments in building:',
      duesLabel: 'Monthly dues per apartment ($):',
      resultsTitle: 'Estimated Savings & ROI for Your Building:',
      monthlyRevenue: 'Total Monthly Dues Potential:',
      recoveredRevenue: 'Estimated Recovered Dues (+15% boost via digital collections):',
      hoursSaved: 'Monthly Hours Saved for Board Members:',
      yearlySavings: 'Total Annual Community Savings:'
    },
    pricing: {
      title: 'Transparent Pricing, No Hidden Fees',
      subtitle: 'Select the ideal plan tailored to your building size and operational model.',
      monthly: 'Monthly Billing',
      yearly: 'Annual Billing (2 Months Free! 🎁)',
      plans: [
        {
          id: 'basic',
          name: 'Basic Plan',
          tagline: 'Ideal for small buildings up to 12 units',
          priceMonthly: '$29',
          priceYearly: '$24',
          features: [
            'Credit card & digital payments',
            'Up to 12 apartments included',
            'Resident & Board mobile app',
            'Basic maintenance ticketing',
            'Email & Chat support'
          ],
          cta: 'Start Free Trial'
        },
        {
          id: 'pro',
          name: 'Pro Board Plan',
          tagline: 'Most popular for residential communities',
          priceMonthly: '$59',
          priceYearly: '$49',
          isPopular: true,
          features: [
            'Everything in Basic',
            'Unlimited apartment units',
            'Automated WhatsApp reminders',
            'Digital voting & survey tools',
            'Vendor dispatch & amenity booking',
            'Exclusive Resident Perks Club',
            'Dedicated Account Manager'
          ],
          cta: 'Start Pro Trial'
        },
        {
          id: 'enterprise',
          name: 'Management Companies',
          tagline: 'Tailored enterprise suite for property managers',
          priceMonthly: 'Custom Quote',
          priceYearly: 'Custom Quote',
          features: [
            'Multi-building central dashboard',
            'Full ERP & accounting API sync',
            'White-labeled portal branding',
            'Granular staff permission roles',
            'Guaranteed SLA & 24/7 priority support',
            'On-site staff onboarding'
          ],
          cta: 'Contact Sales'
        }
      ] as PricingPlan[]
    },
    testimonials: {
      title: 'Trusted by Board Members & Property Managers',
      subtitle: 'Over 500 communities rely on DayarPlus to streamline their building operations.',
      items: [
        {
          id: '1',
          quote: 'Since switching to DayarPlus, our collection rate shot up from 70% to 100%! The automatic WhatsApp reminders save me from awkward phone calls every month.',
          author: 'David Ben-David',
          role: 'Building Board President (36 units)',
          building: 'Grand Tower Community',
          city: 'Tel Aviv',
          rating: 5,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
        },
        {
          id: '2',
          quote: 'As a management firm overseeing 40 properties, DayarPlus transformed our business. Managing all vendor dispatches and financials in one centralized hub is incredible.',
          author: 'Ron K.',
          role: 'CEO, Urbanix Property Mgmt',
          building: '40 Property Portfolio',
          city: 'Ramat Gan',
          rating: 5,
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
        },
        {
          id: '3',
          quote: 'Residents love paying via Apple Pay and having total visibility on building funds. Digital voting resolved several long-standing building debates effortlessly.',
          author: 'Rachel S.',
          role: 'Board Treasurer',
          building: 'Sharon Heights',
          city: 'Herzliya',
          rating: 5,
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
        }
      ] as Testimonial[]
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common questions about onboarding your building to DayarPlus.',
      items: [
        {
          id: 'faq-1',
          question: 'How long does it take to set up our building?',
          answer: 'Setup takes under 10 minutes! Upload your resident roster (or import from Excel), and the system automatically sends invitation links to all residents.',
          category: 'general'
        },
        {
          id: 'faq-2',
          question: 'How secure is automated credit card collection?',
          answer: 'All payments meet PCI-DSS Level 1 security standards. Funds flow directly into your official building bank account with no third-party delays.',
          category: 'payments'
        },
        {
          id: 'faq-3',
          question: 'What if some residents prefer paying by cash or bank transfer?',
          answer: 'DayarPlus supports manual payment logging. Board members can record cash/checks in one click and issue digital receipts automatically.',
          category: 'vaad'
        },
        {
          id: 'faq-4',
          question: 'Is there a long-term contract requirement?',
          answer: 'No long-term commitments! You can cancel or change your plan at any time without penalties.',
          category: 'general'
        },
        {
          id: 'faq-5',
          question: 'Can we export financial reports for our accountant or legal counsel?',
          answer: 'Yes! The system includes an advanced report generator for exporting balance sheets, arrears reports, and ledger logs in Excel or PDF.',
          category: 'management'
        }
      ] as FaqItem[]
    },
    modal: {
      title: 'Request a Demo & 14-Day Free Trial',
      subtitle: 'Fill in your building details and our specialist will set up your custom sandbox account within 1 hour.',
      nameLabel: 'Full Name:',
      phoneLabel: 'Phone Number:',
      emailLabel: 'Email Address:',
      roleLabel: 'Your Role:',
      roleVaad: 'Building Board Member',
      roleResident: 'Resident',
      roleManagement: 'Property Management Representative',
      apartmentsLabel: 'Apartment Count in Building:',
      notesLabel: 'Special Requirements / Notes:',
      successMsg: 'Thank you! Your request has been received. A DayarPlus specialist will reach out shortly.'
    },
    footer: {
      tagline: 'DayarPlus – The Future of Community & Building Management.',
      rights: '© 2026 DayarPlus Management Systems Ltd. All rights reserved.',
      accessibility: 'Accessibility Statement',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      contactPhone: '+972-77-1234567',
      contactEmail: 'support@dayarplus.co.il'
    }
  }
};
