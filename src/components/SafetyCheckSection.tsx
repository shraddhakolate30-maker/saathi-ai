import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Send,
  Lock,
  PhoneCall,
  CheckCircle2,
  Info,
  HelpCircle,
  Cpu,
  BookOpen,
} from 'lucide-react';

interface WarningSign {
  sign: string;
  explanation: string;
  category: string;
}

interface SafetySuggestion {
  title: string;
  tip: string;
  category: string;
}

interface SafetyAnalysisResult {
  summary: string;
  possibleWarningSigns: WarningSign[];
  safetySuggestions: SafetySuggestion[];
  isUrgentDangerDetected: boolean;
  disclaimer: string;
}

interface SafetyCheckSectionProps {
  onOpenHelplineModal: () => void;
  onOpenModelTransparency: () => void;
  onQuickExit: () => void;
}

const EXAMPLE_SCENARIOS = [
  {
    label: 'Digital monitoring & demands',
    text: 'My partner gets angry if I do not immediately reply to messages and demands that I share my location and phone passcodes whenever I go out with colleagues.',
  },
  {
    label: 'Isolation from family & friends',
    text: 'Whenever I plan to visit my family or close friends, my partner creates an argument or acts withdrawn, saying I do not care enough about our relationship.',
  },
  {
    label: 'Unpredictable mood shifts',
    text: 'I feel like I am constantly walking on eggshells. One day everything is loving, and the next day small everyday things trigger intense coldness and verbal criticism.',
  },
];

export default function SafetyCheckSection({
  onOpenHelplineModal,
  onOpenModelTransparency,
  onQuickExit,
}: SafetyCheckSectionProps) {
  const [situation, setSituation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emptyInputError, setEmptyInputError] = useState(false);
  const [tooLongError, setTooLongError] = useState(false);
  const [result, setResult] = useState<SafetyAnalysisResult | null>(null);
  const [modelBadge, setModelBadge] = useState<string>('Open-Weight AI (Gemma 4)');
  const [loadingStep, setLoadingStep] = useState(0);
  const [isDirtyAfterResult, setIsDirtyAfterResult] = useState(false);

  const loadingMessages = [
    'Connecting securely with open-weight AI model...',
    'Reflecting on behavioral patterns and boundary dynamics...',
    'Synthesizing supportive, non-judgmental guidance...',
    'Finalizing privacy-first safety suggestions...',
  ];

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmed = situation.trim();

    if (!trimmed || trimmed.length < 8) {
      setEmptyInputError(true);
      setTooLongError(false);
      return;
    }

    if (trimmed.length > 3000) {
      setTooLongError(true);
      setEmptyInputError(false);
      return;
    }

    setEmptyInputError(false);
    setTooLongError(false);
    setError(null);
    setLoading(true);
    setResult(null);
    setIsDirtyAfterResult(false);

    // Cycle through loading status messages
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 1800);

    try {
      const response = await fetch('/api/safety-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ situation: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete safety check.');
      }

      setResult(data.analysis);
      if (data.modelUsed) {
        setModelBadge(data.modelUsed);
      }
    } catch (err: any) {
      console.error('Safety check error:', err);
      setError(
        err?.message ||
          'Unable to complete analysis right now. Please check your connection and try again.'
      );
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSituation('');
    setResult(null);
    setError(null);
    setEmptyInputError(false);
    setTooLongError(false);
    setIsDirtyAfterResult(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setSituation(val);

    if (emptyInputError && val.trim().length >= 8) {
      setEmptyInputError(false);
    }
    if (tooLongError && val.trim().length <= 3000) {
      setTooLongError(false);
    }
    if (result) {
      setIsDirtyAfterResult(true);
    }
  };

  return (
    <section id="safety-check" className="py-20 lg:py-28 bg-[#F8F6FC] scroll-mt-16 border-t border-[#301047]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#812D75]/10 border border-[#812D75]/20 text-xs font-semibold text-[#812D75] uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-[#812D75]" />
            <span>Interactive AI Safety Check</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#301047] tracking-tight mb-4 text-balance">
            Check Concerning Warning Signs In Confidence
          </h2>

          <p className="text-base sm:text-lg text-[#42164F]/85 font-normal leading-relaxed text-balance">
            Describe a situation you are experiencing in your own words. Our open-weight AI identifies potential behavioral patterns and offers calm, practical next steps—without accusations, guilt, or judgment.
          </p>
        </div>

        {/* Confidentiality & Ethics Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-white border border-[#301047]/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#42164F]/85">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#301047]/5 text-[#812D75] flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-[#301047] block font-semibold">Client-Controlled Privacy:</strong>
              <span>Nothing typed here is stored in any database on this server. Session data is retained only in browser memory and is purged upon clearing.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenModelTransparency}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C8B5FF]/25 hover:bg-[#C8B5FF]/40 text-[#301047] font-semibold text-[11px] transition-colors cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-[#812D75]" />
              <span>{modelBadge}</span>
              <span className="underline ml-0.5 font-normal">Info</span>
            </button>
          </div>
        </div>

        {/* Interactive Workspace Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-[#301047]/10">
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="situation-input"
                  className="text-sm font-bold text-[#301047] flex items-center gap-2"
                >
                  <span>Describe the situation or interaction:</span>
                </label>
                <span
                  className={`text-xs ${
                    situation.length > 3000 ? 'text-rose-600 font-bold' : 'text-[#42164F]/60'
                  }`}
                >
                  {situation.length} / 3000 characters
                </span>
              </div>

              <textarea
                id="situation-input"
                rows={5}
                value={situation}
                onChange={handleTextChange}
                placeholder="What happened? What feels uncomfortable, controlling, or confusing? Describe the conversation, behaviors, or repeated events at your own pace..."
                className={`w-full p-4 rounded-2xl text-sm sm:text-base border transition-all focus:outline-none focus:ring-2 bg-[#F8F6FC]/60 text-[#301047] placeholder:text-[#42164F]/45 leading-relaxed ${
                  emptyInputError || tooLongError
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-[#301047]/15 focus:ring-[#812D75] focus:border-transparent'
                }`}
              />

              {/* Input Validation Errors */}
              {emptyInputError && (
                <div className="mt-2 flex items-center gap-2 text-xs text-rose-600 font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Please describe what you are experiencing in at least 8 characters so the AI can provide supportive insights.</span>
                </div>
              )}

              {tooLongError && (
                <div className="mt-2 flex items-center gap-2 text-xs text-rose-600 font-medium">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Your description exceeds the 3,000 character maximum limit. Please summarize slightly to ensure prompt analysis.</span>
                </div>
              )}

              {isDirtyAfterResult && (
                <div className="mt-2 flex items-center gap-2 text-xs text-amber-700 font-medium bg-amber-50 p-2 rounded-lg border border-amber-200">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>You edited the description. Click "Run AI Safety Check" to generate an updated analysis for your new text.</span>
                </div>
              )}
            </div>

            {/* Quick Example Scenarios for testing and clarity */}
            <div>
              <span className="text-xs font-semibold text-[#42164F]/70 block mb-2">
                Or explore a common scenario to see how the analysis works:
              </span>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_SCENARIOS.map((example) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => {
                      setSituation(example.text);
                      setEmptyInputError(false);
                      setTooLongError(false);
                      setResult(null);
                      setIsDirtyAfterResult(false);
                    }}
                    className="text-xs bg-[#F8F6FC] hover:bg-[#812D75]/10 text-[#301047] hover:text-[#812D75] border border-[#301047]/10 px-3 py-1.5 rounded-full transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
                  >
                    + {example.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#301047]/10">
              <div className="flex items-center gap-2 text-xs text-[#42164F]/70">
                <ShieldCheck className="w-4 h-4 text-[#812D75]" />
                <span>Observations of patterns · Never labels guilt or predicts crime</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {situation && (
                  <button
                    type="button"
                    onClick={handleClear}
                    disabled={loading}
                    title="Clears all entered situation notes and generated results from this browser screen"
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#42164F]/70 hover:text-[#301047] border border-[#301047]/15 rounded-full hover:bg-[#F8F6FC] transition-colors flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear Notes</span>
                  </button>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#301047] via-[#42164F] to-[#812D75] rounded-full shadow-md hover:shadow-lg hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing Situation...</span>
                    </>
                  ) : (
                    <>
                      <span>Run AI Safety Check</span>
                      <Send className="w-4 h-4 text-[#C8B5FF]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Loading State Display */}
          {loading && (
            <div
              aria-live="polite"
              className="mt-8 p-6 rounded-2xl bg-[#F8F6FC] border border-[#301047]/10 text-center space-y-4 animate-hero-fade"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#812D75]/10 text-[#812D75] flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#301047] font-display">
                  Evaluating With Open-Weight AI
                </h4>
                <p className="text-xs text-[#812D75] font-medium mt-1">
                  {loadingMessages[loadingStep]}
                </p>
              </div>
              <div className="w-48 h-1 bg-white rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#42164F] to-[#812D75] w-2/3 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
              </div>
            </div>
          )}

          {/* Error State Display */}
          {error && (
            <div
              aria-live="assertive"
              className="mt-8 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-3 animate-hero-fade"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-rose-800">
                    Unable to complete safety check
                  </h4>
                  <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                    {error}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleAnalyze()}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-700 rounded-full hover:bg-rose-800 transition-colors cursor-pointer"
                >
                  Try Again
                </button>
                <button
                  type="button"
                  onClick={onOpenHelplineModal}
                  className="text-xs text-rose-800 underline hover:no-underline font-medium cursor-pointer"
                >
                  View 24/7 Crisis Helplines Instead
                </button>
              </div>
            </div>
          )}

          {/* Result State Display */}
          {result && !loading && (
            <div aria-live="polite" className="mt-10 pt-8 border-t border-[#301047]/10 space-y-8 animate-hero-fade">
              {/* Urgent Danger Alert Banner (if physical risk noted) */}
              {result.isUrgentDangerDetected && (
                <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-[#301047] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-amber-900">
                      Immediate Safety Advisory
                    </h4>
                    <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
                      Your description contains elements indicating immediate physical distress, threats, or intimidation.
                      Please prioritize your physical safety. If you feel unsafe right now, consider contacting
                      emergency services (such as 112 in India/EU, 911 in US, or 999 in UK) or reaching a trusted advocate.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={onOpenHelplineModal}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>View 24/7 Helplines</span>
                      </button>
                      <button
                        type="button"
                        onClick={onQuickExit}
                        className="px-3.5 py-1.5 text-xs font-semibold text-amber-900 bg-white border border-amber-300 hover:bg-amber-50 rounded-full transition-colors cursor-pointer"
                      >
                        Quick Screen Exit (ESC)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Supportive Summary Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#F8F6FC] to-white border border-[#301047]/10 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#812D75] uppercase tracking-wider font-display">
                    Supportive Observation
                  </span>
                  <span className="text-xs text-[#42164F]/40">·</span>
                  <span className="text-[11px] text-[#42164F]/60">Gemma Open-Weight Analysis</span>
                </div>
                <p className="text-base font-medium text-[#301047] leading-relaxed">
                  "{result.summary}"
                </p>
              </div>

              {/* Warning Signs Breakdown */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-[#301047] flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#812D75]" />
                    <span>Possible Warning Signs Identified ({result.possibleWarningSigns.length})</span>
                  </h3>
                  <span className="text-xs text-[#42164F]/60">
                    Educational patterns, not accusations
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.possibleWarningSigns.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#F8F6FC] border border-[#301047]/10 hover:border-[#812D75]/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-semibold text-[#812D75] bg-white px-2 py-0.5 rounded-md border border-[#812D75]/15">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#301047] mb-2">
                          {item.sign}
                        </h4>
                        <p className="text-xs text-[#42164F]/85 leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Safety Suggestions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-[#301047] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#812D75]" />
                    <span>Practical & Non-Judgmental Next Steps</span>
                  </h3>
                  <span className="text-xs text-[#42164F]/60">
                    You choose what feels right for your situation
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.safetySuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-[#301047]/10 shadow-2xs hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-[#812D75] shrink-0" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#301047]">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#42164F]/85 leading-relaxed pl-6">
                        {item.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Mandatory Disclaimer */}
              <div className="p-4 rounded-2xl bg-[#F8F6FC] border border-[#301047]/15 text-xs text-[#42164F]/80 flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#812D75] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#301047] font-semibold">Important AI Advisory:</strong> {result.disclaimer}
                </p>
              </div>

              {/* Post-Check Action Options */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#301047] bg-white border border-[#301047]/15 rounded-full hover:bg-[#F8F6FC] transition-colors cursor-pointer"
                >
                  Clear Notes & Perform Another Check
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onOpenModelTransparency}
                    className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#301047] bg-[#F8F6FC] border border-[#301047]/10 hover:bg-white rounded-full transition-colors cursor-pointer"
                  >
                    View Model Transparency
                  </button>
                  <button
                    type="button"
                    onClick={onOpenHelplineModal}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#812D75] bg-[#812D75]/10 hover:bg-[#812D75]/20 rounded-full transition-colors cursor-pointer"
                  >
                    Explore 24/7 Helplines
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
