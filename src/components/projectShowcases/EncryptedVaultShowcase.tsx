import React, { useState } from 'react';
import {
  Shield,
  Search,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  FileText,
  KeyRound,
  Download,
  Database,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface LegalRecord {
  id: string;
  docTitle: string;
  category: 'Board Resolution' | 'Statutory Tax Filing' | 'Series B Governance' | 'Executive NDA';
  filingDate: string;
  retentionLockUntil: string;
  signatoryPii: string;
  financialAmount: string;
  bankAccount: string;
  sha256Hash: string;
  retentionStatus: 'Active Lock' | 'Indefinite Archive' | 'Eligible for Purge';
  fileSizeKb: number;
}

export const EncryptedVaultShowcase: React.FC = () => {
  const recordsData: LegalRecord[] = [
    {
      id: 'DOC-2026-904',
      docTitle: 'Shareholder Voting Rights & Series B Allotment',
      category: 'Series B Governance',
      filingDate: '12 Jan 2026',
      retentionLockUntil: '12 Jan 2036 (10-Yr Lock)',
      signatoryPii: 'C. M. Sharvesh (Managing Trustee)',
      financialAmount: '₹45,00,00,000 ($5.4M USD)',
      bankAccount: 'HDFC-CORP-481902941',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      retentionStatus: 'Active Lock',
      fileSizeKb: 1420,
    },
    {
      id: 'DOC-2025-412',
      docTitle: 'Annual Statutory Tax Filing & Assessment Audit',
      category: 'Statutory Tax Filing',
      filingDate: '28 Oct 2025',
      retentionLockUntil: '28 Oct 2032 (7-Yr Statutory)',
      signatoryPii: 'S. Ramanathan (Senior Chartered Auditor)',
      financialAmount: '₹12,84,39,120 Assessed Revenue',
      bankAccount: 'ICICI-ES-992019481',
      sha256Hash: '8f4b52b7b80a6b72a9e52c8032bb1936c56b68b812f8a48b30f4094119fa9d1b',
      retentionStatus: 'Active Lock',
      fileSizeKb: 2840,
    },
    {
      id: 'DOC-2024-118',
      docTitle: 'Board Resolution: Bangalore R&D Center Authorization',
      category: 'Board Resolution',
      filingDate: '14 Jun 2024',
      retentionLockUntil: 'Permanent Corporate Seal',
      signatoryPii: 'V. Sundaram & Board Members (5/5)',
      financialAmount: '₹3,20,00,000 Capital Allocation',
      bankAccount: 'SBI-CHENNAI-0019284',
      sha256Hash: 'a6c8e31a0e38148b8c2dfbf0a1b659c2890597282b012b1897c5e26b17a12b48',
      retentionStatus: 'Indefinite Archive',
      fileSizeKb: 890,
    },
    {
      id: 'DOC-2024-009',
      docTitle: 'Senior Engineering Leadership Non-Disclosure Agreement',
      category: 'Executive NDA',
      filingDate: '03 Feb 2024',
      retentionLockUntil: '03 Feb 2029 (5-Yr Lock)',
      signatoryPii: 'Key Engineering Principal & ALS Counsel',
      financialAmount: 'Confidential Proprietary IP',
      bankAccount: 'N/A (Non-Financial)',
      sha256Hash: 'f4b1c2a3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcde',
      retentionStatus: 'Active Lock',
      fileSizeKb: 450,
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Counsel' | 'Auditor' | 'Regulator'>('Counsel');
  const [selectedRecordId, setSelectedRecordId] = useState<string>('DOC-2026-904');
  const [isVerifyingSeal, setIsVerifyingSeal] = useState(false);
  const [sealStatus, setSealStatus] = useState<string | null>(null);

  const filteredRecords = recordsData.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.id.toLowerCase().includes(q) ||
      r.docTitle.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.signatoryPii.toLowerCase().includes(q)
    );
  });

  const selectedRecord = recordsData.find((r) => r.id === selectedRecordId) || recordsData[0];

  const handleVerifyTamperSeal = () => {
    setIsVerifyingSeal(true);
    setTimeout(() => {
      setIsVerifyingSeal(false);
      setSealStatus('Cryptographic SHA-256 Digest Re-calculated & Matched: Zero tampering detected.');
      setTimeout(() => setSealStatus(null), 3500);
    }, 800);
  };

  // Masking helpers based on active role
  const maskValue = (value: string, fieldType: 'bank' | 'money' | 'pii') => {
    if (selectedRole === 'Counsel') return value;
    if (selectedRole === 'Auditor') {
      if (fieldType === 'bank') return '[AES-256 REDACTED: ACCOUNT MASKED]';
      if (fieldType === 'pii') return value;
      return value;
    }
    // Regulator
    return '[AES-256 RESTRICTED ACCESS]';
  };

  return (
    <div className="border border-[#EAEAEA] bg-white text-black text-xs font-serif shadow-xs">
      {/* Top Header */}
      <div className="bg-black text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Shield size={15} className="text-white" />
          <span className="font-serif tracking-[0.2em] uppercase font-medium">
            Encrypted Document &amp; Records Vault · Zero-Knowledge Indexing
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Full-Text Index: 250,000+ Docs
          </span>
          <span className="hidden sm:inline">Query Speed: 34ms</span>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-[#EAEAEA] bg-[#FAFAFA] divide-x divide-[#EAEAEA]">
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Indexed Governance Records
          </span>
          <span className="text-base font-serif font-normal text-black">254,190 Docs</span>
          <span className="text-[9px] text-[#777777] block mt-0.5">Sub-100ms Query SLA</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Storage Deduplication
          </span>
          <span className="text-base font-serif font-normal text-black">55% Saved</span>
          <span className="text-[9px] text-emerald-700 block mt-0.5">Automated Hash Dedupe</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Security Audit Assessment
          </span>
          <span className="text-base font-serif font-normal text-black">Zero High Severity</span>
          <span className="text-[9px] text-[#777777] block mt-0.5">Independent 3rd Party</span>
        </div>
        <div className="p-3 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#777777] block">
            Zero-Knowledge Encryption
          </span>
          <span className="text-base font-serif font-normal text-black">AES-256 GCM</span>
          <span className="text-[9px] text-[#777777] block mt-0.5">Field-Level Redaction</span>
        </div>
      </div>

      {/* Search & Role Gating Toolbar */}
      <div className="p-3 bg-white border-b border-[#EAEAEA] flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search size={13} className="absolute left-2.5 top-2.5 text-[#777777]" />
          <input
            type="text"
            placeholder="Search 250,000+ filings by keyword, category, or docket number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FAFAFA] border border-[#EAEAEA] pl-8 pr-3 py-1.5 text-xs text-black focus:outline-none focus:border-black font-serif"
          />
        </div>

        {/* Role Toggle Switcher */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-[#777777] flex items-center gap-1">
            <KeyRound size={11} /> Role Access:
          </span>
          <button
            type="button"
            onClick={() => setSelectedRole('Counsel')}
            className={`px-2.5 py-1 text-[9.5px] uppercase tracking-wider border cursor-pointer transition-colors ${
              selectedRole === 'Counsel'
                ? 'bg-black text-white border-black font-semibold'
                : 'bg-white text-black border-[#EAEAEA] hover:border-black'
            }`}
          >
            General Counsel (Full)
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('Auditor')}
            className={`px-2.5 py-1 text-[9.5px] uppercase tracking-wider border cursor-pointer transition-colors ${
              selectedRole === 'Auditor'
                ? 'bg-black text-white border-black font-semibold'
                : 'bg-white text-black border-[#EAEAEA] hover:border-black'
            }`}
          >
            Financial Auditor (Redacted)
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('Regulator')}
            className={`px-2.5 py-1 text-[9.5px] uppercase tracking-wider border cursor-pointer transition-colors ${
              selectedRole === 'Regulator'
                ? 'bg-black text-white border-black font-semibold'
                : 'bg-white text-black border-[#EAEAEA] hover:border-black'
            }`}
          >
            Regulator (Gated)
          </button>
        </div>
      </div>

      {sealStatus && (
        <div className="px-4 py-2 bg-[#FAFAFA] border-b border-[#EAEAEA] text-[11px] text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
          <span>{sealStatus}</span>
        </div>
      )}

      {/* Main Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#EAEAEA]">
        {/* Left Column: Query Matches List */}
        <div className="lg:col-span-7 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-widest uppercase text-[#777777] font-semibold">
              Query Result Set ({filteredRecords.length} Records) · 34ms
            </span>
            <span className="text-[9.5px] font-mono text-[#777777]">PostgreSQL GIN Full-Text</span>
          </div>

          <div className="space-y-2">
            {filteredRecords.map((rec) => {
              const isSelected = rec.id === selectedRecord.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => setSelectedRecordId(rec.id)}
                  className={`p-3 border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-black bg-neutral-50 shadow-xs'
                      : 'border-[#EAEAEA] hover:border-black bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10.5px] font-bold text-black">{rec.id}</span>
                        <span className="px-1.5 py-0.2 bg-[#FAFAFA] border border-[#EAEAEA] text-[8.5px] uppercase font-serif text-[#777777]">
                          {rec.category}
                        </span>
                      </div>
                      <div className="font-serif text-sm text-black mt-1 leading-snug">{rec.docTitle}</div>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 bg-black text-white font-mono uppercase whitespace-nowrap">
                      {rec.retentionStatus}
                    </span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-[10px] text-[#777777]">
                    <span>Filing Date: {rec.filingDate}</span>
                    <span className="font-mono">{(rec.fileSizeKb / 1024).toFixed(1)} MB</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-[9.5px] text-[#777777] mt-3 italic">
            * Field-level data is dynamically encrypted/redacted based on the active role selected above.
          </div>
        </div>

        {/* Right Column: Encrypted Document Inspector */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-[#FAFAFA] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2 mb-3">
              <span className="text-[10px] tracking-widest uppercase text-[#777777] font-semibold">
                Record Metadata &amp; Redaction Lens
              </span>
              <span className="font-mono text-[10px] text-black font-semibold">
                {selectedRecord.id}
              </span>
            </div>

            <div className="space-y-3 bg-white p-3.5 border border-[#EAEAEA]">
              <div>
                <span className="text-[10px] text-[#777777] uppercase tracking-wider block">Document Title</span>
                <span className="text-black font-medium text-xs">{selectedRecord.docTitle}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#EAEAEA]">
                <div>
                  <span className="text-[9.5px] text-[#777777] block">Classification</span>
                  <span className="text-black font-serif">{selectedRecord.category}</span>
                </div>
                <div>
                  <span className="text-[9.5px] text-[#777777] block">Retention Expiry</span>
                  <span className="text-black font-mono text-[10px]">{selectedRecord.retentionLockUntil}</span>
                </div>
              </div>

              {/* Dynamic Role Redaction Field */}
              <div className="pt-2 border-t border-[#EAEAEA] space-y-2">
                <div>
                  <span className="text-[9.5px] text-[#777777] block">Authorized Signatory</span>
                  <span className="text-black font-medium font-serif text-xs">
                    {maskValue(selectedRecord.signatoryPii, 'pii')}
                  </span>
                </div>

                <div>
                  <span className="text-[9.5px] text-[#777777] block">Financial Consideration / Book Value</span>
                  <span className="text-black font-mono font-medium text-xs">
                    {maskValue(selectedRecord.financialAmount, 'money')}
                  </span>
                </div>

                <div>
                  <span className="text-[9.5px] text-[#777777] block">Designated Escrow Account</span>
                  <span className="text-black font-mono text-xs">
                    {maskValue(selectedRecord.bankAccount, 'bank')}
                  </span>
                </div>
              </div>
            </div>

            {/* Cryptographic SHA-256 Digest Verification */}
            <div className="mt-3 p-3 bg-white border border-[#EAEAEA]">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#777777] mb-1">
                <span>Tamper-Proof SHA-256 Digest</span>
                <ShieldCheck size={13} className="text-black" />
              </div>
              <div className="font-mono text-[9.5px] text-black break-all">
                {selectedRecord.sha256Hash}
              </div>
              <div className="text-[9px] text-[#777777] mt-1">
                Zero-knowledge signature validated against compliance cold-storage.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex gap-2">
            <button
              type="button"
              onClick={handleVerifyTamperSeal}
              disabled={isVerifyingSeal}
              className="flex-1 bg-black text-white py-2 px-3 text-[10px] uppercase tracking-widest hover:bg-neutral-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw size={11} className={isVerifyingSeal ? 'animate-spin' : ''} />
              <span>{isVerifyingSeal ? 'Computing Hash...' : 'Verify Cryptographic Tamper Seal'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
