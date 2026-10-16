import { ShieldAlert, Lock, ClipboardCheck, HeartHandshake, ArrowRight, Sparkles, Send, UserCheck, PhoneCall } from 'lucide-react';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: typeof ShieldAlert;
  tag: string;
  detail: {
    whatItIs: string;
    howItProtects: string;
    keyPoints: string[];
  };
}

interface SafetyFeaturesProps {
  onSelectFeature: (feature: FeatureItem) => void;
  onLaunchSafetyCheck?: () => void;
  onOpenHelpRequest?: () => void;
  onOpenReviewDashboard?: () => void;
  onOpenSafetyResources?: () => void;
}

export const SAFETY_FEATURES_DATA: FeatureItem[] = [
  {
    id: 'early-warning',
    title: 'AI Early Warning',
    description:
      'Explore potential warning signs of controlling behaviour, harassment, threats, and unhealthy relationship patterns.',
    icon: ShieldAlert,
    tag: 'Live AI Assessment',
    detail: {
      whatItIs:
        'An educational and analytical tool that helps individuals identify subtle indicators of psychological control, digital stalking, harassment, or escalating intimidation.',
      howItProtects:
        'Provides objective, non-judgemental breakdowns of relationship dynamics without accusatory labeling, helping you gain clarity at your own pace.',
      keyPoints: [
        'Objective assessment of subtle red flags and boundary violations',
        'Distinguishes between healthy conflict and coercive control patterns',
        'Private session with no local device tracking or stored history',
      ],
    },
  },
  {
    id: 'confidential-request',
    title: 'Confidential Help Request',
    description:
      'Learn how to request support while minimising the personal information you need to share.',
    icon: Lock,
    tag: 'Intake Queue',
    detail: {
      whatItIs:
        'A secure, low-footprint pathway to draft concerns, note timestamps, or request human guidance without needing to provide identifiable legal details upfront.',
      howItProtects:
        'Uses progressive disclosure and metadata stripping so you stay in total control of what personal information is shared and when.',
      keyPoints: [
        'No phone number or identity documents required for initial guidance',
        'Option to store notes securely with zero-knowledge passcodes',
        'Immediate purge button to delete drafts from session memory',
      ],
    },
  },
  {
    id: 'human-review',
    title: 'Human Review',
    description:
      'Understand how trained human reviewers could assess requests and help connect people with appropriate support.',
    icon: ClipboardCheck,
    tag: 'Triage Console',
    detail: {
      whatItIs:
        'A human-in-the-loop triage workspace where qualified specialists review anonymized requests to offer sensitive, contextual guidance.',
      howItProtects:
        'Ensures AI never operates in an isolated vacuum when human empathy, local context, and specialized crisis knowledge are essential.',
      keyPoints: [
        'Strict ethical code of conduct for reviewers and caseworkers',
        'Double-blind review to protect user identity and caseworker bias',
        'Demonstration console separating seed benchmarks from live submissions',
      ],
    },
  },
  {
    id: 'safety-resources',
    title: 'Safety Resources',
    description:
      'Explore practical safety guidance and information about relevant support services.',
    icon: HeartHandshake,
    tag: 'Verified Helplines',
    detail: {
      whatItIs:
        'A curated repository of actionable safety planning, digital privacy hygiene, legal terminology breakdowns, and verified helpline directories.',
      howItProtects:
        'Equips you with practical steps—like securing smartphone settings or preparing an emergency kit—before urgent crises occur.',
      keyPoints: [
        'Pan-India 112 emergency response and dedicated women helplines (1091, 181, 1930)',
        'Accredited international helplines for United States, UK, Canada, and Australia',
        'Direct access to certified crisis support networks with zero commercial tracking',
      ],
    },
  },
];

export default function SafetyFeatures({
  onSelectFeature,
  onLaunchSafetyCheck,
  onOpenHelpRequest,
  onOpenReviewDashboard,
  onOpenSafetyResources,
}: SafetyFeaturesProps) {
  return (
    <section id="safety-features" className="py-20 lg:py-28 bg-[#F8F6FC] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-[#812D75] uppercase font-display bg-[#812D75]/10 px-3 py-1 rounded-full">
            Proactive Protection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#301047] tracking-tight mt-3 mb-4 text-balance">
            Safety Begins With Awareness
          </h2>
          <p className="text-base sm:text-lg text-[#42164F]/85 font-normal leading-relaxed text-balance">
            Understand the signs. Explore your options. Find support when you need it.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SAFETY_FEATURES_DATA.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative flex flex-col justify-between bg-white rounded-2xl p-7 border border-[#301047]/10 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
              >
                <div>
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#301047]/5 via-[#812D75]/10 to-[#C8B5FF]/20 flex items-center justify-center text-[#812D75] group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <Icon className="w-7 h-7 stroke-[1.8]" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full text-[#812D75] bg-[#F8F6FC] border border-[#812D75]/15">
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-[#301047] mb-3 group-hover:text-[#812D75] transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#42164F]/80 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="mt-8 pt-4 border-t border-[#301047]/10 flex flex-col gap-2">
                  {/* Primary Feature Specific Action */}
                  {feature.id === 'early-warning' && onLaunchSafetyCheck && (
                    <button
                      type="button"
                      onClick={onLaunchSafetyCheck}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#301047] via-[#42164F] to-[#812D75] rounded-xl hover:opacity-95 shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#C8B5FF]" />
                      <span>Start AI Safety Check</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  )}

                  {feature.id === 'confidential-request' && onOpenHelpRequest && (
                    <button
                      type="button"
                      onClick={onOpenHelpRequest}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#301047] hover:bg-[#42164F] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
                    >
                      <Send className="w-3.5 h-3.5 text-[#C8B5FF]" />
                      <span>Submit Help Request</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  )}

                  {feature.id === 'human-review' && onOpenReviewDashboard && (
                    <button
                      type="button"
                      onClick={onOpenReviewDashboard}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-[#301047] bg-[#F8F6FC] hover:bg-white border border-[#301047]/15 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-[#812D75]" />
                      <span>Advocate Triage Console</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  )}

                  {feature.id === 'safety-resources' && onOpenSafetyResources && (
                    <button
                      type="button"
                      onClick={onOpenSafetyResources}
                      className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#812D75] hover:bg-[#42164F] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#C8B5FF]" />
                      <span>View Emergency Helplines</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  )}

                  {/* Secondary Safeguards Overview Link */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectFeature(feature)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#812D75] hover:text-[#301047] transition-colors cursor-pointer group/btn"
                    >
                      <span>View Safeguard Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                    <span className="text-[10px] text-[#42164F]/50 font-medium">
                      {feature.id === 'early-warning' ? 'Live AI' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Guidance Notice */}
        <div className="mt-12 p-4 rounded-xl bg-white border border-[#301047]/10 max-w-3xl mx-auto flex items-center justify-between gap-4 text-xs text-[#42164F]/75">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#812D75]" />
            <span>
              All features operate with client-controlled data handling. Triage features are provided for educational demonstration.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
