import React, { useState, useEffect } from 'react';
import { Language, NavItem } from '../types';
import { Building2, Globe, Menu, X, Sparkles, Sun, Moon, Search, LogIn } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  lang: Language;
  onLanguageToggle: () => void;
  onOpenDemoModal: () => void;
  onOpenLoginModal: () => void;
  onOpenSearch?: () => void;
  navItems: NavItem[];
  buttons: Record<string, string>;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageToggle,
  onOpenDemoModal,
  onOpenLoginModal,
  onOpenSearch,
  navItems,
  buttons,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isRtl = lang === 'he';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`navbar-header ${scrolled ? 'navbar-slim' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled
          ? theme === 'dark'
            ? 'rgba(7, 10, 18, 0.92)'
            : 'rgba(255, 255, 255, 0.92)'
          : 'transparent',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: scrolled ? '8px 0' : '16px 0',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'var(--text-main)',
          }}
        >
          <div
            style={{
              width: scrolled ? '36px' : '42px',
              height: scrolled ? '36px' : '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
              transition: 'all 0.3s ease',
            }}
          >
            <Building2 size={scrolled ? 20 : 24} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: scrolled ? '1.25rem' : '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', transition: 'font-size 0.3s ease' }}>
              DayarPlus<span style={{ color: '#3b82f6' }}>.SYSTEM</span>
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              {lang === 'he' ? 'בלינק בניהול הבניין' : 'BUILDING OPERATING SYSTEM'}
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.92rem',
                fontWeight: 600,
                transition: 'color 0.2s ease, transform 0.2s ease',
                position: 'relative',
                padding: '4px 0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Utilities */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Feature 8: Quick Search Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="btn-secondary"
              aria-label={isRtl ? 'חיפוש מהיר באתר (Ctrl+K)' : 'Search (Ctrl+K)'}
              title={isRtl ? 'חיפוש מהיר באתר (Ctrl+K)' : 'Search (Ctrl+K)'}
              style={{
                padding: '8px 12px',
                fontSize: '0.85rem',
                borderRadius: '10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Search size={16} color="#60a5fa" />
              <span className="search-text-shortcut" style={{ display: 'none', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                ⌘K
              </span>
            </button>
          )}

          {/* Feature 1: Dark / Light Mode Switch */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? isRtl
                  ? 'החלף למצב בהיר'
                  : 'Switch to light mode'
                : isRtl
                ? 'החלף למצב כהה'
                : 'Switch to dark mode'
            }
            title={theme === 'dark' ? (isRtl ? 'מצב בהיר' : 'Light Mode') : (isRtl ? 'מצב כהה' : 'Dark Mode')}
            className="btn-secondary"
            style={{
              padding: '8px',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme === 'dark' ? '#fbbf24' : '#3b82f6',
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onLanguageToggle}
            className="btn-secondary"
            style={{
              padding: '8px 12px',
              fontSize: '0.85rem',
              borderRadius: '10px',
            }}
          >
            <Globe size={16} color="#60a5fa" />
            <span>{lang === 'he' ? 'EN' : 'עב'}</span>
          </button>

          {/* Login Button */}
          <button
            onClick={onOpenLoginModal}
            className="btn-secondary desktop-login-btn"
            style={{
              padding: '8px 16px',
              fontSize: '0.88rem',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            <LogIn size={15} />
            <span>{buttons.login}</span>
          </button>

          {/* Schedule Demo CTA */}
          <button
            id="open-demo-modal-nav"
            onClick={onOpenDemoModal}
            className="btn-primary"
            style={{
              padding: scrolled ? '8px 18px' : '9px 20px',
              fontSize: '0.9rem',
              borderRadius: '10px',
            }}
          >
            <Sparkles size={16} />
            <span>{buttons.startTrial}</span>
          </button>

          {/* Feature 3: Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={lang === 'he' ? 'תפריט ניווט' : 'Navigation menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              display: 'flex',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Feature 3: Full-Featured Responsive Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '60px',
            zIndex: 999,
            background: 'var(--bg-secondary)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            gap: '16px',
            overflowY: 'auto',
            borderTop: '1px solid var(--border-subtle)',
            animation: 'toastSlideIn 0.25s ease',
            direction: isRtl ? 'rtl' : 'ltr',
          }}
        >
          {/* Quick Search trigger in mobile drawer */}
          {onOpenSearch && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="btn-secondary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '8px',
              }}
            >
              <Search size={18} color="#60a5fa" />
              <span>{isRtl ? 'חיפוש מהיר בכל חלקי האתר...' : 'Search DayarPlus...'}</span>
            </button>
          )}

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '8px 0' }} />

          {/* Mobile Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoginModal();
              }}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              <LogIn size={18} />
              <span>{buttons.login}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              <Sparkles size={18} />
              <span>{buttons.startTrial}</span>
            </button>
          </div>

          {/* Bottom Direct Support in Mobile */}
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>{isRtl ? 'תמיכה טלפונית:' : 'Support:'}</span>
            <a href="tel:0771234567" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 700 }}>
              077-1234567
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .desktop-login-btn { display: inline-flex !important; }
          .search-text-shortcut { display: inline !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
