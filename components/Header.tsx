import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { useData } from '../contexts/DataContext';
import { Menu, X, Globe } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const location = useLocation();
  const { logoUrl } = useData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'jp' : 'en');
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Logo Component
  const Logo = () => (
    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
      {logoUrl ? (
        <img src={logoUrl} alt="AAVO Wholesale Foods" className="h-12 w-auto object-contain" />
      ) : (
        <>
          {/* Logo Icon SVG */}
          <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-aavo-green transition-transform duration-300 group-hover:scale-105 shrink-0">
            {/* Outer Container */}
            <rect x="5" y="5" width="90" height="90" rx="26" stroke="currentColor" strokeWidth="8" />

            {/* Top Left Triangle (A) */}
            <path d="M20 44 L33 20 L46 44" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>

            {/* Top Right Triangle (A) */}
            <path d="M54 44 L67 20 L80 44" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>

            {/* Bottom Left V */}
            <path d="M20 56 L33 80 L46 56" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>

            {/* Bottom Right O */}
            <circle cx="67" cy="68" r="12" stroke="currentColor" strokeWidth="7" />
          </svg>

          {/* Text SVG */}
          <svg height="24" viewBox="0 0 260 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:text-aavo-green transition-colors duration-300 hidden sm:block mt-1">
            {/* A */}
            <path d="M10 45 L35 5 L60 45" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            {/* A */}
            <path d="M75 45 L100 5 L125 45" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            {/* V */}
            <path d="M140 5 L165 45 L190 5" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
            {/* O */}
            <rect x="210" y="5" width="45" height="40" rx="20" stroke="currentColor" strokeWidth="8" />
          </svg>
        </>
      )}
    </Link>
  );

  const navLinkClass = (path: string) => `font-body text-sm font-medium transition-colors uppercase tracking-wider drop-shadow-md ${
    isActive(path) ? 'text-aavo-green' : 'text-white hover:text-aavo-green'
  }`;

  const mobileNavLinkClass = (path: string) => `block py-3 text-center font-header text-lg border-b border-white/5 ${
    isActive(path) ? 'text-aavo-green' : 'text-white hover:text-aavo-green'
  }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled
          ? 'bg-zinc-900/95 backdrop-blur-md border-white/10 py-3 shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={navLinkClass('/')}>
            {t.nav.home}
          </Link>
          <Link to="/about" className={navLinkClass('/about')}>
            {t.nav.about}
          </Link>
          <Link to="/products" className={navLinkClass('/products')}>
            {t.nav.products}
          </Link>
          <Link to="/catalog" className={navLinkClass('/catalog')}>
            {t.nav.catalog}
          </Link>
          <Link to="/contact" className={navLinkClass('/contact')}>
            {t.nav.contact}
          </Link>

          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-1.5 border border-aavo-green/50 rounded-full text-xs font-bold text-white hover:bg-aavo-green hover:text-aavo-dark transition-all backdrop-blur-sm bg-black/20"
          >
            <Globe size={14} />
            {lang === 'en' ? 'JP' : 'EN'}
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLang}
            className="text-xs font-bold text-aavo-green bg-black/20 px-2 py-1 rounded"
          >
            {lang === 'en' ? 'JP' : 'EN'}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-1">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900 border-b border-aavo-green/20 p-4 flex flex-col gap-4 shadow-2xl">
          <Link to="/" onClick={handleMobileNavClick} className={mobileNavLinkClass('/')}>
            {t.nav.home}
          </Link>
          <Link to="/about" onClick={handleMobileNavClick} className={mobileNavLinkClass('/about')}>
            {t.nav.about}
          </Link>
          <Link to="/products" onClick={handleMobileNavClick} className={mobileNavLinkClass('/products')}>
            {t.nav.products}
          </Link>
          <Link to="/catalog" onClick={handleMobileNavClick} className={mobileNavLinkClass('/catalog')}>
            {t.nav.catalog}
          </Link>
          <Link to="/contact" onClick={handleMobileNavClick} className="block py-3 text-center font-header text-lg text-white hover:text-aavo-green">
            {t.nav.contact}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
