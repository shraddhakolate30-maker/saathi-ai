import React, { useState, useEffect } from 'react';
import {
  X,
  ClipboardCheck,
  Lock,
  Key,
  Shield,
  AlertTriangle,
  Clock,
  CheckCircle,
  Eye,
  Filter,
  Save,
  RefreshCw,
  UserCheck,
} from 'lucide-react';

interface HelpRequestRecord {
  id: string;
  alias: string;
  contactChannel: 'anonymous_notes_only' | 'email' | 'signal_phone';
  contactValue?: string;
  category: string;
  notes: string;
  urgency: 'standard' | 'high' | 'immediate';
  status: 'pending' | 'under_review' | 'guidance_provided' | 'closed';
  createdAt: string;
  isDemoSeed: boolean;
  advocateNotes?: string;
}

interface HumanReviewDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HumanReviewDashboardModal({
  isOpen,
  onClose,
}: HumanReviewDashboardModalProps) {
  const [passkey, setPasskey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [records, setRecords] = useState<HelpRequestRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HelpRequestRecord | null>(null);

  // Advocate updates
  const [statusUpdate, setStatusUpdate] = useState<string>('pending');
  const [notesUpdate, setNotesUpdate] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Filters
  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'immediate' | 'high' | 'standard'>('all');
  const [originFilter, setOriginFilter] = useState<'all' | 'live' | 'demo'>('all');

  const fetchRecords = async (key: string) => {
    setLoading(true);
    setAuthError(null);
    try {
      const response = await fetch('/api/help-requests', {
        headers: {
          'x-advocate-key': key,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unauthorized. Please check your passkey.');
      }

      setRecords(data.records || []);
      setIsAuthenticated(true);
      if (data.records?.length > 0 && !selectedRecord) {
        setSelectedRecord(data.records[0]);
        setStatusUpdate(data.records[0].status);
        setNotesUpdate(data.records[0].advocateNotes || '');
      }
    } catch (err: any) {
      setAuthError(err?.message || 'Access denied.');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecords(passkey.trim());
  };

  const handleSelectRecord = (record: HelpRequestRecord) => {
    setSelectedRecord(record);
    setStatusUpdate(record.status);
    setNotesUpdate(record.advocateNotes || '');
    setSaveSuccess(false);
  };

  const handleSaveUpdate = async () => {
    if (!selectedRecord) return;
    setUpdating(true);
    try {
      const response = await fetch(`/api/help-requests/${selectedRecord.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-advocate-key': passkey.trim(),
        },
        body: JSON.stringify({
          status: statusUpdate,
          advocateNotes: notesUpdate,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update record');
      }

      // Update in local list
      setRecords((prev) =>
        prev.map((r) => (r.id === selectedRecord.id ? data.record : r))
      );
      setSelectedRecord(data.record);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err: any) {
      alert(err?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (!isOpen) return null;

  const filteredRecords = records.filter((r) => {
    if (urgencyFilter !== 'all' && r.urgency !== urgencyFilter) return false;
    if (originFilter === 'live' && r.isDemoSeed) return false;
    if (originFilter === 'demo' && !r.isDemoSeed) return false;
    return true;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dashboard-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-hero-fade"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col bg-white rounded-3xl shadow-2xl border border-[#301047]/10">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#301047]/10 flex items-center justify-between bg-[#F8F6FC]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#812D75]/15 text-[#812D75] flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="dashboard-title" className="text-lg font-bold text-[#301047] font-display">
                  Human Review & Triage Console
                </h3>
                <span className="text-[10px] font-bold text-[#812D75] bg-[#812D75]/10 border border-[#812D75]/20 px-2 py-0.5 rounded-full uppercase">
                  Demonstration Environment
                </span>
              </div>
              <p className="text-xs text-[#42164F]/75">
                Simulated triage workspace for confidential help requests
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#42164F]/60 hover:text-[#301047] hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#812D75]"
            aria-label="Close dashboard"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* Authentication Gate */
          <div className="p-8 max-w-md mx-auto my-auto text-center space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-[#301047]/5 text-[#812D75] flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#301047]">Advocate Passkey Required</h4>
              <p className="text-xs text-[#42164F]/80 mt-1 leading-relaxed">
                To protect confidential user submissions from public exposure, advocate authentication is enforced.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left">
              <strong>Open-Source Demo Note:</strong> Enter the default demonstration access key:{' '}
              <code className="font-mono font-bold bg-amber-100 px-1 py-0.5 rounded text-amber-950">
                advocate2026
              </code>
            </div>

            {authError && (
              <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-xl">
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div className="relative">
                <Key className="w-4 h-4 text-[#42164F]/50 absolute left-3 top-3" />
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter advocate passkey..."
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-[#301047]/20 focus:outline-none focus:ring-2 focus:ring-[#812D75] bg-[#F8F6FC]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 text-xs font-semibold text-white bg-[#301047] hover:bg-[#42164F] rounded-xl transition-colors cursor-pointer"
              >
                {loading ? 'Authenticating...' : 'Enter Triage Console'}
              </button>
            </form>
          </div>
        ) : (
          /* Active Triage Console */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
            {/* Left Sidebar: Requests List */}
            <div className="w-full md:w-80 lg:w-96 border-r border-[#301047]/10 flex flex-col bg-[#F8F6FC]/50 overflow-hidden">
              {/* Filter Strip */}
              <div className="p-3 border-b border-[#301047]/10 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1 text-[#42164F]/70">
                  <Filter className="w-3.5 h-3.5" />
                  <span className="font-semibold">Queue:</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <select
                    value={originFilter}
                    onChange={(e: any) => setOriginFilter(e.target.value)}
                    className="text-[11px] bg-white border border-[#301047]/15 rounded-lg px-2 py-1"
                  >
                    <option value="all">All Sources</option>
                    <option value="live">Live Submissions</option>
                    <option value="demo">Demo Benchmarks</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => fetchRecords(passkey.trim())}
                    title="Refresh queue"
                    className="p-1 text-[#42164F]/70 hover:text-[#301047] hover:bg-white rounded-md"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Records List */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#301047]/10 p-2 space-y-1.5">
                {filteredRecords.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#42164F]/60">
                    No requests matching current filter.
                  </div>
                ) : (
                  filteredRecords.map((req) => {
                    const isSelected = selectedRecord?.id === req.id;
                    return (
                      <button
                        key={req.id}
                        type="button"
                        onClick={() => handleSelectRecord(req)}
                        className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white shadow-md border border-[#812D75]/30 ring-1 ring-[#812D75]/20'
                            : 'bg-white/60 hover:bg-white border border-transparent hover:border-[#301047]/10'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-mono text-[11px] font-bold text-[#301047]">
                            {req.id}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              req.isDemoSeed
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {req.isDemoSeed ? 'Demo Benchmark' : 'Live User Intake'}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-[#301047] truncate">
                          {req.alias} · {req.category}
                        </div>

                        <p className="text-[11px] text-[#42164F]/70 line-clamp-2 mt-1">
                          {req.notes}
                        </p>

                        <div className="mt-2 flex items-center justify-between text-[10px] text-[#42164F]/60">
                          <span className="capitalize font-medium">Status: {req.status.replace('_', ' ')}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(req.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Pane: Selected Record Detail & Action */}
            <div className="flex-1 flex flex-col overflow-y-auto p-5 sm:p-6 bg-white">
              {selectedRecord ? (
                <div className="space-y-6">
                  {/* Case Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#301047]/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#301047]">
                          Case {selectedRecord.id}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            selectedRecord.isDemoSeed
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {selectedRecord.isDemoSeed ? 'Demonstration Benchmark' : 'Live Submission'}
                        </span>
                      </div>
                      <p className="text-xs text-[#42164F]/75 mt-0.5">
                        Received on {new Date(selectedRecord.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#42164F]/60">Urgency:</span>
                      <span
                        className={`text-xs font-bold uppercase px-2.5 py-1 rounded-lg ${
                          selectedRecord.urgency === 'immediate'
                            ? 'bg-rose-100 text-rose-800'
                            : selectedRecord.urgency === 'high'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {selectedRecord.urgency}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
                      <span className="text-[#42164F]/60 block text-[10px] uppercase font-bold">Alias</span>
                      <strong className="text-[#301047]">{selectedRecord.alias}</strong>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
                      <span className="text-[#42164F]/60 block text-[10px] uppercase font-bold">Contact Channel</span>
                      <strong className="text-[#301047] capitalize">
                        {selectedRecord.contactChannel.replace(/_/g, ' ')}
                      </strong>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F8F6FC] border border-[#301047]/10">
                      <span className="text-[#42164F]/60 block text-[10px] uppercase font-bold">Contact Data</span>
                      <strong className="text-[#301047] truncate block">
                        {selectedRecord.contactValue || 'None (Anonymous)'}
                      </strong>
                    </div>
                  </div>

                  {/* Situation Text */}
                  <div className="p-4 rounded-2xl bg-[#F8F6FC] border border-[#301047]/10">
                    <span className="text-[11px] font-bold text-[#812D75] uppercase block mb-1">
                      Submitted Narrative / Questions:
                    </span>
                    <p className="text-sm text-[#301047] leading-relaxed whitespace-pre-wrap">
                      {selectedRecord.notes}
                    </p>
                  </div>

                  {/* Advocate Caseworker Actions */}
                  <div className="p-5 rounded-2xl bg-white border border-[#301047]/15 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-[#301047] uppercase flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-[#812D75]" />
                        <span>Advocate Review & Triage Actions</span>
                      </h5>
                      {saveSuccess && (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Saved successfully
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#301047] mb-1">
                          Case Status
                        </label>
                        <select
                          value={statusUpdate}
                          onChange={(e) => setStatusUpdate(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-[#301047]/20 bg-[#F8F6FC]"
                        >
                          <option value="pending">Pending Triage</option>
                          <option value="under_review">Under Advocate Review</option>
                          <option value="guidance_provided">Guidance / Resources Provided</option>
                          <option value="closed">Closed / Purged</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#301047] mb-1">
                        Advocate Notes & Resource Referrals (Internal Caseworker Log)
                      </label>
                      <textarea
                        rows={3}
                        value={notesUpdate}
                        onChange={(e) => setNotesUpdate(e.target.value)}
                        placeholder="Document verified local support contacts recommended, safety planning suggestions, or referral status..."
                        className="w-full p-3 text-xs rounded-xl border border-[#301047]/20 bg-[#F8F6FC]"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleSaveUpdate}
                        disabled={updating}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#301047] hover:bg-[#42164F] rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{updating ? 'Saving...' : 'Save Triage Update'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-24 text-center text-xs text-[#42164F]/60">
                  Select a request from the queue to review details.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
