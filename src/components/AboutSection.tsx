import { Shield, Sparkles, Scale, Heart } from 'lucide-react';

export default function AboutSection() {
  const values = [
    {
      title: 'Empathy-Driven Design',
      description: 'We center the lived experiences of women facing pressure, ambiguity, and intimidation.',
      icon: Heart,
    },
    {
      title: 'Ethical & Non-Punitive AI',
      description: 'AI serves to illuminate patterns and clarify choices, never to automate criminal judgment.',
      icon: Sparkles,
    },
    {
      title: 'Uncompromising Dignity',
      description: 'Every interaction respects the individual’s pacing, confidentiality, and ultimate authority.',
      icon: Shield,
    },
    {
      title: 'Bridging to Human Care',
      description: 'Technology can open doors, but genuine human solidarity and care provide lasting safety.',
      icon: Scale,
    },
  ];

  return (
    <section id="about-us" className="py-20 lg:py-28 bg-white border-t border-[#301047]/10 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-wider text-[#812D75] uppercase font-display bg-[#812D75]/10 px-3 py-1 rounded-full">
            Our Foundation
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#301047] tracking-tight mt-3 mb-4 text-balance">
            About SAATHI AI
          </h2>
          <p className="text-base sm:text-lg text-[#42164F]/85 font-normal leading-relaxed text-balance">
            Rooted in the Sanskrit word <em>Saathi</em>—meaning companion and steadfast ally—our platform is dedicated to standing beside women whenever uncertainty or threat arises.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-[#F8F6FC] border border-[#301047]/10 hover:border-[#812D75]/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#42164F]/10 to-[#812D75]/15 text-[#812D75] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <h3 className="font-display text-base font-bold text-[#301047] mb-2">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#42164F]/80 leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
