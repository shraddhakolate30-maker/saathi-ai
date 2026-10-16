import { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Eye, Heart } from 'lucide-react';
import missionImage from '../assets/images/mission_women_support_1792082348190.jpg';

interface MissionSectionProps {
  onOpenMissionModal: () => void;
}

export default function MissionSection({ onOpenMissionModal }: MissionSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const keyPrinciples = [
    {
      title: 'Awareness before escalation.',
      description: 'Identifying subtle warning patterns before harm becomes acute or irreversible.',
      icon: Eye,
    },
    {
      title: 'Privacy and dignity.',
      description: 'Full autonomy over your personal narrative with zero forced reporting or data tracking.',
      icon: Shield,
    },
    {
      title: 'AI assistance with human accountability.',
      description: 'Intelligent synthesis checked by trained human reviewers to prevent mechanical bias.',
      icon: Heart,
    },
  ];

  return (
    <section id="mission" className="py-20 lg:py-28 bg-[#F8F6FC] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Photograph with purple gradient treatment */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-[#301047]">
              {/* Image */}
              <img
                src={missionImage}
                alt="Women supporting one another in thoughtful conversation"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover object-center transition-all duration-700 ${
                  imageLoaded ? 'opacity-90 scale-100' : 'opacity-0 scale-105'
                }`}
              />

              {/* Purple Gradient Treatment */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#301047]/75 via-[#812D75]/35 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F0A2E]/80 via-transparent to-transparent" />

              {/* Quote Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg">
                <p className="text-xs sm:text-sm font-medium text-[#301047] italic">
                  "Support shouldn't only start in the emergency room or police station. It should begin the moment you sense something isn't right."
                </p>
                <span className="block mt-2 text-[11px] font-semibold text-[#812D75] uppercase tracking-wider">
                  — The SAATHI AI Philosophy
                </span>
              </div>
            </div>

            {/* Decorative background blur element */}
            <div
              className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#C8B5FF]/40 rounded-full blur-3xl -z-10"
              aria-hidden="true"
            />
          </div>

          {/* RIGHT: Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-xs font-bold tracking-widest text-[#812D75] uppercase font-display bg-[#812D75]/10 px-3 py-1 rounded-full mb-3">
              WHY SAATHI AI?
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#301047] tracking-tight leading-[1.15] mb-5 text-balance">
              Safety Is More Than an Emergency Button.
            </h2>

            <p className="text-base sm:text-lg text-[#42164F]/85 leading-relaxed font-normal mb-8">
              Many harmful situations develop gradually. SAATHI AI aims to help
              women recognise concerning behaviours, understand their options,
              and seek appropriate support before situations escalate.
            </p>

            {/* Highlighted 3 Principles */}
            <div className="space-y-4 w-full mb-8">
              {keyPrinciples.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-[#301047]/5 shadow-2xs hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#812D75]/10 text-[#812D75] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#301047] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#812D75]" />
                        <span>{item.title}</span>
                      </h4>
                      <p className="text-xs text-[#42164F]/80 mt-0.5 leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Discover Mission Button */}
            <button
              type="button"
              onClick={onOpenMissionModal}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#42164F] to-[#812D75] rounded-full shadow-md hover:shadow-lg hover:from-[#301047] hover:to-[#42164F] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>Discover Our Mission</span>
              <ArrowRight className="w-4 h-4 text-[#C8B5FF]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
