/**
 * Feature Toggles Configuration
 * Allows easy enabling/disabling of any of the features without breaking existing functionality.
 */
export const FEATURES_CONFIG = {
  darkMode: true,            // 1. מצב כהה ובהיר
  slimHeader: true,          // 2. כותרת דקיקה ובאנר עליון
  mobileMenu: true,          // 3. תפריט נייד מתקדם
  richHoverStates: true,     // 4. מצבי הוואר ומיקרו-אינטראקציות
  smoothScrollSequence: true,// 5. סלול עם רצף ומחוון התקדמות גלילה
  backToTop: true,           // 6. כפתור חזרה לראש
  loadingStates: true,       // 7. מצבי טעינה ושלדים (Skeletons & Spinners)
  globalSearch: true,        // 8. חיפוש מהיר גלובלי (Ctrl+K)
  skipToContent: true,       // 9. החלקה ודילוג לתוכן נגיש
  floatingContactHub: true,  // 10. כפתור קשר צף רב-ערוצי
  faqAccordion: true,        // 11. קטע שאלות נפוצות מורחב עם קטגוריות
  announcementsSection: false,// 12. סעיף הודעות ועדכוני מערכת (מוסתר כרגע)
  newsletterForm: false,      // 13. הרשמה לעלון חדשות (מוסתר כרגע)
  interactiveCounter: true,  // 14. כפתור סופר ומונה מעורבות
  couponBanner: true,        // 15. באנר קופון ומבצע
  cookieConsent: true,       // 16. תג ובאנר קוקיז
  confirmModals: true,       // 17. מודלי אישור פעולות
  realNotFound404: true,     // 18. דף 404 אמיתי ועשיר
  printRoutine: true,        // 19. שגרת והתאמת הדפסה
  utmTracker: true,          // 20. מעקב UTM
  copyToClipboard: true,     // 21. העתקה ללוח עם טוסט
  lastUpdatedDates: true,    // 22. תאריכי עדכון אחרון
  passwordToggle: true,      // 23. הצגה והסתרת סיסמה
  savingsCalculator: false,  // 24. מחשבון חיסכון (הוסר כרגע)
  digitalDashboardMockup: false // 25. לוח בקרה דיגיטלי (הוסר כרגע)
} as const;
