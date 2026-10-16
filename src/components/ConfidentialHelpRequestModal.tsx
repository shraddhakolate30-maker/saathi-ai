import React, { useState } from 'react';
import {
  X,
  Lock,
  ShieldAlert,
  Send,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  PhoneCall,
  EyeOff,
  Copy,
  Check,
} from 'lucide-react';
import BrandLogo from './BrandLogo';

interface ConfidentialHelpRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHelplines: () => void;
}

export default function ConfidentialHelpRequestModal({
  isOpen,
  onClose,
  onOpenHelplines,
}: ConfidentialHelpRequestModalProps) {
  const [alias, setAlias] = useState('');
  const [category, setCategory] = useState('Controlling Behavior & Coercion');
  const [contactChannel, setContactChannel] = useState<'anonymous_notes_only' | 'email' | 'signal_phone'>('anonymous_notes_only');
  const [contactValue, setContactValue] = useState('');
  const [urgency, setUrgency] = useState<'standard' | 'high' | 'immediate'>('standard');
  const [notes, setNotes] = useState('');
  const [informedConsent, setInformedConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<any>(null);
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!informedConsent) {
      setError('Please review and check the informed consent confirmation before submitting.');
      return;
    }

    if (notes.trim().length < 15) {
      setError('Please provide at least 15 characters of detail for your request.');
      return;
    }

    if (notes.trim().length > 3000) {
      setError('Please limit your notes to under 3,000 characters.');
      return;
    }

    if (contactChannel !== 'anonymous_notes_only' && !contactValue.trim()) {
      setError('Please provide your confidential handle or switch contact preference to "Anonymous Notes Only".');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/help-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alias,
          category,
          contactChannel,
          contactValue: contactChannel !== 'anonymous_notes_only' ? contactValue : undefined,
          urgency,
          notes,
          informedConsent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request.');
      }

      setSubmissionSuccess(data);
    } catch (err: any) {
      setError(err?.message || 'Network error while submitting request.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyId = () => {
    if (submissionSuccess?.requestId) {
      navigator.clipboard.writeText(submissionSuccess.requestId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleResetForm = () => {
    setAlias('');
    setCategory('Controlling Behavior & Coercion');
    setContactChannel('anonymous_notes_only');
    setContactValue('');
    setUrgency('standard');
    setNotes('');
    setInformedConsent(false);
    setError(null);
    setSubmissionSuccess(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-request-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#301047]/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-[#F8F6FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
          aria-label="Close help request modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#301047]/10 to-[#812D75]/15 text-[#812D75] flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#812D75] uppercase tracking-wider">
              Confidential Intake
            </span>
            <h3 id="help-request-title" className="text-xl font-bold text-[#301047] font-display">
              Request Confidential Guidance
            </h3>
          </div>
        </div>

        {/* Honest Architecture Disclosure Notice */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 leading-relaxed space-y-1">
          <p className="font-semibold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Demonstration Intake Environment Notice</span>
          </p>
          <p>
            This form records your request into our local triage demonstration queue for educational review. <strong>It does not automatically alert local police or summon emergency responders.</strong> If you or someone you know is in acute danger, please use verified 24/7 emergency numbers directly.
          </p>
        </div>

        {submissionSuccess ? (
          /* Honest Success State */
          <div className="py-6 space-y-6 animate-hero-fade">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-emerald-950 font-display">
                Request Recorded in Demonstration Triage Queue
              </h4>
              <p className="text-xs text-emerald-900 leading-relaxed max-w-md mx-auto">
                Your request has been saved with reference ID{' '}
                <strong className="font-mono bg-emerald-200/60 px-1.5 py-0.5 rounded text-emerald-950">
                  {submissionSuccess.requestId}
                </strong>
                . It can now be inspected on the Human Review Triage Console.
              </p>
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId ? 'Copied ID' : 'Copy Reference ID'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6FC] border border-[#301047]/10 text-xs text-[#42164F]/85 space-y-2">
              <h5 className="font-bold text-[#301047] uppercase text-[11px]">Next Practical Steps:</h5>
              <ul className="space-y-1.5 list-disc pl-4 text-xs">
                <li>You can consult certified 24/7 crisis counselors immediately by phone or secure text.</li>
                <li>Clear your browser session or close this tab whenever you are ready.</li>
                <li>No marketing emails, unprompted SMS, or tracking cookies have been registered.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#301047]/10">
              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#42164F]/80 hover:text-[#301047] border border-[#301047]/15 rounded-full"
              >
                Submit Another Request
              </button>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onOpenHelplines}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-[#812D75] rounded-full hover:bg-[#42164F]"
                >
                  View Emergency Helplines
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#301047] bg-[#F8F6FC] hover:bg-white rounded-full border border-[#301047]/10"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Intake Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Pseudonym Field (Optional) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="req-alias" className="text-xs font-bold text-[#301047]">
                  Pseudonym / Safe Alias (Optional)
                </label>
                <span className="text-[11px] text-[#42164F]/60">Never require real legal names</span>
              </div>
              <input
                id="req-alias"
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="e.g. Violet, Guest-12, or leave blank for 'Confidential Guest'"
                maxLength={50}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#301047]/15 focus:outline-none focus:ring-2 focus:ring-[#812D75] bg-[#F8F6FC]/60 text-[#301047]"
              />
            </div>

            {/* Primary Concern Category */}
            <div>
              <label htmlFor="req-category" className="block text-xs font-bold text-[#301047] mb-1">
                Primary Category of Concern
              </label>
              <select
                id="req-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#301047]/15 focus:outline-none focus:ring-2 focus:ring-[#812D75] bg-[#F8F6FC] text-[#301047]"
              >
                <option value="Controlling Behavior & Coercion">Controlling Behavior & Coercive Friction</option>
                <option value="Digital Stalking & Location Tracking">Digital Stalking & Unwanted Location Tracking</option>
                <option value="Emotional & Verbal Volatility">Emotional, Verbal, or Psychological Volatility</option>
                <option value="Financial Dependency & Restriction">Financial Dependency & Asset Restriction</option>
                <option value="Workplace / Community Harassment">Workplace, Campus, or Community Harassment</option>
                <option value="General Safety Guidance">General Safety Planning & Guidance</option>
              </select>
            </div>

            {/* Contact Preference */}
            <div>
              <label className="block text-xs font-bold text-[#301047] mb-1">
                Communication & Response Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className={`p-2.5 rounded-xl border text-xs cursor-pointer flex flex-col gap-1 transition-all ${
                  contactChannel === 'anonymous_notes_only'
                    ? 'border-[#812D75] bg-[#812D75]/10 text-[#301047] font-semibold'
                    : 'border-[#301047]/10 bg-[#F8F6FC] text-[#42164F]/70'
                }`}>
                  <input
                    type="radio"
                    name="contactChannel"
                    value="anonymous_notes_only"
                    checked={contactChannel === 'anonymous_notes_only'}
                    onChange={() => setContactChannel('anonymous_notes_only')}
                    className="sr-only"
                  />
                  <span>1. Anonymous Notes Only</span>
                  <span className="text-[10px] font-normal opacity-80">No callback or message requested</span>
                </label>

                <label className={`p-2.5 rounded-xl border text-xs cursor-pointer flex flex-col gap-1 transition-all ${
                  contactChannel === 'email'
                    ? 'border-[#812D75] bg-[#812D75]/10 text-[#301047] font-semibold'
                    : 'border-[#301047]/10 bg-[#F8F6FC] text-[#42164F]/70'
                }`}>
                  <input
                    type="radio"
                    name="contactChannel"
                    value="email"
                    checked={contactChannel === 'email'}
                    onChange={() => setContactChannel('email')}
                    className="sr-only"
                  />
                  <span>2. Burner Email</span>
                  <span className="text-[10px] font-normal opacity-80">Only if you have secure inbox access</span>
                </label>

                <label className={`p-2.5 rounded-xl border text-xs cursor-pointer flex flex-col gap-1 transition-all ${
                  contactChannel === 'signal_phone'
                    ? 'border-[#812D75] bg-[#812D75]/10 text-[#301047] font-semibold'
                    : 'border-[#301047]/10 bg-[#F8F6FC] text-[#42164F]/70'
                }`}>
                  <input
                    type="radio"
                    name="contactChannel"
                    value="signal_phone"
                    checked={contactChannel === 'signal_phone'}
                    onChange={() => setContactChannel('signal_phone')}
                    className="sr-only"
                  />
                  <span>3. Signal / Safe Phone</span>
                  <span className="text-[10px] font-normal opacity-80">Encrypted messaging handle</span>
                </label>
              </div>

              {contactChannel !== 'anonymous_notes_only' && (
                <div className="mt-2.5">
                  <input
                    type="text"
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder={
                      contactChannel === 'email'
                        ? 'safe-alias@proton.me'
                        : '+1 or Signal username'
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#301047]/15 focus:outline-none focus:ring-2 focus:ring-[#812D75] bg-[#F8F6FC] text-[#301047]"
                  />
                  <span className="text-[11px] text-[#42164F]/60 block mt-1">
                    Warning: Do not provide a phone or email that someone else can monitor.
                  </span>
                </div>
              )}
            </div>

            {/* Situation Details */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="req-notes" className="text-xs font-bold text-[#301047]">
                  Describe Your Situation or Questions for Review:
                </label>
                <span className="text-[11px] text-[#42164F]/60">
                  {notes.length} / 3000 chars
                </span>
              </div>
              <textarea
                id="req-notes"
                rows={4}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share any context, questions, or timeline you would like reviewed. Please do not share sensitive banking codes, IDs, or exact addresses."
                className="w-full p-3.5 text-sm rounded-xl border border-[#301047]/15 focus:outline-none focus:ring-2 focus:ring-[#812D75] bg-[#F8F6FC]/60 text-[#301047]"
              />
            </div>

            {/* Informed Consent Checkbox */}
            <div className="p-3.5 rounded-xl bg-[#F8F6FC] border border-[#301047]/10 flex items-start gap-3">
              <input
                id="req-consent"
                type="checkbox"
                required
                checked={informedConsent}
                onChange={(e) => setInformedConsent(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#812D75] rounded border-[#301047]/20 focus:ring-[#812D75] cursor-pointer"
              />
              <label htmlFor="req-consent" className="text-xs text-[#42164F]/85 leading-relaxed cursor-pointer">
                <strong className="text-[#301047]">Informed Consent Acknowledgment:</strong> I understand that this platform is an educational triage demonstration. Transmitted notes are queued in the application's demonstration triage console and are not sent to law enforcement. If in immediate danger, I will call verified emergency services directly.
              </label>
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onOpenHelplines}
                className="text-xs text-[#812D75] hover:underline flex items-center gap-1 font-medium"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Emergency Helpline Directly</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#301047] via-[#42164F] to-[#812D75] rounded-full hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Confidentially...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Confidential Request</span>
                    <Send className="w-3.5 h-3.5 text-[#C8B5FF]" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
