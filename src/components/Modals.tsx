import React, { useState } from 'react';
import {
  X,
  Lock,
  Shield,
  Heart,
  PhoneCall,
  CheckCircle2,
  FileText,
  AlertCircle,
  ExternalLink,
  EyeOff,
  UserCheck,
} from 'lucide-react';
import { FeatureItem } from './SafetyFeatures';
import BrandLogo from './BrandLogo';

// ==========================================
// 1. AUTH MODAL (Login / Register)
// ==========================================
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Clean close after demonstration feedback
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#301047]/10">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-[#F8F6FC] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center mb-6">
          <BrandLogo
            shieldColor="#812D75"
            heartColor="#C8B5FF"
            textColor="text-[#301047]"
            size="md"
          />
          <p className="text-xs text-[#812D75] font-medium mt-1">
            Confidential & Secure Portal
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-[#F8F6FC] p-1 rounded-xl mb-6 border border-[#301047]/5">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setSubmitted(false);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-[#301047] shadow-xs'
                : 'text-[#42164F]/60 hover:text-[#301047]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setSubmitted(false);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-[#301047] shadow-xs'
                : 'text-[#42164F]/60 hover:text-[#301047]'
            }`}
          >
            Create Anonymous Account
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#301047]">
              Confidential Session Initialized
            </h4>
            <p className="text-xs text-[#42164F]/80 max-w-xs mx-auto leading-relaxed">
              This preview demonstrates the confidential client-side workflow. No identifiable data has been stored on external servers.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-6 py-2 text-xs font-semibold text-white bg-[#301047] rounded-full hover:bg-[#42164F] transition-all"
            >
              Return to Homepage
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-[#301047] mb-1">
                  Pseudonym / Alias (Optional)
                </label>
                <input
                  type="text"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  placeholder="e.g., Violet, Hope, or leave blank"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#301047]/15 focus:outline-none focus:ring-2 focus:ring-[#812D75] focus:border-transparent bg-[#F8F6FC]/50 text-[#301047]"
                />
                <span className="text-[11px] text-[#42164F]/60 block mt-1">
                  You never need to provide your real name.
                </span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#301047] mb-1">
                {mode === 'register' ? 'Confidential Email / Burner Handle' : 'Email or Alias'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@private-domain.org"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#301047]/15 focus:outline-none focus:ring-2 focus:ring-[#812D75] focus:border-transparent bg-[#F8F6FC]/50 text-[#301047]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#301047] mb-1">
                Passcode / Encryption Key
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#301047]/15 focus:outline-none focus:ring-2 focus:ring-[#812D75] focus:border-transparent bg-[#F8F6FC]/50 text-[#301047]"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#F8F6FC] border border-[#301047]/10 flex items-start gap-2.5">
              <EyeOff className="w-4 h-4 text-[#812D75] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#42164F]/80 leading-normal">
                <strong>Zero-Trace Guarantee:</strong> We do not log IP addresses, tracking pixels, or cross-site cookies.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#301047] to-[#812D75] rounded-full hover:opacity-95 transition-opacity shadow-md cursor-pointer"
            >
              {mode === 'login' ? 'Access Confidential Portal' : 'Create Anonymous Account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. FEATURE DETAIL MODAL
// ==========================================
interface FeatureDetailModalProps {
  feature: FeatureItem | null;
  onClose: () => void;
}

export function FeatureDetailModal({ feature, onClose }: FeatureDetailModalProps) {
  if (!feature) return null;
  const Icon = feature.icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#301047]/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-[#F8F6FC] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#301047]/10 to-[#812D75]/15 text-[#812D75] flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#812D75] uppercase tracking-wider">
              {feature.tag}
            </span>
            <h3 className="text-xl font-bold text-[#301047] font-display">
              {feature.title}
            </h3>
          </div>
        </div>

        <div className="space-y-4 text-sm text-[#42164F]/85">
          <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#301047]/5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#301047] mb-1">
              Purpose & Overview
            </h4>
            <p className="leading-relaxed">{feature.detail.whatItIs}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#301047]/5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#301047] mb-1">
              Safety & Dignity Architecture
            </h4>
            <p className="leading-relaxed">{feature.detail.howItProtects}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#301047] mb-2">
              Key Protections
            </h4>
            <ul className="space-y-2">
              {feature.detail.keyPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-xs text-[#42164F]/85">
                  <CheckCircle2 className="w-4 h-4 text-[#812D75] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#301047]/10 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#301047] rounded-full hover:bg-[#42164F] transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. SAFETY RESOURCES MODAL
// ==========================================
interface SafetyResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickExit: () => void;
}

export function SafetyResourcesModal({
  isOpen,
  onClose,
  onQuickExit,
}: SafetyResourcesModalProps) {
  if (!isOpen) return null;

  const helplines = [
    {
      country: 'India',
      title: 'Pan-India Emergency Response Support System (ERSS)',
      number: '112',
      badge: 'Verified National Emergency (Police / Fire / Health)',
      details:
        'Pan-India single emergency number across all States and Union Territories. Free 24/7.',
    },
    {
      country: 'India',
      title: 'Women Safety & Anti-Harassment Lines',
      number: '1091 (Police Women Helpline) · 181 (Women in Distress)',
      badge: 'Verified National Services',
      details:
        '1091 connects directly to local Police Women Cells. 181 connects to Ministry of Women & Child Development One Stop Crisis Centres. Cyber Crime Helpline: 1930.',
    },
    {
      country: 'United States',
      title: 'Emergency Dispatch & National Domestic Violence Hotline',
      number: '911 (Emergency) · 1-800-799-SAFE (7233)',
      badge: 'Verified 24/7 National Services',
      details:
        '911 for immediate dispatch. National Domestic Violence Hotline: confidential, toll-free, 24/7, or text "START" to 88788.',
    },
    {
      country: 'United Kingdom',
      title: 'Emergency Services & National Domestic Abuse Helpline',
      number: '999 (Emergency) · 0808 2000 247',
      badge: 'Verified 24/7 National Services',
      details:
        '999 for emergency police/ambulance. Freephone National Domestic Abuse Helpline run by Refuge (0808 2000 247).',
    },
    {
      country: 'Canada',
      title: 'Emergency Services & ShelterSafe Directory',
      number: '911 (Emergency) · 1-866-863-0511 (Assaulted Women Helpline)',
      badge: 'Verified National Services',
      details:
        '911 for urgent police/paramedic intervention. ShelterSafe (sheltersafe.ca) coordinates safe shelter placement nationwide.',
    },
    {
      country: 'Australia',
      title: 'Emergency Services & 1800RESPECT',
      number: '000 (Emergency) · 1800 737 732 (1800RESPECT)',
      badge: 'Verified National Services',
      details:
        '000 for emergency police. 1800RESPECT provides 24/7 national confidential domestic, family, and sexual violence counselling.',
    },
    {
      country: 'International / GSM',
      title: 'Universal Mobile Emergency Standard',
      number: '112',
      badge: 'Standard Global Protocol',
      details:
        'Standard emergency number on all GSM mobile phones worldwide, dialable even without a SIM card or key lock.',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resources-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#301047]/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-[#F8F6FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#812D75]/10 text-[#812D75] flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 id="resources-title" className="text-xl font-bold text-[#301047] font-display">
                Emergency & Support Helplines
              </h3>
              <p className="text-xs text-[#812D75] font-semibold">
                Verified 24/7 crisis and advisory resources
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onQuickExit}
            className="text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
          >
            Quick Exit Screen
          </button>
        </div>

        <div className="space-y-4">
          {/* Critical Operational Boundary Notice */}
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-900 leading-relaxed">
              <strong className="block font-semibold mb-0.5">Important Safety Boundary:</strong>
              SAATHI AI is an educational software platform. <strong>SAATHI AI cannot dispatch emergency responders.</strong> If you are in immediate physical danger, dial your local emergency service (such as 112 in India, 911 in US/Canada, or 999 in UK) directly from your phone.
            </div>
          </div>

          <div className="divide-y divide-[#301047]/10 border border-[#301047]/10 rounded-2xl overflow-hidden">
            {helplines.map((item, index) => (
              <div key={index} className="p-4 bg-white hover:bg-[#F8F6FC] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#301047]">{item.country}</span>
                    <span className="text-[10px] font-semibold text-[#812D75] bg-[#812D75]/10 border border-[#812D75]/20 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#812D75] bg-[#C8B5FF]/20 px-2.5 py-0.5 rounded">
                    {item.number}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-[#301047] mb-0.5">{item.title}</h5>
                <p className="text-xs text-[#42164F]/75 leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>

          {/* Practical Safety Planning */}
          <div className="p-4 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#301047] mb-2 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#812D75]" />
              <span>Digital Hygiene & Safe Browsing Tips</span>
            </h4>
            <ul className="text-xs text-[#42164F]/80 space-y-1.5 list-disc pl-4">
              <li>Use Private / Incognito browsing tabs when researching sensitive topics.</li>
              <li>Review connected devices and Bluetooth trackers linked to your accounts.</li>
              <li>Always memorize at least one trusted phone number in case your phone is confiscated.</li>
              <li>Use the Quick Exit (ESC) button at any moment to instantly leave this site.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#301047]/10 flex items-center justify-between">
          <span className="text-[11px] text-[#42164F]/60">
            All listed lines operate under strict confidentiality.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#301047] rounded-full hover:bg-[#42164F]"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. CONFIDENTIAL REPORTING MODAL
// ==========================================
interface ConfidentialReportingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfidentialReportingModal({
  isOpen,
  onClose,
}: ConfidentialReportingModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#301047]/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-[#F8F6FC] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#812D75]/10 text-[#812D75] flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#812D75] uppercase tracking-wider">
              Architecture & Safeguards
            </span>
            <h3 className="text-xl font-bold text-[#301047] font-display">
              How Confidential Intake Operates
            </h3>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#42164F]/85 leading-relaxed">
          <p>
            Traditional reporting systems often force women to disclose identifiable details,
            legal names, and exact addresses before they even receive guidance.
            SAATHI AI takes a completely survivor-centric approach.
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
              <h4 className="font-bold text-[#301047] text-xs uppercase mb-1">
                1. Metadata Minimization
              </h4>
              <p className="text-xs">
                Drafts and guided inquiries are stripped of IP addresses, device identifiers, and location coordinates before any analysis takes place.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
              <h4 className="font-bold text-[#301047] text-xs uppercase mb-1">
                2. Progressive Disclosure
              </h4>
              <p className="text-xs">
                You decide how much to share. You can explore behavioral patterns completely anonymously, or choose to share select notes only when ready for human review.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
              <h4 className="font-bold text-[#301047] text-xs uppercase mb-1">
                3. Human Oversight Without Involuntary Escalation
              </h4>
              <p className="text-xs">
                Submissions are reviewed by trained advocates under strict ethical codes. Information is never forwarded to law enforcement or external agencies without explicit, informed consent.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#301047]/10 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#301047] rounded-full hover:bg-[#42164F]"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. MISSION MODAL
// ==========================================
interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MissionModal({ isOpen, onClose }: MissionModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#301047]/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-[#F8F6FC] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#301047]/10 to-[#812D75]/15 text-[#812D75] flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6 text-[#812D75]" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#812D75] uppercase tracking-wider">
              Our Compassionate Charter
            </span>
            <h3 className="text-xl font-bold text-[#301047] font-display">
              The SAATHI AI Mission
            </h3>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#42164F]/85 leading-relaxed">
          <p className="font-medium text-[#301047]">
            "Recognize Early. Reach Help. Protect Dignity."
          </p>
          <p>
            Our mission is to bridge the silent gap between the first uneasy gut feeling and formal intervention. Too often, women second-guess themselves when experiencing controlling behavior, gaslighting, or digital monitoring.
          </p>
          <p>
            By combining intelligent early-warning analysis with confidential human review and dignified resources, SAATHI AI empowers women to trust their instincts and navigate their safety with total agency.
          </p>

          <div className="p-4 rounded-2xl bg-[#F8F6FC] border border-[#301047]/10 space-y-2">
            <h4 className="text-xs font-bold text-[#301047] uppercase">Our Three Non-Negotiable Standards</h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#812D75]" />
                <span>Zero victim-blaming or accusatory phrasing.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#812D75]" />
                <span>Zero involuntary reporting or tracking.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#812D75]" />
                <span>Trained human oversight on critical guidance.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#301047]/10 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#301047] rounded-full hover:bg-[#42164F]"
          >
            Close Mission
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. PRIVACY MODAL
// ==========================================
interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#301047]/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-[#F8F6FC] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#812D75]/10 text-[#812D75] flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#812D75] uppercase tracking-wider">
              Privacy Architecture
            </span>
            <h3 className="text-xl font-bold text-[#301047] font-display">
              Privacy & Data Protection Principles
            </h3>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#42164F]/85 leading-relaxed">
          <p>
            At SAATHI AI, privacy is not a compliance checklist—it is the foundation of user safety.
          </p>
          <ul className="space-y-2.5">
            <li className="p-3 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
              <strong className="block text-[#301047] font-semibold text-xs mb-0.5">
                No Commercial Tracking
              </strong>
              We do not use advertising trackers, third-party analytics pixels, or commercial fingerprinting scripts.
            </li>
            <li className="p-3 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
              <strong className="block text-[#301047] font-semibold text-xs mb-0.5">
                Voluntary Participation
              </strong>
              You may read, explore warning sign patterns, and look up crisis numbers without ever logging in or providing personal identifiers.
            </li>
            <li className="p-3 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
              <strong className="block text-[#301047] font-semibold text-xs mb-0.5">
                Instant Session Purge
              </strong>
              You have the right to purge all temporary interaction cache with one tap or keyboard escape.
            </li>
          </ul>
        </div>

        <div className="mt-6 pt-4 border-t border-[#301047]/10 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#301047] rounded-full hover:bg-[#42164F]"
          >
            Close Privacy Details
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. CONTACT MODAL
// ==========================================
interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('Feedback & Inquiries');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#301047]/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-[#F8F6FC] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#812D75]/10 text-[#812D75] flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#812D75] uppercase tracking-wider">
              Communication
            </span>
            <h3 className="text-xl font-bold text-[#301047] font-display">
              Contact & Inquiries
            </h3>
          </div>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#301047]">Message Received</h4>
            <p className="text-xs text-[#42164F]/80 leading-relaxed max-w-xs mx-auto">
              Thank you for reaching out. Inquiries are handled with confidentiality and care.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 px-5 py-2 text-xs font-semibold text-white bg-[#301047] rounded-full"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#301047] mb-1">
                Inquiry Topic
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#301047]/15 bg-[#F8F6FC] text-[#301047] focus:outline-none focus:ring-2 focus:ring-[#812D75]"
              >
                <option value="Platform Feedback">Platform Feedback & Suggestions</option>
                <option value="Safety Question">General Safety Inquiry</option>
                <option value="Accessibility">Accessibility & Language Support</option>
                <option value="Confidential Question">Privacy & Architecture Question</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#301047] mb-1">
                Your Message / Note
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your question or feedback..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#301047]/15 bg-[#F8F6FC]/50 text-[#301047] focus:outline-none focus:ring-2 focus:ring-[#812D75]"
              />
            </div>

            <p className="text-[11px] text-[#42164F]/70">
              <strong>Notice:</strong> For immediate crises, please use the 24/7 Helplines in the Safety Resources section.
            </p>

            <button
              type="submit"
              className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#301047] to-[#812D75] rounded-full hover:opacity-95 transition-opacity"
            >
              Submit Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
