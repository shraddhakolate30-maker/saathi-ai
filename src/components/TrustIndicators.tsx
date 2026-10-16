import { Lock, UserCheck, Compass } from 'lucide-react';

export default function TrustIndicators() {
  const principles = [
    {
      title: 'PRIVACY FIRST',
      subtitle: 'Your information deserves protection.',
      icon: Lock,
    },
    {
      title: 'HUMAN OVERSIGHT',
      subtitle: 'AI assists. Humans review.',
      icon: UserCheck,
    },
    {
      title: 'USER CONTROL',
      subtitle: 'You choose your next step.',
      icon: Compass,
    },
  ];

  return (
    <section className="bg-[#F8F6FC] border-y border-[#301047]/10 py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/70 border border-[#301047]/5 shadow-xs transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#42164F]/10 to-[#812D75]/15 flex items-center justify-center shrink-0 text-[#812D75]">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#812D75] font-semibold">0{index + 1}</span>
                    <h2 className="text-xs font-bold tracking-wider text-[#301047] uppercase font-display">
                      {item.title}
                    </h2>
                  </div>
                  <p className="text-sm text-[#42164F]/85 mt-0.5 font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
