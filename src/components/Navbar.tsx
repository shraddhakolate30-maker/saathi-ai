import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenSafetyResources: () => void;
  onQuickExit: () => void;
}

export default function Navbar({ onOpenAuth, onQuickExit }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['home', 'safety-features', 'about-us', 'mission', 'how-it-works'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items including live AI Safety Check
  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'AI Safety Check', href: '#safety-check', id: 'safety-check' },
    { name: 'Safety Features', href: '#safety-features', id: 'safety-features' },
    { name: 'Our Mission', href: '#mission', id: 'mission' },
    { name: 'How It Works', href: '#how-it-works', id: 'how-it-works' },
    { name: 'About Us', href: '#about-us', id: 'about-us' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#261342]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* LEFT: Brand Logo & Wordmark matching reference */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-2 group transition-opacity hover:opacity-95 shrink-0"
              aria-label="SAATHI AI Homepage"
            >
              <BrandLogo size="md" />
            </a>

            {/* CENTER: Desktop Navigation Links matching reference typography and spacing */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-white/95">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`transition-colors duration-200 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* RIGHT: Login/Register Button matching reference shape and font */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Quick exit shortcut */}
              <button
                type="button"
                onClick={onQuickExit}
                title="Quick Exit to weather (ESC)"
                className="hidden xl:flex items-center gap-1 text-xs text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-2.5 py-1 rounded-md transition-all"
              >
                <span>Exit (ESC)</span>
              </button>

              {/* Login/Register Button matching reference */}
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="px-6 py-2.5 text-sm font-semibold text-[#2D1B4E] bg-white rounded-md hover:bg-white/95 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                Login/Register
              </button>

              {/* Mobile menu hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#240F3E]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 transition-all duration-300">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-4 py-2.5 rounded-lg text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="w-full text-center py-2.5 text-sm font-semibold text-[#2D1B4E] bg-white rounded-md shadow hover:bg-white/95"
                >
                  Login / Register
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onQuickExit();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-white/70 hover:text-white border border-white/20 rounded-md"
                >
                  <span>Quick Safety Exit (Closes Page)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
