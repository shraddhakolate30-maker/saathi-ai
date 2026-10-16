import { HeartHandshake, FileText, AlertTriangle, PhoneCall, ShieldAlert } from 'lucide-react';

interface SupportSectionProps {
  onOpenSafetyResources: () => void;
  onOpenConfidentialReporting: () => void;
}

export default function SupportSection({
  onOpenSafetyResources,
  onOpenConfidentialReporting,
}: SupportSectionProps) {
  return (
    <section
      id="support"
      className="py-20 lg:py-28 bg-gradient-to-br from-[#301047] via-[#42164F] to-[#172B60] text-white relative overflow-hidden scroll-mt-12"
    >
      {/* Background radial lights */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#812D75]/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#172B60]/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#C8B5FF] uppercase tracking-wider mb-6">
          <HeartHandshake className="w-4 h-4 text-[#C8B5FF]" />
          <span>Compassionate & Confidential Support</span>
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 text-balance">
          You Deserve to Be Heard.
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 text-balance font-normal">
          If you feel unsafe, you deserve support without judgement. Explore
          appropriate support options and choose your next step.
        </p>

        {/* Working Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          {/* Button 1: Explore Safety Resources */}
          <button
            type="button"
            onClick={onOpenSafetyResources}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#301047] bg-white rounded-full shadow-lg hover:bg-[#F8F6FC] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-[#812D75]" />
            <span>Explore Safety Resources</span>
          </button>

          {/* Button 2: Learn About Confidential Reporting */}
          <button
            type="button"
            onClick={onOpenConfidentialReporting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-white/10 border border-white/30 rounded-full hover:bg-white/20 hover:border-white transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#C8B5FF]" />
            <span>Learn About Confidential Reporting</span>
          </button>
        </div>

        {/* Immediate Danger Advisory Card */}
        <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/15 text-left flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <span>Are you in immediate physical danger?</span>
            </h4>
            <p className="text-xs sm:text-sm text-white/80 mt-1 leading-relaxed">
              If you or someone around you is in acute danger, please exit this screen immediately and dial your local
              emergency services (<strong className="text-white font-semibold">112</strong> in EU/India,{' '}
              <strong className="text-white font-semibold">911</strong> in US/Canada,{' '}
              <strong className="text-white font-semibold">999</strong> in the UK) or reach out to a trusted individual.
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-[#C8B5FF]">
              <span className="flex items-center gap-1 font-medium">
                <PhoneCall className="w-3.5 h-3.5" /> Direct Emergency Lines Available 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
