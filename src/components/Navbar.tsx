import { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  recipientName: string;
  onOpenPersonalize: () => void;
}

export default function Navbar({ recipientName, onOpenPersonalize }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'গল্প', href: '#story' },
    { label: 'তুমি বিশেষ', href: '#why-special' },
    { label: 'স্মৃতি', href: '#memories' },
    { label: 'তোমার চিঠি', href: '#letter' },
    { label: 'অনুভূতি', href: '#feelings' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07050b]/90 backdrop-blur-md border-b border-rose-950/40 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          className="font-serif-bn text-xl font-semibold tracking-wide text-rose-100 hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span>অনুভূতি</span>
          <span className="text-xs text-rose-300/60 font-sans-bn font-normal">
            · {recipientName}
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-rose-200/70">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-rose-100 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-rose-400/50 underline-offset-8"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPersonalize}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-100 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800/40 rounded-lg transition-all whitespace-nowrap shadow-sm hover:border-rose-600/50 hover:shadow-rose-950/50"
            title="নাম, ছবি ও স্মৃতিকথা কাস্টমাইজ করুন"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden sm:inline">নিজের নাম ও বার্তা দিন</span>
            <span className="sm:hidden">কাস্টমাইজ</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-rose-300 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#09060f]/95 border-b border-rose-950/60 px-6 py-5 flex flex-col gap-4 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left py-2 text-rose-200/80 hover:text-rose-100 border-b border-rose-950/30 text-base font-serif-bn"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
