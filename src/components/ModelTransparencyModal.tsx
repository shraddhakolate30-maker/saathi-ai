import { useState, useEffect } from 'react';
import { X, Cpu, ShieldCheck, Database, Server, ExternalLink, Lock } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface ModelTransparencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModelTransparencyModal({ isOpen, onClose }: ModelTransparencyModalProps) {
  const [modelInfo, setModelInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch('/api/model-info')
      .then((res) => res.json())
      .then((data) => {
        setModelInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch model info:', err);
        setLoading(false);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="transparency-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#301047]/10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-[#F8F6FC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
          aria-label="Close transparency modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#301047]/10 to-[#812D75]/15 text-[#812D75] flex items-center justify-center shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-[#812D75] uppercase tracking-wider">
              Technical Disclosure
            </span>
            <h3 id="transparency-title" className="text-xl font-bold text-[#301047] font-display">
              Open-Weight Model & Architecture Transparency
            </h3>
          </div>
        </div>

        <p className="text-sm text-[#42164F]/85 leading-relaxed mb-6">
          SAATHI AI is committed to total transparency. We believe women seeking safety guidance deserve to know exactly which artificial intelligence models are deployed, where computation takes place, and how their data is handled.
        </p>

        {loading ? (
          <div className="py-8 text-center text-xs text-[#812D75]">
            Loading architecture specifications from server...
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm">
            {/* Model Provenance */}
            <div className="p-4 rounded-2xl bg-[#F8F6FC] border border-[#301047]/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#301047] uppercase text-xs flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#812D75]" />
                  <span>Primary AI Model: {modelInfo?.primaryModel || 'gemma-4-26b-a4b-it'}</span>
                </span>
                <span className="text-[11px] font-bold text-[#812D75] bg-[#812D75]/10 px-2 py-0.5 rounded">
                  Open-Weight Family
                </span>
              </div>
              <p className="text-xs text-[#42164F]/80 leading-relaxed">
                The primary model architecture is <strong>Google Gemma</strong>, an open-weights model family built from the same research and technology used for Gemini models.
              </p>
              <div className="text-[11px] text-[#42164F]/70 pt-1">
                <strong>Hosting Disclosure:</strong> To provide instant responses without demanding a high-end local GPU on the user's phone or computer, model inference is executed via Google's hosted AI Studio / GenAI inference endpoint.
              </div>
            </div>

            {/* Credential & Execution Security */}
            <div className="p-4 rounded-2xl bg-white border border-[#301047]/10 shadow-2xs space-y-2">
              <span className="font-bold text-[#301047] uppercase text-xs flex items-center gap-1.5">
                <Server className="w-4 h-4 text-[#812D75]" />
                <span>Execution Point: Server-Side Proxy Route</span>
              </span>
              <p className="text-xs text-[#42164F]/80 leading-relaxed">
                Model requests are executed exclusively on the backend server at <code>/api/safety-check</code>. The client browser never communicates directly with third-party model providers, and <strong>zero API keys or secrets</strong> are exposed in frontend code or network bundles.
              </p>
            </div>

            {/* Data Flow & Retention */}
            <div className="p-4 rounded-2xl bg-[#F8F6FC] border border-[#301047]/10 space-y-2">
              <span className="font-bold text-[#301047] uppercase text-xs flex items-center gap-1.5">
                <Database className="w-4 h-4 text-[#812D75]" />
                <span>Data Transit & Retention Policy</span>
              </span>
              <ul className="text-xs text-[#42164F]/85 space-y-1.5 list-disc pl-4">
                <li>
                  <strong>Zero Raw Database Logging:</strong> The server does not write situation texts from the AI Safety Check to any persistent database.
                </li>
                <li>
                  <strong>Client Session Control:</strong> All notes and generated analysis live in temporary browser memory and are wiped immediately upon clicking "Clear Notes", closing the tab, or triggering the Quick Safety Exit.
                </li>
                <li>
                  <strong>Transit Encryption:</strong> All communications between your device, our server, and the inference API use TLS/HTTPS encryption.
                </li>
              </ul>
            </div>

            {/* Responsible Framing */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong>Responsible AI Standard:</strong> SAATHI AI's prompt constraints strictly forbid the model from predicting crime, labeling an individual as definitively dangerous, or providing legal/medical determinations. It is an educational tool for reflecting on behavioral dynamics.
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#301047]/10 flex items-center justify-between">
          <BrandLogo size="sm" textColor="text-[#301047]" shieldColor="#812D75" heartColor="#C8B5FF" />
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#301047] rounded-full hover:bg-[#42164F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
