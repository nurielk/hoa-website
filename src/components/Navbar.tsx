import React, { useState, useEffect } from 'react';
import { Language, NavItem } from '../types';
import { Building2, Globe, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  onLanguageToggle: () => void;
  onOpenDemoModal: () => void;
  onOpenLoginModal: () => void;
  navItems: NavItem[];
  buttons: Record<string, string>;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageToggle,
  onOpenDemoModal,
  onOpenLoginModal: _onOpenLoginModal,
  navItems,
  buttons,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar scroll state

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(11, 15, 25, 0.88)'
          : 'rgba(11, 15, 25, 0.4)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        padding: scrolled ? '12px 0' : '18px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
            }}
          >
            <Building2 size={24} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              HOA<span style={{ color: '#3b82f6' }}>.SYSTEM</span>
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.7rem',
                color: '#9ca3af',
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
            gap: '28px',
          }}
          className="desktop-nav"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={{
                color: '#d1d5db',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#60a5fa')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#d1d5db')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Language Switcher */}
          <button
            id="lang-toggle-btn"
            onClick={onLanguageToggle}
            className="glass-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: '#f3f4f6',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
            title={lang === 'he' ? 'Switch to English' : 'עבור לעברית'}
          >
            <Globe size={16} color="#60a5fa" />
            <span>{lang === 'he' ? 'EN' : 'עברית'}</span>
          </button>

          {/* Login Button (links to HOA App System) */}
          <a
            href="http://localhost:5174"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              padding: '8px 18px',
              fontSize: '0.9rem',
              textDecoration: 'none',
            }}
          >
            {buttons.login}
          </a>

          {/* Schedule Demo CTA */}
          <button
            id="open-demo-modal-nav"
            onClick={onOpenDemoModal}
            className="btn-primary"
            style={{
              padding: '9px 20px',
              fontSize: '0.9rem',
            }}
          >
            <Sparkles size={16} />
            <span>{buttons.startTrial}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#111827',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#e5e7eb',
                textDecoration: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
