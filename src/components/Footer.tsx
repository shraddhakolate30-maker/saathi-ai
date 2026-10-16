import BrandLogo from './BrandLogo';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
  onOpenModelTransparency: () => void;
  onOpenReviewDashboard: () => void;
  onQuickExit: () => void;
}

export default function Footer({
  onOpenPrivacy,
  onOpenContact,
  onOpenModelTransparency,
  onOpenReviewDashboard,
  onQuickExit,
}: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1A0726] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <BrandLogo size="lg" />
            <p className="text-sm font-medium text-[#C8B5FF] tracking-wide">
              "Recognize Early. Reach Help. Protect Dignity."
            </p>
            <p className="text-xs sm:text-sm text-white/70 max-w-md leading-relaxed">
              An AI-powered platform that helps women recognize potential warning
              signs, understand unsafe behaviours, seek confidential support, and
              connect with appropriate human assistance.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onQuickExit}
                className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <span>Quick Safety Exit (ESC)</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8B5FF] font-display mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#home')}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#safety-check')}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  AI Safety Check
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#safety-features')}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Safety Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#mission')}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Our Mission
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#how-it-works')}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C8B5FF] font-display mb-4">
              Governance & Safety
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenModelTransparency}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Model Architecture & Transparency
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Privacy & Data Principles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenReviewDashboard}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Advocate Triage Console (Demo)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="text-white/70 hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Disclaimer from requirements */}
        <div className="pt-8 pb-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/75 leading-relaxed">
            <p>
              <strong>Disclaimer:</strong> SAATHI AI provides informational and
              AI-assisted guidance. It does not determine guilt, replace
              professional support, or guarantee emergency intervention.
              AI-generated guidance may be inaccurate. Use appropriate emergency
              services when necessary.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} SAATHI AI. All rights reserved.</p>
          <p className="text-[#C8B5FF]/90 font-medium">
            Built with care for a safer, more supportive future.
          </p>
        </div>
      </div>
    </footer>
  );
}
