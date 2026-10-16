import { MessageSquareText, Sparkles, UserCheck2, Compass } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'SHARE YOUR CONCERN',
      description: 'Describe a situation or explore common warning signs.',
      icon: MessageSquareText,
      detail: 'Private, unlogged input workspace allowing you to reflect safely.',
    },
    {
      number: '02',
      title: 'AI-ASSISTED GUIDANCE',
      description:
        'AI helps explain possible concerns and suggests practical next steps without making accusations.',
      icon: Sparkles,
      detail: 'Neutral synthesis of behavioral dynamics and boundary indicators.',
    },
    {
      number: '03',
      title: 'HUMAN REVIEW',
      description:
        'Where a real review service exists, trained reviewers can assess submitted requests under clear procedures.',
      icon: UserCheck2,
      detail: 'Optional, consent-first referral to certified human specialists.',
    },
    {
      number: '04',
      title: 'EXPLORE SUPPORT OPTIONS',
      description:
        'Find relevant resources and decide which next step feels appropriate for your situation.',
      icon: Compass,
      detail: 'Confidential helplines, legal aid definitions, and personal safety plans.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white border-t border-[#301047]/10 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <span className="text-xs font-semibold tracking-wider text-[#812D75] uppercase font-display bg-[#812D75]/10 px-3 py-1 rounded-full">
            Transparent Process
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#301047] tracking-tight mt-3 mb-4 text-balance">
            From Awareness to Appropriate Support
          </h2>
          <p className="text-base sm:text-lg text-[#42164F]/85 font-normal leading-relaxed text-balance">
            A dignified, step-by-step pathway prioritizing your autonomy at every stage.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Connecting Line (Desktop) */}
          <div
            className="hidden lg:block absolute top-1/2 left-[6%] right-[6%] -translate-y-8 h-0.5 bg-gradient-to-r from-[#812D75]/20 via-[#42164F]/40 to-[#172B60]/20 z-0"
            aria-hidden="true"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-[#F8F6FC] border border-[#301047]/10 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  {/* Step Number Badge & Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#301047] via-[#42164F] to-[#812D75] text-white flex items-center justify-center shadow-md">
                      <Icon className="w-7 h-7 stroke-[1.8] text-[#C8B5FF]" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-[#812D75] text-[#812D75] text-xs font-bold font-mono flex items-center justify-center shadow-xs">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="font-display text-base font-bold text-[#301047] tracking-wide mb-2 uppercase">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-[#42164F]/85 leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {/* Micro Detail */}
                  <span className="mt-auto text-xs text-[#812D75]/80 font-medium bg-white/80 border border-[#301047]/5 px-3 py-1 rounded-full">
                    {step.detail}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responsible AI & Reporting Disclaimer */}
        <div className="mt-14 p-5 rounded-2xl bg-[#F8F6FC] border border-[#301047]/15 max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-[#42164F]/85 leading-relaxed font-normal">
            <strong className="text-[#301047] font-semibold">Important Clarification:</strong> SAATHI AI
            provides thoughtful exploration and informational guidance. It does not automatically file police
            reports, guarantee emergency intervention, or replace certified legal and medical professionals.
          </p>
        </div>
      </div>
    </section>
  );
}
